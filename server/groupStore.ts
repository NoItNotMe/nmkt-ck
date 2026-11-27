import fs from 'node:fs';
import path from 'node:path';
import {
  generateGroupCode,
  isValidGroupCode,
  MAX_GROUP_NAME_LENGTH,
  normalizeGroupCode,
  normalizeSkillsArray,
  type TeamGroup,
  type TeamMember,
  upsertGroupMember,
} from '../src/utils/teamAssignment.ts';

const MAX_STORED_GROUPS = 2000;

export class GroupStoreError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'GroupStoreError';
    this.statusCode = statusCode;
  }
}

export class TeamGroupStore {
  private filePath: string | null;
  private groups: Map<string, TeamGroup>;

  constructor(filePath: string | null = null) {
    this.filePath = filePath;
    this.groups = new Map();
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    if (!this.filePath) return;
    try {
      if (!fs.existsSync(this.filePath)) return;
      const raw = fs.readFileSync(this.filePath, 'utf8');
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return;
      for (const item of parsed) {
        if (
          item &&
          typeof item === 'object' &&
          typeof (item as TeamGroup).code === 'string' &&
          isValidGroupCode((item as TeamGroup).code)
        ) {
          const g = item as TeamGroup;
          const members: TeamMember[] = Array.isArray(g.members)
            ? g.members.map((m) => ({
                id: String(m.id ?? ''),
                name: String(m.name ?? '').slice(0, 32),
                skills: normalizeSkillsArray(m.skills),
                updatedAt:
                  typeof m.updatedAt === 'string'
                    ? m.updatedAt
                    : g.updatedAt || new Date().toISOString(),
              }))
            : [];
          this.groups.set(g.code, {
            code: g.code,
            name: String(g.name ?? 'Nhóm dự án').slice(0, MAX_GROUP_NAME_LENGTH),
            createdAt:
              typeof g.createdAt === 'string'
                ? g.createdAt
                : new Date().toISOString(),
            updatedAt:
              typeof g.updatedAt === 'string'
                ? g.updatedAt
                : new Date().toISOString(),
            members,
          });
        }
      }
    } catch {
      // Ignore corrupt file and start clean
    }
  }

  private persistToDisk(): void {
    if (!this.filePath) return;
    try {
      const dir = path.dirname(this.filePath);
      fs.mkdirSync(dir, { recursive: true });
      const data = JSON.stringify(Array.from(this.groups.values()));
      const tmpPath = `${this.filePath}.tmp`;
      fs.writeFileSync(tmpPath, data, 'utf8');
      fs.renameSync(tmpPath, this.filePath);
    } catch {
      // Best-effort persistence
    }
  }

  private evictIfNeeded(): void {
    if (this.groups.size <= MAX_STORED_GROUPS) return;
    const sorted = Array.from(this.groups.values()).sort((a, b) =>
      a.updatedAt.localeCompare(b.updatedAt)
    );
    const excess = this.groups.size - MAX_STORED_GROUPS;
    for (let i = 0; i < excess; i += 1) {
      const target = sorted[i];
      if (target) {
        this.groups.delete(target.code);
      }
    }
  }

  createGroup(rawName?: string, rawCode?: string): TeamGroup {
    const cleanName =
      (rawName ?? '').trim().slice(0, MAX_GROUP_NAME_LENGTH) || 'Nhóm dự án';
    let code = '';

    if (rawCode && rawCode.trim()) {
      const normalized = normalizeGroupCode(rawCode);
      if (!isValidGroupCode(normalized)) {
        throw new GroupStoreError(
          'Mã nhóm cần gồm 4–12 ký tự chữ hoặc số (ví dụ: NHOM5 hoặc K7M9P2).',
          400
        );
      }
      if (this.groups.has(normalized)) {
        throw new GroupStoreError(
          `Mã nhóm "${normalized}" đã tồn tại. Hãy chọn mã khác hoặc nhập mã này để tham gia.`,
          409
        );
      }
      code = normalized;
    } else {
      code = generateGroupCode(new Set(this.groups.keys()));
    }

    const now = new Date().toISOString();
    const group: TeamGroup = {
      code,
      name: cleanName,
      createdAt: now,
      updatedAt: now,
      members: [],
    };
    this.groups.set(code, group);
    this.evictIfNeeded();
    this.persistToDisk();
    return group;
  }

  getGroup(rawCode: string): TeamGroup | null {
    const code = normalizeGroupCode(rawCode);
    if (!isValidGroupCode(code)) {
      return null;
    }
    return this.groups.get(code) ?? null;
  }

  upsertMember(
    rawCode: string,
    rawMemberName: string,
    rawSkills?: unknown
  ): { group: TeamGroup; member: TeamMember } {
    const code = normalizeGroupCode(rawCode);
    if (!isValidGroupCode(code)) {
      throw new GroupStoreError('Mã nhóm không hợp lệ.', 400);
    }
    const existing = this.groups.get(code);
    if (!existing) {
      throw new GroupStoreError(
        `Không tìm thấy nhóm với mã "${code}".`,
        404
      );
    }

    const now = new Date().toISOString();
    const skills =
      rawSkills !== undefined ? normalizeSkillsArray(rawSkills) : undefined;

    let result: { members: TeamMember[]; member: TeamMember };
    try {
      result = upsertGroupMember(existing.members, rawMemberName, skills, now);
    } catch (err) {
      throw new GroupStoreError(
        err instanceof Error ? err.message : 'Không thể cập nhật thành viên.',
        400
      );
    }

    const updatedGroup: TeamGroup = {
      ...existing,
      updatedAt: now,
      members: result.members,
    };
    this.groups.set(code, updatedGroup);
    this.persistToDisk();
    return { group: updatedGroup, member: result.member };
  }

  removeMember(rawCode: string, memberId: string): TeamGroup {
    const code = normalizeGroupCode(rawCode);
    if (!isValidGroupCode(code)) {
      throw new GroupStoreError('Mã nhóm không hợp lệ.', 400);
    }
    const existing = this.groups.get(code);
    if (!existing) {
      throw new GroupStoreError(
        `Không tìm thấy nhóm với mã "${code}".`,
        404
      );
    }

    const nextMembers = existing.members.filter((m) => m.id !== memberId);
    const updatedGroup: TeamGroup = {
      ...existing,
      updatedAt: new Date().toISOString(),
      members: nextMembers,
    };
    this.groups.set(code, updatedGroup);
    this.persistToDisk();
    return updatedGroup;
  }
}
