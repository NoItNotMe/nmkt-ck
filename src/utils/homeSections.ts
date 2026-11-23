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
    title: 'Điều Khiển và Tự Động Hóa',
    bullets: [
      'Điều khiển tự động, PLC và hệ thống SCADA trong dây chuyền công nghiệp.',
      'Robot công nghiệp, cảm biến thông minh và cơ điện tử chính xác.',
      'Tối ưu hóa quy trình vận hành và giám sát thời gian thực.',
    ],
    imageSrc: '/assets/aistudio/64_TSDH_TQImage_1691462323202_cb32d264.jpg',
    imageAlt: 'Hai cánh tay robot tự động hóa màu cam trong trạm pha chế và điều khiển tự động',
    imageSide: 'right',
    detailLead:
      'Ngành Kỹ thuật điều khiển & Tự động hóa dành cho các sinh viên có đam mê về lĩnh vực điều khiển như robot, phương tiện tự hành, tự động hóa các quá trình sản xuất, số hóa nhà máy. Chương trình đào tạo bao gồm hai hướng: Kỹ thuật điều khiển và Tự động hóa. Chương trình bao gồm các môn học liên quan đến các công nghệ tiêu biểu như: Điều khiển thông minh, Trí tuệ nhân tạo trong điều khiển, Thị giác máy tính, Hệ thống điều khiển nhúng, Điều khiển chuyển động, Kỹ thuật Robot, Thiết bị và Hệ thống tự động, Lập trình PLC và Hệ thống SCADA.\n\nChương trình sẽ đào tạo người học thành những kỹ sư có kiến thức chuyên môn và tay nghề cao. Sinh viên sau khi tốt nghiệp có khả năng thiết kế và xây dựng các hệ thống điều khiển độ chính xác cao, có khả năng nghiên cứu, thiết kế và phát triển hệ thống tự động hóa trong nhiều lĩnh vực: tự động hóa nhà máy, số hóa nhà máy, robot, và quản lý năng lượng.',
    detailHighlights: [
      {
        heading: 'Điểm đặc biệt',
        body: 'Ngành Kỹ thuật điều khiển và Tự động hóa dành cho các sinh viên có sở thích liên quan đến thiết kế, chế tạo thiết bị điều khiển và thiết kế, lập trình tự động hóa trong các hệ thống sản xuất công nghiệp. Chương trình đào tạo có tính liên ngành bao gồm các môn học cốt lõi cần thiết về kỹ thuật điều khiển, kỹ thuật điện – điện tử và kỹ thuật lập trình.\n\nChương trình đào tạo được xây dựng theo hai hướng chuyên ngành Kỹ thuật điều khiển và Công nghệ tự động hóa, nhằm mục tiêu đào tạo những cử nhân có khả năng thiết kế bộ điều khiển cho máy móc công nghiệp, robot, xe tự hành; có khả năng áp dụng các công nghệ tự động hóa tiên tiến nhằm phục vụ sự nghiệp công nghiệp hóa và hiện đại hóa đất nước.',
      },
      {
        heading: 'Cơ sở vật chất',
        body: 'Các phòng thí nghiệm được trang bị hiện đại, được tài trợ từ các tập đoàn công nghiệp lớn như Siemens, Schneider Electric, Endress+Hauser, Rockwell Automation, Yaskawa,.. Trong đó, có các phòng thí nghiệm thực hành điển hình: Phòng thực hành robot Yaskawa, Phòng thực hành tự động hóa IIOT Siemens, Phòng nghiên cứu thiết kế phương tiện tự hành, Phòng thí nghiệm cảm biến đo lường.',
      },
    ],
    anchor: 'dieu-khien-va-tu-dong-hoa',
  },
  {
    id: 'part-3',
    title: 'Kỹ Thuật Điện',
    bullets: [
      'Hệ thống phát điện, truyền tải, phân phối và lưới điện thông minh.',
      'Máy điện quay, máy biến áp và bảo vệ rơ-le hệ thống điện.',
      'Năng lượng tái tạo, điện mặt trời, điện gió và lưu trữ năng lượng.',
    ],
    imageSrc: '/assets/aistudio/63_TSDH_TQImage_1691461428936_a5a8ebc8.jpg',
    imageAlt: 'Máy biến áp cao thế với các sứ cách điện và đường dây truyền tải điện',
    imageSide: 'left',
    detailLead:
      'Ngành Kỹ thuật Điện dành cho sinh viên có sở thích và đam mê làm việc trong lĩnh vực công nghệ tiên tiến phục vụ cho quá trình phát, truyền tải, phân phối và sử dụng điện năng. Chương trình đào tạo bao gồm các môn học liên quan đến các công nghệ tiêu biểu như thiết kế và điều khiển máy điện, các bộ biến đổi điện tử công suất, thiết kế và vận hành các hệ thống điện truyền tải, phân phối và nhà máy điện.\n\nChương trình sẽ đào tạo người học thành những cử nhân có kiến thức chuyên môn và tay nghề cao; có khả năng thiết kế, vận hành và nâng cao độ tin cậy các hệ thống điện và thiết bị điện; có khả năng thiết kế các nhà máy điện năng lượng tái tạo; có khả năng nghiên cứu các vấn đề phát sinh trong quá trình chuyển đổi hệ thống điện truyền thống sang lưới điện thông minh.',
    detailHighlights: [
      {
        heading: 'Cơ hội nghề nghiệp',
        body: 'Các cử nhân Điện Bách khoa sau khi tốt nghiệp sẽ được các nhà tuyển dụng quan tâm cao và sẽ thành công trong nhiều lĩnh vực khác nhau. Cơ hội nghề nghiệp bao gồm các công việc về tư vấn, thiết kế và quản lý vận hành các hệ thống điện lưới quốc gia, hệ thống cơ điện, hệ thống năng lượng tái tạo, các dự án về năng lượng, hệ thống chiếu sáng thông minh, các hệ thống giám sát-quản lý-điều khiển tiên tiến cho hệ thống điện/dây chuyền công nghiệp/thiết bị điện...',
      },
      {
        heading: 'Doanh nghiệp tuyển dụng',
        body: 'Các công ty thường tuyển dụng các cử nhân Kỹ thuật điện tốt nghiệp trường Đại học Bách khoa: tổng công ty Điện lực Tp. HCM (EVN HCMC), tổng công ty Điện lực Miền Nam (EVN SPC), các công ty Tư vấn Xây dựng điện (PECC 2, PECC3, PECC5...), công ty Điện Quang, công ty Bosch, công ty Mitsubishi, công ty Coteccons, công ty Holcim, công ty Schneider Electric Vietnam, công ty Siemens, công ty ABB, công ty Vinfast, công ty Unilever, công ty P&G…',
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
    imageSrc: '/assets/aistudio/65_TSDH_Image_1691466014493_fa7a55dc.jpg',
    imageAlt: 'Bo mạch điện tử với linh kiện dán bề mặt và đường mạch in chi tiết',
    imageSide: 'right',
    detailLead:
      'Ngành Kỹ thuật điện tử-viễn thông dành cho sinh viên có sở thích và đam mê làm việc trong lĩnh vực công nghệ viễn thông và thông tin, vi mạch, hệ thống nhúng và hệ thống điện tử ứng dụng, xử lý tín hiệu và trí tuệ nhân tạo. Chương trình bao gồm các môn học liên quan đến các công nghệ tiêu biểu như thông tin di động và không dây, các hệ thống kết nối Internet IoT, siêu cao tần và anten, mạng viễn thông và mạng máy tính, xử lý số tín hiệu, máy học và trí tuệ nhân tạo, vi mạch số, vi mạch tín hiệu tương tự và hỗn hợp, MEMS, hệ thống nhúng, vi điều khiển, FPGA, thiết kế hệ thống trên chip SoC.\n\nChương trình sẽ đào tạo người học thành những kỹ sư có kiến thức chuyên môn và tay nghề cao; có khả năng khai thác, vận hành, nâng cấp các hệ thống, thiết bị điện tử-viễn thông; có khả năng nghiên cứu, thiết kế và phát triển hệ thống ứng dụng trong công nghiệp và dân dụng sử dụng công nghệ viễn thông, công nghệ vi mạch, xử lý tín hiệu, trí tuệ nhân tạo.',
    detailHighlights: [
      {
        heading: 'Cơ hội nghề nghiệp',
        body: 'Ngành Điện tử - Viễn thông là một trong những lĩnh vực có nhiều cơ hội nghề nghiệp và được các nhà tuyển dụng quan tâm cao. Sau khi tốt nghiệp, sinh viên có thể làm việc trong các lĩnh vực như vận hành, quản lý, khai thác và thiết kế các mạng điện thoại cố định và di động, mạng truyền dẫn quang, viba, thông tin vệ tinh, phát thanh truyền hình, mạng thông tin dữ liệu và nhiều lĩnh vực khác.\n\nCác sinh viên tốt nghiệp có thể làm việc tại các tập đoàn, tổng công ty, các phòng kỹ thuật, các viện nghiên cứu và các trường đại học về lĩnh vực điện tử viễn thông. Nhiều tập đoàn và công ty lớn như VNPT, Viettel, FPT, SVTECH, Intel, Renesas, Marvell, Bosch, Ericssion, Sony, Samsung, Siemens, Motorola đều tuyển dụng các kỹ sư Điện tử - Viễn thông tốt nghiệp Trường Đại học Bách khoa.',
      },
      {
        heading: 'Truyền thông & Đối tác chiến lược',
        body: 'Các đài truyền hình, đài phát thanh cũng cần đến nhân sự trong lĩnh vực này như HTV, VTV, VOH. Với nhiều cơ hội nghề nghiệp, sinh viên sau khi tốt nghiệp sẽ có nhiều lựa chọn và có thể phát triển sự nghiệp một cách bền vững.\n\nTrường Đại học Bách khoa là đối tác chiến lược với nhiều công ty Điện tử - Viễn thông hàng đầu thế giới như BOSCH, RENESAS, INTEL, MARVELL và nhiều công ty trong nước như VNPT, FPT, SVTECH, VIETTEL, TMA Solutions. Các công ty này thường tuyển dụng các kỹ sư và sinh viên trường Đại học Bách khoa làm việc trong lĩnh vực thiết kế, phát triển, sản xuất và lắp ráp các sản phẩm điện tử và viễn thông, đặc biệt là các sản phẩm liên quan đến AUTOSAR, lập trình nhúng; khai thác vận hành, thiết kế, tối ưu hệ thống viễn thông, mạng thông tin dữ liệu, IoT và trí tuệ nhân tạo.',
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
    imageSrc: '/assets/aistudio/181_TSDH_TQImage_1715675275938_b30b1bdc.jpg',
    imageAlt: 'Chip vi mạch tích hợp gắn trên bo mạch bán dẫn hiện đại',
    imageSide: 'left',
    detailLead:
      'Ngành Thiết kế Vi mạch là một trong những ngành đào tạo chất lượng cao, có tính ứng dụng cao và mang tính xu hướng toàn cầu. Thế kỷ XXI, những tiến bộ của khoa học công nghệ như trí tuệ nhân tạo (AI), điện toán đám mây, phân tích dữ liệu lớn (Big Data), việc áp dụng các kỹ thuật này vào đời sống yêu cầu sự gia tăng đột biến việc sử dụng các chip, vi mạch điện tử trên toàn cầu. Do đó, xã hội đòi hỏi ngày càng tăng nhu cầu tuyển dụng các cử nhân Thiết kế Vi mạch có trình độ cao để tham gia vào các công ty vi mạch trong và ngoài nước, cũng như để nghiên cứu, phát triển các chip ứng dụng. Đây là cơ hội để ngành Thiết kế Vi mạch phát triển. Chương trình đào tạo Thiết kế vi mạch tại Trường Đại học Bách khoa - ĐHQG-HCM hướng tới giúp các sinh viên phát triển kỹ năng toàn diện và trở thành những chuyên gia trong lĩnh vực thiết kế vi mạch, đáp ứng nhu cầu về nguồn lực cho các công ty vi mạch và có khả năng giải quyết các thách thức công nghệ của thời đại, đóng góp cho sự phát triển của xã hội. Chương trình đào tạo tập trung vào phát triển các kỹ năng chuyên môn cần thiết để sinh viên sau khi tốt nghiệp có khả năng nghiên cứu, thiết kế và ứng dụng công nghệ vi mạch vào đời sống. Bên cạnh đó, chương trình đào tạo còn hướng tới phát triển các kỹ năng mềm để sinh viên phát triển toàn diện, gợi mở khả năng tư duy, nghiên cứu, sáng tạo, thích nghi với sự phát triển không ngừng của công nghệ trong thời đại mới.',
    detailHighlights: [
      {
        heading: 'Vị trí việc làm',
        body: 'Ngành Thiết kế Vi mạch cung cấp cho sinh viên một loạt các vị trí việc làm đa dạng trong nhiều lĩnh vực khác nhau, bao gồm thiết kế, phát triển, sản xuất, và kiểm định vi mạch. Sinh viên sau khi tốt nghiệp có thể đảm nhận các vị trí như kỹ sư thiết kế, kỹ sư phát triển sản phẩm, kỹ sư sản xuất, kỹ sư kiểm định vi mạch, và kỹ sư ứng dụng hệ thống vi mạch. Những cơ hội việc làm này thường có tại các công ty nghiên cứu và phát triển, các tổ chức sản xuất phần cứng và phần mềm, cũng như các công ty đa quốc gia trong ngành công nghệ cao.',
      },
      {
        heading: 'Doanh nghiệp & Triển vọng',
        body: 'Bên cạnh đó, sinh viên có thể tham gia làm việc tại các công ty quốc tế trong lĩnh vực vi mạch như Intel, Renesas, Marvell, ARM, Texas Instruments, Qualcomm, Samsung, và nhiều công ty khác. Các doanh nghiệp này thường đánh giá cao sự sáng tạo và năng lực của sinh viên trong lĩnh vực thiết kế vi mạch, đặc biệt khi họ được đào tạo bài bản tại Trường Đại học Bách khoa - ĐHQG-HCM. Hơn nữa, với xu hướng phát triển của ngành công nghệ, nhu cầu tuyển dụng các kỹ sư chuyên nghiệp trong lĩnh vực này vẫn không ngừng gia tăng, mang lại triển vọng nghề nghiệp đầy hứa hẹn.',
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
