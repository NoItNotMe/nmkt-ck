export interface DesignOption {
  id: string;
  name: string;
}

export interface DesignCriterion {
  id: string;
  name: string;
  weight: number;
  scores: number[];
}

export interface DesignDecisionState {
  projectName: string;
  options: DesignOption[];
  criteria: DesignCriterion[];
}

export interface OptionRankEntry {
  optionIndex: number;
  option: DesignOption;
  weightedScore: number;
  weightedSum: number;
}

export interface SensitivityFlip {
  criterionId: string;
  criterionName: string;
  direction: 'increase' | 'decrease';
  nextWeight: number;
  newWinnerName: string;
}

export interface OptionColorTheme {
  hex: string;
  swatchClass: string;
  accentStyle: string;
  barClass: string;
}

export const MIN_DESIGN_OPTIONS = 2;
export const MAX_DESIGN_OPTIONS = 5;
export const MIN_DESIGN_CRITERIA = 3;
export const MAX_DESIGN_CRITERIA = 6;
export const SCORE_MIN = 1;
export const SCORE_MAX = 5;

export const OPTION_COLOR_THEMES: readonly OptionColorTheme[] = [
  {
    hex: '#2563eb',
    swatchClass: 'bg-blue-600',
    accentStyle: '#2563eb',
    barClass: 'bg-blue-600',
  },
  {
    hex: '#d97706',
    swatchClass: 'bg-amber-600',
    accentStyle: '#d97706',
    barClass: 'bg-amber-600',
  },
  {
    hex: '#059669',
    swatchClass: 'bg-emerald-600',
    accentStyle: '#059669',
    barClass: 'bg-emerald-600',
  },
  {
    hex: '#7c3aed',
    swatchClass: 'bg-violet-600',
    accentStyle: '#7c3aed',
    barClass: 'bg-violet-600',
  },
  {
    hex: '#e11d48',
    swatchClass: 'bg-rose-600',
    accentStyle: '#e11d48',
    barClass: 'bg-rose-600',
  },
] as const;

export function getNextOptionName(existingOptions: readonly DesignOption[]): string {
  const usedNames = new Set(
    existingOptions.map((option) => option.name.trim().toLowerCase())
  );
  for (const letter of ['A', 'B', 'C', 'D', 'E']) {
    const candidate = `Phương án ${letter}`;
    if (!usedNames.has(candidate.toLowerCase())) {
      return candidate;
    }
  }
  return `Phương án ${existingOptions.length + 1}`;
}

export function createUniqueDesignId(
  prefix: 'opt' | 'crit',
  existingIds: readonly string[],
  minCounter = 1
): { id: string; nextCounter: number } {
  const usedIds = new Set(existingIds);
  let num = Number.isFinite(minCounter) ? Math.max(1, Math.floor(minCounter)) : 1;
  while (usedIds.has(`${prefix}-${num}`)) {
    num += 1;
  }
  return {
    id: `${prefix}-${num}`,
    nextCounter: num + 1,
  };
}

export function createDemoDesignState(): DesignDecisionState {
  return {
    projectName: 'Xe robot dò đường',
    options: [
      { id: 'opt-a', name: 'Phương án A' },
      { id: 'opt-b', name: 'Phương án B' },
      { id: 'opt-c', name: 'Phương án C' },
    ],
    criteria: [
      {
        id: 'crit-1',
        name: 'Đáp ứng chức năng',
        weight: 5,
        scores: [3, 4, 5],
      },
      {
        id: 'crit-2',
        name: 'Độ bền',
        weight: 4,
        scores: [3, 4, 4],
      },
      {
        id: 'crit-3',
        name: 'Hiệu năng',
        weight: 3,
        scores: [2, 3, 5],
      },
      {
        id: 'crit-4',
        name: 'Tiết kiệm chi phí',
        weight: 3,
        scores: [5, 4, 1],
      },
      {
        id: 'crit-5',
        name: 'Dễ chế tạo',
        weight: 2,
        scores: [5, 4, 2],
      },
    ],
  };
}

export function formatScoreVi(value: number): string {
  return value.toFixed(2).replace('.', ',');
}

export function clampScaleValue(value: number): number {
  if (!Number.isFinite(value)) {
    return SCORE_MIN;
  }
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(value)));
}

export function calculateOptionWeightedSum(
  criteria: readonly DesignCriterion[],
  optionIndex: number
): number {
  return criteria.reduce((sum, criterion) => {
    const score = criterion.scores[optionIndex] ?? SCORE_MIN;
    return sum + criterion.weight * score;
  }, 0);
}

export function calculateOptionWeightedAverage(
  criteria: readonly DesignCriterion[],
  optionIndex: number
): number {
  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
  if (totalWeight <= 0) {
    return 0;
  }
  return calculateOptionWeightedSum(criteria, optionIndex) / totalWeight;
}

export function rankDesignOptions(
  options: readonly DesignOption[],
  criteria: readonly DesignCriterion[]
): OptionRankEntry[] {
  return options
    .map((option, optionIndex) => ({
      optionIndex,
      option,
      weightedScore: calculateOptionWeightedAverage(criteria, optionIndex),
      weightedSum: calculateOptionWeightedSum(criteria, optionIndex),
    }))
    .sort((a, b) => b.weightedScore - a.weightedScore);
}

export function getTopOptionIndices(
  ranked: readonly OptionRankEntry[]
): number[] {
  if (ranked.length === 0) {
    return [];
  }
  const topScore = ranked[0].weightedScore;
  return ranked
    .filter((entry) => Math.abs(entry.weightedScore - topScore) < 1e-9)
    .map((entry) => entry.optionIndex);
}

export function getUniqueWinnerIndex(
  options: readonly DesignOption[],
  criteria: readonly DesignCriterion[]
): number {
  const ranked = rankDesignOptions(options, criteria);
  const topIndices = getTopOptionIndices(ranked);
  return topIndices.length === 1 ? topIndices[0] : -1;
}

export function resolveHighlightedOptionIndices(
  options: readonly DesignOption[],
  topOptionIndices: readonly number[],
  selectedOptionId: string | null
): number[] {
  if (selectedOptionId) {
    const matchedIndex = options.findIndex(
      (option) => option.id === selectedOptionId
    );
    if (matchedIndex >= 0) {
      return [matchedIndex];
    }
  }
  return [...topOptionIndices];
}

export function computeSensitivityFlips(
  options: readonly DesignOption[],
  criteria: readonly DesignCriterion[],
  maxFlips = 3
): SensitivityFlip[] {
  const baseWinner = getUniqueWinnerIndex(options, criteria);
  const flips: SensitivityFlip[] = [];

  for (let ci = 0; ci < criteria.length; ci += 1) {
    const criterion = criteria[ci];
    for (const delta of [1, -1] as const) {
      if (flips.length >= maxFlips) {
        return flips;
      }
      const nextWeight = criterion.weight + delta;
      if (nextWeight < SCORE_MIN || nextWeight > SCORE_MAX) {
        continue;
      }
      const perturbed = criteria.map((item, idx) =>
        idx === ci ? { ...item, weight: nextWeight } : item
      );
      const nextWinner = getUniqueWinnerIndex(options, perturbed);
      if (nextWinner !== baseWinner && nextWinner >= 0) {
        flips.push({
          criterionId: criterion.id,
          criterionName: criterion.name,
          direction: delta > 0 ? 'increase' : 'decrease',
          nextWeight,
          newWinnerName: options[nextWinner]?.name ?? '',
        });
      }
    }
  }

  return flips;
}

export interface RadarCriterionLabelLayout {
  lines: string[];
  x: number;
  y: number;
  textAnchor: 'start' | 'middle' | 'end';
  lineHeight: number;
}

export function getRadarPoint(
  criterionIndex: number,
  totalCriteria: number,
  value: number,
  centerX = 280,
  centerY = 172,
  radius = 94
): [number, number] {
  const angle = -Math.PI / 2 + (criterionIndex * 2 * Math.PI) / totalCriteria;
  const scaled = (radius * value) / SCORE_MAX;
  return [
    centerX + scaled * Math.cos(angle),
    centerY + scaled * Math.sin(angle),
  ];
}

function splitLongToken(token: string, maxChars: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < token.length; i += maxChars) {
    chunks.push(token.slice(i, i + maxChars));
  }
  return chunks;
}

export function wrapRadarLabelText(
  criterionName: string,
  weight: number,
  maxCharsPerLine = 18
): string[] {
  const cleanName = criterionName.trim() || 'Tiêu chí';
  const weightToken = `×${weight}`;
  const fullText = `${cleanName} ${weightToken}`;

  if (fullText.length <= maxCharsPerLine) {
    return [fullText];
  }

  const rawWords = fullText.split(/\s+/).filter(Boolean);
  const words = rawWords.flatMap((word) =>
    word.length > maxCharsPerLine ? splitLongToken(word, maxCharsPerLine) : [word]
  );

  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
      continue;
    }
    const candidate = `${currentLine} ${word}`;
    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  // Avoid an orphaned "×n" alone on the last line when moving the prior word stays balanced
  if (lines.length >= 2 && lines[lines.length - 1] === weightToken) {
    const prevIdx = lines.length - 2;
    const prevWords = lines[prevIdx].split(' ');
    if (prevWords.length > 1) {
      const movedWord = prevWords[prevWords.length - 1];
      const mergedLast = `${movedWord} ${weightToken}`;
      if (mergedLast.length <= maxCharsPerLine) {
        lines[prevIdx] = prevWords.slice(0, -1).join(' ');
        lines[lines.length - 1] = mergedLast;
      }
    }
  }

  return lines;
}

export function getRadarCriterionLabelLayout(
  criterionIndex: number,
  totalCriteria: number,
  criterionName: string,
  weight: number,
  centerX = 280,
  centerY = 172,
  baseLabelRadius = 114
): RadarCriterionLabelLayout {
  const angle = -Math.PI / 2 + (criterionIndex * 2 * Math.PI) / totalCriteria;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const textAnchor: 'start' | 'middle' | 'end' =
    cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle';

  const maxCharsPerLine =
    textAnchor === 'middle' ? 22 : Math.abs(cos) >= 0.75 ? 17 : 20;
  const lines = wrapRadarLabelText(criterionName, weight, maxCharsPerLine);

  const fullLength = (criterionName.trim() || 'Tiêu chí').length + 3;
  const extraOutward = lines.length > 1 ? 9 : fullLength > 16 ? 5 : 0;
  const labelRadius = baseLabelRadius + extraOutward;

  const [x, baseY] = getRadarPoint(
    criterionIndex,
    totalCriteria,
    SCORE_MAX,
    centerX,
    centerY,
    labelRadius
  );

  const lineHeight = 14;
  let y = baseY + 4;

  if (sin < -0.5) {
    // Top label: push start Y upward so wrapped lines grow down without touching the vertex
    y = baseY - (lines.length - 1) * lineHeight;
  } else if (sin <= 0.5) {
    // Side label: vertically center the multi-line block around the axis anchor
    y = baseY + 4 - ((lines.length - 1) * lineHeight) / 2;
  }

  return {
    lines,
    x,
    y,
    textAnchor,
    lineHeight,
  };
}

export function buildDesignDecisionTsv(state: DesignDecisionState): string {
  const totalWeight = state.criteria.reduce((sum, c) => sum + c.weight, 0);
  const rows: string[][] = [
    [`Đề tài: ${state.projectName}`],
    [
      'Phương án',
      ...state.criteria.map((c) => c.name),
      'Tổng cộng',
      'Trung bình',
    ],
    ['Độ quan trọng', ...state.criteria.map((c) => String(c.weight)), '', ''],
  ];

  state.options.forEach((option, optionIndex) => {
    const weightedSum = calculateOptionWeightedSum(state.criteria, optionIndex);
    const average = totalWeight > 0 ? weightedSum / totalWeight : 0;
    rows.push([
      option.name,
      ...state.criteria.map((c) => String(c.scores[optionIndex] ?? SCORE_MIN)),
      String(weightedSum),
      formatScoreVi(average),
    ]);
  });

  rows.push([
    'Ghi chú: Tổng cộng và Trung bình đã nhân độ quan trọng của từng tiêu chí.',
  ]);

  return rows.map((row) => row.join('\t')).join('\n');
}
