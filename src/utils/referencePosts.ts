export interface ReferenceComment {
  id: string;
  authorName: string;
  text: string;
}

export interface ArticleFigureBlock {
  type: 'figure';
  src: string;
  alt: string;
  caption: string;
}

export interface ArticleCarouselSlide {
  src: string;
  alt: string;
  caption: string;
}

export interface ArticleCarouselBlock {
  type: 'carousel';
  slides: readonly ArticleCarouselSlide[];
}

export type ArticleContentBlock =
  | string
  | ArticleFigureBlock
  | ArticleCarouselBlock;

export interface ReferencePost {
  id: string;
  category: string;
  detailCategory?: string;
  title: string;
  sapo: string;
  imageLabel: string;
  imageSrc: string;
  imageAlt: string;
  readTime: string;
  sourceUrl?: string;
  initialLikes: number;
  initialComments: readonly ReferenceComment[];
  bodyParagraphs: readonly ArticleContentBlock[];
}

export interface ArticleEngagement {
  likedByEmails: string[];
  comments: ReferenceComment[];
}

export type EngagementMap = Record<string, ArticleEngagement>;

export const ENGAGEMENT_STORAGE_KEY = 'nkkt_reference_engagement_v2';

const DELL_ASUS_POST: ReferencePost = {
  id: 'featured-1',
  category: 'Chương 3',
  detailCategory: 'Chương 3',
  title: 'Câu chuyện của Dell và Asus, thiết kế và gia công',
  sapo: 'Từ một nhà sản xuất gia công bo mạch giá rẻ, Asus đã từng bước tiếp quản toàn bộ chuỗi giá trị của Dell và vươn lên thành thương hiệu máy tính độc lập — bài học kinh điển về cái giá của việc thuê ngoài năng lực cốt lõi.',
  imageLabel: 'Câu chuyện của Dell và Asus, thiết kế và gia công',
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
};

const GUI_DEBATE_POST: ReferencePost = {
  id: 'featured-2',
  category: 'Chương 1',
  detailCategory: 'Chương 1: Giới thiệu nhập môn kỹ thuật',
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
};

export const FEATURED_REFERENCE_POSTS: readonly ReferencePost[] = [
  DELL_ASUS_POST,
  GUI_DEBATE_POST,
] as const;

export const OTHER_REFERENCE_POSTS: readonly ReferencePost[] = [
  {
    id: 'other-1',
    category: 'Chương 1',
    detailCategory: 'Chương 1: Giới thiệu nhập môn kỹ thuật',
    title: 'Từ những công cụ bằng đá đến những kỳ quan vĩ đại',
    sapo: 'Hành trình 6.000 năm của kỹ thuật: Khi nhu cầu sinh tồn của con người đặt nền móng cho nền văn minh.',
    imageLabel: 'Từ những công cụ bằng đá đến những kỳ quan vĩ đại',
    imageSrc: '/assets/aistudio/image_85ba0ad7.png',
    imageAlt: 'Cầu vòm đá cổ đại La Mã trên thảo nguyên',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      '> Trước khi có máy tính, robot hay những nhà máy tự động, con người đã biết chế tạo công cụ, xây dựng công trình và tìm cách chinh phục thiên nhiên. Lịch sử kỹ thuật không bắt đầu trong phòng thí nghiệm hiện đại, mà bắt đầu từ những nhu cầu rất căn bản: làm thế nào để sống tốt hơn, xây dựng nơi trú ẩn vững chắc hơn và biến những nguồn lực tự nhiên thành lợi ích cho con người.',
      '---',
      'Hãy thử hình dung một thế giới không có điện, không có động cơ, không có máy móc và cũng không có những công trình kiến trúc hiện đại. Trong thế giới ấy, con người phải tự tìm cách chế tạo công cụ, khai thác vật liệu từ tự nhiên và xây dựng những phương tiện phục vụ cuộc sống. Đó chính là bối cảnh mà kỹ thuật bắt đầu hình thành.',
      'Theo định nghĩa được trình bày trong giáo trình Nhập môn về kỹ thuật, kỹ thuật là một nghề nghiệp trong đó những tri thức thu nhận được thông qua học tập, trải nghiệm và thực hành khoa học tự nhiên cùng toán học được ứng dụng để phát triển các phương pháp sử dụng hiệu quả nguyên vật liệu và nguồn lực tự nhiên, nhằm mang lại lợi ích cho con người.',
      'Định nghĩa này cho thấy kỹ thuật không đơn thuần là việc chế tạo máy móc hay xây dựng công trình. Bản chất của kỹ thuật nằm ở việc vận dụng tri thức để giải quyết những vấn đề thực tế. Từ một công cụ bằng đá cho đến một hệ thống dẫn nước khổng lồ, mỗi thành tựu đều phản ánh một bước tiến trong khả năng quan sát, tư duy và sáng tạo của con người. Trong suốt hàng nghìn năm, những nhu cầu tưởng chừng đơn giản ấy đã trở thành động lực thúc đẩy sự phát triển của các nền văn minh.',
      'Ở thời kỳ đầu, kỹ thuật gắn liền với việc chế tạo những vật dụng phục vụ đời sống. Con người tìm kiếm và sử dụng các vật liệu có sẵn trong tự nhiên để tạo ra công cụ phù hợp với nhu cầu của mình. Đá, gỗ và những vật liệu tự nhiên khác trở thành nền tảng cho những sản phẩm đầu tiên. Việc lựa chọn vật liệu, tạo hình và cải tiến công cụ cho thấy con người đã bắt đầu biết khai thác những đặc tính của tự nhiên để phục vụ cuộc sống.',
      'Những công cụ sơ khai ấy có thể không phức tạp nếu so với sản phẩm công nghiệp ngày nay, nhưng chúng mang một ý nghĩa đặc biệt: con người không còn chỉ phụ thuộc hoàn toàn vào môi trường mà đã bắt đầu chủ động cải biến môi trường sống. Đây cũng chính là một trong những đặc trưng quan trọng nhất của kỹ thuật — biến những hiểu biết về thế giới tự nhiên thành những giải pháp có ích.',
      'Khi xã hội phát triển, nhu cầu của con người không còn dừng lại ở những vật dụng cá nhân. Các cộng đồng bắt đầu cần những công trình lớn hơn, bền vững hơn và có khả năng phục vụ nhiều người hơn. Từ đó, kỹ thuật bước sang một giai đoạn mới: kỹ thuật xây dựng và tổ chức những công trình quy mô lớn.',
      '---',
      'Một trong những minh chứng nổi bật nhất cho trình độ kỹ thuật của các nền văn minh cổ đại là những kim tự tháp ở Ai Cập.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_daf1973f.png',
        alt: 'Đại kim tự tháp Giza, Ai Cập',
        caption:
          'Những kim tự tháp Ai Cập là minh chứng nổi bật cho khả năng tổ chức xây dựng và sử dụng vật liệu của các nền văn minh cổ đại.',
      },
      'Những công trình đồ sộ này cho thấy con người thời cổ đại đã có khả năng tổ chức lao động, khai thác vật liệu và thực hiện những dự án xây dựng với quy mô đáng kinh ngạc.',
      'Không chỉ ở Ai Cập, nền văn minh Lưỡng Hà cũng để lại dấu ấn thông qua những công trình kiến trúc đặc trưng. Đặc biệt, vườn treo Babylon thường được nhắc đến như một biểu tượng của sự sáng tạo trong xây dựng và tổ chức không gian sống.',
      'Tại châu Âu, công trình Stonehenge ở Anh lại mang một dấu ấn khác. Những khối đá khổng lồ được bố trí thành một cấu trúc đặc biệt, thể hiện khả năng vận chuyển, sắp đặt và tổ chức xây dựng của con người thời tiền sử.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_fb1bbbb3.png',
        alt: 'Quần thể đá Stonehenge, Anh',
        caption:
          'Stonehenge cho thấy khả năng tổ chức những công trình bằng đá có quy mô lớn từ thời tiền sử.',
      },
      'Điều đáng chú ý là những công trình này không đơn thuần là những sản phẩm kiến trúc. Chúng còn phản ánh trình độ tổ chức xã hội, khả năng huy động nguồn lực và những hiểu biết kỹ thuật được tích lũy qua nhiều thế hệ. Mỗi công trình là một minh chứng cho việc con người đã từng bước vượt qua những giới hạn về vật liệu, phương tiện và năng lực xây dựng của thời đại mình.',
      '---',
      'Nếu những kim tự tháp và công trình thời tiền sử cho thấy khả năng xây dựng của con người cổ đại, thì Hy Lạp và La Mã tiếp tục mở rộng những ứng dụng của kỹ thuật trong đời sống xã hội. Tại Hy Lạp, những ngôi đền với kiến trúc đặc trưng thể hiện sự phát triển của nghệ thuật xây dựng. Các công trình không chỉ đáp ứng nhu cầu sinh hoạt và tín ngưỡng mà còn thể hiện trình độ tổ chức không gian, lựa chọn vật liệu và tạo dựng kết cấu.',
      'Trong khi đó, La Mã để lại dấu ấn đặc biệt với hệ thống đường sá và các công trình dẫn nước.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_42dd0ea0.png',
        alt: 'Cầu dẫn nước La Mã cổ đại',
        caption:
          'Hệ thống cầu dẫn nước La Mã thể hiện khả năng ứng dụng kỹ thuật xây dựng vào việc giải quyết nhu cầu thiết yếu của cộng đồng.',
      },
      'Đây là một bước tiến quan trọng trong lịch sử kỹ thuật. Thay vì chỉ tập trung vào những công trình riêng lẻ, con người đã bắt đầu xây dựng những hệ thống hạ tầng phục vụ hoạt động của cả một xã hội. Đường sá giúp kết nối các khu vực, hỗ trợ giao thương và di chuyển. Hệ thống dẫn nước góp phần đáp ứng nhu cầu sinh hoạt của cư dân. Những thành tựu này cho thấy kỹ thuật ngày càng gắn bó chặt chẽ với sự phát triển của cộng đồng: một công trình tốt không chỉ cần được xây dựng vững chắc mà còn phải giải quyết được một nhu cầu cụ thể của con người.',
      'Ở phương Đông, Vạn Lý Trường Thành của Trung Quốc cũng là một ví dụ nổi bật về năng lực xây dựng quy mô lớn.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_d790c555.png',
        alt: 'Vạn Lý Trường Thành, Trung Quốc',
        caption:
          'Vạn Lý Trường Thành là một trong những công trình xây dựng có quy mô lớn và kéo dài qua nhiều giai đoạn lịch sử.',
      },
      'Từ Ai Cập, Lưỡng Hà, Hy Lạp, La Mã đến Trung Quốc, các nền văn minh đã phát triển những giải pháp kỹ thuật khác nhau để đáp ứng nhu cầu của xã hội mình. Dù khác biệt về địa lý, vật liệu và mục đích xây dựng, những công trình ấy đều có chung một đặc điểm: chúng được tạo ra từ nỗ lực biến tri thức và nguồn lực tự nhiên thành những giá trị hữu ích cho con người.',
      '---',
      'Nhìn lại những thành tựu của các nền văn minh cổ đại, có thể nhận thấy kỹ thuật chưa bao giờ là một lĩnh vực đứng yên. Mỗi thế hệ kế thừa những hiểu biết của thế hệ trước, sau đó tiếp tục cải tiến phương pháp, vật liệu và công cụ. Những gì từng được xem là khó khăn trong một thời đại có thể trở thành nền tảng cho những bước tiến tiếp theo. Từ việc chế tạo một vật dụng bằng đá, xây dựng một công trình bằng những khối vật liệu khổng lồ, cho đến việc hình thành những hệ thống hạ tầng phục vụ hàng nghìn người, con người liên tục mở rộng khả năng kiểm soát và khai thác môi trường tự nhiên.',
      'Đó cũng là lý do lịch sử kỹ thuật không thể được nhìn nhận đơn thuần như lịch sử của các phát minh. Đó còn là lịch sử của những vấn đề con người từng đối mặt và cách họ tìm ra lời giải. Một cây cầu không chỉ là kết cấu bắc qua sông. Một hệ thống dẫn nước không chỉ là những đường ống hay kênh đào. Một công cụ không chỉ là vật dụng phục vụ lao động. Đằng sau mỗi sản phẩm là một quá trình suy nghĩ, lựa chọn và giải quyết vấn đề.',
      'Ngày nay, khi nhắc đến kỹ thuật, nhiều người thường nghĩ ngay đến máy tính, điện thoại thông minh, robot, trí tuệ nhân tạo hay những nhà máy tự động hóa. Tuy nhiên, nếu nhìn lại lịch sử, có thể thấy những công nghệ hiện đại thực chất là kết quả của một quá trình phát triển kéo dài hàng nghìn năm. Những công trình cổ đại đã đặt nền móng cho tư duy xây dựng, những công cụ sơ khai thể hiện khả năng cải tiến vật liệu, còn các hệ thống hạ tầng cho thấy tầm quan trọng của việc thiết kế giải pháp phục vụ cộng đồng.',
      'Đối với một sinh viên kỹ thuật, việc tìm hiểu lịch sử không chỉ nhằm ghi nhớ tên công trình hay những dấu mốc của quá khứ. Quan trọng hơn, đó là cách để hiểu bản chất của nghề nghiệp mình đang theo đuổi. Một kỹ sư không chỉ cần biết sử dụng công nghệ hiện có. Họ cần hiểu vấn đề, vận dụng kiến thức khoa học và toán học, lựa chọn nguồn lực phù hợp, sau đó phát triển những giải pháp có khả năng ứng dụng trong thực tế. Đó chính là tinh thần đã xuất hiện từ những ngày đầu của lịch sử kỹ thuật và vẫn tiếp tục tồn tại trong mọi lĩnh vực kỹ thuật hiện đại.',
      '---',
      '> Lịch sử kỹ thuật được viết nên không chỉ bởi những công trình vĩ đại, mà còn bởi hàng nghìn năm con người không ngừng tìm cách làm cho cuộc sống tốt đẹp hơn. Và hành trình ấy vẫn chưa kết thúc.',
    ],
  },
  {
    id: 'other-inventions',
    category: 'Chương 1',
    detailCategory: 'Chương 1: Giới thiệu nhập môn kỹ thuật',
    title: 'Những phát minh đã thay đổi thế giới',
    sapo: 'Từ động cơ hơi nước đến chuyến du hành lên Mặt Trăng: Hành trình con người chinh phục những giới hạn của công nghệ.',
    imageLabel: 'Những phát minh đã thay đổi thế giới',
    imageSrc: '/assets/aistudio/image_8005c5d4.png',
    imageAlt: 'Phi hành gia trong chương trình Apollo 11 bên cạnh mô-đun đổ bộ Mặt Trăng',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      '> Trong hàng nghìn năm, con người đã không ngừng tìm cách biến những ý tưởng thành công cụ, máy móc và hệ thống phục vụ cuộc sống. Nhưng có những phát minh không chỉ giải quyết một vấn đề trước mắt, mà còn làm thay đổi toàn bộ cách nhân loại sản xuất, giao tiếp và nhìn nhận thế giới.',
      '---',
      'Lịch sử kỹ thuật không phải là một chuỗi những phát minh xuất hiện ngẫu nhiên. Đó là quá trình tích lũy tri thức, cải tiến công nghệ và giải quyết những nhu cầu ngày càng phức tạp của xã hội. Nếu những nền văn minh cổ đại đặt nền móng cho kỹ thuật xây dựng và chế tạo, thì những thế kỷ tiếp theo chứng kiến sự phát triển mạnh mẽ của toán học, vật liệu, cơ khí và các phương tiện truyền thông. Một trong những bước ngoặt quan trọng nhất xuất hiện vào thế kỷ XVIII, khi Cách mạng Công nghiệp bắt đầu ở châu Âu.',
      'Trước Cách mạng Công nghiệp, phần lớn hoạt động sản xuất phụ thuộc vào sức người, sức động vật và các nguồn năng lượng tự nhiên. Sự phát triển của động cơ hơi nước đã mở ra một hướng đi mới. James Watt là một trong những nhân vật tiêu biểu gắn liền với bước tiến này. Động cơ hơi nước góp phần thúc đẩy cơ giới hóa sản xuất, mở rộng khả năng vận chuyển và tạo điều kiện cho các ngành công nghiệp phát triển. Cùng với những thay đổi về công nghệ, các tổ chức nghề nghiệp kỹ thuật cũng bắt đầu hình thành — dấu hiệu cho thấy kỹ thuật đang dần trở thành một lĩnh vực chuyên môn có tổ chức, thay vì chỉ là những hoạt động chế tạo riêng lẻ.',
      '---',
      'Bước sang thế kỷ XIX, tốc độ đổi mới kỹ thuật ngày càng nhanh. Tự động hóa máy móc bắt đầu được ứng dụng, đầu máy xe lửa ra đời và điện tín có dây được phát triển. Những thành tựu này góp phần rút ngắn khoảng cách địa lý và thay đổi cách con người trao đổi thông tin.',
      'Sự tiến bộ về vật liệu cũng đóng vai trò quan trọng. Bê tông cốt thép, vật liệu nhựa tổng hợp và quy trình sản xuất thép với số lượng lớn đã mở rộng khả năng xây dựng và chế tạo. Đặc biệt, sự xuất hiện của điện thoại, bóng đèn và động cơ xăng đã tạo nên những thay đổi sâu sắc trong sinh hoạt và sản xuất. Alexander Graham Bell gắn liền với sự phát triển của điện thoại. Thomas Edison được nhắc đến với bóng đèn và máy hát. Gottlieb Daimler và Karl Benz là những cái tên tiêu biểu trong lịch sử phát triển động cơ và ô tô. Những phát minh này không tồn tại độc lập; chúng cùng tạo nên nền tảng cho một xã hội công nghiệp hiện đại.',
      '---',
      'Đầu thế kỷ XX chứng kiến một bước tiến đặc biệt: con người bắt đầu chinh phục bầu trời bằng máy bay. Anh em nhà Wright trở thành những nhân vật tiêu biểu trong lịch sử hàng không với chuyến bay có động cơ đầu tiên vào năm 1903. Từ đây, ngành hàng không tiếp tục phát triển, mở đường cho các hoạt động vận chuyển và giao thông đường dài. Cũng trong giai đoạn này, công nghiệp ô tô phát triển mạnh, đặc biệt tại Detroit, Hoa Kỳ. Sau đó, truyền hình, transistor và máy tính lần lượt xuất hiện, tạo ra những nền tảng mới cho công nghệ thông tin.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_b1a6e2ba.png',
        alt: 'Chiếc máy bay có động cơ đầu tiên của anh em nhà Wright',
        caption:
          'Sự ra đời của máy bay có động cơ đánh dấu một bước ngoặt trong khả năng di chuyển của con người.',
      },
      'Transistor là một phát minh đặc biệt quan trọng. Nó góp phần tạo nền tảng cho sự phát triển của các thiết bị điện tử hiện đại, từ máy tính đến những hệ thống điều khiển phức tạp. Khi máy tính được thương mại hóa và ngày càng phổ biến, khả năng xử lý thông tin của con người được mở rộng đáng kể.',
      '---',
      'Nửa sau thế kỷ XX đưa kỹ thuật bước vào một lĩnh vực mới: công nghệ vũ trụ. Năm 1957, Liên Xô phóng Sputnik I, vệ tinh nhân tạo đầu tiên của nhân loại. Tiếp đó, vệ tinh truyền thông Telstar mở ra những khả năng mới trong truyền tải thông tin xuyên lục địa. Đỉnh cao của hành trình này là việc Hoa Kỳ đưa con người lên Mặt Trăng lần đầu tiên vào năm 1969.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_e7666126.png',
        alt: 'Phi hành gia trong chương trình Apollo 11 trên bề mặt Mặt Trăng',
        caption:
          'Chuyến đổ bộ Mặt Trăng năm 1969 là một trong những thành tựu kỹ thuật nổi bật nhất thế kỷ XX.',
      },
      'Cùng thời kỳ, các lĩnh vực khác cũng có những bước tiến đáng chú ý, từ hàng không siêu thanh Concord đến tàu con thoi Columbia và các ứng dụng kỹ thuật trong y học. Điều đó cho thấy kỹ thuật không chỉ phục vụ công nghiệp hay giao thông; nó còn mở rộng khả năng khám phá vũ trụ và cải thiện chất lượng chăm sóc con người.',
      'Từ cuối thế kỷ XX đến nay, robot khám phá Sao Hỏa, đường hầm dưới biển nối Anh và Pháp, cùng hệ thống định vị toàn cầu GPS đã trở thành những ví dụ tiêu biểu cho sự phát triển của kỹ thuật. GPS không chỉ phục vụ các hoạt động chuyên môn mà còn được tích hợp vào nhiều thiết bị dân dụng, trong đó có điện thoại di động và máy tính. Những công nghệ từng được xem là phức tạp và xa vời giờ đây đã trở thành một phần quen thuộc của cuộc sống.',
      '---',
      'Nhìn lại hành trình từ động cơ hơi nước đến vệ tinh nhân tạo, có thể thấy một điểm chung: mỗi phát minh lớn đều làm thay đổi cách con người giải quyết vấn đề. Động cơ hơi nước thay đổi sản xuất. Điện thoại thay đổi giao tiếp. Máy bay thay đổi vận tải. Transistor và máy tính thay đổi xử lý thông tin. Công nghệ vũ trụ mở rộng giới hạn khám phá của nhân loại. Một phát minh có thể bắt đầu từ một vấn đề rất cụ thể, nhưng tác động của nó đôi khi vượt xa mục tiêu ban đầu.',
      'Đối với những kỹ sư tương lai, lịch sử này mang đến một bài học quan trọng: công nghệ không ngừng thay đổi, và nhiệm vụ của người làm kỹ thuật không chỉ là tiếp nhận những thành tựu có sẵn, mà còn phải tiếp tục tìm kiếm những giải pháp mới.',
      '---',
      '> Lịch sử của kỹ thuật là lịch sử của những giới hạn liên tục bị phá vỡ. Và mỗi thế hệ kỹ sư lại có cơ hội viết tiếp một chương mới của hành trình ấy.',
    ],
  },
  {
    id: 'other-minds',
    category: 'Chương 1',
    detailCategory: 'Chương 1: Giới thiệu nhập môn kỹ thuật',
    title: 'Những bộ óc đứng sau các cuộc cách mạng công nghệ',
    sapo: 'Từ Leonardo da Vinci đến Steve Jobs: Khi trí tưởng tượng trở thành sức mạnh thay đổi thế giới.',
    imageLabel: 'Những bộ óc đứng sau các cuộc cách mạng công nghệ',
    imageSrc: '/assets/aistudio/image_48032bad.png',
    imageAlt: 'Steve Jobs giới thiệu máy tính Macintosh tại sự kiện ra mắt',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      '> Đằng sau những phát minh làm thay đổi lịch sử không chỉ là kiến thức khoa học hay những cỗ máy phức tạp. Đó còn là những con người dám suy nghĩ khác biệt, đặt câu hỏi trước những giới hạn hiện có và kiên trì biến ý tưởng thành hiện thực.',
      '---',
      'Một công trình kiến trúc vĩ đại, một thiết bị điện tử tiên tiến hay một hệ thống máy móc hiện đại đều có điểm khởi đầu chung: một ý tưởng. Nhưng ý tưởng tự nó không thể thay đổi thế giới. Nó cần được nghiên cứu, thử nghiệm, thiết kế và phát triển thành một sản phẩm hoặc giải pháp có khả năng ứng dụng. Lịch sử kỹ thuật vì thế cũng là lịch sử của những con người sáng tạo — những nhân vật không chỉ tạo ra phát minh mới mà còn thay đổi cách xã hội tiếp cận tri thức và công nghệ.',
      '---',
      {
        type: 'figure',
        src: '/assets/aistudio/image_83b30fad.png',
        alt: 'Chân dung Leonardo da Vinci',
        caption:
          'Leonardo da Vinci là một trong những nhân vật tiêu biểu cho sự kết hợp giữa nghệ thuật, khoa học và tư duy sáng tạo.',
      },
      'Leonardo da Vinci thường được biết đến với vai trò họa sĩ, nhưng tầm ảnh hưởng của ông vượt xa lĩnh vực nghệ thuật. Ông quan tâm đến giải phẫu học, cơ học, kiến trúc và nhiều lĩnh vực nghiên cứu khác. Những bản phác thảo về máy móc và thiết bị thể hiện khả năng quan sát tự nhiên cũng như trí tưởng tượng kỹ thuật đáng chú ý. Điều làm nên giá trị của Leonardo không chỉ nằm ở những tác phẩm cụ thể, mà còn ở phương pháp tư duy: quan sát thế giới, tìm hiểu nguyên lý hoạt động và đặt câu hỏi về cách cải tiến những gì đang tồn tại. Đó cũng là một phẩm chất quan trọng của người kỹ sư.',
      '---',
      {
        type: 'figure',
        src: '/assets/aistudio/image_6f142c6e.png',
        alt: 'Johannes Gutenberg và máy in chữ rời',
        caption:
          'Công nghệ in bằng chữ rời của Gutenberg góp phần tạo nên bước ngoặt trong lịch sử truyền bá tri thức.',
      },
      'Nếu Leonardo đại diện cho khả năng sáng tạo cá nhân, Johannes Gutenberg lại là ví dụ về cách một phát minh có thể tác động đến toàn xã hội. Sự phát triển của kỹ thuật in đã giúp việc sao chép và phổ biến tài liệu trở nên thuận lợi hơn so với phương pháp chép tay truyền thống. Nhờ đó, tri thức có cơ hội được truyền bá rộng rãi hơn; sách vở và tài liệu không còn bị giới hạn trong những nhóm người có khả năng tiếp cận bản sao thủ công. Câu chuyện của Gutenberg cho thấy một sản phẩm kỹ thuật có thể tạo ra những thay đổi không chỉ trong sản xuất, mà còn trong giáo dục, văn hóa và đời sống xã hội.',
      '---',
      'Một trong những nhân vật được giới thiệu trong giáo trình là PGS.TS. Võ Đình Tuấn, nhà khoa học và nhà sáng chế người Mỹ gốc Việt. Theo thông tin được trình bày trong slide, ông sinh ngày 11 tháng 4 năm 1948 và có 32 bằng phát minh, sáng chế tại Mỹ trong các lĩnh vực môi trường, sinh học và y học. Giáo trình cũng đề cập đến việc ông được xếp hạng trong danh sách 100 thiên tài đương thời do tổ chức Creators Synectics đánh giá.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_b725f1e9.png',
        alt: 'PGS.TS. Võ Đình Tuấn tại phòng thí nghiệm',
        caption:
          'PGS.TS. Võ Đình Tuấn là nhân vật tiêu biểu cho khả năng đóng góp của các nhà khoa học gốc Việt trong lĩnh vực nghiên cứu và sáng chế.',
      },
      'Điều đáng chú ý ở trường hợp này là phạm vi ứng dụng của nghiên cứu khoa học. Những phát minh không chỉ giới hạn trong một lĩnh vực chuyên môn mà còn có thể liên quan đến các vấn đề thực tế như môi trường và sức khỏe con người — minh chứng cho thấy kiến thức kỹ thuật và khoa học có thể tạo ra giá trị vượt ra ngoài phạm vi phòng thí nghiệm.',
      '---',
      {
        type: 'figure',
        src: '/assets/aistudio/image_48032bad.png',
        alt: 'Steve Jobs giới thiệu máy tính Macintosh',
        caption:
          'Steve Jobs gắn liền với tư duy đổi mới sản phẩm và cách đưa công nghệ đến gần hơn với người sử dụng.',
      },
      'Trong lĩnh vực công nghệ hiện đại, Steve Jobs là một nhân vật tiêu biểu cho sự kết hợp giữa sáng tạo, thiết kế sản phẩm và kinh doanh. Điểm đáng chú ý trong câu chuyện của ông là cách nhìn nhận công nghệ không chỉ như một tập hợp các linh kiện hay thông số kỹ thuật. Một sản phẩm tốt còn cần được thiết kế để con người có thể sử dụng thuận tiện, hiểu được giá trị và cảm nhận được sự khác biệt.',
      'Đây là góc nhìn quan trọng đối với sinh viên kỹ thuật: một thiết bị có thể sở hữu cấu hình mạnh, nhưng nếu khó sử dụng hoặc không giải quyết được nhu cầu thực tế thì giá trị của nó vẫn bị giới hạn. Giáo trình cũng đề cập đến bài phát biểu nổi tiếng của Steve Jobs và câu nói “Hãy khát khao, hãy dại khờ”, gợi mở về tinh thần dám theo đuổi ý tưởng, không ngừng học hỏi và sẵn sàng khám phá những hướng đi mới.',
      '---',
      'Câu chuyện đổi mới sáng tạo không chỉ diễn ra ở những trung tâm công nghệ hàng đầu thế giới. Giáo trình giới thiệu Hồ Vĩnh Hoàng, Giám đốc Công ty TOSY Robotics, cùng những thành tựu robot giải trí của doanh nghiệp Việt Nam. Theo nội dung slide, hai robot giải trí của Việt Nam đã nhận ba giải thưởng công nghệ tại một triển lãm đồ chơi quốc tế tổ chức ở Mỹ vào tháng 2 năm 2012.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_d296f073.png',
        alt: 'Robot TOSY tại triển lãm công nghệ quốc tế',
        caption:
          'Các sản phẩm robot của TOSY là ví dụ về hoạt động nghiên cứu, phát triển và thương mại hóa công nghệ tại Việt Nam.',
      },
      'Câu chuyện này có ý nghĩa đặc biệt đối với sinh viên kỹ thuật trong nước. Nó cho thấy hoạt động sáng tạo công nghệ không nhất thiết phải bắt đầu từ những tập đoàn khổng lồ: một nhóm nghiên cứu hoặc doanh nghiệp có năng lực chuyên môn, ý tưởng phù hợp và khả năng phát triển sản phẩm vẫn có thể tạo ra những sản phẩm được giới thiệu trên thị trường quốc tế.',
      '---',
      'Leonardo da Vinci, Gutenberg, Võ Đình Tuấn, Steve Jobs và Hồ Vĩnh Hoàng hoạt động trong những bối cảnh lịch sử và lĩnh vực rất khác nhau, nhưng có một điểm chung: không chỉ tiếp nhận những gì thế giới đang có, mà còn tìm cách tạo ra những giá trị mới. Đối với sinh viên kỹ thuật, những câu chuyện này còn là lời nhắc nhở rằng kiến thức chuyên môn cần đi cùng tư duy sáng tạo, tinh thần học hỏi và khả năng biến ý tưởng thành giải pháp thực tế.',
      '---',
      '> Thế giới không chỉ cần những người biết sử dụng công nghệ. Thế giới còn cần những người có khả năng đặt ra câu hỏi mới và tạo nên công nghệ của ngày mai.',
    ],
  },
  {
    id: 'other-roles',
    category: 'Chương 1',
    detailCategory: 'Chương 1: Giới thiệu nhập môn kỹ thuật',
    title: 'Kỹ sư, nhà khoa học hay nhà công nghệ?',
    sapo: 'Ba vai trò khác nhau đang cùng định hình thế giới hiện đại.',
    imageLabel: 'Kỹ sư, nhà khoa học hay nhà công nghệ?',
    imageSrc: '/assets/aistudio/image_f8df4f7e.png',
    imageAlt: 'Kỹ sư điện tử thiết kế mạch in và vi mạch trên hệ thống máy tính',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      '> Họ có thể cùng làm việc với máy móc, thiết bị điện tử và những công nghệ tiên tiến. Nhưng nhà khoa học, kỹ sư và nhà công nghệ không thực hiện cùng một nhiệm vụ. Hiểu rõ sự khác biệt giữa ba vai trò này là bước đầu tiên để sinh viên xác định vị trí của mình trong thế giới kỹ thuật.',
      '---',
      'Khi nhắc đến ngành kỹ thuật, nhiều người thường hình dung một kỹ sư đang thiết kế máy móc, một nhà khoa học đang nghiên cứu trong phòng thí nghiệm hoặc một kỹ thuật viên đang vận hành thiết bị. Những hình ảnh này đều có cơ sở, nhưng thực tế ranh giới giữa các hoạt động chuyên môn đôi khi không đơn giản như vậy.',
      'Một nhà khoa học có thể nghiên cứu nguyên lý hoạt động của vật chất. Một kỹ sư có thể sử dụng những hiểu biết đó để tạo ra một thiết bị điện tử. Một nhà công nghệ có thể vận dụng quy trình và thiết bị hiện có để sản xuất sản phẩm phục vụ thị trường. Ba vai trò có liên hệ chặt chẽ với nhau, nhưng mục tiêu công việc có những điểm khác biệt quan trọng.',
      '---',
      'Theo giáo trình, nhà khoa học tìm kiếm câu trả lời cho những câu hỏi liên quan đến công nghệ và tự nhiên nhằm thu nhận tri thức, hiểu tại sao một hiện tượng xảy ra. Trọng tâm của hoạt động khoa học là khám phá, giải thích và mở rộng hiểu biết của con người. Chẳng hạn, một nhà khoa học có thể nghiên cứu cấu trúc nguyên tử để hiểu bản chất của vật chất, đặc điểm của các thành phần cấu tạo và những quy luật chi phối chúng. Kết quả nghiên cứu có thể chưa tạo ra một sản phẩm thương mại ngay lập tức, nhưng những tri thức mới sẽ trở thành nền tảng cho nhiều ứng dụng kỹ thuật trong tương lai.',
      'Khác với nhà khoa học, kỹ sư thường tiếp cận vấn đề với một ứng dụng cụ thể trong đầu. Giáo trình đưa ra ví dụ rất rõ: trong khi nhà khoa học nghiên cứu cấu trúc nguyên tử để hiểu bản chất vật chất, kỹ sư có thể nghiên cứu chính cấu trúc ấy nhằm chế tạo những bộ vi xử lý nhỏ hơn và nhanh hơn. Điều này không có nghĩa kỹ sư không cần nghiên cứu khoa học — ngược lại, nền tảng khoa học và toán học là những công cụ quan trọng để kỹ sư phân tích vấn đề, dự đoán kết quả và thiết kế giải pháp. Điểm khác biệt nằm ở định hướng ứng dụng: một kỹ sư không chỉ quan tâm đến việc một hiện tượng hoạt động như thế nào, mà còn phải tìm cách sử dụng hiểu biết đó để tạo ra sản phẩm hoặc hệ thống đáp ứng yêu cầu thực tế.',
      {
        type: 'carousel',
        slides: [
          {
            src: '/assets/aistudio/image_39f29e43.png',
            alt: 'Kỹ sư vi mạch kiểm tra và thiết kế cấu trúc chip bán dẫn',
            caption:
              'Kỹ sư vi mạch phân tích sơ đồ và tối ưu cấu trúc mạch tích hợp đáp ứng yêu cầu kỹ thuật.',
          },
          {
            src: '/assets/aistudio/image_53b8ad86.png',
            alt: 'Nhà khoa học quan sát mẫu nghiên cứu qua kính hiển vi trong phòng thí nghiệm',
            caption:
              'Nhà khoa học tập trung khám phá bản chất tự nhiên và thu nhận tri thức nền tảng trong phòng thí nghiệm.',
          },
          {
            src: '/assets/aistudio/image_aa0e898f.png',
            alt: 'Nhà khoa học phân tích vật liệu dưới kính hiển vi quang học',
            caption:
              'Nghiên cứu cấu trúc vật liệu mở ra cơ sở tri thức cho các thế hệ linh kiện điện tử mới.',
          },
          {
            src: '/assets/aistudio/image_95904184.png',
            alt: 'Nhà công nghệ kiểm tra và lắp ráp linh kiện trên bảng mạch trong dây chuyền',
            caption:
              'Nhà công nghệ triển khai quy trình và thiết bị hiện có để sản xuất sản phẩm đạt tiêu chuẩn.',
          },
          {
            src: '/assets/aistudio/image_cec0cc6d.png',
            alt: 'Nhà công nghệ thực hiện công đoạn hàn và hoàn thiện bảng mạch điện tử',
            caption:
              'Hoạt động sản xuất và vận hành dây chuyền giúp biến bản thiết kế kỹ thuật thành sản phẩm thương mại.',
          },
        ],
      },
      'Nhà công nghệ làm việc với công nghệ hiện có để sản xuất hàng hóa phục vụ xã hội. Theo giáo trình, kỹ sư và nhà công nghệ đều ứng dụng công nghệ nhằm cải thiện đời sống; tuy nhiên, kỹ sư có thể tham gia tạo ra công nghệ mới thông qua nghiên cứu, thiết kế và phát triển sản phẩm. Ví dụ được sử dụng trong bài giảng là một máy CD: nhà công nghệ xác định những thiết bị và quy trình cần thiết để lắp ráp máy CD, trong khi kỹ sư tham gia thiết kế sản phẩm và xác định giải pháp kỹ thuật để máy hoạt động. Hai công việc bổ sung cho nhau.',
      '---',
      'Hãy hình dung quá trình tạo ra một bộ vi xử lý. Nhà khoa học nghiên cứu những đặc tính vật lý của vật liệu bán dẫn và các hiện tượng liên quan. Kỹ sư sử dụng những kiến thức đó để thiết kế cấu trúc mạch, lựa chọn giải pháp công nghệ và phát triển một bộ vi xử lý đáp ứng các yêu cầu về tốc độ, kích thước và hiệu suất. Nhà công nghệ tham gia triển khai quy trình sản xuất, vận hành thiết bị và bảo đảm sản phẩm được chế tạo theo những tiêu chuẩn đã xác định.',
      'Không có vai trò nào hoàn toàn thay thế được vai trò còn lại. Khi tri thức khoa học phát triển, kỹ thuật có thêm nền tảng để sáng tạo. Khi kỹ sư phát triển giải pháp mới, nhà công nghệ có thêm cơ hội cải tiến sản xuất. Khi sản xuất mở rộng, xã hội có thêm dữ liệu và nhu cầu để thúc đẩy những nghiên cứu tiếp theo. Đó là một chu trình liên kết giữa tri thức, sáng tạo và ứng dụng.',
      '---',
      'Giáo trình cũng chỉ ra rằng sinh viên quan tâm đến ngành kỹ thuật có thể bắt đầu từ nhiều động lực khác nhau: năng lực về toán, lý, hóa; sự tư vấn của thầy cô; việc biết đến những kỹ sư giỏi; hoặc nhận thấy cơ hội việc làm và lợi ích nghề nghiệp. Tuy nhiên, lựa chọn ngành học chỉ là bước đầu.',
      'Để hiểu rõ một lĩnh vực kỹ thuật, sinh viên cần chủ động tìm kiếm thông tin từ nhiều nguồn: tham dự hội chợ việc làm, seminar do doanh nghiệp tổ chức, trao đổi với giảng viên, tìm kiếm thông tin trên Internet hoặc gặp gỡ những kỹ sư đang làm việc. Thực tập tại nhà máy và lựa chọn các môn học tự chọn cũng là những cách giúp sinh viên tiếp cận gần hơn với môi trường nghề nghiệp.',
      '---',
      'Nhà khoa học tìm kiếm tri thức. Kỹ sư sử dụng tri thức để phát triển giải pháp. Nhà công nghệ đưa công nghệ vào quá trình sản xuất. Dù có những điểm giao thoa, ba vai trò vẫn có những định hướng riêng — giúp sinh viên kỹ thuật hình dung rõ hơn các lựa chọn nghề nghiệp sau khi tốt nghiệp. Không có con đường nào mặc định là quan trọng hơn con đường còn lại.',
      '---',
      '> Điều quan trọng không phải là chọn một danh xưng thật ấn tượng, mà là hiểu mình muốn giải quyết vấn đề gì và sẽ đóng góp như thế nào vào thế giới công nghệ.',
    ],
  },
  {
    id: 'other-careers',
    category: 'Chương 1',
    detailCategory: 'Chương 1: Giới thiệu nhập môn kỹ thuật',
    title: 'Một tấm bằng kỹ thuật, hàng chục con đường sự nghiệp',
    sapo: 'Từ phòng thí nghiệm đến nhà máy, từ bản thiết kế đến bàn điều hành: Kỹ sư thực sự làm những công việc gì?',
    imageLabel: 'Một tấm bằng kỹ thuật, hàng chục con đường sự nghiệp',
    imageSrc: '/assets/aistudio/image_21118581.png',
    imageAlt: 'Nhóm kỹ sư trao đổi bản vẽ kỹ thuật và mô hình thiết kế trong phòng R&D',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      '> Không phải mọi kỹ sư đều làm việc với máy móc theo cùng một cách. Có người nghiên cứu công nghệ mới, có người thiết kế sản phẩm, có người kiểm tra chất lượng, cũng có người quản lý dự án hoặc trực tiếp tư vấn cho khách hàng. Thế giới nghề nghiệp kỹ thuật rộng lớn hơn nhiều so với hình dung thông thường.',
      '---',
      'Khi nghĩ đến một kỹ sư, hình ảnh thường xuất hiện là một người đứng trước máy tính, đọc bản vẽ kỹ thuật hoặc làm việc trong nhà máy. Nhưng đó chỉ là một phần của bức tranh.',
      'Một sản phẩm công nghiệp trước khi xuất hiện trên thị trường phải trải qua rất nhiều công đoạn. Từ ý tưởng ban đầu, nghiên cứu khả thi, thiết kế nguyên mẫu, kiểm thử độ bền cho đến tổ chức dây chuyền sản xuất, bán hàng và hỗ trợ kỹ thuật sau khi bàn giao — mỗi khâu đều cần những con người có tư duy kỹ thuật nhưng đảm nhận những chức năng nghề nghiệp rất khác nhau.',
      '---',
      'Ở giai đoạn khởi đầu của chu trình sản phẩm, kỹ sư nghiên cứu (Research) và kỹ sư phát triển (Development) đóng vai trò đặt nền móng. Kỹ sư nghiên cứu tìm cách khám phá những nguyên lý, vật liệu hoặc phương pháp tính toán mới nhằm giải quyết các bài toán chưa có lời giải tối ưu. Trong khi đó, kỹ sư phát triển tiếp nhận các kết quả nghiên cứu ấy để biến chúng thành sản phẩm thử nghiệm hoặc công nghệ có thể sản xuất thực tế.',
      'Liền kề với họ là kỹ sư thiết kế (Design) — những người chịu trách nhiệm cụ thể hóa từng chi tiết, lựa chọn vật liệu, tính toán thông số kích thước, dung sai và hiệu năng làm việc. Một bản thiết kế tốt không chỉ đáp ứng yêu cầu kỹ thuật thuần túy, mà còn phải cân bằng được bài toán chi phí chế tạo, độ an toàn, tính thẩm mỹ và khả năng bảo trì lâu dài.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_21118581.png',
        alt: 'Nhóm kỹ sư cùng thảo luận bản vẽ chi tiết máy và mô hình CAD trên màn hình',
        caption:
          'Hoạt động nghiên cứu và thiết kế đòi hỏi sự phối hợp chặt chẽ giữa tính toán lý thuyết và khả năng hiện thực hóa sản phẩm.',
      },
      '---',
      'Ngay cả khi bản thiết kế trên phần mềm trông hoàn hảo, không sản phẩm nào có thể đi thẳng ra thị trường nếu thiếu bước đánh giá thực nghiệm. Đây là lúc kỹ sư thử nghiệm (Test Engineer) nhập cuộc. Họ thiết lập các kịch bản đo đạc trong phòng thí nghiệm hoặc môi trường khắc nghiệt để kiểm chứng giới hạn chịu tải, mức tiêu thụ năng lượng, độ nhiễu điện từ hay độ an toàn va chạm của nguyên mẫu trước khi phê duyệt sản xuất hàng loạt.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_f472512e.png',
        alt: 'Kỹ sư kiểm tra thông số nguyên mẫu ô tô trong buồng thử nghiệm chuyên dụng',
        caption:
          'Kỹ sư thử nghiệm đánh giá hành vi thực tế của nguyên mẫu trong các điều kiện đo đạc nghiêm ngặt trước khi đưa vào sản xuất.',
      },
      'Song hành với thử nghiệm là kỹ sư chế tạo và sản xuất (Manufacturing). Nhiệm vụ của họ là thiết kế quy trình gia công, lựa chọn máy móc, bố trí dây chuyền lắp ráp tự động và tối ưu năng suất sao cho hàng nghìn hoặc hàng triệu sản phẩm làm ra đều đồng nhất về chất lượng với giá thành hợp lý.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_4f3ccc78.png',
        alt: 'Dây chuyền lắp ráp tự động với cánh tay robot và kỹ sư giám sát vận hành',
        caption:
          'Tại nhà máy, kỹ sư sản xuất kết hợp hệ thống tự động hóa và kiểm soát quy trình để bảo đảm sản lượng và chất lượng ổn định.',
      },
      '---',
      'Khi sản phẩm hoàn thiện và đi vào vận hành ngoài thực tế, cánh cửa nghề nghiệp tiếp tục mở ra ở những vai trò hướng về hệ thống và khách hàng. Kỹ sư bán hàng (Sales Engineer) kết nối năng lực kỹ thuật của doanh nghiệp với nhu cầu cụ thể của đối tác, tư vấn giải pháp phù hợp thay vì chỉ giới thiệu bảng giá. Kỹ sư hiện trường và bảo trì (Service/Maintenance) trực tiếp lắp đặt, hiệu chuẩn và khắc phục sự cố tại công trình hoặc nhà máy của khách hàng.',
      'Ở cấp độ tổ chức rộng hơn, nhiều kỹ sư sau vài năm tích lũy kinh nghiệm chuyên môn sẽ chuyển sang đảm nhận vai trò kỹ sư quản lý dự án (Engineering Management) hoặc tư vấn kỹ thuật độc lập (Consulting). Lúc này, bên cạnh nền tảng chuyên môn vững vàng, họ cần thêm kỹ năng lập kế hoạch ngân sách, quản trị rủi ro, điều phối nhân sự đa ngành và giao tiếp hiệu quả với các bên liên quan.',
      '---',
      'Hiểu được bản đồ nghề nghiệp rộng mở ấy giúp sinh viên năm nhất không còn bó hẹp lựa chọn của mình vào một khuôn mẫu duy nhất. Tùy theo thế mạnh cá nhân — thích đào sâu lý thuyết, say mê thiết kế, ưa thích môi trường thử nghiệm thực tế hay có năng khiếu tổ chức và giao tiếp — cùng một tấm bằng kỹ thuật có thể dẫn tới rất nhiều con đường phát triển khác nhau.',
      '---',
      '> Tấm bằng kỹ thuật không đóng khung bạn vào một chiếc bàn hay một dây chuyền cố định; nó trao cho bạn tư duy giải quyết vấn đề để tự chọn vị trí phù hợp nhất trong chuỗi giá trị công nghệ.',
    ],
  },
  {
    id: 'other-ee-profile',
    category: 'Chương 1',
    detailCategory: 'Chương 1: Giới thiệu nhập môn kỹ thuật',
    title: 'Chân dung một kỹ sư điện – điện tử',
    sapo: 'Phía sau một bản lý lịch: Những năng lực tạo nên giá trị của người kỹ sư.',
    imageLabel: 'Chân dung một kỹ sư điện – điện tử',
    imageSrc: '/assets/aistudio/image_52f797e7.png',
    imageAlt: 'Kỹ sư điện tử làm việc bên máy hiện sóng, bo mạch mẫu và mô hình 3D mạch in',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      '> Một bản lý lịch ấn tượng của kỹ sư điện – điện tử không chỉ liệt kê tên trường đại học hay danh sách phần mềm đã từng dùng. Giá trị thật sự nằm ở cách người kỹ sư kết hợp kiến thức nền tảng, kỹ năng thực hành và tư duy hệ thống để giải quyết những bài toán kỹ thuật cụ thể.',
      '---',
      'Trong thời đại mà mọi thiết bị từ điện thoại thông minh, ô tô điện đến dây chuyền tự động hóa đều phụ thuộc vào năng lượng điện và xử lý tín hiệu, vai trò của kỹ sư điện – điện tử ngày càng trở nên thiết yếu. Nhưng để bước vào ngành này một cách vững vàng, sinh viên cần hình dung rõ doanh nghiệp và xã hội thực sự tìm kiếm điều gì ở một người kỹ sư.',
      'Nền tảng đầu tiên luôn là sự am hiểu chắc chắn về toán học, vật lý điện từ, giải tích mạch và nguyên lý linh kiện bán dẫn. Nếu thiếu gốc rễ lý thuyết, người làm kỹ thuật rất dễ lúng túng khi mạch hoạt động sai khác so với mô phỏng hoặc khi phải tối ưu một hệ thống làm việc ở giới hạn công suất và tần số cao.',
      '---',
      'Bên cạnh kiến thức hàn lâm, năng lực thiết kế và sử dụng công cụ chuyên ngành là thước đo trực tiếp khả năng làm việc của kỹ sư điện – điện tử. Từ việc vẽ sơ đồ nguyên lý (schematic), thiết kế bố cục mạch in nhiều lớp (PCB layout), lập trình vi điều khiển và hệ thống nhúng cho đến sử dụng thành thạo máy hiện sóng, máy phân tích logic hay bộ nguồn lập trình được — tất cả tạo thành ngôn ngữ hành nghề hằng ngày.',
      {
        type: 'carousel',
        slides: [
          {
            src: '/assets/aistudio/image_e516cc48.png',
            alt: 'Kỹ sư điện tử thiết kế sơ đồ nguyên lý mạch điều khiển trên màn hình máy tính',
            caption:
              'Thiết kế sơ đồ nguyên lý giúp kỹ sư xác định chính xác kết nối linh kiện và luồng tín hiệu trước khi chế tạo mạch.',
          },
          {
            src: '/assets/aistudio/image_1906b8ac.png',
            alt: 'Kỹ sư hoàn thiện bố cục mạch in nhiều lớp và kiểm tra sơ đồ trên hai màn hình',
            caption:
              'Bố trí mạch in nhiều lớp đòi hỏi sự cẩn trọng về chống nhiễu, tản nhiệt và độ tin cậy khi vận hành thực tế.',
          },
        ],
      },
      'Tuy nhiên, kỹ năng kỹ thuật đơn lẻ hiếm khi đủ để tạo nên một sản phẩm hoàn chỉnh. Trong môi trường công nghiệp hiện đại, kỹ sư điện – điện tử hiếm khi làm việc cô lập. Họ phải phối hợp với kỹ sư cơ khí để thiết kế vỏ máy và tản nhiệt, làm việc cùng kỹ sư phần mềm để đồng bộ giao thức truyền thông, và trao đổi với bộ phận sản xuất để bảo đảm bo mạch có thể lắp ráp hàng loạt với tỷ lệ lỗi thấp nhất.',
      '---',
      'Vì thế, hồ sơ năng lực của một kỹ sư giỏi luôn song hành giữa năng lực chuyên môn và các kỹ năng nghề nghiệp thiết yếu: khả năng đọc viết tài liệu kỹ thuật bằng tiếng Anh, kỹ năng trình bày phương án thiết kế trước nhóm, tinh thần làm việc nhóm kỷ luật và thái độ tôn trọng các tiêu chuẩn an toàn điện cũng như đạo đức nghề nghiệp.',
      'Quan trọng hơn cả là khả năng tự học suốt đời. Một thế hệ vi điều khiển, chuẩn giao tiếp không dây hay công cụ mô phỏng có thể thay đổi chỉ sau vài năm, nhưng tư duy phân tích bài toán từ nguyên lý gốc và thói quen kiểm chứng bằng thực nghiệm sẽ giúp người kỹ sư thích nghi trước mọi làn sóng công nghệ mới.',
      '---',
      '> Bản lý lịch chỉ giúp mở cánh cửa phỏng vấn; chính chiều sâu chuyên môn, tính kỷ luật và khả năng phối hợp giải quyết vấn đề mới là điều giữ người kỹ sư đứng vững và đi xa trong nghề.',
    ],
  },
  GUI_DEBATE_POST,
  {
    id: 'other-2',
    category: 'Chương 2',
    detailCategory: 'Chương 2: Nội dung đang cập nhật (Placeholder)',
    title: 'Bài viết thuộc Chương 2 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài viết thuộc Chương 2 (đang chờ nội dung chi tiết).',
    imageLabel: 'Ảnh minh họa Chương 2',
    imageSrc: '/assets/aistudio/181_TSDH_TQImage_1715675275938_b30b1bdc.jpg',
    imageAlt: 'Vi mạch bán dẫn tích hợp trên bo mạch',
    readTime: '4 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài viết thuộc Chương 2.',
      'Sẽ cập nhật nội dung bài viết cụ thể ngay khi có dữ liệu.',
    ],
  },
  DELL_ASUS_POST,
  {
    id: 'other-4',
    category: 'Chương 4',
    detailCategory: 'Chương 4: Nội dung đang cập nhật (Placeholder)',
    title: 'Bài viết thuộc Chương 4 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài viết thuộc Chương 4 (đang chờ nội dung chi tiết).',
    imageLabel: 'Ảnh minh họa Chương 4',
    imageSrc: '/assets/aistudio/63_TSDH_TQImage_1691461428936_a5a8ebc8.jpg',
    imageAlt: 'Hệ thống truyền tải điện cao áp',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài viết thuộc Chương 4.',
      'Sẽ cập nhật nội dung bài viết cụ thể ngay khi có dữ liệu.',
    ],
  },
  {
    id: 'other-5',
    category: 'Chương 5',
    detailCategory: 'Chương 5: Nội dung đang cập nhật (Placeholder)',
    title: 'Bài viết thuộc Chương 5 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài viết thuộc Chương 5 (đang chờ nội dung chi tiết).',
    imageLabel: 'Ảnh minh họa Chương 5',
    imageSrc: '/assets/aistudio/65_TSDH_Image_1691466014493_fa7a55dc.jpg',
    imageAlt: 'Mạch điện tử và linh kiện phần cứng',
    readTime: '4 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài viết thuộc Chương 5.',
      'Sẽ cập nhật nội dung bài viết cụ thể ngay khi có dữ liệu.',
    ],
  },
  {
    id: 'other-6',
    category: 'Chương 6',
    detailCategory: 'Chương 6: Nội dung đang cập nhật (Placeholder)',
    title: 'Bài viết thuộc Chương 6 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài viết thuộc Chương 6 (đang chờ nội dung chi tiết).',
    imageLabel: 'Ảnh minh họa Chương 6',
    imageSrc: '/assets/aistudio/181_TSDH_TQImage_1715675275938_b30b1bdc.jpg',
    imageAlt: 'Linh kiện vi mạch điện tử',
    readTime: '4 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài viết thuộc Chương 6.',
      'Sẽ cập nhật nội dung bài viết cụ thể ngay khi có dữ liệu.',
    ],
  },
  {
    id: 'other-7',
    category: 'Chương 7',
    detailCategory: 'Chương 7: Nội dung đang cập nhật (Placeholder)',
    title: 'Bài viết thuộc Chương 7 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài viết thuộc Chương 7 (đang chờ nội dung chi tiết).',
    imageLabel: 'Ảnh minh họa Chương 7',
    imageSrc: '/assets/aistudio/64_TSDH_TQImage_1691462323202_cb32d264.jpg',
    imageAlt: 'Hệ thống điều khiển tự động',
    readTime: '4 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài viết thuộc Chương 7.',
      'Sẽ cập nhật nội dung bài viết cụ thể ngay khi có dữ liệu.',
    ],
  },
  {
    id: 'other-8',
    category: 'Chương 8',
    detailCategory: 'Chương 8: Nội dung đang cập nhật (Placeholder)',
    title: 'Bài viết thuộc Chương 8 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài viết thuộc Chương 8 (đang chờ nội dung chi tiết).',
    imageLabel: 'Ảnh minh họa Chương 8',
    imageSrc: '/assets/aistudio/63_TSDH_TQImage_1691461428936_a5a8ebc8.jpg',
    imageAlt: 'Trạm biến áp kỹ thuật điện',
    readTime: '4 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài viết thuộc Chương 8.',
      'Sẽ cập nhật nội dung bài viết cụ thể ngay khi có dữ liệu.',
    ],
  },
  {
    id: 'other-9',
    category: 'Chương 9',
    detailCategory: 'Chương 9: Nội dung đang cập nhật (Placeholder)',
    title: 'Bài viết thuộc Chương 9 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài viết thuộc Chương 9 (đang chờ nội dung chi tiết).',
    imageLabel: 'Ảnh minh họa Chương 9',
    imageSrc: '/assets/aistudio/65_TSDH_Image_1691466014493_fa7a55dc.jpg',
    imageAlt: 'Bảng mạch điện tử viễn thông',
    readTime: '4 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài viết thuộc Chương 9.',
      'Sẽ cập nhật nội dung bài viết cụ thể ngay khi có dữ liệu.',
    ],
  },
  {
    id: 'other-10',
    category: 'Chương 10',
    detailCategory: 'Chương 10: Nội dung đang cập nhật (Placeholder)',
    title: 'Bài viết thuộc Chương 10 (Placeholder)',
    sapo: 'Sapo tóm tắt cho bài viết thuộc Chương 10 (đang chờ nội dung chi tiết).',
    imageLabel: 'Ảnh minh họa Chương 10',
    imageSrc: '/assets/aistudio/181_TSDH_TQImage_1715675275938_b30b1bdc.jpg',
    imageAlt: 'Chip bán dẫn và hệ thống kỹ thuật số',
    readTime: '4 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Nội dung chi tiết placeholder cho bài viết thuộc Chương 10.',
      'Sẽ cập nhật nội dung bài viết cụ thể ngay khi có dữ liệu.',
    ],
  },
] as const;

export const ALL_REFERENCE_POSTS: readonly ReferencePost[] = Array.from(
  new Map(
    [...FEATURED_REFERENCE_POSTS, ...OTHER_REFERENCE_POSTS].map((post) => [
      post.id,
      post,
    ])
  ).values()
);

export const SIDEBAR_REFERENCE_LIMIT = 5;
export const INITIAL_GRID_VISIBLE_COUNT = 4;

export interface ReferenceChapterInfo {
  chapterNumber: number;
  label: string;
  detailLabel: string;
}

export const REFERENCE_CHAPTERS: readonly ReferenceChapterInfo[] = Array.from(
  { length: 10 },
  (_, index) => {
    const chapterNumber = index + 1;
    const label = `Chương ${chapterNumber}`;
    return {
      chapterNumber,
      label,
      detailLabel:
        chapterNumber === 1
          ? 'Chương 1: Giới thiệu nhập môn kỹ thuật'
          : label,
    };
  }
);

export function getReferenceChapterInfo(
  chapterNumber: number
): ReferenceChapterInfo {
  return (
    REFERENCE_CHAPTERS.find((item) => item.chapterNumber === chapterNumber) ??
    REFERENCE_CHAPTERS[0]
  );
}

export function getReferencePostsByChapter(
  chapterNumber: number,
  posts: readonly ReferencePost[] = ALL_REFERENCE_POSTS
): readonly ReferencePost[] {
  const targetCategory = `Chương ${chapterNumber}`;
  return posts.filter((post) => post.category === targetCategory);
}

export function getSidebarReferencePosts(
  posts: readonly ReferencePost[] = OTHER_REFERENCE_POSTS
): readonly ReferencePost[] {
  return posts.slice(0, SIDEBAR_REFERENCE_LIMIT);
}

export function getGridReferencePosts(
  posts: readonly ReferencePost[] = OTHER_REFERENCE_POSTS
): readonly ReferencePost[] {
  return posts.slice(SIDEBAR_REFERENCE_LIMIT);
}

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
