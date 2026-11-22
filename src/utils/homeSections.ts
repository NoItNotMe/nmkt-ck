export type SpecializationId = 'part-2' | 'part-3' | 'part-4' | 'part-5';

export interface HomeHeroContent {
  title: string;
  subtitle: string;
  note: string;
  members: readonly string[];
}

export interface DetailHighlight {
  heading: string;
  body: string;
}

export interface HomeSubsection {
  id: SpecializationId;
  title: string;
  bullets: readonly string[];
  imageSrc: string;
  imageAlt: string;
  imageSide: 'left' | 'right';
  detailLead: string;
  detailHighlights: readonly DetailHighlight[];
  anchor: string;
}

export interface ScrollStage {
  index: number;
  key: string;
  mode: 'overview' | 'detail';
  activeId: SpecializationId | null;
}

export const HOME_HERO_CONTENT: HomeHeroContent = {
  title: 'NHẬP MÔN KỸ THUẬT',
  subtitle: 'Điện - điện tử',
  note: 'Nhóm 3, L08, HK261, HCMUT',
  members: [
    'Vũ Duy Mạnh',
    'Hoàng Ngọc Minh',
    'Nguyễn Minh Tân',
    'Nguyễn Quang Tiến',
  ],
} as const;

export const HOME_SUBSECTIONS: readonly HomeSubsection[] = [
  {
    id: 'part-2',
    title: 'Tự Động Hóa',
    bullets: [
      'Điều khiển tự động, PLC và hệ thống SCADA trong dây chuyền công nghiệp.',
      'Robot công nghiệp, cảm biến thông minh và cơ điện tử chính xác.',
      'Tối ưu hóa quy trình vận hành và giám sát thời gian thực.',
    ],
    imageSrc: '/src/assets/images/tu_dong_hoa_robotics_1795376194029.jpg',
    imageAlt: 'Hệ thống cánh tay robot công nghiệp và tủ điều khiển PLC trong phòng thí nghiệm tự động hóa',
    imageSide: 'right',
    detailLead:
      'Chỗ này là nội dung chi tiết mẫu cho Tự Động Hóa. Bạn có thể thay thế bằng giới thiệu chuyên sâu về hệ thống điều khiển, kiến trúc PLC/SCADA hoặc sản phẩm minh họa của nhóm.',
    detailHighlights: [
      {
        heading: 'Mục tiêu & Phạm vi (Placeholder)',
        body: 'Trình bày nguyên lý vòng điều khiển phản hồi PID, tích hợp cảm biến công nghiệp và giao thức truyền thông công nghiệp.',
      },
      {
        heading: 'Ứng dụng thực tiễn (Placeholder)',
        body: 'Dây chuyền lắp ráp tự động, cánh tay robot đa bậc tự do, hệ thống phân loại sản phẩm bằng thị giác máy tính.',
      },
      {
        heading: 'Định hướng mở rộng (Placeholder)',
        body: 'Kết hợp trí tuệ nhân tạo biên và bản sao số (Digital Twin) để dự đoán bảo trì và tối ưu năng lượng.',
      },
    ],
    anchor: 'tu-dong-hoa',
  },
  {
    id: 'part-3',
    title: 'Kỹ Thuật Điện',
    bullets: [
      'Hệ thống phát điện, truyền tải, phân phối và lưới điện thông minh.',
      'Máy điện quay, máy biến áp và bảo vệ rơ-le hệ thống điện.',
      'Năng lượng tái tạo, điện mặt trời, điện gió và lưu trữ năng lượng.',
    ],
    imageSrc: '/src/assets/images/ky_thuat_dien_grid_1795376193087.jpg',
    imageAlt: 'Trạm biến áp cao thế và thiết bị đóng cắt lưới điện hiện đại',
    imageSide: 'left',
    detailLead:
      'Chỗ này là nội dung chi tiết mẫu cho Kỹ Thuật Điện. Bạn có thể chỉnh sửa để mô tả cấu trúc lưới điện, tính toán công suất hoặc mô hình năng lượng bền vững.',
    detailHighlights: [
      {
        heading: 'Hệ thống & Truyền tải (Placeholder)',
        body: 'Phân tích trào lưu công suất, ổn định điện áp – tần số và điều độ vận hành trạm biến áp.',
      },
      {
        heading: 'Điện tử công suất (Placeholder)',
        body: 'Bộ nghịch lưu, chỉnh lưu hiệu suất cao dùng trong truyền động điện và hòa lưới năng lượng tái tạo.',
      },
      {
        heading: 'Lưới điện thông minh (Placeholder)',
        body: 'Giám sát phụ tải thời gian thực, tích hợp nguồn phân tán và hệ thống lưu trữ pin quy mô lớn.',
      },
    ],
    anchor: 'ky-thuat-dien',
  },
  {
    id: 'part-4',
    title: 'Điện Tử - Viễn Thông',
    bullets: [
      'Thiết kế mạch điện tử tương tự, mạch số và hệ thống nhúng.',
      'Xử lý tín hiệu số (DSP), truyền thông vô tuyến RF và ăng-ten.',
      'Mạng truyền dẫn quang, viễn thông thế hệ mới và kết nối IoT.',
    ],
    imageSrc: '/src/assets/images/dien_tu_vien_thong_lab_1795376193175.jpg',
    imageAlt: 'Bàn thí nghiệm điện tử viễn thông với máy hiện sóng, mạch RF và đầu nối cáp quang',
    imageSide: 'right',
    detailLead:
      'Chỗ này là nội dung chi tiết mẫu cho Điện Tử - Viễn Thông. Có thể bổ sung sơ đồ khối hệ thống thu phát, phân tích phổ tín hiệu hoặc dự án mạch phần cứng.',
    detailHighlights: [
      {
        heading: 'Xử lý tín hiệu & Phần cứng (Placeholder)',
        body: 'Thu thập dữ liệu từ cảm biến, lọc nhiễu số, thiết kế PCB đa lớp và kiểm thử trên máy hiện sóng.',
      },
      {
        heading: 'Truyền thông không dây & Quang (Placeholder)',
        body: 'Điều chế tín hiệu số, truyền dẫn sợi quang tốc độ cao và chuẩn kết nối IoT băng hẹp.',
      },
      {
        heading: 'Hệ thống nhúng kết nối (Placeholder)',
        body: 'Phát triển firmware thời gian thực cho vi điều khiển, đồng bộ dữ liệu cảm biến lên nền tảng đám mây.',
      },
    ],
    anchor: 'dien-tu-vien-thong',
  },
  {
    id: 'part-5',
    title: 'Thiết Kế Vi Mạch',
    bullets: [
      'Thiết kế logic số RTL (Verilog/SystemVerilog) và kiến trúc SoC.',
      'Thiết kế mạch tích hợp tương tự (Analog IC) và bố trí layout.',
      'Kiểm thử xác minh (Verification) và quy trình chế tạo bán dẫn.',
    ],
    imageSrc: '/src/assets/images/thiet_ke_vi_mach_wafer_1795376193714.jpg',
    imageAlt: 'Tấm wafer bán dẫn silicon với các chip vi mạch tích hợp dưới ánh sáng phòng sạch',
    imageSide: 'left',
    detailLead:
      'Chỗ này là nội dung chi tiết mẫu cho Thiết Kế Vi Mạch. Bạn có thể thay bằng luồng thiết kế ASIC/FPGA, sơ đồ khối vi xử lý hoặc kết quả mô phỏng dạng sóng.',
    detailHighlights: [
      {
        heading: 'Thiết kế Front-end & RTL (Placeholder)',
        body: 'Đặc tả kiến trúc, mô tả phần cứng bằng HDL, tổng hợp logic và tối ưu diện tích – công suất – xung nhịp (PPA).',
      },
      {
        heading: 'Thiết kế Back-end & Layout (Placeholder)',
        body: 'Đặt và đi dây (Place & Route), kiểm tra quy tắc thiết kế (DRC/LVS) và phân tích ký sinh.',
      },
      {
        heading: 'Xác minh & Kiểm thử (Placeholder)',
        body: 'Xây dựng môi trường mô phỏng UVM, kiểm thử trên FPGA và đánh giá chip mẫu sau đóng gói.',
      },
    ],
    anchor: 'thiet-ke-vi-mach',
  },
] as const;

export const SCROLL_STAGES: readonly ScrollStage[] = [
  { index: 0, key: 'overview', mode: 'overview', activeId: null },
  { index: 1, key: 'detail-part-2', mode: 'detail', activeId: 'part-2' },
  { index: 2, key: 'detail-part-3', mode: 'detail', activeId: 'part-3' },
  { index: 3, key: 'detail-part-4', mode: 'detail', activeId: 'part-4' },
  { index: 4, key: 'detail-part-5', mode: 'detail', activeId: 'part-5' },
] as const;

export function formatMemberLine(members: readonly string[]): string {
  return members.join(' - ');
}

export function getSubsectionById(
  id: SpecializationId | null
): HomeSubsection | undefined {
  if (!id) {
    return undefined;
  }
  return HOME_SUBSECTIONS.find((item) => item.id === id);
}

export function getDetailStageIndexForId(id: SpecializationId): number {
  const stage = SCROLL_STAGES.find(
    (item) => item.mode === 'detail' && item.activeId === id
  );
  return stage ? stage.index : 0;
}
