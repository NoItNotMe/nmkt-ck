import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { GroupStoreError, TeamGroupStore } from './groupStore.ts';

test('TeamGroupStore creates group with generated 6-char code and retrieves it', () => {
  const store = new TeamGroupStore(null);
  const group = store.createGroup('Nhóm 3 - Robot');
  assert.equal(group.name, 'Nhóm 3 - Robot');
  assert.match(group.code, /^[A-Z0-9]{6}$/);
  assert.equal(group.members.length, 0);

  const fetched = store.getGroup(group.code.toLowerCase());
  assert.ok(fetched);
  assert.equal(fetched.code, group.code);
});

test('TeamGroupStore supports custom group code and prevents duplicates', () => {
  const store = new TeamGroupStore(null);
  const group = store.createGroup('Đồ án Kỹ thuật', 'nhom5');
  assert.equal(group.code, 'NHOM5');

  assert.throws(
    () => store.createGroup('Trùng mã', 'NHOM5'),
    (err: unknown) => err instanceof GroupStoreError && err.statusCode === 409
  );
});

test('TeamGroupStore upserts members (case-insensitive match) and removes members', () => {
  const store = new TeamGroupStore(null);
  store.createGroup('Nhóm thử nghiệm', 'TEST99');

  const first = store.upsertMember('TEST99', 'Minh', [2, 1, 0, 0, 0, 0]);
  assert.equal(first.group.members.length, 1);
  assert.equal(first.member.name, 'Minh');
  assert.equal(first.member.skills[0], 2);

  // Joining with same name (different case) updates rather than duplicating
  const returning = store.upsertMember('TEST99', ' minh ');
  assert.equal(returning.group.members.length, 1);
  assert.equal(returning.member.id, first.member.id);
  assert.equal(returning.member.skills[0], 2);

  // Second member joins
  const second = store.upsertMember('TEST99', 'Lan', [0, 2, 1, 0, 0, 0]);
  assert.equal(second.group.members.length, 2);

  // Remove first member
  const afterRemove = store.removeMember('TEST99', first.member.id);
  assert.equal(afterRemove.members.length, 1);
  assert.equal(afterRemove.members[0].name, 'Lan');
});

test('TeamGroupStore persists and reloads from JSON file safely', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'group-store-'));
  const filePath = path.join(tmpDir, 'groups.json');

  try {
    const store1 = new TeamGroupStore(filePath);
    const created = store1.createGroup('Nhóm Lưu Trữ', 'SAVE01');
    store1.upsertMember(created.code, 'An', [1, 2, 0, 0, 0, 0]);

    const store2 = new TeamGroupStore(filePath);
    const reloaded = store2.getGroup('SAVE01');
    assert.ok(reloaded);
    assert.equal(reloaded.name, 'Nhóm Lưu Trữ');
    assert.equal(reloaded.members.length, 1);
    assert.equal(reloaded.members[0].name, 'An');
    assert.deepEqual(reloaded.members[0].skills, [1, 2, 0, 0, 0, 0]);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
