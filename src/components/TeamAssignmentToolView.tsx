import { useEffect, useId, useState } from 'react';
import {
  Check,
  Copy,
  Plus,
  Send,
  Share2,
  User,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import {
  createDefaultDemoTeam,
  createEmptySkills,
  cycleSkillLevel,
  normalizeGroupCode,
  SKILL_LEVEL_LABELS,
  TEAM_SKILLS,
  type SkillLevel,
  type TeamGroup,
  type TeamMember,
} from '../utils/teamAssignment';

const STORAGE_GROUP_KEY = 'when2meet_team_active_group_code_v1';
const STORAGE_MY_NAME_KEY = 'when2meet_team_my_name_v1';
const STORAGE_MY_SKILLS_KEY = 'when2meet_team_my_skills_v1';

interface TeamAssignmentToolViewProps {
  onBackToList?: () => void;
}

export function TeamAssignmentToolView({
  onBackToList,
}: TeamAssignmentToolViewProps) {
  // Group state
  const [currentGroup, setCurrentGroup] = useState<TeamGroup | null>(() => {
    // If we have demo mode or saved group code
    if (typeof window !== 'undefined') {
      try {
        const savedCode = localStorage.getItem(STORAGE_GROUP_KEY);
        if (savedCode === 'DEMO') {
          return {
            code: 'DEMO',
            name: 'Đồ án Nhập môn Kỹ thuật - Nhóm mẫu',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            members: createDefaultDemoTeam(),
          };
        }
      } catch {
        // ignore
      }
    }
    return null;
  });

  // Landing input states
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [landingError, setLandingError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // My member editing state inside the group
  const [myName, setMyName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_MY_NAME_KEY) || '';
    }
    return '';
  });

  const [mySkills, setMySkills] = useState<SkillLevel[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_MY_SKILLS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === TEAM_SKILLS.length) {
            return parsed as SkillLevel[];
          }
        }
      } catch {
        // ignore
      }
    }
    return createEmptySkills();
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [copyStatus, setCopyStatus] = useState<
    'idle' | 'copied-code' | 'copied-link' | 'copied-report' | 'copied-tsv' | 'error'
  >('idle');

  const joinCodeInputId = useId();
  const myNameInputId = useId();

  // Poll group updates when inside a live group
  useEffect(() => {
    if (!currentGroup || currentGroup.code === 'DEMO') return;

    let isMounted = true;
    async function fetchGroup() {
      try {
        const res = await fetch(`/api/assignment-groups/${currentGroup?.code}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.group && isMounted) {
            setCurrentGroup(data.group);
          }
        }
      } catch {
        // Network offline or server unreachable
      }
    }

    const timer = setInterval(fetchGroup, 4000);
    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [currentGroup?.code]);

  // Save active group code to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (currentGroup) {
        localStorage.setItem(STORAGE_GROUP_KEY, currentGroup.code);
      } else {
        localStorage.removeItem(STORAGE_GROUP_KEY);
      }
    } catch {
      // ignore
    }
  }, [currentGroup?.code]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (currentGroup?.code === 'DEMO') return;
    try {
      localStorage.setItem(STORAGE_MY_NAME_KEY, myName);
      localStorage.setItem(STORAGE_MY_SKILLS_KEY, JSON.stringify(mySkills));
    } catch {
      // ignore
    }
  }, [myName, mySkills, currentGroup?.code]);

  // If we have a saved group code on mount and it's not demo, fetch it
  useEffect(() => {
    if (currentGroup || typeof window === 'undefined') return;
    const savedCode = localStorage.getItem(STORAGE_GROUP_KEY);
    if (!savedCode) return;
    if (savedCode === 'DEMO') {
      setCurrentGroup({
        code: 'DEMO',
        name: 'Đồ án Nhập môn Kỹ thuật - Nhóm mẫu',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        members: createDefaultDemoTeam(),
      });
      setMyName('Vũ Duy Mạnh');
      setMySkills([2, 2, 1, 1, 0, 1]);
      return;
    }

    async function loadSavedGroup() {
      try {
        const res = await fetch(`/api/assignment-groups/${savedCode}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.group) {
            setCurrentGroup(data.group);
          }
        }
      } catch {
        // ignore
      }
    }
    loadSavedGroup();
  }, [currentGroup]);

  async function handleCreateGroup(rawCodeInput?: string) {
    setLandingError(null);
    setIsSubmitting(true);
    const trimmedCode = (rawCodeInput ?? '').trim();
    const normalizedCode = normalizeGroupCode(trimmedCode);
    const groupName = normalizedCode ? `Nhóm ${normalizedCode}` : 'Nhóm mới';
    try {
      const res = await fetch('/api/assignment-groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: groupName,
          code: trimmedCode,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Không thể tạo nhóm mới.');
      }
      setMySkills(createEmptySkills());
      setSaveStatus('idle');
      setCurrentGroup(data.group);
    } catch (err) {
      setLandingError(
        err instanceof Error ? err.message : 'Lỗi kết nối máy chủ.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleJoinGroup(e: React.FormEvent) {
    e.preventDefault();
    setLandingError(null);
    const code = normalizeGroupCode(joinCodeInput);
    if (!code) {
      setLandingError('Vui lòng nhập mã nhóm hợp lệ.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/assignment-groups/${code}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Không tìm thấy nhóm với mã này.');
      }
      setMySkills(createEmptySkills());
      setSaveStatus('idle');
      setCurrentGroup(data.group);
    } catch (err) {
      setLandingError(
        err instanceof Error ? err.message : 'Không tìm thấy nhóm.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleLoadDemo() {
    setCurrentGroup({
      code: 'DEMO',
      name: 'Đồ án Nhập môn Kỹ thuật - Nhóm mẫu',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members: createDefaultDemoTeam(),
    });
    setMyName('Vũ Duy Mạnh');
    setMySkills([2, 2, 1, 1, 0, 1]);
    setLandingError(null);
  }

  function handleCycleMySkill(index: number) {
    setMySkills((prev) => {
      const next = [...prev];
      next[index] = cycleSkillLevel(next[index] ?? 0);
      return next;
    });
    setSaveStatus('idle');
  }

  async function handleSaveMySkills(e: React.FormEvent) {
    e.preventDefault();
    if (!myName.trim()) {
      alert('Vui lòng nhập tên của bạn trước khi gửi.');
      return;
    }

    if (!currentGroup) return;

    if (currentGroup.code === 'DEMO') {
      // Local demo update
      const cleanName = myName.trim();
      const existingIdx = currentGroup.members.findIndex(
        (m) => m.name.trim().toLowerCase() === cleanName.toLowerCase()
      );
      let updatedMembers = [...currentGroup.members];
      if (existingIdx >= 0) {
        updatedMembers[existingIdx] = {
          ...updatedMembers[existingIdx],
          name: cleanName,
          skills: mySkills,
        };
      } else {
        updatedMembers.push({
          id: `demo_${Date.now()}`,
          name: cleanName,
          skills: mySkills,
        });
      }
      setCurrentGroup({
        ...currentGroup,
        members: updatedMembers,
      });
      setSaveStatus('saved');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/assignment-groups/${currentGroup.code}/member`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: myName,
          skills: mySkills,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Không thể lưu kỹ năng.');
      }
      setCurrentGroup(data.group);
      setSaveStatus('saved');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Không thể lưu kỹ năng.');
      setSaveStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteMember(memberId: string) {
    if (!currentGroup) return;
    if (currentGroup.code === 'DEMO') {
      setCurrentGroup({
        ...currentGroup,
        members: currentGroup.members.filter((m) => m.id !== memberId),
      });
      return;
    }

    try {
      const res = await fetch(
        `/api/assignment-groups/${currentGroup.code}/member/${memberId}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        const data = await res.json();
        setCurrentGroup(data.group);
      }
    } catch {
      alert('Không thể xóa thành viên.');
    }
  }

  async function handleCopyCode() {
    if (!currentGroup) return;
    try {
      await navigator.clipboard.writeText(currentGroup.code);
      setCopyStatus('copied-code');
      setTimeout(() => setCopyStatus('idle'), 2500);
    } catch {
      setCopyStatus('error');
    }
  }

  async function handleCopyLink() {
    if (!currentGroup) return;
    const url = `${window.location.origin}${window.location.pathname}#nhom/muc-5?code=${currentGroup.code}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus('copied-link');
      setTimeout(() => setCopyStatus('idle'), 2500);
    } catch {
      setCopyStatus('error');
    }
  }

  // --- RENDER 1: WHEN2MEET LANDING (CREATE / JOIN GROUP) ---
  if (!currentGroup) {
    return (
      <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">


        <header className="border-b border-slate-200 pb-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
            <span className="font-semibold text-blue-700">
              Chương 5: Kỹ năng làm việc nhóm
            </span>
            <span aria-hidden="true">·</span>
            <span>Hỗ trợ phân công</span>
          </div>

          <h1 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Tạo nhóm hoặc Tham gia bằng 1 mã
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Chủ nhóm tạo một phòng với một mã duy nhất và chia
            sẻ cho các thành viên. Mỗi thành viên nhập mã để tham gia, điền tên và chọn
            mức độ 6 kỹ năng của mình để cả nhóm thấy ngay bản đồ năng lực.
          </p>
        </header>

        {landingError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800">
            {landingError}
          </div>
        )}

        <div className="mt-8 max-w-xl mx-auto">
          {/* Card 2: Join Group by Code */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Users className="h-5 w-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                Tham gia hoặc Tạo nhóm bằng mã
              </h2>
            </div>

            <form onSubmit={handleJoinGroup} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor={joinCodeInputId}
                  className="block text-xs font-semibold text-slate-700"
                >
                  Nhập mã nhóm hoặc tạo mã mới
                </label>
                <input
                  id={joinCodeInputId}
                  type="text"
                  maxLength={12}
                  value={joinCodeInput}
                  onChange={(e) => setJoinCodeInput(e.target.value)}
                  placeholder="Ví dụ: A7K9M2 hoặc NHOM3"
                  className="mt-1.5 uppercase tracking-widest font-mono text-center font-bold text-lg w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-600 disabled:opacity-50"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Vào nhóm</span>
                </button>
                <button
                  type="button"
                  onClick={() => void handleCreateGroup(joinCodeInput)}
                  disabled={isSubmitting}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-slate-800 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tạo nhóm mới với mã này</span>
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500 mb-3">
                Hoặc trải nghiệm nhanh với dữ liệu mẫu có sẵn:
              </p>
              <button
                type="button"
                onClick={handleLoadDemo}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:bg-slate-50"
              >
                <Wrench className="h-3.5 w-3.5 text-slate-500" />
                <span>Xem nhóm mẫu 4 thành viên</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // --- RENDER 2: ACTIVE GROUP WORKSPACE ---
  return (
    <div className="mx-auto min-h-[calc(100svh_-_3.5rem)] w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
      {/* Header bar with group code & actions */}
      <header className="border-b border-slate-200 pb-6 sm:pb-8">


        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <span className="font-semibold text-blue-700">
                Chương 5: Kỹ năng làm việc nhóm
              </span>
              <span>·</span>
              <span>Mã nhóm:</span>
              <span className="rounded-md bg-slate-900 px-2 py-0.5 font-mono font-bold text-white tracking-wider">
                {currentGroup.code}
              </span>
            </div>

            <h1 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {currentGroup.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:bg-slate-50"
            >
              {copyStatus === 'copied-code' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã chép mã</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                  <span>Sao chép mã nhóm</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:bg-slate-50"
            >
              {copyStatus === 'copied-link' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã chép liên kết</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-slate-500" />
                  <span>Chép link mời</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                if (currentGroup.code === 'DEMO') {
                  setMyName(
                    typeof window !== 'undefined'
                      ? localStorage.getItem(STORAGE_MY_NAME_KEY) || ''
                      : ''
                  );
                }
                setMySkills(createEmptySkills());
                setSaveStatus('idle');
                setCurrentGroup(null);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              <span>Đổi nhóm / Tạo mới</span>
            </button>
          </div>
        </div>
      </header>

      {/* Two-Zone Workspace */}
      <div className="mt-7 grid grid-cols-1 items-start gap-7 lg:mt-8 lg:grid-cols-12 lg:gap-8">
        {/* Left Column (5 cols): Enter my name and select my skills When2Meet style */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-emerald-700" />
                <h2 className="text-base font-bold text-slate-900">
                  Kỹ năng của bạn trong nhóm
                </h2>
              </div>
              {saveStatus === 'saved' && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <Check className="h-3.5 w-3.5" /> Đã lưu
                </span>
              )}
            </div>

            <form onSubmit={handleSaveMySkills} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor={myNameInputId}
                  className="block text-xs font-semibold text-slate-700"
                >
                  Họ và tên của bạn
                </label>
                <input
                  id={myNameInputId}
                  type="text"
                  maxLength={32}
                  value={myName}
                  onChange={(e) => {
                    setMyName(e.target.value);
                    setSaveStatus('idle');
                  }}
                  placeholder="Nhập tên của bạn (vd: Trần Văn Nam)"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 mb-2">
                  Bấm vào từng kỹ năng để chọn mức độ (Chưa có → Làm được → Mạnh nhất):
                </p>

                <div className="space-y-2">
                  {TEAM_SKILLS.map((skill, index) => {
                    const level = mySkills[index] ?? 0;
                    const isStrong = level === 2;
                    const isCapable = level === 1;

                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleCycleMySkill(index)}
                        className={`group flex w-full items-center justify-between gap-3 rounded-xl border p-2.5 text-left transition-all ${
                          isStrong
                            ? 'border-emerald-600 bg-emerald-50/70 border-l-[6px] border-l-emerald-600 shadow-2xs'
                            : isCapable
                            ? 'border-emerald-300 bg-emerald-50/30 border-l-[6px] border-l-emerald-400'
                            : 'border-slate-200 bg-slate-50/60 border-l-[6px] border-l-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">
                          {skill}
                        </span>
                        <span
                          className={`inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-bold transition-all ${
                            isStrong
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : isCapable
                              ? 'bg-emerald-200 text-emerald-900'
                              : 'bg-white text-slate-500 border border-slate-200'
                          }`}
                        >
                          {SKILL_LEVEL_LABELS[level]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-600 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                <span>Gửi / Cập nhật kỹ năng của tôi lên nhóm</span>
              </button>
            </form>
          </section>
        </div>

        {/* Right Column (7 cols): Team Matrix */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Matrix Table */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Bảng tổng hợp kỹ năng toàn nhóm
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Hiển thị theo thời gian thực khi các thành viên tham gia nhóm.
                </p>
              </div>

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

            {currentGroup.members.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-500">
                Chưa có thành viên nào tham gia nhóm. Hãy chia sẻ mã nhóm{' '}
                <strong className="font-mono font-bold text-slate-900">
                  {currentGroup.code}
                </strong>{' '}
                để các thành viên cùng điền.
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-separate border-spacing-1 text-left text-xs sm:text-sm">
                  <thead>
                    <tr>
                      <th className="py-2 pr-2 text-xs font-semibold text-slate-500 min-w-[135px]">
                        Kỹ năng
                      </th>
                      {currentGroup.members.map((member) => (
                        <th
                          key={member.id}
                          title={member.name}
                          className="min-w-[56px] max-w-[84px] py-2 px-0.5 text-center align-bottom text-[11px] font-semibold text-slate-700 whitespace-normal"
                        >
                          <div className="flex items-center justify-center gap-0.5">
                            <span className="whitespace-normal break-words leading-tight">
                              {member.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteMember(member.id)}
                              title="Xóa thành viên"
                              className="shrink-0 text-slate-300 hover:text-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </th>
                      ))}
                      <th className="py-2 pl-2 text-center text-xs font-semibold text-slate-500 whitespace-nowrap">
                        Tình trạng
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TEAM_SKILLS.map((skill, skillIndex) => {
                      const capableCount = currentGroup.members.filter(
                        (m) => (m.skills[skillIndex] ?? 0) > 0
                      ).length;
                      const isGap = capableCount === 0;
                      const isSingle = capableCount === 1;

                      return (
                        <tr key={skill} className="hover:bg-slate-50/50">
                          <td className="py-2 pr-2 text-xs font-medium text-slate-900 sm:text-[13px]">
                            {skill}
                          </td>
                          {currentGroup.members.map((member) => {
                            const level = member.skills[skillIndex] ?? 0;
                            return (
                              <td key={member.id} className="p-0.5 text-center">
                                <div
                                  title={`${member.name}: ${SKILL_LEVEL_LABELS[level]}`}
                                  className={`h-8 w-full min-w-[32px] rounded-lg ${
                                    level === 2
                                      ? 'bg-emerald-600 shadow-2xs'
                                      : level === 1
                                      ? 'bg-emerald-200/90'
                                      : 'bg-slate-100 border border-slate-200'
                                  }`}
                                />
                              </td>
                            );
                          })}
                          <td className="py-2 pl-2 text-center whitespace-nowrap text-[11px]">
                            {isGap ? (
                              <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 font-bold text-red-700">
                                Lỗ hổng
                              </span>
                            ) : isSingle ? (
                              <span className="inline-flex rounded-full bg-amber-100 px-2 py-0.5 font-bold text-amber-800">
                                1 người
                              </span>
                            ) : (
                              <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
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
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

