export type MajorKey = 'tdh' | 'dtvt' | 'ktd' | 'tkvm';

export interface MajorInfo {
  key: MajorKey;
  code: string;
  name: string;
  fullName: string;
  shortDesc: string;
  focusAreas: readonly string[];
  careers: readonly string[];
  color: string;
  accentBg: string;
  borderAccent: string;
}

export const MAJORS: Record<MajorKey, MajorInfo> = {
  tdh: {
    key: 'tdh',
    code: 'TDH',
    name: 'Kỹ thuật Điều khiển & Tự động hóa',
    fullName: 'Kỹ thuật Điều khiển và Tự động hóa',
    shortDesc:
      'Thiết kế và vận hành các hệ thống tự động, robot công nghiệp, dây chuyền sản xuất số hóa và thuật toán điều khiển thông minh.',
    focusAreas: [
      'Lập trình PLC & Hệ thống SCADA công nghiệp',
      'Robot học và phương tiện tự hành (AGV, Drone)',
      'Thuật toán điều khiển PID, mờ, nơ-ron và thị giác máy tính',
      'Tự động hóa nhà máy số và công nghiệp 4.0',
    ],
    careers: [
      'Kỹ sư lập trình & điều khiển tự động',
      'Kỹ sư Robot và Cơ điện tử',
      'Kỹ sư tích hợp hệ thống SCADA/DCS',
      'Chuyên viên chuyển đổi số nhà máy thông minh',
    ],
    color: '#0284c7', // Sky-600
    accentBg: 'bg-sky-600',
    borderAccent: 'border-sky-600',
  },
  dtvt: {
    key: 'dtvt',
    code: 'DTVT',
    name: 'Điện tử - Viễn thông',
    fullName: 'Kỹ thuật Điện tử - Viễn thông',
    shortDesc:
      'Nghiên cứu xử lý tín hiệu, mạng truyền thông không dây, cảm biến kết nối IoT và các hệ thống viễn thông thế hệ mới.',
    focusAreas: [
      'Mạng truyền thông 5G/6G, vệ tinh và truyền dẫn quang',
      'Mạng cảm biến không dây IoT (LoRa, BLE, Zigbee)',
      'Xử lý số tín hiệu (DSP) và lọc nhiễu âm thanh/hình ảnh',
      'Thiết kế siêu cao tần, anten và truyền thông vô tuyến RF',
    ],
    careers: [
      'Kỹ sư viễn thông và mạng dữ liệu',
      'Kỹ sư phát triển phần cứng & firmware IoT',
      'Kỹ sư xử lý tín hiệu & trí tuệ nhân tạo nhúng',
      'Kỹ sư đo kiểm và tối ưu hóa mạng vô tuyến',
    ],
    color: '#6366f1', // Indigo-500
    accentBg: 'bg-indigo-600',
    borderAccent: 'border-indigo-600',
  },
  ktd: {
    key: 'ktd',
    code: 'KTD',
    name: 'Kỹ thuật Điện',
    fullName: 'Kỹ thuật Điện (Hệ thống Điện & Năng lượng)',
    shortDesc:
      'Quản lý hệ thống phát, truyền tải, phân phối điện năng quy mô lớn, năng lượng tái tạo và lưới điện thông minh an toàn.',
    focusAreas: [
      'Hệ thống điện quốc gia và lưới điện thông minh (Smart Grid)',
      'Năng lượng tái tạo: điện mặt trời, điện gió và lưu trữ pin',
      'Máy điện quay, máy biến áp và khí cụ đóng cắt',
      'Bảo vệ rơ-le, điều độ hệ thống điện và an toàn điện công nghiệp',
    ],
    careers: [
      'Kỹ sư vận hành lưới điện & trạm biến áp',
      'Kỹ sư dự án năng lượng tái tạo & điện mặt trời',
      'Kỹ sư tư vấn thiết kế cơ điện (M&E)',
      'Chuyên viên kiểm định và bảo vệ rơ-le hệ thống điện',
    ],
    color: '#059669', // Emerald-600
    accentBg: 'bg-emerald-600',
    borderAccent: 'border-emerald-600',
  },
  tkvm: {
    key: 'tkvm',
    code: 'TKVM',
    name: 'Thiết kế Vi mạch',
    fullName: 'Kỹ thuật Thiết kế Vi mạch & Bán dẫn',
    shortDesc:
      'Thiết kế chip bán dẫn, vi mạch số RTL, vi mạch tương tự, kiến trúc SoC và quy trình xác minh kiểm thử bán dẫn toàn cầu.',
    focusAreas: [
      'Thiết kế logic số RTL (Verilog, SystemVerilog)',
      'Thiết kế vi mạch tích hợp tương tự (Analog IC) & Layout',
      'Kiến trúc hệ thống trên chip (SoC) và bộ xử lý',
      'Quy trình kiểm thử, xác minh (Design Verification) & đóng gói chip',
    ],
    careers: [
      'Kỹ sư thiết kế logic số (RTL Design Engineer)',
      'Kỹ sư xác minh vi mạch (Design Verification Engineer)',
      'Kỹ sư thiết kế mạch tương tự (Analog IC Designer)',
      'Kỹ sư layout vi mạch và đóng gói bán dẫn',
    ],
    color: '#d97706', // Amber-600
    accentBg: 'bg-amber-600',
    borderAccent: 'border-amber-600',
  },
};

export type OptionLetter = 'A' | 'B' | 'C' | 'D';

export interface QuizOption {
  letter: OptionLetter;
  text: string;
  majors: readonly MajorKey[];
}

export interface QuizQuestion {
  id: number;
  context: string;
  promptQuestion?: string;
  options: readonly QuizOption[];
}

// Mapping from the prompt internal scoring table:
// x = tkvm, y = ktd, z = dtvt, t = tdh
export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  {
    id: 1,
    context:
      'Sau một trận mưa lớn, một khu phức hợp gồm hệ thống bơm nước, kho lạnh, thang máy, chiếu sáng và hệ thống giám sát bắt đầu hoạt động chập chờn. Các sự cố không xảy ra cùng lúc, nhật ký hoạt động cũng bị thiếu một số thời điểm. Nếu tham gia nhóm xử lý, bạn muốn bắt đầu từ đâu?',
    options: [
      {
        letter: 'A',
        text: 'Lập lại bản đồ các nhánh cấp nguồn, đối chiếu thời điểm tải tăng, sụt áp và cách các thiết bị bảo vệ phản ứng.',
        majors: ['ktd'], // y
      },
      {
        letter: 'B',
        text: 'So sánh các tín hiệu được ghi nhận ở nhiều vị trí, lần ngược xem sai lệch xuất hiện ở khâu đo đạc, truyền nhận hay xử lý.',
        majors: ['tkvm', 'dtvt', 'tdh'], // x + z + t
      },
      {
        letter: 'C',
        text: 'Chọn một cụm linh kiện nghi ngờ, tạo các điều kiện thử có kiểm soát để tìm xem lỗi lặp lại theo nhiệt độ, thời gian hay mức tải.',
        majors: ['tkvm', 'tdh'], // x + t
      },
      {
        letter: 'D',
        text: 'Dựng lại trình tự vận hành giữa các bộ phận, xác định một phản ứng chậm ở khâu này đã kéo theo những khâu khác ra sao.',
        majors: ['ktd', 'tdh'], // y + t
      },
    ],
  },
  {
    id: 2,
    context:
      'Một thiết bị khoa học cũ vẫn cho kết quả chính xác, nhưng dữ liệu phải được đọc và ghi chép thủ công. Một nhóm nghiên cứu muốn nâng cấp nó để có thể theo dõi từ xa mà không phải thay thế toàn bộ thiết bị. Bạn hứng thú nhất với phần việc nào?',
    options: [
      {
        letter: 'A',
        text: 'Tái thiết kế phần xử lý bên trong theo hướng gọn hơn, sau đó kiểm tra để thiết bị hoạt động ổn định trong nhiều điều kiện.',
        majors: ['tkvm'], // x
      },
      {
        letter: 'B',
        text: 'Tạo một lớp giao tiếp để thiết bị cũ trao đổi dữ liệu với hệ thống mới mà không làm mất mốc thời gian và ý nghĩa thông tin.',
        majors: ['dtvt', 'tdh'], // z + t
      },
      {
        letter: 'C',
        text: 'Sắp xếp lại trình tự thao tác để thiết bị tự xử lý các tình huống thường gặp và chỉ yêu cầu con người can thiệp khi có ngoại lệ.',
        majors: ['tdh'], // t
      },
      {
        letter: 'D',
        text: 'Kiểm tra khả năng cấp nguồn, bảo vệ, nối đất và tuổi thọ trước khi bổ sung các chức năng mới.',
        majors: ['ktd'], // y
      },
    ],
  },
  {
    id: 3,
    context:
      'Một dự án khoa học cần đặt hàng trăm trạm quan sát tại những khu vực miền núi, nơi không có người trực thường xuyên và điều kiện thời tiết thay đổi liên tục. Dữ liệu phải được chuyển về trung tâm trong nhiều tháng.',
    options: [
      {
        letter: 'A',
        text: 'Khảo sát địa hình, hướng đặt bộ thu phát và những vật cản có thể khiến tín hiệu suy giảm hoặc phản xạ.',
        majors: ['dtvt'], // z
      },
      {
        letter: 'B',
        text: 'Tối ưu bộ phận xử lý và phần cứng tại từng điểm đo để thiết bị có thể tính toán với mức tiêu thụ năng lượng rất thấp.',
        majors: ['tkvm', 'dtvt'], // x + z
      },
      {
        letter: 'C',
        text: 'Tìm phương án tạo và dự trữ năng lượng tại chỗ để các trạm hoạt động được qua nhiều ngày thời tiết xấu.',
        majors: ['ktd'], // y
      },
      {
        letter: 'D',
        text: 'Xây dựng quy tắc để mỗi trạm tự nhận ra những biến động đáng chú ý và phản ứng phù hợp khi mất kết nối với trung tâm.',
        majors: ['tkvm', 'tdh'], // x + t
      },
    ],
  },
  {
    id: 4,
    context:
      'Một dây chuyền sản xuất cho ra những sản phẩm gần như giống hệt nhau. Tuy nhiên, khi hoạt động liên tục trong nhiều giờ, một số sản phẩm bắt đầu xuất hiện sai lệch nhỏ dù nguyên liệu đầu vào không thay đổi. Bạn sẽ tò mò nhất về hướng điều tra nào?',
    options: [
      {
        letter: 'A',
        text: 'Theo dõi thời điểm sai lệch xuất hiện, điều chỉnh tương quan giữa đo lường và hành động để tránh sửa chữa quá muộn.',
        majors: ['tdh'], // t
      },
      {
        letter: 'B',
        text: 'Phân tích những mẫu biến thiên theo thời gian để tìm nhiễu có chu kỳ hoặc dấu hiệu sai lệch trong tín hiệu.',
        majors: ['tkvm', 'dtvt'], // x + z
      },
      {
        letter: 'C',
        text: 'Kiểm tra dao động điện áp, tải và nhiệt độ của hệ thống tạo ra chuyển động trong dây chuyền.',
        majors: ['ktd', 'tdh'], // y + t
      },
      {
        letter: 'D',
        text: 'Kiểm tra các giới hạn về tốc độ xử lý và sự phối hợp bên trong một bộ phận điện tử khi tốc độ dây chuyền tăng.',
        majors: ['tkvm'], // x
      },
    ],
  },
  {
    id: 5,
    context:
      'Một nhóm kỹ sư được giao thiết kế một sản phẩm công nghệ có kích thước nhỏ, không dễ thay pin và phải hoạt động ổn định trong ít nhất 10 năm. Họ không thể tối ưu tất cả mọi thứ cùng lúc vì mỗi cải tiến đều tạo ra một giới hạn mới. Bạn muốn tham gia giải quyết vấn đề nào nhất?',
    options: [
      {
        letter: 'A',
        text: 'Lựa chọn cấu trúc xử lý bên trong sao cho cân bằng giữa tốc độ, kích thước, năng lực tính toán và mức tiêu thụ năng lượng.',
        majors: ['tkvm'], // x
      },
      {
        letter: 'B',
        text: 'Thiết kế các khối biến đổi và xử lý sao cho năng lượng tiêu hao, nhiệt phát sinh và độ ổn định nằm trong giới hạn.',
        majors: ['tkvm', 'ktd'], // x + y
      },
      {
        letter: 'C',
        text: 'Tìm cách trao đổi thông tin sao cho dữ liệu ít bị mất, độ trễ thấp và vẫn hoạt động được khi điều kiện kết nối không thuận lợi.',
        majors: ['dtvt'], // z
      },
      {
        letter: 'D',
        text: 'Xây dựng cơ chế thay đổi chế độ hoạt động tùy theo lượng công việc để tiết kiệm năng lượng mà không ảnh hưởng đến khả năng phản hồi.',
        majors: ['tkvm', 'tdh'], // x + t
      },
    ],
  },
  {
    id: 6,
    context:
      'Một thiết bị theo dõi sức khỏe cần phát hiện những thay đổi rất nhỏ trong tín hiệu sinh học của con người. Tuy nhiên, chuyển động cơ thể, môi trường và các yếu tố bên ngoài có thể làm dữ liệu bị sai lệch. Bạn muốn tìm hiểu sâu nhất về vấn đề nào?',
    options: [
      {
        letter: 'A',
        text: 'Phân biệt sự thay đổi thực sự của cơ thể với những biến động giả tạo do chuyển động, nhiễu và môi trường.',
        majors: ['dtvt'], // z
      },
      {
        letter: 'B',
        text: 'Hiệu chuẩn vị trí đo, xây dựng ngưỡng cảnh báo và đảm bảo thiết bị chỉ phản ứng khi có dấu hiệu thực sự đáng chú ý.',
        majors: ['tkvm', 'tdh'], // x + t
      },
      {
        letter: 'C',
        text: 'Tối ưu bộ phận tiếp nhận và chuyển đổi tín hiệu để những biến đổi rất nhỏ vẫn được giữ lại một cách đáng tin cậy.',
        majors: ['tkvm', 'dtvt'], // x + z
      },
      {
        letter: 'D',
        text: 'Đảm bảo khả năng cách ly điện, an toàn cho người sử dụng và duy trì hoạt động ổn định trong các điều kiện cấp nguồn khác nhau.',
        majors: ['ktd', 'dtvt'], // y + z
      },
    ],
  },
  {
    id: 7,
    context:
      'Một thành phố đang sử dụng kết hợp điện mặt trời, hệ thống lưu trữ, các nguồn cung cấp truyền thống và nhiều loại phụ tải có thời gian sử dụng khác nhau. Thách thức không chỉ là tạo ra năng lượng mà còn là phối hợp chúng một cách ổn định. Phần việc nào khiến bạn muốn tham gia nhất?',
    options: [
      {
        letter: 'A',
        text: 'Xác định năng lượng được tiêu thụ ở đâu, vào thời điểm nào và những vị trí có nguy cơ quá tải.',
        majors: ['ktd'], // y
      },
      {
        letter: 'B',
        text: 'Xử lý sự tương thích giữa các nguồn bằng những khối biến đổi, đồng bộ và phần xử lý bên trong để đầu ra không gây xáo trộn cho toàn hệ thống.',
        majors: ['tkvm', 'ktd'], // x + y
      },
      {
        letter: 'C',
        text: 'Lập kế hoạch điều phối thiết bị sử dụng điện và hệ thống lưu trữ dựa trên nhu cầu, dự báo và các điều kiện an toàn.',
        majors: ['ktd', 'tdh'], // y + t
      },
      {
        letter: 'D',
        text: 'Thiết kế những mô-đun phân tán có thể xử lý tại chỗ, chia sẻ trạng thái và phối hợp phản ứng khi điều kiện vận hành thay đổi.',
        majors: ['tkvm', 'dtvt', 'tdh'], // x + z + t
      },
    ],
  },
  {
    id: 8,
    context:
      'Một sản phẩm hoạt động hoàn toàn bình thường trong phòng thử nghiệm. Nhưng khi đưa vào môi trường thực tế, gần các máy công suất lớn, nhiệt độ cao và nhiều dây dẫn, thiết bị đôi khi tự khởi động lại mà không có quy luật rõ ràng. Bạn muốn tiếp cận vấn đề theo hướng nào?',
    options: [
      {
        letter: 'A',
        text: 'Truy tìm cách các yếu tố gây nhiễu lan truyền qua dây dẫn, giao diện và những thiết bị ở gần, đồng thời so sánh kết quả tại nhiều vị trí.',
        majors: ['dtvt'], // z
      },
      {
        letter: 'B',
        text: 'Kiểm tra giới hạn thời gian xử lý và khả năng chịu sai lệch của linh kiện bên trong khi nhiệt độ và điện áp thay đổi.',
        majors: ['tkvm'], // x
      },
      {
        letter: 'C',
        text: 'Rà soát hệ thống nối đất, cách điện, chất lượng nguồn cấp và khả năng chịu tác động của các khối điện tử khi môi trường xung quanh biến động.',
        majors: ['tkvm', 'ktd'], // x + y
      },
      {
        letter: 'D',
        text: 'Tái tạo chính xác trình tự hoạt động ngoài thực tế và theo dõi xem quyết định nào dẫn đến lỗi.',
        majors: ['tdh'], // t
      },
    ],
  },
  {
    id: 9,
    context:
      'Một dự án cần duy trì liên lạc giữa nhiều khu vực bị ngăn cách bởi núi, thung lũng và đường hầm. Có những vị trí không thể quan sát trực tiếp hoặc dễ bị mất kết nối khi thời tiết thay đổi. Nếu tham gia dự án, bạn muốn giải quyết khía cạnh nào?',
    options: [
      {
        letter: 'A',
        text: 'Tính toán vị trí đặt thiết bị thu phát, hướng anten và những ảnh hưởng của địa hình đến khả năng truyền tín hiệu.',
        majors: ['dtvt'], // z
      },
      {
        letter: 'B',
        text: 'Phát triển phương pháp xử lý để vẫn trích xuất được thông tin cần thiết khi tín hiệu yếu và lẫn nhiều nhiễu.',
        majors: ['tkvm', 'dtvt'], // x + z
      },
      {
        letter: 'C',
        text: 'Xây dựng cách phối hợp giữa các nút kết nối để thông tin có thể chuyển sang tuyến khác khi một vị trí gặp sự cố.',
        majors: ['dtvt', 'tdh'], // z + t
      },
      {
        letter: 'D',
        text: 'Đảm bảo các trạm ở khu vực biệt lập có nguồn cấp ổn định, an toàn và được bảo vệ trước những biến động bất thường.',
        majors: ['ktd', 'dtvt'], // y + z
      },
    ],
  },
  {
    id: 10,
    context:
      'Chất lượng nước đầu vào của một nhà máy thay đổi theo mùa và theo từng thời điểm trong ngày. Nếu phản ứng quá chậm, chất lượng đầu ra không đạt yêu cầu; nếu phản ứng quá mạnh, nhà máy sẽ lãng phí tài nguyên. Bạn muốn đảm nhận nhiệm vụ nào?',
    options: [
      {
        letter: 'A',
        text: 'Xây dựng mô hình để hiểu độ trễ của quy trình và xác định hệ thống cần phản ứng sớm, mạnh hay nhẹ khi đầu vào thay đổi.',
        majors: ['ktd', 'tdh'], // y + t
      },
      {
        letter: 'B',
        text: 'Thiết kế hệ thống đo và truyền dữ liệu đáng tin cậy để người vận hành có thể nắm được chính xác tình trạng thực tế.',
        majors: ['dtvt', 'tdh'], // z + t
      },
      {
        letter: 'C',
        text: 'Phân tích đặc tính của máy bơm, hệ thống truyền động và nhu cầu năng lượng để tìm ra chế độ hoạt động tiết kiệm nhất.',
        majors: ['ktd'], // y
      },
      {
        letter: 'D',
        text: 'Xây dựng một kiến trúc nhiều lớp kết hợp thu nhận dữ liệu, xử lý tại chỗ, kết nối thông tin và phản hồi tự động, đồng thời đảm bảo an toàn cho toàn bộ hệ thống.',
        majors: ['tkvm', 'ktd', 'dtvt', 'tdh'], // x + y + z + t
      },
    ],
  },
  {
    id: 11,
    context:
      'Một dự án giám sát cầu sử dụng hàng trăm cảm biến được đặt ở các vị trí khác nhau. Dữ liệu được thu thập liên tục nhằm phát hiện những biến đổi bất thường trước khi sự cố nghiêm trọng xảy ra. Bạn muốn đóng góp vào phần nào?',
    options: [
      {
        letter: 'A',
        text: 'So sánh chu kỳ lấy mẫu, phương pháp lọc nhiễu, độ trễ truyền dữ liệu và độ tin cậy của thông tin ghi nhận.',
        majors: ['dtvt'], // z
      },
      {
        letter: 'B',
        text: 'Kiểm tra nguồn cấp lâu dài, nối đất, khả năng chống chịu thời tiết và bảo vệ trước sét.',
        majors: ['ktd'], // y
      },
      {
        letter: 'C',
        text: 'Hiệu chuẩn đầu vào, tối ưu quá trình xử lý, đặt ngưỡng cảnh báo và đảm bảo hệ thống phản ứng dựa trên diễn biến thực sự thay vì một lần đo bất thường.',
        majors: ['tkvm', 'dtvt', 'tdh'], // x + z + t
      },
      {
        letter: 'D',
        text: 'Tối ưu khả năng xử lý và lưu trữ tại các điểm đo từ xa để dữ liệu vẫn chính xác dù tài nguyên tại chỗ có hạn.',
        majors: ['tkvm', 'dtvt'], // x + z
      },
    ],
  },
  {
    id: 12,
    context:
      'Một khuôn viên đại học muốn xây dựng hệ thống vận hành thông minh, bao gồm chiếu sáng, làm mát, thang máy và các thiết bị phục vụ học tập. Các thiết bị được sản xuất ở nhiều thời điểm, bởi nhiều nhà cung cấp khác nhau. Bạn thấy khía cạnh nào đáng nghiên cứu nhất?',
    options: [
      {
        letter: 'A',
        text: 'Xác định khu vực tiêu thụ nhiều năng lượng, thời điểm đạt đỉnh và những tổn hao có thể giảm trong hệ thống chiếu sáng, làm mát.',
        majors: ['ktd'], // y
      },
      {
        letter: 'B',
        text: 'Điều chỉnh cách thiết bị phản ứng theo số lượng người sử dụng, thời tiết và nhu cầu thực tế, tránh tình trạng các thiết bị hoạt động trái ngược nhau.',
        majors: ['ktd', 'tdh'], // y + t
      },
      {
        letter: 'C',
        text: 'Xây dựng cơ chế trao đổi trạng thái và lệnh điều khiển giữa các thiết bị khác thế hệ, khác phương thức giao tiếp.',
        majors: ['dtvt', 'tdh'], // z + t
      },
      {
        letter: 'D',
        text: 'Phát triển những mô-đun xử lý nhỏ gọn tại chỗ để đưa ra quyết định nhanh mà không cần chuyển toàn bộ dữ liệu về trung tâm.',
        majors: ['tkvm', 'dtvt'], // x + z
      },
    ],
  },
  {
    id: 13,
    context:
      'Một dự án phát triển phương tiện thăm dò cần hoạt động ở địa hình chưa được khảo sát. Phương tiện phải di chuyển, nhận biết môi trường, xử lý những tình huống bất ngờ và hoạt động trong giới hạn năng lượng cho phép. Bạn tò mò nhất về nhiệm vụ nào?',
    options: [
      {
        letter: 'A',
        text: 'Kết hợp thông tin từ hình ảnh, khoảng cách, vị trí và chuyển động để xác định môi trường xung quanh.',
        majors: ['dtvt', 'tdh'], // z + t
      },
      {
        letter: 'B',
        text: 'Đảm bảo chuyển động ổn định trên những bề mặt khác nhau, kể cả khi có trượt, độ trễ hoặc lực cản bất ngờ.',
        majors: ['tdh'], // t
      },
      {
        letter: 'C',
        text: 'Thiết kế kiến trúc xử lý đủ nhỏ gọn, không quá nóng và không tiêu thụ quá nhiều năng lượng nhưng vẫn đáp ứng yêu cầu tính toán.',
        majors: ['tkvm', 'dtvt'], // x + z
      },
      {
        letter: 'D',
        text: 'Đảm bảo hệ thống truyền động tạo được lực và tốc độ phù hợp mà không quá nóng hoặc gây lãng phí năng lượng.',
        majors: ['ktd', 'tdh'], // y + t
      },
    ],
  },
  {
    id: 14,
    context:
      'Một bệnh viện có nhiều thiết bị hỗ trợ sự sống, hệ thống theo dõi và thiết bị phục vụ điều trị. Khi xảy ra sự cố, không phải thiết bị nào cũng được phép dừng hoạt động, và những thông báo sai có thể gây nguy hiểm. Bạn muốn tham gia giải quyết vấn đề nào?',
    options: [
      {
        letter: 'A',
        text: 'Phân tích các phụ tải quan trọng, nguồn dự phòng, khả năng cách ly và duy trì cấp điện khi có sự cố.',
        majors: ['ktd'], // y
      },
      {
        letter: 'B',
        text: 'Đảm bảo các thiết bị có thể trao đổi thông tin mà không bị nhiễu, mất dữ liệu hoặc sai lệch thời điểm ghi nhận.',
        majors: ['dtvt'], // z
      },
      {
        letter: 'C',
        text: 'Phối hợp cảnh báo và quy trình hoạt động giữa các thiết bị để chúng phản ứng đúng, không tạo ra những hành động mâu thuẫn, đồng thời đảm bảo an toàn cho người bệnh.',
        majors: ['ktd', 'dtvt', 'tdh'], // y + z + t
      },
      {
        letter: 'D',
        text: 'Phát triển mô-đun xử lý tại chỗ có thể phân tích tín hiệu khẩn cấp và đưa ra phản ứng xác định trong thời gian rất ngắn.',
        majors: ['tkvm', 'tdh'], // x + t
      },
    ],
  },
  {
    id: 15,
    context:
      'Trong một cơ sở sản xuất có yêu cầu độ chính xác rất cao, những sai lệch nhỏ về vị trí, tốc độ hoặc thời gian có thể khiến cả sản phẩm không đạt yêu cầu. Đặc biệt, sai số có thể tích lũy sau nhiều giờ vận hành. Bạn muốn nghiên cứu vấn đề nào?',
    options: [
      {
        letter: 'A',
        text: 'Đo lường đầu ra nhiều lần, xác định mức độ sai lệch và điều chỉnh quá trình trước khi lỗi tích lũy.',
        majors: ['tdh'], // t
      },
      {
        letter: 'B',
        text: 'Phân tích các dấu hiệu rung động và biến thiên tín hiệu để phát hiện bất thường từ giai đoạn rất sớm.',
        majors: ['dtvt', 'tdh'], // z + t
      },
      {
        letter: 'C',
        text: 'Duy trì tốc độ và lực truyền động ổn định khi tải thay đổi, đồng thời tính đến nhiệt lượng và mức năng lượng tiêu thụ.',
        majors: ['ktd', 'tdh'], // y + t
      },
      {
        letter: 'D',
        text: 'Kiểm chứng cách các khối xử lý bên trong hoạt động khi xuất hiện những trường hợp về thời gian và điều kiện vận hành rất hiếm gặp.',
        majors: ['tkvm'], // x
      },
    ],
  },
  {
    id: 16,
    context:
      'Một công ty đưa ra ý tưởng về sản phẩm thế hệ mới nhưng chưa xác định đầy đủ cấu trúc, môi trường hoạt động và những giới hạn kỹ thuật. Nhóm phát triển phải lựa chọn hướng tiếp cận trước khi bắt tay xây dựng nguyên mẫu. Bạn muốn đặt câu hỏi nào đầu tiên?',
    options: [
      {
        letter: 'A',
        text: 'Cấu trúc xử lý bên trong nên được tổ chức ra sao và cần phân bổ tài nguyên như thế nào để đáp ứng yêu cầu?',
        majors: ['tkvm', 'dtvt'], // x + z
      },
      {
        letter: 'B',
        text: 'Làm sao để các hệ thống khác nhau có thể trao đổi thông tin ổn định trong nhiều môi trường và điều kiện khác nhau?',
        majors: ['dtvt', 'tdh'], // z + t
      },
      {
        letter: 'C',
        text: 'Chi phí năng lượng, an toàn, độ bền và những giới hạn vật lý sẽ ảnh hưởng như thế nào đến thiết kế?',
        majors: ['tkvm', 'ktd'], // x + y
      },
      {
        letter: 'D',
        text: 'Cần xây dựng cách phản ứng và cơ chế phản hồi như thế nào để hệ thống vẫn ổn định khi đầu vào thay đổi?',
        majors: ['ktd', 'tdh'], // y + t
      },
    ],
  },
  {
    id: 17,
    context:
      'Một sự cố làm một khu vực bị ngắt khỏi hệ thống chung. Thiết bị bảo vệ đã hoạt động và khoanh vùng được sự cố, nhưng quá trình khôi phục vẫn diễn ra chậm vì chưa xác định rõ trình tự các sự kiện. Bạn muốn tham gia công việc nào?',
    options: [
      {
        letter: 'A',
        text: 'Tính toán các điều kiện sự cố và phối hợp thông số của các thiết bị bảo vệ để hạn chế phạm vi ảnh hưởng.',
        majors: ['ktd'], // y
      },
      {
        letter: 'B',
        text: 'Khôi phục các bản ghi theo thời gian, sắp xếp lại diễn biến sự kiện và phối hợp phương án bảo vệ cũng như khôi phục hoạt động.',
        majors: ['ktd', 'dtvt', 'tdh'], // y + z + t
      },
      {
        letter: 'C',
        text: 'Xây dựng kế hoạch khôi phục theo từng giai đoạn để đưa các khu vực trở lại hoạt động mà không tạo ra một biến động thứ hai.',
        majors: ['ktd', 'tdh'], // y + t
      },
      {
        letter: 'D',
        text: 'Đảm bảo các thiết bị điện tử ghi nhận sự kiện và xử lý lệnh vẫn lưu trữ dữ liệu chính xác khi làm việc trong điều kiện khắc nghiệt.',
        majors: ['tkvm', 'dtvt'], // x + z
      },
    ],
  },
  {
    id: 18,
    context:
      'Một khu công nghiệp sử dụng thiết bị của nhiều nhà sản xuất. Mỗi loại có cách lưu trữ dữ liệu và trao đổi thông tin khác nhau. Khi hệ thống kết nối trung tâm bị gián đoạn, nhiều quy trình cũng bị ảnh hưởng. Bạn muốn giải quyết vấn đề nào?',
    options: [
      {
        letter: 'A',
        text: 'Phát triển các bộ chuyển đổi giao tiếp để những thiết bị khác nhau có thể trao đổi dữ liệu, đồng thời vẫn xử lý và phản ứng tại chỗ khi mất kết nối trung tâm.',
        majors: ['tkvm', 'dtvt', 'tdh'], // x + z + t
      },
      {
        letter: 'B',
        text: 'Tối ưu những thiết bị xử lý tại biên để chúng thực hiện được công việc cần thiết với ít năng lượng và tài nguyên hơn.',
        majors: ['tkvm', 'dtvt'], // x + z
      },
      {
        letter: 'C',
        text: 'Thiết kế lại quy trình vận hành để các bộ phận có thể tự đưa ra quyết định an toàn khi không liên lạc được với trung tâm.',
        majors: ['tdh'], // t
      },
      {
        letter: 'D',
        text: 'Kiểm tra những vấn đề của hạ tầng điện phía sau các lỗi giao tiếp, chẳng hạn chất lượng nguồn, nối đất, chống quá áp và nhiễu.',
        majors: ['ktd', 'dtvt'], // y + z
      },
    ],
  },
  {
    id: 19,
    context:
      'Một viện nghiên cứu muốn phục dựng một trạm khí tượng cũ đã ngừng sản xuất từ nhiều thập kỷ trước. Không còn bản vẽ đầy đủ, linh kiện thay thế cũng khó tìm. Mục tiêu là khôi phục hoạt động và bổ sung khả năng vận hành trong điều kiện hiện đại. Bạn muốn đảm nhận công việc nào?',
    options: [
      {
        letter: 'A',
        text: 'Lần theo cấu trúc điện tử bên trong, xác định cách từng khối chức năng đóng góp vào kết quả đo được.',
        majors: ['tkvm'], // x
      },
      {
        letter: 'B',
        text: 'Khôi phục khả năng thu nhận thông tin bằng cách nghiên cứu đặc tính cộng hưởng, vị trí anten và cách xử lý tín hiệu yếu.',
        majors: ['dtvt'], // z
      },
      {
        letter: 'C',
        text: 'Phục dựng hệ thống truyền động và cấp năng lượng để thiết bị hoạt động ổn định khi tải và môi trường thay đổi.',
        majors: ['ktd', 'tdh'], // y + t
      },
      {
        letter: 'D',
        text: 'Bổ sung cơ chế hiệu chỉnh để bù trừ những sai lệch tăng dần do hao mòn, nhiệt độ hoặc thay đổi vị trí.',
        majors: ['tdh'], // t
      },
    ],
  },
  {
    id: 20,
    context:
      'Hãy tưởng tượng bạn đã làm kỹ thuật được vài năm. Bạn có thể lựa chọn tham gia những dự án khác nhau. Dạng công việc nào khiến bạn muốn dành nhiều thời gian tìm hiểu và cải tiến nhất?',
    options: [
      {
        letter: 'A',
        text: 'Theo dõi một hạ tầng quy mô lớn, tìm cách duy trì sự an toàn, liên tục và hiệu quả trong nhiều điều kiện sử dụng.',
        majors: ['ktd'], // y
      },
      {
        letter: 'B',
        text: 'Lần theo một luồng dữ liệu qua nhiều thiết bị và môi trường, tìm nguyên nhân khiến thông tin bị chậm, méo hoặc mất.',
        majors: ['dtvt'], // z
      },
      {
        letter: 'C',
        text: 'Kiên trì thử những thay đổi rất nhỏ bên trong một sản phẩm, bởi chúng có thể quyết định tốc độ, kích thước, nhiệt lượng và tuổi thọ của toàn bộ thiết bị.',
        majors: ['tkvm'], // x
      },
      {
        letter: 'D',
        text: 'Theo sát một quy trình thay đổi liên tục, giúp nó tự nhận biết trạng thái và điều chỉnh phản ứng phù hợp.',
        majors: ['tdh'], // t
      },
    ],
  },
] as const;

export type RobotAttributeKey = MajorKey;

export type RobotScores = Record<RobotAttributeKey, number>;

export interface RobotAttributeSpec {
  key: RobotAttributeKey;
  label: string;
  zeroDesc: string;
  tenDesc: string;
  color: string;
  softBgClass: string;
  badgeTextClass: string;
  borderClass: string;
}

export const ROBOT_MAX_PER_ATTRIBUTE = 10;
export const ROBOT_MAX_TOTAL_POINTS = 15;

export const INITIAL_ROBOT_SCORES: RobotScores = {
  tkvm: 0,
  tdh: 0,
  dtvt: 0,
  ktd: 0,
};

export const ROBOT_ATTRIBUTES: readonly RobotAttributeSpec[] = [
  {
    key: 'tkvm',
    label: 'Trí tuệ và xử lí',
    zeroDesc: 'Vừa đủ để trò chuyện và hỗ trợ nhưng có độ trễ nhất định',
    tenDesc:
      'Robot trò chuyện xử lí thông tin nhanh như con người, có thể phân tích đánh giá phức tạp hơn',
    color: '#d97706', // Amber-600
    softBgClass: 'bg-amber-50/70',
    badgeTextClass: 'text-amber-700',
    borderClass: 'border-amber-200',
  },
  {
    key: 'tdh',
    label: 'Khả năng linh hoạt',
    zeroDesc:
      'Chỉ vừa đủ để robot xoay bộ phận, bước đi nhưng khựng và cứng nhắc, tốc độ chậm',
    tenDesc:
      'Robot có thăng bằng tốt, chạy nhảy hay các động tác vận động mượt mà như người thật',
    color: '#0284c7', // Sky-600
    softBgClass: 'bg-sky-50/70',
    badgeTextClass: 'text-sky-700',
    borderClass: 'border-sky-200',
  },
  {
    key: 'dtvt',
    label: 'Kết nối và phối hợp',
    zeroDesc:
      'Robot hoạt động gần như độc lập, chỉ thực hiện được các tính năng có sẵn',
    tenDesc:
      'Robot có thể liên kết qua mạng hoặc đường truyền nào đó với máy tính điện thoại, thiết bị thông minh khác để thao tác trên đó hay lấy sử dụng tính năng của thiết bị đó',
    color: '#6366f1', // Indigo-500
    softBgClass: 'bg-indigo-50/70',
    badgeTextClass: 'text-indigo-700',
    borderClass: 'border-indigo-200',
  },
  {
    key: 'ktd',
    label: 'Hệ thống năng lượng',
    zeroDesc:
      'Buộc robot phải sạc liên tục, thời gian hoạt động rất thấp, pin xuống cấp nhanh chóng',
    tenDesc:
      'Cho phép robot sử dụng năng lượng hiệu quả hơn, có thể tận dụng nguồn điện từ môi trường xung quanh, an toàn và gần như không lo nghĩ tới việc sạc',
    color: '#059669', // Emerald-600
    softBgClass: 'bg-emerald-50/70',
    badgeTextClass: 'text-emerald-700',
    borderClass: 'border-emerald-200',
  },
] as const;

export function getRobotTotalPoints(scores: RobotScores): number {
  return scores.tkvm + scores.tdh + scores.dtvt + scores.ktd;
}

export function isMajorDeterminationUnlocked(
  scores: RobotScores,
  answeredCount: number
): boolean {
  return answeredCount > 0 && getRobotTotalPoints(scores) === ROBOT_MAX_TOTAL_POINTS;
}

export function getMaxAllowedForRobotAttribute(
  scores: RobotScores,
  key: RobotAttributeKey
): number {
  const otherTotal = getRobotTotalPoints(scores) - scores[key];
  return Math.max(
    0,
    Math.min(ROBOT_MAX_PER_ATTRIBUTE, ROBOT_MAX_TOTAL_POINTS - otherTotal)
  );
}

export function clampRobotScore(
  scores: RobotScores,
  key: RobotAttributeKey,
  requestedValue: number
): RobotScores {
  const sanitized = Number.isFinite(requestedValue)
    ? Math.round(requestedValue)
    : 0;
  const maxAllowed = getMaxAllowedForRobotAttribute(scores, key);
  const clamped = Math.max(0, Math.min(maxAllowed, sanitized));
  return {
    ...scores,
    [key]: clamped,
  };
}

export interface MajorScoreResult {
  major: MajorInfo;
  rawScore: number;
  percentage: number;
}

export interface QuizCalculationResult {
  totalAnswered: number;
  robotTotalPoints: number;
  totalPoints: number;
  scores: Record<MajorKey, number>;
  percentages: Record<MajorKey, number>;
  ranked: readonly MajorScoreResult[];
  topMajor: MajorScoreResult;
  secondMajor: MajorScoreResult;
  scoreGap: number;
  interpretationType: 'dominant' | 'intersecting' | 'broad';
  interpretationText: string;
}

export function calculateQuizScores(
  answers: Record<number, OptionLetter>,
  robotScores: RobotScores = INITIAL_ROBOT_SCORES
): QuizCalculationResult {
  const quizScores: Record<MajorKey, number> = {
    tdh: 0,
    dtvt: 0,
    ktd: 0,
    tkvm: 0,
  };

  let totalAnswered = 0;

  for (const question of QUIZ_QUESTIONS) {
    const selectedLetter = answers[question.id];
    if (!selectedLetter) {
      continue;
    }
    const option = question.options.find((opt) => opt.letter === selectedLetter);
    if (!option) {
      continue;
    }
    totalAnswered += 1;
    for (const major of option.majors) {
      quizScores[major] += 1;
    }
  }

  const robotTotalPoints = getRobotTotalPoints(robotScores);

  // Mapped weights: 50% quiz, 50% robot sliders
  // Mapping: Trí tuệ xử lí (x -> tkvm), Khả năng linh hoạt (t -> tdh), Kết nối (z -> dtvt), Năng lượng (y -> ktd)
  const scores: Record<MajorKey, number> = {
    tdh: quizScores.tdh * 0.5 + robotScores.tdh * 0.5,
    dtvt: quizScores.dtvt * 0.5 + robotScores.dtvt * 0.5,
    ktd: quizScores.ktd * 0.5 + robotScores.ktd * 0.5,
    tkvm: quizScores.tkvm * 0.5 + robotScores.tkvm * 0.5,
  };

  const totalPoints =
    scores.tdh + scores.dtvt + scores.ktd + scores.tkvm;

  const percentages: Record<MajorKey, number> = {
    tdh: totalPoints > 0 ? Math.round((scores.tdh / totalPoints) * 100) : 25,
    dtvt: totalPoints > 0 ? Math.round((scores.dtvt / totalPoints) * 100) : 25,
    ktd: totalPoints > 0 ? Math.round((scores.ktd / totalPoints) * 100) : 25,
    tkvm: totalPoints > 0 ? Math.round((scores.tkvm / totalPoints) * 100) : 25,
  };

  // Adjust percentage rounding discrepancy if needed so sum is 100
  const currentSum =
    percentages.tdh + percentages.dtvt + percentages.ktd + percentages.tkvm;
  if (totalPoints > 0 && currentSum !== 100) {
    // distribute difference to top major
    const highestKey = (Object.keys(scores) as MajorKey[]).reduce((a, b) =>
      scores[a] >= scores[b] ? a : b
    );
    percentages[highestKey] += 100 - currentSum;
  }

  const keys: MajorKey[] = ['tdh', 'dtvt', 'ktd', 'tkvm'];
  const ranked: MajorScoreResult[] = keys
    .map((key) => ({
      major: MAJORS[key],
      rawScore: scores[key],
      percentage: percentages[key],
    }))
    .sort((a, b) => b.rawScore - a.rawScore || b.percentage - a.percentage);

  const topMajor = ranked[0];
  const secondMajor = ranked[1];
  const lowestMajor = ranked[3];

  const scoreGap = topMajor.rawScore - secondMajor.rawScore;
  const overallRange = topMajor.rawScore - lowestMajor.rawScore;

  let interpretationType: 'dominant' | 'intersecting' | 'broad' = 'intersecting';
  let interpretationText = '';

  if (totalPoints === 0) {
    interpretationType = 'broad';
    interpretationText =
      'Bạn chưa hoàn thành câu hỏi nào. Hãy trả lời các câu hỏi hoặc phân bổ điểm ở phần robot lý tưởng để hệ thống phân tích thiên hướng kỹ thuật cụ thể.';
  } else if (overallRange <= 2 && totalAnswered >= 10) {
    interpretationType = 'broad';
    interpretationText =
      'Bốn ngành có tỷ lệ tương đối cân bằng. Bạn có hứng thú kỹ thuật rộng, tư duy đa ngành và khả năng thích ứng linh hoạt với nhiều lĩnh vực công nghệ.';
  } else if (
    scoreGap >= 3 ||
    (topMajor.percentage - secondMajor.percentage >= 10 &&
      (totalAnswered >= 5 || robotTotalPoints >= 5))
  ) {
    interpretationType = 'dominant';
    interpretationText = `${topMajor.major.fullName} là định hướng nổi trội nhất của bạn, thể hiện rõ qua niềm đam mê và cách bạn lựa chọn giải quyết các bài toán kỹ thuật.`;
  } else {
    interpretationType = 'intersecting';
    interpretationText = `Thiên hướng của bạn có sự giao thoa mạnh mẽ giữa ${topMajor.major.fullName} và ${secondMajor.major.fullName}. Bạn có thể xem xét cả hai ngành hoặc các hướng chuyên ngành liên ngành.`;
  }

  return {
    totalAnswered,
    robotTotalPoints,
    totalPoints,
    scores,
    percentages,
    ranked,
    topMajor,
    secondMajor,
    scoreGap,
    interpretationType,
    interpretationText,
  };
}
