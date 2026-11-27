export const TEAM_SKILLS: readonly string[] = [
  'Chuyên môn kỹ thuật',
  'Lập kế hoạch',
  'Tổ chức, điều phối',
  'Thuyết trình',
  'Viết và làm tài liệu',
  'Giao tiếp, đối thoại',
  'Ý tưởng sáng tạo',
  'Lắng nghe, hỗ trợ',
  'Hòa giải bất đồng',
  'Kiểm tra chất lượng',
] as const;

export type SkillLevel = 0 | 1 | 2;

export const SKILL_LEVEL_LABELS: readonly string[] = [
  'Chưa có',
  'Làm được',
  'Mạnh nhất',
] as const;

export interface TeamMember {
  id: string;
  name: string;
  isMe?: boolean;
  skills: SkillLevel[];
  updatedAt?: string;
}

export interface TeamGroup {
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  members: TeamMember[];
}

export const GROUP_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const GROUP_CODE_LENGTH = 6;
export const MAX_GROUP_NAME_LENGTH = 60;
export const MAX_MEMBER_NAME_LENGTH = 32;
export const MAX_MEMBERS_PER_GROUP = 30;

export function normalizeGroupCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);
}

export function isValidGroupCode(code: string): boolean {
  return /^[A-Z0-9]{4,12}$/.test(code);
}

export function generateGroupCode(
  existingCodes?: ReadonlySet<string>,
  randomFn: () => number = Math.random
): string {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    let code = '';
    for (let i = 0; i < GROUP_CODE_LENGTH; i += 1) {
      const idx = Math.floor(randomFn() * GROUP_CODE_ALPHABET.length);
      code += GROUP_CODE_ALPHABET[idx] ?? 'A';
    }
    if (!existingCodes || !existingCodes.has(code)) {
      return code;
    }
  }
  return `G${Date.now().toString(36).toUpperCase().slice(-5)}`;
}

export function createEmptySkills(): SkillLevel[] {
  return Array.from({ length: TEAM_SKILLS.length }, () => 0 as SkillLevel);
}

export function normalizeSkillsArray(raw: unknown): SkillLevel[] {
  if (!Array.isArray(raw)) {
    return createEmptySkills();
  }
  return TEAM_SKILLS.map((_, index) => {
    const val = Number(raw[index]);
    if (val === 1 || val === 2) {
      return val;
    }
    return 0;
  });
}

export function findMemberByName(
  members: readonly TeamMember[],
  rawName: string
): TeamMember | undefined {
  const normalized = rawName.trim().toLowerCase();
  if (!normalized) return undefined;
  return members.find((m) => m.name.trim().toLowerCase() === normalized);
}

export function upsertGroupMember(
  members: readonly TeamMember[],
  rawName: string,
  skills?: readonly SkillLevel[],
  nowIso: string = new Date().toISOString()
): { members: TeamMember[]; member: TeamMember } {
  const cleanName = rawName.trim().slice(0, MAX_MEMBER_NAME_LENGTH);
  if (!cleanName) {
    throw new Error('Tên thành viên không được để trống');
  }

  const existing = findMemberByName(members, cleanName);
  if (existing) {
    const updated: TeamMember = {
      ...existing,
      name: cleanName,
      skills: skills ? normalizeSkillsArray(skills) : normalizeSkillsArray(existing.skills),
      updatedAt: nowIso,
    };
    return {
      members: members.map((m) => (m.id === existing.id ? updated : m)),
      member: updated,
    };
  }

  if (members.length >= MAX_MEMBERS_PER_GROUP) {
    throw new Error(`Nhóm đã đạt tối đa ${MAX_MEMBERS_PER_GROUP} thành viên`);
  }

  const slugId = `m_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 6)}`;
  const created: TeamMember = {
    id: slugId,
    name: cleanName,
    skills: skills ? normalizeSkillsArray(skills) : createEmptySkills(),
    updatedAt: nowIso,
  };

  return {
    members: [...members, created],
    member: created,
  };
}

export interface TeamSkillGap {
  skillIndex: number;
  skillName: string;
}

export interface TeamSingleDependency {
  skillIndex: number;
  skillName: string;
  memberId: string;
  memberName: string;
  level: SkillLevel;
}

export interface TeamWellCoveredSkill {
  skillIndex: number;
  skillName: string;
  capableCount: number;
  strongCount: number;
}

export interface TeamRoleRecommendation {
  roleTitle: string;
  roleBadge: string;
  roleDescription: string;
  keySkills: string[];
  recommendedMembers: {
    id: string;
    name: string;
    score: number;
  }[];
}

export function cycleSkillLevel(current: SkillLevel): SkillLevel {
  return ((current + 1) % 3) as SkillLevel;
}

export function findSkillGaps(
  members: readonly TeamMember[]
): TeamSkillGap[] {
  if (members.length === 0) return [];
  const gaps: TeamSkillGap[] = [];
  TEAM_SKILLS.forEach((skillName, index) => {
    const hasAnyone = members.some((m) => (m.skills[index] ?? 0) > 0);
    if (!hasAnyone) {
      gaps.push({ skillIndex: index, skillName });
    }
  });
  return gaps;
}

export function findSingleDependencies(
  members: readonly TeamMember[]
): TeamSingleDependency[] {
  if (members.length === 0) return [];
  const singleDeps: TeamSingleDependency[] = [];
  TEAM_SKILLS.forEach((skillName, index) => {
    const capable = members.filter((m) => (m.skills[index] ?? 0) > 0);
    if (capable.length === 1) {
      const soleMember = capable[0];
      singleDeps.push({
        skillIndex: index,
        skillName,
        memberId: soleMember.id,
        memberName: soleMember.name.trim() || 'Chưa đặt tên',
        level: soleMember.skills[index] ?? 1,
      });
    }
  });
  return singleDeps;
}

export function findWellCoveredSkills(
  members: readonly TeamMember[]
): TeamWellCoveredSkill[] {
  if (members.length === 0) return [];
  const covered: TeamWellCoveredSkill[] = [];
  TEAM_SKILLS.forEach((skillName, index) => {
    const capable = members.filter((m) => (m.skills[index] ?? 0) > 0);
    if (capable.length >= 2) {
      const strongCount = members.filter(
        (m) => (m.skills[index] ?? 0) === 2
      ).length;
      covered.push({
        skillIndex: index,
        skillName,
        capableCount: capable.length,
        strongCount,
      });
    }
  });
  return covered;
}

export function createDefaultDemoTeam(): TeamMember[] {
  return [
    {
      id: 'member-me',
      name: 'Bạn',
      isMe: true,
      skills: [2, 1, 0, 0, 2, 1, 2, 1, 0, 1],
    },
    {
      id: 'member-2',
      name: 'Nguyễn Văn An',
      isMe: false,
      skills: [1, 2, 2, 1, 1, 2, 0, 1, 2, 0],
    },
    {
      id: 'member-3',
      name: 'Lê Thị Bích',
      isMe: false,
      skills: [0, 1, 1, 2, 1, 2, 1, 2, 1, 0],
    },
    {
      id: 'member-4',
      name: 'Phạm Đức Cường',
      isMe: false,
      skills: [2, 0, 0, 0, 0, 0, 1, 0, 0, 2],
    },
  ];
}

export function getRoleRecommendations(
  members: readonly TeamMember[]
): TeamRoleRecommendation[] {
  if (members.length === 0) return [];

  const roles = [
    {
      roleTitle: 'Trưởng nhóm / Điều phối',
      roleBadge: 'Lãnh đạo & Tổ chức',
      roleDescription:
        'Chịu trách nhiệm phân công nhiệm vụ, theo dõi tiến độ chung và giữ vững sự đồng thuận trong nhóm.',
      keySkills: ['Tổ chức, điều phối', 'Lập kế hoạch', 'Hòa giải bất đồng'],
      skillIndices: [2, 1, 8],
    },
    {
      roleTitle: 'Trưởng Kỹ thuật / Nghiên cứu',
      roleBadge: 'Chuyên môn cốt lõi',
      roleDescription:
        'Phụ trách giải pháp kỹ thuật, kiểm định tính khả thi và kiểm soát chất lượng kỹ thuật của sản phẩm.',
      keySkills: ['Chuyên môn kỹ thuật', 'Kiểm tra chất lượng', 'Ý tưởng sáng tạo'],
      skillIndices: [0, 9, 6],
    },
    {
      roleTitle: 'Thư ký / Quản lý Hồ sơ & Báo cáo',
      roleBadge: 'Tài liệu & Tiến độ',
      roleDescription:
        'Tổng hợp biên bản họp, soạn thảo báo cáo kỹ thuật và kiểm tra chuẩn hóa các biểu mẫu nộp đồ án.',
      keySkills: ['Viết và làm tài liệu', 'Lập kế hoạch', 'Kiểm tra chất lượng'],
      skillIndices: [4, 1, 9],
    },
    {
      roleTitle: 'Đại diện Thuyết trình & Đối ngoại',
      roleBadge: 'Giao tiếp & Bảo vệ đồ án',
      roleDescription:
        'Thiết kế bài trình chiếu, bảo vệ đồ án trước hội đồng và kết nối thông tin với giảng viên hướng dẫn.',
      keySkills: ['Thuyết trình', 'Giao tiếp, đối thoại', 'Viết và làm tài liệu'],
      skillIndices: [3, 5, 4],
    },
    {
      roleTitle: 'Hỗ trợ Gắn kết & Ý tưởng',
      roleBadge: 'Sáng tạo & Hỗ trợ',
      roleDescription:
        'Đóng góp ý tưởng giải pháp đột phá, lắng nghe phản hồi của các thành viên và hỗ trợ khi có quá tải.',
      keySkills: ['Ý tưởng sáng tạo', 'Lắng nghe, hỗ trợ', 'Hòa giải bất đồng'],
      skillIndices: [6, 7, 8],
    },
  ];

  return roles.map((role) => {
    const scoredMembers = members
      .map((member) => {
        const score = role.skillIndices.reduce(
          (sum, idx) => sum + (member.skills[idx] ?? 0),
          0
        );
        return {
          id: member.id,
          name: member.name.trim() || 'Chưa đặt tên',
          score,
        };
      })
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score);

    return {
      roleTitle: role.roleTitle,
      roleBadge: role.roleBadge,
      roleDescription: role.roleDescription,
      keySkills: role.keySkills,
      recommendedMembers: scoredMembers.slice(0, 2),
    };
  });
}

export function buildTeamSummaryReport(
  members: readonly TeamMember[]
): string {
  const gaps = findSkillGaps(members);
  const singleDeps = findSingleDependencies(members);
  const wellCovered = findWellCoveredSkills(members);

  const lines: string[] = [
    '=== BÁO CÁO BẢN ĐỒ NĂNG LỰC & HỖ TRỢ PHÂN CÔNG (CHƯƠNG 5) ===',
    `Số lượng thành viên: ${members.length}`,
    `Thành viên: ${members.map((m) => m.name).join(', ')}`,
    '',
    '1. LỖ HỔNG NĂNG LỰC CỦA NHÓM (CẦN KHẮC PHỤC):',
  ];

  if (gaps.length === 0) {
    lines.push('  - Không có lỗ hổng: Mọi kỹ năng đều có ít nhất 1 thành viên đảm nhận.');
  } else {
    gaps.forEach((g) => {
      lines.push(`  - [CẢNH BÁO] ${g.skillName}: Chưa có thành viên nào làm được.`);
    });
  }

  lines.push('');
  lines.push('2. ĐIỂM NGHẼN PHỤ THUỘC (CHỈ DỰA VÀO 1 NGƯỜI):');
  if (singleDeps.length === 0) {
    lines.push('  - Rất an toàn: Không có kỹ năng nào chỉ phụ thuộc vào duy nhất một người.');
  } else {
    singleDeps.forEach((d) => {
      lines.push(
        `  - ${d.skillName}: Chỉ có ${d.memberName} (${SKILL_LEVEL_LABELS[d.level]}). Rủi ro nếu bạn này bận hoặc quá tải.`
      );
    });
  }

  lines.push('');
  lines.push('3. THẾ MẠNH ĐƯỢC ĐẢM BẢO:');
  if (wellCovered.length === 0) {
    lines.push('  - Chưa có kỹ năng nào có từ 2 thành viên trở lên đảm nhận.');
  } else {
    wellCovered.forEach((w) => {
      lines.push(
        `  - ${w.skillName}: ${w.capableCount} người làm được (${w.strongCount} người mạnh nhất).`
      );
    });
  }

  lines.push('');
  lines.push('4. GỢI Ý PHÂN CÔNG VAI TRÒ DỰ ÁN:');
  const recommendations = getRoleRecommendations(members);
  recommendations.forEach((rec) => {
    const topPicks = rec.recommendedMembers.map((m) => m.name).join(', ') || 'Chưa xác định';
    lines.push(`  - ${rec.roleTitle}: Ưu tiên ${topPicks}`);
  });

  return lines.join('\n');
}

export function buildTeamMatrixTsv(members: readonly TeamMember[]): string {
  const header = [
    'Kỹ năng',
    ...members.map((m) => m.name.trim() || 'Chưa đặt tên'),
    'Số người làm được',
    'Trạng thái nhóm',
  ].join('\t');

  const rows = TEAM_SKILLS.map((skill, index) => {
    const levels = members.map((m) => SKILL_LEVEL_LABELS[m.skills[index] ?? 0]);
    const capable = members.filter((m) => (m.skills[index] ?? 0) > 0).length;
    let status = 'Đảm bảo';
    if (capable === 0) status = 'Lỗ hổng';
    else if (capable === 1) status = '1 người duy nhất';

    return [skill, ...levels, capable.toString(), status].join('\t');
  });

  return [header, ...rows].join('\n');
}
