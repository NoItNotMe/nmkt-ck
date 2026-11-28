export const SI_BASE_UNITS = ['m', 'kg', 's', 'A', 'K', 'mol', 'cd'] as const;

export type DimensionVector = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

interface UnitDefinition {
  n: string[];
  f: number;
  d: DimensionVector;
  p: boolean;
  ang?: 1;
  t?: (v: number) => number;
  tn?: string;
}

export interface ConvertedDisplay {
  num: string;
  unit: string;
}

export interface SingleConversionResult {
  kind: 'single';
  num: string;
  unit: string;
  copyText: string;
  nameDesc: string | null;
  baseUnitText: string | null;
  dimensionless: boolean;
  offsetFormula: string | null;
  unitReference: { unitExpr: string; perOneText: string } | null;
}

export interface MultiConversionRow {
  label: string;
  num: string;
  unit: string;
}

export interface MultiConversionResult {
  kind: 'multi';
  rows: MultiConversionRow[];
  total: MultiConversionRow | null;
  copyText: string;
}

export interface ErrorConversionResult {
  kind: 'error';
  message: string;
}

export interface EmptyConversionResult {
  kind: 'empty';
}

export type SiEvaluationResult =
  | EmptyConversionResult
  | SingleConversionResult
  | MultiConversionResult
  | ErrorConversionResult;

export const SI_EXAMPLES: readonly string[] = [
  '36 km/h',
  '1 atm',
  '2,5 kWh',
  '3 tạ',
  '90 °F',
  '5 mg/mL',
  '1500 vòng/phút',
  '1 eV',
  '200 mAh',
  '8,854×10^-12 C²/N·m²',
] as const;

const SUPERSCRIPT_DIGITS = '⁰¹²³⁴⁵⁶⁷⁸⁹';

export function toSuperscript(n: number | string): string {
  return String(n)
    .replace('-', '⁻')
    .replace(/\d/g, (c) => SUPERSCRIPT_DIGITS[Number(c)] ?? c);
}

const PREFIXES: Record<string, number> = {
  da: 1e1,
  h: 1e2,
  k: 1e3,
  M: 1e6,
  G: 1e9,
  T: 1e12,
  P: 1e15,
  E: 1e18,
  Z: 1e21,
  Y: 1e24,
  R: 1e27,
  Q: 1e30,
  d: 1e-1,
  c: 1e-2,
  m: 1e-3,
  µ: 1e-6,
  μ: 1e-6,
  u: 1e-6,
  n: 1e-9,
  p: 1e-12,
  f: 1e-15,
  a: 1e-18,
  z: 1e-21,
  y: 1e-24,
  r: 1e-27,
  q: 1e-30,
};

const PREFIX_KEYS = Object.keys(PREFIXES).sort((a, b) => b.length - a.length);

function parseDim(s: string): DimensionVector {
  const d: DimensionVector = [0, 0, 0, 0, 0, 0, 0];
  s.split(' ')
    .filter(Boolean)
    .forEach((tok) => {
      const m = tok.match(/^([A-Za-z]+)(-?\d+)?$/);
      if (m) {
        const idx = SI_BASE_UNITS.indexOf(
          m[1] as (typeof SI_BASE_UNITS)[number]
        );
        if (idx >= 0) {
          d[idx] = m[2] ? Number(m[2]) : 1;
        }
      }
    });
  return d;
}

const UNITS: UnitDefinition[] = [];

function registerUnit(
  names: string,
  f: number,
  d: string,
  allowPrefix = 0,
  extra?: Partial<Pick<UnitDefinition, 'ang' | 't' | 'tn'>>
) {
  UNITS.push({
    n: names.split(' '),
    f,
    d: parseDim(d),
    p: Boolean(allowPrefix),
    ...extra,
  });
}

registerUnit('m', 1, 'm', 1);
registerUnit('g', 1e-3, 'kg', 1);
registerUnit('s giây sec', 1, 's', 1);
registerUnit('A', 1, 'A', 1);
registerUnit('K', 1, 'K', 1);
registerUnit('mol', 1, 'mol', 1);
registerUnit('cd', 1, 'cd', 1);
registerUnit('Å angstrom', 1e-10, 'm', 1);
registerUnit('ly', 9.4607304725808e15, 'm');
registerUnit('AU au', 1.495978707e11, 'm');
registerUnit('pc', 3.0856775814913673e16, 'm', 1);
registerUnit('in inch', 0.0254, 'm');
registerUnit('ft foot', 0.3048, 'm');
registerUnit('yd', 0.9144, 'm');
registerUnit('mi dặm', 1609.344, 'm');
registerUnit('nmi', 1852, 'm');
registerUnit('ha', 1e4, 'm2');
registerUnit('a', 100, 'm2');
registerUnit('L l lít', 1e-3, 'm3', 1);
registerUnit('cc', 1e-6, 'm3');
registerUnit('t tấn', 1e3, 'kg', 1);
registerUnit('tạ', 100, 'kg');
registerUnit('yến', 10, 'kg');
registerUnit('amu Da', 1.6605390666e-27, 'kg');
registerUnit('lb lbs', 0.45359237, 'kg');
registerUnit('oz', 0.028349523125, 'kg');
registerUnit('min phút', 60, 's');
registerUnit('h giờ hr', 3600, 's');
registerUnit('d ngày day', 86400, 's');
registerUnit('tuần week', 604800, 's');
registerUnit('tháng', 2592000, 's');
registerUnit('năm yr', 31536000, 's');
registerUnit('rad', 1, '', 1, { ang: 1 });
registerUnit('sr', 1, '');
registerUnit('° độ deg', Math.PI / 180, '', 0, { ang: 1 });
registerUnit('vòng rev', 2 * Math.PI, '', 0, { ang: 1 });
registerUnit('rpm', (2 * Math.PI) / 60, 's-1', 0, { ang: 1 });
registerUnit('Hz', 1, 's-1', 1);
registerUnit('Bq', 1, 's-1', 1);
registerUnit('Ci', 3.7e10, 's-1', 1);
registerUnit('N', 1, 'kg m s-2', 1);
registerUnit('kgf', 9.80665, 'kg m s-2');
registerUnit('dyn', 1e-5, 'kg m s-2');
registerUnit('Pa', 1, 'kg m-1 s-2', 1);
registerUnit('atm', 101325, 'kg m-1 s-2');
registerUnit('mmHg torr Torr', 101325 / 760, 'kg m-1 s-2');
registerUnit('bar', 1e5, 'kg m-1 s-2', 1);
registerUnit('at', 98066.5, 'kg m-1 s-2');
registerUnit('psi', 6894.757293168, 'kg m-1 s-2');
registerUnit('J', 1, 'kg m2 s-2', 1);
registerUnit('cal', 4.184, 'kg m2 s-2', 1);
registerUnit('eV', 1.602176634e-19, 'kg m2 s-2', 1);
registerUnit('Wh', 3600, 'kg m2 s-2', 1);
registerUnit('erg', 1e-7, 'kg m2 s-2');
registerUnit('BTU Btu', 1055.056, 'kg m2 s-2');
registerUnit('W', 1, 'kg m2 s-3', 1);
registerUnit('HP hp', 745.699872, 'kg m2 s-3');
registerUnit('CV', 735.49875, 'kg m2 s-3');
registerUnit('VA var', 1, 'kg m2 s-3', 1);
registerUnit('C', 1, 's A', 1);
registerUnit('Ah', 3600, 's A', 1);
registerUnit('e', 1.602176634e-19, 's A');
registerUnit('V', 1, 'kg m2 s-3 A-1', 1);
registerUnit('F', 1, 'kg-1 m-2 s4 A2', 1);
registerUnit('Ω ohm', 1, 'kg m2 s-3 A-2', 1);
registerUnit('S', 1, 'kg-1 m-2 s3 A2', 1);
registerUnit('Wb', 1, 'kg m2 s-2 A-1', 1);
registerUnit('Mx', 1e-8, 'kg m2 s-2 A-1');
registerUnit('T', 1, 'kg s-2 A-1', 1);
registerUnit('G', 1e-4, 'kg s-2 A-1');
registerUnit('H', 1, 'kg m2 s-2 A-2', 1);
registerUnit('Oe', 1000 / (4 * Math.PI), 'A m-1');
registerUnit('Gy Sv', 1, 'm2 s-2', 1);
registerUnit('rem', 0.01, 'm2 s-2');
registerUnit('kat', 1, 'mol s-1', 1);
registerUnit('lx', 1, 'm-2 cd', 1);
registerUnit('lm', 1, 'cd', 1);
registerUnit('D dpt', 1, 'm-1');
registerUnit('kn knot nút', 1852 / 3600, 'm s-1');
registerUnit('M', 1000, 'mol m-3', 1);
registerUnit('%', 0.01, '');
registerUnit('ppm', 1e-6, '');
registerUnit('ppb', 1e-9, '');
registerUnit('°C degC oC', 1, 'K', 0, {
  t: (v) => v + 273.15,
  tn: 'K = °C + 273,15',
});
registerUnit('°F degF oF', 5 / 9, 'K', 0, {
  t: (v) => ((v + 459.67) * 5) / 9,
  tn: 'K = (°F + 459,67) × 5/9',
});

function findUnit(tok: string): { e: UnitDefinition; k: number } | null {
  for (const ci of [false, true]) {
    const eq = (a: string, b: string) =>
      ci ? a.toLowerCase() === b.toLowerCase() : a === b;
    for (const e of UNITS) {
      if (e.n.some((n) => eq(n, tok))) {
        return { e, k: 1 };
      }
    }
    for (const p of PREFIX_KEYS) {
      if (tok.length > p.length && eq(tok.slice(0, p.length), p)) {
        const rest = tok.slice(p.length);
        for (const e of UNITS) {
          if (e.p && e.n.some((n) => eq(n, rest))) {
            return { e, k: PREFIXES[p] };
          }
        }
      }
    }
  }
  return null;
}

interface ParsedUnitValue {
  f: number;
  d: DimensionVector;
  e: UnitDefinition | null;
}

interface ParseContext {
  ang?: 1;
}

function parseUnitExpression(s: string, ctx: ParseContext): ParsedUnitValue {
  let i = 0;
  const L = s.length;
  const ws = () => {
    while (i < L && /\s/.test(s[i])) i++;
  };
  const mul = (
    a: ParsedUnitValue,
    b: ParsedUnitValue,
    k: number
  ): ParsedUnitValue => ({
    f: a.f * Math.pow(b.f, k),
    d: a.d.map((x, j) => x + k * b.d[j]) as DimensionVector,
    e: null,
  });

  function pw(v: ParsedUnitValue): ParsedUnitValue {
    const m = s.slice(i).match(/^(?:\^\s*\(?\s*(-?\d+)\s*\)?|(-?\d+))/);
    if (!m) return v;
    i += m[0].length;
    const n = Number(m[1] !== undefined ? m[1] : m[2]);
    return {
      f: Math.pow(v.f, n),
      d: v.d.map((x) => x * n) as DimensionVector,
      e: n === 1 ? v.e : null,
    };
  }

  function atom(): ParsedUnitValue {
    ws();
    if (s[i] === '(') {
      i++;
      const v = expr();
      ws();
      if (s[i] !== ')') {
        throw new Error('Thiếu dấu đóng ngoặc )');
      }
      i++;
      return pw(v);
    }
    const m = s.slice(i).match(/^[\p{L}°µμ%]+/u);
    if (!m) {
      throw new Error(`Không hiểu ký tự “${s[i] || ''}”`);
    }
    i += m[0].length;
    const r = findUnit(m[0]);
    if (!r) {
      throw new Error(`Chưa nhận ra đơn vị “${m[0]}”`);
    }
    if (r.e.ang) ctx.ang = 1;
    return pw({
      f: r.e.f * r.k,
      d: r.e.d.slice() as DimensionVector,
      e: r.k === 1 ? r.e : null,
    });
  }

  function expr(): ParsedUnitValue {
    let v = atom();
    for (;;) {
      ws();
      const c = s[i];
      if (c === '*') {
        i++;
        v = mul(v, atom(), 1);
      } else if (c === '/') {
        i++;
        let dn = atom();
        for (;;) {
          ws();
          const c2 = s[i];
          if (c2 === '*' || c2 === '/') {
            i++;
            dn = mul(dn, atom(), 1);
          } else if (i < L && c2 !== ')') {
            dn = mul(dn, atom(), 1);
          } else {
            break;
          }
        }
        v = mul(v, dn, -1);
      } else if (i < L && c !== ')') {
        v = mul(v, atom(), 1);
      } else {
        break;
      }
    }
    return v;
  }

  const v = expr();
  ws();
  if (i < L) {
    throw new Error(`Không hiểu phần “${s.slice(i)}”`);
  }
  return v;
}

const DERIVED_NAMES: Record<string, readonly [string | null, string]> = {
  '0,1,-2,0,0,0,0': ['N', 'newton · lực'],
  '-1,1,-2,0,0,0,0': ['Pa', 'pascal · áp suất'],
  '2,1,-2,0,0,0,0': ['J', 'joule · năng lượng, công, nhiệt lượng'],
  '2,1,-3,0,0,0,0': ['W', 'watt · công suất'],
  '0,0,1,1,0,0,0': ['C', 'coulomb · điện tích'],
  '2,1,-3,-1,0,0,0': ['V', 'volt · hiệu điện thế'],
  '-2,-1,4,2,0,0,0': ['F', 'farad · điện dung'],
  '2,1,-3,-2,0,0,0': ['Ω', 'ohm · điện trở'],
  '-2,-1,3,2,0,0,0': ['S', 'siemens · điện dẫn'],
  '2,1,-2,-1,0,0,0': ['Wb', 'weber · từ thông'],
  '0,1,-2,-1,0,0,0': ['T', 'tesla · cảm ứng từ'],
  '2,1,-2,-2,0,0,0': ['H', 'henry · độ tự cảm'],
  '0,0,-1,0,0,0,0': ['Hz', 'hertz · tần số (cũng là Bq, rad/s)'],
  '2,0,-2,0,0,0,0': ['Gy', 'gray · liều hấp thụ (cũng là Sv, J/kg)'],
  '0,0,-1,0,0,1,0': ['kat', 'katal · hoạt độ xúc tác'],
  '-2,0,0,0,0,0,1': ['lx', 'lux · độ rọi (cũng là cd/m²)'],
  '1,0,-1,0,0,0,0': [null, 'vận tốc'],
  '1,0,-2,0,0,0,0': [null, 'gia tốc'],
  '2,0,0,0,0,0,0': [null, 'diện tích'],
  '3,0,0,0,0,0,0': [null, 'thể tích'],
  '-3,1,0,0,0,0,0': [null, 'khối lượng riêng'],
  '1,1,-1,0,0,0,0': [null, 'động lượng'],
  '2,1,-1,0,0,0,0': [null, 'mômen động lượng'],
  '-3,0,0,0,0,1,0': [null, 'nồng độ mol'],
  '0,1,0,0,0,-1,0': [null, 'khối lượng mol'],
  '-1,0,0,0,0,0,0': [null, 'số sóng, độ tụ'],
  '-3,-1,4,2,0,0,0': ['F/m', 'hằng số điện môi · C²/(N·m²)'],
  '1,1,-2,-2,0,0,0': ['H/m', 'độ từ thẩm · N/A²'],
  '1,1,-3,-1,0,0,0': ['V/m', 'cường độ điện trường · N/C'],
};

export function formatBaseUnitForm(d: DimensionVector): string {
  const pos: string[] = [];
  const neg: [string, number][] = [];
  d.forEach((x, j) => {
    if (x > 0) pos.push(SI_BASE_UNITS[j] + (x > 1 ? toSuperscript(x) : ''));
    else if (x < 0) neg.push([SI_BASE_UNITS[j], -x]);
  });
  const negFormatted = neg.map(
    ([b, x]) => b + (x > 1 ? toSuperscript(x) : '')
  );
  if (!neg.length) return pos.join('·');
  if (!pos.length) {
    return neg.map(([b, x]) => b + toSuperscript(-x)).join('·');
  }
  return (
    pos.join('·') +
    '/' +
    (negFormatted.length > 1 ? `(${negFormatted.join('·')})` : negFormatted[0])
  );
}

export function formatSiNumber(x: number): string {
  if (x === 0) return '0';
  const a = Math.abs(x);
  if (a >= 1e-3 && a < 1e6) {
    const parts = String(+x.toPrecision(7)).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');
    return parts.join(',');
  }
  const [m, e] = x.toExponential(6).split('e');
  return String(+m).replace('.', ',') + ' × 10' + toSuperscript(parseInt(e, 10));
}

interface RawConvertedQuantity {
  si: number;
  dim: DimensionVector;
  f: number;
  rest: string;
  hasNum: boolean;
  val?: number;
  ctx: ParseContext;
  off: string | null;
}

function convertSingle(raw: string): RawConvertedQuantity | null {
  let s = raw.normalize('NFC').trim();
  if (!s) return null;
  s = s
    .replace(
      /[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g,
      (m) =>
        '^' +
        [...m]
          .map((c) => (c === '⁻' ? '-' : String(SUPERSCRIPT_DIGITS.indexOf(c))))
          .join('')
    )
    .replace(/[−–]/g, '-')
    .replace(/\*\*/g, '^')
    .replace(/h[ảa]i\s*l[ýy]/gi, 'nmi')
    .replace(/m[ãa]\s*l[ựu]c/gi, 'HP')
    .replace(/độ\s*([CF])(?![\p{L}])/gu, '°$1')
    .replace(/độ\s*K(?![\p{L}])/gu, 'K');

  const NT =
    '(\\d+(?:[.,]\\d*)?|[.,]\\d+)(?:\\s*[eE]\\s*([+-]?\\d+))?(?:\\s*\\^\\s*\\(?\\s*([+-]?\\d+)\\s*\\)?)?';
  const tv = (m: RegExpMatchArray) =>
    Math.pow(
      parseFloat(m[1].replace(',', '.')) * Math.pow(10, Number(m[2] || 0)),
      m[3] === undefined ? 1 : Number(m[3])
    );

  let val = 1;
  let hasNum = false;
  const nm = s.match(new RegExp(`^([+-]?)\\s*${NT}`));
  if (nm) {
    hasNum = true;
    val = tv(nm.slice(1) as RegExpMatchArray);
    if (nm[1] === '-') val = -val;
    s = s.slice(nm[0].length);
    const re = new RegExp(`^\\s*[×xX*·⋅]\\s*${NT}`);
    let m2: RegExpMatchArray | null;
    while ((m2 = s.match(re))) {
      val *= tv(m2);
      s = s.slice(m2[0].length);
    }
  }

  const rest = s
    .trim()
    .replace(/^[*·⋅×]\s*/, '')
    .replace(/[·⋅×]/g, '*')
    .replace(/÷/g, '/');
  const ctx: ParseContext = {};
  if (!rest) {
    return {
      si: val,
      dim: [0, 0, 0, 0, 0, 0, 0],
      f: 1,
      rest: '',
      hasNum,
      val,
      ctx,
      off: null,
    };
  }
  const q = parseUnitExpression(rest, ctx);
  const off = q.e && q.e.t ? q.e.t : null;
  return {
    si: off ? off(val) : val * q.f,
    dim: q.d,
    f: q.f,
    rest,
    hasNum,
    val,
    ctx,
    off: off ? (q.e?.tn ?? null) : null,
  };
}

function formatDisplayValue(
  si: number,
  dim: DimensionVector,
  ctx: ParseContext
): ConvertedDisplay {
  const key = dim.join(',');
  const nz = dim.some((x) => x !== 0);
  const ni = DERIVED_NAMES[key];
  let unit = nz ? (ni && ni[0] ? ni[0] : formatBaseUnitForm(dim)) : '';
  if (ctx.ang) {
    if (!nz) unit = 'rad';
    else if (key === '0,0,-1,0,0,0,0') unit = 'rad/s';
  }
  return { num: formatSiNumber(si), unit };
}

export function evaluateSiInput(raw: string): SiEvaluationResult {
  if (!raw.trim()) {
    return { kind: 'empty' };
  }

  const parts = raw
    .trim()
    .replace(/(\d)\s*[xX]\s*(?=\d)/g, '$1×')
    .split(/(?<=[\p{L}°%)])\s+(?=[+-]?\d|[.,]\d)/u);

  if (parts.length > 1) {
    let rs: (RawConvertedQuantity | null)[];
    try {
      rs = parts.map(convertSingle);
    } catch (err) {
      return {
        kind: 'error',
        message:
          err instanceof Error ? err.message : 'Không đọc được biểu thức',
      };
    }

    if (rs.some((r): r is null => !r || !Number.isFinite(r.si))) {
      return {
        kind: 'error',
        message: 'Giá trị quá lớn hoặc không hợp lệ',
      };
    }

    const validRs = rs as RawConvertedQuantity[];
    const k0 = validRs[0].dim.join(',');
    const sameDim =
      validRs.every((r) => r.dim.join(',') === k0) &&
      !validRs.some((r) => Boolean(r.off));
    const displayList = validRs.map((r) =>
      formatDisplayValue(r.si, r.dim, r.ctx)
    );
    const toCopy = (d: ConvertedDisplay) => d.num + (d.unit ? ` ${d.unit}` : '');

    const rows: MultiConversionRow[] = displayList.map((d, idx) => ({
      label: parts[idx].trim(),
      num: d.num,
      unit: d.unit,
    }));

    let total: MultiConversionRow | null = null;
    let copyText = displayList.map(toCopy).join('; ');

    if (sameDim) {
      const sumSi = validRs.reduce((acc, r) => acc + r.si, 0);
      const totalDisp = formatDisplayValue(sumSi, validRs[0].dim, {
        ang: validRs.some((r) => r.ctx.ang) ? 1 : undefined,
      });
      total = {
        label: 'Tổng',
        num: totalDisp.num,
        unit: totalDisp.unit,
      };
      copyText = toCopy(totalDisp);
    }

    return {
      kind: 'multi',
      rows,
      total,
      copyText,
    };
  }

  let r: RawConvertedQuantity | null;
  try {
    r = convertSingle(raw);
  } catch (err) {
    return {
      kind: 'error',
      message: err instanceof Error ? err.message : 'Không đọc được biểu thức',
    };
  }

  if (!r || !Number.isFinite(r.si)) {
    return {
      kind: 'error',
      message: 'Giá trị quá lớn hoặc không hợp lệ',
    };
  }

  const key = r.dim.join(',');
  const nz = r.dim.some((x) => x !== 0);
  const nameInfo = DERIVED_NAMES[key];
  const base = formatBaseUnitForm(r.dim);
  const { num, unit } = formatDisplayValue(r.si, r.dim, r.ctx);
  const copyText = num + (unit ? ` ${unit}` : '');

  return {
    kind: 'single',
    num,
    unit,
    copyText,
    nameDesc: nz && nameInfo ? nameInfo[1] : null,
    baseUnitText: nz && nameInfo && nameInfo[0] && base !== unit ? base : null,
    dimensionless: !nz && !r.ctx.ang,
    offsetFormula: r.off,
    unitReference:
      !r.off && r.rest && (!r.hasNum || r.val !== 1)
        ? {
            unitExpr: r.rest,
            perOneText: formatSiNumber(r.f) + (unit ? ` ${unit}` : ''),
          }
        : null,
  };
}
