export type SlideLayoutId = 'A' | 'B' | 'C' | 'D' | 'E';

export interface SlideErrorRule {
  id: number;
  name: string;
  rule: string;
}

export interface SlideTopicA {
  id: string;
  layout: 'A';
  title: string;
  subtitle: string;
  paragraph: string;
  bullets: readonly string[];
  tags: readonly [string, string];
  specs: string;
  chartTitle: string;
  chartYLabel: string;
  chartXLabels: readonly string[];
  chartValues: readonly number[];
  chartYMax: number;
  errors: readonly SlideErrorRule[];
}

export interface SlideTopicB {
  id: string;
  layout: 'B';
  title: string;
  paragraphs: readonly string[];
  bullets: readonly string[];
  scriptText: string;
  sourceText: string;
  specs: string;
  errors: readonly SlideErrorRule[];
}

export interface SlideTopicC {
  id: string;
  layout: 'C';
  title: string;
  subtitle: string;
  bullets: readonly string[];
  errors: readonly SlideErrorRule[];
}

export interface SlideTopicD {
  id: string;
  layout: 'D';
  title: string;
  rows: readonly (readonly [string, 0 | 1])[];
  errors: readonly SlideErrorRule[];
}

export interface SlideTopicE {
  id: string;
  layout: 'E';
  badTitle: string;
  title: string;
  steps: readonly string[];
  errors: readonly SlideErrorRule[];
}

export type SlideTopic =
  | SlideTopicA
  | SlideTopicB
  | SlideTopicC
  | SlideTopicD
  | SlideTopicE;

export const SLIDE_TOPICS: readonly SlideTopic[] = [
  {
    id: 'slide-a',
    layout: 'A',
    title: 'Hệ thống tưới cây tự động',
    subtitle: 'Đồ án Nhập môn kỹ thuật · Nhóm 3',
    paragraph:
      'Hệ thống sử dụng cảm biến độ ẩm đất để đo độ ẩm tại gốc cây, sau đó vi điều khiển so sánh giá trị đo được với ngưỡng đã cài đặt, nếu độ ẩm thấp hơn ngưỡng thì vi điều khiển sẽ bật máy bơm nước để tưới cho cây, khi độ ẩm đạt ngưỡng thì máy bơm tự động tắt lại, đồng thời hệ thống gửi thông báo về điện thoại của người dùng qua Wi-Fi để theo dõi tình trạng của cây ở bất cứ đâu.',
    bullets: [
      'Cảm biến đo độ ẩm đất',
      'Vi điều khiển so với ngưỡng',
      'Thấp hơn ngưỡng thì bật bơm',
      'Gửi thông báo qua Wi-Fi',
    ],
    tags: ['TƯỚI ĐÚNG LÚC', 'TIẾT KIỆM NƯỚC'],
    specs: 'Nguồn 12 V · Bơm 2 A · Cảm biến 0–100 % · Wi-Fi 2,4 GHz',
    chartTitle: 'Độ ẩm đất trong ngày',
    chartYLabel: 'Độ ẩm (%)',
    chartXLabels: ['6h', '9h', '12h', '15h'],
    chartValues: [72, 55, 38, 64],
    chartYMax: 100,
    errors: [
      {
        id: 1,
        name: 'Quá nhiều chữ',
        rule: 'Dùng cụm từ ngắn thay vì đoạn văn. Quy tắc 6×7: không quá 6 dòng mỗi slide, không quá 7 từ mỗi dòng.',
      },
      {
        id: 2,
        name: 'Chữ quá nhỏ',
        rule: 'Dùng phông chữ lớn: tiêu đề trên 18, nội dung trên 12, tốt nhất từ 20–22.',
      },
      {
        id: 3,
        name: 'Tương phản kém',
        rule: 'Nền, chữ và hình ảnh cần tương phản tốt để người ngồi cuối phòng vẫn đọc được.',
      },
      {
        id: 4,
        name: 'Quá nhiều màu',
        rule: 'Không dùng quá nhiều màu. Thống nhất kiểu, cỡ và màu chữ trong cả bài.',
      },
      {
        id: 5,
        name: 'Quá nhiều kiểu chữ',
        rule: 'Không dùng quá nhiều font và kiểu chữ. Chọn kiểu chữ đơn giản, dễ đọc.',
      },
      {
        id: 6,
        name: 'Biểu đồ thiếu nhãn',
        rule: 'Đồ thị phải có tiêu đề, nhãn trục, đơn vị và được dán nhãn rõ ràng, đơn giản.',
      },
      {
        id: 7,
        name: 'Hiệu ứng gây xao nhãng',
        rule: 'Hình ảnh động phải có mục đích rõ ràng, chỉ dùng âm thanh khi cần, và không gây mất tập trung bằng quá nhiều thứ trên một slide.',
      },
    ],
  },
  {
    id: 'slide-b',
    layout: 'B',
    title: 'Bê tông cốt thép',
    paragraphs: [
      'Bê tông cốt thép là vật liệu xây dựng kết hợp bê tông chịu nén rất tốt với thép chịu kéo rất tốt, nhờ vậy cấu kiện làm việc hiệu quả hơn nhiều so với dùng riêng từng loại vật liệu.',
      'Khi dầm chịu uốn, vùng phía trên bị nén còn vùng phía dưới bị kéo, vì thế người thiết kế đặt thép dọc ở phía dưới và thép đai xung quanh để chống nứt và chống cắt.',
      'Hai vật liệu làm việc chung được vì có hệ số giãn nở nhiệt gần nhau và thép được bê tông bao bọc nên không bị gỉ.',
    ],
    bullets: [
      'Bê tông chịu nén tốt',
      'Thép chịu kéo tốt',
      'Đặt thép ở vùng chịu kéo',
      'Giãn nở nhiệt gần như nhau',
    ],
    scriptText:
      'Như các bạn đã thấy trên slide, em xin đọc lại toàn bộ nội dung để mọi người cùng nghe, và nếu em đọc sai thì mong các bạn thông cảm.',
    sourceText:
      'Nguồn: TCVN 5574:2018, Thiết kế kết cấu bê tông và bê tông cốt thép.',
    specs:
      'Bê tông B25: Rb = 14,5 MPa · Thép CB400-V: Rs = 350 MPa · Lớp bảo vệ ≥ 25 mm',
    errors: [
      {
        id: 1,
        name: 'Tường chữ',
        rule: 'Mỗi ý chỉ một cụm từ ngắn, tối đa 6 dòng, mỗi dòng tối đa 7 từ. Slide để nhìn lướt chứ không để đọc.',
      },
      {
        id: 2,
        name: 'Chữ quá nhỏ',
        rule: 'Dòng thông số nhỏ xíu thì người ngồi cuối phòng không đọc được. Thử đứng cuối phòng, nếu đọc không thoải mái thì phải tăng cỡ chữ.',
      },
      {
        id: 3,
        name: 'Chép nguyên kịch bản, thiếu nguồn',
        rule: 'Slide là công cụ hỗ trợ, không phải máy nhắc lời. Đừng đọc lại những gì đã ghi, hãy nhìn khán giả, và ghi nguồn trích dẫn trên slide.',
      },
      {
        id: 4,
        name: 'Không có thứ bậc thị giác',
        rule: 'Tiêu đề lớn nhất, rồi đến tiêu đề phụ, rồi nội dung. Nếu mọi thứ to như nhau, người xem không biết nhìn đâu trước.',
      },
    ],
  },
  {
    id: 'slide-c',
    layout: 'C',
    title: 'Chọn linh kiện cho robot dò line',
    subtitle: 'Đồ án Nhập môn kỹ thuật · Nhóm 2',
    bullets: [
      'Vi điều khiển Arduino Uno',
      'Cảm biến dò line 5 mắt',
      'Hai động cơ DC có hộp số',
      'Pin Li-ion 7,4 V',
    ],
    errors: [
      {
        id: 1,
        name: 'Quá nhiều hình',
        rule: 'Một đến hai hình mỗi slide là đủ. Hình rải rác, lệch hàng, kích cỡ lộn xộn khiến slide rối và lạc đề.',
      },
      {
        id: 2,
        name: 'Tiêu đề WordArt khó đọc',
        rule: 'Tránh chữ nghệ thuật, chữ nghiêng, viền và đổ bóng chồng nhau. Dùng một phông đơn giản, rõ nét.',
      },
      {
        id: 3,
        name: 'Trang trí không liên quan',
        rule: 'Biểu ngữ nhấp nháy và đôi mắt hoạt hình không giúp người xem hiểu bài. Mọi thành phần trên slide phải phục vụ nội dung.',
      },
      {
        id: 4,
        name: 'Chỉ có hình, không có giải thích',
        rule: 'Hình minh hoạ cần đi kèm vài ý chính để người xem biết phải rút ra điều gì. Cân bằng giữa hình và chữ.',
      },
    ],
  },
  {
    id: 'slide-d',
    layout: 'D',
    title: 'Pin Li-ion cho xe điện',
    rows: [
      ['Năng lượng trên cân nặng', 1],
      ['Tuổi thọ nhiều chu kỳ sạc', 1],
      ['Giá thành', 0],
      ['An toàn khi quá nhiệt', 0],
    ],
    errors: [
      {
        id: 1,
        name: 'Màu nền chói, chữ khó đọc',
        rule: 'Tránh màu quá chói. Chữ tối trên nền sáng là dễ đọc nhất, đừng dùng chữ vàng trên nền xanh lá.',
      },
      {
        id: 2,
        name: 'Chữ đè lên hoa văn',
        rule: 'Chữ đặt trên nền nhiều màu thì gần như không có màu chữ nào nổi bật. Đặt chữ trên nền trơn.',
      },
      {
        id: 3,
        name: 'Chỉ phân biệt bằng đỏ và xanh lá',
        rule: 'Người mù màu khó phân biệt đỏ và xanh lá. Thêm ký hiệu hoặc chữ (✔/✘) và dùng cặp màu dễ phân biệt như xanh dương và cam.',
      },
    ],
  },
  {
    id: 'slide-e',
    layout: 'E',
    badTitle: 'Sơ đồ',
    title: 'Thiết kế kỹ thuật: lặp lại đến khi đạt',
    steps: [
      'Xác định vấn đề',
      'Nghiên cứu',
      'Đề xuất giải pháp',
      'Chế tạo mẫu',
      'Thử nghiệm',
    ],
    errors: [
      {
        id: 1,
        name: 'Sơ đồ rối, mũi tên không có chiều',
        rule: 'Sắp các bước theo một hướng đọc rõ ràng và nối bằng mũi tên có chiều. Người xem phải thấy ngay cái gì nối với cái gì.',
      },
      {
        id: 2,
        name: 'Khối không đồng nhất, chữ nhỏ',
        rule: 'Các khối cùng loại phải cùng kích thước, màu và kiểu chữ; nhãn phải đủ lớn để đọc từ xa. Rút gọn nhãn thay vì thu nhỏ chữ.',
      },
      {
        id: 3,
        name: 'Tiêu đề không nêu thông điệp',
        rule: 'Tiêu đề nên nêu điều người xem cần nhớ, thay vì chỉ ghi “Sơ đồ”.',
      },
    ],
  },
] as const;

export const RAINBOW_COLORS = [
  '#dc2626',
  '#ea580c',
  '#ca8a04',
  '#16a34a',
  '#2563eb',
  '#9333ea',
] as const;

export const SCATTERED_EMOJIS = [
  '🤖',
  '🔧',
  '⚙️',
  '🔩',
  '🔋',
  '💡',
  '🧲',
  '📡',
  '🛠️',
] as const;

export const FLOW_BAD_POSITIONS: readonly (readonly [number, number, number, number])[] =
  [
    [4, 62, 22, 16],
    [58, 10, 17, 22],
    [28, 38, 24, 13],
    [66, 60, 22, 18],
    [6, 12, 19, 20],
  ];

export const FLOW_BAD_COLORS = [
  '#ef4444',
  '#eab308',
  '#22c55e',
  '#a855f7',
  '#f97316',
] as const;

export const FLOW_BAD_FONTS = [
  "'Courier New', monospace",
  'Georgia, serif',
  "Impact, 'Arial Black', sans-serif",
  "'Comic Sans MS', cursive",
  "'Times New Roman', serif",
] as const;

export function createInitialFixedFlags(topic: SlideTopic): boolean[] {
  return Array.from({ length: topic.errors.length + 1 }, () => false);
}

export function createAllFixedFlags(topic: SlideTopic): boolean[] {
  return Array.from({ length: topic.errors.length + 1 }, (_, i) => i > 0);
}

export function countFixedErrors(
  fixedFlags: readonly boolean[],
  topic: SlideTopic
): number {
  let count = 0;
  for (let i = 1; i <= topic.errors.length; i += 1) {
    if (fixedFlags[i]) {
      count += 1;
    }
  }
  return count;
}

export function getUnfixedErrorIds(
  fixedFlags: readonly boolean[],
  topic: SlideTopic
): number[] {
  const remaining: number[] = [];
  for (let i = 1; i <= topic.errors.length; i += 1) {
    if (!fixedFlags[i]) {
      remaining.push(i);
    }
  }
  return remaining;
}

export function pickHintErrorId(
  fixedFlags: readonly boolean[],
  topic: SlideTopic,
  randomFn: () => number = Math.random
): number | null {
  const remaining = getUnfixedErrorIds(fixedFlags, topic);
  if (remaining.length === 0) {
    return null;
  }
  const idx = Math.floor(randomFn() * remaining.length);
  return remaining[idx] ?? remaining[0] ?? null;
}

export function pickNextSlideTopic(
  currentTopicId: string | null,
  randomFn: () => number = Math.random
): SlideTopic {
  const pool = currentTopicId
    ? SLIDE_TOPICS.filter((t) => t.id !== currentTopicId)
    : [...SLIDE_TOPICS];
  const candidates = pool.length > 0 ? pool : SLIDE_TOPICS;
  const idx = Math.floor(randomFn() * candidates.length);
  return candidates[idx] ?? candidates[0];
}
