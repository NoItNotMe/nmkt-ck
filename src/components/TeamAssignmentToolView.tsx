import { useEffect, useId, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  Check,
  Copy,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  User,
  Users,
} from 'lucide-react';
import {
  buildTeamMatrixTsv,
  buildTeamSummaryReport,
  createDefaultDemoTeam,
  cycleSkillLevel,
  findSingleDependencies,
  findSkillGaps,
  findWellCoveredSkills,
  getRoleRecommendations,
  SKILL_LEVEL_LABELS,
  TEAM_SKILLS,
  type SkillLevel,
  type TeamMember,
} from '../utils/teamAssignment';

const STORAGE_KEY = 'team_assignment_skill_matrix_v1';

interface TeamAssignmentToolViewProps {
  onBackToList?: () => void;
}

export function TeamAssignmentToolView({
  onBackToList,
}: TeamAssignmentToolViewProps) {
  const [members, setMembers] = useState<TeamMember[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as TeamMember[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // Fallback to demo team
      }
    }
    return createDefaultDemoTeam();
  });

  const [activeMemberId, setActiveMemberId] = useState<string>(() => {
    return members[0]?.id ?? 'member-me';
  });

  const [copyStatus, setCopyStatus] = useState<
    'idle' | 'copied-report' | 'copied-tsv' | 'error'
  >('idle');

  const nameInputId = useId();

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    } catch {
      // Storage quota or private browsing
    }
  }, [members]);

  const activeMember =
    members.find((m) => m.id === activeMemberId) ?? members[0];

  function handleSkillToggle(memberId: string, skillIndex: number) {
    setMembers((prev) =>
      prev.map((member) => {
        if (member.id !== memberId) return member;
        const nextSkills = [...member.skills];
        nextSkills[skillIndex] = cycleSkillLevel(
          (nextSkills[skillIndex] ?? 0) as SkillLevel
        );
        return { ...member, skills: nextSkills };
      })
    );
    setCopyStatus('idle');
  }

  function handleNameChange(newName: string) {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === activeMemberId ? { ...m, name: newName } : m
      )
    );
    setCopyStatus('idle');
  }

  function handleAddMember() {
    const newId = `member-${Date.now()}`;
    const newMemberNumber = members.length + 1;
    const newMember: TeamMember = {
      id: newId,
      name: `Thành viên ${newMemberNumber}`,
      isMe: false,
      skills: Array(TEAM_SKILLS.length).fill(0) as SkillLevel[],
    };
    setMembers((prev) => [...prev, newMember]);
    setActiveMemberId(newId);
    setCopyStatus('idle');
  }

  function handleDeleteMember(memberId: string) {
    if (members.length <= 1) return;
    setMembers((prev) => {
      const next = prev.filter((m) => m.id !== memberId);
      if (activeMemberId === memberId && next[0]) {
        setActiveMemberId(next[0].id);
      }
      return next;
    });
    setCopyStatus('idle');
  }

  function handleResetDemo() {
    const demo = createDefaultDemoTeam();
    setMembers(demo);
    setActiveMemberId(demo[0].id);
    setCopyStatus('idle');
  }

  function handleClearAll() {
    const blank: TeamMember[] = [
      {
        id: 'member-me',
        name: 'Bạn',
        isMe: true,
        skills: Array(TEAM_SKILLS.length).fill(0) as SkillLevel[],
      },
    ];
    setMembers(blank);
    setActiveMemberId('member-me');
    setCopyStatus('idle');
  }

  async function handleCopyReport() {
    const text = buildTeamSummaryReport(members);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopyStatus('copied-report');
        return;
      }
    } catch {
      // fallback
    }
    setCopyStatus('error');
  }

  async function handleCopyTsv() {
    const tsv = buildTeamMatrixTsv(members);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(tsv);
        setCopyStatus('copied-tsv');
        return;
      }
    } catch {
      // fallback
    }
    setCopyStatus('error');
  }

  const gaps = findSkillGaps(members);
  const singleDeps = findSingleDependencies(members);
  const wellCovered = findWellCoveredSkills(members);
  const roleRecommendations = getRoleRecommendations(members);

  return (
    <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      {/* Editorial Header */}
      <header className="border-b border-slate-200 pb-6 sm:pb-8">
        {onBackToList && (
          <div className="mb-4">
            <button
              type="button"
              onClick={onBackToList}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Quay lại danh sách công cụ</span>
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
          <span className="font-semibold text-blue-700">
            Chương 5: Kỹ năng làm việc nhóm
          </span>
          <span aria-hidden="true">·</span>
          <span>Bản đồ năng lực kỹ thuật</span>
        </div>

        <div className="mt-2.5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
              Hỗ trợ phân công
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              Mỗi người tự đánh giá kỹ năng trong 1 phút. Cả nhóm thấy ngay mình
              có những lỗ hổng năng lực nào và đang quá phụ thuộc vào ai để phân
              công vai trò dự án cân bằng nhất.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleResetDemo}
              title="Khôi phục nhóm mẫu 4 thành viên"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:border-slate-900 hover:bg-slate-50 hover:text-slate-950"
            >
              <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
              <span>Dữ liệu mẫu</span>
            </button>
            <button
              type="button"
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:border-slate-900 hover:bg-slate-50 hover:text-slate-950"
            >
              {copyStatus === 'copied-report' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã chép báo cáo</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                  <span>Sao chép báo cáo</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCopyTsv}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:border-slate-900 hover:bg-slate-50 hover:text-slate-950"
            >
              {copyStatus === 'copied-tsv' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã chép TSV</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                  <span>Xuất bảng Sheets</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Two-Zone Workspace */}
      <div className="mt-7 grid grid-cols-1 items-start gap-7 lg:mt-8 lg:grid-cols-12 lg:gap-8">
        {/* Left Column (5 cols): Member Profile & Skill Evaluator */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          {/* Member selector section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-700" />
                <h2 className="text-base font-bold text-slate-900">
                  Thành viên nhóm
                </h2>
              </div>
              <span className="text-xs font-semibold tabular-nums text-slate-500">
                {members.length} thành viên
              </span>
            </div>

            {/* Member tabs */}
            <div className="mt-3.5 flex flex-wrap gap-2">
              {members.map((member) => {
                const isActive = member.id === activeMemberId;
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => setActiveMemberId(member.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      isActive
                        ? 'border border-emerald-700 bg-emerald-700 text-white shadow-xs'
                        : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <User className="h-3 w-3" />
                    <span>{member.name}</span>
                    {member.isMe && (
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider ${
                          isActive ? 'text-emerald-200' : 'text-slate-500'
                        }`}
                      >
                        (Bạn)
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={handleAddMember}
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:border-blue-700 hover:bg-blue-50"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Thêm thành viên</span>
              </button>
            </div>

            {/* Active member name input */}
            {activeMember && (
              <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-100">
                <div className="flex-1">
                  <label
                    htmlFor={nameInputId}
                    className="block text-xs font-medium text-slate-500"
                  >
                    Họ và tên hoặc Biệt danh
                  </label>
                  <input
                    id={nameInputId}
                    type="text"
                    maxLength={24}
                    value={activeMember.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Nhập tên thành viên..."
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-sm font-semibold text-slate-900 transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>

                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteMember(activeMember.id)}
                    title="Xóa thành viên này"
                    className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </section>

          {/* Skill assessment panel for active member */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Kỹ năng của {activeMember?.name || 'thành viên'}
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Chạm vào từng kỹ năng để xoay vòng: Chưa có → Làm được → Mạnh nhất.
                </p>
              </div>
            </div>

            {/* List of 10 skills matching the attachment */}
            <div className="mt-3.5 space-y-2">
              {TEAM_SKILLS.map((skill, index) => {
                const level = (activeMember?.skills[index] ?? 0) as SkillLevel;
                const isStrong = level === 2;
                const isCapable = level === 1;

                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() =>
                      activeMember && handleSkillToggle(activeMember.id, index)
                    }
                    className={`group flex w-full items-center justify-between gap-3 rounded-xl border p-2.5 sm:px-3.5 sm:py-3 text-left transition-all ${
                      isStrong
                        ? 'border-emerald-600/60 bg-emerald-50/70 border-l-[6px] border-l-emerald-600 shadow-2xs'
                        : isCapable
                        ? 'border-emerald-200/80 bg-emerald-50/30 border-l-[6px] border-l-emerald-400'
                        : 'border-slate-200 bg-slate-50/60 border-l-[6px] border-l-slate-300 hover:bg-slate-100/70'
                    }`}
                  >
                    <span className="text-sm font-semibold text-slate-900">
                      {skill}
                    </span>

                    <span
                      className={`inline-flex shrink-0 items-center rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
                        isStrong
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : isCapable
                          ? 'bg-emerald-200/80 text-emerald-900'
                          : 'bg-white text-slate-500 border border-slate-200'
                      }`}
                    >
                      {SKILL_LEVEL_LABELS[level]}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column (7 cols): Team Matrix Table & Insights */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Analysis Notification Cards matching the HTML attachment */}
          <section className="space-y-3">
            {/* Header info */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Phân tích thực trạng nhóm ({members.length} người)
                </h2>
              </div>

              {/* Gaps alert */}
              {gaps.length > 0 ? (
                <div className="mt-3.5 rounded-xl border-l-4 border-l-amber-600 border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-950 sm:text-sm">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                    <div>
                      <span className="font-bold">Lỗ hổng của nhóm: </span>
                      {gaps.map((g) => g.skillName).join(', ')}. Chưa ai làm
                      được những việc này, cần có người tự học, chia nhau bổ
                      sung hoặc nhờ cố vấn hướng dẫn.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-3.5 rounded-xl border-l-4 border-l-emerald-600 border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs text-emerald-950 sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-700" />
                    <span>
                      <strong className="font-bold">Chưa có lỗ hổng:</strong> Mọi
                      kỹ năng đều có ít nhất 1 thành viên có thể đảm nhận.
                    </span>
                  </div>
                </div>
              )}

              {/* Single dependency bottleneck alert */}
              {singleDeps.length > 0 && (
                <div className="mt-2.5 rounded-xl border-l-4 border-l-red-600 border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-950 sm:text-sm">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                    <div>
                      <span className="font-bold">Chỉ dựa vào một người: </span>
                      {singleDeps
                        .map((d) => `${d.skillName} (${d.memberName})`)
                        .join('; ')}
                      . Nếu người đó bận hoặc quá tải, nhóm sẽ bị nghẽn tiến độ.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Capability Matrix Table matching the HTML attachment */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Bản đồ năng lực cả nhóm
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Chạm vào bất kỳ ô nào để trực tiếp đổi mức kỹ năng của thành viên.
                </p>
              </div>

              {/* Legend matching the attachment */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs border border-slate-300 bg-slate-100" />
                  <span>Chưa có</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs bg-emerald-200" />
                  <span>Làm được</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs bg-emerald-600" />
                  <span>Mạnh nhất</span>
                </span>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[500px] border-separate border-spacing-1 text-left text-sm">
                <thead>
                  <tr>
                    <th className="py-2 pr-3 text-xs font-semibold text-slate-500 min-w-[170px]">
                      Kỹ năng
                    </th>
                    {members.map((member) => (
                      <th
                        key={member.id}
                        title={member.name}
                        className="max-w-[90px] truncate py-2 px-1 text-center text-xs font-semibold text-slate-700"
                      >
                        {member.name}
                        {member.isMe && (
                          <span className="block text-[10px] text-emerald-700 font-bold">
                            (bạn)
                          </span>
                        )}
                      </th>
                    ))}
                    <th className="py-2 pl-3 text-center text-xs font-semibold text-slate-500">
                      Tình trạng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TEAM_SKILLS.map((skill, skillIndex) => {
                    const capableCount = members.filter(
                      (m) => (m.skills[skillIndex] ?? 0) > 0
                    ).length;
                    const isGap = capableCount === 0;
                    const isSingle = capableCount === 1;

                    return (
                      <tr key={skill} className="hover:bg-slate-50/50">
                        <td className="py-2 pr-3 font-medium text-slate-900 whitespace-nowrap">
                          {skill}
                        </td>
                        {members.map((member) => {
                          const level = (member.skills[skillIndex] ??
                            0) as SkillLevel;
                          return (
                            <td key={member.id} className="p-0.5 text-center">
                              <button
                                type="button"
                                onClick={() =>
                                  handleSkillToggle(member.id, skillIndex)
                                }
                                title={`${member.name}: ${SKILL_LEVEL_LABELS[level]} (Bấm để đổi)`}
                                aria-label={`${member.name} - ${skill}: ${SKILL_LEVEL_LABELS[level]}`}
                                className={`h-8 w-full min-w-[38px] rounded-lg transition-transform active:scale-90 ${
                                  level === 2
                                    ? 'bg-emerald-600 shadow-2xs hover:bg-emerald-700'
                                    : level === 1
                                    ? 'bg-emerald-200/90 hover:bg-emerald-300'
                                    : 'bg-slate-100 hover:bg-slate-200/80 border border-slate-200'
                                }`}
                              />
                            </td>
                          );
                        })}
                        <td className="py-2 pl-3 text-center whitespace-nowrap text-xs">
                          {isGap ? (
                            <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 font-bold text-red-700">
                              Lỗ hổng
                            </span>
                          ) : isSingle ? (
                            <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 font-bold text-amber-800">
                              1 người
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-700">
                              Đảm bảo ({capableCount})
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Chapter 5 Role Suggestions Card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Award className="h-4 w-4 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                Gợi ý phân công vai trò (Chương 5: Làm việc nhóm)
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {roleRecommendations.map((role) => (
                <div
                  key={role.roleTitle}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 transition-all hover:bg-white hover:border-slate-300 hover:shadow-xs"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900">
                      {role.roleTitle}
                    </h3>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-800">
                      {role.roleBadge}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                    {role.roleDescription}
                  </p>

                  <div className="mt-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">
                      Kỹ năng chính:{' '}
                    </span>
                    {role.keySkills.join(', ')}
                  </div>

                  <div className="mt-2.5 flex items-center gap-1.5 pt-2 border-t border-slate-200/80 text-xs">
                    <span className="font-semibold text-slate-800">
                      Ưu tiên gợi ý:
                    </span>
                    {role.recommendedMembers.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {role.recommendedMembers.map((m) => (
                          <span
                            key={m.id}
                            className="inline-flex rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800"
                          >
                            {m.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">
                        Chưa có ứng viên mạnh
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
