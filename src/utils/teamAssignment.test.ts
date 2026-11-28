import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTeamMatrixTsv,
  buildTeamSummaryReport,
  createDefaultDemoTeam,
  cycleSkillLevel,
  findSingleDependencies,
  findSkillGaps,
  findWellCoveredSkills,
  generateGroupCode,
  getRoleRecommendations,
  isValidGroupCode,
  normalizeGroupCode,
  normalizeSkillsArray,
  SKILL_LEVEL_LABELS,
  TEAM_SKILLS,
  type TeamMember,
  upsertGroupMember,
} from './teamAssignment';

test('TEAM_SKILLS contains exactly the 6 required skills', () => {
  assert.equal(TEAM_SKILLS.length, 6);
  assert.equal(TEAM_SKILLS[0], 'Viết là làm tài liệu');
  assert.equal(TEAM_SKILLS[1], 'Chuyên môn kỹ thuật');
  assert.equal(TEAM_SKILLS[2], 'Thuyết trình');
  assert.equal(TEAM_SKILLS[3], 'Tổng hợp, thống nhất tài liệu');
  assert.equal(TEAM_SKILLS[4], 'Kiểm tra, đánh giá đúng sai');
  assert.equal(TEAM_SKILLS[5], 'Tạo báo cáo, slide');
});

test('SKILL_LEVEL_LABELS has three levels', () => {
  assert.deepEqual(SKILL_LEVEL_LABELS, ['Chưa có', 'Làm được', 'Mạnh nhất']);
});

test('cycleSkillLevel transitions correctly 0 -> 1 -> 2 -> 0', () => {
  assert.equal(cycleSkillLevel(0), 1);
  assert.equal(cycleSkillLevel(1), 2);
  assert.equal(cycleSkillLevel(2), 0);
});

test('findSkillGaps identifies skills where no member has score > 0', () => {
  const members: TeamMember[] = [
    {
      id: 'm1',
      name: 'Alice',
      skills: [1, 0, 0, 0, 0, 0],
    },
    {
      id: 'm2',
      name: 'Bob',
      skills: [2, 0, 0, 0, 0, 0],
    },
  ];

  const gaps = findSkillGaps(members);
  // Skill index 0 has Alice and Bob. All other 5 skills are gaps.
  assert.equal(gaps.length, 5);
  assert.equal(gaps[0].skillIndex, 1);
  assert.equal(gaps[0].skillName, 'Chuyên môn kỹ thuật');
});

test('findSingleDependencies identifies skills where only 1 member has score > 0', () => {
  const members: TeamMember[] = [
    {
      id: 'm1',
      name: 'Alice',
      skills: [2, 1, 0, 0, 0, 0],
    },
    {
      id: 'm2',
      name: 'Bob',
      skills: [2, 0, 0, 0, 0, 0],
    },
  ];

  const singleDeps = findSingleDependencies(members);
  // Skill 0 has both m1 and m2 (not single).
  // Skill 1 ('Chuyên môn kỹ thuật') has only Alice (m1).
  assert.equal(singleDeps.length, 1);
  assert.equal(singleDeps[0].skillIndex, 1);
  assert.equal(singleDeps[0].memberName, 'Alice');
  assert.equal(singleDeps[0].level, 1);
});

test('findWellCoveredSkills identifies skills with 2 or more capable members', () => {
  const members: TeamMember[] = [
    {
      id: 'm1',
      name: 'Alice',
      skills: [2, 1, 0, 0, 0, 0],
    },
    {
      id: 'm2',
      name: 'Bob',
      skills: [2, 2, 0, 0, 0, 0],
    },
  ];

  const covered = findWellCoveredSkills(members);
  assert.equal(covered.length, 2);
  assert.equal(covered[0].skillName, 'Viết là làm tài liệu');
  assert.equal(covered[0].capableCount, 2);
  assert.equal(covered[0].strongCount, 2);

  assert.equal(covered[1].skillName, 'Chuyên môn kỹ thuật');
  assert.equal(covered[1].capableCount, 2);
  assert.equal(covered[1].strongCount, 1);
});

test('createDefaultDemoTeam provides 4 realistic members with 6 skills each', () => {
  const team = createDefaultDemoTeam();
  assert.equal(team.length, 4);
  assert.deepEqual(
    team.map((m) => m.name),
    ['Vũ Duy Mạnh', 'Nguyễn Quang Tiến', 'Hoàng Ngọc Minh', 'Nguyễn Minh Tân']
  );
  team.forEach((member) => {
    assert.equal(member.skills.length, 6);
    member.skills.forEach((lvl) => {
      assert.ok(lvl >= 0 && lvl <= 2);
    });
  });
});

test('buildTeamSummaryReport and buildTeamMatrixTsv produce valid non-empty text', () => {
  const team = createDefaultDemoTeam();
  const report = buildTeamSummaryReport(team);
  assert.ok(report.includes('BÁO CÁO BẢN ĐỒ NĂNG LỰC'));
  assert.ok(report.includes('Số lượng thành viên: 4'));

  const tsv = buildTeamMatrixTsv(team);
  assert.ok(tsv.includes('Kỹ năng\tVũ Duy Mạnh\tNguyễn Quang Tiến'));
  const rows = tsv.split('\n');
  assert.equal(rows.length, 7); // 1 header + 6 skills
});

test('getRoleRecommendations produces role suggestions based on member skills', () => {
  const team = createDefaultDemoTeam();
  const recs = getRoleRecommendations(team);
  assert.equal(recs.length, 5);
  assert.ok(recs.some((r) => r.roleTitle.includes('Trưởng nhóm')));
  assert.ok(recs.some((r) => r.roleTitle.includes('Trưởng Kỹ thuật')));
});
