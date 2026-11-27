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

test('TEAM_SKILLS contains exactly the 10 required skills from the attachment', () => {
  assert.equal(TEAM_SKILLS.length, 10);
  assert.equal(TEAM_SKILLS[0], 'Chuyên môn kỹ thuật');
  assert.equal(TEAM_SKILLS[1], 'Lập kế hoạch');
  assert.equal(TEAM_SKILLS[2], 'Tổ chức, điều phối');
  assert.equal(TEAM_SKILLS[3], 'Thuyết trình');
  assert.equal(TEAM_SKILLS[4], 'Viết và làm tài liệu');
  assert.equal(TEAM_SKILLS[5], 'Giao tiếp, đối thoại');
  assert.equal(TEAM_SKILLS[6], 'Ý tưởng sáng tạo');
  assert.equal(TEAM_SKILLS[7], 'Lắng nghe, hỗ trợ');
  assert.equal(TEAM_SKILLS[8], 'Hòa giải bất đồng');
  assert.equal(TEAM_SKILLS[9], 'Kiểm tra chất lượng');
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
      skills: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      id: 'm2',
      name: 'Bob',
      skills: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const gaps = findSkillGaps(members);
  // Skill index 0 has Alice and Bob. All other 9 skills are gaps.
  assert.equal(gaps.length, 9);
  assert.equal(gaps[0].skillIndex, 1);
  assert.equal(gaps[0].skillName, 'Lập kế hoạch');
});

test('findSingleDependencies identifies skills where only 1 member has score > 0', () => {
  const members: TeamMember[] = [
    {
      id: 'm1',
      name: 'Alice',
      skills: [2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      id: 'm2',
      name: 'Bob',
      skills: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const singleDeps = findSingleDependencies(members);
  // Skill 0 has both m1 and m2 (not single).
  // Skill 1 ('Lập kế hoạch') has only Alice (m1).
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
      skills: [2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      id: 'm2',
      name: 'Bob',
      skills: [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  const covered = findWellCoveredSkills(members);
  assert.equal(covered.length, 2);
  assert.equal(covered[0].skillName, 'Chuyên môn kỹ thuật');
  assert.equal(covered[0].capableCount, 2);
  assert.equal(covered[0].strongCount, 2);

  assert.equal(covered[1].skillName, 'Lập kế hoạch');
  assert.equal(covered[1].capableCount, 2);
  assert.equal(covered[1].strongCount, 1);
});

test('createDefaultDemoTeam provides 4 realistic members with 10 skills each', () => {
  const team = createDefaultDemoTeam();
  assert.equal(team.length, 4);
  assert.equal(team[0].name, 'Bạn');
  assert.equal(team[0].isMe, true);
  team.forEach((member) => {
    assert.equal(member.skills.length, 10);
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
  assert.ok(tsv.includes('Kỹ năng\tBạn\tNguyễn Văn An'));
  const rows = tsv.split('\n');
  assert.equal(rows.length, 11); // 1 header + 10 skills
});

test('getRoleRecommendations produces role suggestions based on member skills', () => {
  const team = createDefaultDemoTeam();
  const recs = getRoleRecommendations(team);
  assert.equal(recs.length, 5);
  assert.ok(recs.some((r) => r.roleTitle.includes('Trưởng nhóm')));
  assert.ok(recs.some((r) => r.roleTitle.includes('Trưởng Kỹ thuật')));
});
