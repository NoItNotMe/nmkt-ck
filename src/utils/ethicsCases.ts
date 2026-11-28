export type EthicsCategory =
  | 'Tất cả'
  | 'Kỹ thuật máy tính & Phần mềm'
  | 'Kỹ thuật y sinh'
  | 'Đạo đức kinh doanh'
  | 'Kỹ thuật cơ khí'
  | 'Kỹ thuật điện'
  | 'Kỹ thuật xây dựng'
  | 'Kỹ thuật quốc tế'
  | 'Đạo đức học thuật'
  | 'Khoa học & Nghiên cứu';

export type OptionLevel = 'good' | 'mid' | 'bad';
export type EthicsTestScore = 0 | 1 | 2;

export interface EthicsOption {
  text: string;
  level: OptionLevel;
  verdict: string;
  t: readonly [
    EthicsTestScore,
    EthicsTestScore,
    EthicsTestScore,
    EthicsTestScore,
    EthicsTestScore,
  ];
  note: string;
}

export interface EthicsCase {
  id: number;
  cat: Exclude<EthicsCategory, 'Tất cả'>;
  en: string;
  title: string;
  story: string;
  s1: string;
  s2: string;
  s3: string;
  s7: string;
  s8: string;
  opts: readonly [EthicsOption, EthicsOption, EthicsOption];
}

export type EthicsProgressMap = Record<string, OptionLevel>;

export const ETHICS_STORAGE_KEY = 'scu-8steps-5tests-v1';

export const ETHICS_CATEGORIES: readonly EthicsCategory[] = [
  'Tất cả',
  'Kỹ thuật máy tính & Phần mềm',
  'Kỹ thuật y sinh',
  'Đạo đức kinh doanh',
  'Kỹ thuật cơ khí',
  'Kỹ thuật điện',
  'Kỹ thuật xây dựng',
  'Kỹ thuật quốc tế',
  'Đạo đức học thuật',
  'Khoa học & Nghiên cứu',
] as const;

export const ETHICS_TEST_META = [
  { name: '1. Gây hại', desc: 'Ít rủi ro nhất?' },
  { name: '2. Công khai', desc: 'Dám lên báo?' },
  { name: '3. Biện hộ', desc: 'Bảo vệ được trước hội đồng?' },
  { name: '4. Đảo ngược', desc: 'Đổi vị trí có chấp nhận?' },
  { name: '5. Đồng nghiệp', desc: 'Chuẩn mực kỹ sư?' },
] as const;

export const OPTION_LABELS = ['A', 'B', 'C'] as const;

export const ETHICS_CASES: readonly EthicsCase[] = [
  {
    id: 1,
    cat: 'Kỹ thuật cơ khí',
    en: 'To Ship or Not to Ship',
    title: 'Xuất xưởng hay giữ lại?',
    story:
      'Kỹ sư QA phát hiện lô sản phẩm sắp giao có dấu hiệu lỗi tiềm ẩn dưới tải nặng. Quản lý sản xuất thúc xuất hàng ngay để kịp doanh số quý.',
    s1: 'Tiến độ giao hàng ngắn hạn đối đầu với an toàn và độ tin cậy sản phẩm.',
    s2: 'Tỷ lệ lỗi khi tải nặng, giới hạn chịu tải thiết kế và điều khoản bảo hành hợp đồng.',
    s3: 'Người tiêu dùng, bộ phận sản xuất, uy tín công ty và trách nhiệm kỹ sư QA.',
    s7: 'Lập biên bản kiểm thử định lượng, đề xuất phương án sàng lọc lô hàng và báo cáo quản lý chất lượng.',
    s8: 'Siết chặt kiểm tra đầu vào linh kiện và bổ sung bài thử tải nặng trước giai đoạn đóng gói.',
    opts: [
      {
        text: 'Ký duyệt xuất hàng kèm ghi chú nhỏ trong email nội bộ để né trách nhiệm.',
        level: 'mid',
        verdict: 'Thỏa hiệp nửa vời',
        t: [1, 0, 0, 0, 0],
        note: 'Email nội bộ không ngăn được tai nạn cho người dùng; cả công ty lẫn bạn đều chịu rủi ro pháp lý.',
      },
      {
        text: 'Lập báo cáo dữ liệu lỗi cụ thể, yêu cầu tạm giữ lô hàng để kiểm tra bổ sung dù trễ tiến độ.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Chịu chi phí chậm giao hàng ngắn hạn nhưng ngăn chặn tai nạn và khủng hoảng thu hồi hàng loạt.',
      },
      {
        text: 'Im lặng cho xuất hàng vì tỷ lệ lỗi thực tế có thể thấp và khách khó phát hiện.',
        level: 'bad',
        verdict: 'Không đạt đạo đức',
        t: [0, 0, 0, 0, 0],
        note: 'Đẩy rủi ro trực tiếp sang khách hàng; che giấu khuyết tật đã biết là vi phạm nghiêm trọng.',
      },
    ],
  },
  {
    id: 2,
    cat: 'Kỹ thuật điện',
    en: 'Time-Sharing Space',
    title: 'Không gian làm việc chung',
    story:
      'Nữ thực tập sinh tại startup điện tử công suất liên tục nhận bình luận mỉa mai về năng lực từ một đồng nghiệp nam có định kiến giới.',
    s1: 'Im lặng chịu đựng định kiến giới vs. bảo vệ môi trường làm việc tôn trọng và công bằng.',
    s2: 'Thời điểm, nội dung cụ thể của các phát ngôn thiếu tôn trọng và quy định nội bộ công ty.',
    s3: 'Nữ thực tập sinh, đồng nghiệp nam, quản lý trực tiếp và văn hóa nhóm kỹ thuật.',
    s7: 'Ghi nhận sự việc khách quan, trao đổi thẳng thắn với đồng nghiệp hoặc nhờ quản lý/nhân sự can thiệp.',
    s8: 'Thiết lập bộ quy tắc ứng xử công sở và cơ chế phản hồi an toàn cho thực tập sinh.',
    opts: [
      {
        text: 'Ghi chép tình huống cụ thể, trao đổi thẳng thắn với người đó hoặc nhờ quản lý hỗ trợ.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Chấm dứt hành vi thiếu tôn trọng dựa trên sự kiện rõ ràng, bảo vệ môi trường bình đẳng.',
      },
      {
        text: 'Cố nhịn cho hết kỳ thực tập rồi rời đi mà không nói với ai.',
        level: 'mid',
        verdict: 'Né tránh xung đột',
        t: [1, 1, 1, 0, 1],
        note: 'Tránh căng thẳng trước mắt nhưng hành vi định kiến tiếp tục lặp lại với người sau.',
      },
      {
        text: 'Đáp trả gay gắt bằng lời lẽ công kích ngay giữa phòng làm việc chung.',
        level: 'bad',
        verdict: 'Phản ứng cảm tính',
        t: [0, 0, 0, 0, 0],
        note: 'Biến vấn đề định kiến thành cãi vã cá nhân, khiến cả hai bên cùng mất điểm chuyên nghiệp.',
      },
    ],
  },
  {
    id: 3,
    cat: 'Đạo đức học thuật',
    en: 'Inhibited Reaction',
    title: 'Phản ứng bị kìm hãm',
    story:
      'Giáo sư kỹ thuật hóa học phát hiện đồng nghiệp dùng dữ liệu và ý tưởng nghiên cứu của mình để công bố mà không ghi tên đồng tác giả.',
    s1: 'Giữ hòa khí nội bộ khoa vs. bảo vệ liêm chính khoa học và quyền tác giả chính đáng.',
    s2: 'Nhật ký phòng thí nghiệm, mốc thời gian lưu trữ dữ liệu gốc và bản thảo bài báo.',
    s3: 'Giáo sư bị lấy ý tưởng, đồng nghiệp vi phạm, sinh viên nghiên cứu và tạp chí khoa học.',
    s7: 'Đối chiếu bằng chứng gốc trực tiếp hoặc đưa vụ việc ra hội đồng liêm chính học thuật của trường.',
    s8: 'Ký thỏa thuận phân chia quyền tác giả và lưu trữ dữ liệu có dấu thời gian ngay từ đầu đề tài.',
    opts: [
      {
        text: 'Bỏ qua vì cùng làm trong một khoa, làm lớn chuyện sẽ mất hòa khí.',
        level: 'bad',
        verdict: 'Dung túng gian lận',
        t: [0, 0, 0, 0, 0],
        note: 'Hợp thức hóa hành vi chiếm đoạt công trình và làm sai lệch hồ sơ đóng góp khoa học.',
      },
      {
        text: 'Tập hợp bản thảo, nhật ký thí nghiệm gốc và đưa ra hội đồng liêm chính học thuật.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Buộc bài báo phải đính chính hoặc rút bài theo chuẩn mực, giữ vững liêm chính nghiên cứu.',
      },
      {
        text: 'Nói bóng gió trước mặt sinh viên để đồng nghiệp tự xấu hổ.',
        level: 'mid',
        verdict: 'Xử lý thiếu chính danh',
        t: [0, 0, 0, 1, 0],
        note: 'Không khôi phục được quyền tác giả chính thức mà còn kéo sinh viên vào mâu thuẫn.',
      },
    ],
  },
  {
    id: 4,
    cat: 'Kỹ thuật y sinh',
    en: 'Apathy over Anonymity',
    title: 'Thờ ơ hay lên tiếng?',
    story:
      'Nhà nghiên cứu kỹ thuật y sinh phát hiện sai sót trong quy trình thử nghiệm mẫu sinh học, nhưng đồng nghiệp gây áp lực khuyên không báo cáo.',
    s1: 'Áp lực tuân theo nhóm đồng nghiệp vs. tính chính xác của dữ liệu nghiên cứu y sinh.',
    s2: 'Mức độ ảnh hưởng của sai sót quy trình lên từng lô mẫu và khả năng lặp lại thí nghiệm.',
    s3: 'Người giám sát đề tài, nhóm nghiên cứu, cộng đồng y khoa và bệnh nhân tương lai.',
    s7: 'Báo cáo trực tiếp sai sót cho người giám sát kèm phương án chạy lại phần mẫu bị ảnh hưởng.',
    s8: 'Bổ sung bảng kiểm (checklist) xác nhận từng bước quy trình trước khi ghi nhận dữ liệu.',
    opts: [
      {
        text: 'Nghe theo nhóm, sửa nhẹ kết quả cho khớp quy trình cũ để khỏi làm lại từ đầu.',
        level: 'bad',
        verdict: 'Sai lệch dữ liệu y sinh',
        t: [0, 0, 0, 0, 0],
        note: 'Dữ liệu sai dẫn đến chẩn đoán hoặc điều trị không an toàn về sau; mất uy tín vĩnh viễn.',
      },
      {
        text: 'Báo cáo trực tiếp sai sót cho người giám sát kèm đề xuất chạy lại mẫu bị ảnh hưởng.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Tốn thêm thời gian lặp lại thí nghiệm nhưng đảm bảo dữ liệu công bố hoàn toàn tin cậy.',
      },
      {
        text: 'Gửi thư nặc danh cho người giám sát rồi phủ nhận khi được hỏi.',
        level: 'mid',
        verdict: 'Thiếu minh bạch',
        t: [1, 0, 1, 1, 0],
        note: 'Người giám sát khó truy vết chính xác lô mẫu nào bị ảnh hưởng để xử lý triệt để.',
      },
    ],
  },
  {
    id: 5,
    cat: 'Đạo đức học thuật',
    en: 'Questioning a Mentor',
    title: 'Nghi ngờ người hướng dẫn',
    story:
      'Nghiên cứu sinh nghi ngờ giảng viên hướng dẫn của mình đạt chức danh giáo sư dựa trên các hồ sơ và thành tích không trung thực.',
    s1: 'Sự phụ thuộc học thuật vào người hướng dẫn vs. nghĩa vụ bảo vệ chuẩn mực liêm chính.',
    s2: 'Tính xác thực của các công bố, hồ sơ giải thưởng và quy định bảo vệ người tố cáo của trường.',
    s3: 'Nghiên cứu sinh, giảng viên hướng dẫn, hội đồng khoa học trường và các sinh viên khác.',
    s7: 'Xác minh chứng cứ khách quan và tham vấn kín với trưởng khoa hoặc văn phòng liêm chính.',
    s8: 'Thiết lập cơ chế đồng hướng dẫn luận án để giảm rủi ro phụ thuộc một cá nhân.',
    opts: [
      {
        text: 'Xác minh kỹ bằng chứng khách quan, sau đó tham vấn kín với trưởng khoa hoặc văn phòng liêm chính.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Đảm bảo vụ việc được xem xét công tâm dựa trên chứng cứ mà không suy đoán cảm tính.',
      },
      {
        text: 'Đăng thông tin nghi ngờ lên mạng xã hội của trường để gây sức ép dư luận.',
        level: 'bad',
        verdict: 'Phát tán thiếu kiểm chứng',
        t: [0, 0, 0, 0, 0],
        note: 'Nếu thông tin chưa đầy đủ sẽ gây tổn hại danh dự nghiêm trọng và vi phạm kỷ luật.',
      },
      {
        text: 'Lờ đi hoàn toàn vì sợ ảnh hưởng đến việc bảo vệ luận án sắp tới.',
        level: 'mid',
        verdict: 'Ưu tiên lợi ích cá nhân',
        t: [1, 0, 1, 0, 1],
        note: 'Giữ an toàn tiến độ tốt nghiệp nhưng chấp nhận làm việc dưới sự hướng dẫn thiếu chuẩn mực.',
      },
    ],
  },
  {
    id: 6,
    cat: 'Kỹ thuật máy tính & Phần mềm',
    en: 'Copyright Concerns',
    title: 'Rủi ro bản quyền mã nguồn',
    story:
      'Startup phần mềm chạy đua ra mắt sản phẩm và có nguy cơ vi phạm bản quyền nếu tái sử dụng đoạn mã thuộc sở hữu trí tuệ của công ty khác.',
    s1: 'Tốc độ ra mắt sản phẩm (time-to-market) vs. tôn trọng quyền sở hữu trí tuệ và pháp luật.',
    s2: 'Giấy phép mã nguồn (MIT, GPL, độc quyền), phạm vi đoạn mã và thời gian viết lại độc lập.',
    s3: 'Startup, công ty sở hữu mã gốc, nhà đầu tư và đội ngũ lập trình viên.',
    s7: 'Đề xuất viết lại thuật toán độc lập (clean-room) hoặc dùng thư viện mở có giấy phép hợp lệ.',
    s8: 'Tích hợp công cụ quét bản quyền mã nguồn tự động vào quy trình kiểm thử (CI/CD).',
    opts: [
      {
        text: 'Sao chép đoạn mã rồi đổi tên biến và cấu trúc thư mục để khó bị phát hiện.',
        level: 'bad',
        verdict: 'Vi phạm sở hữu trí tuệ',
        t: [0, 0, 0, 0, 0],
        note: 'Khi thẩm định đầu tư, startup có thể bị kiện phá sản và buộc gỡ bỏ sản phẩm.',
      },
      {
        text: 'Viết lại thuật toán độc lập hoặc dùng thư viện mã nguồn mở có giấy phép hợp lệ.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Mất thêm vài ngày phát triển nhưng sản phẩm sạch về mặt pháp lý, sẵn sàng gọi vốn.',
      },
      {
        text: 'Tạm dùng mã vi phạm cho bản demo khách hàng rồi hứa sẽ viết lại sau.',
        level: 'mid',
        verdict: 'Nợ kỹ thuật & pháp lý',
        t: [1, 0, 0, 0, 0],
        note: 'Khi đã có khách hàng thúc tiến độ, mã tạm thường bị đẩy thẳng lên bản chính thức.',
      },
    ],
  },
  {
    id: 7,
    cat: 'Kỹ thuật cơ khí',
    en: 'Off the Clock',
    title: 'Làm thêm ngoài giờ không lương',
    story:
      'Quản lý mới tại công ty kỹ thuật công nghiệp phát hiện công nhân nhà máy phải làm quá 8 tiếng/ngày nhưng không được trả lương tăng ca.',
    s1: 'Cắt giảm chi phí vận hành nhà máy vs. quyền lợi lao động hợp pháp và an toàn sản xuất.',
    s2: 'Dữ liệu chấm công thực tế, quy định luật lao động về giờ làm thêm và tỷ lệ lỗi ca tối.',
    s3: 'Công nhân nhà máy, ban giám đốc, khách hàng và người quản lý mới.',
    s7: 'Trình bày rủi ro pháp lý và tai nạn lao động với ban giám đốc, đề xuất trả đủ lương hoặc chia ca.',
    s8: 'Áp dụng hệ thống chấm công điện tử tự động tính phụ cấp tăng ca minh bạch.',
    opts: [
      {
        text: 'Thu thập bảng chấm công thực tế, trình bày rủi ro pháp lý và đề xuất trả đủ lương tăng ca.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Khắc phục vi phạm luật lao động, giảm mệt mỏi cho công nhân nên giảm tai nạn sản xuất.',
      },
      {
        text: 'Tiếp tục duy trì cách làm cũ vì đó là thông lệ của công ty trước khi bạn nhận chức.',
        level: 'bad',
        verdict: 'Tiếp tay vi phạm',
        t: [0, 0, 0, 0, 0],
        note: 'Công nhân kiệt sức làm tăng nguy cơ tai nạn và công ty đối mặt án phạt thanh tra.',
      },
      {
        text: 'Giảm bớt giờ tăng ca của vài tổ thân quen nhưng giữ nguyên với các tổ khác.',
        level: 'mid',
        verdict: 'Thiếu công bằng',
        t: [0, 0, 0, 0, 0],
        note: 'Gây bất mãn nội bộ nhà máy và vẫn duy trì sai phạm hệ thống.',
      },
    ],
  },
  {
    id: 8,
    cat: 'Đạo đức kinh doanh',
    en: 'Misinterpretation Mishap',
    title: 'Sự cố hiểu nhầm hợp đồng',
    story:
      'Khách hàng lớn đang hiểu nhầm một thông số kỹ thuật theo hướng có lợi cho bên bạn và sắp ký hợp đồng lớn. Minh bạch có thể khiến họ hủy kèo.',
    s1: 'Chốt hợp đồng lớn ngay lập tức vs. sự trung thực kỹ thuật và niềm tin dài hạn.',
    s2: 'Thông số kỹ thuật thực tế của sản phẩm, kỳ vọng của khách và phương án tùy chỉnh khả thi.',
    s3: 'Khách hàng, trưởng dự án, đội kỹ thuật triển khai và ban kinh doanh.',
    s7: 'Chủ động làm rõ thông số trước khi ký và đề xuất gói điều chỉnh đáp ứng đúng nhu cầu khách.',
    s8: 'Chuẩn hóa bảng đối chiếu thông số kỹ thuật bắt buộc ký xác nhận trước khi chốt hợp đồng.',
    opts: [
      {
        text: 'Ký hợp đồng trước, đợi đến giai đoạn bàn giao mới giải thích khách đã tự hiểu sai.',
        level: 'bad',
        verdict: 'Lợi dụng sự hiểu nhầm',
        t: [0, 0, 0, 0, 0],
        note: 'Khách hàng cảm thấy bị lừa dối, dẫn đến tranh chấp hợp đồng và mất uy tín vĩnh viễn.',
      },
      {
        text: 'Chủ động làm rõ thông số trước khi ký và đề xuất phương án điều chỉnh phù hợp nhu cầu thực.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Tránh được dự án thất bại và tạo dựng quan hệ đối tác tin cậy bền vững.',
      },
      {
        text: 'Gửi phụ lục kỹ thuật dài hàng chục trang để khách tự đọc mà không nhắc trực tiếp.',
        level: 'mid',
        verdict: 'Minh bạch hình thức',
        t: [1, 0, 0, 0, 1],
        note: 'Vẫn dẫn đến xung đột khi triển khai thực tế vì hai bên lệch kỳ vọng.',
      },
    ],
  },
  {
    id: 9,
    cat: 'Đạo đức kinh doanh',
    en: 'Disclosure Dilemma',
    title: 'Tiến thoái lưỡng nan khi tiết lộ',
    story:
      'Quản lý công ty điện tử tiêu dùng phân vân có nên tiết lộ thông tin bảo mật nội bộ cho một khách hàng chiến lược đang hỏi lộ trình sản phẩm.',
    s1: 'Làm hài lòng khách hàng chiến lược vs. nghĩa vụ bảo mật thông tin độc quyền của công ty.',
    s2: 'Phạm vi thỏa thuận bảo mật (NDA), thông tin nào là tuyệt mật và phần nào được phép công bố.',
    s3: 'Công ty chủ quản, khách hàng chiến lược, các đối tác khác và người quản lý.',
    s7: 'Từ chối tiết lộ tin mật, đồng thời xin phép lãnh đạo chia sẻ phần lộ trình chung được duyệt.',
    s8: 'Xây dựng tài liệu lộ trình sản phẩm bản công khai (Public Roadmap) cho đội ngũ kinh doanh.',
    opts: [
      {
        text: 'Tiết lộ kín thông tin mật cho khách hàng này để giữ mối quan hệ thân thiết.',
        level: 'bad',
        verdict: 'Vi phạm bảo mật',
        t: [0, 0, 0, 0, 0],
        note: 'Làm lộ bí mật kinh doanh và vi phạm thỏa thuận bảo mật (NDA), đối mặt sa thải.',
      },
      {
        text: 'Từ chối tiết lộ thông tin mật, đồng thời xin phép lãnh đạo chia sẻ phần lộ trình công khai.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Bảo vệ bí mật công nghệ mà vẫn hỗ trợ khách hàng lập kế hoạch hợp tác minh bạch.',
      },
      {
        text: 'Nói úp mở để khách hàng tự đoán ra thông tin mật mà không nói thẳng.',
        level: 'mid',
        verdict: 'Lách ranh giới bảo mật',
        t: [1, 0, 0, 1, 0],
        note: 'Vẫn làm rò rỉ định hướng chiến lược và dễ gây tam sao thất bản ra thị trường.',
      },
    ],
  },
  {
    id: 10,
    cat: 'Khoa học & Nghiên cứu',
    en: 'Trimming Data',
    title: 'Cắt gọt số liệu nghiên cứu',
    story:
      'Nhà nghiên cứu y khoa được yêu cầu loại bỏ một số điểm dữ liệu ngoại lai bất lợi trước khi trình bày trước hội đồng cố vấn khoa học.',
    s1: 'Áp lực làm đẹp báo cáo để nhận tài trợ vs. tính toàn vẹn của dữ liệu khoa học.',
    s2: 'Nguyên nhân vật lý/sinh học của các điểm ngoại lai và tác động đến kết luận an toàn.',
    s3: 'Hội đồng cố vấn khoa học, bệnh nhân tương lai, nhà nghiên cứu và đơn vị tài trợ.',
    s7: 'Trình bày đầy đủ dữ liệu gốc kèm phân tích kỹ thuật giải thích nguyên nhân các điểm ngoại lai.',
    s8: 'Công bố quy tắc xử lý dữ liệu ngoại lai trước khi tiến hành thí nghiệm (Pre-registration).',
    opts: [
      {
        text: 'Trình bày đầy đủ toàn bộ dữ liệu gốc, đồng thời giải thích nguyên nhân kỹ thuật các điểm ngoại lai.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Giúp hội đồng đánh giá đúng hiệu quả và giới hạn thực tế, bảo vệ danh dự khoa học.',
      },
      {
        text: 'Xóa các điểm dữ liệu bất lợi khỏi biểu đồ chính và không nhắc tới trong buổi họp.',
        level: 'bad',
        verdict: 'Gian lận số liệu',
        t: [0, 0, 0, 0, 0],
        note: 'Dẫn dắt hội đồng ra quyết định sai lầm, gây nguy hiểm nghiêm trọng nếu ứng dụng lâm sàng.',
      },
      {
        text: 'Xóa khỏi slide thuyết trình nhưng để trong file dữ liệu thô gửi kèm sau.',
        level: 'mid',
        verdict: 'Che giấu trọng yếu',
        t: [1, 0, 0, 0, 0],
        note: 'Hội đồng ra quyết định dựa trên phần trình bày bị bóp méo ngay trong cuộc họp.',
      },
    ],
  },
  {
    id: 11,
    cat: 'Đạo đức kinh doanh',
    en: 'Going Public',
    title: 'Áp lực trước giờ lên sàn IPO',
    story:
      'Kỹ sư bán hàng kỹ thuật chịu áp lực phải làm giả báo cáo doanh số dự kiến để không làm chậm đợt phát hành cổ phiếu lần đầu (IPO).',
    s1: 'Thành công tài chính của đợt IPO vs. tính trung thực của báo cáo tài chính – kỹ thuật.',
    s2: 'Giá trị các hợp đồng đã ký chắc chắn, đơn hàng tiềm năng và quy định minh bạch chứng khoán.',
    s3: 'Nhà đầu tư công chúng, ban điều hành, toàn thể nhân viên và kỹ sư bán hàng.',
    s7: 'Từ chối ký báo cáo thổi phồng, chỉ xác nhận số liệu thực tế và báo cáo lên kiểm toán/HĐQT.',
    s8: 'Tách bạch bộ phận xác nhận doanh số kỹ thuật khỏi áp lực thưởng theo tiến độ IPO.',
    opts: [
      {
        text: 'Ký xác nhận số liệu thổi phồng vì tin rằng doanh số quý sau sẽ bù đắp kịp.',
        level: 'bad',
        verdict: 'Gian lận chứng khoán',
        t: [0, 0, 0, 0, 0],
        note: 'Lừa dối nhà đầu tư, vi phạm pháp luật nghiêm trọng và mất sự nghiệp vĩnh viễn.',
      },
      {
        text: 'Từ chối ký báo cáo sai lệch, chỉ xác nhận đơn hàng thực tế và báo bộ phận kiểm toán.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'IPO có thể lùi lại để rà soát nhưng tránh vụ bê bối sụp đổ công ty sau lên sàn.',
      },
      {
        text: 'Xin nghỉ phép đúng tuần ký báo cáo để người khác ký thay.',
        level: 'mid',
        verdict: 'Rút lui thụ động',
        t: [0, 0, 1, 0, 0],
        note: 'Bản thân không ký nhưng báo cáo sai vẫn phát hành gây thiệt hại cho nhà đầu tư.',
      },
    ],
  },
  {
    id: 12,
    cat: 'Kỹ thuật máy tính & Phần mềm',
    en: 'A Breach in Security',
    title: 'Sự cố mất cắp máy tính chứa dữ liệu',
    story:
      'Máy tính chứa dữ liệu cá nhân của hàng nghìn khách hàng bị đánh cắp. Công ty dữ liệu phải quyết định cách xử lý và thông báo sự cố.',
    s1: 'Che giấu để tránh mất uy tín ngắn hạn vs. thông báo sớm để khách hàng tự bảo vệ.',
    s2: 'Loại dữ liệu lưu trên máy, tình trạng mã hóa ổ cứng và thời hạn thông báo theo luật.',
    s3: 'Khách hàng bị lộ dữ liệu, đội an ninh mạng, ban lãnh đạo và cơ quan quản lý.',
    s7: 'Đánh giá phạm vi lộ lọt, thông báo ngay cho khách hàng kèm hướng dẫn đổi mật khẩu/khóa thẻ.',
    s8: 'Bắt buộc mã hóa toàn bộ ổ cứng thiết bị di động và cấm lưu dữ liệu khách hàng cục bộ.',
    opts: [
      {
        text: 'Im lặng theo dõi trên mạng xem dữ liệu có bị rao bán không rồi mới tính tiếp.',
        level: 'bad',
        verdict: 'Che giấu sự cố',
        t: [0, 0, 0, 0, 0],
        note: 'Khách hàng không kịp phòng vệ, chịu thiệt hại nặng và công ty bị phạt nặng hơn vì giấu tin.',
      },
      {
        text: 'Đánh giá phạm vi dữ liệu bị lộ, thông báo ngay cho khách hàng kèm hướng dẫn khắc phục.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Giảm thiểu thiệt hại thực tế cho người dùng và tuân thủ quy định bảo vệ dữ liệu.',
      },
      {
        text: 'Chỉ gửi thông báo chung rằng hệ thống vừa được nâng cấp bảo mật mà không nêu mất dữ liệu.',
        level: 'mid',
        verdict: 'Thông tin mập mờ',
        t: [0, 0, 0, 0, 1],
        note: 'Khách hàng không nhận thức được mức độ nguy hiểm nên không hành động phòng vệ.',
      },
    ],
  },
  {
    id: 13,
    cat: 'Kỹ thuật máy tính & Phần mềm',
    en: 'Onerous Favorites',
    title: 'Sự thiên vị của người quản lý',
    story:
      'Các kỹ sư tại công ty phần cứng máy tính bất bình vì người quản lý luôn ưu ái giao dự án tốt và thăng tiến cho một nhóm nhỏ thân quen.',
    s1: 'Tâm lý cam chịu bất công vs. đấu tranh cho cơ chế đánh giá minh bạch dựa trên năng lực.',
    s2: 'Hồ sơ phân công dự án, kết quả đóng góp kỹ thuật và tiêu chí đánh giá KPI của phòng.',
    s3: 'Tập thể kỹ sư trong nhóm, người quản lý trực tiếp và phòng nhân sự.',
    s7: 'Tổng hợp dữ liệu phân công khách quan, cùng đại diện nhóm trao đổi thẳng thắn với quản lý/HR.',
    s8: 'Áp dụng đánh giá chéo (peer review) và tiêu chí phân bổ dự án công khai trong nhóm.',
    opts: [
      {
        text: 'Tập hợp tiêu chí phân công thực tế, cùng đại diện nhóm trao đổi thẳng thắn với quản lý/HR.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Tạo áp lực xây dựng quy trình đánh giá KPI và phân bổ dự án minh bạch hơn.',
      },
      {
        text: 'Lập nhóm chat nói xấu quản lý và làm việc cầm chừng để trả đũa.',
        level: 'bad',
        verdict: 'Phản kháng tiêu cực',
        t: [0, 0, 0, 0, 0],
        note: 'Chất lượng dự án giảm sút và chính các kỹ sư bị đánh giá thấp năng lực.',
      },
      {
        text: 'Từng người tự tìm cách lấy lòng quản lý để được lọt vào nhóm ưu ái.',
        level: 'mid',
        verdict: 'Thỏa hiệp bất công',
        t: [1, 0, 0, 0, 0],
        note: 'Duy trì văn hóa nịnh bợ thay vì tập trung vào chất lượng kỹ thuật.',
      },
    ],
  },
  {
    id: 14,
    cat: 'Kỹ thuật quốc tế',
    en: 'Unintended Effects',
    title: 'Công nghệ không phù hợp ở Đông Phi',
    story:
      'Kỹ sư dự án nhận thấy công ty đang cung cấp giải pháp công nghệ phức tạp, khó bảo trì cho một cộng đồng nghèo ở Đông Phi.',
    s1: 'Hoàn thành hợp đồng thiết bị có sẵn vs. thiết kế giải pháp thực sự bền vững cho người dân.',
    s2: 'Nguồn linh kiện thay thế tại chỗ, trình độ vận hành địa phương và chi phí bảo dưỡng.',
    s3: 'Cộng đồng người dân Đông Phi, nhà tài trợ dự án, công ty triển khai và kỹ sư.',
    s7: 'Khảo sát điều kiện tại chỗ, đề xuất công nghệ phù hợp hơn và đào tạo người dân vận hành.',
    s8: "Đưa tiêu chí 'khả năng bảo trì tại địa phương' vào bước thẩm định thiết kế dự án quốc tế.",
    opts: [
      {
        text: 'Khảo sát điều kiện bảo trì tại chỗ, đề xuất công nghệ phù hợp và đào tạo người dân vận hành.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Dự án vận hành lâu dài sau khi đoàn kỹ sư rời đi, mang lại giá trị thực chất.',
      },
      {
        text: 'Lắp đặt đúng thiết bị theo hợp đồng ban đầu rồi bàn giao nhanh cho đúng hạn.',
        level: 'bad',
        verdict: 'Thiếu trách nhiệm thực tế',
        t: [0, 0, 0, 0, 0],
        note: 'Thiết bị nhanh chóng hỏng hóc và bị bỏ hoang vì thiếu linh kiện thay thế tại chỗ.',
      },
      {
        text: 'Ghi chú rủi ro bảo trì vào cuối báo cáo bàn giao nhưng không đề xuất đổi thiết kế.',
        level: 'mid',
        verdict: 'Nhận ra nhưng thụ động',
        t: [1, 0, 1, 0, 1],
        note: 'Cộng đồng vẫn phải nhận một hệ thống không thể tự duy trì.',
      },
    ],
  },
  {
    id: 15,
    cat: 'Kỹ thuật máy tính & Phần mềm',
    en: 'A Violation of Privacy',
    title: 'Dùng dữ liệu y tế để tiếp thị',
    story:
      'Kỹ sư máy tính được yêu cầu trích xuất dữ liệu y tế riêng tư của người dùng hệ thống để phục vụ chiến dịch tiếp thị thương mại.',
    s1: 'Yêu cầu tăng trưởng doanh thu tiếp thị vs. quyền riêng tư dữ liệu y tế nhạy cảm.',
    s2: 'Điều khoản đồng thuận của người dùng và quy định pháp luật bảo vệ dữ liệu y tế (HIPAA/GDPR).',
    s3: 'Bệnh nhân/người dùng, bộ phận tiếp thị, đội kỹ thuật và cơ quan bảo vệ dữ liệu.',
    s7: 'Từ chối xuất dữ liệu định danh, giải thích luật bảo mật và chỉ cung cấp thống kê ẩn danh.',
    s8: 'Thiết lập cơ chế kiểm soát truy cập theo vai trò (RBAC) và nhật ký truy vấn dữ liệu nhạy cảm.',
    opts: [
      {
        text: 'Từ chối xuất dữ liệu định danh, giải thích luật bảo mật y tế và chỉ cung cấp thống kê ẩn danh.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Ngăn chặn hành vi xâm phạm đời tư nghiêm trọng và bảo vệ công ty khỏi án phạt.',
      },
      {
        text: 'Xuất toàn bộ danh sách cho bộ phận marketing vì họ là đồng nghiệp cùng công ty.',
        level: 'bad',
        verdict: 'Vi phạm quyền riêng tư',
        t: [0, 0, 0, 0, 0],
        note: 'Lộ thông tin bệnh lý nhạy cảm của người dùng, vi phạm nghiêm trọng luật bảo mật.',
      },
      {
        text: 'Cấp quyền truy cập trực tiếp vào cơ sở dữ liệu cho nhân viên marketing tự lấy.',
        level: 'mid',
        verdict: 'Thoái thác kiểm soát',
        t: [0, 0, 0, 0, 0],
        note: 'Mất kiểm soát hoàn toàn đối với dữ liệu nhạy cảm và vi phạm phân quyền an toàn.',
      },
    ],
  },
  {
    id: 16,
    cat: 'Kỹ thuật xây dựng',
    en: 'This Land is Your Land',
    title: 'Áp lực làm đẹp số liệu môi trường',
    story:
      'Nhóm kỹ sư môi trường đánh giá tác động cho một dự án xây dựng và chịu áp lực từ chủ đầu tư phải đưa số liệu có lợi cho việc cấp phép.',
    s1: 'Giữ chân khách hàng trả phí tư vấn vs. đánh giá trung thực tác động môi trường.',
    s2: 'Chỉ số đo đạc không khí/nguồn nước thực tế và ngưỡng an toàn môi trường theo quy chuẩn.',
    s3: 'Cư dân khu vực dự án, hệ sinh thái địa phương, chủ đầu tư và nhóm kỹ sư tư vấn.',
    s7: 'Công bố trung thực chỉ số đo thực tế kèm giải pháp kỹ thuật giảm thiểu ô nhiễm bắt buộc.',
    s8: 'Yêu cầu quy trình lấy mẫu tự động có giám sát độc lập trong hợp đồng tư vấn môi trường.',
    opts: [
      {
        text: 'Công bố trung thực các chỉ số đo thực tế kèm giải pháp kỹ thuật giảm thiểu ô nhiễm.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Buộc dự án đầu tư hệ thống xử lý môi trường đạt chuẩn, giữ vững chứng chỉ hành nghề.',
      },
      {
        text: 'Đo đạc vào thời điểm ít ô nhiễm nhất trong ngày để số liệu trông đạt chuẩn.',
        level: 'bad',
        verdict: 'Bóp méo khảo sát',
        t: [0, 0, 0, 0, 0],
        note: 'Che giấu nguy cơ ô nhiễm thực sự, gây hại lâu dài cho sức khỏe cộng đồng xung quanh.',
      },
      {
        text: 'Viết ngôn từ mơ hồ để cơ quan quản lý và chủ đầu tư tự hiểu theo ý mình.',
        level: 'mid',
        verdict: 'Tránh né kết luận',
        t: [1, 0, 0, 0, 0],
        note: 'Không cảnh báo đủ mức độ rủi ro môi trường cho cơ quan cấp phép.',
      },
    ],
  },
  {
    id: 17,
    cat: 'Kỹ thuật máy tính & Phần mềm',
    en: 'Trouble with Training',
    title: 'Phân công lệch chuyên môn',
    story:
      'Nữ kỹ sư tại công ty phần cứng nhận thấy mình liên tục bị giao việc hành chính, ghi chép thay vì đào tạo kỹ thuật như đồng nghiệp nam cùng đợt.',
    s1: 'Chấp nhận vai trò phụ trợ để yên ổn vs. chủ động đề nghị phân công đúng chuyên môn.',
    s2: 'Tỷ lệ thời gian làm kỹ thuật so với hành chính và kế hoạch đào tạo kỹ sư mới.',
    s3: 'Nữ kỹ sư, trưởng nhóm kỹ thuật, các kỹ sư mới cùng đợt và bộ phận đào tạo.',
    s7: 'Trao đổi trực tiếp với quản lý về mục tiêu nghề nghiệp, đề xuất lộ trình tham gia dự án kỹ thuật.',
    s8: 'Luân phiên nhiệm vụ ghi chép/hành chính cho tất cả thành viên trong nhóm.',
    opts: [
      {
        text: 'Trao đổi trực tiếp với quản lý về mục tiêu nghề nghiệp, đề xuất tham gia dự án kỹ thuật.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Giúp quản lý nhận ra sự mất cân đối trong phân công và mở ra cơ hội phát triển.',
      },
      {
        text: 'Lẳng lặng làm hết phần việc hành chính của cả nhóm để được lòng mọi người.',
        level: 'mid',
        verdict: 'Tự giới hạn cơ hội',
        t: [1, 1, 1, 0, 1],
        note: 'Càng làm tốt việc phụ trợ, nhóm càng mặc định giao việc đó cho bạn về lâu dài.',
      },
      {
        text: 'Từ chối mọi việc được giao mà không trao đổi lý do.',
        level: 'bad',
        verdict: 'Thiếu giao tiếp xây dựng',
        t: [0, 0, 0, 1, 0],
        note: 'Dễ bị hiểu nhầm là thiếu tinh thần hợp tác trong giai đoạn thử việc.',
      },
    ],
  },
  {
    id: 18,
    cat: 'Kỹ thuật cơ khí',
    en: 'A Sinking Situation',
    title: 'Ép làm giả hồ sơ kiểm thử',
    story:
      'Nhân viên kỹ thuật hệ thống bị cấp trên gây áp lực phải làm giả giấy tờ kiểm thử sản phẩm để kịp tiến độ bàn giao.',
    s1: 'Giữ công việc hiện tại vs. từ chối ký khống hồ sơ an toàn kỹ thuật.',
    s2: 'Các hạng mục chưa kiểm thử, rủi ro vận hành thực tế và bằng chứng chỉ đạo sai trái.',
    s3: 'Người sử dụng hệ thống, kỹ sư kiểm thử, quản lý trực tiếp và toàn bộ công ty.',
    s7: 'Kiên quyết từ chối làm giả hồ sơ, lưu bằng chứng và báo cáo cấp cao hơn hoặc rời công ty.',
    s8: 'Áp dụng hệ thống lưu log kiểm thử tự động từ máy đo để không thể sửa thủ công.',
    opts: [
      {
        text: 'Kiên quyết từ chối làm giả hồ sơ, lưu bằng chứng và sẵn sàng rời công ty nếu bị ép.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Không tiếp tay đưa hệ thống chưa kiểm thử ra thị trường, bảo vệ an toàn người dùng.',
      },
      {
        text: 'Ký giả hồ sơ nhưng tự hứa sẽ kiểm thử bù vào cuối tuần.',
        level: 'bad',
        verdict: 'Vi phạm quy trình an toàn',
        t: [0, 0, 0, 0, 0],
        note: 'Hồ sơ giả đã nộp; nếu phát hiện lỗi thì sản phẩm cũng đã được phê duyệt.',
      },
      {
        text: 'Nhờ một thực tập sinh ký thay vào biên bản kiểm thử.',
        level: 'mid',
        verdict: 'Đẩy rủi ro cho cấp dưới',
        t: [0, 0, 0, 0, 0],
        note: 'Hồ sơ vẫn sai sự thật và đẩy rủi ro pháp lý sang người mới vào nghề.',
      },
    ],
  },
  {
    id: 19,
    cat: 'Kỹ thuật cơ khí',
    en: 'A Situation Unfiltered',
    title: 'Trách nhiệm bảo trì dự án cũ',
    story:
      'Quản lý tại tổ chức phi lợi nhuận cơ khí băn khoăn mức độ trách nhiệm bảo trì lâu dài đối với các công trình đã bàn giao nhiều năm trước.',
    s1: 'Dồn nguồn lực cho dự án mới vs. đảm bảo các hệ thống cũ tiếp tục vận hành an toàn.',
    s2: 'Tình trạng xuống cấp của công trình cũ, ngân sách bảo dưỡng và năng lực đội ngũ địa phương.',
    s3: 'Cộng đồng đang sử dụng công trình, tổ chức phi lợi nhuận, nhà tài trợ mới và kỹ sư.',
    s7: 'Lập cơ chế kiểm tra định kỳ, tài liệu bảo trì đơn giản và đào tạo đội tại chỗ song song dự án mới.',
    s8: 'Trích lập quỹ bảo trì vòng đời ngay trong ngân sách gọi vốn của mỗi dự án mới.',
    opts: [
      {
        text: 'Lập cơ chế đánh giá định kỳ, tài liệu bảo trì đơn giản và đào tạo đội tại chỗ song song dự án mới.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Giúp công trình cũ không xuống cấp nguy hiểm mà vẫn duy trì nguồn lực mở rộng.',
      },
      {
        text: 'Cắt toàn bộ hỗ trợ dự án cũ để dồn 100% ngân sách cho dự án mới dễ gọi tài trợ.',
        level: 'bad',
        verdict: 'Bỏ mặc sau bàn giao',
        t: [0, 0, 0, 0, 0],
        note: 'Nhiều công trình hỏng hóc không người sửa, làm mất ý nghĩa nhân đạo của tổ chức.',
      },
      {
        text: 'Chỉ sửa chữa khi có tai nạn hoặc hư hỏng nghiêm trọng được báo lên.',
        level: 'mid',
        verdict: 'Bảo trì bị động',
        t: [1, 0, 1, 0, 1],
        note: 'Chi phí khắc phục sự cố lớn hơn nhiều so với bảo dưỡng phòng ngừa.',
      },
    ],
  },
  {
    id: 20,
    cat: 'Kỹ thuật xây dựng',
    en: "A Marshland's Fleeting Flourishing?",
    title: 'Bảo vệ vùng đất ngập nước',
    story:
      'Kỹ sư tư vấn môi trường cân nhắc có nên thuyết phục khách hàng chọn phương án xây dựng bền vững bảo vệ vùng đất ngập nước, dù chi phí cao hơn.',
    s1: 'Phương án xây dựng rẻ nhất cho khách hàng vs. giải pháp bền vững bảo vệ hệ sinh thái.',
    s2: 'Chênh lệch chi phí đầu tư, khả năng tiêu thoát nước chống ngập và quy định bảo tồn.',
    s3: 'Hệ sinh thái đất ngập nước, cư dân vùng hạ lưu, chủ đầu tư và kỹ sư tư vấn.',
    s7: 'Phân tích bài toán kinh tế – môi trường dài hạn để thuyết phục khách hàng chọn phương án bền vững.',
    s8: 'Tích hợp đánh giá giá trị dịch vụ hệ sinh thái vào mọi hồ sơ tư vấn quy hoạch.',
    opts: [
      {
        text: 'Phân tích rõ lợi ích dài hạn (chống ngập, giảm bảo trì, chuẩn xanh) để thuyết phục khách chọn phương án bền vững.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Bảo tồn vùng đất ngập nước tự nhiên và giúp công trình thích ứng khí hậu tốt hơn.',
      },
      {
        text: 'Chỉ đưa ra phương án rẻ nhất vì nghĩ khách hàng chỉ quan tâm chi phí trước mắt.',
        level: 'mid',
        verdict: 'Tự giới hạn vai trò',
        t: [1, 1, 1, 0, 1],
        note: 'Bỏ lỡ cơ hội bảo vệ hệ sinh thái khi thực tế khách có thể đồng ý nếu thấy lợi ích dài hạn.',
      },
      {
        text: 'Thiết kế lấn chiếm vùng đất ngập nước mà không đánh giá tác động tiêu thoát nước.',
        level: 'bad',
        verdict: 'Thiếu trách nhiệm sinh thái',
        t: [0, 0, 0, 0, 0],
        note: 'Phá hủy môi trường sống tự nhiên và làm tăng nguy cơ lũ lụt cho khu dân cư lân cận.',
      },
    ],
  },
  {
    id: 21,
    cat: 'Kỹ thuật y sinh',
    en: 'Stem Cell Party',
    title: 'Lên tiếng về sự thật khoa học',
    story:
      'Kỹ sư di truyền nhận thấy nhiều đồng nghiệp hiểu sai lệch nghiêm trọng về nghiên cứu tế bào gốc do tin đồn thiếu căn cứ.',
    s1: 'Ngại tranh luận những chủ đề nhạy cảm vs. trách nhiệm phổ biến kiến thức khoa học chính xác.',
    s2: 'Các bằng chứng khoa học đã kiểm chứng, nguồn gốc tế bào gốc và giới hạn đạo đức y sinh.',
    s3: 'Đồng nghiệp, cộng đồng, lĩnh vực nghiên cứu y sinh và kỹ sư di truyền.',
    s7: 'Chia sẻ thông tin khoa học chuẩn xác, khách quan và dễ hiểu để giúp đồng nghiệp hiểu đúng.',
    s8: 'Tổ chức các buổi sinh hoạt chuyên đề ngắn (brown-bag seminar) phổ biến kiến thức liên ngành.',
    opts: [
      {
        text: 'Chia sẻ thông tin khoa học chuẩn xác, khách quan và dễ hiểu giúp đồng nghiệp phân biệt sự thật.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Nâng cao hiểu biết đúng đắn trong môi trường làm việc dựa trên bằng chứng khoa học.',
      },
      {
        text: 'Hùa theo những nhận định sai lệch để tránh mất lòng mọi người trong cuộc trò chuyện.',
        level: 'bad',
        verdict: 'Thỏa hiệp thông tin sai',
        t: [0, 0, 0, 0, 0],
        note: 'Vô tình tiếp tay lan truyền hiểu lầm khoa học với tư cách người trong ngành.',
      },
      {
        text: 'Im lặng rời đi và cho rằng việc giải thích là của bộ phận truyền thông.',
        level: 'mid',
        verdict: 'Đứng ngoài cuộc',
        t: [1, 1, 1, 1, 0],
        note: 'Hiểu lầm tiếp tục tồn tại trong chính nội bộ tổ chức kỹ thuật.',
      },
    ],
  },
  {
    id: 22,
    cat: 'Kỹ thuật quốc tế',
    en: 'Giving in or Giving up',
    title: 'Áp lực hối lộ ở nước ngoài',
    story:
      'Quản lý kỹ thuật bị gây áp lực phải chi tiền hối lộ cho một quan chức địa phương ở Đông Phi để giành dự án hạ tầng quan trọng.',
    s1: 'Giành bằng được hợp đồng quốc tế vs. từ chối tham nhũng và tuân thủ luật pháp.',
    s2: 'Luật chống hối lộ quốc tế (FCPA), quy trình đấu thầu minh bạch và rủi ro rút ruột công trình.',
    s3: 'Doanh nghiệp, người dân địa phương thụ hưởng hạ tầng, quản lý kỹ thuật và cơ quan pháp luật.',
    s7: 'Từ chối chi tiền hối lộ, tuân thủ đấu thầu minh bạch và báo cáo bộ phận tuân thủ (Compliance).',
    s8: 'Đào tạo quy tắc chống tham nhũng và thiết lập quỹ dự phòng pháp lý cho đội dự án quốc tế.',
    opts: [
      {
        text: 'Từ chối chi tiền hối lộ, tuân thủ quy trình đấu thầu minh bạch dù có nguy cơ mất hợp đồng.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Bảo vệ công ty khỏi vi phạm luật chống hối lộ quốc tế và giữ vững uy tín làm ăn đàng hoàng.',
      },
      {
        text: 'Chi tiền thông qua một bên môi giới trung gian để không đứng tên trực tiếp.',
        level: 'bad',
        verdict: 'Hối lộ trá hình',
        t: [0, 0, 0, 0, 0],
        note: 'Vẫn cấu thành hành vi tham nhũng theo luật quốc tế và kéo theo rút ruột chất lượng công trình.',
      },
      {
        text: "Tặng quà đắt tiền mang danh nghĩa 'quà lưu niệm văn hóa' cho người chấm thầu.",
        level: 'mid',
        verdict: 'Lách luật bằng quà tặng',
        t: [0, 0, 0, 0, 0],
        note: 'Gây xung đột lợi ích trực tiếp và làm sai lệch tính khách quan của quá trình chấm thầu.',
      },
    ],
  },
  {
    id: 23,
    cat: 'Kỹ thuật điện',
    en: 'Insurmountable Differences',
    title: 'Nghi ngờ phân biệt chủng tộc',
    story:
      'Trưởng nhóm thiết kế điện tử người Mỹ gốc Phi nhận thấy đồng nghiệp liên tục bác bỏ ý kiến và gây khó dễ, nghi ngờ xuất phát từ định kiến chủng tộc.',
    s1: 'Tự nghi ngờ hoặc đối đầu gay gắt vs. xử lý chuyên nghiệp dựa trên dữ liệu kỹ thuật.',
    s2: 'Các biên bản họp kỹ thuật, cơ sở dữ liệu của từng phương án thiết kế và hành vi cản trở.',
    s3: 'Trưởng nhóm thiết kế, đồng nghiệp liên quan, các thành viên nhóm và ban lãnh đạo.',
    s7: 'Tập trung vào dữ liệu kỹ thuật khách quan, lưu lại hành vi cản trở và trao đổi với cấp trên/HR.',
    s8: 'Chuẩn hóa quy trình đánh giá thiết kế mù (blind design review) dựa trên thông số đo lường.',
    opts: [
      {
        text: 'Tập trung dữ liệu kỹ thuật khách quan, lưu lại hành vi cản trở và trao đổi với cấp trên/HR.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Đưa tranh luận về chuẩn mực kỹ thuật minh bạch và buộc tổ chức xem xét hành vi thiếu tôn trọng.',
      },
      {
        text: 'Bỏ qua mọi hành vi cản trở và tự mình gánh hết phần việc để tránh phải làm việc chung.',
        level: 'mid',
        verdict: 'Chịu đựng đơn độc',
        t: [1, 1, 1, 0, 1],
        note: 'Trưởng nhóm kiệt sức và hành vi thiếu hợp tác trong nhóm không được giải quyết.',
      },
      {
        text: 'Quy kết công khai đồng nghiệp phân biệt chủng tộc ngay khi chưa có bằng chứng cụ thể.',
        level: 'bad',
        verdict: 'Kết luận vội vàng',
        t: [0, 0, 0, 0, 0],
        note: 'Làm bùng nổ căng thẳng nội bộ và khiến cuộc thảo luận lệch khỏi trọng tâm.',
      },
    ],
  },
  {
    id: 24,
    cat: 'Kỹ thuật y sinh',
    en: 'A Lengthy Dilemma',
    title: 'Biểu mẫu chấp thuận bất hợp lý',
    story:
      'Công ty y tế yêu cầu người hiến mẫu máu ký bản chấp thuận dài dòng, khó hiểu, ẩn chứa điều khoản từ bỏ quyền lợi bất lợi cho người hiến.',
    s1: 'Bảo vệ tối đa lợi ích pháp lý công ty vs. sự đồng thuận có hiểu biết (informed consent) của người hiến.',
    s2: 'Các điều khoản từ bỏ quyền lợi, khả năng đọc hiểu của người dân và chuẩn mực đạo đức y sinh.',
    s3: 'Người cung cấp mẫu máu, đội ngũ kỹ thuật y sinh, bộ phận pháp chế và cộng đồng.',
    s7: 'Đề xuất viết lại biểu mẫu rõ ràng, minh bạch quyền lợi và rủi ro để người hiến hiểu trước khi ký.',
    s8: 'Thử nghiệm độ dễ hiểu của biểu mẫu trên nhóm người dùng phổ thông trước khi ban hành.',
    opts: [
      {
        text: 'Đề xuất viết lại biểu mẫu rõ ràng, minh bạch quyền lợi và rủi ro để người hiến hiểu trước khi ký.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Đảm bảo tính hợp pháp và đạo đức y sinh của nguồn mẫu, tránh kiện tụng vô hiệu hóa thỏa thuận.',
      },
      {
        text: 'Phát biểu mẫu như hiện tại và hối thúc người hiến ký nhanh cho kịp quy trình lấy mẫu.',
        level: 'bad',
        verdict: 'Lợi dụng sự thiếu thông tin',
        t: [0, 0, 0, 0, 0],
        note: 'Vi phạm nguyên tắc đạo đức nghiên cứu trên con người và xâm phạm quyền lợi người hiến.',
      },
      {
        text: 'Chỉ giải thích miệng qua loa nếu có ai thắc mắc, còn lại giữ nguyên văn bản.',
        level: 'mid',
        verdict: 'Minh bạch không đồng đều',
        t: [1, 0, 0, 0, 1],
        note: 'Phần lớn người ký vẫn không nắm được quyền lợi thực sự của mình.',
      },
    ],
  },
  {
    id: 25,
    cat: 'Kỹ thuật điện',
    en: 'Presidential Pressure',
    title: 'Áp lực từ lãnh đạo cấp cao',
    story:
      'Chuyên viên kiểm thử QA bị gây áp lực phải làm giả dữ liệu kiểm tra mẫu điện thoại mới của một hãng viễn thông lớn để kịp sự kiện ra mắt.',
    s1: 'Mệnh lệnh từ cấp lãnh đạo cao nhất vs. sự trung thực của kết quả kiểm thử thiết bị.',
    s2: 'Các lỗi phần cứng/nhiệt độ phát hiện khi đo, rủi ro cháy nổ pin và lịch trình cập nhật phần mềm.',
    s3: 'Hàng triệu người dùng điện thoại, chuyên viên QA, lãnh đạo hãng và đối tác phân phối.',
    s7: 'Giữ nguyên số liệu kiểm thử thực tế, báo cáo rõ các lỗi nghiêm trọng cần vá trước ngày mở bán.',
    s8: 'Trao quyền phủ quyết xuất xưởng độc lập cho bộ phận An toàn & Chất lượng sản phẩm.',
    opts: [
      {
        text: 'Giữ nguyên số liệu kiểm thử thực tế, báo cáo rõ các lỗi nghiêm trọng cần vá trước ngày mở bán.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Giúp hãng tránh thảm họa lỗi phần cứng/pin trên diện rộng sau khi ra mắt.',
      },
      {
        text: 'Chỉnh sửa báo cáo theo ý lãnh đạo vì cho rằng hãng lớn sẽ tự xử lý hậu quả nếu có lỗi.',
        level: 'bad',
        verdict: 'Mất tính độc lập kiểm thử',
        t: [0, 0, 0, 0, 0],
        note: 'Thiết bị lỗi đến tay hàng triệu khách hàng, gây thiệt hại kinh tế và nguy cơ mất an toàn.',
      },
      {
        text: 'Xóa các bài kiểm thử khó để thiết bị đạt điểm đậu trên các bài kiểm thử cơ bản.',
        level: 'mid',
        verdict: 'Giảm chuẩn kiểm tra',
        t: [0, 0, 0, 0, 0],
        note: 'Che giấu điểm yếu của sản phẩm trong điều kiện sử dụng thực tế.',
      },
    ],
  },
  {
    id: 26,
    cat: 'Kỹ thuật cơ khí',
    en: 'Is the Customer Always Right?',
    title: 'Khách hàng có luôn đúng?',
    story:
      'Khách hàng lớn yêu cầu kỹ sư sản xuất điều chỉnh thông số vận hành máy vượt ngưỡng khuyến nghị để tăng năng suất, làm giảm biên độ an toàn.',
    s1: 'Chiều lòng yêu cầu khách hàng lớn vs. giới hạn an toàn kỹ thuật của thiết bị.',
    s2: 'Hệ số an toàn thiết kế, tuổi thọ mỏi vật liệu và nguy cơ tai nạn cho công nhân đứng máy.',
    s3: 'Khách hàng, công nhân vận hành máy tại nhà máy khách, kỹ sư sản xuất và công ty chế tạo.',
    s7: 'Từ chối điều chỉnh vượt ngưỡng an toàn, giải thích rủi ro tai nạn và đề xuất nâng cấp đúng chuẩn.',
    s8: 'Khóa cứng giới hạn an toàn trong bộ điều khiển (PLC) để ngăn vận hành quá tải.',
    opts: [
      {
        text: 'Từ chối điều chỉnh vượt ngưỡng an toàn, giải thích rủi ro tai nạn và đề xuất nâng cấp đúng chuẩn.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Ngăn ngừa hỏng hóc cơ khí và tai nạn lao động cho người vận hành.',
      },
      {
        text: 'Chỉnh máy theo ý khách nhưng bắt khách ký giấy tự chịu trách nhiệm nếu xảy ra tai nạn.',
        level: 'mid',
        verdict: 'Chuyển rủi ro sang người khác',
        t: [0, 0, 0, 0, 0],
        note: 'Giấy miễn trừ không ngăn được tai nạn xảy ra với công nhân đứng máy.',
      },
      {
        text: 'Âm thầm mở khóa giới hạn công suất để khách hài lòng và đặt thêm đơn hàng.',
        level: 'bad',
        verdict: 'Coi thường giới hạn an toàn',
        t: [0, 0, 0, 0, 0],
        note: 'Thiết bị quá tải dễ gây nổ, gãy vỡ cơ khí nghiêm trọng.',
      },
    ],
  },
  {
    id: 27,
    cat: 'Kỹ thuật xây dựng',
    en: 'Foul on the Field',
    title: 'Thiếu tôn trọng trên công trường',
    story:
      'Nữ thực tập sinh xây dựng liên tục gặp thái độ coi thường và lời trêu chọc thiếu tôn trọng từ đội thi công trên công trường vì giới tính.',
    s1: 'Cố chịu đựng để không bị đánh giá yếu đuối vs. yêu cầu sự tôn trọng nghề nghiệp trên công trường.',
    s2: 'Các hành vi quấy rối cụ thể, quy định an toàn và kỷ luật lao động tại công trường.',
    s3: 'Nữ thực tập sinh, chỉ huy trưởng công trường, đội ngũ thi công và nhà trường/công ty.',
    s7: 'Giữ bình tĩnh, trao đổi trực tiếp với chỉ huy trưởng và người hướng dẫn để chấn chỉnh kỷ luật.',
    s8: 'Phổ biến quy tắc ứng xử tôn trọng ngay trong buổi huấn luyện an toàn đầu giờ trên công trường.',
    opts: [
      {
        text: 'Giữ bình tĩnh, trao đổi trực tiếp với chỉ huy trưởng và người hướng dẫn để chấn chỉnh kỷ luật.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Thiết lập kỷ luật giao tiếp chuyên nghiệp trên công trường, đảm bảo an toàn phối hợp.',
      },
      {
        text: 'Bỏ không ra công trường nữa, chỉ ngồi trong văn phòng cho hết đợt thực tập.',
        level: 'mid',
        verdict: 'Rút lui khỏi thực tế',
        t: [1, 1, 1, 0, 1],
        note: 'Tránh được va chạm nhưng mất cơ hội học hỏi kinh nghiệm thi công thực địa quý giá.',
      },
      {
        text: 'Tranh cãi tay đôi gay gắt với công nhân giữa khu vực đang thi công nguy hiểm.',
        level: 'bad',
        verdict: 'Mất kiểm soát tình huống',
        t: [0, 0, 0, 0, 0],
        note: 'Gây mất tập trung trên công trường, tiềm ẩn nguy cơ tai nạn lao động.',
      },
    ],
  },
  {
    id: 28,
    cat: 'Đạo đức kinh doanh',
    en: 'May the Truth be with You',
    title: 'Sự thật hay lợi nhuận tối đa?',
    story:
      'Nhân viên mới tại startup điện tử đứng trước tình huống: nói thật về giới hạn hiện tại của sản phẩm sẽ giảm lợi nhuận, còn tô hồng sẽ thu lời lớn.',
    s1: 'Tối đa hóa lợi nhuận ngắn hạn cho startup vs. sự trung thực về năng lực thực tế sản phẩm.',
    s2: 'Hiệu năng đo được thực tế của sản phẩm, thời gian hoàn thiện bản nâng cấp và kỳ vọng khách.',
    s3: 'Khách hàng, nhân viên mới, nhà sáng lập startup và đội ngũ kỹ thuật.',
    s7: 'Trình bày trung thực thông số và giới hạn hiện tại của sản phẩm, kèm lộ trình nâng cấp rõ ràng.',
    s8: 'Thống nhất tài liệu thông số kỹ thuật chuẩn giữa bộ phận R&D và kinh doanh trước khi chào hàng.',
    opts: [
      {
        text: 'Trình bày trung thực thông số và giới hạn hiện tại của sản phẩm, kèm lộ trình nâng cấp rõ ràng.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Khách hàng tin tưởng năng lực thật của startup và sẵn sàng đồng hành lâu dài.',
      },
      {
        text: 'Cam kết tính năng vượt quá khả năng thực tế rồi thúc kỹ thuật làm ngày đêm đuổi kịp.',
        level: 'bad',
        verdict: 'Bán lời hứa ảo',
        t: [0, 0, 0, 0, 0],
        note: 'Sản phẩm không đạt kỳ vọng gây thất vọng cho khách hàng và kiệt sức cho đội ngũ.',
      },
      {
        text: 'Nói mập mờ để khách hàng tự hiểu rằng sản phẩm đã hoàn thiện 100%.',
        level: 'mid',
        verdict: 'Thiếu minh bạch',
        t: [1, 0, 0, 0, 0],
        note: 'Dễ phát sinh tranh chấp khi khách hàng đưa sản phẩm vào vận hành thực tế.',
      },
    ],
  },
  {
    id: 29,
    cat: 'Kỹ thuật quốc tế',
    en: 'Solar Falsifier',
    title: 'Rủ làm giả hóa đơn dự án',
    story:
      'Thành viên chương trình dịch vụ kỹ thuật toàn cầu được đồng nghiệp rủ làm giả hóa đơn lắp đặt điện mặt trời để chia nhau phần chênh lệch.',
    s1: 'Lợi ích tiền bạc cá nhân & nể nang đồng nghiệp vs. liêm chính tài chính trong dự án cộng đồng.',
    s2: 'Chứng từ mua sắm vật tư thực tế, ngân sách tài trợ và quy định kiểm toán của tổ chức.',
    s3: 'Tổ chức tài trợ dự án, cộng đồng nhận hệ thống điện mặt trời, thành viên và đồng nghiệp.',
    s7: 'Từ chối thẳng thắn, chỉ quyết toán theo chứng từ thực tế và báo cáo nếu đồng nghiệp gian lận.',
    s8: 'Áp dụng quy trình đối chiếu hóa đơn hai chữ ký độc lập và chụp ảnh nghiệm thu vật tư.',
    opts: [
      {
        text: 'Từ chối thẳng thắn, chỉ quyết toán theo chứng từ thực tế và báo cáo nếu đồng nghiệp gian lận.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Bảo toàn nguồn ngân sách dành cho cộng đồng khó khăn và giữ uy tín chương trình.',
      },
      {
        text: 'Đồng ý ký chung cho xong chuyện vì nghĩ số tiền không quá lớn.',
        level: 'bad',
        verdict: 'Biển thủ ngân sách',
        t: [0, 0, 0, 0, 0],
        note: 'Rút bớt nguồn lực của cộng đồng cần hỗ trợ và vi phạm pháp luật nghiêm trọng.',
      },
      {
        text: 'Không nhận tiền chia nhưng vẫn ký xác nhận hóa đơn khống giúp đồng nghiệp.',
        level: 'mid',
        verdict: 'Đồng lõa ký khống',
        t: [0, 0, 0, 0, 0],
        note: 'Vẫn tiếp tay cho hành vi chiếm đoạt quỹ và chịu trách nhiệm liên đới trên chứng từ.',
      },
    ],
  },
  {
    id: 30,
    cat: 'Kỹ thuật y sinh',
    en: 'Looking toward a Medical Future',
    title: 'Tình nguyện viên thử nghiệm rủi ro',
    story:
      'Nhà nghiên cứu y học tái tạo gặp người bệnh đang rất nóng lòng muốn đăng ký tham gia thử nghiệm lâm sàng giai đoạn sớm có mức độ rủi ro cao.',
    s1: 'Đẩy nhanh tiến độ thử nghiệm lâm sàng vs. bảo vệ an toàn và quyền tự quyết có hiểu biết.',
    s2: 'Dữ liệu an toàn tiền lâm sàng, tỷ lệ biến chứng tiềm ẩn và tiêu chuẩn sàng lọc đối tượng.',
    s3: 'Người tình nguyện tham gia thử nghiệm, nhà nghiên cứu, hội đồng đạo đức y sinh và cộng đồng.',
    s7: 'Giải thích cặn kẽ mọi rủi ro chưa lường trước, sàng lọc nghiêm ngặt và không tận dụng sự tuyệt vọng.',
    s8: 'Bắt buộc có bác sĩ tư vấn độc lập giải thích rủi ro cho bệnh nhân trước khi ký tham gia.',
    opts: [
      {
        text: 'Giải thích cặn kẽ mọi rủi ro chưa lường trước, sàng lọc nghiêm ngặt và không tận dụng sự tuyệt vọng.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Đảm bảo thử nghiệm diễn ra đúng chuẩn đạo đức y sinh và tôn trọng quyền được biết.',
      },
      {
        text: 'Nhận ngay vào nhóm thử nghiệm vì họ đã tự nguyện ký giấy miễn trừ rủi ro.',
        level: 'bad',
        verdict: 'Khai thác sự tuyệt vọng',
        t: [0, 0, 0, 0, 0],
        note: 'Đặt người tham gia vào nguy cơ biến chứng nặng khi công nghệ chưa sẵn sàng.',
      },
      {
        text: 'Chỉ nhấn mạnh cơ hội chữa khỏi bệnh để người tình nguyện yên tâm tham gia.',
        level: 'mid',
        verdict: 'Tư vấn thiên lệch',
        t: [0, 0, 0, 0, 0],
        note: 'Làm người tham gia đánh giá thấp rủi ro thực tế của thử nghiệm giai đoạn đầu.',
      },
    ],
  },
  {
    id: 31,
    cat: 'Kỹ thuật y sinh',
    en: 'A Positively Negative Response',
    title: 'Phát hiện bệnh ngoài phạm vi nghiên cứu',
    story:
      'Trong quá trình phân tích mẫu nghiên cứu ẩn danh, kỹ sư y sinh tình cờ phát hiện dấu hiệu cho thấy một người tham gia có thể đang mắc ung thư.',
    s1: 'Quy tắc ẩn danh dữ liệu nghiên cứu vs. cơ hội cứu sống người bệnh nhờ phát hiện sớm.',
    s2: 'Độ tin cậy của dấu hiệu bệnh lý, quy trình giải mã ẩn danh khẩn cấp của hội đồng đạo đức.',
    s3: 'Người tham gia cung cấp mẫu, kỹ sư y sinh, bác sĩ chủ nhiệm đề tài và hội đồng đạo đức.',
    s7: 'Báo cáo ngay cho bác sĩ chủ nhiệm và hội đồng đạo đức để liên hệ tư vấn y tế đúng quy trình.',
    s8: "Bổ sung điều khoản 'thông báo phát hiện ngẫu nhiên nghiêm trọng' vào biểu mẫu đồng thuận.",
    opts: [
      {
        text: 'Báo cáo ngay cho bác sĩ chủ nhiệm và hội đồng đạo đức để liên hệ tư vấn y tế đúng quy trình.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Giúp người tham gia được kiểm tra và điều trị kịp thời trong giai đoạn vàng.',
      },
      {
        text: 'Bỏ qua vì mục tiêu đề tài chỉ là thống kê kỹ thuật chứ không phải khám bệnh.',
        level: 'bad',
        verdict: 'Vô cảm trước sinh mạng',
        t: [0, 0, 0, 0, 0],
        note: 'Người tham gia mất cơ hội phát hiện bệnh sớm trong khi dữ liệu đã nằm trong tay nhóm.',
      },
      {
        text: 'Tự ý tra cứu thông tin cá nhân và gọi điện trực tiếp báo tin gây hoang mang.',
        level: 'mid',
        verdict: 'Sai quy trình y khoa',
        t: [1, 1, 0, 1, 0],
        note: 'Có ý tốt nhưng dễ gây sốc tâm lý và vi phạm quy trình bảo mật dữ liệu nghiên cứu.',
      },
    ],
  },
  {
    id: 32,
    cat: 'Kỹ thuật điện',
    en: 'Bulk Discount Balk',
    title: 'Nghi ngờ tính công bằng của cấp trên',
    story:
      'Hai kỹ sư hỗ trợ tại startup điện tử nghe nhìn nhận thấy quyết định chiết khấu và phân bổ thưởng của giám sát thiếu nhất quán, gây thiệt thòi.',
    s1: 'Im lặng chịu thiệt vs. phản hồi mang tính xây dựng về sự công bằng trong chính sách nhóm.',
    s2: 'Số liệu khối lượng hỗ trợ khách hàng thực tế, tác động giữ chân khách và quy chế thưởng.',
    s3: 'Hai kỹ sư hỗ trợ, người giám sát, bộ phận kinh doanh và ban điều hành startup.',
    s7: 'Tổng hợp số liệu đóng góp hỗ trợ khách hàng, đề nghị buổi họp trao đổi thẳng thắn với giám sát.',
    s8: 'Xây dựng hệ thống đo lường đóng góp của đội hỗ trợ kỹ thuật gắn với doanh thu duy trì.',
    opts: [
      {
        text: 'Tổng hợp số liệu đóng góp hỗ trợ khách hàng, đề nghị họp trao đổi thẳng thắn về tiêu chí đánh giá.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Giúp cấp trên thấy đóng góp thực tế của đội kỹ thuật hỗ trợ và điều chỉnh cơ chế.',
      },
      {
        text: 'Giảm tốc độ hỗ trợ khách hàng để chứng minh tầm quan trọng của bộ phận mình.',
        level: 'bad',
        verdict: 'Làm hại khách hàng',
        t: [0, 0, 0, 0, 0],
        note: 'Khách hàng chịu thiệt hại và uy tín công ty giảm sút; dễ bị kỷ luật.',
      },
      {
        text: 'Than phiền với khách hàng khi đi hỗ trợ rằng công ty đối xử bất công.',
        level: 'mid',
        verdict: 'Đưa chuyện nội bộ ra ngoài',
        t: [0, 0, 0, 0, 0],
        note: 'Làm mất hình ảnh chuyên nghiệp của công ty trước đối tác.',
      },
    ],
  },
  {
    id: 33,
    cat: 'Khoa học & Nghiên cứu',
    en: 'Questioning the Average',
    title: 'Nghi ngờ chỉ số trung bình của thuốc',
    story:
      'Chuyên viên giám sát phân tích dữ liệu thử nghiệm lâm sàng nhận thấy chỉ số trung bình khả quan nhưng che giấu tác dụng phụ nặng ở một nhóm bệnh nhân.',
    s1: 'Làm hài lòng công ty dược tài trợ thử nghiệm vs. cảnh báo trung thực về độ an toàn thuốc.',
    s2: 'Phân tích dữ liệu theo từng phân nhóm (tuổi, bệnh nền) và mức độ nghiêm trọng của tác dụng phụ.',
    s3: 'Bệnh nhân sử dụng thuốc, công ty dược khách hàng, cơ quan cấp phép và chuyên viên phân tích.',
    s7: 'Báo cáo chi tiết phân tích theo từng phân nhóm bệnh nhân, làm rõ rủi ro tác dụng phụ.',
    s8: 'Bắt buộc kiểm tra phân phối dữ liệu và phân nhóm rủi ro trước khi phê duyệt báo cáo lâm sàng.',
    opts: [
      {
        text: 'Báo cáo chi tiết phân tích theo từng phân nhóm bệnh nhân, làm rõ rủi ro tác dụng phụ.',
        level: 'good',
        verdict: 'Đạt cả 5 phép thử',
        t: [2, 2, 2, 2, 2],
        note: 'Ngăn chặn nguy cơ thuốc gây hại cho nhóm bệnh nhân nhạy cảm khi lưu hành rộng rãi.',
      },
      {
        text: 'Chỉ báo cáo con số trung bình đúng theo mẫu biểu yêu cầu của khách hàng.',
        level: 'bad',
        verdict: 'Che giấu rủi ro thống kê',
        t: [0, 0, 0, 0, 0],
        note: 'Khi thuốc ra thị trường, nhóm bệnh nhân nhạy cảm có thể gặp biến chứng nguy hiểm.',
      },
      {
        text: 'Ghi chú nhỏ bằng thuật ngữ thống kê khó hiểu ở phụ lục cuối báo cáo.',
        level: 'mid',
        verdict: 'Cảnh báo thiếu rõ ràng',
        t: [1, 0, 0, 0, 0],
        note: 'Người ra quyết định dễ bỏ qua rủi ro an toàn quan trọng.',
      },
    ],
  },
] as const;

export function getEthicsCaseById(id: number): EthicsCase {
  return ETHICS_CASES.find((item) => item.id === id) ?? ETHICS_CASES[0];
}

export function filterEthicsCasesByCategory(
  category: EthicsCategory
): readonly EthicsCase[] {
  if (category === 'Tất cả') {
    return ETHICS_CASES;
  }
  return ETHICS_CASES.filter((item) => item.cat === category);
}

export function countEthicsCategoryCases(category: EthicsCategory): number {
  return filterEthicsCasesByCategory(category).length;
}

export function computeEthicsStats(progress: EthicsProgressMap): {
  analyzedCount: number;
  goodCount: number;
  totalCount: number;
} {
  const keys = Object.keys(progress);
  const goodCount = keys.filter((k) => progress[k] === 'good').length;
  return {
    analyzedCount: keys.length,
    goodCount,
    totalCount: ETHICS_CASES.length,
  };
}

export const MAX_BALANCE_TILT_DEG = 12;

export function computeBalanceAngleDegrees(
  progress: EthicsProgressMap
): number {
  let net = 0;
  for (const level of Object.values(progress)) {
    if (level === 'good') net -= 2;
    else if (level === 'mid') net += 1;
    else if (level === 'bad') net += 2;
  }
  return Math.max(
    -MAX_BALANCE_TILT_DEG,
    Math.min(MAX_BALANCE_TILT_DEG, Math.round(net))
  );
}

export function sanitizeEthicsProgress(raw: unknown): EthicsProgressMap {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return {};
  }
  const validIds = new Set(ETHICS_CASES.map((c) => String(c.id)));
  const cleaned: EthicsProgressMap = {};
  for (const [key, val] of Object.entries(raw as Record<string, unknown>)) {
    if (
      validIds.has(key) &&
      (val === 'good' || val === 'mid' || val === 'bad')
    ) {
      cleaned[key] = val;
    }
  }
  return cleaned;
}

export function getNextEthicsCaseId(currentId: number): number {
  return currentId >= ETHICS_CASES.length ? 1 : currentId + 1;
}

export function pickRandomEthicsCaseId(
  currentId: number,
  randomValue = Math.random()
): number {
  const pool = ETHICS_CASES.filter((c) => c.id !== currentId);
  if (pool.length === 0) return currentId;
  const idx = Math.min(
    pool.length - 1,
    Math.max(0, Math.floor(randomValue * pool.length))
  );
  return pool[idx].id;
}

export function buildEightStepExportText(
  c: EthicsCase,
  pickedIdx: number | null
): string {
  const opt = pickedIdx !== null ? c.opts[pickedIdx] ?? null : null;
  const scoreLabels = ['Không đạt', 'Rủi ro', 'Đạt'] as const;
  const lines = [
    `PHÂN TÍCH TÌNH HUỐNG ĐẠO ĐỨC KỸ THUẬT (SCU #${c.id})`,
    `Tên tình huống: ${c.title} (${c.en}) - Lĩnh vực: ${c.cat}`,
    `Bối cảnh: ${c.story}`,
    '',
    'I. QUY TRÌNH 8 BƯỚC GIẢI QUYẾT VẤN ĐỀ:',
    `1. Xác định vấn đề đạo đức: ${c.s1}`,
    `2. Dữ kiện cần kiểm tra: ${c.s2}`,
    `3. Các bên liên quan: ${c.s3}`,
    `4. Các phương án xem xét: A) ${c.opts[0].text} | B) ${c.opts[1].text} | C) ${c.opts[2].text}`,
    `5. Kiểm tra 5 phép thử: ${
      opt
        ? opt.t
            .map((v, i) => `${ETHICS_TEST_META[i].name} (${scoreLabels[v]})`)
            .join(', ')
        : '(Chưa chọn phương án)'
    }`,
    `6. Lựa chọn quyết định: ${
      opt
        ? `Phương án ${OPTION_LABELS[pickedIdx!]} - ${opt.text}`
        : '(Chưa chọn)'
    }`,
    `7. Cách thực thi chuẩn mực: ${c.s7}`,
    `8. Bài học cải tiến & phòng ngừa: ${c.s8}`,
  ];
  return lines.join('\n');
}
