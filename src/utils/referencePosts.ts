export interface ReferenceComment {
  id: string;
  authorName: string;
  text: string;
}

export interface ReferencePost {
  id: string;
  category: string;
  title: string;
  sapo: string;
  imageLabel: string;
  imageSrc: string;
  imageAlt: string;
  readTime: string;
  sourceUrl?: string;
  initialLikes: number;
  initialComments: readonly ReferenceComment[];
  bodyParagraphs: readonly string[];
}

export interface ArticleEngagement {
  likedByEmails: string[];
  comments: ReferenceComment[];
}

export type EngagementMap = Record<string, ArticleEngagement>;

export const ENGAGEMENT_STORAGE_KEY = 'nkkt_reference_engagement_v2';

export const FEATURED_REFERENCE_POSTS: readonly ReferencePost[] = [
  {
    id: 'featured-1',
    category: 'Kinh Doanh & Công Nghệ',
    title: 'Câu chuyện của Dell và Asus',
    sapo: 'Từ một nhà sản xuất gia công bo mạch giá rẻ, Asus đã từng bước tiếp quản toàn bộ chuỗi giá trị của Dell và vươn lên thành thương hiệu máy tính độc lập — bài học kinh điển về cái giá của việc thuê ngoài năng lực cốt lõi.',
    imageLabel: 'Câu chuyện của Dell và Asus',
    imageSrc: '/assets/aistudio/181_TSDH_TQImage_1715675275938_b30b1bdc.jpg',
    imageAlt: 'Vi mạch điện tử và bo mạch phần cứng máy tính',
    readTime: '3 phút đọc',
    sourceUrl:
      'https://scashwin.medium.com/the-case-of-dell-and-asus-acac9a35db56',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Trong cuốn sách "How Will You Measure Your Life" (Bạn sẽ đo lường cuộc đời mình như thế nào?), Clayton Christensen đã lý giải cách công ty sản xuất máy tính Dell tự đào hố chôn mình khi từng bước thuê ngoài toàn bộ hoạt động vận hành cho nhà sản xuất gia công khi đó là Asus. Bằng việc chuyển giao các năng lực cốt lõi ra bên ngoài, Dell đã đánh mất tập khách hàng và thị phần vào tay Asus. Dưới góc nhìn của Dell, đây là ví dụ kinh điển nhắc nhở doanh nghiệp phải hết sức thận trọng với những gì mình đem đi thuê ngoài. Còn dưới góc nhìn của Asus, đó lại là minh chứng hoàn hảo cho thấy nghệ thuật đàm phán và sự bền bỉ theo đuổi mục tiêu có thể mang lại vận hội lớn lao đến nhường nào.',
      '---',
      'Dell bước chân vào cuộc chơi vào đầu thập niên 1990 với tư cách là một công ty công nghệ máy tính. Hãng khởi đầu bằng việc sản xuất những chiếc máy tính phổ thông đơn giản với mức giá phải chăng. Khách hàng có thể tự tùy chỉnh cấu hình máy tính theo nhu cầu và sở thích riêng. Sau đó, Dell tiến lên phân khúc cao cấp hơn, tạo ra hàng loạt dòng máy tính có hiệu năng ngày càng vượt trội. Dell từng rất tự hào khi có thể giao hàng đến tận tay khách hàng chỉ trong vòng 48 giờ kể từ lúc đặt mua.',
      'Asus — công ty có trụ sở tại Đài Loan — chính là đơn vị giúp Dell hiện thực hóa cam kết giao hàng trong vòng 48 giờ đó. Asus khởi đầu từ phân khúc thấp, cung cấp các bảng mạch đơn giản, đáng tin cậy cho Dell với chi phí thấp hơn mức mà Dell có thể tự sản xuất.',
      'Trong bối cảnh đó, Asus đã tìm đến Dell với một đề xuất đầy hấp dẫn: "Chúng tôi đã làm rất tốt việc sản xuất những mạch điện tử nhỏ này cho các bạn. Hãy để chúng tôi cung cấp luôn cả bo mạch chủ cho máy tính của các bạn. Sản xuất bo mạch chủ không phải là thế mạnh cốt lõi của các bạn — đó là thế mạnh của chúng tôi. Và chúng tôi có thể làm với chi phí thấp hơn 20 phần trăm." Các nhà phân tích của Dell nhận ra rằng Asus không chỉ làm rẻ hơn mà thỏa thuận này còn giúp Dell xóa bỏ toàn bộ tài sản sản xuất liên quan đến bo mạch chủ khỏi bảng cân đối kế toán của mình.',
      'Sau khi tái cơ cấu để đáp ứng mô hình hợp tác này, Asus tiếp tục quay lại gặp Dell và đề nghị: "Chúng tôi đã gia công rất tốt các bo mạch chủ này cho các bạn. Tại sao các bạn không để chúng tôi lắp ráp luôn cả chiếc máy tính hoàn chỉnh? Việc lắp ráp những sản phẩm đó đâu phải yếu tố làm nên thành công của các bạn. Chúng tôi có thể tiếp nhận toàn bộ phần tài sản sản xuất còn lại khỏi bảng cân đối kế toán của các bạn, và làm tất cả với chi phí thấp hơn 20 phần trăm."',
      'Các nhà phân tích của Dell một lần nữa thấy rằng đây lại là một thương vụ đôi bên cùng có lợi. Khi Asus đảm nhận thêm phần việc mới, chỉ số RONA (Lợi nhuận trên tài sản ròng — được tính bằng cách lấy lợi nhuận ròng chia cho tổng tài sản; chỉ số này tăng lên khi lợi nhuận ròng tăng hoặc tài sản/hàng tồn kho giảm) của Asus tăng vọt vì tử số là lợi nhuận ròng ngày càng phình to. Trong khi đó, việc trút bỏ quy trình sản xuất cũng giúp RONA của Dell tăng lên — doanh thu tuy không đổi, nhưng việc loại bỏ các tài sản đó khỏi bảng cân đối kế toán đã cải thiện mạnh mẽ mẫu số của tỷ lệ này. Quá trình ấy cứ thế tiếp diễn khi Dell thuê ngoài luôn cả khâu quản lý chuỗi cung ứng, rồi đến cả khâu thiết kế máy tính. Về bản chất, Dell đã thuê ngoài mọi thứ trong mảng kinh doanh máy tính cá nhân của mình — tất cả mọi thứ ngoại trừ thương hiệu — cho Asus.',
      'Rồi đến năm 2005, Asus tuyên bố ra mắt thương hiệu máy tính của riêng mình. Trong câu chuyện mang màu sắc bi kịch Hy Lạp này, Asus đã tiếp thu toàn bộ những gì học được từ Dell và áp dụng cho chính mình. Hãng bắt đầu từ những mắt xích đơn giản nhất trong chuỗi giá trị, rồi qua từng quyết định một, mỗi lần Dell thuê ngoài công đoạn tạo giá trị gia tăng thấp nhất trong số các hoạt động còn lại của mình, Asus lại tích lũy thêm một công đoạn có giá trị gia tăng cao hơn vào doanh nghiệp của họ.',
    ],
  },
  {
    id: 'featured-2',
    category: 'Lịch Sử Công Nghệ',
    title: 'Cuộc tranh luận lịch sử về GUI: Steve Jobs, Bill Gates và phát minh "mượn" từ Xerox',
    sapo: 'Cuối thập niên 1970, một cuộc cách mạng công nghệ đã âm thầm diễn ra tại Trung tâm Nghiên cứu Palo Alto (PARC) của Xerox — mở ra màn cạnh tranh, vay mượn ý tưởng và những bài học kinh điển giữa Apple và Microsoft.',
    imageLabel: 'Cuộc tranh luận lịch sử về GUI',
    imageSrc: '/assets/aistudio/65_TSDH_Image_1691466014493_fa7a55dc.jpg',
    imageAlt: 'Mạch điện tử và phần cứng máy tính',
    readTime: '5 phút đọc',
    sourceUrl:
      'https://medium.com/@davidsehyeonbaek/the-great-gui-debate-steve-jobs-bill-gates-and-the-borrowed-innovation-from-xerox-6402e7b654c8',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Vào cuối những năm 1970, một cuộc cách mạng công nghệ đang âm thầm diễn ra tại Trung tâm Nghiên cứu Palo Alto (PARC) của Xerox. Phát minh mang tính đột phá được tạo ra tại đây chính là giao diện đồ họa người dùng (GUI) — hệ thống cho phép người dùng tương tác với máy tính thông qua các yếu tố trực quan như biểu tượng và cửa sổ thay vì các câu lệnh văn bản. Đó là một ý tưởng giàu tầm nhìn, đi trước các giao diện dòng lệnh thời bấy giờ hàng năm ánh sáng, và sau cùng đã định hình lại toàn bộ ngành công nghiệp máy tính.',
      'Thế nhưng những gì diễn ra sau đó lại là một câu chuyện dài về sự tiếp thu ý tưởng, cuộc cạnh tranh khốc liệt và một trong những câu đối đáp nổi tiếng nhất lịch sử công nghệ — đến từ Bill Gates. Khi bị Steve Jobs cáo buộc "đánh cắp" khái niệm giao diện đồ họa từ chiếc Macintosh của Apple để đưa lên Windows, Gates đã đáp trả bằng câu nói trở thành huyền thoại:',
      '> "Này Steve, tôi nghĩ câu chuyện giống như việc cả hai chúng ta đều có một ông hàng xóm giàu có tên là Xerox, và khi tôi lẻn vào nhà ông ấy để lấy trộm chiếc TV thì phát hiện ra anh đã cuỗm nó đi từ trước rồi."',
      'Câu trả lời vừa hài hước vừa thấm thía ấy đã lột tả trọn vẹn bản chất của sự việc. Cả Apple lẫn Microsoft đều lấy cảm hứng từ thành quả của Xerox, rồi tiếp tục thương mại hóa các hệ điều hành dùng giao diện đồ họa theo những con đường riêng.',
      '---',
      'Mọi chuyện khởi nguồn tại Xerox PARC, nơi những kỹ sư xuất sắc đang mở rộng giới hạn của điện toán. Họ phát triển một phương thức hoàn toàn mới để tương tác với máy tính: giao diện đồ họa cho phép người dùng trỏ, nhấp và kéo thả các đối tượng ngay trên màn hình. Điều này mang tính cách mạng bởi trước đó, việc sử dụng máy tính đòi hỏi phải gõ từng dòng lệnh trong môi trường thuần văn bản. Giao diện GUI trực quan, dễ tiếp cận và mở ra viễn cảnh đưa máy tính đến với số đông công chúng.',
      'Năm 1979, đồng sáng lập Apple là Steve Jobs cùng đội ngũ của mình đến thăm Xerox PARC và được giới thiệu công nghệ mới này. Jobs lập tức nhận ra tiềm năng to lớn của nó, và Apple nhanh chóng bắt tay vào việc đưa GUI lên các thế hệ máy tính sắp ra mắt. Quyết định đó kết tinh trong sự kiện ra mắt chiếc Macintosh vào năm 1984 — chiếc máy tính phổ thông đầu tiên sở hữu giao diện đồ họa. Đây là bước nhảy vọt khổng lồ, đặt nền móng cho kỷ nguyên máy tính cá nhân như chúng ta biết ngày nay.',
      'Cùng khoảng thời gian đó, dưới sự dẫn dắt của Bill Gates, Microsoft cũng đang phát triển hệ điều hành riêng mang tên Windows. Giống như Apple, Microsoft tích hợp giao diện đồ họa dựa trên những ý tưởng tiên phong từ Xerox PARC. Khi Apple cáo buộc Microsoft sao chép thiết kế của mình, hai bên đã bước vào hàng loạt vụ kiện tụng và đấu tố công khai. Steve Jobs vô cùng giận dữ, khẳng định Gates đã đánh cắp tài sản trí tuệ của Apple. Tuy nhiên, câu đáp trả dí dỏm của Gates đã chỉ ra rằng chính Apple cũng từng "mượn" ý tưởng đó từ Xerox.',
      'Lập luận tự bảo vệ của Gates không chỉ khéo léo mà còn bám sát thực tế. Bất chấp công trình tiên phong của mình, Xerox đã thất bại trong việc thương mại hóa hiệu quả giao diện GUI. Ngược lại, Apple và Microsoft nhìn ra tiềm năng của công nghệ này và biến nó thành sản phẩm có thể chinh phục thị trường. Cả hai công ty đều lấy cảm hứng từ Xerox, nhưng mỗi bên lại hiện thực hóa GUI theo một bản sắc riêng — Apple với giao diện trau chuốt, thân thiện với người dùng, còn Microsoft với giải pháp linh hoạt, chi phí dễ tiếp cận cho tệp khách hàng rộng lớn hơn.',
      'Sự trớ trêu trong mối quan hệ tay ba Xerox – Apple – Microsoft làm nổi bật một quy luật quan trọng trong tiến trình phát triển công nghệ: đổi mới thường được xây dựng trên nền tảng của những gì đi trước. Trong khi Xerox PARC đặt viên gạch nền móng, chính Apple và Microsoft đã chuyển hóa GUI từ một thử nghiệm trong phòng nghiên cứu thành thành phần cốt lõi của điện toán hiện đại. Và dẫu Jobs cùng Gates từng tranh cãi gay gắt xem ai sao chép ai, đóng góp của cả hai công ty đều góp phần thúc đẩy toàn ngành tiến về phía trước.',
      'Cuộc đối đầu giữa Apple và Microsoft tuy căng thẳng nhưng lại mang đến lợi ích cho cả hai phía. Họ thúc ép nhau phải không ngừng sáng tạo, cải tiến và tái định hình khái niệm máy tính cá nhân. Dù khởi nguồn từ cùng một nguồn cảm hứng, con đường của hai hãng dần rẽ sang hai hướng khác nhau, tạo nên hai hệ sinh thái tách biệt vẫn tiếp tục thống lĩnh bức tranh công nghệ toàn cầu cho đến hôm nay.',
      '---',
      'Điều thú vị là câu chuyện giữa Apple và Microsoft không chỉ toàn cạnh tranh. Năm 1997, Apple rơi vào bên bờ vực phá sản. Steve Jobs khi đó vừa quay trở lại công ty sau nhiều năm bị gạt ra ngoài, còn Apple thì chật vật tìm lại chỗ đứng. Trong một bước ngoặt đầy bất ngờ, Bill Gates và Microsoft đã bước ra đầu tư 150 triệu USD vào Apple, qua đó giúp công ty thoát khỏi nguy cơ sụp đổ.',
      'Động thái này không đơn thuần xuất phát từ lòng hào hiệp. Thời điểm đó, Microsoft đang đối mặt với cuộc điều tra chống độc quyền gắt gao, khi các cơ quan quản lý cáo buộc hãng có hành vi độc quyền trên thị trường phần mềm. Bằng việc rót vốn vào Apple, Microsoft góp phần đảm bảo sự tồn tại của yếu tố cạnh tranh trên thị trường máy tính cá nhân, qua đó giảm bớt phần nào áp lực từ phía cơ quan quản lý.',
      'Bên cạnh đó, khoản đầu tư còn nằm trong một thỏa thuận dàn xếp toàn diện giữa hai doanh nghiệp nhằm khép lại hàng loạt tranh chấp bằng sáng chế và chấm dứt cuộc chiến pháp lý xoay quanh sự tương đồng giữa giao diện Windows và Mac. Bước đi này đã trao cho Apple chiếc phao cứu sinh quý giá, giúp hãng có nguồn lực tái thiết với những sản phẩm mang tính biểu tượng như iMac, iPod và sau này là iPhone — tạo nên một trong những màn lội ngược dòng vĩ đại nhất lịch sử doanh nghiệp.',
      '---',
      'Câu chuyện giữa Steve Jobs, Bill Gates và Xerox PARC mang lại những bài học sâu sắc về đổi mới sáng tạo, cạnh tranh và hợp tác. Đổi mới thường đến theo từng làn sóng, và ngay cả những ý tưởng mang tính đột phá nhất vẫn có thể được người khác cải tiến, tái kiến tạo và thương mại hóa thành công. Xerox có thể đã không tận dụng được giao diện GUI để thu lợi, nhưng thành quả của họ đã truyền cảm hứng khai sinh cả ngành công nghiệp máy tính cá nhân.',
      'Hơn thế nữa, mối quan hệ giữa Apple và Microsoft cho thấy cạnh tranh và hợp tác không hề loại trừ lẫn nhau. Dù Jobs và Gates là những đối thủ truyền kiếp, cả hai đều hiểu tầm quan trọng của việc để đối phương tiếp tục tồn tại trên thị trường — bởi chính sự cạnh tranh giữa họ rốt cuộc đã châm ngòi cho nhiều đổi mới và tăng trưởng hơn nữa.',
      'Ngày nay, cả hai tập đoàn vẫn tiếp tục định hình tương lai công nghệ, từ lâu đã vượt xa khỏi cuộc tranh cãi về GUI. Tuy vậy, câu chuyện về sự kình địch thuở ban đầu giữa họ vẫn mãi là một chương đầy lôi cuốn trong lịch sử công nghệ — nhắc nhở rằng những ý tưởng vĩ đại không bao giờ ra đời trong khoảng không cô lập, mà được nuôi dưỡng, chia sẻ, kế thừa và hoàn thiện qua cả cạnh tranh lẫn hợp tác.',
      'Cuộc trao đổi nổi tiếng giữa Steve Jobs và Bill Gates xoay quanh giao diện GUI của Xerox là lời nhắc nhở rằng mọi đổi mới đều mang tính kế thừa và lặp lại. Những bước đột phá vĩ đại thường khởi phát từ việc chắt lọc và phát triển tiếp trên ý tưởng của người đi trước. Cả Apple lẫn Microsoft đều góp phần đưa giao diện đồ họa ra toàn thế giới, qua đó mở đường cho kỷ nguyên số. Di sản từ cuộc cạnh tranh lẫn hợp tác giữa họ vẫn còn hiện hữu đến hôm nay, khi ngành công nghệ không ngừng tiến hóa dựa trên những bài học rút ra từ chương sử mang tính biểu tượng này của điện toán.',
    ],
  },
] as const;

export const OTHER_REFERENCE_POSTS: readonly ReferencePost[] = [
  {
    id: 'other-1',
    category: 'Điện Tử',
    title: 'Tiêu đề bài báo khác 01 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài báo khác số 01 về thiết kế mạch điện tử và hệ thống nhúng.',
    imageLabel: 'Ảnh bài phụ 01',
    imageSrc: '/assets/aistudio/65_TSDH_Image_1691466014493_fa7a55dc.jpg',
    imageAlt: 'Bo mạch điện tử linh kiện dán bề mặt',
    readTime: '3 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài báo khác 01. Chỗ này dùng để đăng các bài đọc thêm hoặc tin tức liên quan.',
      'Đoạn nội dung tiếp theo có thể thay thế hoàn toàn bằng bài viết thực tế của nhóm.',
    ],
  },
  {
    id: 'other-2',
    category: 'Vi Mạch',
    title: 'Tiêu đề bài báo khác 02 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài báo khác số 02 về quy trình thiết kế chip bán dẫn.',
    imageLabel: 'Ảnh bài phụ 02',
    imageSrc: '/assets/aistudio/181_TSDH_TQImage_1715675275938_b30b1bdc.jpg',
    imageAlt: 'Vi mạch bán dẫn tích hợp trên bo mạch',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài báo khác 02 về lĩnh vực thiết kế vi mạch.',
      'Cung cấp góc nhìn tổng quan và nguồn tài liệu tham khảo cho người mới bắt đầu.',
    ],
  },
  {
    id: 'other-3',
    category: 'Công Nghệ',
    title: 'Tiêu đề bài báo khác 03 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài báo khác số 03 về ứng dụng AI và IoT trong công nghiệp.',
    imageLabel: 'Ảnh bài phụ 03',
    imageSrc: '/assets/aistudio/64_TSDH_TQImage_1691462323202_cb32d264.jpg',
    imageAlt: 'Robot tự động hóa công nghiệp',
    readTime: '4 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài báo khác 03.',
      'Bạn có thể chỉnh sửa nội dung này theo chủ đề tự động hóa hoặc trí tuệ nhân tạo.',
    ],
  },
  {
    id: 'other-4',
    category: 'Năng Lượng',
    title: 'Tiêu đề bài báo khác 04 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài báo khác số 04 về lưu trữ năng lượng và lưới điện xanh.',
    imageLabel: 'Ảnh bài phụ 04',
    imageSrc: '/assets/aistudio/63_TSDH_TQImage_1691461428936_a5a8ebc8.jpg',
    imageAlt: 'Hệ thống truyền tải điện cao áp',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài báo khác 04.',
      'Cập nhật các phân tích về năng lượng tái tạo và tối ưu hóa vận hành lưới điện.',
    ],
  },
  {
    id: 'other-5',
    category: 'Hướng Nghiệp',
    title: 'Tiêu đề bài báo khác 05 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài báo khác số 05 về kỹ năng cần thiết cho kỹ sư Điện - Điện tử.',
    imageLabel: 'Ảnh bài phụ 05',
    imageSrc: '/assets/aistudio/65_TSDH_Image_1691466014493_fa7a55dc.jpg',
    imageAlt: 'Mạch điện tử và linh kiện phần cứng',
    readTime: '4 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài báo khác 05.',
      'Tổng hợp các kỹ năng chuyên môn và kỹ năng mềm dành cho sinh viên khối ngành kỹ thuật.',
    ],
  },
] as const;

export const ALL_REFERENCE_POSTS: readonly ReferencePost[] = [
  ...FEATURED_REFERENCE_POSTS,
  ...OTHER_REFERENCE_POSTS,
];

export function stepReferenceIndex(
  currentIndex: number,
  direction: -1 | 1,
  total: number = FEATURED_REFERENCE_POSTS.length
): number {
  if (total <= 0) {
    return 0;
  }
  const normalized = ((currentIndex % total) + total) % total;
  return (normalized + direction + total) % total;
}

export function findReferencePostById(
  id: string | null | undefined,
  posts: readonly ReferencePost[] = ALL_REFERENCE_POSTS
): ReferencePost | null {
  if (!id) {
    return null;
  }
  return posts.find((post) => post.id === id) ?? null;
}

export function getReferencePostById(
  id: string,
  posts: readonly ReferencePost[] = ALL_REFERENCE_POSTS
): ReferencePost {
  return posts.find((post) => post.id === id) ?? posts[0];
}

export function getEngagementForPost(
  map: EngagementMap,
  post: ReferencePost,
  currentUserEmail?: string
): {
  likeCount: number;
  isLiked: boolean;
  comments: ReferenceComment[];
  commentCount: number;
} {
  const entry = map[post.id];
  const likedByEmails = entry?.likedByEmails ?? [];
  const addedComments = entry?.comments ?? [];
  const allComments = [...post.initialComments, ...addedComments];
  const normalizedEmail = currentUserEmail?.trim().toLowerCase();

  return {
    likeCount: post.initialLikes + likedByEmails.length,
    isLiked: normalizedEmail ? likedByEmails.includes(normalizedEmail) : false,
    comments: allComments,
    commentCount: allComments.length,
  };
}

export function toggleArticleLike(
  map: EngagementMap,
  postId: string,
  userEmail: string
): EngagementMap {
  const normalizedEmail = userEmail.trim().toLowerCase();
  if (!normalizedEmail) {
    return map;
  }
  const prev = map[postId] ?? { likedByEmails: [], comments: [] };
  const alreadyLiked = prev.likedByEmails.includes(normalizedEmail);
  const nextLikes = alreadyLiked
    ? prev.likedByEmails.filter((email) => email !== normalizedEmail)
    : [...prev.likedByEmails, normalizedEmail];

  return {
    ...map,
    [postId]: {
      likedByEmails: nextLikes,
      comments: prev.comments,
    },
  };
}

export function addArticleComment(
  map: EngagementMap,
  postId: string,
  authorName: string,
  rawText: string
): { nextMap: EngagementMap; added: boolean } {
  const text = rawText.trim();
  const cleanAuthor = authorName.trim();
  if (!text || !cleanAuthor) {
    return { nextMap: map, added: false };
  }

  const prev = map[postId] ?? { likedByEmails: [], comments: [] };
  const newComment: ReferenceComment = {
    id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    authorName: cleanAuthor,
    text,
  };

  return {
    added: true,
    nextMap: {
      ...map,
      [postId]: {
        likedByEmails: prev.likedByEmails,
        comments: [...prev.comments, newComment],
      },
    },
  };
}

export function loadEngagementMap(
  storage: Pick<Storage, 'getItem'> | null | undefined
): EngagementMap {
  if (!storage) {
    return {};
  }
  try {
    const raw = storage.getItem(ENGAGEMENT_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as Record<string, Partial<ArticleEngagement>>;
    const sanitized: EngagementMap = {};
    for (const [postId, entry] of Object.entries(parsed)) {
      if (!entry || typeof entry !== 'object') {
        continue;
      }
      sanitized[postId] = {
        likedByEmails: Array.isArray(entry.likedByEmails)
          ? entry.likedByEmails.filter((e): e is string => typeof e === 'string')
          : [],
        comments: Array.isArray(entry.comments)
          ? entry.comments.filter(
              (c): c is ReferenceComment =>
                Boolean(
                  c &&
                    typeof c === 'object' &&
                    typeof c.id === 'string' &&
                    typeof c.authorName === 'string' &&
                    typeof c.text === 'string'
                )
            )
          : [],
      };
    }
    return sanitized;
  } catch {
    return {};
  }
}

export function saveEngagementMap(
  storage: Pick<Storage, 'setItem'> | null | undefined,
  map: EngagementMap
): void {
  if (!storage) {
    return;
  }
  storage.setItem(ENGAGEMENT_STORAGE_KEY, JSON.stringify(map));
}
