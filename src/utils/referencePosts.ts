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
  fit?: 'cover' | 'contain';
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

export interface ArticleBarChartDatum {
  label: string;
  value: number;
  highlight?: boolean;
}

export interface ArticleBarChartBlock {
  type: 'chart';
  title: string;
  subtitle?: string;
  caption: string;
  items: readonly ArticleBarChartDatum[];
}

export interface ArticleStepSummary {
  number: number;
  title: string;
  summary: string;
}

export interface ArticleDesignPhase {
  phaseLabel: string;
  steps: readonly ArticleStepSummary[];
}

export interface ArticleStepsBlock {
  type: 'steps';
  title: string;
  subtitle?: string;
  phases: readonly ArticleDesignPhase[];
}

export interface ArticleStepHeadingBlock {
  type: 'step-heading';
  number: number;
  title: string;
}

export interface ArticleProjectCharterBlock {
  type: 'charter';
  formLabel: string;
  duration: string;
  projectTitle: string;
  objective: string;
  deliverables: string;
  roles: readonly {
    role: string;
    responsibility: string;
  }[];
  caption: string;
}

export interface ArticleTeamEvaluationBlock {
  type: 'evaluation';
  formLabel: string;
  period: string;
  projectTitle: string;
  rows: readonly {
    criterion: string;
    planned: string;
    actual: string;
    note: string;
  }[];
  caption: string;
}

export interface ArticleComparisonTableBlock {
  type: 'table';
  title?: string;
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  caption?: string;
}

export interface ArticleFormulaBlock {
  type: 'formula';
  expression: string;
}

export interface ArticlePullQuoteBlock {
  type: 'pullQuote';
  quote: string;
  attribution?: string;
  pairedParagraph?: string;
  tone?: 'blue' | 'ink';
}

export interface ArticleProcessStep {
  label: string;
  detail?: string;
  badge?: string;
}

export interface ArticleProcessDiagramBlock {
  type: 'processDiagram';
  title: string;
  subtitle?: string;
  steps: readonly ArticleProcessStep[];
  loopNote?: string;
  noiseNote?: string;
  theme?: 'dark' | 'light';
}

export interface ArticleStatItem {
  value: string;
  caption: string;
}

export interface ArticleStatSpotlightBlock {
  type: 'statSpotlight';
  headline: string;
  label: string;
  summary?: string;
  items?: readonly ArticleStatItem[];
  theme?: 'yellow' | 'ink' | 'slate';
}

export interface ArticleComparisonPair {
  topic?: string;
  good: string;
  bad: string;
}

export interface ArticleComparisonBlock {
  type: 'comparison';
  title?: string;
  goodTitle: string;
  badTitle: string;
  pairs: readonly ArticleComparisonPair[];
}

export type ArticleContentBlock =
  | string
  | ArticleFigureBlock
  | ArticleCarouselBlock
  | ArticleBarChartBlock
  | ArticleStepsBlock
  | ArticleStepHeadingBlock
  | ArticleProjectCharterBlock
  | ArticleTeamEvaluationBlock
  | ArticleComparisonTableBlock
  | ArticleFormulaBlock
  | ArticlePullQuoteBlock
  | ArticleProcessDiagramBlock
  | ArticleStatSpotlightBlock
  | ArticleComparisonBlock;

export type ReferenceLayoutVariant =
  | 'default'
  | 'magazine-dropcap'
  | 'magazine-dossier';

export interface ReferencePost {
  id: string;
  category: string;
  detailCategory?: string;
  layoutVariant?: ReferenceLayoutVariant;
  editorialBadge?: string;
  dossierSummary?: {
    label: string;
    text: string;
  };
  title: string;
  sapo: string;
  imageLabel: string;
  imageSrc: string;
  imageAlt: string;
  imageFit?: 'cover' | 'contain';
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
  category: 'Chương 2',
  detailCategory: 'Chương 2: Thiết kế kỹ thuật',
  layoutVariant: 'magazine-dropcap',
  editorialBadge: 'Case Study Kinh Điển',
  title: 'Câu chuyện của Dell và Asus, thiết kế và gia công',
  sapo: 'Từ một nhà sản xuất gia công bo mạch giá rẻ, Asus đã từng bước tiếp quản toàn bộ chuỗi giá trị của Dell và vươn lên thành thương hiệu máy tính độc lập — bài học kinh điển về cái giá của việc thuê ngoài năng lực cốt lõi.',
  imageLabel: 'Logo hai thương hiệu máy tính Dell và Asus',
  imageSrc: '/assets/aistudio/image_5636592d.png',
  imageAlt: 'Logo hai thương hiệu máy tính Dell và Asus',
  imageFit: 'contain',
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
    {
      type: 'pullQuote',
      quote:
        'Mỗi lần Dell thuê ngoài công đoạn tạo giá trị gia tăng thấp nhất còn lại, Asus lại tích lũy thêm một công đoạn có giá trị gia tăng cao hơn.',
      attribution: 'Bài học chiến lược Dell — Asus',
      tone: 'ink',
      pairedParagraph:
        'Rồi đến năm 2005, Asus tuyên bố ra mắt thương hiệu máy tính của riêng mình. Trong câu chuyện mang màu sắc bi kịch Hy Lạp này, Asus đã tiếp thu toàn bộ những gì học được từ Dell và áp dụng cho chính mình. Hãng bắt đầu từ những mắt xích đơn giản nhất trong chuỗi giá trị, rồi qua từng quyết định một, mỗi lần Dell thuê ngoài công đoạn tạo giá trị gia tăng thấp nhất trong số các hoạt động còn lại của mình, Asus lại tích lũy thêm một công đoạn có giá trị gia tăng cao hơn vào doanh nghiệp của họ.',
    },
  ],
};

const GUI_DEBATE_POST: ReferencePost = {
  id: 'featured-2',
  category: 'Chương 1',
  detailCategory: 'Chương 1: Giới thiệu nhập môn kỹ thuật',
  layoutVariant: 'magazine-dropcap',
  editorialBadge: 'Lịch Sử Công Nghệ',
  title: 'Cuộc tranh luận lịch sử về GUI: Steve Jobs, Bill Gates và phát minh "mượn" từ Xerox',
  sapo: 'Cuối thập niên 1970, một cuộc cách mạng công nghệ đã âm thầm diễn ra tại Trung tâm Nghiên cứu Palo Alto (PARC) của Xerox — mở ra màn cạnh tranh, vay mượn ý tưởng và những bài học kinh điển giữa Apple và Microsoft.',
  imageLabel: 'Chân dung Steve Jobs và Bill Gates',
  imageSrc: '/assets/aistudio/image_2531b496.png',
  imageAlt: 'Chân dung Steve Jobs và Bill Gates trong cuộc tranh luận lịch sử về GUI',
  readTime: '5 phút đọc',
  sourceUrl:
    'https://medium.com/@davidsehyeonbaek/the-great-gui-debate-steve-jobs-bill-gates-and-the-borrowed-innovation-from-xerox-6402e7b654c8',
  initialLikes: 0,
  initialComments: [],
  bodyParagraphs: [
    'Vào cuối những năm 1970, một cuộc cách mạng công nghệ đang âm thầm diễn ra tại Trung tâm Nghiên cứu Palo Alto (PARC) của Xerox. Phát minh mang tính đột phá được tạo ra tại đây chính là giao diện đồ họa người dùng (GUI) — hệ thống cho phép người dùng tương tác với máy tính thông qua các yếu tố trực quan như biểu tượng và cửa sổ thay vì các câu lệnh văn bản. Đó là một ý tưởng giàu tầm nhìn, đi trước các giao diện dòng lệnh thời bấy giờ hàng năm ánh sáng, và sau cùng đã định hình lại toàn bộ ngành công nghiệp máy tính.',
    'Thế nhưng những gì diễn ra sau đó lại là một câu chuyện dài về sự tiếp thu ý tưởng, cuộc cạnh tranh khốc liệt và một trong những câu đối đáp nổi tiếng nhất lịch sử công nghệ — đến từ Bill Gates. Khi bị Steve Jobs cáo buộc "đánh cắp" khái niệm giao diện đồ họa từ chiếc Macintosh của Apple để đưa lên Windows, Gates đã đáp trả bằng câu nói trở thành huyền thoại:',
    {
      type: 'pullQuote',
      quote:
        'Cả hai chúng ta đều có một ông hàng xóm giàu có tên là Xerox, và khi tôi lẻn vào nhà ông ấy lấy trộm chiếc TV thì phát hiện ra anh đã cuỗm nó đi từ trước rồi.',
      attribution: 'Bill Gates — đáp lại Steve Jobs',
      tone: 'blue',
      pairedParagraph:
        'Câu trả lời vừa hài hước vừa thấm thía ấy đã lột tả trọn vẹn bản chất của sự việc. Cả Apple lẫn Microsoft đều lấy cảm hứng từ thành quả của Xerox, rồi tiếp tục thương mại hóa các hệ điều hành dùng giao diện đồ họa theo những con đường riêng.',
    },
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
    layoutVariant: 'magazine-dropcap',
    editorialBadge: 'Biên Niên Ký Kỹ Thuật',
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
    layoutVariant: 'magazine-dropcap',
    editorialBadge: 'Chân Dung Sáng Tạo',
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
  {
    id: 'other-engineering-choice',
    category: 'Chương 1',
    detailCategory: 'Chương 1: Giới thiệu nhập môn kỹ thuật',
    title: 'Kỹ thuật có còn là lựa chọn hấp dẫn?',
    sapo: 'Từ giảng đường đến thị trường lao động: Những con số, kỳ vọng và năng lực mà một kỹ sư tương lai cần chuẩn bị.',
    imageLabel: 'Kỹ thuật có còn là lựa chọn hấp dẫn?',
    imageSrc: '/assets/aistudio/image_dca56eee.png',
    imageAlt: 'Nhóm sinh viên kỹ thuật trẻ cùng lắp ráp và thảo luận về mô hình robot thực hành',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      '> Chọn ngành kỹ thuật không chỉ là lựa chọn một chương trình đại học. Đó còn là quyết định bước vào một thế giới nghề nghiệp đòi hỏi kiến thức chuyên môn, khả năng thích nghi và tinh thần học hỏi liên tục. Nhưng điều gì thực sự chờ đợi một sinh viên sau khi tốt nghiệp?',
      '---',
      'Mỗi năm, hàng nghìn học sinh đứng trước quyết định lựa chọn ngành học đại học. Với những người quan tâm đến kỹ thuật, câu hỏi không chỉ là mình có phù hợp với toán học, vật lý hay công nghệ hay không. Họ còn muốn biết ngành học nào có nhiều cơ hội nghề nghiệp, thị trường lao động cần những chuyên môn gì và mức thu nhập sau khi tốt nghiệp có thể ra sao.',
      'Đây cũng là những vấn đề được đặt ra trong phần cuối của Chương 1, khi giáo trình chuyển từ việc giới thiệu lịch sử và chức năng nghề nghiệp sang thống kê về đào tạo và triển vọng nghề nghiệp kỹ thuật.',
      '---',
      'Một trong những dữ liệu được sử dụng trong giáo trình là số lượng sinh viên nhập học tại Đại học Bách khoa – Đại học Quốc gia TP.HCM theo từng khoa vào năm 2011. Theo thống kê được trình bày, Khoa Kỹ thuật Xây dựng có số lượng sinh viên nhập học cao nhất với 958 người. Khoa Cơ khí đứng tiếp theo với 647 sinh viên, trong khi Khoa Điện – Điện tử có 584 sinh viên. Các khoa khác cũng ghi nhận số lượng tuyển sinh đáng chú ý, gồm Kỹ thuật Hóa học với 417 sinh viên và Khoa Khoa học và Kỹ thuật Máy tính với 292 sinh viên.',
      {
        type: 'chart',
        title: 'Biểu đồ 1: Số lượng sinh viên nhập học theo khoa năm 2011',
        subtitle: 'ĐHBK – ĐHQG TP.HCM (sinh viên)',
        caption:
          'Số liệu tuyển sinh Đại học Bách khoa – ĐHQG TP.HCM năm 2011, trích từ giáo trình Nhập môn về kỹ thuật.',
        items: [
          { label: 'Kỹ thuật Xây dựng', value: 958 },
          { label: 'Cơ khí', value: 647 },
          { label: 'Điện – Điện tử', value: 584, highlight: true },
          { label: 'Kỹ thuật Hóa học', value: 417 },
          { label: 'Khoa học & KT Máy tính', value: 292 },
          { label: 'Quản lý Công nghiệp', value: 234 },
          { label: 'Kỹ thuật Giao thông', value: 175 },
          { label: 'Công nghệ Vật liệu', value: 171 },
          { label: 'Môi trường', value: 169 },
          { label: 'Kỹ thuật Địa chất – Dầu khí', value: 165 },
          { label: 'Khoa học Ứng dụng', value: 123 },
        ],
      },
      'Những con số này cho thấy kỹ thuật là một nhóm ngành có quy mô đào tạo đa dạng, với nhiều chuyên ngành phục vụ các lĩnh vực khác nhau của nền kinh tế. Điện – Điện tử cũng là một trong những khoa có quy mô tuyển sinh đáng kể trong thống kê được giới thiệu. Tuy nhiên, cần nhấn mạnh rằng đây là dữ liệu lịch sử năm 2011, không phản ánh tình hình tuyển sinh hiện tại.',
      '---',
      'Bên cạnh số lượng sinh viên nhập học, giáo trình còn đưa ra số liệu tốt nghiệp của các khoa trong cùng năm. Khoa Kỹ thuật Xây dựng có 566 sinh viên tốt nghiệp, Khoa Cơ khí có 368 sinh viên, còn Khoa Điện – Điện tử có 384 sinh viên. Khoa Khoa học và Kỹ thuật Máy tính ghi nhận 284 sinh viên tốt nghiệp, trong khi Khoa Kỹ thuật Hóa học có 255 sinh viên.',
      {
        type: 'chart',
        title: 'Biểu đồ 2: Số lượng sinh viên tốt nghiệp theo khoa năm 2011',
        subtitle: 'ĐHBK – ĐHQG TP.HCM (sinh viên)',
        caption:
          'Thống kê sinh viên tốt nghiệp năm 2011 tại Đại học Bách khoa – ĐHQG TP.HCM.',
        items: [
          { label: 'Kỹ thuật Xây dựng', value: 566 },
          { label: 'Điện – Điện tử', value: 384, highlight: true },
          { label: 'Cơ khí', value: 368 },
          { label: 'Khoa học & KT Máy tính', value: 284 },
          { label: 'Kỹ thuật Hóa học', value: 255 },
          { label: 'Quản lý Công nghiệp', value: 206 },
          { label: 'Công nghệ Vật liệu', value: 138 },
          { label: 'Môi trường', value: 100 },
          { label: 'Kỹ thuật Địa chất – Dầu khí', value: 95 },
          { label: 'Kỹ thuật Giao thông', value: 76 },
          { label: 'Khoa học Ứng dụng', value: 67 },
        ],
      },
      'Việc đặt số liệu tuyển sinh và tốt nghiệp cạnh nhau giúp người đọc hình dung quy mô đào tạo của các lĩnh vực kỹ thuật trong cùng một năm. Tuy nhiên, không nên lấy số sinh viên nhập học và tốt nghiệp của cùng năm để tính tỷ lệ hoàn thành chương trình học. Hai nhóm số liệu không nhất thiết thuộc cùng một khóa tuyển sinh. Dù vậy, những thống kê này vẫn có giá trị tham khảo trong việc tìm hiểu cơ cấu đào tạo và quy mô các ngành kỹ thuật tại một trường đại học.',
      '---',
      'Một trong những vấn đề được sinh viên quan tâm nhất khi lựa chọn ngành nghề là thu nhập. Giáo trình đặt ra câu hỏi về mức lương của kỹ sư điện – điện tử mới ra trường, kỹ sư có 5 năm kinh nghiệm và kỹ sư có 10 năm kinh nghiệm. Đây là cách tiếp cận hợp lý vì thu nhập của người lao động có thể thay đổi theo kinh nghiệm, vị trí công việc và năng lực chuyên môn.',
      'Tuy nhiên, phần số liệu tiền lương trong slide hiện không có các con số hoàn chỉnh. Thời điểm thu thập dữ liệu cũng được để trống. Vì vậy, không thể sử dụng phần này để đưa ra một mức lương cụ thể hoặc kết luận về thu nhập hiện tại của kỹ sư điện – điện tử. Điều đáng chú ý hơn là câu hỏi mà giáo trình đặt ra: kinh nghiệm nghề nghiệp và năng lực chuyên môn có thể ảnh hưởng như thế nào đến cơ hội phát triển của một kỹ sư?',
      '---',
      'Nếu bằng cấp là điều kiện giúp ứng viên bước vào thị trường lao động, thì những năng lực thực tế mới là yếu tố giúp họ đáp ứng yêu cầu công việc. Trong phần cuối chương, giáo trình tổng hợp một số lời khuyên từ nhà tuyển dụng về những khả năng mà sinh viên tốt nghiệp cần có.',
      'Đầu tiên là giao tiếp tốt. Một kỹ sư thường phải trao đổi với đồng nghiệp, khách hàng, nhà cung cấp và nhiều bộ phận chuyên môn khác, vì vậy khả năng truyền đạt thông tin rõ ràng là yêu cầu quan trọng. Thứ hai là làm việc nhóm hiệu quả: những dự án kỹ thuật thường có sự tham gia của nhiều người với chuyên môn khác nhau, đòi hỏi kỹ sư cần biết phối hợp, chia sẻ thông tin và cùng nhóm giải quyết vấn đề. Thứ ba là năng lực quản lý và lãnh đạo — khi đảm nhận những nhiệm vụ có quy mô lớn hơn, kỹ sư cần biết tổ chức công việc, quản lý thời gian và phối hợp nguồn lực. Bên cạnh đó, nhà tuyển dụng cũng quan tâm đến khả năng sử dụng máy tính, kiến thức kỹ thuật chuyên ngành và thái độ làm việc chăm chỉ, nghiêm túc.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_dca56eee.png',
        alt: 'Nhóm kỹ sư trẻ cùng thảo luận và lắp ráp mô hình dự án kỹ thuật',
        caption:
          'Làm việc nhóm và giao tiếp là những năng lực được nhà tuyển dụng nhấn mạnh trong giáo trình.',
      },
      '---',
      'Một trong những nhận thức quan trọng mà sinh viên cần có là quá trình học tập không kết thúc khi nhận bằng tốt nghiệp. Công nghệ luôn thay đổi; những công cụ, phương pháp và quy trình được sử dụng trong doanh nghiệp có thể tiếp tục phát triển theo thời gian. Một kỹ sư muốn duy trì năng lực nghề nghiệp cần liên tục cập nhật kiến thức, học hỏi từ kinh nghiệm thực tế và thích nghi với những yêu cầu mới. Bên cạnh đó, kiến thức chuyên môn cần được kết hợp với những kỹ năng cá nhân và liên cá nhân: khả năng giải quyết vấn đề, giao tiếp, làm việc nhóm và quản lý công việc đều góp phần quyết định hiệu quả làm việc.',
      '---',
      'Nhìn lại các nội dung của chương, có thể thấy nghề kỹ thuật không chỉ được định hình bởi lịch sử phát triển của công nghệ hay những phát minh nổi tiếng. Nó còn được định hình bởi hệ thống giáo dục, nhu cầu của doanh nghiệp và khả năng phát triển của từng cá nhân. Các số liệu tuyển sinh năm 2011 cho thấy quy mô đào tạo đa dạng của những ngành kỹ thuật tại Đại học Bách khoa, còn những lời khuyên từ nhà tuyển dụng lại cho thấy một kỹ sư cần nhiều hơn kiến thức chuyên ngành để có thể làm việc hiệu quả.',
      'Đối với sinh viên, việc chuẩn bị nghề nghiệp nên bắt đầu ngay từ những năm đầu đại học. Học tốt các môn chuyên môn là cần thiết, nhưng tham gia dự án, thực hành, rèn luyện kỹ năng giao tiếp và làm việc nhóm cũng quan trọng không kém.',
      '---',
      '> Thị trường lao động có thể thay đổi, công nghệ có thể liên tục tiến hóa, nhưng khả năng học hỏi, giải quyết vấn đề và tạo ra giá trị thực tế vẫn luôn là nền tảng của một kỹ sư.',
    ],
  },
  GUI_DEBATE_POST,
  {
    id: 'ch2-passion',
    category: 'Chương 2',
    detailCategory: 'Chương 2: Thiết kế kỹ thuật',
    layoutVariant: 'magazine-dropcap',
    editorialBadge: 'Tư Duy Thiết Kế',
    title:
      'Khi đam mê trở thành động lực của sáng tạo: Điều gì khiến một kỹ sư không ngừng tìm kiếm cái tốt hơn?',
    sapo: 'Giữa một ý tưởng ban đầu và một sản phẩm thực sự hữu ích luôn tồn tại một khoảng cách lớn — nơi kiến thức chuyên môn cần song hành cùng niềm đam mê tìm tòi và hoàn thiện.',
    imageLabel: 'Khi đam mê trở thành động lực của sáng tạo',
    imageSrc: '/assets/aistudio/image_a8731d1b.png',
    imageAlt: 'Bản phác thảo tay các cơ cấu và chi tiết cơ khí trên sổ thiết kế kỹ thuật',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      '> Có những phát minh bắt đầu từ một nhu cầu rất bình thường: muốn chiếc máy hoạt động nhanh hơn, giảm trọng lượng của một bộ phận, hay khiến công việc vốn phức tạp trở nên dễ dàng hơn. Để vượt qua khoảng cách từ ý tưởng đến sản phẩm hữu ích, kiến thức là điều cần thiết nhưng chưa đủ — người thiết kế còn cần niềm đam mê.',
      '---',
      'Trong thiết kế kỹ thuật, sáng tạo không đơn thuần là khả năng nghĩ ra một thứ chưa từng tồn tại. Đó còn là quá trình kiên trì tìm kiếm giải pháp tốt hơn cho những vấn đề đã biết. Một kỹ sư có thể hoàn thành nhiệm vụ bằng cách tạo ra một sản phẩm đáp ứng các yêu cầu tối thiểu. Tuy nhiên, một người thực sự say mê thiết kế sẽ tiếp tục đặt câu hỏi: liệu có thể làm tốt hơn không, có cách nào đơn giản hơn không, có thể giảm bớt những chi tiết không cần thiết mà vẫn duy trì hiệu quả hoạt động hay không?',
      'Tinh thần ấy được thể hiện trong quan điểm của Ralph Waldo Emerson về nhiệt tình. Ông xem nhiệt tình là một trong những động lực mạnh mẽ dẫn đến thành công, bởi khi con người dành toàn bộ tâm trí và nỗ lực cho một công việc, họ có nhiều khả năng biến mục tiêu thành hiện thực. Trong lĩnh vực kỹ thuật, điều này đặc biệt quan trọng: một bản thiết kế hiếm khi hoàn thiện ngay từ lần đầu tiên, mà cần được xem xét, điều chỉnh, thử nghiệm và đôi khi phải bắt đầu lại.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_a8731d1b.png',
        alt: 'Bản phác thảo tay các cơ cấu máy và chi tiết kỹ thuật trên bàn làm việc',
        caption:
          'Quá trình sáng tạo kỹ thuật thường bắt đầu từ những bản phác thảo và câu hỏi chưa có lời giải.',
      },
      '---',
      'Đam mê trước hết giúp người thiết kế duy trì khả năng sáng tạo. Thay vì chấp nhận phương án đầu tiên xuất hiện, họ liên tục tìm kiếm những khả năng khác nhau. Một cơ cấu máy có thể được chế tạo bằng nhiều phương pháp, một bộ phận có thể sử dụng những loại vật liệu khác nhau, và một hệ thống có thể được tổ chức theo nhiều cách. Việc không ngừng đặt câu hỏi giúp người thiết kế tránh rơi vào lối tư duy quen thuộc, đồng thời mở ra cơ hội tìm thấy những phương án hiệu quả hơn.',
      'Tuy nhiên, sáng tạo không thể phát triển nếu thiếu sự tập trung. Một ý tưởng dù độc đáo đến đâu cũng khó trở thành hiện thực khi người thực hiện không xác định rõ điều mình muốn đạt được. Henry Maudslay, nhà phát minh gắn liền với sự phát triển của máy công cụ hiện đại, từng nhấn mạnh tầm quan trọng của việc hiểu rõ mục tiêu, chú ý đến vật liệu và loại bỏ những phần không cần thiết. Tư tưởng này phản ánh một nguyên tắc quan trọng trong thiết kế cơ khí: sự đơn giản thường là kết quả của một quá trình suy nghĩ kỹ lưỡng, chứ không phải sự thiếu đầu tư.',
      'Một thiết kế tốt không nhất thiết phải có nhiều chi tiết hay cấu tạo phức tạp. Trái lại, nếu có thể thực hiện cùng một chức năng với ít vật liệu hơn, ít bộ phận hơn và quy trình chế tạo thuận tiện hơn, đó có thể là một giải pháp đáng giá. Việc giảm từng gram vật liệu không cần thiết, như tinh thần mà Maudslay đề cập, không chỉ giúp tiết kiệm chi phí mà còn có thể cải thiện hiệu quả tổng thể của sản phẩm.',
      '---',
      'Để đạt được điều đó, người thiết kế cần nhìn vấn đề từ nhiều góc độ. Albert Einstein từng đưa ra một nhận định nổi tiếng rằng con người không thể giải quyết vấn đề bằng chính cách suy nghĩ đã tạo ra nó. Trong thiết kế kỹ thuật, điều này có nghĩa là khi một phương án liên tục thất bại, việc tiếp tục điều chỉnh những chi tiết nhỏ có thể không đủ. Đôi khi cần thay đổi cách tiếp cận, xem xét lại giả định ban đầu hoặc tưởng tượng một cơ chế hoàn toàn khác.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_5e6c4a7a.png',
        alt: 'Kỹ sư cơ khí trực tiếp căn chỉnh và thử nghiệm cụm thiết bị cơ khí nguyên mẫu',
        caption:
          'Thử nghiệm và điều chỉnh là một phần không thể thiếu của hoạt động sáng tạo kỹ thuật.',
      },
      'Con đường sáng tạo vì thế không phải lúc nào cũng dẫn đến thành công ngay lập tức. Thất bại là một phần tự nhiên của quá trình thiết kế. Một mẫu thử có thể không hoạt động như dự kiến, một bộ phận có thể không chịu được tải trọng, hoặc một phương án có thể vượt quá ngân sách cho phép. Điều quan trọng không phải là tránh mọi thất bại, mà là duy trì khả năng học hỏi từ chúng.',
      'Winston Churchill từng mô tả thành công như khả năng đi từ thất bại này đến thất bại khác mà không đánh mất nhiệt tình. Quan điểm ấy đặc biệt phù hợp với công việc kỹ thuật, nơi mỗi lần thử nghiệm đều có thể cung cấp thêm thông tin về giới hạn của vật liệu, cơ cấu và phương pháp thiết kế.',
      '---',
      'Steve Jobs cũng nhấn mạnh rằng niềm đam mê không phải lúc nào cũng xuất hiện ngay từ đầu. Con người cần tiếp tục tìm kiếm cho đến khi nhận ra điều thực sự khiến mình muốn theo đuổi; khi đã tìm thấy, niềm đam mê sẽ phát triển cùng với thời gian và trải nghiệm. Đối với sinh viên kỹ thuật, điều này có thể bắt đầu từ một đồ án nhỏ, một mô hình robot hoặc một lần tự tay chế tạo thiết bị.',
      {
        type: 'pullQuote',
        quote:
          'Sự khác biệt giữa một sản phẩm chỉ hoạt động được và một sản phẩm xuất sắc thường nằm ở những câu hỏi mà người thiết kế không ngừng đặt ra.',
        attribution: 'Tư duy thiết kế kỹ thuật',
        tone: 'blue',
        pairedParagraph:
          'Quan trọng hơn, cần hiểu rằng thiết kế không chỉ là trang trí hay tạo ra vẻ ngoài hấp dẫn. Theo quan điểm của Steve Jobs, thiết kế chính là bản chất của một sản phẩm sáng tạo, được thể hiện qua toàn bộ cách sản phẩm tồn tại và phục vụ con người. Một sản phẩm đẹp nhưng không hoạt động hiệu quả chưa thể được xem là một thiết kế tốt.',
      },
      '---',
      '> Đam mê không thay thế kiến thức, cũng không bảo đảm mọi ý tưởng đều thành công — nhưng trong kỹ thuật, sự khác biệt giữa một sản phẩm chỉ hoạt động được và một sản phẩm xuất sắc thường nằm ở chính những câu hỏi mà người thiết kế không ngừng đặt ra.',
    ],
  },
  {
    id: 'ch2-system-thinking',
    category: 'Chương 2',
    detailCategory: 'Chương 2: Thiết kế kỹ thuật',
    title:
      'Đằng sau một sản phẩm tốt là cả một hệ thống tư duy: Vì sao thiết kế kỹ thuật không chỉ nằm ở hình thức?',
    sapo: 'Đằng sau mỗi sản phẩm vận hành ổn định là hàng loạt quyết định về tiêu chuẩn kỹ thuật, dung sai, độ bền, tính kinh tế và sự tích hợp hệ thống.',
    imageLabel: 'Thiết kế kỹ thuật và tư duy hệ thống',
    imageSrc: '/assets/aistudio/image_3e29da48.png',
    imageAlt: 'Kỹ sư sử dụng thước cặp điện tử kiểm tra kích thước và dung sai chi tiết gia công CNC',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      '> Một chiếc điện thoại đẹp sẽ không còn nhiều ý nghĩa nếu pin nhanh cạn hay màn hình dễ hỏng; một cỗ máy làm từ vật liệu đắt tiền cũng chưa phải sản phẩm thành công nếu chi phí bảo trì quá cao. Thiết kế kỹ thuật hiện đại chưa bao giờ chỉ nằm ở hình thức bên ngoài.',
      '---',
      'Đằng sau mỗi sản phẩm là hàng loạt quyết định liên quan đến chức năng, vật liệu, độ bền, độ chính xác, chi phí và khả năng chế tạo. Một nhà thiết kế giỏi không chỉ tìm cách làm cho sản phẩm hoạt động, mà còn phải dự đoán những vấn đề có thể xảy ra trước khi chúng xuất hiện.',
      'Điều đầu tiên cần quan tâm là các tiêu chuẩn kỹ thuật. Trong quá trình thiết kế, tiêu chuẩn đóng vai trò như một cơ sở để bảo đảm sản phẩm đáp ứng những yêu cầu nhất định. Các kích thước, dung sai, vật liệu và phương pháp chế tạo không thể được lựa chọn tùy ý. Việc tuân thủ tiêu chuẩn giúp hạn chế sai lệch, tạo thuận lợi cho quá trình sản xuất và bảo đảm khả năng tương thích giữa các bộ phận.',
      'Nhưng tuân thủ tiêu chuẩn mới chỉ là một phần của công việc. Một nhiệm vụ quan trọng khác là phòng ngừa sự cố. Thay vì đợi đến khi sản phẩm gặp vấn đề rồi mới tìm cách sửa chữa, người thiết kế cần dự đoán trước những tình huống có thể xảy ra và đưa ra giải pháp ngay trong giai đoạn thiết kế. Chẳng hạn, một sản phẩm có thể được chế tạo rất chính xác nhưng vẫn không đáp ứng nhu cầu thực tế nếu xác định sai chức năng cần thiết ngay từ đầu — do đó mỗi yêu cầu chức năng cần gắn với một thông số thiết kế cụ thể.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_3e29da48.png',
        alt: 'Kỹ sư đo kiểm kích thước chi tiết kim loại bằng thước cặp và đồng hồ so',
        caption:
          'Kiểm tra kích thước và dung sai giúp phát hiện sai lệch trước khi sản phẩm được đưa vào sử dụng.',
      },
      '---',
      'Vấn đề tiếp theo là hư hỏng trong môi trường hoạt động thực tế. Một trục quay có thể chịu tải trọng lớn, một khung máy có thể chịu rung động liên tục, trong khi các bộ phận khác phải đối mặt với nhiệt độ hoặc lực va đập. Thiết kế vì vậy cần hướng đến khả năng chịu đựng những tác động dự kiến — không đồng nghĩa với việc làm mọi bộ phận thật dày hay đắt tiền, mà là lựa chọn cấu trúc và thông số phù hợp với điều kiện làm việc.',
      'Bên cạnh độ bền, hiệu suất hoạt động cũng là một thách thức. Một cơ cấu có thể được lắp ráp hoàn chỉnh nhưng vẫn vận hành kém nếu các chi tiết không có dung sai phù hợp. Sai lệch kích thước quá lớn có thể khiến các bộ phận lắp ghép không chính xác, tạo ra ma sát không mong muốn hoặc làm giảm độ ổn định của hệ thống. Vì vậy, dung sai không phải là thông số phụ trên bản vẽ, mà là yếu tố ảnh hưởng trực tiếp đến chất lượng sản phẩm.',
      '---',
      'Một vấn đề khác thường xuất hiện trong các dự án kỹ thuật là chi phí. Một phương án có hiệu năng cao chưa chắc đã là phương án tốt nhất nếu nó đòi hỏi quá nhiều tiền bạc, thời gian hoặc công sức chế tạo. Thiết kế thông minh cần cân bằng giữa hiệu quả hoạt động và khả năng sản xuất thực tế.',
      'Đây chính là nơi tính kinh tế trở thành một phần quan trọng của tư duy kỹ thuật. Mỗi chi tiết đều có chi phí và mỗi chi tiết cần thực hiện một chức năng nhất định. Nếu một bộ phận không tạo ra giá trị tương xứng với chi phí mà nó gây ra, người thiết kế cần xem xét lại sự cần thiết của nó.',
      'Có một nghịch lý thường gặp trong thiết kế: nếu chỉ tập trung vào từng chi tiết riêng lẻ, người ta có thể đánh mất cái nhìn về toàn bộ hệ thống; ngược lại, nếu chỉ nhìn vào tổng thể mà không quan tâm đến những bộ phận cấu thành, những sai sót nhỏ có thể tích tụ thành vấn đề lớn. Người thiết kế cần đồng thời quan tâm đến cả khu rừng lẫn từng cái cây.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_f11ec35c.png',
        alt: 'Kỹ sư rà soát mô hình lắp ráp đa chi tiết 3D CAD trên màn hình máy tính',
        caption:
          'Thiết kế một sản phẩm đòi hỏi sự phối hợp giữa cấu trúc tổng thể và từng chi tiết kỹ thuật.',
      },
      '---',
      'Trong điều kiện ngân sách có giới hạn, mục tiêu không phải lúc nào cũng là đạt hiệu năng cao nhất bằng mọi giá, mà là đạt hiệu quả hoạt động tối đa trong phạm vi chi phí cho trước. Tư duy này cũng mở rộng đến việc tích hợp công nghệ: những khu vực giao thoa giữa các lĩnh vực kỹ thuật thường mở ra các giải pháp thú vị mà một công nghệ đơn lẻ khó đạt được.',
      'Điện thoại thông minh là một ví dụ tiêu biểu về tư duy tích hợp. Khi giới thiệu iPhone, Steve Jobs nhấn mạnh rằng thiết bị này kết hợp những chức năng vốn thuộc về các sản phẩm khác nhau: máy nghe nhạc, điện thoại và thiết bị truyền thông Internet. Giá trị của sản phẩm không chỉ nằm ở việc bổ sung thêm tính năng, mà ở cách chúng được kết hợp trong một hệ thống thống nhất.',
      '---',
      '> Hình thức và chức năng không bao giờ tách rời nhau: một sản phẩm kỹ thuật tốt không xuất hiện từ một ý tưởng đơn lẻ, mà là kết quả của cả một hệ thống tư duy cân bằng giữa độ bền, độ chính xác, khả năng chế tạo và giới hạn kinh tế.',
    ],
  },
  {
    id: 'ch2-frdparrc',
    category: 'Chương 2',
    detailCategory: 'Chương 2: Thiết kế kỹ thuật',
    title: 'Từ ý tưởng đến giải pháp: Vì sao kỹ sư cần một bản đồ để tổ chức tư duy?',
    sapo: 'Phương pháp FRDPARRC liên kết sáu thành phần cốt lõi — từ yêu cầu chức năng đến biện pháp phòng ngừa rủi ro — giúp quá trình sáng tạo kỹ thuật trở nên có cơ sở và kiểm soát được.',
    imageLabel: 'Phương pháp FRDPARRC trong thiết kế kỹ thuật',
    imageSrc: '/assets/aistudio/image_25cd595d.png',
    imageAlt: 'Bảng ma trận FRDPARRC tổ chức yêu cầu chức năng, thông số thiết kế, phân tích và rủi ro',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      '> Trong nhiều dự án kỹ thuật, trở ngại không phải là thiếu ý tưởng mà là có quá nhiều ý tưởng chưa được tổ chức và kiểm chứng. Khi thiếu một phương pháp hệ thống, người thiết kế dễ chọn phương án theo cảm tính hoặc bỏ sót những rủi ro quan trọng.',
      '---',
      'Một nhóm sinh viên được giao nhiệm vụ thiết kế một mẫu khung robot. Những ý tưởng nhanh chóng xuất hiện: dùng nhôm để giảm trọng lượng, bố trí bánh xe ở hai bên, đặt động cơ gần tâm khung hay thay đổi kích thước để tăng độ ổn định. Ai cũng có phương án riêng và tin rằng lựa chọn của mình hợp lý.',
      'Nhưng sau một thời gian thảo luận, nhóm bắt đầu lúng túng: ý tưởng nào thực sự đáp ứng yêu cầu, phương án nào có thể chế tạo, khung robot có đủ khả năng chịu tải hay không, chi phí thay đổi thế nào nếu đổi vật liệu, và nhóm sẽ xử lý ra sao khi phát sinh sự cố?',
      'Một trong những công cụ được giới thiệu trong Chương 2 để giải quyết bài toán này là FRDPARRC — phương pháp tổ chức các ý tưởng thiết kế thông qua sáu thành phần: Function Requirements, Design Parameters, Analysis, References, Risk và Countermeasures.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_4542c97a.png',
        alt: 'Giải thích sáu thành phần của phương pháp FRDPARRC bằng tiếng Việt',
        caption:
          'Sáu thành phần của phương pháp FRDPARRC giúp nhận diện cơ hội phát sinh ý tưởng mới và tổ chức quá trình giải quyết vấn đề.',
        fit: 'contain',
      },
      '---',
      'FRDPARRC bắt đầu bằng Function Requirements (yêu cầu chức năng) — danh sách những chức năng độc lập mà sản phẩm phải thực hiện. Với một khung robot, yêu cầu có thể là nâng đỡ các bộ phận, bảo đảm vị trí lắp động cơ, duy trì độ ổn định và bảo vệ chi tiết bên trong. Yêu cầu chức năng cần được diễn đạt rõ ràng để có thể kiểm tra và đánh giá, thay vì chỉ nói chung chung rằng thiết kế phải tốt hoặc phải chắc chắn.',
      'Sau khi xác định yêu cầu, người thiết kế chuyển sang Design Parameters (thông số thiết kế) — các biện pháp hoặc đặc điểm kỹ thuật cụ thể nhằm thực hiện từng yêu cầu chức năng, chẳng hạn vật liệu, kích thước tiết diện, chiều dày và kết cấu gia cường. Mỗi yêu cầu chức năng cần gắn với các thông số tương ứng bằng từ ngữ, bản vẽ hoặc mô hình kỹ thuật.',
      'Tuy nhiên, một thông số được đề xuất chưa đồng nghĩa với việc nó đã khả thi. Đó là lý do Analysis (phân tích) trở thành thành phần tiếp theo: người thiết kế phải chứng minh các thông số lựa chọn đáp ứng được yêu cầu về thời gian chuyển động, công suất, ứng suất, khả năng chế tạo hay hiệu quả kinh tế thông qua phương trình, thí nghiệm và bảng biểu.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_c4ac6e0a.png',
        alt: 'Bảng cấu trúc sáu cột của phương pháp FRDPARRC kèm hình thức thể hiện từng cột',
        caption:
          'Cấu trúc bảng FRDPARRC liên kết từng yêu cầu chức năng với thông số thiết kế, phương pháp phân tích, tài liệu tham khảo và đánh giá rủi ro.',
        fit: 'contain',
      },
      '---',
      'Bên cạnh phân tích, References (tài liệu tham khảo) cung cấp cơ sở phát triển ý tưởng từ bài báo, bằng sáng chế, tài liệu chuyên ngành, website hay trao đổi với người có kinh nghiệm để tránh lặp lại sai lầm đã được nhận diện trước đó.',
      'Ngay cả khi đã có phân tích và tham khảo, một phương án vẫn tiềm ẩn rủi ro. Thành phần Risk yêu cầu phân loại mức độ rủi ro của từng thông số thành thấp, trung bình hoặc cao — ví dụ vật liệu nhẹ hơn nhưng khó gia công, hay kết cấu gọn hơn nhưng gây khó khăn khi lắp ráp và bảo trì.',
      'Thành phần cuối cùng là Countermeasures (biện pháp khắc phục) nhằm giảm thiểu khả năng xảy ra cũng như tác động của từng rủi ro đã chỉ ra, chẳng hạn thay đổi vật liệu, bổ sung gân gia cường hoặc thử nghiệm bổ sung.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_25cd595d.png',
        alt: 'Ví dụ bảng FRDPARRC hoàn chỉnh áp dụng cho một thiết kế cơ khí thực tế',
        caption:
          'Bảng FRDPARRC hoàn chỉnh giúp lưu giữ và kiểm soát các quyết định trong suốt quá trình phát triển thiết kế.',
        fit: 'contain',
      },
      '---',
      'Giá trị lớn nhất của FRDPARRC không nằm ở việc điền đủ một bảng biểu, mà ở khả năng làm lộ ra những khoảng trống trong suy nghĩ: một ý tưởng hấp dẫn nhưng chưa có phân tích khả thi, một thông số đạt yêu cầu nhưng tiềm ẩn rủi ro gia công, hay một giải pháp hiệu quả nhưng vượt quá ngân sách. Công cụ này không giới hạn trí tưởng tượng, mà đặt ý tưởng vào một cấu trúc có cơ sở để biến thành giải pháp thực tế.',
      {
        type: 'processDiagram',
        title: 'Chuỗi tư duy 6 bước FRDPARRC',
        subtitle:
          'Mỗi yêu cầu chức năng được liên kết trực tiếp tới thông số, kiểm chứng và phòng ngừa rủi ro',
        theme: 'light',
        steps: [
          {
            badge: 'FR',
            label: 'Yêu cầu chức năng',
            detail: 'Những nhiệm vụ độc lập sản phẩm bắt buộc phải thực hiện.',
          },
          {
            badge: 'DP',
            label: 'Thông số thiết kế',
            detail: 'Vật liệu, kích thước và cơ cấu cụ thể đáp ứng yêu cầu.',
          },
          {
            badge: 'A',
            label: 'Phân tích khả thi',
            detail: 'Chứng minh bằng phương trình, mô phỏng hoặc thử nghiệm.',
          },
          {
            badge: 'R',
            label: 'Tài liệu tham khảo',
            detail: 'Bài báo, bằng sáng chế và kinh nghiệm chuyên môn.',
          },
          {
            badge: 'R',
            label: 'Đánh giá rủi ro',
            detail: 'Phân loại rủi ro gia công, lắp ghép ở mức thấp, trung bình, cao.',
          },
          {
            badge: 'C',
            label: 'Biện pháp khắc phục',
            detail: 'Điều chỉnh vật liệu, thêm gân tăng cứng hoặc thử nghiệm bổ sung.',
          },
        ],
      },
      '---',
      '> Trong kỹ thuật, sáng tạo chỉ thực sự tạo ra giá trị khi mỗi ý tưởng được đặt trong mối liên hệ chặt chẽ với chức năng, thông số, phân tích khả thi và kế hoạch kiểm soát rủi ro.',
    ],
  },
  {
    id: 'ch2-ten-steps',
    category: 'Chương 2',
    detailCategory: 'Chương 2: Thiết kế kỹ thuật',
    title:
      'Mười bước biến một ý tưởng thành sản phẩm thực tế: Hành trình phía sau mỗi bản thiết kế',
    sapo: 'Từ đánh giá nguồn lực, phác thảo ý tưởng đến bản vẽ chi tiết và thử nghiệm thực tế: bốn giai đoạn và mười bước định hình một sản phẩm kỹ thuật.',
    imageLabel: 'Quy trình 10 bước thiết kế kỹ thuật',
    imageSrc: '/assets/aistudio/image_c18e6da2.png',
    imageAlt: 'Nhóm kỹ sư thảo luận quy trình thiết kế từ phân tích DFM đến mô hình sản phẩm trên bảng trắng',
    readTime: '7 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      '> Một bản vẽ kỹ thuật hoàn chỉnh dễ khiến người xem nghĩ rằng sản phẩm đã gần như hoàn thiện. Thực tế, bản vẽ chỉ là một chặng trong quy trình bốn giai đoạn gồm mười bước đan xen nhau — từ lúc hiểu đúng vấn đề cho tới khi bàn giao tài liệu vận hành.',
      '---',
      'Trước khi một thiết bị có thể được chế tạo và đưa vào sử dụng, người thiết kế phải lần lượt đi qua việc đánh giá nguồn lực, làm rõ yêu cầu, xây dựng chiến lược, phát triển khái niệm, tách module, lập bản vẽ lắp và bản vẽ chi tiết, rồi đưa ra thử nghiệm thực tế. Theo Chương 2, toàn bộ hành trình này được tổ chức thành 4 giai đoạn với 10 bước như bảng tổng quan dưới đây:',
      {
        type: 'steps',
        title: 'Tổng quan quy trình 10 bước thiết kế kỹ thuật',
        subtitle: '4 giai đoạn phát triển sản phẩm',
        phases: [
          {
            phaseLabel: 'Giai đoạn 1 · Khám phá',
            steps: [
              {
                number: 1,
                title: 'Xác định các nguồn lực sẵn có',
                summary:
                  'Đánh giá nhân lực, thời gian, kinh phí, thiết bị và vật liệu để định rõ phạm vi dự án.',
              },
              {
                number: 2,
                title: 'Xem xét vấn đề và yêu cầu',
                summary:
                  'Làm rõ mục tiêu kỹ thuật, quy chuẩn, môi trường làm việc và các giới hạn ràng buộc.',
              },
            ],
          },
          {
            phaseLabel: 'Giai đoạn 2 · Thử nghiệm',
            steps: [
              {
                number: 3,
                title: 'Tạo lập chiến lược tiếp cận',
                summary:
                  'Hình dung dòng chuyển động, năng lượng và dữ liệu; đặt câu hỏi Ai, Cái gì, Tại sao, Ở đâu, Như thế nào và thử nghiệm sơ bộ.',
              },
            ],
          },
          {
            phaseLabel: 'Giai đoạn 3 · Hình thành',
            steps: [
              {
                number: 4,
                title: 'Phát triển khái niệm và phác thảo',
                summary:
                  'Chuyển chiến lược trừu tượng thành hình dạng, cấu tạo cụ thể qua phác thảo và chọn phương án khả thi nhất.',
              },
            ],
          },
          {
            phaseLabel: 'Giai đoạn 4 · Thiết kế chi tiết, chế tạo & thử nghiệm',
            steps: [
              {
                number: 5,
                title: 'Phát triển các module chức năng',
                summary:
                  'Tổ chức sản phẩm thành các khối chức năng độc lập bằng sơ đồ, phân tích và mô hình.',
              },
              {
                number: 6,
                title: 'Nghiên cứu từng bộ phận cấu thành',
                summary:
                  'Xác định kích thước, hình dạng, vật liệu và thông số kỹ thuật chi tiết cho từng chi tiết.',
              },
              {
                number: 7,
                title: 'Duyệt bản vẽ lắp và khả năng chế tạo',
                summary:
                  'Kiểm tra sự ăn khớp giữa các cụm chi tiết và tính khả thi của công nghệ gia công.',
              },
              {
                number: 8,
                title: 'Lập bản vẽ chi tiết',
                summary:
                  'Hoàn thiện hồ sơ kích thước và dung sai cho từng bộ phận để đưa vào sản xuất.',
              },
              {
                number: 9,
                title: 'Chế tạo, kiểm tra và hiệu chỉnh',
                summary:
                  'Đưa nguyên mẫu ra kiểm chứng thực tế nhằm phát hiện sai lệch lắp ráp hoặc vận hành.',
              },
              {
                number: 10,
                title: 'Biên soạn tài liệu kỹ thuật',
                summary:
                  'Hệ thống hóa hồ sơ kỹ thuật, hướng dẫn sử dụng, vận hành và bảo trì sản phẩm.',
              },
            ],
          },
        ],
      },
      '---',
      {
        type: 'step-heading',
        number: 1,
        title: 'Xác định các nguồn lực sẵn sàng cho việc thiết kế',
      },
      'Hành trình bắt đầu từ việc nhìn thẳng vào những gì nhóm đang có trong tay: con người, thời gian, kinh phí, thiết bị và vật liệu. Việc đánh giá nguồn lực ngay từ đầu giúp nhóm xác định đúng phạm vi công việc khả thi và tránh xây dựng một phương án vượt quá khả năng thực hiện.',
      {
        type: 'step-heading',
        number: 2,
        title: 'Xem xét vấn đề và hiểu rõ yêu cầu thực hiện',
      },
      'Không chỉ có mục tiêu kỹ thuật, mỗi dự án còn chịu tác động từ các điều kiện vận hành, luật lệ và giới hạn cụ thể về kích thước, môi trường làm việc hoặc công nghệ sẵn có. Nếu hiểu sai vấn đề ở bước này, toàn bộ công sức ở các chặng sau có thể đi lệch hướng. Giai đoạn khám phá vì thế không mang tính hình thức, mà là nền tảng xác định đúng bài toán cần giải.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_c18e6da2.png',
        alt: 'Nhóm kỹ sư trao đổi xác định mục tiêu, giới hạn và phân tích thiết kế quanh bảng trắng',
        caption:
          'Giai đoạn khám phá giúp nhóm thiết kế xác định mục tiêu, nguồn lực và giới hạn của dự án.',
      },
      '---',
      {
        type: 'step-heading',
        number: 3,
        title: 'Đề xuất chiến lược khả dĩ và thử nghiệm sơ bộ',
      },
      'Bước sang giai đoạn thử nghiệm, người thiết kế cần hình dung toàn bộ quá trình hoạt động của hệ thống — theo dõi chuyển động, dòng dữ liệu và dòng năng lượng từ đầu đến cuối hoặc ngược lại — đồng thời liên tục đặt câu hỏi Ai? Cái gì? Tại sao? Ở đâu? Như thế nào? Kết hợp cùng các phân tích và thí nghiệm đơn giản, bước này giúp loại bỏ sớm các chiến lược kém hiệu quả thay vì mặc nhiên tin vào ý tưởng đầu tiên.',
      {
        type: 'step-heading',
        number: 4,
        title: 'Phát triển khái niệm và phác thảo thiết bị cụ thể',
      },
      'Ở giai đoạn hình thành, chiến lược đã chọn được cụ thể hóa thành hình dạng và cấu tạo thông qua từ ngữ, phân tích và các bản phác thảo tay. Sau khi kiểm chứng sơ bộ tính hiệu quả và khả thi, những khái niệm tốt nhất được chọn để phát triển thành cấu trúc hoàn chỉnh.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_40bd6fa6.png',
        alt: 'Các bản phác thảo ý tưởng sản phẩm với nhiều góc nhìn cấu tạo và chú thích kỹ thuật',
        caption:
          'Các bản phác thảo giúp chuyển chiến lược thiết kế thành những ý tưởng thiết bị cụ thể.',
        fit: 'contain',
      },
      '---',
      {
        type: 'step-heading',
        number: 5,
        title: 'Phát triển các module bằng sơ đồ và mô hình',
      },
      'Bước vào giai đoạn thiết kế chi tiết, hệ thống được chia thành những module chức năng rõ ràng thông qua mô tả, phân tích chi tiết, sơ đồ và mô hình. Việc chia module giúp nhiều thành viên dễ dàng nghiên cứu song song và cô lập vấn đề khi tinh chỉnh.',
      {
        type: 'step-heading',
        number: 6,
        title: 'Nghiên cứu cụ thể từng bộ phận cấu thành',
      },
      'Từ khung module tổng thể, người thiết kế đi sâu vào từng bộ phận để xác định chính xác kích thước, hình dạng, vật liệu và các đặc điểm kỹ thuật đáp ứng điều kiện chịu tải hoặc lắp ghép.',
      {
        type: 'step-heading',
        number: 7,
        title: 'Xem xét, duyệt bản vẽ lắp và khả năng công nghệ chế tạo',
      },
      'Một thiết kế hợp lý trên lý thuyết vẫn có thể bất khả thi hoặc quá tốn kém trên máy gia công thực tế. Kiểm tra bản vẽ lắp và khả năng công nghệ chế tạo giúp phát hiện sớm những chi tiết bất hợp lý trước khi bước vào sản xuất.',
      {
        type: 'step-heading',
        number: 8,
        title: 'Lập các bản vẽ chi tiết phục vụ gia công và lắp ráp',
      },
      'Mỗi bộ phận được thể hiện đầy đủ trên bản vẽ chi tiết với kích thước, dung sai và yêu cầu kỹ thuật cụ thể làm cơ sở trực tiếp cho xưởng gia công và lắp ráp.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_bc2a1e98.png',
        alt: 'Bản vẽ lắp phân rã 3D thể hiện vị trí liên kết các cụm chi tiết cơ khí',
        caption:
          'Bản vẽ lắp và bản vẽ chi tiết là cơ sở quan trọng để chuyển thiết kế sang chế tạo.',
      },
      '---',
      {
        type: 'step-heading',
        number: 9,
        title: 'Chế tạo nguyên mẫu, kiểm tra thực tế và hiệu chỉnh',
      },
      'Trong giai đoạn cuối cùng, các quyết định thiết kế được đưa ra môi trường thực tế để kiểm chứng. Một chi tiết tính đúng lý thuyết vẫn có thể gặp vướng mắc khi lắp ráp, hoặc chưa đạt hiệu suất như kỳ vọng khi vận hành liên tục. Thử nghiệm giúp phát hiện và hiệu chỉnh kịp thời mọi sai lệch.',
      {
        type: 'step-heading',
        number: 10,
        title: 'Biên soạn tài liệu kỹ thuật và hướng dẫn vận hành',
      },
      'Khi sản phẩm đã qua kiểm tra đạt yêu cầu, toàn bộ thông tin thiết kế, thông số vận hành và quy trình bảo trì được ghi chép có hệ thống để phục vụ việc sử dụng lâu dài.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_1e0edb33.png',
        alt: 'Kỹ sư lắp đặt và thử nghiệm cụm truyền động cơ khí trên băng thử trong phòng thí nghiệm',
        caption:
          'Chế tạo và thử nghiệm giúp kiểm chứng những quyết định được đưa ra trong quá trình thiết kế.',
      },
      '---',
      'Điều quan trọng là mười bước này không đi theo một đường thẳng cứng nhắc. Một kết quả thử nghiệm ở bước chín có thể khiến nhóm quay lại điều chỉnh module ở bước năm, hoặc giới hạn kinh phí phát sinh có thể làm thay đổi chiến lược từ bước ba. Chính vòng lặp kiểm tra và hoàn thiện liên tục ấy mới tạo nên một sản phẩm kỹ thuật thực sự đáng tin cậy.',
      '---',
      '> Một sản phẩm tốt không phải là sản phẩm chưa từng trải qua chỉnh sửa, mà là sản phẩm được hoàn thiện qua quá trình đánh giá và thử nghiệm có hệ thống.',
    ],
  },
  DELL_ASUS_POST,
  {
    id: 'ch3-learn-how-to-learn',
    category: 'Chương 3',
    detailCategory: 'Chương 3: Phương pháp học tập hiệu quả',
    title: 'Bước vào đại học, sinh viên phải học lại cách học',
    sapo: 'Đại học mở ra một thế giới kiến thức rộng lớn hơn, nhưng cũng đặt người học trước một thử thách ít được chuẩn bị: không còn ai theo sát từng bài tập, nhắc nhở từng kỳ kiểm tra hay sắp xếp mọi thứ thay mình. Từ phổ thông lên giảng đường, điều thay đổi không chỉ là lượng kiến thức mà còn là cách một người phải chịu trách nhiệm với việc học của chính mình.',
    imageLabel: 'Bốn trụ cột giáo dục của UNESCO',
    imageSrc: '/assets/aistudio/image_f112fa62.png',
    imageAlt: 'Sơ đồ bốn trụ cột giáo dục của UNESCO: Học để biết, Học để làm, Học để khẳng định bản thân, Học để chung sống',
    imageFit: 'contain',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Ngày đầu tiên bước vào giảng đường, nhiều sinh viên mang theo một suy nghĩ quen thuộc: chỉ cần chăm chỉ nghe giảng, ghi chép đầy đủ và ôn bài trước kỳ thi là có thể đạt kết quả tốt. Nhưng sau vài tuần, lịch học dày đặc, bài tập nhóm, đồ án, tài liệu tham khảo và những môn học hoàn toàn mới bắt đầu khiến kế hoạch ấy trở nên khó thực hiện.',
      'Khác biệt lớn nhất giữa phổ thông và đại học không đơn thuần nằm ở số lượng môn học. Theo nội dung Chương 3, mỗi môn học ở đại học có thể đại diện cho một lĩnh vực kiến thức tương đối hoàn chỉnh. Sinh viên không chỉ nghe giảng mà còn phải làm bài tập, thí nghiệm, thực hành, tiểu luận, thuyết trình và nghiên cứu. Mỗi hoạt động đòi hỏi một cách tiếp cận khác nhau.',
      'Ở phổ thông, giáo viên thường hướng dẫn khá cụ thể những gì học sinh cần học và cách chuẩn bị cho bài kiểm tra. Tại đại học, trách nhiệm ấy dần chuyển sang người học. Giảng viên không còn là nguồn kiến thức duy nhất mà còn đóng vai trò cố vấn, người tổ chức hoạt động học tập và người hướng dẫn sinh viên tự nghiên cứu. Sinh viên vì thế phải chủ động tìm tài liệu, đặt câu hỏi, trao đổi với bạn học và tự đánh giá mức độ hiểu bài của mình.',
      'Sự thay đổi này được thể hiện rõ trong học chế tín chỉ. Một tín chỉ không chỉ là số giờ sinh viên có mặt trong lớp. Nó còn bao gồm thời gian thực hành, làm việc dưới sự hướng dẫn của giảng viên, chuẩn bị bài, tự học và nghiên cứu. Nói cách khác, thời gian trên giảng đường chỉ là một phần của quá trình học tập.',
      'Đây cũng là lý do một sinh viên có thể cảm thấy mình đã học đủ số giờ trên lớp nhưng vẫn không theo kịp chương trình. Nếu không dành thời gian đọc trước tài liệu, hoàn thành bài tập và ôn lại kiến thức, phần học tập còn lại sẽ nhanh chóng trở thành một khoản nợ.',
      '---',
      '### Những khó khăn không chỉ nằm ở kiến thức',
      'Tài liệu liệt kê 16 vấn đề sinh viên thường gặp, từ trí nhớ kém, trì hoãn, lười biếng, mất tập trung cho đến sợ thi cử, thiếu động lực và áp lực gia đình. Đằng sau danh sách ấy là một thực tế: khó khăn trong học tập hiếm khi chỉ xuất phát từ việc một môn học quá khó.',
      'Một sinh viên có thể hiểu bài giảng nhưng không biết cách ghi nhớ. Người khác có thể chăm chỉ nhưng thường xuyên trì hoãn cho đến sát hạn nộp bài. Có người dành nhiều giờ ngồi trước sách vở nhưng liên tục bị điện thoại, trò chơi điện tử hoặc những cuộc trò chuyện làm gián đoạn.',
      'Những vấn đề này thường kết hợp với nhau. Khi không hiểu bài, sinh viên dễ mất hứng thú. Khi mất hứng thú, họ trì hoãn việc học. Khi công việc bị dồn lại, áp lực tăng lên và khả năng tập trung càng giảm.',
      'Tài liệu cũng chỉ ra một số yếu tố có thể ảnh hưởng đến quá trình học tập, như thói quen tiếp nhận kiến thức thụ động, khả năng tự học chưa tốt, kỹ năng làm việc nhóm còn hạn chế và tâm lý quá coi trọng điểm số, bằng cấp. Đây là những nhận xét được nêu trong bài giảng, không nên xem như kết luận áp dụng cho mọi sinh viên. Tuy nhiên, chúng gợi ra một câu hỏi đáng suy nghĩ: liệu chúng ta đang học để thực sự hiểu và vận dụng kiến thức, hay chỉ đang tìm cách vượt qua kỳ thi tiếp theo?',
      '---',
      '### Bốn trụ cột của việc học',
      'Một cách nhìn rộng hơn về giáo dục được tài liệu dẫn lại từ UNESCO: học để biết, học để làm, học để làm người và học để chung sống.',
      'Bốn mục tiêu này cho thấy việc học không thể chỉ được đo bằng lượng kiến thức ghi nhớ. Một sinh viên có thể giải được bài toán nhưng vẫn cần học cách phối hợp với người khác để hoàn thành một dự án. Có thể đạt điểm cao trong một môn học nhưng vẫn phải rèn luyện khả năng thích nghi khi môi trường làm việc thay đổi.',
      'Học để biết giúp người học xây dựng nền tảng tri thức. Học để làm đưa kiến thức vào thực tiễn. Học để làm người liên quan đến sự trưởng thành, trách nhiệm và khả năng phát triển bản thân. Còn học để chung sống nhấn mạnh năng lực hợp tác, tôn trọng sự khác biệt và tham gia vào cộng đồng.',
      {
        type: 'statSpotlight',
        headline: '4 Trụ cột · 16 Trở ngại',
        label: 'Bức tranh tự học ở đại học (UNESCO & Chương 3)',
        summary:
          'Từ phổ thông lên giảng đường, sinh viên đối diện 16 thói quen cản trở thường gặp và cần chuyển từ học thụ động sang rèn luyện đồng thời 4 trụ cột năng lực.',
        theme: 'yellow',
        items: [
          { value: 'Học để biết', caption: 'Xây dựng nền tảng tri thức và tư duy độc lập' },
          { value: 'Học để làm', caption: 'Chuyển hóa lý thuyết thành năng lực thực hành' },
          { value: 'Khẳng định bản thân', caption: 'Rèn trách nhiệm, kỷ luật và trưởng thành cá nhân' },
          { value: 'Học để chung sống', caption: 'Hợp tác, tôn trọng khác biệt và làm việc tập thể' },
        ],
      },
      {
        type: 'figure',
        src: '/assets/aistudio/image_f112fa62.png',
        alt: 'Sơ đồ bốn trụ cột giáo dục của UNESCO gồm Học để biết, Học để làm, Học để khẳng định bản thân và Học để chung sống',
        caption:
          'Bốn trụ cột giáo dục của UNESCO cho thấy việc học ở đại học không chỉ dừng lại ở ghi nhớ kiến thức.',
        fit: 'contain',
      },
      'Nhìn từ góc độ đó, đại học không chỉ là nơi tích lũy kiến thức chuyên ngành. Đây còn là môi trường để sinh viên học cách tự tổ chức cuộc sống, chịu trách nhiệm với lựa chọn của mình và làm việc cùng những người có cách suy nghĩ khác nhau.',
      'Một trong những yêu cầu quan trọng nhất của giai đoạn này là chuyển từ học tập thụ động sang học tập chủ động. Thay vì chờ giảng viên cung cấp toàn bộ kiến thức, sinh viên cần biết chuẩn bị bài trước, tìm kiếm thông tin, đặt câu hỏi và tự kiểm tra mức độ hiểu bài.',
      'Sự chuyển đổi ấy không diễn ra trong một ngày. Nó bắt đầu từ những việc nhỏ: đọc tài liệu trước buổi học, hoàn thành bài tập đúng hạn, chủ động hỏi khi chưa hiểu và dành thời gian ôn tập ngay cả khi chưa có kỳ thi trước mắt.',
      'Đại học có thể cung cấp cho sinh viên một chương trình đào tạo, giảng viên và hệ thống tài liệu. Nhưng việc biến những nguồn lực ấy thành năng lực thực sự vẫn là công việc mà mỗi người phải tự thực hiện.',
    ],
  },
  {
    id: 'ch3-study-right',
    category: 'Chương 3',
    detailCategory: 'Chương 3: Phương pháp học tập hiệu quả',
    title: 'Không phải học lâu hơn, mà là học đúng cách',
    sapo: 'Có những sinh viên dành hàng giờ bên bàn học nhưng kết quả vẫn không như mong đợi. Trong khi đó, một số người dường như tiếp thu nhanh hơn, nhớ lâu hơn và có nhiều thời gian cho những hoạt động khác. Khác biệt đôi khi không nằm ở số giờ ngồi trước sách vở, mà nằm ở cách họ tổ chức việc học.',
    imageLabel: 'Phương pháp học đúng cách ở đại học',
    imageSrc: '/assets/aistudio/image_07ce0b2f.png',
    imageAlt: 'Sinh viên đang tập trung ghi chép và giải bài tập với giáo trình cùng laptop trong thư viện',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một buổi tối trước kỳ thi, thư viện thường xuất hiện hai kiểu sinh viên. Một người mở sách, đọc liên tục từ đầu đến cuối, thỉnh thoảng đánh dấu vài đoạn quan trọng. Người còn lại chia tài liệu thành từng phần, xác định ý chính, ghi chú, tự đặt câu hỏi rồi giải bài tập để kiểm tra mức độ hiểu bài.',
      'Cả hai đều đang học. Nhưng cách thứ hai tạo ra nhiều cơ hội hơn để người học chủ động xử lý thông tin, thay vì chỉ tiếp nhận nó.',
      'Chương 3 mô tả một quá trình học tập hiệu quả gồm chín bước, bắt đầu từ việc xác định mục tiêu và lập kế hoạch, tiếp đến là hành động kiên định, đọc, ghi chú, ghi nhớ, vận dụng lý thuyết, chuẩn bị cho kỳ thi và cuối cùng là làm bài thi. Điểm đáng chú ý là quá trình này bắt đầu từ ngày đầu tiên của học kỳ, chứ không phải vài ngày trước khi thi.',
      'Đó là một thay đổi quan trọng trong tư duy học tập. Nếu chỉ bắt đầu học khi kỳ thi đến gần, sinh viên buộc phải xử lý một khối lượng kiến thức lớn trong thời gian ngắn. Nếu học đều đặn từ đầu kỳ, mỗi lần học chỉ cần giải quyết một phần nhỏ hơn.',
      '---',
      '### Bộ não cần được sử dụng',
      'Tài liệu dành một phần đáng kể để nói về khả năng rèn luyện trí não. Thay vì xem trí thông minh như một năng lực cố định, bài giảng khuyến khích sinh viên thường xuyên thử thách bản thân bằng những vấn đề khó, đặt câu hỏi và luyện tập những kỹ năng chưa thành thạo.',
      'Có thể hình dung việc học Toán như quá trình tập luyện thể lực. Một người không thể mong cơ bắp khỏe lên nếu chỉ thực hiện những động tác quen thuộc, cũng như khó tiến bộ nếu chỉ làm đi làm lại những bài tập đã biết cách giải. Khi gặp một dạng bài mới, phải suy nghĩ, thử nghiệm và sửa sai, người học có cơ hội phát triển năng lực giải quyết vấn đề.',
      'Tuy nhiên, không nên hiểu điều này theo nghĩa cứ học càng nhiều thì trí thông minh tự động tăng lên, hay những mô tả về số lượng nơron trong slide là các con số khoa học đã được kiểm chứng. Điều có giá trị thực tiễn hơn là nguyên tắc luyện tập có chủ đích: chọn một kỹ năng cụ thể, thực hành thường xuyên, nhận phản hồi và điều chỉnh cách làm.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_07ce0b2f.png',
        alt: 'Sinh viên đang tập trung học tập, đọc tài liệu và ghi chú tại thư viện',
        caption:
          'Luyện tập có chủ đích và chủ động tự kiểm tra giúp việc học đạt chiều sâu thay vì chỉ đọc lướt.',
      },
      'Bài giảng cũng giới thiệu hình ảnh hai bán cầu não, trong đó não trái gắn với lập luận, ngôn ngữ và phân tích, còn não phải gắn với sáng tạo, âm nhạc, màu sắc và tưởng tượng. Cách minh họa này thường được dùng để khuyến khích người học kết hợp chữ viết, hình ảnh và liên tưởng khi tiếp nhận kiến thức.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_4c050889.png',
        alt: 'Hình minh họa các đặc trưng thường gắn với não trái và não phải',
        caption:
          'Hình minh họa hai bán cầu não gợi ý việc kết hợp phân tích logic cùng hình ảnh, màu sắc và liên tưởng.',
        fit: 'contain',
      },
      'Cần lưu ý rằng cách chia cứng nhắc con người thành nhóm chỉ thiên về não trái hoặc não phải không phản ánh đầy đủ hiểu biết hiện đại về hoạt động của não bộ. Trong thực tế, nhiều nhiệm vụ học tập huy động các mạng lưới thần kinh ở nhiều vùng não cùng lúc. Dù vậy, thông điệp về việc kết hợp nhiều hình thức học vẫn hữu ích: đọc, viết, hình dung, thảo luận và thực hành có thể bổ trợ cho nhau.',
      '---',
      '### Chín bước, nhưng không phải chín công thức máy móc',
      'Quy trình chín bước trong bài giảng có thể được xem như một vòng lặp. Mục tiêu giúp sinh viên biết mình cần đạt điều gì. Kế hoạch xác định thời điểm và cách thức thực hiện. Việc học diễn ra thông qua đọc, ghi chú và ghi nhớ. Sau đó, kiến thức được kiểm tra bằng bài tập và các tình huống vận dụng.',
      {
        type: 'processDiagram',
        title: 'Vòng lặp 9 bước học tập hiệu quả',
        subtitle:
          'Bắt đầu từ ngày đầu tiên của học kỳ và liên tục rút kinh nghiệm sau mỗi lần kiểm tra',
        theme: 'dark',
        steps: [
          {
            badge: '1–2',
            label: 'Mục tiêu & Kế hoạch',
            detail: 'Xác định điều cần đạt và phân bổ thời gian ngay từ đầu kỳ.',
          },
          {
            badge: '3',
            label: 'Hành động kiên định',
            detail: 'Đọc trước bài, đặt câu hỏi trên lớp và ôn lại ngay trong ngày.',
          },
          {
            badge: '4–6',
            label: 'Đọc, Ghi chú & Ghi nhớ',
            detail: 'Lọc ý chính thành sơ đồ và liên kết thông tin dễ truy xuất.',
          },
          {
            badge: '7',
            label: 'Vận dụng lý thuyết',
            detail: 'Giải bài tập và luyện tập có chủ đích các dạng bài chưa thạo.',
          },
          {
            badge: '8–9',
            label: 'Chuẩn bị & Làm bài thi',
            detail: 'Hệ thống hóa kiến thức, thi bình tĩnh và phân tích lỗi sai.',
          },
        ],
        loopNote:
          'Mỗi lỗi sai sau bài kiểm tra giúp điều chỉnh lại mục tiêu, kế hoạch và phương pháp cho vòng học kế tiếp.',
      },
      'Kết quả kiểm tra lại cung cấp thông tin để điều chỉnh phương pháp. Nếu thường xuyên sai ở một dạng bài, sinh viên cần tìm hiểu nguyên nhân thay vì chỉ xem điểm số là kết quả cuối cùng.',
      'Đây cũng là tinh thần của phần bài giảng về việc rút kinh nghiệm sau khi mắc lỗi. Một lỗi sai có thể cho thấy người học chưa hiểu khái niệm, đọc nhầm đề, thiếu bước lập luận hoặc chưa biết cách phân bổ thời gian. Nếu xác định được nguyên nhân và sửa đúng chỗ, bài kiểm tra trở thành một công cụ học tập thay vì chỉ là một lần đánh giá.',
      'Sự kiên định cũng được nhấn mạnh. Đọc bài trước khi đến lớp, tập trung đặt câu hỏi, ôn lại kiến thức trong ngày và hoàn thành bài tập trước buổi học tiếp theo là những hành động nhỏ nhưng có tính tích lũy.',
      'Học hiệu quả không nhất thiết là học liên tục đến khuya. Đó là quá trình có mục tiêu, có phương pháp, có thực hành và có điều chỉnh. Một buổi học được tổ chức tốt có thể tạo ra nhiều giá trị hơn nhiều giờ đọc sách trong trạng thái mất tập trung.',
    ],
  },
  {
    id: 'ch3-active-reading',
    category: 'Chương 3',
    detailCategory: 'Chương 3: Phương pháp học tập hiệu quả',
    title: 'Đọc hết một cuốn sách không có nghĩa là đã hiểu nó',
    sapo: 'Trong thời đại thông tin, sinh viên không thiếu tài liệu. Giáo trình, sách tham khảo, bài báo khoa học và hàng nghìn kết quả tìm kiếm luôn nằm trong tầm tay. Thách thức thực sự là làm sao tìm được điều quan trọng, hiểu được mối liên hệ giữa các ý và biến những gì đã đọc thành kiến thức có thể sử dụng.',
    imageLabel: 'Đọc hiểu và sơ đồ tư duy',
    imageSrc: '/assets/aistudio/image_05d62331.png',
    imageAlt: 'Một cuốn sổ vẽ sơ đồ tư duy nhiều màu sắc giúp hệ thống hóa nội dung bài học',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một sinh viên mở giáo trình và bắt đầu đọc từ trang đầu tiên. Mỗi câu đều được gạch chân, nhiều đoạn được tô màu, một số trang còn được chép lại gần như nguyên văn vào vở. Sau vài giờ, cuốn sách đã được đánh dấu dày đặc. Nhưng khi đóng sách lại và tự hỏi nội dung chính là gì, người học có thể chỉ nhớ được một vài chi tiết rời rạc.',
      'Đó là nghịch lý của việc đọc: tiếp xúc với nhiều thông tin không đồng nghĩa với việc nắm bắt được thông tin.',
      'Chương 3 đặt mục tiêu cho phương pháp đọc hiệu quả là giúp người học nắm bắt và hiểu nội dung, đồng thời cải thiện tốc độ đọc và khả năng tập trung. Tài liệu khuyến khích sinh viên không đọc từng chữ một mà tập trung tìm ý chính, nhận diện từ khóa và quan sát cấu trúc của văn bản.',
      'Một trong những thói quen được đề cập là đọc đi đọc lại cùng một đoạn, đọc bằng cách mấp máy môi hoặc chỉ tập trung vào từng từ riêng lẻ. Những thói quen này có thể khiến việc đọc trở nên chậm và ngắt quãng. Thay vào đó, người đọc nên tập nhận diện các cụm từ, xác định ý chính và sử dụng bút chì làm vật dẫn đường để giữ nhịp đọc.',
      'Bài giảng cũng đề xuất đọc phần tóm tắt cuối chương trước, sau đó quay lại tìm hiểu các phần nội dung. Cách làm này giúp người học có một khung tổng thể trước khi đi sâu vào chi tiết.',
      'Tuy nhiên, tốc độ không phải mục tiêu duy nhất. Đọc nhanh mà không hiểu nội dung cũng không tạo ra hiệu quả. Tốc độ đọc cần được điều chỉnh theo độ khó của tài liệu và mục đích đọc. Một bài viết phổ thông có thể đọc lướt để nắm ý, nhưng một định nghĩa chuyên ngành hoặc một chứng minh toán học đòi hỏi sự chậm rãi và kiểm tra từng bước.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_34c0d505.png',
        alt: 'Người học đọc giáo trình và đánh dấu các từ khóa quan trọng trên trang sách',
        caption:
          'Đánh dấu có chọn lọc từ khóa giúp giữ nhịp đọc và tập trung vào cấu trúc ý chính thay vì gạch chân dàn trải.',
      },
      '---',
      '### Từ trang giấy đến sơ đồ tư duy',
      'Sau khi đọc, sinh viên cần một cách ghi lại thông tin đủ ngắn gọn để có thể xem lại, nhưng vẫn giữ được mối liên hệ giữa các ý. Tài liệu chỉ ra ba lợi ích của việc ghi chú: tiết kiệm thời gian, hỗ trợ ghi nhớ và giúp hiểu bài tốt hơn.',
      'Phương pháp ghi chú truyền thống thường trình bày thông tin thành câu hoặc các mục theo thứ tự từ trên xuống dưới. Cách này có ưu điểm là dễ thực hiện, phù hợp với nội dung cần ghi lại tuần tự. Nhưng nếu chép quá nhiều, cuốn vở ghi chú có thể trở thành một phiên bản rút gọn của giáo trình, khiến người học mất thêm thời gian khi ôn tập.',
      'Sơ đồ tư duy được giới thiệu như một lựa chọn khác. Thay vì ghi chép theo dòng, người học đặt chủ đề chính ở trung tâm, sau đó phát triển các nhánh thể hiện ý lớn, ý nhỏ và những mối liên hệ. Từ khóa, hình ảnh, màu sắc và đường nối được sử dụng để làm rõ cấu trúc nội dung.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_05d62331.png',
        alt: 'Sơ đồ tư duy mẫu trong vở ghi với chủ đề trung tâm và các nhánh nội dung phân tầng',
        caption:
          'Sơ đồ tư duy buộc người học phải chọn lọc từ khóa và sắp xếp mối liên hệ giữa các ý chính.',
      },
      'Điểm quan trọng của sơ đồ tư duy không nằm ở việc trang trí đẹp mắt. Một sơ đồ có nhiều màu sắc nhưng thiếu logic vẫn khó giúp người học hiểu bài. Giá trị của nó nằm ở việc buộc sinh viên phải chọn lọc thông tin, xác định đâu là ý chính và mối quan hệ giữa các khái niệm.',
      'Khi đọc một chương về quản lý thời gian, chẳng hạn, chủ đề trung tâm có thể là “Quản lý thời gian”. Các nhánh lớn có thể gồm xác định mục tiêu, phân loại công việc, lập kế hoạch và theo dõi tiến độ. Từ đó, từng nhánh tiếp tục được mở rộng bằng các ví dụ cụ thể.',
      '---',
      '### Không phải cứ tô màu là sẽ nhớ',
      'Bài giảng nhấn mạnh việc sử dụng từ khóa, hình ảnh, liên tưởng và màu sắc. Những yếu tố này có thể giúp thông tin trở nên dễ phân biệt và dễ gợi nhớ hơn, nhất là khi người học chủ động tạo ra chúng thay vì chỉ nhìn vào hình ảnh có sẵn.',
      'Một cách thực hành đơn giản là sau khi đọc xong một phần, đóng tài liệu lại và tự vẽ sơ đồ những gì mình vừa hiểu. Nếu không thể tái hiện cấu trúc nội dung, đó có thể là dấu hiệu cho thấy người học cần đọc lại hoặc tìm hiểu sâu hơn.',
      {
        type: 'comparison',
        title: 'Đọc hiểu chủ động hay Đọc thụ động?',
        goodTitle: 'Đọc chủ động & Hệ thống',
        badTitle: 'Đọc thụ động & Máy móc',
        pairs: [
          {
            topic: 'Nhịp đọc',
            good: 'Nhận diện cụm từ, tìm từ khóa và dùng bút dẫn đường để giữ nhịp tập trung.',
            bad: 'Đọc từng chữ riêng lẻ, mấp máy môi hoặc đọc đi đọc lại cùng một đoạn.',
          },
          {
            topic: 'Tiếp cận khung bài',
            good: 'Xem phần tóm tắt cuối chương trước để nắm cấu trúc tổng thể rồi đi sâu chi tiết.',
            bad: 'Đọc thẳng từ trang đầu đến cuối nhưng không xác định được ý chính.',
          },
          {
            topic: 'Cách ghi chú',
            good: 'Chọn lọc từ khóa và vẽ sơ đồ tư duy thể hiện mối liên hệ giữa các ý.',
            bad: 'Gạch chân dày đặc mọi câu hoặc chép lại nguyên văn như bản rút gọn giáo trình.',
          },
          {
            topic: 'Kiểm tra hiểu bài',
            good: 'Đóng tài liệu lại và tự tái hiện sơ đồ cấu trúc bằng lời của mình.',
            bad: 'Tô màu đẹp mắt rồi gập sách mà chưa tự giải thích lại nội dung.',
          },
        ],
      },
      'Trong một môi trường có quá nhiều tài liệu, kỹ năng quan trọng không phải là đọc được tất cả mọi thứ. Đó là biết mình đang tìm gì, biết cách nhận ra thông tin quan trọng và có khả năng tổ chức lại kiến thức theo cách của riêng mình.',
      'Một cuốn sách chỉ thực sự trở thành kiến thức khi người đọc có thể giải thích, kết nối và sử dụng những điều đã đọc mà không cần liên tục mở lại từng trang.',
    ],
  },
  {
    id: 'ch3-memory',
    category: 'Chương 3',
    detailCategory: 'Chương 3: Phương pháp học tập hiệu quả',
    title: 'Trí nhớ không phải chiếc máy ghi âm',
    sapo: 'Có những bài học sinh viên từng đọc rất kỹ nhưng chỉ vài ngày sau đã không thể nhớ lại. Cũng có những con số, tên gọi hoặc khái niệm tưởng như rất khó thuộc lại có thể được ghi nhớ lâu dài nhờ một hình ảnh hay câu chuyện kỳ lạ. Trí nhớ không đơn giản là lưu trữ thông tin, mà còn là khả năng tạo ra những liên kết để tìm lại thông tin khi cần.',
    imageLabel: 'Liên kết hình ảnh và ghi nhớ',
    imageSrc: '/assets/aistudio/image_4c37b572.png',
    imageAlt: 'Minh họa chuyển đổi từ khóa trừu tượng thành hình ảnh trực quan dễ liên tưởng',
    imageFit: 'contain',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Hãy thử nhớ lại một bài giảng cách đây vài tuần. Có thể bạn vẫn nhớ hình ảnh giảng viên đứng trước lớp, một ví dụ thú vị hoặc câu chuyện được kể trong buổi học. Nhưng khi được hỏi về một định nghĩa nằm giữa bài, bạn lại không chắc chắn.',
      'Điều đó cho thấy trí nhớ không hoạt động như một chiếc máy ghi âm có thể phát lại toàn bộ nội dung theo đúng thứ tự. Con người thường nhớ tốt hơn khi thông tin được kết nối với kiến thức đã có, hình ảnh quen thuộc hoặc một trải nghiệm có ý nghĩa.',
      'Chương 3 ví trí nhớ như một thư viện lớn chứa nhiều thông tin. Vấn đề không chỉ là đưa sách vào thư viện, mà còn phải có hệ thống mục lục để tìm lại chúng. Nếu thông tin được tiếp nhận nhưng không được tổ chức thành những liên kết rõ ràng, người học có thể gặp khó khăn khi cần hồi tưởng.',
      '---',
      '### Biến thông tin thành hình ảnh',
      'Tài liệu giới thiệu một số nguyên tắc hỗ trợ ghi nhớ như hình dung, liên tưởng, làm nổi bật thông tin, tưởng tượng, màu sắc và âm điệu. Những nguyên tắc này có thể được vận dụng trong nhiều tình huống học tập.',
      'Chẳng hạn, khi cần nhớ một danh sách từ khóa, thay vì đọc đi đọc lại từng từ, sinh viên có thể chuyển mỗi từ thành một hình ảnh rồi kết hợp chúng thành một câu chuyện. Câu chuyện càng khác thường, hài hước hoặc dễ hình dung thì càng có cơ hội trở thành một dấu mốc gợi nhớ.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_4c37b572.png',
        alt: 'Hình minh họa chuyển đổi từ khóa thành hình ảnh trực quan liên kết với nhau',
        caption:
          'Chuyển đổi khái niệm hoặc từ khóa thành hình ảnh quen thuộc giúp tạo điểm tựa gợi nhớ khi ôn tập.',
        fit: 'contain',
      },
      'Quy trình được trình bày trong slide gồm năm bước: xác định từ khóa, chuyển từ khóa thành hình ảnh, kết hợp hình ảnh thành một câu chuyện, vẽ lại câu chuyện và ôn lại các hình ảnh. Đây là một cách tiếp cận đặc biệt hữu ích khi cần ghi nhớ những nội dung có tính liệt kê.',
      {
        type: 'processDiagram',
        title: '5 bước ghi nhớ thông tin bằng hình ảnh',
        theme: 'light',
        steps: [
          { label: 'Xác định từ khóa', detail: 'Chắt lọc khái niệm cốt lõi cần nhớ.' },
          { label: 'Chuyển thành hình ảnh', detail: 'Gắn từ khóa với vật thể quen thuộc.' },
          { label: 'Ghép thành câu chuyện', detail: 'Tạo liên kết sinh động, khác thường.' },
          { label: 'Vẽ lại câu chuyện', detail: 'Phác họa nhanh để củng cố dấu mốc.' },
          { label: 'Ôn lại hình ảnh', detail: 'Truy xuất định kỳ thay vì học nhồi.' },
        ],
      },
      'Với những con số trừu tượng, tài liệu giới thiệu hệ thống gán chữ cái đại diện cho chữ số để tạo ra hình ảnh dễ liên tưởng hơn. Khi con số đã được chuyển thành một hình thức có thể tưởng tượng, người học có thêm một cách để ghi nhớ ngày tháng, dữ liệu hoặc những chuỗi số cần thiết.',
      'Không phải kỹ thuật nào cũng phù hợp với mọi môn học. Sinh viên cần thử nghiệm và chọn cách ghi nhớ phù hợp với loại thông tin mình đang học. Một công thức toán học có thể cần hiểu bản chất và luyện tập, trong khi một danh sách thuật ngữ có thể phù hợp với thẻ ghi nhớ hoặc liên tưởng hình ảnh.',
      '---',
      '### Vì sao học nhồi nhét thường không hiệu quả?',
      'Một nội dung đáng chú ý khác trong bài giảng là mô hình trí nhớ và vai trò của việc ôn tập. Tài liệu cảnh báo rằng người học có thể quên một phần lớn thông tin mới trong thời gian ngắn nếu không ôn lại. Slide đưa ra con số 80% trong vòng 24 giờ, nhưng con số này không nên được xem là tỷ lệ cố định áp dụng cho tất cả mọi người và mọi loại kiến thức.',
      {
        type: 'statSpotlight',
        headline: '80% trong 24 giờ',
        label: 'Cảnh báo quên kiến thức mới nếu thiếu ôn tập',
        summary:
          'Con số trong bài giảng nhắc nhở rằng chỉ đọc lại tài liệu dễ tạo cảm giác quen thuộc giả; trí nhớ chỉ bền vững khi được truy xuất chủ động và ôn tập ngắt quãng.',
        theme: 'slate',
        items: [
          {
            value: 'Tự truy xuất',
            caption: 'Che đáp án, tự đặt câu hỏi và trả lời trước khi mở sách kiểm tra',
          },
          {
            value: 'Ôn ngắt quãng',
            caption: 'Chia nhỏ nhiều lượt ôn thay cho một buổi học nhồi kéo dài',
          },
        ],
      },
      'Điều đáng giữ lại là nguyên tắc: thông tin mới cần được củng cố bằng việc truy xuất và ôn tập. Đọc lại tài liệu nhiều lần có thể tạo cảm giác quen thuộc, nhưng chưa chắc chứng minh rằng người học có thể tự nhớ lại khi không nhìn sách.',
      'Một cách hiệu quả hơn là tự đặt câu hỏi, che phần đáp án và cố gắng trả lời. Khi không nhớ được, người học quay lại kiểm tra, sửa phần sai rồi thử lại sau đó. Việc ôn tập được chia thành nhiều lần giúp kiến thức có cơ hội được củng cố thay vì chỉ xuất hiện trong một buổi học kéo dài.',
      '---',
      '### Học bằng mắt, tai và hành động',
      'Tài liệu cũng khuyến khích kết hợp nhiều cách tiếp nhận kiến thức: quan sát sơ đồ và ghi chú, lắng nghe giảng viên, đặt câu hỏi, đọc thành tiếng, tham gia thí nghiệm và thực hiện bài tập.',
      'Điều này không có nghĩa mỗi người chỉ có một “kiểu học” cố định như người học bằng mắt, người học bằng tai hay người học bằng vận động. Thay vào đó, một nội dung có thể được tiếp cận từ nhiều góc độ. Khi học về một nguyên lý vật lý, sinh viên có thể đọc phần lý thuyết, quan sát hình vẽ, nghe giảng, giải bài tập và thực hiện thí nghiệm.',
      'Mỗi hoạt động bổ sung một cách nhìn khác nhau. Việc tự giải thích lại kiến thức bằng lời của mình cũng giúp người học nhận ra những chỗ còn mơ hồ.',
      'Trí nhớ tốt không nhất thiết là nhớ mọi thứ ngay lập tức. Đó là khả năng tổ chức thông tin, tìm ra mối liên hệ và biết cách đưa kiến thức trở lại khi cần. Trong học tập, điều quan trọng không phải là chưa bao giờ quên, mà là có phương pháp để nhớ lại và củng cố điều mình đã học.',
    ],
  },
  {
    id: 'ch3-smart-goals',
    category: 'Chương 3',
    detailCategory: 'Chương 3: Phương pháp học tập hiệu quả',
    title: 'Mục tiêu học tập: từ một ước muốn đến kế hoạch có thể thực hiện',
    sapo: '“Tôi muốn học tốt hơn” là một mong muốn phổ biến. Nhưng nếu không xác định học tốt hơn nghĩa là gì, cần đạt kết quả nào và phải bắt đầu từ đâu, mong muốn ấy rất dễ biến mất sau vài ngày. Một mục tiêu rõ ràng không bảo đảm thành công, nhưng nó giúp người học biết mình đang đi đâu và cần làm gì tiếp theo.',
    imageLabel: 'Mục tiêu SMART trong học tập',
    imageSrc: '/assets/aistudio/image_c5ef4ba9.png',
    imageAlt: 'Sơ đồ năm tiêu chí đặt mục tiêu SMART: Specific, Measurable, Achievable, Relevant, Time Bound',
    imageFit: 'contain',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Đầu học kỳ, nhiều sinh viên thường tự hứa sẽ chăm chỉ hơn. Họ dự định đi học đầy đủ, đọc sách thường xuyên và không để bài tập dồn đến cuối kỳ. Nhưng chỉ sau một thời gian, những kế hoạch ấy có thể bị thay thế bởi lịch sinh hoạt thất thường, các hoạt động ngoài giờ và những công việc phát sinh.',
      'Vấn đề đôi khi không nằm ở việc thiếu mong muốn. Sinh viên có thể thực sự muốn đạt điểm cao, nhưng chưa biến mong muốn ấy thành một mục tiêu cụ thể và một kế hoạch có thể theo dõi.',
      'Chương 3 dành một phần để nói về sức mạnh của mục tiêu. Theo nội dung bài giảng, mục tiêu có ba vai trò: định hướng quyết định và hành động, thúc đẩy con người nỗ lực và khuyến khích mỗi người phát huy năng lực của mình.',
      'Tài liệu dẫn lại một câu chuyện về khảo sát tại Đại học Yale năm 1980, trong đó phân chia sinh viên thành các nhóm dựa trên việc có viết mục tiêu và kế hoạch hay không, rồi so sánh thu nhập sau 15 năm. Câu chuyện này thường được sử dụng để minh họa sức mạnh của việc đặt mục tiêu, nhưng nguồn gốc và độ tin cậy của khảo sát cần được kiểm chứng độc lập. Vì vậy, không nên sử dụng các tỷ lệ và kết quả thu nhập trong câu chuyện như một bằng chứng khoa học đã được xác nhận.',
      'Dù vậy, ý tưởng cốt lõi vẫn đáng suy nghĩ: khi biết mình muốn đạt điều gì, con người có cơ sở tốt hơn để lựa chọn hành động và theo dõi tiến độ.',
      '---',
      '### Một mục tiêu tốt phải cụ thể',
      'Bài giảng giới thiệu mô hình SMART, gồm năm đặc điểm: cụ thể, đo lường được, có thể đạt được, phù hợp với hoàn cảnh và có thời hạn.',
      'Hãy so sánh hai cách đặt mục tiêu. “Tôi sẽ học tiếng Anh tốt hơn” là một mong muốn khá rộng. Trong khi đó, “Trong tám tuần tới, tôi sẽ học 20 từ mới mỗi ngày và hoàn thành một bài luyện nghe vào cuối tuần” cho người học biết mình phải làm gì và có thể kiểm tra tiến độ ra sao.',
      'Mục tiêu không cần quá lớn ngay từ đầu. Một kế hoạch thực tế thường hữu ích hơn một lời hứa đầy tham vọng nhưng không thể duy trì.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_c5ef4ba9.png',
        alt: 'Đồ họa mô hình SMART với năm tiêu chí Specific, Measurable, Achievable, Relevant và Time Bound',
        caption:
          'Mô hình SMART giúp chuyển một mong muốn chung chung thành mục tiêu cụ thể và có thể kiểm tra tiến độ.',
        fit: 'contain',
      },
      'Tài liệu đề xuất sáu bước xác định mục tiêu: viết rõ điều mình muốn, xác định lợi ích khi đạt được, lập kế hoạch hành động, kiểm tra các tiêu chí SMART, tạo động lực cho mục tiêu và bắt đầu hành động ngay.',
      {
        type: 'statSpotlight',
        headline: 'S · M · A · R · T',
        label: '5 tiêu chí biến ước muốn thành mục tiêu',
        summary:
          'Đi kèm 6 bước xác định mục tiêu và 7 lĩnh vực cân bằng cuộc sống để tránh dồn toàn bộ thời gian vào một khía cạnh duy nhất.',
        theme: 'yellow',
        items: [
          { value: 'S — Specific', caption: 'Cụ thể hóa việc cần làm' },
          { value: 'M — Measurable', caption: 'Đo lường tiến độ bằng con số' },
          { value: 'A — Achievable', caption: 'Khả thi với năng lực hiện tại' },
          { value: 'R — Relevant', caption: 'Phù hợp hoàn cảnh và định hướng' },
          { value: 'T — Time Bound', caption: 'Có mốc thời hạn hoàn thành rõ ràng' },
          { value: '6 bước · 7 lĩnh vực', caption: 'Từ viết ra giấy đến hành động hằng ngày' },
        ],
      },
      'Một điểm đáng chú ý là mục tiêu không chỉ nên giới hạn trong điểm số. Bài giảng gợi ý sinh viên nhìn cuộc sống qua bảy lĩnh vực: tài chính, học tập và nghề nghiệp, vui chơi và giải trí, sức khỏe, gia đình và các mối quan hệ, phát triển cá nhân, hoạt động cộng đồng.',
      'Cách tiếp cận này giúp người học tránh tình trạng dồn toàn bộ thời gian vào một mục tiêu mà bỏ quên những khía cạnh khác của cuộc sống.',
      '---',
      '### Đừng chỉ viết mục tiêu rồi cất vào ngăn kéo',
      'Một tờ giấy ghi mục tiêu không tự tạo ra kết quả. Điều quan trọng là thường xuyên xem lại và chuyển mục tiêu thành những hành động cụ thể trong ngày.',
      'Nếu mục tiêu là hoàn thành một môn học với kết quả tốt, sinh viên cần chia nhỏ công việc: đọc trước bài, tham gia lớp học, làm bài tập, ôn tập và kiểm tra lại những phần chưa hiểu. Mỗi hành động hoàn thành là một bước tiến có thể quan sát được.',
      'Tài liệu cũng khuyến khích viết mục tiêu ra giấy, đặt ở nơi dễ nhìn và thường xuyên đọc lại. Đây là cách tạo lời nhắc để người học không quên những điều mình đã lựa chọn.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_78ee784f.png',
        alt: 'Bìa cuốn sách Tôi tài giỏi, bạn cũng thế! của tác giả Adam Khoo',
        caption:
          'Cuốn “Tôi tài giỏi, bạn cũng thế!” của Adam Khoo được nhắc đến trong phần tài liệu tham khảo về mục tiêu và phương pháp học.',
        fit: 'contain',
      },
      'Cuốn sách “Tôi tài giỏi, bạn cũng thế!” của Adam Khoo được slide đưa vào phần tham khảo, gắn với những nội dung về mục tiêu, động lực và phương pháp học tập. Hình bìa sách được đặt như một tư liệu minh họa bên cạnh phần giới thiệu này.',
      'Mục tiêu không phải là lời dự đoán về tương lai. Nó là một cam kết về hướng đi ở hiện tại. Và giá trị lớn nhất của một mục tiêu không nằm ở việc nó được viết đẹp đến đâu, mà ở việc người học có quay lại với nó mỗi ngày hay không.',
    ],
  },
  {
    id: 'ch3-time-management',
    category: 'Chương 3',
    detailCategory: 'Chương 3: Phương pháp học tập hiệu quả',
    title: 'Sinh viên bận rộn đến mức nào? Câu trả lời nằm trong cách họ sử dụng thời gian',
    sapo: 'Có người luôn cảm thấy thiếu thời gian dù lịch trình kín đặc. Có người vẫn hoàn thành việc học, tham gia hoạt động ngoại khóa và có thời gian nghỉ ngơi. Khác biệt không nhất thiết nằm ở việc một người có nhiều giờ hơn người khác, mà ở cách họ lựa chọn việc gì cần được ưu tiên.',
    imageLabel: 'Lập kế hoạch và quản lý thời gian',
    imageSrc: '/assets/aistudio/image_0bf29e14.png',
    imageAlt: 'Sổ kế hoạch theo tuần và lịch tháng đặt cạnh laptop trên bàn học của sinh viên',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một bài tập được giao từ đầu tuần nhưng chưa bắt đầu. Một buổi thuyết trình còn hai ngày nữa phải hoàn thành. Tin nhắn từ bạn bè liên tục xuất hiện trên điện thoại. Trong lúc đó, kỳ thi cuối kỳ cũng đang đến gần.',
      'Đến tối, sinh viên nhận ra mình đã dành nhiều giờ cho các hoạt động khác nhưng vẫn chưa giải quyết được công việc quan trọng nhất. Cảm giác bận rộn xuất hiện, nhưng kết quả thực tế lại không tương xứng.',
      'Chương 3 tiếp cận vấn đề này bằng cách phân loại công việc thành bốn nhóm dựa trên hai yếu tố: mức độ khẩn cấp và mức độ hướng đến mục tiêu.',
      'Nhóm UT1 là những việc vừa khẩn cấp vừa hướng đến mục tiêu, chẳng hạn hoàn thành bài tập sắp đến hạn hoặc chuẩn bị cho một bài kiểm tra ngày hôm sau. Nhóm UT2 gồm những việc quan trọng nhưng chưa cần hoàn thành ngay, như ôn bài sớm, chuẩn bị sơ đồ tư duy trước buổi học hoặc bắt đầu làm đồ án từ khi mới được giao.',
      'UT3 là những việc có vẻ khẩn cấp nhưng không thực sự giúp tiến gần đến mục tiêu. Chúng có thể là trả lời tin nhắn liên tục, tham gia những cuộc trò chuyện không cần thiết hoặc bị cuốn vào những yêu cầu từ bên ngoài. Cuối cùng, UT4 là những hoạt động không khẩn cấp và cũng không hướng đến mục tiêu, như lướt mạng vô định hoặc xem chương trình giải trí quá lâu.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_aa8cbcb8.png',
        alt: 'Ma trận quản lý thời gian bốn nhóm theo hai trục Khẩn cấp và Quan trọng',
        caption:
          'Ma trận bốn nhóm ưu tiên giúp phân biệt những việc thực sự quan trọng với những việc chỉ tạo cảm giác khẩn cấp.',
        fit: 'contain',
      },
      '---',
      '### Cái bẫy của những việc luôn phải làm ngay',
      'Sinh viên thường dành nhiều thời gian cho UT1 vì những công việc này có thời hạn rõ ràng. Nhưng nếu liên tục rơi vào tình trạng phải làm gấp, có thể nguyên nhân nằm ở việc đã bỏ qua UT2 trước đó.',
      'Một bài tập được giao từ hai tuần trước có thể trở thành việc khẩn cấp vào đêm trước hạn nộp. Một kỳ thi đã được thông báo từ đầu học kỳ có thể biến thành cuộc chạy đua học thuộc trong vài ngày cuối cùng.',
      'Trong cả hai trường hợp, công việc khẩn cấp không nhất thiết xuất hiện bất ngờ. Nó có thể là kết quả của việc trì hoãn những việc quan trọng khi chúng vẫn còn thời gian để xử lý.',
      'Đây là lý do tài liệu khuyến khích dành nhiều thời gian hơn cho UT2. Ôn bài sớm, đọc trước giáo trình, lập kế hoạch và rèn luyện sức khỏe đều là những việc chưa tạo áp lực tức thì nhưng có ảnh hưởng lâu dài đến kết quả học tập.',
      'Một người chỉ làm việc khi thời hạn đã đến sẽ luôn có cảm giác bị đuổi theo. Người biết chuẩn bị trước có cơ hội chủ động hơn trong việc phân phối công sức.',
      '---',
      '### Lập kế hoạch không phải để lấp kín mọi giờ trong ngày',
      'Tài liệu đề xuất sinh viên lập kế hoạch theo ba cấp độ: tháng, tuần và ngày.',
      'Kế hoạch tháng giúp ghi lại những sự kiện quan trọng như lịch thi, lịch kiểm tra và hạn nộp đồ án. Sinh viên có thể chia khối lượng kiến thức của từng môn thành các phần nhỏ, sau đó phân bổ thời gian học trong suốt học kỳ.',
      'Kế hoạch tuần cụ thể hóa những công việc cần thực hiện trong bảy ngày. Mỗi chủ nhật, sinh viên có thể dành một khoảng thời gian để xem lại lịch học, xác định các nhiệm vụ quan trọng và bố trí thời gian cho từng môn.',
      'Cuối mỗi ngày, việc xem trước lịch trình ngày hôm sau giúp giảm tình trạng sáng thức dậy mới bắt đầu quyết định mình phải làm gì.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_0bf29e14.png',
        alt: 'Cuốn sổ kế hoạch tuần và lịch tháng có đánh dấu các mốc công việc trên bàn làm việc',
        caption:
          'Kết hợp kế hoạch tháng, tuần và ngày giúp phân bổ khối lượng học tập đều đặn và giữ khoảng trống dự phòng.',
      },
      'Điều quan trọng là kế hoạch phải đủ thực tế để có thể thực hiện. Một lịch trình kín từ sáng đến tối nhưng không có thời gian nghỉ ngơi thường khó duy trì. Sinh viên cũng cần chừa khoảng trống cho những việc phát sinh, đồng thời điều chỉnh kế hoạch khi có lý do chính đáng.',
      'Tài liệu khuyến khích đánh dấu những việc đã hoàn thành. Hành động nhỏ này giúp người học nhìn thấy tiến độ và có cảm giác kiểm soát tốt hơn đối với công việc.',
      'Quản lý thời gian không có nghĩa là từ bỏ giải trí hay luôn làm việc. Nó là khả năng phân biệt việc quan trọng với việc chỉ tạo cảm giác bận rộn.',
      {
        type: 'statSpotlight',
        headline: '24 giờ · 4 nhóm UT · 3 cấp độ',
        label: 'Công thức phân bổ thời gian chủ động',
        summary:
          'Mỗi ngày đều có 24 giờ như nhau; ưu tiên sớm nhóm UT2 và kết hợp lịch Tháng – Tuần – Ngày giúp giảm cảnh chạy đua sát hạn nộp.',
        theme: 'ink',
        items: [
          { value: 'UT1 & UT2', caption: 'Ưu tiên việc quan trọng trước khi nó hóa khẩn cấp' },
          { value: 'UT3 & UT4', caption: 'Hạn chế việc gây xao nhãng và thiếu mục tiêu' },
          { value: 'Tháng / Tuần / Ngày', caption: 'Ba cấp độ kế hoạch giữ khoảng trống dự phòng' },
        ],
      },
      'Một ngày của mỗi người đều có 24 giờ. Nhưng cách sử dụng những giờ ấy có thể tạo ra những kết quả rất khác nhau.',
    ],
  },
  {
    id: 'ch3-motivation',
    category: 'Chương 3',
    detailCategory: 'Chương 3: Phương pháp học tập hiệu quả',
    title: 'Biết phải học nhưng vẫn không muốn bắt đầu: Vấn đề nằm ở đâu?',
    sapo: 'Không ít sinh viên hiểu rõ rằng mình cần đọc tài liệu, làm bài tập và chuẩn bị cho kỳ thi. Họ thậm chí đã lập kế hoạch cụ thể. Nhưng khi đến giờ học, một cảm giác quen thuộc xuất hiện: mệt mỏi, chán nản và muốn trì hoãn thêm một chút. Khoảng cách giữa điều chúng ta biết nên làm và điều chúng ta thực sự làm đôi khi rất lớn.',
    imageLabel: 'Vượt qua trì hoãn và tạo động lực học tập',
    imageSrc: '/assets/aistudio/image_adf6fb45.png',
    imageAlt: 'Sinh viên ngồi vào bàn học, mở sách và bắt đầu ghi chép trong không gian yên tĩnh',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một sinh viên có thể dành cả buổi tối để nghĩ về bài tập còn dang dở. Họ biết rằng nếu bắt đầu ngay, công việc có thể hoàn thành trong vài giờ. Nhưng thay vì mở máy tính, họ lại kiểm tra điện thoại, xem một video hoặc tự nhủ rằng ngày mai mình sẽ có nhiều thời gian hơn.',
      'Chương 3 đặt câu hỏi về mối quan hệ giữa cảm xúc và hành động. Theo cách diễn giải của bài giảng, con người không phải lúc nào cũng hành động theo những gì lý trí cho là đúng. Cảm xúc như chán nản, lo lắng hay hứng thú có thể ảnh hưởng mạnh đến việc chúng ta bắt đầu và duy trì một công việc.',
      'Tài liệu mô tả một chuỗi tác động: suy nghĩ và trạng thái cơ thể ảnh hưởng đến cảm xúc; cảm xúc tác động đến hành động; hành động góp phần tạo ra kết quả.',
      'Đây là một cách nhìn đơn giản hóa nhưng có giá trị gợi mở. Khi cảm thấy mệt mỏi, người học thường khó bắt đầu. Khi đã bắt đầu và hoàn thành một phần công việc, cảm giác tiến triển có thể giúp họ tiếp tục.',
      '---',
      '### Đừng chờ cảm hứng mới bắt đầu',
      'Một sai lầm phổ biến là xem động lực như điều kiện bắt buộc trước khi hành động. Sinh viên thường nghĩ rằng mình cần có tâm trạng tốt, một không gian hoàn hảo hoặc cảm giác hứng thú mới có thể học hiệu quả.',
      {
        type: 'pullQuote',
        quote:
          'Hành động đôi khi phải đi trước cảm hứng: hãy bắt đầu bằng việc đọc hai trang, giải một bài tập hoặc viết ra ba ý chính.',
        attribution: 'Chương 3 — Vượt qua trì hoãn',
        tone: 'blue',
        pairedParagraph:
          'Nhưng trong thực tế, hành động đôi khi phải đi trước cảm hứng. Bắt đầu bằng một nhiệm vụ nhỏ có thể giúp giảm cảm giác ngại ngần. Thay vì đặt mục tiêu học hết một chương, người học có thể bắt đầu bằng việc đọc hai trang, giải một bài tập hoặc viết ra ba ý chính.',
      },
      'Tài liệu đề xuất một số cách điều chỉnh trạng thái bản thân như thay đổi tư thế, cách tự đối thoại, hình ảnh tưởng tượng và những từ ngữ sử dụng khi nói chuyện với chính mình. Thay vì lặp lại câu “Tôi không thể làm được”, sinh viên có thể chuyển sang một câu thực tế hơn: “Tôi chưa hiểu phần này, nhưng có thể bắt đầu bằng một ví dụ đơn giản”.',
      'Sự thay đổi không nằm ở việc tự thuyết phục rằng mọi thứ đều dễ dàng. Nó nằm ở việc thay một suy nghĩ khiến mình bỏ cuộc bằng một suy nghĩ giúp mình tìm được bước tiếp theo.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_adf6fb45.png',
        alt: 'Sinh viên ngồi vào bàn học với sách vở mở sẵn trong không gian gọn gàng, yên tĩnh',
        caption:
          'Bắt đầu từ một bước nhỏ trong không gian học yên tĩnh giúp thu hẹp khoảng cách giữa dự định và hành động.',
      },
      '---',
      '### Động lực cần được nuôi dưỡng bằng hành động',
      'Bài giảng cũng đề cập đến việc hình dung hậu quả của trì hoãn và những lợi ích của việc duy trì thói quen tốt. Người học có thể viết ra điều mình sẽ mất nếu tiếp tục trì hoãn, sau đó hình dung những kết quả tích cực khi hoàn thành mục tiêu.',
      'Tuy nhiên, không nên biến cách tiếp cận này thành việc tự gây áp lực hoặc tự trừng phạt. Nỗi sợ có thể thúc đẩy hành động trong thời gian ngắn, nhưng nếu kéo dài, nó cũng có thể khiến người học căng thẳng và né tránh công việc.',
      'Một cách bền vững hơn là kết hợp mục tiêu rõ ràng với những bước hành động nhỏ, có thể hoàn thành. Sinh viên có thể tự cam kết với bản thân, chia sẻ mục tiêu với bạn bè hoặc người thân và tự thưởng sau khi đạt được một cột mốc.',
      'Tài liệu còn nhấn mạnh việc học cách điều chỉnh cảm xúc thông qua suy nghĩ và cơ thể. Một số hoạt động đơn giản như nghỉ ngơi hợp lý, vận động nhẹ, hít thở sâu hoặc thay đổi không gian học có thể giúp người học lấy lại sự tập trung. Những cách này không thay thế việc tìm kiếm hỗ trợ chuyên môn khi một người gặp khó khăn tâm lý kéo dài.',
      '---',
      '### Kiên trì không có nghĩa là không bao giờ thất bại',
      'Một thông điệp xuyên suốt của phần này là khả năng thay đổi phương pháp khi gặp khó khăn. Người học có thể mắc lỗi, nhận điểm thấp hoặc không đạt mục tiêu như dự kiến. Nhưng kết quả của một lần thử không nhất thiết quyết định toàn bộ năng lực của họ.',
      'Nếu một phương pháp không hiệu quả, cần tìm hiểu nguyên nhân: mục tiêu có quá lớn không, kế hoạch có thiếu thực tế không, tài liệu có phù hợp không hay người học chưa thực sự hiểu kiến thức nền tảng?',
      'Sự quyết tâm không chỉ thể hiện ở việc cố gắng nhiều hơn. Đôi khi, nó còn nằm ở khả năng nhận ra rằng mình cần thay đổi cách làm.',
      'Động lực có thể khiến chúng ta bắt đầu. Nhưng chính những thói quen được duy trì qua thời gian mới giúp việc học đi đến kết quả.',
    ],
  },
  {
    id: 'ch3-exam-and-skills',
    category: 'Chương 3',
    detailCategory: 'Chương 3: Phương pháp học tập hiệu quả',
    title: 'Kỳ thi không bắt đầu vào ngày phát đề',
    sapo: 'Đối với nhiều sinh viên, kỳ thi chỉ thực sự bắt đầu khi lịch thi được công bố hoặc khi giảng viên phát đề. Nhưng một bài thi tốt thường là kết quả của nhiều tuần chuẩn bị: từ việc học đều đặn, tổ chức tài liệu, luyện tập cho đến điều chỉnh môi trường học tập và tâm lý.',
    imageLabel: 'Chuẩn bị kỳ thi và kỹ năng đại học',
    imageSrc: '/assets/aistudio/image_85515c10.png',
    imageAlt: 'Nhóm sinh viên cùng trao đổi tài liệu và ôn tập bên laptop trong thư viện',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Những ngày cuối học kỳ, thư viện thường đông hơn bình thường. Sinh viên mang theo giáo trình, laptop, đồ uống và những tập tài liệu dày. Có người học đến khuya để cố gắng hoàn thành những phần kiến thức còn thiếu. Có người dành nhiều thời gian xem lại ghi chú nhưng không biết nên bắt đầu từ đâu.',
      'Tình trạng này thường không chỉ phản ánh khối lượng kiến thức lớn. Nó còn cho thấy việc chuẩn bị có thể đã bắt đầu quá muộn.',
      'Chương 3 khuyến khích sinh viên chuẩn bị cho kỳ thi từ sớm. Trước khi bước vào giai đoạn ôn tập, người học nên hoàn thành sơ đồ tư duy cho các bài đã học, tổng hợp những dạng câu hỏi thường gặp, hoàn thành bài tập và đồ án được giao, đồng thời xem lại những lỗi đã mắc trong các bài kiểm tra trước đó.',
      'Việc tham khảo kinh nghiệm từ sinh viên khóa trước cũng có thể giúp người học hiểu rõ hơn về hình thức thi và cách chuẩn bị. Tuy nhiên, kinh nghiệm ấy nên được sử dụng như thông tin bổ trợ, không thay thế việc học nội dung môn học.',
      '---',
      '### Một nơi học tốt có thể tạo nên khác biệt',
      'Không gian học tập ảnh hưởng đến khả năng duy trì sự tập trung. Tài liệu đề xuất một môi trường có đủ ánh sáng, nhiệt độ phù hợp và hạn chế những yếu tố gây xao nhãng. Sinh viên cũng cần chú ý đến ăn uống, nghỉ ngơi và có thể lựa chọn nhạc không lời nếu điều đó thực sự giúp họ tập trung.',
      'Học một mình và học nhóm đều có ưu điểm riêng. Khi cần giải quyết một bài toán khó hoặc đọc tài liệu phức tạp, không gian yên tĩnh có thể hữu ích. Khi cần trao đổi cách giải, kiểm tra mức độ hiểu bài hoặc phân tích một vấn đề, học nhóm có thể giúp người học nhìn thấy những góc độ mà mình bỏ sót.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_85515c10.png',
        alt: 'Nhóm sinh viên cùng thảo luận bài tập và ôn thi bên laptop trong thư viện',
        caption:
          'Học nhóm tại thư viện giúp các thành viên kiểm tra chéo kiến thức và nhìn ra những góc độ còn thiếu.',
      },
      'Một kế hoạch ôn thi hợp lý cần phân bổ thời gian cho từng môn, tránh dành toàn bộ những ngày cuối cùng cho một môn học duy nhất. Việc chia nhỏ các buổi học và có thời gian dự phòng giúp sinh viên giảm áp lực khi có công việc phát sinh.',
      'Trong mỗi buổi học, tài liệu gợi ý một trình tự gồm ôn lại nội dung ngày hôm trước, ghi nhớ kiến thức, tự trả lời câu hỏi và tổng kết những gì đã học trong ngày. Đây là cách giúp người học không chỉ tiếp nhận thông tin mà còn kiểm tra xem mình có thể tự nhớ và sử dụng thông tin ấy hay không.',
      '---',
      '### Bước vào phòng thi với một kế hoạch',
      'Ngày thi, sinh viên nên đến địa điểm thi sớm để ổn định tinh thần và chuẩn bị những vật dụng cần thiết. Việc liên tục lo lắng về những câu hỏi có thể xuất hiện thường không giúp cải thiện khả năng làm bài. Thay vào đó, người học có thể tập trung vào những gì mình đã chuẩn bị và nhắc bản thân giữ bình tĩnh.',
      'Khi nhận đề, không nên vội vàng viết ngay. Hãy đọc lướt qua toàn bộ đề để nắm cấu trúc, số lượng câu hỏi và mức độ phân bổ điểm. Sau đó, xác định thời gian cho từng phần và chừa một khoảng dự phòng để kiểm tra lại bài làm.',
      'Một nguyên tắc được bài giảng nhấn mạnh là nên xử lý những câu dễ trước, câu khó sau. Điều này giúp sinh viên tận dụng thời gian và tránh bị mắc kẹt quá lâu ở một câu hỏi.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_36fa0c37.png',
        alt: 'Sinh viên tập trung làm bài thi viết trong giảng đường phòng thi',
        caption:
          'Phân bổ thời gian theo từng phần và làm câu dễ trước giúp giữ sự bình tĩnh trong phòng thi.',
      },
      'Với câu hỏi tự luận, người học cần đọc kỹ yêu cầu và trả lời đúng trọng tâm. Viết quá dài không đồng nghĩa với việc có nhiều điểm hơn. Một câu trả lời tốt cần có lập luận rõ ràng, sử dụng kiến thức phù hợp và trình bày vừa đủ.',
      'Đối với câu hỏi trắc nghiệm, tài liệu khuyến khích đọc kỹ đề, tự hình thành câu trả lời trước khi xem các phương án, đọc hết lựa chọn và sử dụng phương pháp loại trừ. Đây là cách hạn chế việc chọn đáp án chỉ vì một phương án có vẻ quen thuộc.',
      {
        type: 'comparison',
        title: 'Chuẩn bị và làm bài thi: Khoa học hay Bị động?',
        goodTitle: 'Chiến lược ôn & thi khoa học',
        badTitle: 'Thói quen thiếu chuẩn bị',
        pairs: [
          {
            topic: 'Thời điểm ôn tập',
            good: 'Hoàn thiện sơ đồ tư duy, chia nhỏ buổi học theo môn và sửa lỗi từ bài kiểm tra trước.',
            bad: 'Đợi lịch thi mới bắt đầu gom tài liệu và học dồn vào những đêm cuối.',
          },
          {
            topic: 'Khi vừa nhận đề',
            good: 'Đọc lướt toàn đề để nắm phân bổ điểm, chia giờ làm bài và chừa giờ kiểm tra lại.',
            bad: 'Vội vàng viết ngay từ câu đầu tiên và mất cân đối thời gian.',
          },
          {
            topic: 'Xử lý câu hỏi',
            good: 'Làm câu dễ trước; câu tự luận trả lời đúng trọng tâm bằng lập luận rõ ràng.',
            bad: 'Sa lầy quá lâu ở một câu khó hoặc viết dài lan man ngoài yêu cầu đề.',
          },
          {
            topic: 'Câu trắc nghiệm',
            good: 'Tự hình thành đáp án trước khi xem lựa chọn và dùng phương pháp loại trừ.',
            bad: 'Chọn vội ngay một phương án chỉ vì cảm giác quen mắt.',
          },
        ],
      },
      '---',
      '### Kỹ năng học tập không kết thúc sau kỳ thi',
      'Phần cuối Chương 3 mở rộng việc học ra ngoài lớp học và phòng thi. Sinh viên được khuyến khích rèn luyện ngoại ngữ, tin học, khả năng giải quyết vấn đề, giao tiếp, đọc sách và tự đánh giá bản thân.',
      'Những kỹ năng này không thể hình thành chỉ bằng việc nghe giảng. Chúng đòi hỏi quá trình thực hành, trao đổi và trải nghiệm. Một sinh viên muốn nâng cao ngoại ngữ cần sử dụng ngôn ngữ thường xuyên. Người muốn cải thiện kỹ năng giao tiếp phải có cơ hội trình bày, lắng nghe và làm việc cùng người khác.',
      'Tài liệu cũng nhắc đến những công việc rất đời thường: đi học đúng giờ, tập trung nghe giảng, ghi chép có chọn lọc, tìm nơi yên tĩnh để học, sử dụng thư viện, tìm kiếm sự hỗ trợ khi gặp khó khăn và duy trì quan hệ với giảng viên.',
      'Đời sống sinh viên còn bao gồm quản lý tài chính, lựa chọn sách phù hợp với ngân sách, tìm hiểu học bổng, cân nhắc việc làm thêm và kiểm soát các khoản chi tiêu. Với những người sống xa nhà hoặc ở ký túc xá, khả năng thích nghi, xây dựng quan hệ và chăm sóc sức khỏe cũng là một phần của quá trình trưởng thành.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_3fdeabcd.png',
        alt: 'Sinh viên Trường Đại học Bách khoa TP. Hồ Chí Minh tham gia hoạt động tập thể trong khuôn viên trường',
        caption:
          'Hoạt động ngoại khóa và đời sống sinh viên góp phần rèn luyện khả năng giao tiếp, hợp tác và thích nghi.',
      },
      'Bài giảng kết thúc bằng lời nhắc về việc đọc sách, tự rèn luyện và tận dụng năng lực của bản thân. Đó cũng là một cách khép lại hợp lý cho toàn bộ chương: học tập hiệu quả không chỉ là kỹ thuật ghi nhớ hay chiến thuật làm bài thi.',
      'Nó là sự kết hợp giữa mục tiêu, phương pháp, kỷ luật, khả năng thích nghi và cách mỗi người tổ chức cuộc sống của mình. Kỳ thi có thể kết thúc sau vài giờ, nhưng những năng lực được hình thành trong suốt quá trình học đại học sẽ tiếp tục theo sinh viên trong công việc và cuộc sống sau này.',
    ],
  },
  {
    id: 'ch4-project-management-intro',
    category: 'Chương 4',
    detailCategory: 'Chương 4: Quản lý dự án',
    layoutVariant: 'magazine-dossier',
    editorialBadge: 'Hồ Sơ Chương 4',
    dossierSummary: {
      label: 'Khung quản lý cốt lõi',
      text: 'Dự án có mục tiêu xác định, thời hạn hữu hạn, nguồn lực giới hạn và đòi hỏi phối hợp thống nhất từ ý tưởng đến khi bàn giao.',
    },
    title: 'Quản lý dự án: Đưa một ý tưởng đi đến đích',
    sapo: 'Một dự án không đơn thuần là tập hợp những việc cần làm. Đó là một hành trình có mục tiêu, thời hạn và nguồn lực hữu hạn, đòi hỏi con người phối hợp theo một cách có tổ chức.',
    imageLabel: 'Nhóm sinh viên kỹ thuật trao đổi kế hoạch dự án',
    imageSrc: '/assets/aistudio/image_831e9357.png',
    imageAlt:
      'Nhóm sinh viên kỹ thuật trao đổi bản vẽ, mẫu thử và máy tính quanh bàn làm việc',
    readTime: '4 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Hãy hình dung một nhóm sinh viên quyết định chế tạo một mô hình kỹ thuật cho đồ án môn học. Ý tưởng ban đầu có thể rất hấp dẫn: sản phẩm có tính ứng dụng, các thành viên đều hào hứng và ai cũng muốn bắt tay vào thực hiện. Nhưng chỉ sau vài ngày, nhóm có thể phát hiện mình chưa thống nhất thiết kế, chưa chuẩn bị đủ vật liệu, chưa phân chia trách nhiệm và cũng chưa biết khi nào từng phần việc phải hoàn tất. Vấn đề lúc này không nằm ở việc thiếu ý tưởng, mà ở chỗ ý tưởng chưa được chuyển thành một dự án có kế hoạch.',
      'Trong cách hiểu được trình bày ở Chương 4, dự án là tập hợp các hoạt động được phối hợp thống nhất, có điểm bắt đầu và kết thúc xác định, do một cá nhân hoặc tổ chức thực hiện nhằm đạt những mục tiêu cụ thể trong giới hạn về lịch trình, chi phí và các yêu cầu hiệu quả. Định nghĩa này nhấn mạnh ba đặc điểm. Dự án có mục tiêu cần đạt, có khoảng thời gian hữu hạn và cần phối hợp nhiều hoạt động thay vì chỉ thực hiện một công việc đơn lẻ.',
      'Chính vì có điểm kết thúc, dự án khác với công việc thường ngày. Một hoạt động vận hành lặp lại thường diễn ra liên tục; trong khi đó, dự án được hình thành để tạo ra một kết quả cụ thể rồi khép lại khi mục tiêu đã được hoàn thành hoặc khi dự án kết thúc theo quyết định của tổ chức. Mỗi dự án cũng có bối cảnh riêng, do đó cách tổ chức công việc cần được cân nhắc theo yêu cầu thực tế chứ không thể áp dụng máy móc một trình tự cho mọi trường hợp.',
      'Một đặc điểm quan trọng khác là dự án luôn sử dụng những nguồn lực có giới hạn. Con người, tiền bạc, vật liệu và thời gian đều không thể được xem là vô tận. Một nhóm sinh viên có thể có nhiều ý tưởng nhưng chỉ có một số thành viên, một khoản kinh phí nhất định và thời gian hoàn thành theo lịch môn học. Khi một nguồn lực bị sử dụng quá mức, các phần việc khác có thể bị ảnh hưởng. Vì vậy, ngay từ đầu, nhóm cần biết mình có gì, còn thiếu gì và cần ưu tiên điều gì.',
      '---',
      '### Quản lý dự án là tổ chức công việc để đạt mục tiêu',
      'Quản lý dự án có thể được xem là khoa học hoặc nghệ thuật tổ chức và thực hiện các nhiệm vụ của dự án. Ở góc độ thực hành, đó là tập hợp các nguyên tắc, phương pháp và kỹ thuật giúp lập kế hoạch hiệu quả cho những công việc hướng đến một mục tiêu xác định. Người quản lý không chỉ giao việc, mà còn phải nhìn thấy mối liên hệ giữa các nhiệm vụ, nhận biết nguồn lực cần thiết và theo dõi xem tiến trình thực hiện có đang đi đúng hướng hay không.',
      'Một kế hoạch tốt tạo ra khung làm việc chung cho cả nhóm. Các thành viên hiểu việc nào cần làm trước, việc nào phụ thuộc vào kết quả của công việc khác, ai chịu trách nhiệm và thời điểm nào cần bàn giao. Khi xuất hiện thay đổi, nhóm có cơ sở để xem xét ảnh hưởng và điều chỉnh thay vì xử lý từng vấn đề một cách rời rạc. Các công cụ quản lý dự án vì thế không chỉ phục vụ việc lập lịch, mà còn hỗ trợ tổ chức, phân tích quan hệ công việc, bố trí nguồn lực và giám sát tiến độ.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_d88dfc09.png',
        alt: 'Sơ đồ các mảng của quản lý dự án từ lập kế hoạch, lịch trình đến kiểm soát dự án và quản lý rủi ro',
        caption:
          'Hình 1. Các mảng công việc có thể gắn với quản lý dự án: lập kế hoạch, lịch trình, nguồn lực, chi phí, rủi ro, tổ chức, kiểm soát và công cụ phần mềm.',
        fit: 'contain',
      },
      'Sơ đồ trên cho thấy quản lý dự án không chỉ nằm ở một thao tác riêng lẻ. Lập kế hoạch và xây dựng lịch trình giúp định hình đường đi; quản lý nguồn lực và kiểm soát chi phí giúp bảo đảm điều kiện thực hiện; quản lý rủi ro, hợp đồng và tổ chức giúp nhóm ứng phó với những yếu tố có thể ảnh hưởng đến dự án. Đào tạo, thiết kế dự án, tối ưu hóa và công cụ phần mềm cũng có thể góp phần nâng cao chất lượng triển khai. Tùy quy mô và tính chất dự án, mức độ quan tâm dành cho từng mảng sẽ khác nhau.',
      {
        type: 'processDiagram',
        title: 'Lộ trình đưa ý tưởng thành dự án có kế hoạch',
        theme: 'dark',
        steps: [
          { label: 'Ý tưởng ban đầu', detail: 'Nhu cầu thực tế hoặc đề tài đồ án.' },
          { label: 'Mục tiêu cụ thể', detail: 'Xác định kết quả cần đạt và tiêu chí.' },
          { label: 'Chia nhỏ nhiệm vụ', detail: 'Rõ người làm, rõ quan hệ trước – sau.' },
          { label: 'Bố trí nguồn lực', detail: 'Cân đối nhân lực, vật liệu, kinh phí.' },
          { label: 'Lịch trình & Kiểm soát', detail: 'Theo dõi tiến độ và điều chỉnh rủi ro.' },
        ],
      },
      {
        type: 'figure',
        src: '/assets/aistudio/image_831e9357.png',
        alt: 'Nhóm sinh viên kỹ thuật trao đổi bản vẽ, mẫu thử và kế hoạch công việc quanh bàn xưởng thực hành',
        caption:
          'Trao đổi bản vẽ, mẫu thử và lịch trình quanh bàn làm việc giúp nhóm biến ý tưởng ban đầu thành kế hoạch triển khai cụ thể.',
      },
      '> Quản lý dự án không làm cho công việc biến mất; nó giúp mọi người biết cần làm gì, vì sao phải làm và làm vào thời điểm nào.',
      'Khi một nhóm biết chuyển ý tưởng thành mục tiêu, chia mục tiêu thành nhiệm vụ, bố trí nguồn lực và theo dõi tiến độ, dự án đã có nền tảng để được triển khai có hệ thống. Tuy nhiên, tổ chức tốt chưa đồng nghĩa với thành công. Nhóm còn phải xác định thế nào là một kết quả đạt yêu cầu và phải cân bằng các giới hạn trong suốt quá trình thực hiện. Đó là câu chuyện của bài tiếp theo.',
    ],
  },
  {
    id: 'ch4-project-balance',
    category: 'Chương 4',
    detailCategory: 'Chương 4: Quản lý dự án',
    title: 'Thành công của dự án là bài toán cân bằng',
    sapo: 'Hoàn thành đúng hạn là quan trọng, nhưng chưa đủ. Một dự án chỉ thực sự đáp ứng kỳ vọng khi thời gian, chi phí và chất lượng được xem xét đồng thời.',
    imageLabel: 'Tam giác quản lý dự án: Thời gian – Chi phí – Chất lượng',
    imageSrc: '/assets/aistudio/image_9692170e.png',
    imageAlt:
      'Sơ đồ tam giác quản lý dự án gồm ba đỉnh Scope (Phạm vi và Chất lượng), Cost (Chi phí) và Time (Thời gian)',
    imageFit: 'contain',
    readTime: '4 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một nhóm có thể hoàn thành mô hình trước ngày nộp, nhưng sản phẩm không hoạt động như yêu cầu. Một nhóm khác có thể tạo ra sản phẩm tốt, song chi phí vật liệu vượt xa mức dự kiến. Cũng có trường hợp dự án nằm trong ngân sách nhưng liên tục trễ tiến độ. Những tình huống này cho thấy không thể đánh giá kết quả chỉ bằng một con số hoặc một dấu mốc riêng lẻ.',
      'Theo nội dung Chương 4, một dự án được xem là thành công khi hoàn thành đúng thời hạn, được thực hiện trong ngân sách chi phí và đáp ứng các yêu cầu chất lượng đã quy định. Ba yêu cầu này tạo thành những tiêu chí cơ bản để nhóm đánh giá kết quả. Một sản phẩm có thể hoàn thành nhanh, nhưng nếu không đạt chất lượng thì mục tiêu chưa được đáp ứng. Ngược lại, việc theo đuổi chất lượng bằng mọi giá cũng có thể làm cho dự án vượt quá nguồn lực hoặc thời gian cho phép.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_9692170e.png',
        alt: 'Tam giác quản lý dự án với ba đỉnh Scope (Tính năng và Chất lượng), Cost (Nguồn lực và Ngân sách) và Time (Lịch trình)',
        caption:
          'Tam giác quản lý dự án cho thấy mối tác động qua lại giữa phạm vi – chất lượng (Scope), chi phí (Cost) và thời gian (Time).',
        fit: 'contain',
      },
      'Trong slide, mối quan hệ này được liên hệ với tam giác quản lý dự án và cụm mục tiêu – kế hoạch – nguồn lực. Có thể hiểu rằng mục tiêu xác định kết quả cần đạt; kế hoạch chỉ ra cách thức và trình tự thực hiện; còn nguồn lực tạo điều kiện để kế hoạch trở thành hành động. Khi một yếu tố thay đổi, người quản lý cần xem xét những yếu tố còn lại. Chẳng hạn, rút ngắn thời gian có thể đòi hỏi bổ sung nhân lực hoặc vật liệu; giảm chi phí có thể buộc nhóm cân nhắc lại phương án thiết kế, nhưng không được làm mất đi những yêu cầu chất lượng cốt lõi.',
      '---',
      '### Người quản lý cần xử lý cả công việc lẫn quan hệ giữa con người',
      'Một kế hoạch được xây dựng cẩn thận vẫn có thể gặp trở ngại khi nhiều người cùng tham gia. Các thành viên có thể khác nhau về chuyên môn, cách làm việc hoặc quan điểm ưu tiên. Nếu không được trao đổi kịp thời, bất đồng nhỏ có thể biến thành xung đột và làm gián đoạn tiến độ. Vì vậy, giải quyết xung đột là một kỹ năng quan trọng của người quản lý dự án. Mục tiêu không phải là buộc mọi người phải nghĩ giống nhau, mà là đưa những khác biệt trở lại cuộc thảo luận hướng đến kết quả chung.',
      'Tính sáng tạo và linh hoạt cũng cần thiết, bởi thực tế không phải lúc nào cũng diễn ra đúng như dự kiến. Vật liệu có thể không đáp ứng yêu cầu, một thiết kế có thể cần điều chỉnh sau khi thử nghiệm hoặc nhóm có thể nhận ra cách làm ban đầu tốn nhiều thời gian hơn dự tính. Khả năng thích ứng giúp nhóm xem xét phương án thay thế, đồng thời vẫn giữ được mục tiêu chính của dự án. Linh hoạt không có nghĩa là thay đổi tùy hứng; mọi điều chỉnh cần được cân nhắc về ảnh hưởng đến tiến độ, chi phí và chất lượng.',
      'Lập kế hoạch tốt tạo ra căn cứ để xử lý các thay đổi. Khi nhiệm vụ, thời lượng và trách nhiệm đã được xác định, người quản lý có thể nhìn thấy phần việc nào bị ảnh hưởng và cần phối hợp với ai. Kỹ năng thương lượng giúp các bên tìm được phương án có thể chấp nhận. Tư duy “win-win” hướng đến giải pháp trong đó các bên cùng đạt được lợi ích hợp lý, thay vì cố giành phần thắng bằng mọi giá theo cách “win-lose”.',
      '> Một quyết định quản lý tốt không chỉ giải quyết vấn đề trước mắt; nó còn phải tính đến tác động của quyết định đó lên toàn bộ dự án.',
      'Ví dụ, khi nhóm phát hiện một loại vật liệu rẻ hơn nhưng chưa được kiểm tra, việc lựa chọn ngay để tiết kiệm ngân sách có thể tạo ra rủi ro về chất lượng. Nhóm cần trao đổi về yêu cầu kỹ thuật, thời gian thử nghiệm và khoản chi có thể tiết kiệm. Nếu vật liệu thay thế đáp ứng yêu cầu sau khi thử, phương án mới có thể được cân nhắc. Nếu không, khoản tiết kiệm ban đầu có thể dẫn đến chi phí sửa chữa và chậm tiến độ về sau. Cách tiếp cận này cho thấy quyết định về chi phí không thể tách rời việc kiểm soát chất lượng và lịch trình.',

      'Thành công của dự án vì thế không chỉ là việc hoàn tất một sản phẩm. Đó là kết quả của quá trình liên tục cân nhắc mục tiêu, kế hoạch, nguồn lực và sự phối hợp giữa con người. Để những tiêu chí ấy không dừng ở khẩu hiệu, nhóm phải biến chúng thành những công việc cụ thể và một lịch trình có thể theo dõi. Bước đầu tiên là lập kế hoạch.',
    ],
  },
  {
    id: 'ch4-project-planning',
    category: 'Chương 4',
    detailCategory: 'Chương 4: Quản lý dự án',
    title: 'Trước khi bắt tay vào làm, hãy lập kế hoạch',
    sapo: 'Kế hoạch biến một mục tiêu chung thành nhiệm vụ có người thực hiện, có thời gian hoàn thành và có cách kiểm tra. Với dự án kỹ thuật, đây là nền tảng để nhiều công việc khác nhau có thể đi cùng một hướng.',
    imageLabel: 'Nhóm kỹ thuật lập kế hoạch và phân công dự án',
    imageSrc: '/assets/aistudio/image_31fa7087.png',
    imageAlt:
      'Nhóm kỹ thuật thảo luận bản vẽ và kế hoạch triển khai quanh bàn làm việc',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một dự án kỹ thuật thường bao gồm nhiều nhiệm vụ được thực hiện bởi những người khác nhau và ở những thời điểm khác nhau. Các nhiệm vụ này không tồn tại độc lập: kết quả của công việc trước có thể là điều kiện để công việc sau bắt đầu. Nếu nhóm chỉ tập trung hoàn thành phần việc của từng cá nhân mà không phối hợp toàn bộ tiến trình, sản phẩm cuối cùng có thể bị chậm hoặc không đáp ứng yêu cầu. Bởi vậy, lập kế hoạch tốt là một trong những yếu tố quan trọng góp phần vào thành công của dự án và của cả nhóm.',
      'Trước khi chia việc, nhóm cần thống nhất một số câu hỏi căn bản. Việc đầu tiên cần làm là gì, và sau đó là công việc nào? Cần bao nhiêu người để hoàn thành? Dự án cần những vật tư gì? Khoảng thời gian thực hiện là bao lâu, khi nào nhóm phải hoàn thành và dựa vào đâu để biết dự án đã đạt kết quả? Những câu hỏi này nghe đơn giản nhưng buộc các thành viên phải suy nghĩ về toàn bộ dự án, thay vì chỉ nhìn vào phần việc mình muốn làm.',
      '---',
      '### Bắt đầu bằng một bản mô tả đủ rõ',
      'Một trong những công việc đầu tiên của quá trình lập kế hoạch là xây dựng điều lệ dự án. Có thể xem đây là bản tóm tắt giúp các thành viên có cùng cách hiểu về dự án. Điều lệ cần nêu kết quả cần đạt, thời gian thực hiện và những thông tin kế hoạch chính. Trong đó có thể trình bày các nhiệm vụ cùng thời gian dự kiến, những mốc cần hoàn thành, nhóm dự án và vai trò của từng thành viên. Khi có một bản mô tả chung, nhóm sẽ giảm nguy cơ mỗi người hiểu mục tiêu theo một cách khác nhau.',
      'Mục tiêu cần mô tả kết quả cuối cùng mà dự án hướng đến, thay vì chỉ nói chung chung rằng nhóm sẽ “làm một sản phẩm”. Cần phác thảo sản phẩm hoặc kết quả cần đạt và xem nó có ý nghĩa như thế nào đối với tổ chức hoặc nhóm thực hiện. Mục tiêu càng rõ, việc xác định nhiệm vụ và đánh giá kết quả càng thuận lợi. Nếu yêu cầu thay đổi trong quá trình thực hiện, nhóm cũng có căn cứ để xem xét thay đổi đó có còn phù hợp với mục tiêu ban đầu hay không.',
      {
        type: 'charter',
        formLabel: 'MẪU ĐIỀU LỆ DỰ ÁN MỘT TRANG',
        duration: 'Thời hạn dự kiến: 8 tuần',
        projectTitle:
          'Thiết kế và chế tạo mô hình hệ thống phân loại sản phẩm tự động',
        objective:
          'Hoàn thiện mô hình nguyên lý đáp ứng các yêu cầu kỹ thuật của đồ án môn học, vận hành ổn định trong giới hạn ngân sách và thời hạn đã thống nhất.',
        deliverables:
          'Bản vẽ thiết kế lắp ghép, mô hình thử nghiệm đạt tiêu chí kiểm tra, bảng thông số kỹ thuật và báo cáo tổng kết dự án.',
        roles: [
          {
            role: 'Nhóm trưởng / Điều phối tiến độ',
            responsibility:
              'Theo dõi lịch trình, mốc hoàn thành và điều phối cập nhật tiến độ hàng tuần.',
          },
          {
            role: 'Phụ trách thiết kế kỹ thuật',
            responsibility:
              'Phác thảo phương án, hoàn thiện bản vẽ chi tiết và kiểm tra khả năng lắp ghép.',
          },
          {
            role: 'Phụ trách vật liệu & chế tạo',
            responsibility:
              'Dự trù vật tư, quản lý chi phí mua sắm, gia công và lắp ráp mô hình mẫu.',
          },
          {
            role: 'Phụ trách thử nghiệm & báo cáo',
            responsibility:
              'Đo kiểm hiệu năng, ghi nhận sai lệch và tổng hợp tài liệu bàn giao.',
          },
        ],
        caption:
          'Mẫu điều lệ dự án một trang tóm tắt tên dự án, mục tiêu, kết quả bàn giao, thời hạn và vai trò thành viên để cả nhóm thống nhất từ đầu.',
      },
      '---',
      '### Chia mục tiêu thành những công việc có thể thực hiện',
      'Sau khi thống nhất mục tiêu, nhóm cần xác định các nhiệm vụ. Một nhiệm vụ hiệu quả phải được mô tả đủ chi tiết và dễ hiểu để người thực hiện biết mình cần hoàn thành điều gì. Với một dự án kỹ thuật, chuỗi công việc có thể bắt đầu từ lập kế hoạch và hình thành ý tưởng, tiếp đến nghiên cứu, thiết kế, chế tạo và giao sản phẩm. Tùy loại dự án, các bước có thể được chia nhỏ hơn hoặc được sắp xếp theo trình tự khác nhau.',
      'Điều quan trọng không chỉ là có danh sách nhiệm vụ, mà còn phải xác định mối quan hệ giữa chúng. Có công việc chỉ có thể bắt đầu sau khi một công việc khác hoàn thành; có những nhiệm vụ có thể tiến hành song song; cũng có những nhiệm vụ cần phối hợp kết quả trước khi chuyển sang giai đoạn tiếp theo. Việc nhận diện quan hệ này giúp nhóm tránh bố trí lịch không thực tế, chẳng hạn lên kế hoạch thử nghiệm sản phẩm khi thiết kế hoặc chế tạo vẫn chưa sẵn sàng.',
      'Các mốc thời gian là những điểm mà tại đó một nhiệm vụ hoặc một giai đoạn cần hoàn thành. Mốc giúp nhóm nhìn thấy tiến độ và có cơ sở trao đổi khi một công việc bị chậm. Với sinh viên, thời gian có thể được chia theo đơn vị tuần để dễ theo dõi. Thay vì để một nhiệm vụ lớn kéo dài đến sát hạn, nhóm nên chia nó thành những giai đoạn ngắn hơn, mỗi giai đoạn có kết quả cụ thể. Khi đã thống nhất thời gian, các thành viên cần nghiêm túc bám sát lịch và chủ động báo sớm khi có nguy cơ không hoàn thành đúng hạn.',
      '---',
      '### Đưa thời gian và nguồn lực vào cùng một kế hoạch',
      'Ước lượng thời gian cần thiết cho từng nhiệm vụ là bước quan trọng để hình thành lịch trình. Nếu thời lượng được xác định quá ngắn, nhóm dễ rơi vào tình trạng liên tục trễ hạn; nếu quá dài, nguồn lực có thể bị giữ lại ở một công việc trong khi những phần khác đang cần sử dụng. Vì vậy, việc ước lượng nên dựa trên khối lượng công việc, người thực hiện và mối liên hệ với các nhiệm vụ khác. Khi nhóm hiểu trình tự công việc, việc sắp xếp thời gian sẽ sát với thực tế hơn.',
      'Tổ chức thực hiện cũng đòi hỏi xác định nguồn lực cần thiết, bao gồm con người, tiền và nguyên vật liệu. Nhóm cần biết nhiệm vụ nào cần nhiều người, công việc nào cần thiết bị hoặc vật liệu, khoản chi nào phải dự trù và thời điểm nào cần chuẩn bị. Việc nhóm các nhiệm vụ có liên quan sẽ giúp quá trình theo dõi gọn hơn. Sau đó, những công cụ như biểu đồ Gantt và PERT có thể được dùng để thể hiện lịch trình và quan hệ giữa các nhiệm vụ.',
      'Lập kế hoạch không kết thúc khi tài liệu được viết xong. Trong quá trình triển khai, nhóm cần theo dõi và giám sát việc thực hiện để so sánh tiến độ thực tế với kế hoạch. Khi có chênh lệch, điều quan trọng là nhận biết sớm, tìm nguyên nhân và xem xét điều chỉnh. Một kế hoạch hữu ích là kế hoạch được sử dụng trong suốt dự án, chứ không phải tài liệu chỉ được mở ra ở buổi họp đầu tiên.',
      {
        type: 'processDiagram',
        title: '5 bước lập kế hoạch dự án kỹ thuật',
        theme: 'light',
        steps: [
          { label: 'Điều lệ dự án', detail: 'Thống nhất mục tiêu, phạm vi và vai trò.' },
          { label: 'Danh sách nhiệm vụ', detail: 'Chia công việc đủ rõ để thực hiện.' },
          { label: 'Quan hệ & Mốc', detail: 'Xác định việc nối tiếp, song song và mốc tuần.' },
          { label: 'Thời lượng & Nguồn lực', detail: 'Ước lượng giờ công, nhân sự, vật liệu, chi phí.' },
          { label: 'Giám sát & Điều chỉnh', detail: 'Đối chiếu tiến độ thực tế qua PERT/Gantt.' },
        ],
      },
      '> Một nhiệm vụ chỉ thực sự sẵn sàng để giao khi người thực hiện hiểu rõ kết quả cần bàn giao và thời điểm phải hoàn thành.',
      'Khi mục tiêu, nhiệm vụ, mốc thời gian và nguồn lực đã được kết nối, nhóm có thể nhìn dự án như một hệ thống thay vì một tập hợp công việc rời rạc. Tuy nhiên, một kế hoạch viết bằng văn bản đôi khi vẫn khó hình dung. Đó là lý do các biểu đồ trực quan như PERT và Gantt được sử dụng để diễn tả mối quan hệ và tiến trình của dự án.',
    ],
  },
  {
    id: 'ch4-pert-and-gantt',
    category: 'Chương 4',
    detailCategory: 'Chương 4: Quản lý dự án',
    title: 'PERT và Gantt: Khi tiến độ dự án được nhìn thấy',
    sapo: 'Một công việc có thể phụ thuộc vào nhiều công việc khác, trong khi cả nhóm vẫn phải hoàn thành đúng hạn. PERT và Gantt giúp biến những mối quan hệ và khoảng thời gian ấy thành hình ảnh dễ theo dõi.',
    imageLabel: 'Biểu đồ kế hoạch và tiến độ dự án (Gantt)',
    imageSrc: '/assets/aistudio/image_94a4caf6.png',
    imageAlt:
      'Biểu đồ Gantt lập kế hoạch và lịch trình dự án với danh sách nhiệm vụ, thanh tiến độ theo tháng và các cột mốc',
    imageFit: 'contain',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Khi nhìn vào một bảng nhiệm vụ dài, người quản lý có thể biết nhóm cần làm những việc gì nhưng chưa chắc nhận ra công việc nào phụ thuộc vào công việc nào. Một nhiệm vụ bị chậm có thể kéo theo những nhiệm vụ khác, đặc biệt khi chúng cần kết quả đầu vào từ phần việc trước. Biểu đồ giúp thể hiện những mối liên hệ này rõ hơn, từ đó hỗ trợ nhóm tổ chức và giám sát tiến trình.',
      '---',
      '### PERT thể hiện trình tự và mối liên hệ giữa các nhiệm vụ',
      'Theo nội dung bài giảng, PERT là viết tắt của Program Evaluation and Review Technique, được Hải quân Mỹ phát triển vào những năm 1950. Trong cách minh họa của slide, mỗi nhiệm vụ được đặt trong một ô chữ nhật với mô tả ngắn gọn về công việc và khoảng thời gian thực hiện. Các mốc thời gian được thể hiện trong ô, còn mối liên hệ giữa các nhiệm vụ được diễn tả bằng đường thẳng hoặc mũi tên.',
      'Điểm quan trọng khi đọc sơ đồ PERT là theo dõi hướng liên kết. Mũi tên cho biết công việc nào nối tiếp hoặc có quan hệ với công việc nào. Nhìn vào sơ đồ, người đọc có thể nhận ra một số nhiệm vụ nằm trên cùng một chuỗi, trong khi những nhiệm vụ khác được triển khai theo nhánh rồi kết nối trở lại. Cách biểu diễn này giúp nhóm suy nghĩ về trình tự thực hiện trước khi bố trí người và thời gian.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_3b09e416.png',
        alt: 'Sơ đồ PERT minh họa các ô Bắt đầu, Nhiệm vụ 1 đến 5, Kết thúc kèm mốc ngày và mũi tên liên kết',
        caption:
          'Hình 2. Ví dụ sơ đồ PERT trong slide: các ô thể hiện nhiệm vụ và mốc ngày; mũi tên thể hiện mối liên hệ giữa các nhiệm vụ.',
        fit: 'contain',
      },
      'Trong ví dụ trên, dự án bắt đầu từ ô “Bắt đầu”. Một nhánh đi qua Nhiệm vụ 1 rồi Nhiệm vụ 4 trước khi đến “Kết thúc”. Các nhánh khác đi qua Nhiệm vụ 2 hoặc Nhiệm vụ 3 và tiếp tục liên kết với Nhiệm vụ 5 trước khi kết nối về điểm kết thúc. Người đọc không cần ghi nhớ màu sắc của từng mũi tên; điều cần quan sát là hướng đi và quan hệ giữa các ô. Khi một công việc ở đầu nhánh thay đổi, nhóm cần xem xét những nhiệm vụ tiếp theo có bị ảnh hưởng hay không.',
      'Biểu đồ PERT vì thế đặc biệt hữu ích khi nhóm cần làm rõ thứ tự công việc và sự phụ thuộc giữa các nhiệm vụ. Trước khi bắt đầu chế tạo một sản phẩm, chẳng hạn, nhóm cần kiểm tra xem thiết kế đã đủ điều kiện để chuyển sang chuẩn bị vật liệu hay chưa, và những phần việc nào có thể tiến hành song song. Việc nhìn thấy cấu trúc công việc giúp hạn chế tình trạng bắt đầu quá sớm một nhiệm vụ khi điều kiện đầu vào chưa sẵn sàng.',
      '---',
      '### Gantt cho biết công việc diễn ra trong khoảng thời gian nào',
      'Nếu PERT giúp người đọc nhìn thấy mối liên hệ giữa nhiệm vụ, biểu đồ Gantt tập trung vào tiến độ theo thời gian. Slide giới thiệu biểu đồ Gantt do kỹ sư người Mỹ Henry L. Gantt phát triển vào năm 1917 và xem đây là một trong những công cụ phổ biến dùng trong lập kế hoạch dự án. Biểu đồ có dạng các thanh nằm ngang; mỗi hàng tương ứng với một nhiệm vụ, còn trục ngang thể hiện thời gian theo ngày, tháng, năm, tuần hoặc một đơn vị thời gian phù hợp.',
      'Các nhiệm vụ được chia thành từng dòng theo trình tự thực hiện. Độ dài và vị trí của thanh cho người đọc biết công việc diễn ra trong khoảng thời gian nào. Những mốc thời gian hoặc giai đoạn có thể được thể hiện bằng màu sắc khác nhau. Nhờ đó, người quản lý có thể quan sát nhiệm vụ nào bắt đầu sớm, nhiệm vụ nào kéo dài qua nhiều tuần và giai đoạn nào có nhiều công việc diễn ra đồng thời.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_c6290052.png',
        alt: 'Bảng biểu đồ Gantt theo tuần với các nhiệm vụ từ thảo luận ý tưởng đến thi, kèm ảnh chân dung Henry L. Gantt',
        caption:
          'Hình 3. Ví dụ biểu đồ Gantt trong slide: danh sách nhiệm vụ, người tham gia và thời gian dự kiến theo từng tuần; ảnh chân dung Henry L. Gantt được giữ theo bản gốc.',
        fit: 'contain',
      },
      'Bảng Gantt trong hình minh họa một dự án được chia thành các công việc như thảo luận ý tưởng, nghiên cứu – thiết kế, hoàn thiện thiết kế, tập hợp vật liệu, xây dựng mẫu, thử mẫu và chuẩn bị báo cáo. Các ô màu cho thấy khoảng thời gian dự kiến dành cho từng nhiệm vụ. Cách thể hiện này giúp nhóm nhanh chóng nhận ra công việc nào đang chiếm nhiều tuần, thời điểm nào cần tập trung nguồn lực và khi nào phải hoàn tất báo cáo.',
      'Một ưu điểm khác của Gantt là có thể gắn công việc với người tham gia. Khi nhìn vào bảng, các thành viên không chỉ thấy thời gian mà còn biết ai hoặc nhóm nào được giao nhiệm vụ. Nếu một thanh công việc bị kéo dài, nhóm có thể cập nhật lại tiến độ và xem xét ảnh hưởng đến các hoạt động kế tiếp. Tuy vậy, biểu đồ chỉ hữu ích khi thông tin được cập nhật trung thực; một kế hoạch đẹp nhưng không phản ánh thực tế sẽ không giúp ích cho việc quản lý.',
      '---',
      '### Hai công cụ bổ trợ cho nhau',
      'PERT và Gantt không nhất thiết phải được xem là hai lựa chọn loại trừ nhau. PERT giúp làm rõ trình tự và mối quan hệ giữa các nhiệm vụ; Gantt giúp trình bày lịch trình theo thời gian. Khi kết hợp, nhóm có thể vừa hiểu công việc nào phụ thuộc vào công việc nào, vừa biết mỗi công việc dự kiến diễn ra trong khoảng thời gian nào. Đây là cơ sở để tổ chức thực hiện, phân công trách nhiệm và theo dõi tiến độ.',
      'Bài giảng cũng nêu một số phần mềm hỗ trợ xây dựng biểu đồ, gồm Excel, Microsoft Project, GanttProject, Open Workbench và OmniPlan. Với dự án học tập đơn giản, nhóm có thể bắt đầu bằng bảng tính hoặc mẫu biểu đồ cơ bản. Khi dự án có nhiều nhiệm vụ và quan hệ phức tạp hơn, phần mềm chuyên dụng có thể hỗ trợ quản lý lịch trình thuận tiện hơn. Dù dùng công cụ nào, chất lượng của biểu đồ vẫn phụ thuộc vào việc nhóm đã xác định đúng nhiệm vụ, thời lượng và quan hệ công việc hay chưa.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_94a4caf6.png',
        alt: 'Giao diện biểu đồ Gantt lập kế hoạch dự án hiển thị tên nhiệm vụ, thanh tiến độ theo tháng và các cột mốc',
        caption:
          'Biểu đồ Gantt trên phần mềm lập kế hoạch giúp theo dõi đồng thời danh sách nhiệm vụ, thanh tiến độ theo thời gian và các mốc hoàn thành.',
        fit: 'contain',
      },
      '> Biểu đồ không thay thế tư duy lập kế hoạch; nó làm cho kế hoạch trở nên dễ nhìn, dễ trao đổi và dễ kiểm soát hơn.',
      'Một khi tiến độ đã được thể hiện rõ ràng, thách thức tiếp theo là đưa kế hoạch vào hoạt động của nhóm. Điều đó đòi hỏi phân công phù hợp, phối hợp giữa các thành viên và cập nhật công việc thường xuyên.',
    ],
  },
  {
    id: 'ch4-team-assignment',
    category: 'Chương 4',
    detailCategory: 'Chương 4: Quản lý dự án',
    title: 'Một nhóm dự án hiệu quả bắt đầu từ cách phân công',
    sapo: 'Kế hoạch chỉ phát huy tác dụng khi từng thành viên biết vai trò của mình, khối lượng công việc được phân bổ hợp lý và tiến độ được cập nhật thường xuyên.',
    imageLabel: 'Nhóm sinh viên họp cập nhật tiến độ dự án',
    imageSrc: '/assets/aistudio/image_41455bcd.png',
    imageAlt:
      'Nhóm kỹ thuật họp cập nhật tiến độ quanh bàn làm việc với máy tính, bản vẽ kỹ thuật, mẫu thử và màn hình CAD',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Trong một dự án nhóm, việc có nhiều người tham gia không tự động làm cho công việc nhanh hơn. Nếu nhiệm vụ không rõ ràng, một số thành viên có thể cùng làm một phần trong khi những phần khác bị bỏ trống. Nếu công việc được giao không phù hợp với khả năng hoặc điều kiện của người thực hiện, tiến độ cũng dễ bị ảnh hưởng. Vì vậy, phân công là một bước quản lý cần được thực hiện sau khi nhóm đã có kế hoạch sơ bộ, thay vì giao việc ngay khi ý tưởng vừa được lựa chọn.',
      'Chương 4 nhấn mạnh rằng nhiệm vụ nên được phân cho các thành viên theo sở trường. Điều này đòi hỏi nhóm hiểu tương đối rõ năng lực, kinh nghiệm và khả năng tham gia của từng người. Một thành viên có khả năng thiết kế có thể phù hợp với phần nghiên cứu và hoàn thiện bản vẽ; người có kinh nghiệm chế tạo có thể tham gia chuẩn bị vật liệu hoặc xây dựng mẫu. Đây chỉ là ví dụ về cách cân nhắc sở trường, không phải quy tắc cố định cho mọi nhóm. Điều quan trọng là công việc được giao phải phù hợp với yêu cầu nhiệm vụ và năng lực của người thực hiện.',
      'Trình tự phân công cũng có ý nghĩa. Sau khi có bản kế hoạch sơ bộ, nhóm mới nên phân nhiệm vụ cụ thể cho từng thành viên. Khi đó, người điều phối đã có cái nhìn về tổng khối lượng công việc, thời gian cần thiết và mối liên hệ giữa các nhiệm vụ. Nếu chia việc trước khi xác định đầy đủ công việc, nhóm có thể phải phân công lại nhiều lần hoặc phát hiện quá muộn rằng một nhiệm vụ quan trọng chưa có người phụ trách.',
      '---',
      '### Cân bằng công việc và duy trì trao đổi',
      'Phân công hợp lý không có nghĩa là mọi người luôn nhận số lượng nhiệm vụ giống hệt nhau. Một nhiệm vụ có thể đòi hỏi nhiều thời gian hơn nhiệm vụ khác, vì vậy nhóm cần xem xét cả mức độ phức tạp và thời lượng dự kiến. Người quản lý cần chú ý tránh để một thành viên phải gánh quá nhiều việc trong khi người khác không có nhiệm vụ rõ ràng. Khi khối lượng được phân bổ hợp lý, các thành viên có thể tập trung vào phần việc của mình và chủ động phối hợp khi cần bàn giao kết quả.',
      'Một kế hoạch cũng cần được cập nhật. Bài giảng đề xuất hàng tuần nên cập nhật công việc của từng cá nhân được phân công. Buổi cập nhật không nhất thiết phải kéo dài; điều cần thiết là làm rõ phần việc đã hoàn thành, phần việc đang thực hiện và vấn đề có thể ảnh hưởng đến thời hạn. Khi một nhiệm vụ bị chậm, nhóm cần thông báo sớm để xem xét điều chỉnh người hỗ trợ, thời gian hoặc trình tự công việc. Im lặng cho đến sát hạn thường khiến nhóm mất cơ hội xử lý.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_41455bcd.png',
        alt: 'Nhóm kỹ thuật họp cập nhật tiến độ hàng tuần quanh bàn với laptop, bản vẽ và thiết bị thử nghiệm',
        caption:
          'Buổi cập nhật hàng tuần giúp các thành viên đối chiếu phần việc đã hoàn thành, xử lý vướng mắc sớm và giữ nhịp phối hợp chung.',
      },
      'Biểu đồ Gantt có thể trở thành công cụ trao đổi chung trong những buổi cập nhật như vậy. Mỗi thành viên nhìn thấy nhiệm vụ và khoảng thời gian dự kiến, đồng thời có thể đối chiếu tiến độ thực tế với lịch đã thống nhất. Nếu dùng bảng tính, nhóm có thể tô màu những công việc đã hoàn thành, đang thực hiện hoặc cần chú ý. Nếu dùng phần mềm quản lý dự án, nhóm vẫn cần thống nhất cách cập nhật để mọi người hiểu cùng một trạng thái công việc.',
      'Đối với những nhiệm vụ có quan hệ phụ thuộc, trao đổi giữa các thành viên càng quan trọng. Người thực hiện công việc đầu vào cần biết kết quả của mình sẽ được bàn giao cho ai và khi nào. Người nhận kết quả cần phản hồi sớm nếu thông tin hoặc sản phẩm chưa đủ để tiếp tục. Cách phối hợp này giúp hạn chế việc một nhiệm vụ đã được đánh dấu hoàn thành nhưng thực tế chưa đáp ứng yêu cầu của công đoạn kế tiếp.',
      '---',
      '### Thử áp dụng vào một dự án hoàn thành trong một tuần',
      'Bài tập cuối chương yêu cầu nhóm chọn tên đề tài đã xác định, hoàn thành dự án trong thời gian một tuần và đáp ứng những yêu cầu kỹ thuật mà nhóm đề ra. Nhóm cần xác định các nhiệm vụ của dự án, vẽ biểu đồ PERT, ước lượng thời gian tối đa để hoàn thành và sử dụng biểu đồ Gantt để lập kế hoạch. Đây là cơ hội để kết nối các nội dung đã học: mục tiêu và yêu cầu kỹ thuật trở thành căn cứ lập kế hoạch; danh sách nhiệm vụ được tổ chức thành quan hệ công việc; PERT thể hiện trình tự; Gantt thể hiện lịch trình theo tuần hoặc theo ngày.',
      'Khi thực hiện bài tập, nhóm nên bắt đầu bằng việc thống nhất kết quả cuối cùng và những yêu cầu kỹ thuật cần đạt. Sau đó, các thành viên cùng phân chia dự án thành nhiệm vụ cụ thể, làm rõ nhiệm vụ nào cần hoàn tất trước và nhiệm vụ nào có thể tiến hành song song. Trên cơ sở đó, nhóm ước lượng thời gian, xác định mốc hoàn thành và bố trí người phụ trách. Nếu tổng thời gian dự kiến vượt quá một tuần, nhóm cần xem lại phạm vi công việc, cách tổ chức hoặc nguồn lực, nhưng không nên tự ý bỏ qua những yêu cầu kỹ thuật cốt lõi.',
      'Trong suốt tuần thực hiện, việc cập nhật định kỳ giúp nhóm nhận ra chênh lệch giữa kế hoạch và thực tế. Một nhiệm vụ chậm không nhất thiết khiến toàn bộ dự án thất bại, nhưng nhóm cần biết nó ảnh hưởng đến những công việc nào và có thể điều chỉnh ra sao. Khi sản phẩm được hoàn thiện, nhóm đối chiếu kết quả với yêu cầu kỹ thuật đã thống nhất, kiểm tra thời hạn và xem xét việc sử dụng nguồn lực. Qua đó, bài tập không chỉ là thao tác vẽ biểu đồ mà còn là một lần thực hành quản lý dự án ở quy mô nhỏ.',
      {
        type: 'pullQuote',
        quote: 'Phân công tốt là rõ người, rõ việc và rõ thời điểm bàn giao.',
        attribution: 'Nguyên tắc điều phối nhóm dự án',
        tone: 'blue',
        pairedParagraph:
          'Một nhóm hiệu quả không nhất thiết đông người hay có lịch trình dày đặc. Đó là nhóm hiểu mục tiêu, phân công theo sở trường, cân bằng khối lượng, thường xuyên trao đổi và điều chỉnh khi cần. Khi mỗi người thấy rõ vai trò của mình trong bức tranh chung, kế hoạch mới thực sự trở thành công cụ đưa dự án đến đích.',
      },
    ],
  },
  {
    id: 'ch5-teamwork-intro',
    category: 'Chương 5',
    detailCategory: 'Chương 5: Kỹ năng làm việc nhóm',
    title: 'Một cá nhân giỏi có thể thay thế cả một tập thể?',
    sapo: 'Sức mạnh của nhóm không nằm ở số người tham gia, mà ở cách những năng lực khác nhau được kết nối để cùng giải quyết một mục tiêu.',
    imageLabel: 'Nhóm sinh viên kỹ thuật trao đổi ý tưởng trên bảng trắng',
    imageSrc: '/assets/aistudio/image_729076e9.png',
    imageAlt:
      'Nhóm kỹ thuật thảo luận quanh bàn họp với máy tính và bảng kế hoạch Sprint Retrospective',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Trong một dự án kỹ thuật, có người giỏi thiết kế, người có khả năng tính toán, người khéo tay trong chế tạo và người giao tiếp tốt với khách hàng. Nếu mỗi người chỉ làm tốt phần việc riêng mà không chia sẻ thông tin, sản phẩm cuối cùng vẫn có thể thất bại. Bản vẽ có thể không phù hợp với vật liệu, chi phí dự tính không khớp với phương án chế tạo, hoặc tiến độ của công đoạn này không chờ được công đoạn khác. Ngược lại, khi những năng lực riêng được kết nối và bổ sung cho nhau, nhóm có thể xử lý một công việc phức tạp vượt quá khả năng của từng cá nhân.',
      'Đó là lý do làm việc nhóm trở thành một yêu cầu quan trọng trong môi trường học tập và nghề nghiệp. Khoa học kỹ thuật ngày càng phát triển, các dự án thường đòi hỏi nhiều chuyên môn, nguồn lực và góc nhìn khác nhau. Một người khó có thể đồng thời nắm vững mọi lĩnh vực, nhưng một nhóm được tổ chức tốt có thể tập hợp những thế mạnh cần thiết để đi đến kết quả chung.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_1a3a66c1.png',
        alt: 'Đàn ngỗng bay theo đội hình chữ V trên bầu trời',
        caption:
          'Đàn ngỗng bay theo đội hình là hình ảnh minh họa cho sự phối hợp và hỗ trợ lẫn nhau được sử dụng trong slide Chương 5.',
        fit: 'contain',
      },
      'Slide dẫn lại nhận định rằng đội hình bay của đàn ngỗng trời Canada có thể giúp giảm 71% lực cản so với khi bay riêng lẻ (theo tài liệu [1] được dẫn trong slide). Vì thông tin thư mục của tài liệu [1] không xuất hiện đầy đủ trong bản trình chiếu, con số này cần được đối chiếu với nguồn gốc trước khi sử dụng như một dữ kiện xuất bản. Dù vậy, hình ảnh đàn ngỗng vẫn gợi ra một ý nghĩa dễ hiểu: phối hợp đúng cách có thể giúp từng cá thể tiết kiệm sức lực và hỗ trợ cả tập thể duy trì hành trình.',
      '---',
      '### Nhóm không đơn thuần là một tập hợp người',
      'Theo định nghĩa được dẫn trong bài giảng, Katzenbach và Smith xem nhóm là một số người có các kỹ năng khác nhau, chia sẻ trách nhiệm, cam kết làm việc cùng nhau, bổ sung và hỗ trợ lẫn nhau để đạt mục tiêu chung. Lewis-McClear diễn đạt ngắn gọn hơn: nhóm là hai hay nhiều người làm việc với nhau để cùng hoàn thành một mục tiêu chung. Hai cách diễn đạt cùng nhấn mạnh ba yếu tố: có mục tiêu chung, có sự tương tác và có trách nhiệm được chia sẻ.',
      'Một nhóm vì thế không chỉ được xác định bằng việc các thành viên có tên trong cùng một danh sách. Nếu mỗi người làm phần việc của mình nhưng không quan tâm đến tiến độ, khó khăn hay kết quả của người khác, sự kết nối giữa họ còn rất lỏng lẻo. Trong một nhóm thực sự, thành viên phụ thuộc vào thông tin của nhau để hoàn thành công việc; quyết định của một người có thể ảnh hưởng đến phần việc của người khác. Nhóm cũng cần sự tương tác giữa các thành viên và với người điều phối để duy trì hướng đi chung.',
      'Có thể hình dung nhóm như một cỗ máy có nhiều bộ phận. Mỗi bộ phận có chức năng riêng, nhưng giá trị của toàn bộ hệ thống chỉ xuất hiện khi các bộ phận phối hợp đúng cách. Một thành viên có chuyên môn nổi bật không đương nhiên thay thế được toàn bộ nhóm; ngược lại, nhiều thành viên giỏi cũng chưa chắc tạo ra kết quả tốt nếu thiếu phối hợp.',

      '---',
      '### Nhóm chính thức, nhóm không chính thức và lý do cần hợp tác',
      'Trong tổ chức, nhóm có thể được phân thành nhóm chính thức và nhóm không chính thức. Nhóm chính thức thường có tổ chức ổn định, phân công rõ ràng và được hình thành để thực hiện những công việc có tính liên tục hoặc những dự án, công trình cần phối hợp chuyên môn. Các thành viên có thể cùng ngành nghề hoặc sở hữu những kỹ năng bổ sung cho nhau. Vì có cơ cấu và mục tiêu tương đối rõ, nhóm chính thức thường cần quy tắc, quy trình, báo cáo và ghi chép tiến độ.',
      'Nhóm không chính thức thường được tập hợp linh hoạt hơn, có thể làm việc theo thời vụ, theo dự án ngắn hạn hoặc để xử lý một yêu cầu phát sinh. Một số nhóm được thành lập để trao đổi chiến lược, tìm kiếm ý tưởng sáng tạo hay giải quyết nhanh một vấn đề đặc biệt. Quy trình của nhóm dạng này có thể ít nghiêm ngặt hơn, nhưng điều đó không có nghĩa là nhóm không cần mục tiêu hoặc trách nhiệm. Dù thuộc loại nào, việc lãnh đạo và phối hợp vẫn cần hướng đến kết quả.',
      'Lý do căn bản để làm việc nhóm rất đơn giản: không ai hoàn hảo. Mỗi người có một thế mạnh, một giới hạn và một cách nhìn nhận vấn đề. Khi được kết hợp phù hợp, những điểm mạnh có thể bù đắp điểm yếu, mở rộng khả năng sáng tạo và nâng chất lượng giải quyết vấn đề. Quá trình trao đổi cũng giúp nhóm xem xét một quyết định từ nhiều góc độ trước khi lựa chọn phương án.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_729076e9.png',
        alt: 'Nhóm thành viên trao đổi phương án và ghi chú công việc trước bảng trắng',
        caption:
          'Trao đổi cởi mở giúp các thành viên kết nối góc nhìn khác nhau và sớm phát hiện điểm cần điều chỉnh trong kế hoạch chung.',
      },
      'Lợi ích của làm việc nhóm còn thể hiện ở khả năng cải tiến quy trình, tăng hiệu quả giao tiếp và củng cố tinh thần làm việc. Khi mỗi thành viên có cơ hội đóng góp, nhóm có thể phát hiện những phương án mà một cá nhân khó nghĩ ra. Tuy nhiên, lợi ích ấy không tự động xuất hiện chỉ vì mọi người ngồi chung một bàn. Nó phụ thuộc vào cách nhóm tổ chức trao đổi, phân chia nhiệm vụ và xử lý khác biệt.',
      '---',
      '### Khi làm việc nhóm tạo ra tác dụng ngược',
      'Làm việc nhóm cũng có những giới hạn. Một số thành viên có thể có ảnh hưởng quá lớn, khiến quyết định thiếu khách quan. Khối lượng công việc đôi khi không được phân bổ đều: người tích cực phải làm thay phần của người ít tham gia. Những cá nhân có chuyên môn cao có thể cho rằng họ đủ khả năng tự quyết định mà không cần trao đổi. Trong khi đó, quá trình thảo luận và thống nhất đôi khi mất nhiều thời gian hơn so với quyết định cá nhân. Khác biệt về kinh nghiệm, chuyên môn, văn hóa hoặc cách nhìn nhận cũng có thể làm giảm hiệu quả phối hợp.',
      'Một số nguyên nhân thường khiến nhóm hoạt động không như mong đợi là quá nể nang, ngại nói thẳng khi không đồng ý; đùn đẩy trách nhiệm; thảo luận kéo dài nhưng không đi đến kết luận; phân chia công việc không minh bạch; hoặc một vài thành viên chỉ chấp nhận ý kiến của mình. Những biểu hiện này cho thấy nhóm không thiếu người, mà thiếu cơ chế phối hợp và tinh thần chịu trách nhiệm chung.',
      {
        type: 'pullQuote',
        quote:
          'Một tập thể mạnh không phải là nơi mọi người có cùng suy nghĩ, mà là nơi những khác biệt được sử dụng để phục vụ một mục tiêu chung.',
        attribution: 'Chương 5 — Sức mạnh của tập thể',
        tone: 'ink',
        pairedParagraph:
          'Vì vậy, câu hỏi cần đặt ra không phải là “có nên làm việc nhóm trong mọi trường hợp hay không”, mà là “công việc này cần những năng lực nào và mức độ phối hợp ra sao?”. Với nhiệm vụ đơn giản, một cá nhân có thể xử lý nhanh hơn. Với dự án phức tạp, có nhiều chuyên môn hoặc cần kiểm tra chéo, nhóm thường tạo ra lợi thế rõ rệt. Hiểu đúng bản chất và giới hạn của làm việc nhóm là bước đầu để tổ chức một tập thể hiệu quả.',
      },
    ],
  },
  {
    id: 'ch5-team-stages',
    category: 'Chương 5',
    detailCategory: 'Chương 5: Kỹ năng làm việc nhóm',
    title: 'Một nhóm không thể trưởng thành chỉ sau một cuộc họp',
    sapo: 'Từ những cá nhân còn dè dặt đến một tập thể biết tự phối hợp, nhóm cần đi qua các giai đoạn hình thành, xung đột, bình thường hóa và vận hành hiệu quả.',
    imageLabel: 'Nhóm trao đổi xử lý bất đồng trong cuộc họp',
    imageSrc: '/assets/aistudio/image_00b9ac63.png',
    imageAlt:
      'Cuộc họp nhóm thảo luận sôi nổi với nhiều quan điểm trái chiều quanh bàn làm việc',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Khi một nhóm mới được thành lập, mọi người thường bắt đầu bằng sự thận trọng. Thành viên chưa hiểu rõ cách làm việc của nhau, chưa biết ai có thế mạnh gì và cũng chưa chắc chắn về vai trò của mình. Sau một thời gian, những khác biệt về tính cách, chuyên môn và kỳ vọng có thể xuất hiện thành bất đồng. Nếu nhóm biết xử lý các va chạm này, thành viên dần hình thành quy tắc chung, tin tưởng lẫn nhau và có khả năng làm việc độc lập hơn. Quá trình ấy cho thấy một nhóm hiệu quả không xuất hiện ngay từ ngày đầu tiên.',
      'Bài giảng Chương 5 mô tả quá trình phát triển nhóm qua bốn giai đoạn: hình thành, xung đột, bình thường hóa và hoạt động trôi chảy. Có thể xem đây là một lộ trình để nhận diện trạng thái của nhóm và lựa chọn cách điều hành phù hợp, thay vì coi các giai đoạn là những chiếc nhãn cố định cho mọi tập thể.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_2f8d5f8d.png',
        alt: 'Biểu đồ bốn giai đoạn phát triển nhóm: Hình thành, Xung đột, Bình thường hóa và Vận hành theo thái độ và mức độ tín nhiệm',
        caption:
          'Sơ đồ bốn giai đoạn phát triển nhóm, kèm sự thay đổi về thái độ, mức độ phụ thuộc và tín nhiệm.',
        fit: 'contain',
      },
      '---',
      '### Từ dè dặt đến va chạm',
      'Ở giai đoạn hình thành, các thành viên vừa tập hợp lại và bắt đầu tìm hiểu mục tiêu cũng như vị trí của mình trong nhóm. Việc giao tiếp thường còn dè dặt; những ý kiến riêng chưa được bộc lộ đầy đủ. Thành viên có thể chưa chủ động thể hiện vai trò, đặc biệt khi chưa chắc chắn về mức độ an toàn hoặc tầm quan trọng của mình. Trong giai đoạn này, nhóm cần ổn định cơ cấu, thống nhất mục tiêu, phân công vai trò và thiết lập một số nguyên tắc hoạt động. Trao đổi cởi mở về chuyên môn, nguyện vọng, sở trường và kinh nghiệm sẽ giúp các thành viên hiểu nhau hơn.',
      'Khi công việc bắt đầu cụ thể, nhóm có thể bước vào giai đoạn xung đột. Những tính cách khác nhau va chạm, các thành viên có thể hình thành nhóm nhỏ hoặc bảo vệ quan điểm của mình đến cùng. Giao tiếp đôi khi giảm sút vì mọi người chưa sẵn sàng lắng nghe; lời nói mỉa mai, ám chỉ hoặc phản ứng phòng thủ có thể xuất hiện. Đây là giai đoạn dễ khiến nhóm mất phương hướng, nhưng xung đột cũng có thể làm lộ ra những vấn đề vốn bị che khuất từ trước.',
      'Vai trò của trưởng nhóm trong giai đoạn này đặc biệt quan trọng. Người điều phối cần đưa trao đổi trở lại nhiệm vụ, làm rõ vấn đề thay vì để tranh cãi chuyển thành công kích cá nhân, và thể hiện sự quyết đoán khi nhóm cần một hướng đi. Nhóm cũng nên chấp nhận rằng một số thử nghiệm có thể chưa thành công; điều quan trọng là rút kinh nghiệm, điều chỉnh cách phối hợp và không để bất đồng kéo dài thành đối đầu.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_00b9ac63.png',
        alt: 'Cuộc họp nhóm có nhiều ý kiến trái chiều đang tranh luận trước tài liệu và biểu đồ',
        caption:
          'Những va chạm về quan điểm trong giai đoạn xung đột đòi hỏi người điều phối đưa trao đổi quay lại trọng tâm nhiệm vụ.',
      },
      '---',
      '### Khi quy tắc chung được hình thành',
      'Sau giai đoạn xung đột, nhóm có thể đi đến bình thường hóa. Các thành viên bắt đầu nhận thấy lợi ích của việc cộng tác; xung đột nội bộ giảm bớt và mọi người cảm thấy an toàn hơn khi trình bày ý kiến. Điểm thay đổi quan trọng không chỉ là không còn tranh cãi, mà là thành viên bắt đầu lắng nghe nhau. Những phương pháp làm việc chung, quy trình và kỳ vọng dần được hình thành, giúp mọi người hiểu cách phối hợp mà không phải thương lượng lại từ đầu trong mỗi nhiệm vụ.',
      'Ở giai đoạn này, vai trò điều hành có thể được chia sẻ nhiều hơn cho các thành viên. Trưởng nhóm không nhất thiết phải quyết định mọi việc; nhóm cần phát huy tính dân chủ, coi trọng tiếng nói tập thể và sử dụng quy trình, biểu mẫu phù hợp để duy trì tính chuyên nghiệp. Khi đã có nền tảng hợp tác, nhóm có thể nhận những dự án có khách hàng, yêu cầu thời gian hoặc mức độ phối hợp cao hơn, nhưng vẫn cần tránh phân tán lực lượng và thay đổi thành viên thiếu cân nhắc.',
      'Giai đoạn cuối cùng là hoạt động trôi chảy. Nhóm đã có hệ thống làm việc ổn định, các thành viên trao đổi quan điểm tự do và thoải mái, đồng thời hỗ trợ nhau ở mức cao. Mỗi người có thể chủ động phát huy năng lực mà không cần bị giám sát liên tục. Trách nhiệm không còn phụ thuộc hoàn toàn vào trưởng nhóm; thành viên tự quản lý công việc, tôn trọng cách làm hiệu quả của nhau và cùng chịu trách nhiệm về quyết định của tập thể.',
      'Một nhóm ở giai đoạn hoạt động trôi chảy không có nghĩa là không bao giờ gặp khó khăn. Dự án mới, thay đổi nhân sự hoặc áp lực tiến độ có thể khiến nhóm phải điều chỉnh cách làm, thậm chí quay lại một số vấn đề từng gặp. Điều quan trọng là nhóm đã tích lũy được sự tín nhiệm và kinh nghiệm để xử lý những thay đổi đó mà không đánh mất mục tiêu chung.',
      '> “Coming together is a beginning, staying together is progress, and working together is success.” — Henry Ford',
      {
        type: 'processDiagram',
        title: '4 giai đoạn phát triển nhóm',
        subtitle:
          'Phong cách điều hành cần thích ứng theo từng mức độ trưởng thành của tập thể',
        theme: 'dark',
        steps: [
          {
            badge: 'GĐ 01',
            label: 'Hình thành',
            detail: 'Ổn định cơ cấu, thống nhất mục tiêu và nguyên tắc chung.',
          },
          {
            badge: 'GĐ 02',
            label: 'Xung đột',
            detail: 'Đưa va chạm quay lại trọng tâm nhiệm vụ, tránh công kích.',
          },
          {
            badge: 'GĐ 03',
            label: 'Bình thường hóa',
            detail: 'Lắng nghe nhau, chuẩn hóa quy trình và chia sẻ quyền quyết.',
          },
          {
            badge: 'GĐ 04',
            label: 'Hoạt động trôi chảy',
            detail: 'Tự quản công việc, tín nhiệm cao và hỗ trợ lẫn nhau.',
          },
        ],
        loopNote:
          'Khi nhận dự án mới, thay đổi nhân sự hoặc chịu áp lực tiến độ, nhóm có thể phải rà soát lại các giai đoạn trước.',
      },
      'Bốn giai đoạn vì vậy không chỉ là một mô hình để ghi nhớ. Chúng gợi ý rằng cách lãnh đạo cần thay đổi theo mức độ trưởng thành của nhóm. Khi mới thành lập, nhóm cần định hướng và cấu trúc. Khi xung đột, nhóm cần làm rõ bất đồng và bảo vệ giao tiếp. Khi bình thường hóa, nhóm cần củng cố quy trình và mở rộng trách nhiệm. Khi vận hành trôi chảy, điều quan trọng là duy trì sự tin tưởng, quyền chủ động và khả năng tự quản. Nhận diện đúng giai đoạn giúp trưởng nhóm tránh áp dụng một cách điều hành duy nhất cho mọi thời điểm.',
    ],
  },
  {
    id: 'ch5-pride-and-skills',
    category: 'Chương 5',
    detailCategory: 'Chương 5: Kỹ năng làm việc nhóm',
    title: 'Một nhóm mạnh được tạo nên từ những cá nhân khác biệt',
    sapo: 'Mục tiêu rõ ràng, sự tôn trọng, giao tiếp cởi mở và các vai trò bổ sung cho nhau tạo nên nền tảng của một tập thể có khả năng làm việc hiệu quả.',
    imageLabel: 'Minh họa sự bổ sung vai trò trong nhóm qua các mảnh ghép',
    imageSrc: '/assets/aistudio/image_60f1388a.png',
    imageAlt:
      'Bốn nhân vật cùng ghép bốn mảnh ghép màu xanh dương, xanh lá, vàng và đỏ thành một khối hoàn chỉnh',
    imageFit: 'contain',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Trong một nhóm kỹ thuật, không phải ai cũng cần giỏi cùng một việc. Người có tư duy hệ thống có thể nhìn ra mối liên hệ giữa các bộ phận; người cẩn thận phát hiện sai số; người khéo giao tiếp giúp nhóm làm rõ yêu cầu; người có khả năng tổ chức giữ cho công việc đi đúng tiến độ. Sự khác biệt chỉ trở thành lợi thế khi nhóm biết nhận diện, tôn trọng và kết hợp chúng. Nếu thành viên cạnh tranh để chứng minh ai giỏi hơn, năng lực riêng dễ biến thành rào cản. Nếu mỗi người hiểu vai trò của mình và hỗ trợ người khác, nhóm có thể tạo ra kết quả lớn hơn tổng các phần việc riêng lẻ.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_60f1388a.png',
        alt: 'Hình ảnh bốn thành viên cùng ghép các mảnh ghép khác màu thành một tổng thể thống nhất',
        caption:
          'Hình ảnh các thành viên cùng ghép những mảnh khác nhau thành một tổng thể, minh họa cho tính bổ sung trong nhóm.',
        fit: 'contain',
      },
      '---',
      '### Mục tiêu chung và nguyên tắc PRIDE',
      'Một nhóm thành công trước hết cần mục tiêu rõ ràng, vai trò lãnh đạo phù hợp, sự đóng góp của tất cả thành viên, giao tiếp hiệu quả, khả năng phát huy sáng tạo và một kế hoạch biết tận dụng nguồn lực. Các yếu tố này không hoạt động tách rời. Mục tiêu giúp nhóm xác định điều cần đạt; vai trò lãnh đạo giúp duy trì hướng đi; sự đóng góp và giao tiếp giúp kết nối hành động; sáng tạo và kế hoạch giúp nhóm tìm cách thực hiện mục tiêu trong điều kiện cụ thể.',
      'Bài giảng giới thiệu nguyên tắc PRIDE như một cách ghi nhớ những nền tảng của nhóm. Purpose nhấn mạnh mục đích và mục tiêu chung. Respect là sự tin tưởng, tôn trọng và hỗ trợ lẫn nhau. Individual nhắc nhóm nhận biết và tôn trọng khác biệt của từng cá nhân, từ đó mở rộng sáng tạo và trí tưởng tượng tập thể. Discussion yêu cầu thảo luận cởi mở, trung thực và thường xuyên. Excellence là tinh thần cùng phấn đấu đạt mức xuất sắc. PRIDE không nên chỉ được treo như một khẩu hiệu; giá trị của nó thể hiện trong cách nhóm trao đổi, phân công và đánh giá công việc hằng ngày.',
      {
        type: 'statSpotlight',
        headline: 'P · R · I · D · E',
        label: '5 nguyên tắc nền tảng & 7 kỹ năng làm việc nhóm',
        summary:
          'Kết hợp cùng bảy kỹ năng cá nhân mỗi thành viên cần rèn luyện: lắng nghe, chất vấn, thuyết phục, tôn trọng, trợ giúp, sẻ chia và chung sức.',
        theme: 'yellow',
        items: [
          { value: 'P — Purpose', caption: 'Mục đích và mục tiêu chung rõ ràng' },
          { value: 'R — Respect', caption: 'Tôn trọng, tin tưởng và hỗ trợ lẫn nhau' },
          { value: 'I — Individual', caption: 'Ghi nhận khác biệt để mở rộng sáng tạo' },
          { value: 'D — Discussion', caption: 'Thảo luận cởi mở, trung thực, thường xuyên' },
          { value: 'E — Excellence', caption: 'Cùng phấn đấu đạt chuẩn chất lượng cao' },
        ],
      },
      'Một nhóm cũng cần có nhiệm vụ và ranh giới hoạt động rõ ràng, quyền hạn của các thành viên được phân chia cụ thể và mức độ ổn định nhân sự đủ để duy trì phối hợp. Khi nhiệm vụ không rõ, hai người có thể cùng làm một việc trong khi một việc khác bị bỏ sót. Khi quyền hạn không rõ, thành viên không biết mình có thể quyết định đến đâu. Khi nhóm thay đổi người liên tục, kinh nghiệm và thông tin phối hợp khó được tích lũy.',
      '---',
      '### Vai trò rõ ràng, kỹ năng bổ sung',
      'Trong một nhóm, các vai trò có thể được phân chia theo nhu cầu công việc. Nhà tài trợ hỗ trợ và trao quyền cho nhóm. Lãnh đạo hoặc người điều phối tổ chức hoạt động và giữ cho nhóm tập trung vào mục tiêu. Người hỗ trợ giúp các thành viên tháo gỡ khó khăn. Người đánh giá nhìn bức tranh toàn cảnh và xem xét kết quả. Người ghi chép chịu trách nhiệm về tài liệu, quyết định và thông tin của nhóm. Đội ngũ thành viên trực tiếp tham gia hoàn thành nhiệm vụ. Trong nhóm nhỏ, một người có thể đảm nhận nhiều vai trò; điều quan trọng là trách nhiệm không bị bỏ trống hoặc chồng lấn.',
      'Kỹ năng làm việc nhóm là khả năng tương tác giữa các thành viên để thúc đẩy hiệu quả công việc và phát triển tiềm năng của mỗi người. Nó bao gồm việc xây dựng vai trò chính trong nhóm, quản lý hội họp, phát triển quy trình làm việc, kích thích sáng tạo và xử lý các vấn đề nảy sinh. Bên cạnh kỹ năng tổ chức, mỗi thành viên cần rèn luyện bảy kỹ năng cá nhân: lắng nghe, chất vấn, thuyết phục, tôn trọng, trợ giúp, sẻ chia và chung sức.',
      'Lắng nghe giúp thành viên hiểu được thông tin và quan điểm trước khi phản hồi. Chất vấn không phải là bác bỏ người khác, mà là đặt câu hỏi để làm sáng tỏ giả định hoặc phát hiện điểm chưa hợp lý. Thuyết phục giúp trình bày lập luận và tạo sự đồng thuận. Tôn trọng giữ cho khác biệt không biến thành công kích. Trợ giúp và sẻ chia giúp kiến thức, kinh nghiệm được luân chuyển trong nhóm. Chung sức nhắc mỗi người đặt kết quả tập thể bên cạnh phần việc cá nhân. Khi một trong những kỹ năng này yếu, nhóm có thể gặp trở ngại: không lắng nghe dẫn đến hiểu sai, thiếu chất vấn khiến sai sót không được phát hiện, thiếu tôn trọng làm thành viên ngại đóng góp.',

      'Giải quyết vấn đề cũng là năng lực quan trọng. Quy trình được trình bày trong slide bắt đầu bằng việc xác định vấn đề, sau đó thu thập thông tin, đề xuất các giải pháp, phân tích và so sánh các phương án, đưa ra quyết định, lập kế hoạch rồi thực hiện. Trình tự này giúp nhóm tránh nhảy ngay đến giải pháp khi chưa hiểu rõ nguyên nhân. Một vấn đề được mô tả mơ hồ thường dẫn đến nhiều cuộc tranh luận không cùng trọng tâm; ngược lại, khi có thông tin và tiêu chí so sánh, nhóm có cơ sở để chọn phương án phù hợp hơn.',
      'Kết hợp các vai trò, nguyên tắc và kỹ năng trên sẽ tạo nên một nhóm có khả năng phối hợp. Tuy nhiên, kỹ năng không hình thành chỉ bằng cách đọc danh sách. Mỗi thành viên cần tự hoàn thiện trong quá trình làm việc, nhận phản hồi và điều chỉnh cách tương tác. Nhóm cũng cần tạo môi trường để mọi người có cơ hội tham gia thực chất, thay vì chỉ chờ một vài cá nhân giỏi đưa ra quyết định.',
    ],
  },
  {
    id: 'ch5-communication-conflict',
    category: 'Chương 5',
    detailCategory: 'Chương 5: Kỹ năng làm việc nhóm',
    title: 'Khi bất đồng trở thành rào cản: Nghệ thuật giao tiếp và giải quyết xung đột',
    sapo: 'Một nhóm không thể tránh mọi bất đồng. Điều quyết định hiệu quả là cách các thành viên nêu vấn đề, ra quyết định và tìm giải pháp mà mọi người có thể chấp nhận.',
    imageLabel: 'Ma trận năm chiến lược giải quyết xung đột',
    imageSrc: '/assets/aistudio/image_6978874c.png',
    imageAlt:
      'Ma trận năm chiến lược giải quyết xung đột gồm Cạnh tranh, Hợp tác, Thỏa hiệp, Tránh và Điều chỉnh theo trục Quyết đoán và Hợp tác',
    imageFit: 'contain',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một cuộc họp nhóm có thể bắt đầu bằng mục tiêu rất rõ: chọn phương án thiết kế, thống nhất tiến độ hoặc phân bổ ngân sách. Nhưng chỉ sau vài phút, cuộc trao đổi có thể chuyển thành tranh luận cá nhân. Người này cho rằng ý tưởng của mình không được lắng nghe; người khác nghĩ rằng thành viên còn lại thiếu trách nhiệm. Một số người im lặng để tránh va chạm, trong khi vài người nói nhiều hơn và dần chi phối quyết định. Khi đó, vấn đề không còn nằm ở phương án kỹ thuật mà ở chất lượng giao tiếp và cách nhóm xử lý bất đồng.',
      'Bài giảng nhấn mạnh bốn nền tảng để nhóm hoạt động: cam kết, giao tiếp chân thành và cởi mở, phương pháp ra quyết định hiệu quả, cùng quá trình quản lý và giải quyết xung đột. Cam kết không chỉ hướng đến các thành viên với nhau, mà còn với người quản lý và tổ chức. Mỗi người cần hiểu rằng mình đang tham gia vào một tập thể có mục tiêu, trách nhiệm và kỳ vọng nhất định.',
      '---',
      '### Thống nhất cách làm trước khi bất đồng xuất hiện',
      'Một công cụ quan trọng là hợp đồng nhóm và quy tắc ứng xử. Theo nội dung slide, hợp đồng nhóm cần làm rõ mục đích hoặc sứ mệnh, tầm nhìn, nhiệm vụ và vai trò của từng thành viên, những gì nhóm mong đợi ở mỗi người, cũng như cách nhóm tổ chức lãnh đạo, hỗ trợ và quản lý hoạt động. Bản hợp đồng nên ngắn gọn, không dài hơn một trang. Đi kèm với đó là kế hoạch hoạt động nêu rõ thời gian, nội dung và trách nhiệm của thành viên. Quy tắc ứng xử giúp xác định cách trao đổi, tôn trọng và phối hợp trong quá trình thực hiện.',
      'Khi nhóm đã thống nhất cách ra quyết định, các cuộc họp sẽ ít phụ thuộc vào cảm tính hơn. Slide nêu năm phương pháp: người có quyền quyết định, nhóm thiểu số quyết định, đa số quyết định, bỏ phiếu và đồng thuận. Mỗi cách có bối cảnh sử dụng riêng. Quyết định bởi người có quyền có thể cần thiết khi trách nhiệm đã được giao rõ hoặc cần phản ứng nhanh. Thiểu số có thể được sử dụng khi một nhóm nhỏ có chuyên môn trực tiếp xử lý vấn đề. Đa số hoặc bỏ phiếu phù hợp khi cần chọn giữa những phương án đã được thảo luận. Đồng thuận đòi hỏi các thành viên cùng hiểu và có thể chấp nhận quyết định, dù không nhất thiết ai cũng xem đó là lựa chọn hoàn hảo nhất.',
      'Dù dùng phương pháp nào, nhóm cần làm rõ quyết định cuối cùng là gì, quyết định được đưa ra theo cách nào và ai chịu trách nhiệm thực hiện. Nếu không xác định người phụ trách, một quyết định được thông qua vẫn có thể không biến thành hành động. Nếu thành viên không hiểu phương pháp được sử dụng, họ có thể cảm thấy ý kiến của mình bị bỏ qua hoặc kết quả thiếu công bằng.',
      '---',
      '### Năm cách ứng xử trước xung đột',
      'Xung đột có thể bắt nguồn từ khác biệt về tính cách, giá trị, nhận thức, mục tiêu, bổn phận hoặc sự mơ hồ về trách nhiệm. Không phải mọi bất đồng đều tiêu cực. Tranh luận về dữ liệu, tiêu chuẩn kỹ thuật hay phương án thiết kế có thể giúp nhóm nhận ra rủi ro. Vấn đề xuất hiện khi các thành viên không phân biệt được phản biện ý tưởng với công kích con người, hoặc khi bất đồng không được giải quyết mà âm ỉ làm suy yếu sự tin tưởng.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_6978874c.png',
        alt: 'Ma trận năm chiến lược giải quyết xung đột theo trục Sự quyết đoán và Tính hợp tác',
        caption:
          'Ma trận năm chiến lược giải quyết xung đột theo mức độ quyết đoán và tính hợp tác.',
        fit: 'contain',
      },
      'Ma trận trong hình đặt tính quyết đoán trên trục dọc và tính hợp tác trên trục ngang. Từ hai chiều này, bài giảng mô tả năm chiến lược. Cạnh tranh có mức quyết đoán cao nhưng hợp tác thấp; cách này có thể phù hợp khi cần quyết định ngay hoặc khi một yêu cầu bắt buộc không thể thương lượng. Cộng tác vừa quyết đoán vừa hợp tác; các bên cùng tìm giải pháp tích hợp kiến thức và quan điểm khác nhau. Tránh có mức quyết đoán và hợp tác thấp; phù hợp khi vấn đề chưa nghiêm trọng hoặc mọi người cần thời gian bình tĩnh. Điều chỉnh cho phù hợp đặt lợi ích của người khác lên trước khi vấn đề quan trọng hơn với họ hoặc khi cần duy trì hỗ trợ xã hội. Thỏa hiệp nằm ở khoảng giữa, khi các bên chấp nhận nhượng bộ một phần để tìm phương án thực tế dưới áp lực thời gian.',
      'Không có chiến lược nào luôn đúng trong mọi tình huống. Cạnh tranh có thể giúp nhóm hành động nhanh nhưng dễ làm giảm sự tham gia nếu bị sử dụng thường xuyên. Cộng tác thường tạo ra giải pháp có chất lượng nhưng cần thời gian và thiện chí. Tránh có thể hạ nhiệt cảm xúc trong ngắn hạn, song né tránh liên tục khiến vấn đề tồn đọng. Điều chỉnh giúp giữ quan hệ nhưng có thể khiến một bên phải hy sinh quá nhiều. Thỏa hiệp tạo ra kết quả có thể chấp nhận, nhưng đôi khi không giải quyết tận gốc nguyên nhân. Người điều phối cần xem xét mức độ quan trọng của vấn đề, thời gian, quan hệ giữa các bên và trách nhiệm của nhóm trước khi chọn cách ứng xử.',
      '---',
      '### Từ tranh cãi đến giải pháp có thể thực hiện',
      'Quy trình sáu bước trong slide giúp nhóm xử lý xung đột có hệ thống: làm rõ nguyên nhân; xác định mục tiêu chung; tìm các lựa chọn; nhận diện và loại bỏ rào cản; chọn giải pháp các bên có thể chấp nhận; cuối cùng là thừa nhận giải pháp và chuyển nó thành cam kết hành động theo tinh thần win-win. Trình tự này nhắc nhóm không nên vội tìm người có lỗi hoặc chọn giải pháp trước khi hiểu đúng vấn đề.',
      {
        type: 'processDiagram',
        title: 'Quy trình 6 bước giải quyết xung đột',
        theme: 'light',
        steps: [
          { label: 'Làm rõ nguyên nhân', detail: 'Tách sự kiện khỏi suy đoán cá nhân.' },
          { label: 'Xác định mục tiêu chung', detail: 'Đưa cả nhóm về cùng hướng đích.' },
          { label: 'Tìm các lựa chọn', detail: 'Mở rộng phương án thay vì đối đầu.' },
          { label: 'Loại bỏ rào cản', detail: 'Tháo gỡ vướng mắc về quy trình hoặc vai trò.' },
          { label: 'Chọn giải pháp khả thi', detail: 'Phương án các bên đều chấp nhận được.' },
          { label: 'Cam kết Win–Win', detail: 'Chuyển thành hành động có người phụ trách.' },
        ],
      },
      'Nhóm cũng cần tránh những biểu hiện làm suy yếu hoạt động như mục tiêu mâu thuẫn, vai trò chưa rõ, thiếu tin tưởng, thiếu hỗ trợ, giao tiếp kém và thái độ tiêu cực. Những vấn đề này thường liên kết với nhau: trách nhiệm mơ hồ dẫn đến đùn đẩy, thiếu giao tiếp tạo ra suy đoán, còn thiếu tin tưởng khiến thành viên ngại chia sẻ.',
      '> Giải quyết xung đột không phải buộc mọi người đồng ý, mà là đưa bất đồng ra đúng cách, xem xét bằng thông tin và chuyển thành quyết định có người chịu trách nhiệm.',
    ],
  },
  {
    id: 'ch5-team-evaluation',
    category: 'Chương 5',
    detailCategory: 'Chương 5: Kỹ năng làm việc nhóm',
    title: 'Nhóm làm việc tốt đến đâu? Đừng chỉ nhìn vào sản phẩm cuối cùng',
    sapo: 'Đánh giá nhóm cần xem xét cả kết quả, quá trình phối hợp, vai trò lãnh đạo và đóng góp của từng thành viên; nếu chỉ nhìn vào điểm số cuối cùng, nhiều vấn đề quan trọng sẽ bị bỏ qua.',
    imageLabel: 'Phối hợp và đóng góp từng thành viên trong tập thể',
    imageSrc: '/assets/aistudio/image_7161404f.png',
    imageAlt:
      'Đàn kiến phối hợp chặt chẽ cùng vượt qua chướng ngại vật thể hiện tinh thần hợp tác và trách nhiệm tập thể',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một nhóm sinh viên có thể hoàn thành đồ án đúng hạn và nộp được sản phẩm theo yêu cầu. Nhưng phía sau kết quả đó, có thể chỉ một vài thành viên thực hiện phần lớn công việc, các cuộc họp thiếu hiệu quả và những người còn lại không nắm rõ quá trình phát triển sản phẩm. Ở một nhóm khác, kết quả chưa hoàn hảo nhưng mọi thành viên đều tham gia, biết chia sẻ thông tin và rút kinh nghiệm từ sai sót. Nếu chỉ dùng một tiêu chí là sản phẩm cuối cùng, sự khác biệt giữa hai nhóm khó được nhận diện đầy đủ.',
      'Đánh giá hoạt động nhóm vì vậy cần xem xét cả “đạt được điều gì” và “đã làm việc với nhau như thế nào”. Bài giảng Chương 5 đề xuất chọn các tiêu chuẩn đánh giá có phạm vi đủ rộng, đồng thời ưu tiên những yếu tố mà việc cải thiện có thể mang lại lợi ích thiết thực. Mục tiêu không phải tạo thêm thủ tục, mà là cung cấp căn cứ để nhóm biết điều gì đang làm tốt và điều gì cần điều chỉnh.',
      '---',
      '### Một hệ tiêu chí rộng hơn điểm số',
      'Các tiêu chuẩn đánh giá nhóm trong slide bao gồm khả năng kỹ thuật, thuộc tính cá nhân, ứng xử giữa các cá nhân, kỹ năng giao tiếp và kỹ năng hành chính. Khả năng kỹ thuật thể hiện qua đào tạo, kỹ năng và kinh nghiệm. Thuộc tính cá nhân liên quan đến tiêu chuẩn, giá trị, sáng kiến và mức độ nhận diện với tổ chức. Ứng xử giữa các cá nhân bao gồm khả năng tạo ảnh hưởng phù hợp, sự nhạy cảm, hỗ trợ người khác và độ tin cậy. Kỹ năng giao tiếp thể hiện ở trình bày, đối thoại, viết và đọc. Kỹ năng hành chính liên quan đến lập kế hoạch, tổ chức, thực hiện, ủy thác và đánh giá.',
      'Những tiêu chuẩn này cho thấy hiệu quả nhóm không chỉ phụ thuộc vào chuyên môn. Một thành viên có thể rất giỏi kỹ thuật nhưng gặp khó khăn khi trao đổi hoặc phối hợp. Người có năng lực tổ chức tốt có thể giúp nhóm duy trì tiến độ, trong khi người có kinh nghiệm chuyên môn sâu hỗ trợ phát hiện rủi ro. Khi các tiêu chuẩn được xác định rõ, nhóm có thể nhìn nhận đóng góp đa chiều hơn, tránh đồng nhất “làm nhiều” với “đóng góp hiệu quả” hoặc đánh giá một người chỉ qua mức độ xuất hiện trong các cuộc họp.',
      '---',
      '### Đánh giá kết quả và đo lường quá trình',
      'Trước hết, nhóm cần xem mục tiêu đề ra có đạt được hay không và chất lượng kết quả ở mức nào. Khi cần thiết, có thể mời người bên ngoài hoặc chuyên gia tham gia đánh giá để tăng tính khách quan. Một góc nhìn độc lập đặc biệt hữu ích với những sản phẩm có yêu cầu kỹ thuật, an toàn hoặc chất lượng mà nhóm tự thực hiện khó tự kiểm chứng đầy đủ.',
      'Bên cạnh kết quả, quá trình thực hiện cần được đo lường theo kế hoạch dự án. Về tài chính, có thể so sánh chi phí và thu nhập thực tế với dự kiến. Về thời gian, cần đối chiếu tiến độ thực tế với kế hoạch. Về chất lượng, có thể xem xét mức độ hài lòng của khách hàng hoặc người tiếp nhận sản phẩm. Về năng lực cá nhân, cần xem xét kết quả thực hiện của từng người trên cơ sở nhiệm vụ đã giao. Các chỉ số này giúp nhóm phát hiện sai lệch sớm thay vì đợi đến khi kết thúc mới biết dự án vượt ngân sách hoặc chậm tiến độ.',
      {
        type: 'evaluation',
        formLabel: 'BẢNG THEO DÕI VÀ ĐÁNH GIÁ DỰ ÁN NHÓM',
        period: 'Mẫu đối chiếu theo tuần',
        projectTitle:
          'Khung đo lường tiến độ, chi phí, chất lượng và đóng góp thành viên',
        rows: [
          {
            criterion: 'Thời gian & tiến độ',
            planned: 'Hoàn thành từng mốc công việc theo lịch tuần đã thống nhất',
            actual: 'Đối chiếu ngày bàn giao thực tế với biểu đồ Gantt',
            note: 'Cảnh báo sớm khi một công đoạn đầu vào chậm hơn dự kiến',
          },
          {
            criterion: 'Tài chính & vật tư',
            planned: 'Chi phí mua sắm nằm trong ngân sách dự trù của nhóm',
            actual: 'Tổng hợp hóa đơn vật liệu phát sinh so với dự toán',
            note: 'Xem xét phương án thay thế trước khi vượt hạn mức chi phí',
          },
          {
            criterion: 'Chất lượng đầu ra',
            planned: 'Sản phẩm đáp ứng bộ tiêu chí kỹ thuật và kiểm thử',
            actual: 'Kiểm tra chéo trong nhóm và tiếp nhận góp ý giảng viên',
            note: 'Ghi nhận sai số cần hiệu chỉnh ngay sau mỗi vòng chạy thử',
          },
          {
            criterion: 'Phối hợp & cá nhân',
            planned: 'Mỗi thành viên hoàn thành phần việc theo sở trường và giao tiếp rõ',
            actual: 'Theo dõi mức độ tham gia họp, cập nhật trạng thái và hỗ trợ nhau',
            note: 'Phân biệt giữa trở ngại hệ thống và trách nhiệm cá nhân',
          },
        ],
        caption:
          'Bảng theo dõi tiến độ, chi phí, chất lượng và phối hợp giúp nhóm nhận diện sai lệch sớm trong suốt quá trình thực hiện dự án.',
      },
      'Đánh giá vai trò người lãnh đạo cũng là một phần riêng. Cần xem người điều phối có hỗ trợ và hướng dẫn nhóm hay không, hoạt động điều hành có đạt kết quả theo kế hoạch không và ý kiến từ nhiều phía nói gì về hiệu quả lãnh đạo. Slide đề cập đến ý kiến đánh giá từ cấp trên, từ các thành viên bên dưới, từ chính nhóm, khách hàng và những người liên quan. Việc thu thập nhiều góc nhìn giúp tránh đánh giá người lãnh đạo chỉ dựa vào cảm nhận của một cá nhân.',
      'Với từng thành viên, đánh giá cần xem xét đóng góp vào kế hoạch chung, hiệu suất so với chỉ tiêu, ý kiến từ cấp trên, đồng nghiệp và khách hàng, khả năng tự đánh giá so với đồng nghiệp, cũng như những đóng góp bổ sung và ý thức trách nhiệm. Cách đánh giá này giúp nhận diện cả kết quả lẫn thái độ làm việc. Một người có thể hoàn thành nhiệm vụ được giao nhưng ít chia sẻ thông tin; người khác có thể hỗ trợ đồng đội, phát hiện vấn đề hoặc đề xuất cải tiến vượt ngoài phần việc ban đầu. Những đóng góp như vậy cần được ghi nhận phù hợp.',
      '---',
      '### Đánh giá để cải thiện, không phải để quy lỗi',
      'Để đánh giá có tác dụng, tiêu chí cần được thông báo từ đầu, gắn với mục tiêu và vai trò đã thống nhất, đồng thời có minh chứng cụ thể. Nếu nhóm chỉ đưa ra nhận xét chung như “tích cực”, “thiếu trách nhiệm” hoặc “làm việc chưa tốt”, thành viên sẽ khó biết cần thay đổi điều gì. Ngược lại, phản hồi dựa trên tiến độ, chất lượng đầu ra, mức độ hoàn thành nhiệm vụ, khả năng phối hợp và thông tin cập nhật sẽ giúp việc cải thiện rõ ràng hơn.',
      'Đánh giá cũng cần phân biệt giữa năng lực cá nhân và điều kiện làm việc. Một nhiệm vụ bị chậm có thể do thành viên chưa hoàn thành, nhưng cũng có thể do đầu vào từ công đoạn trước không được cung cấp đúng thời điểm, yêu cầu thay đổi hoặc nguồn lực không đủ. Quy trách nhiệm khi chưa xem xét bối cảnh sẽ khiến thành viên phòng thủ và làm suy giảm sự tin tưởng. Ngược lại, xem xét cả cá nhân lẫn hệ thống giúp nhóm xác định đúng nguyên nhân và lựa chọn biện pháp phù hợp.',
      '> Kết quả cho biết nhóm đã đi đến đâu; quá trình cho biết nhóm có thể tiếp tục làm tốt hơn như thế nào.',
      'Trong môi trường học tập, việc đánh giá không nhất thiết phải phức tạp. Nhóm có thể bắt đầu từ mục tiêu, chất lượng sản phẩm, tiến độ, mức độ hoàn thành phần việc, sự tham gia và khả năng hỗ trợ lẫn nhau. Hợp đồng nhóm và điều lệ nhóm được đề cập trong bài giảng là cơ sở để xác định kỳ vọng, nhiệm vụ, vai trò, quy tắc ứng xử và cách quản lý hoạt động. Khi các nội dung này được thống nhất trước, việc đánh giá cuối kỳ sẽ công bằng và có căn cứ hơn.',
      'Một nhóm làm việc tốt không chỉ tạo ra sản phẩm đạt yêu cầu. Nhóm còn cần có khả năng giải thích cách mình đi đến kết quả, nhận ra những điểm cần cải thiện và duy trì sự phối hợp trong nhiệm vụ tiếp theo. Đánh giá vì thế không phải bước cuối cùng để xếp loại thành viên, mà là một phần của quá trình học hỏi và phát triển tập thể.',
    ],
  },
  {
    id: 'ch6-problem-identification',
    category: 'Chương 6',
    detailCategory: 'Chương 6: Kỹ năng giải quyết vấn đề',
    title: 'Không phải vấn đề nào cũng có một đáp án',
    sapo: 'Nhận diện đúng tình huống là bước đầu tiên để không lãng phí công sức vào một lời giải sai.',
    imageLabel: 'Kỹ sư kiểm tra cụm ổ bi và trục máy có dấu hiệu rung bất thường',
    imageSrc: '/assets/aistudio/image_dde134ae.png',
    imageAlt:
      'Kỹ sư đội mũ bảo hộ và chụp tai bảo vệ dùng đèn pin kiểm tra cận cảnh cụm ổ bi, trục máy trong xưởng sản xuất',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một chiếc quạt công nghiệp bỗng rung mạnh sau vài tháng vận hành. Người sử dụng có thể nghĩ ngay rằng động cơ đã hỏng. Nhưng rung động cũng có thể đến từ cánh quạt mất cân bằng, chân đế lỏng, ổ bi mòn, trục lệch hoặc cách lắp đặt không phù hợp. Nếu vội thay động cơ mà chưa kiểm tra, chi phí có thể tăng lên trong khi nguyên nhân thật vẫn còn.',
      'Tình huống ấy cho thấy giải quyết vấn đề không bắt đầu bằng việc chọn một giải pháp. Nó bắt đầu bằng việc xác định điều gì đang xảy ra, khoảng cách giữa tình trạng hiện tại và trạng thái mong muốn nằm ở đâu, và ai là người chịu ảnh hưởng. Trong slide Chương 6, vấn đề được nhìn nhận như một tình huống mà cá nhân hoặc nhóm cần xử lý; đồng thời, đó cũng là cơ hội để cải thiện.',
      '---',
      '### Vấn đề nằm giữa hiện trạng và điều ta mong muốn',
      'Có thể hiểu vấn đề là sự khác biệt giữa tình trạng hiện tại và tình trạng mong muốn. Một sản phẩm có kích thước sai lệch so với bản vẽ, một nhóm không hoàn thành công việc đúng hạn hay một quy trình tạo ra quá nhiều phế phẩm đều có chung cấu trúc: thực tế chưa đáp ứng một yêu cầu hoặc mục tiêu đã đặt ra.',
      'Tuy nhiên, vấn đề không chỉ có phần khách quan. Slide phân biệt hai thành phần: một thực thể hay sự việc – liên quan đến cái gì, khi nào, ở đâu, ai; và một giá trị gắn với người cảm nhận – chẳng hạn khó khăn, mong muốn hoặc trở ngại. Cùng một tình huống có thể được những người khác nhau đánh giá khác nhau vì mục tiêu, kinh nghiệm và mức độ ảnh hưởng của họ không giống nhau. Vì vậy, khi làm rõ vấn đề, cần tách điều đã quan sát được khỏi cảm nhận hoặc nhận định cá nhân.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_dde134ae.png',
        alt: 'Kỹ sư kiểm tra cận cảnh cụm ổ bi và trục máy có dấu hiệu rung bất thường trong xưởng',
        caption:
          'Kiểm tra thực tế cụm ổ bi, trục máy và chân đế giúp tách dữ kiện quan sát được khỏi phỏng đoán ban đầu.',
      },
      '---',
      '### Vấn đề đơn giản và vấn đề phức tạp không thể xử lý giống nhau',
      'Một vấn đề đơn giản thường được xác định rõ, lặp đi lặp lại và có một nguyên nhân tương đối cụ thể. Giải pháp thường đã được quy định hoặc có thể đánh giá khá trực tiếp. Chẳng hạn, một chi tiết lắp sai chiều theo hướng dẫn có thể được khắc phục bằng cách lắp lại đúng quy cách.',
      'Ngược lại, vấn đề phức tạp thường chưa được mô tả đầy đủ, có tính mới hoặc không bình thường, xuất phát từ nhiều nguyên nhân và có nhiều phương án giải quyết. Một thay đổi ở một bộ phận còn có thể tạo ảnh hưởng ngoài phạm vi ban đầu. Ví dụ, giảm khối lượng của một chi tiết có thể giúp tiết kiệm vật liệu nhưng đồng thời ảnh hưởng đến độ cứng, độ bền và khả năng chế tạo. Khi ấy, không thể chỉ nhìn vào một tiêu chí.',
      {
        type: 'table',
        headers: ['Dấu hiệu', 'Vấn đề đơn giản', 'Vấn đề phức tạp'],
        rows: [
          [
            'Mức độ rõ ràng',
            'Được xác định tương đối rõ',
            'Có thể chưa được xác định đầy đủ',
          ],
          [
            'Nguyên nhân',
            'Thường ít và dễ truy tìm',
            'Có nhiều nguyên nhân liên quan',
          ],
          [
            'Giải pháp',
            'Có thể đã được quy định',
            'Có nhiều phương án để cân nhắc',
          ],
          [
            'Ảnh hưởng',
            'Thường nằm trong phạm vi hẹp',
            'Có thể lan sang các yếu tố khác',
          ],
        ],
      },
      'Slide cũng nêu nhiều dạng vấn đề thường gặp: vấn đề nghiên cứu, kiến thức, sai sót hoặc lỗi, toán học, nguồn lực, xã hội và thiết kế. Trong thực tế, các dạng này có thể đan xen. Một đồ án thiết kế sản phẩm vừa là vấn đề thiết kế, vừa có thể chứa vấn đề kiến thức, tài chính, thời gian và nguồn lực con người.',
      '---',
      '### Giải quyết vấn đề cần nhiều hơn một kỹ năng',
      'Phân tích giúp chia vấn đề thành những phần nhỏ và nhận ra mối quan hệ giữa chúng. Tổng hợp và sáng tạo giúp hình thành các ý tưởng mới, sau đó dùng phân tích để đánh giá. Ra quyết định là bước so sánh các ý tưởng và chọn phương án phù hợp nhất. Bên cạnh đó, kiến thức, kinh nghiệm, động lực, kỹ năng giao tiếp, khả năng học hỏi và làm việc nhóm đều góp phần quyết định chất lượng lời giải.',
      'Những trở ngại cũng không chỉ đến từ việc thiếu kiến thức. Áp lực thời gian, thói quen suy nghĩ theo lối cũ, công việc thường nhật và môi trường không khuyến khích sáng tạo có thể khiến người giải quyết vấn đề chỉ lặp lại cách làm quen thuộc. Khi nhận ra những rào cản này, cá nhân hoặc nhóm có thể chủ động dành thời gian xem xét dữ liệu, mời thêm góc nhìn và thử những phương án khác.',
      '> “Một vấn đề được mô tả mơ hồ thường dẫn đến một giải pháp mơ hồ.”',
      'Vì vậy, trước khi hỏi “làm thế nào để sửa?”, hãy hỏi “điều gì đang không đạt yêu cầu?”. Sự kiên nhẫn trong bước nhận diện không làm chậm tiến độ; trái lại, nó giúp tránh việc xử lý triệu chứng trong khi nguyên nhân vẫn tồn tại.',
    ],
  },
  {
    id: 'ch6-systematic-thinking',
    category: 'Chương 6',
    detailCategory: 'Chương 6: Kỹ năng giải quyết vấn đề',
    title: 'Từ hiện tượng đến giải pháp: Tư duy có hệ thống trong kỹ thuật',
    sapo: 'Quy trình không thay thế tư duy, nhưng giúp tư duy không bỏ sót những bước quan trọng.',
    imageLabel: 'Hai kỹ sư phân tích bản vẽ và dữ liệu vận hành trên máy tính',
    imageSrc: '/assets/aistudio/image_9199e923.png',
    imageAlt:
      'Hai kỹ sư mang máy tính xách tay đối chiếu thông số và bản vẽ ngay cạnh dây chuyền máy móc công nghiệp',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Khi một sản phẩm không đạt yêu cầu, nhóm thiết kế thường chịu áp lực phải nhanh chóng đưa ra phương án sửa chữa. Nhưng nếu chưa thống nhất mục tiêu, chưa kiểm tra dữ liệu và chưa hiểu giới hạn của hệ thống, quyết định ban đầu rất dễ dựa trên phỏng đoán. Một quy trình giải quyết vấn đề có hệ thống giúp chuyển sự chú ý từ phản ứng tức thời sang cách làm có căn cứ.',
      '---',
      '### Hai kiểu bài toán, hai cách tiếp cận',
      'Slide phân biệt giải quyết vấn đề dạng phân tích và dạng sáng tạo. Với dạng phân tích, thường có một câu trả lời đúng trong khuôn khổ dữ kiện và điều kiện đã cho, như khi giải một bài toán. Với dạng sáng tạo, không có một đáp án duy nhất; thiết kế là ví dụ điển hình vì cùng một yêu cầu có thể được đáp ứng bằng nhiều phương án khác nhau.',
      'Hai cách tiếp cận không loại trừ nhau. Trong một dự án thiết kế, nhóm có thể cần phân tích tải trọng, kích thước hoặc chi phí bằng phương pháp định lượng, nhưng vẫn phải sáng tạo khi lựa chọn cấu trúc, vật liệu hay cách bố trí. Phân tích giúp kiểm tra tính đúng đắn; sáng tạo mở rộng không gian phương án.',
      '---',
      '### Từ phương pháp khoa học đến quy trình thiết kế',
      'Phương pháp khoa học trong slide gồm năm bước: xác định vấn đề; thu thập dữ liệu và sự kiện; xây dựng giả thuyết; thực hiện thử nghiệm; đánh giá kết quả. Nếu kết quả chưa đạt mức chấp nhận được, các bước có thể được lặp lại. Đây là một vòng kiểm chứng: giả thuyết không được xem là đúng chỉ vì nghe hợp lý, mà cần được đối chiếu với kết quả.',
      'Với bài toán phân tích trong kỹ thuật, slide trình bày sáu bước cụ thể hơn. Trước hết phải nêu và xác định vấn đề, sau đó mô tả hoặc vẽ hình để hiểu các đại lượng liên quan. Người giải cần lựa chọn lý thuyết và công thức phù hợp, đơn giản hóa các giả định, tiến hành tính toán bằng tay hoặc máy tính, rồi kiểm tra độ chính xác so với yêu cầu. Bước nhận dạng và hiểu bài toán được nhấn mạnh là phần khó nhất: nếu hiểu sai điều cần tìm, phép tính dù chính xác cũng không tạo ra lời giải hữu ích.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_9199e923.png',
        alt: 'Hai kỹ sư sử dụng máy tính xách tay kiểm tra bản vẽ và thông số thiết bị trong xưởng',
        caption:
          'Đối chiếu bản vẽ, dữ liệu đo và thiết bị thực tế giúp xác định đúng đại lượng và giả định trước khi tính toán.',
      },
      'Trong thiết kế, slide mở rộng thành quy trình sáng tạo 10 bước: nhận dạng vấn đề; xác định tiêu chuẩn và mục tiêu; nghiên cứu, thu thập dữ liệu; động não ý tưởng; phân tích ý tưởng; phát triển mô hình và thử nghiệm; ra quyết định; trao đổi để thống nhất tiêu chuẩn, đặc tính; triển khai và thương mại hóa; cuối cùng là rà soát, đánh giá sau triển khai. Điểm đáng chú ý là quy trình không kết thúc khi sản phẩm được đưa vào sử dụng. Việc xem xét sau triển khai giúp nhận ra những vấn đề chỉ xuất hiện trong điều kiện thực tế.',
      '---',
      '### Một quy trình linh hoạt thay vì một chiếc khuôn cứng',
      'Một sơ đồ khác trong slide mô tả chuỗi nhận dạng vấn đề, phân tích sự kiện, xác định vấn đề, hình thành ý tưởng, phát triển giải pháp, thực thi kế hoạch và quay lại khi cần. Sơ đồ cho thấy rõ tính lặp: sau khi thực thi, nếu kết quả chưa thỏa mãn, nhóm có thể quay lại nhận dạng hoặc phân tích để điều chỉnh cách hiểu ban đầu.',
      {
        type: 'processDiagram',
        title: 'Chu trình giải quyết vấn đề lặp lại',
        theme: 'dark',
        steps: [
          { label: 'Nhận dạng vấn đề', detail: 'Phát hiện chênh lệch thực tế – kỳ vọng.' },
          { label: 'Phân tích sự kiện', detail: 'Thu thập dữ liệu và kiểm tra giả định.' },
          { label: 'Xác định vấn đề', detail: 'Chốt đúng nguyên nhân gốc cần giải quyết.' },
          { label: 'Hình thành ý tưởng', detail: 'Mở rộng nhiều phương án thay thế.' },
          { label: 'Phát triển giải pháp', detail: 'Tính toán, mô hình hóa và kiểm chứng.' },
          { label: 'Thực thi kế hoạch', detail: 'Áp dụng và đối chiếu kết quả thực tế.' },
        ],
        loopNote:
          'Nếu kết quả chưa đạt chuẩn sau thực thi, nhóm quay lại bước nhận dạng hoặc phân tích (tương tự chu trình PDCA).',
      },
      {
        type: 'figure',
        src: '/assets/aistudio/image_9a12d2cf.png',
        alt: 'Sơ đồ vòng lặp gồm nhận dạng vấn đề, phân tích các sự kiện, xác định vấn đề, hình thành ý tưởng, phát triển giải pháp, thực thi kế hoạch và tiếp diễn trở lại',
        caption:
          'Sơ đồ quy trình giải quyết vấn đề dạng vòng lặp; quy trình có thể quay lại bước trước khi kết quả chưa đạt.',
        fit: 'contain',
      },
      'Slide còn nêu quy trình sáu bước gồm xác định vấn đề, phân tích nguyên nhân, đưa ra giải pháp, lựa chọn giải pháp tối ưu, thực thi kế hoạch hành động và đánh giá kết quả. Có thể xem đây là khung tổng quát dễ áp dụng cho một tình huống thực tế. Trong khi đó, vòng tròn Deming PDCA nhấn mạnh cải tiến liên tục: Plan – lập kế hoạch; Do – thực hiện; Check – kiểm tra; Act – điều chỉnh và hoàn thiện.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_cd17a66b.png',
        alt: 'Sơ đồ chu trình Deming PDCA gồm bốn giai đoạn Plan, Do, Check và Act kết nối thành vòng tròn cải tiến liên tục',
        caption:
          'Vòng tròn Deming PDCA giúp biến quá trình giải quyết vấn đề thành chu trình lập kế hoạch, thực thi thử nghiệm, kiểm tra và điều chỉnh liên tục.',
        fit: 'contain',
      },
      {
        type: 'table',
        headers: ['Khung phương pháp', 'Trọng tâm', 'Khi nào hữu ích'],
        rows: [
          [
            'Phương pháp khoa học',
            'Giả thuyết và thử nghiệm',
            'Khi cần kiểm chứng một nhận định',
          ],
          [
            'Phân tích 6 bước',
            'Mô tả, áp dụng lý thuyết, tính toán, kiểm tra',
            'Khi giải bài toán kỹ thuật có dữ kiện',
          ],
          [
            'Thiết kế 10 bước',
            'Từ yêu cầu đến triển khai và rà soát',
            'Khi phát triển sản phẩm hoặc hệ thống',
          ],
          [
            'PDCA',
            'Lập kế hoạch, thực hiện, kiểm tra, điều chỉnh',
            'Khi cần cải tiến lặp lại',
          ],
        ],
      },
      'Không có một quy trình duy nhất phù hợp với mọi vấn đề. Slide lưu ý rằng lời giải hoàn thiện tuyệt đối cho vấn đề thực tế không phải lúc nào cũng tồn tại; người giải có thể cần đơn giản hóa mô hình, dùng phương pháp trực tiếp, thử – sai, đồ thị hoặc mô hình toán học. Điều quan trọng là phải hiểu giả định đang sử dụng và biết giới hạn của kết quả.',
      '> “Quy trình tốt không đảm bảo mọi quyết định đều đúng; nó giúp ta phát hiện sớm hơn khi quyết định chưa đúng.”',
      'Một nhóm kỹ thuật làm việc có hệ thống không phải nhóm luôn đi thẳng từ bước đầu đến bước cuối. Đó là nhóm biết khi nào cần quay lại, bổ sung dữ liệu, thay đổi giả thuyết hoặc điều chỉnh kế hoạch.',
    ],
  },
  {
    id: 'ch6-six-thinking-hats',
    category: 'Chương 6',
    detailCategory: 'Chương 6: Kỹ năng giải quyết vấn đề',
    title: 'Sáu chiếc mũ tư duy: Khi một vấn đề cần nhiều góc nhìn',
    sapo: 'Tách các kiểu suy nghĩ theo từng thời điểm giúp cuộc thảo luận bớt rối và quyết định cân bằng hơn.',
    imageLabel: 'Nhóm trao đổi ý tưởng với giấy ghi chú nhiều màu trên bảng kính',
    imageSrc: '/assets/aistudio/image_c74fd53f.png',
    imageAlt:
      'Nhóm bốn thành viên cùng dán thẻ ghi chú nhiều màu lên bảng kính trong buổi não công tìm ý tưởng',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Trong một cuộc họp thiết kế, người đề xuất phương án thường nói về lợi ích; người phụ trách an toàn lập tức chỉ ra rủi ro; người khác lại muốn xem số liệu trước khi thảo luận. Mỗi người có thể đang nhìn đúng một phần của vấn đề, nhưng nếu tất cả cùng tranh luận từ những góc nhìn khác nhau, cuộc họp dễ biến thành cuộc đối đầu.',
      'Phương pháp Sáu mũ tư duy của Edward de Bono được giới thiệu trong slide như một công cụ giúp đánh giá sự việc từ nhiều góc nhìn. Ý tưởng cốt lõi là mỗi thời điểm tập trung vào một kiểu tư duy, thay vì để dữ kiện, cảm xúc, phê bình và sáng tạo chen lẫn trong cùng một lượt thảo luận.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_d01df6a6.png',
        alt: 'Infographic 6 Chiếc Mũ Tư Duy với sáu màu trắng, đỏ, đen, vàng, xanh lá và xanh dương cùng chức năng tương ứng',
        caption:
          'Sáu chiếc mũ tư duy tách riêng sáu kiểu suy nghĩ từ dữ kiện thực tế, cảm tính, phản biện rủi ro, lợi ích, sáng tạo đến điều phối quá trình.',
        fit: 'contain',
      },
      '---',
      '### Sáu màu mũ, sáu chức năng tư duy',
      'Mũ trắng hướng sự chú ý vào dữ kiện và thông tin: nhóm đã biết gì, còn thiếu gì và cần thu thập thêm bằng cách nào. Mũ đỏ dành chỗ cho cảm xúc, trực giác và phản ứng cá nhân mà không buộc người nói phải chứng minh bằng lập luận. Hai kiểu thông tin này khác nhau nhưng đều có giá trị; điều quan trọng là không nhầm cảm nhận với sự kiện.',
      'Mũ đen đại diện cho sự thận trọng. Khi sử dụng mũ này, nhóm tìm những hạn chế, rủi ro và điều có thể khiến phương án thất bại. Mũ vàng đi theo hướng ngược lại: tập trung vào lợi ích, cơ hội và lý do khiến ý tưởng đáng được xem xét. Nếu chỉ dùng mũ đen, nhóm dễ bỏ lỡ cơ hội; nếu chỉ dùng mũ vàng, nhóm có thể đánh giá thấp rủi ro.',
      'Mũ xanh lá cây khuyến khích sáng tạo, đề xuất cách làm khác và mở rộng số lượng phương án. Mũ xanh dương điều phối toàn bộ quá trình: xác định mục tiêu thảo luận, tổ chức trình tự, tóm tắt điều đã đạt được và quyết định bước tiếp theo. Mũ xanh dương vì thế không chỉ là một góc nhìn nội dung mà còn là cách quản lý quá trình tư duy.',
      {
        type: 'table',
        headers: ['Mũ', 'Câu hỏi gợi mở', 'Vai trò trong thảo luận'],
        rows: [
          ['Trắng', 'Ta có dữ liệu nào? Còn thiếu gì?', 'Làm rõ thông tin'],
          ['Đỏ', 'Ta cảm thấy thế nào?', 'Ghi nhận trực giác, cảm xúc'],
          ['Đen', 'Điều gì có thể sai? Rủi ro ở đâu?', 'Kiểm tra hạn chế'],
          ['Vàng', 'Lợi ích và cơ hội là gì?', 'Nhìn thấy giá trị'],
          ['Xanh lá', 'Có cách nào khác?', 'Tạo phương án mới'],
          ['Xanh dương', 'Ta đang ở bước nào? Tiếp theo làm gì?', 'Điều phối, tổng kết'],
        ],
      },
      'Một trình tự tìm ý tưởng trong slide bắt đầu bằng việc tập hợp thông tin với mũ trắng, chuyển sang mũ xanh lá để tạo phương án, dùng mũ vàng và mũ đen để xem xét lợi ích và điểm yếu, quay lại mũ xanh lá để phát triển phương án triển vọng, rồi dùng mũ xanh dương tổng kết. Mũ đen có thể được dùng lần cuối để rà soát phương án đã chọn; mũ đỏ giúp nhận diện cảm xúc đối với kết quả.',
      'Phương pháp này cũng có thể dùng khi phản ứng với một ý tưởng đã được đề xuất. Thay vì lập tức đồng ý hoặc bác bỏ, nhóm lần lượt nhận diện cảm xúc, xem xét lợi ích, phân tích rủi ro, điều chỉnh ý tưởng và kiểm tra lại bằng thông tin. Nhờ vậy, phản biện không bị hiểu thành công kích cá nhân.',
      '---',
      '### Não công: tạo nhiều ý tưởng trước khi phán xét',
      'Nếu Sáu mũ tư duy giúp tổ chức góc nhìn, não công (Brainstorming) tập trung vào việc tạo ra số lượng lớn ý tưởng trong thời gian ngắn. Slide nhấn mạnh rằng phương pháp này có thể được dùng trong cả giải quyết vấn đề phân tích lẫn sáng tạo. Ở giai đoạn hình thành ý tưởng, nhóm nên chấp nhận các đề xuất, tránh phê phán ngay, ưu tiên số lượng, ghi lại mọi ý tưởng và giới hạn thời gian.',
      'Việc tạm hoãn đánh giá không có nghĩa là mọi ý tưởng đều sẽ được chọn. Nó chỉ giúp bảo vệ giai đoạn phát sinh ý tưởng khỏi sự phán xét quá sớm. Một đề xuất ban đầu có vẻ chưa phù hợp đôi khi có thể được điều chỉnh, kết hợp với ý tưởng khác hoặc gợi ra một hướng tiếp cận mới. Sau khi đã có đủ phương án, nhóm mới chuyển sang phân tích tính khả thi, chi phí, rủi ro và mức độ đáp ứng mục tiêu.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_c74fd53f.png',
        alt: 'Nhóm trao đổi ý tưởng quanh bảng kính với các thẻ ghi chú nhiều màu sắc',
        caption:
          'Ghi nhận tất cả ý tưởng trên bảng trước khi đánh giá giúp nhóm tránh phán xét quá sớm và mở rộng không gian lựa chọn.',
      },
      'Slide cũng nêu bốn điều kiện khuyến khích sáng tạo: sẵn sàng tiếp thu ý kiến, chấp nhận rủi ro, kêu gọi người khác tham gia và chấp nhận phê bình. Những điều kiện này tạo ra môi trường để thành viên dám nêu ý tưởng, nhưng vẫn giữ chỗ cho việc đánh giá và cải thiện.',
      '> “Tạo ý tưởng và đánh giá ý tưởng là hai công việc khác nhau; làm chúng cùng lúc có thể khiến cả hai kém hiệu quả.”',
      'Trong một dự án kỹ thuật, nhóm có thể dùng não công để tạo phương án giảm rung cho thiết bị, sau đó dùng trình tự Sáu mũ để xem xét dữ kiện, cảm nhận người sử dụng, rủi ro, lợi ích và khả năng cải tiến. Công cụ không đưa ra quyết định thay con người; nó giúp cuộc trao đổi có cấu trúc và ít bỏ sót góc nhìn.',
    ],
  },
  {
    id: 'ch6-scamper-mindmap',
    category: 'Chương 6',
    detailCategory: 'Chương 6: Kỹ năng giải quyết vấn đề',
    title: 'Sáng tạo không nhất thiết bắt đầu từ con số không',
    sapo: 'SCAMPER và bản đồ tư duy giúp mở rộng cách nhìn, tái tổ chức những gì ta đã biết và phát triển phương án mới.',
    imageLabel: 'Mô hình SCAMPER bảy hướng đặt câu hỏi cải tiến',
    imageSrc: '/assets/aistudio/image_cd437b3d.png',
    imageAlt:
      'Bảng mô hình SCAMPER trình bày bảy từ khóa Substitute, Combine, Adapt, Modify, Put to other use, Eliminate và Rearrange',
    imageFit: 'contain',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Khi được yêu cầu cải tiến một sản phẩm, nhiều người thường nghĩ rằng phải phát minh ra một thứ hoàn toàn mới. Trên thực tế, đổi mới có thể bắt đầu từ những thay đổi nhỏ: thay một vật liệu, kết hợp hai chức năng, điều chỉnh hình dạng hoặc loại bỏ một bộ phận không còn cần thiết. SCAMPER là công cụ đặt câu hỏi có hệ thống để khơi gợi những khả năng như vậy.',
      '---',
      '### SCAMPER: bảy hướng đặt câu hỏi để cải tiến',
      'SCAMPER gồm bảy gợi ý: Substitute – thay thế; Combine – kết hợp; Adapt – thích ứng; Modify – chỉnh sửa; Put to another use – sử dụng vào mục đích khác; Eliminate – loại bỏ; Reverse hoặc Rearrange – đảo ngược hay sắp xếp lại. Mỗi từ khóa mở ra một hướng quan sát khác nhau, giúp người thiết kế không chỉ lặp lại cách sử dụng hiện tại của sản phẩm.',
      {
        type: 'table',
        headers: ['Gợi ý', 'Câu hỏi có thể đặt ra', 'Ví dụ minh họa'],
        rows: [
          [
            'Thay thế',
            'Có thể thay vật liệu, bộ phận hoặc quy trình nào?',
            'Thay vật liệu vỏ để giảm khối lượng',
          ],
          [
            'Kết hợp',
            'Có thể tích hợp chức năng hay chi tiết nào?',
            'Kết hợp hai bộ phận thành cụm lắp ráp',
          ],
          [
            'Thích ứng',
            'Có ý tưởng nào từ sản phẩm khác có thể áp dụng?',
            'Dùng cơ cấu khóa từ thiết bị tương tự',
          ],
          [
            'Chỉnh sửa',
            'Có thể thay đổi kích thước, hình dạng hay đặc tính?',
            'Điều chỉnh hình dạng để dễ thao tác',
          ],
          [
            'Dùng việc khác',
            'Bộ phận này còn có công dụng nào?',
            'Tận dụng chi tiết làm giá đỡ',
          ],
          [
            'Loại bỏ',
            'Có chi tiết hoặc công đoạn nào không cần thiết?',
            'Giảm số lượng chi tiết lắp ghép',
          ],
          [
            'Đảo ngược/sắp xếp lại',
            'Nếu đổi thứ tự hoặc đảo cấu trúc thì sao?',
            'Đổi vị trí các cụm để thuận tiện bảo trì',
          ],
        ],
      },
      'Ví dụ trong slide về nhà sản xuất bu-lông và đai ốc cho thấy SCAMPER có thể gợi ý thay vật liệu, tích hợp bu-lông với vòng đệm hoặc khóa tay, thay đổi kiểu đầu, điều chỉnh hình dạng, dùng bu-lông như bản lề hay trục, loại bỏ một số phần và đảo ngược cách tạo ren. Điểm quan trọng không nằm ở việc mọi gợi ý đều khả thi, mà ở chỗ mỗi gợi ý mở ra một hướng để nhóm khảo sát.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_cd437b3d.png',
        alt: 'Mô hình SCAMPER với bảy chữ cái S, C, A, M, P, E, R kèm diễn giải tiếng Anh và tiếng Việt',
        caption:
          'Bảy hướng câu hỏi trong mô hình SCAMPER giúp rà soát từng khía cạnh cải tiến sản phẩm một cách có hệ thống.',
        fit: 'contain',
      },
      '---',
      '### Bản đồ tư duy: nhìn toàn cảnh trước khi đi vào chi tiết',
      'Mind Mapping, hay bản đồ tư duy, được slide mô tả là hình ảnh thể hiện một nhóm ý tưởng, khái niệm hoặc vấn đề. Phương pháp này gắn với Tony Buzan và tổ chức suy nghĩ theo cách phi tuyến tính: từ một chủ đề trung tâm, các nhánh mở rộng thành những ý chính và chi tiết liên quan. Thay vì ghi chép thành một dòng dài, người dùng có thể nhìn thấy mối quan hệ giữa các phần trên cùng một trang.',
      'Bản đồ tư duy có thể hỗ trợ giải quyết vấn đề vì nó cho thấy các yếu tố đang liên kết với nhau như thế nào. Nó cũng hữu ích khi lập kế hoạch, ghi chú, gợi nhớ và trình bày một chủ đề. Trong một dự án thiết kế, chủ đề trung tâm có thể là “sản phẩm không đạt yêu cầu”; các nhánh tiếp theo là hiệu năng, vật liệu, quy trình chế tạo, chi phí, an toàn và trải nghiệm sử dụng. Từ mỗi nhánh, nhóm tiếp tục mở rộng thành câu hỏi hoặc dữ kiện cần kiểm tra.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_a701341d.png',
        alt: 'Sơ đồ bản đồ tư duy minh họa các nhánh tỏa ra từ chủ đề trung tâm với màu sắc và từ khóa phân tầng',
        caption:
          'Bản đồ tư duy tổ chức vấn đề theo các nhánh tỏa ra từ trung tâm để thấy rõ cấu trúc và mối liên kết giữa các yếu tố.',
        fit: 'contain',
      },
      'Slide đưa ra một số nguyên tắc thiết kế bản đồ tư duy: bắt đầu từ trung tâm; dùng từ khóa hoặc hình ảnh; tạo nhánh chính và nhánh phụ; làm nổi bật từ khóa; sử dụng màu sắc; dùng mũi tên hoặc biểu tượng để thể hiện liên kết. Nếu một nhánh không còn ý tưởng, người dùng có thể chuyển sang nhánh khác rồi quay lại sau. Cách trình bày không cần quá cầu kỳ; mục tiêu là làm cho cấu trúc suy nghĩ dễ nhìn và dễ phát triển.',
      '---',
      '### Kết hợp hai công cụ trong cùng một quá trình',
      'SCAMPER và Mind Mapping bổ trợ cho nhau. Bản đồ tư duy giúp tổ chức những gì nhóm đã biết và chỉ ra khu vực cần tìm hiểu thêm. SCAMPER tiếp tục tạo câu hỏi để phát triển ý tưởng ở từng khu vực. Chẳng hạn, khi xem xét nhánh “vật liệu”, nhóm có thể hỏi liệu có thể thay thế vật liệu hiện tại bằng vật liệu nhẹ hơn hay không; ở nhánh “cấu trúc”, nhóm có thể xem xét khả năng kết hợp hoặc loại bỏ chi tiết.',
      '> “Sáng tạo không chỉ là nghĩ ra điều chưa từng có; đó còn là kết nối lại những điều đã có theo một cách hữu ích hơn.”',
      'Dù vậy, ý tưởng mới vẫn cần được kiểm tra. Một thay đổi làm sản phẩm nhẹ hơn có thể khiến độ bền giảm; một cấu trúc ít chi tiết hơn có thể khó sửa chữa. Vì thế, các công cụ sáng tạo nên được đặt trong quy trình chung: tạo ý tưởng rộng trước, sau đó phân tích và thử nghiệm trước khi triển khai.',
    ],
  },
  {
    id: 'ch6-root-cause-selection',
    category: 'Chương 6',
    detailCategory: 'Chương 6: Kỹ năng giải quyết vấn đề',
    title: 'Tìm đúng nguyên nhân, chọn đúng phương án',
    sapo: 'Ishikawa, 5 Why, SWOT và ma trận lựa chọn giúp chuyển từ phỏng đoán sang đánh giá có căn cứ.',
    imageLabel: 'Biểu đồ xương cá (Ishikawa) phân tích nguyên nhân – hậu quả',
    imageSrc: '/assets/aistudio/image_303bed3e.png',
    imageAlt:
      'Biểu đồ xương cá minh họa các nhóm nguyên nhân Thiết bị, Con người, Quá trình, Quản lý và Chính sách dẫn tới ĐẶT VẤN ĐỀ',
    imageFit: 'contain',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một sản phẩm sau khi chế tạo không đạt yêu cầu về chất lượng. Nhóm có thể lập tức đề xuất thay vật liệu hoặc điều chỉnh máy. Nhưng nếu chưa biết nguyên nhân nằm ở thiết kế, thiết bị, con người, quy trình hay điều kiện môi trường, giải pháp đưa ra có thể chỉ xử lý một biểu hiện tạm thời. Phân tích nguyên nhân và lựa chọn phương án vì thế cần được xem là hai bước liên tiếp nhưng khác nhau.',
      '---',
      '### Biểu đồ xương cá: mở rộng bản đồ nguyên nhân',
      'Biểu đồ nguyên nhân – hậu quả, còn gọi là biểu đồ xương cá hoặc biểu đồ Ishikawa, được dùng để xác định những nguyên nhân có thể dẫn đến một vấn đề. Phần đầu cá thể hiện hậu quả hoặc vấn đề cần phân tích; xương sống nối đến các nhánh nguyên nhân chính; các nhánh nhỏ hơn thể hiện yếu tố cụ thể. Cách bố trí này giúp chia một vấn đề lớn thành những nhóm nguyên nhân dễ xem xét.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_303bed3e.png',
        alt: 'Biểu đồ xương cá gồm các nhánh Thiết bị, Con người, Quá trình, Quản lý và Chính sách dẫn đến ô Đặt vấn đề ở đầu cá',
        caption:
          'Biểu đồ xương cá trong slide: các nhóm nguyên nhân gồm thiết bị, con người, quá trình, quản lý và chính sách.',
        fit: 'contain',
      },
      'Sơ đồ minh họa các nhóm như thiết bị, con người, quá trình, quản lý và chính sách. Trong ví dụ chất lượng sản phẩm ở slide, các nhóm còn được mở rộng theo máy móc, con người, đo lường, vật liệu, môi trường và quy trình sản xuất. Các nhóm này không phải danh sách cố định cho mọi tình huống; cần chọn nhóm phù hợp với vấn đề đang xem xét.',
      'Để đi từ nhánh lớn đến nguyên nhân cụ thể, slide gợi ý đặt câu hỏi 5W và 2H: ai, điều gì, khi nào, ở đâu, tại sao, như thế nào và bao nhiêu. Kỹ thuật 5 Why tiếp tục đào sâu bằng cách hỏi “Tại sao?” nhiều lần, mỗi câu trả lời trở thành cơ sở cho câu hỏi tiếp theo. Mục tiêu là tìm được nguyên nhân sâu hơn thay vì dừng ở biểu hiện bên ngoài.',
      'Tuy nhiên, biểu đồ xương cá tập hợp các nguyên nhân tiềm năng chứ không tự chứng minh nguyên nhân nào là gốc rễ. Những nhánh được ghi trên sơ đồ cần được kiểm tra bằng dữ liệu, quan sát hoặc thử nghiệm. Đây là điểm quan trọng để tránh biến ý kiến của nhóm thành kết luận.',
      '---',
      '### SWOT: nhìn cả nội lực và bối cảnh',
      'SWOT là một công cụ được liệt kê trong phần 6.3 của slide. Công cụ này thường được dùng để xem xét điểm mạnh (Strengths), điểm yếu (Weaknesses), cơ hội (Opportunities) và thách thức (Threats) liên quan đến một phương án hoặc tình huống. Trong phạm vi giải quyết vấn đề, SWOT giúp nhóm không chỉ nhìn vào khả năng nội tại mà còn cân nhắc những yếu tố bên ngoài có thể hỗ trợ hoặc cản trở.',
      {
        type: 'table',
        headers: ['Góc nhìn', 'Câu hỏi định hướng'],
        rows: [
          ['Điểm mạnh', 'Phương án đang có lợi thế nội tại nào?'],
          ['Điểm yếu', 'Hạn chế nội tại nào cần khắc phục?'],
          ['Cơ hội', 'Điều kiện bên ngoài nào có thể hỗ trợ?'],
          ['Thách thức', 'Yếu tố bên ngoài nào có thể gây trở ngại?'],
        ],
      },
      'Ví dụ, một phương án cải tiến có thể tận dụng thiết bị sẵn có và năng lực của nhóm (điểm mạnh), nhưng cần thêm thời gian thử nghiệm (điểm yếu). Nhu cầu thị trường hoặc nguồn vật liệu mới có thể tạo cơ hội, trong khi biến động giá và yêu cầu an toàn có thể là thách thức. SWOT không thay thế phân tích kỹ thuật; nó bổ sung góc nhìn về bối cảnh khi cân nhắc phương án.',
      '---',
      '### Ma trận lựa chọn: biến tiêu chí thành cơ sở so sánh',
      'Sau khi có các phương án, nhóm cần một cách so sánh nhất quán. Ma trận lựa chọn ý tưởng trong slide đặt các phương án thành hàng và các tiêu chí thành cột. Mỗi phương án được đánh giá theo những đặc tính đã chọn, chẳng hạn tính khả thi, an toàn, kinh tế, tác động môi trường hoặc yếu tố văn hóa. Trọng số thể hiện mức độ quan trọng tương đối của từng tiêu chí.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_fb60378e.png',
        alt: 'Mẫu bảng ma trận lựa chọn ý tưởng với các hàng Ý tưởng A, Ý tưởng B, Ý tưởng C đối chiếu theo bốn đặc tính và cột Tổng cộng',
        caption:
          'Mẫu ma trận lựa chọn ý tưởng: các phương án được so sánh theo những đặc tính và tổng điểm.',
        fit: 'contain',
      },
      'Slide đề cập cách đánh giá bằng ký hiệu âm, dương và trung tính; thang điểm có thể quy ước -1, 0 và +1. Sau khi chấm các tiêu chí, nhóm tổng hợp điểm để xác định thứ tự ưu tiên. Phương án có tổng điểm cao nhất là phương án được ưu tiên theo hệ tiêu chí và cách chấm đã thống nhất.',
      'Điểm số không tự động tạo ra quyết định khách quan tuyệt đối. Kết quả phụ thuộc vào việc chọn tiêu chí, xác định trọng số và cách đánh giá. Nếu an toàn là yêu cầu bắt buộc, không nên để điểm kinh tế cao bù trừ cho một mức an toàn không chấp nhận được. Vì vậy, trước khi chấm điểm, nhóm cần phân biệt tiêu chí bắt buộc với tiêu chí có thể đánh đổi.',
      '---',
      '### Từ phân tích đến hành động',
      'Một trình tự hợp lý là xác định rõ vấn đề, dùng biểu đồ xương cá để lập bản đồ nguyên nhân, kiểm tra những nguyên nhân quan trọng bằng dữ liệu, rồi phát triển các phương án. SWOT có thể giúp xem xét bối cảnh của từng phương án; ma trận lựa chọn giúp so sánh chúng theo tiêu chí và trọng số. Sau khi chọn, nhóm cần lập kế hoạch thực thi, theo dõi kết quả và điều chỉnh nếu mục tiêu chưa đạt.',
      '> “Đừng chọn giải pháp chỉ vì nó quen thuộc hoặc dễ thực hiện; hãy chọn giải pháp xử lý đúng vấn đề trong những ràng buộc thực tế.”',
      'Giải quyết vấn đề là một quá trình có thể quay lại và cải tiến. Một phương án được chọn hôm nay vẫn cần được kiểm tra trong điều kiện vận hành thực tế. Khi kết quả khác với dự kiến, đó không nhất thiết là thất bại của toàn bộ quá trình; nó có thể là dữ liệu mới giúp nhóm hiểu vấn đề chính xác hơn.',
    ],
  },
  {
    id: 'ch7-si-measurement',
    category: 'Chương 7',
    detailCategory: 'Chương 7: Cơ sở kỹ thuật',
    title: 'Đo lường và hệ SI: Nền tảng của ngôn ngữ kỹ thuật',
    sapo: 'Mọi thông số kỹ thuật đều cần một đơn vị rõ ràng. Hệ SI tạo ra cách biểu diễn thống nhất để các kết quả đo có thể được đọc, so sánh và sử dụng.',
    imageLabel: 'Sơ đồ mối liên hệ giữa đơn vị cơ bản và đơn vị dẫn xuất SI',
    imageSrc: '/assets/aistudio/image_c2e92b3a.png',
    imageAlt:
      'Sơ đồ hệ đơn vị quốc tế SI nối 7 đơn vị cơ bản (kg, m, s, mol, A, K, cd) với các đơn vị dẫn xuất và ký hiệu đặc biệt',
    imageFit: 'contain',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Đo lường là cơ sở để mô tả thế giới vật chất bằng những đại lượng có thể kiểm tra. Trong chế tạo, một kích thước không rõ đơn vị có thể dẫn đến chi tiết không lắp ghép được; trong thí nghiệm, các kết quả chỉ có thể so sánh khi cùng được biểu diễn theo quy ước thống nhất. Vì vậy, hệ thống đơn vị không chỉ phục vụ tính toán mà còn hỗ trợ giao tiếp kỹ thuật, tiêu chuẩn hóa và trao đổi giữa các quốc gia.',
      'Slide giới thiệu Hệ đơn vị quốc tế SI, còn gọi là hệ mét, và hệ đơn vị của Mỹ (USCS). SI được xây dựng trên bảy đơn vị cơ bản: mét (m) cho chiều dài, kilôgam (kg) cho khối lượng, giây (s) cho thời gian, ampe (A) cho cường độ dòng điện, kelvin (K) cho nhiệt độ nhiệt động học, mol (mol) cho lượng chất và candela (cd) cho cường độ sáng.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_c2e92b3a.png',
        alt: 'Sơ đồ mối liên hệ giữa 7 đơn vị cơ bản SI và các đơn vị dẫn xuất có tên gọi và ký hiệu riêng',
        caption:
          'Hình 1. Sơ đồ mối liên hệ giữa các đơn vị cơ bản và đơn vị dẫn xuất SI.',
        fit: 'contain',
      },
      'Từ các đơn vị cơ bản, nhiều đơn vị dẫn xuất được hình thành bằng phép nhân hoặc chia. Diện tích có đơn vị mét vuông (m²), thể tích là mét khối (m³), vận tốc là mét trên giây (m/s), gia tốc là mét trên giây bình phương (m/s²). Lực được đo bằng newton (N), áp suất bằng pascal (Pa), năng lượng bằng joule (J), công suất bằng watt (W). Những tên gọi riêng này không tách rời hệ SI mà có thể biểu diễn thông qua các đơn vị cơ bản.',
      'Hệ SI sử dụng tiếp đầu ngữ để biểu diễn các bội số và ước số thập phân. Những tiếp đầu ngữ thường gặp gồm kilo (k), mega (M), giga (G), milli (m), micro (µ) và nano (n). Chúng giúp biểu diễn các đại lượng rất lớn hoặc rất nhỏ một cách gọn gàng, đồng thời giảm việc phải viết nhiều chữ số không cần thiết.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_d64f188e.png',
        alt: 'Bảng tiếp đầu ngữ hệ SI thể hiện hệ số nhân từ Exa (10^18) đến Atto (10^-18) kèm ký hiệu',
        caption:
          'Hình 2. Bảng tiếp đầu ngữ SI minh họa các bội số và ước số từ exa đến atto; slide gốc còn liệt kê các tiếp đầu ngữ khác.',
        fit: 'contain',
      },
      'Bên cạnh việc chọn đúng đơn vị, cách viết giá trị đại lượng cũng cần nhất quán. Ký hiệu đơn vị đặt sau trị số và cách trị số một khoảng trắng; ký hiệu đơn vị không tự thêm dấu chấm kết thúc. Với đơn vị ghép, cần thể hiện rõ quan hệ nhân hoặc chia để tránh nhầm lẫn. Slide cũng nhắc đến đơn vị đo lường hợp pháp của Việt Nam và sự thống nhất với hệ SI.',
      'Khi dữ liệu đến từ các hệ đo khác nhau, người kỹ sư phải thực hiện chuyển đổi đơn vị. Cách tiếp cận cơ bản là sử dụng hệ số chuyển đổi sao cho đơn vị cũ được triệt tiêu và chỉ còn đơn vị cần tìm. Việc theo dõi đơn vị qua từng bước là một cách kiểm tra tính hợp lý của phép tính, đặc biệt với các đại lượng dạng vận tốc, mật độ, áp suất hoặc nhiệt độ.',
      '> Ghi nhớ: Đơn vị là một phần của đại lượng đo. Một con số không có đơn vị hoặc dùng sai đơn vị có thể dẫn đến cách hiểu sai về thông số kỹ thuật.',
    ],
  },
  {
    id: 'ch7-basic-math',
    category: 'Chương 7',
    detailCategory: 'Chương 7: Cơ sở kỹ thuật',
    title: 'Toán học cơ bản: Công cụ mô tả và phân tích kỹ thuật',
    sapo: 'Đại số, lượng giác, hình học và các phương pháp toán học cung cấp ngôn ngữ để mô hình hóa quan hệ giữa các đại lượng.',
    imageLabel: 'Quan hệ cạnh, góc và các tỷ số lượng giác trong tam giác vuông',
    imageSrc: '/assets/aistudio/image_ae8f4ee7.png',
    imageAlt:
      'Sơ đồ tam giác vuông với các cạnh a, b, c và công thức định lý Pythagore cùng sin, cos, tan',
    imageFit: 'contain',
    readTime: '5 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Toán học trong kỹ thuật không chỉ là thao tác tính toán. Đó là công cụ giúp mô tả mối quan hệ giữa các biến, diễn đạt quy luật và chuyển một tình huống thực tế thành mô hình có thể phân tích. Chương 7 nhắc lại những nội dung nền tảng trong đại số, lượng giác, hình học, đại số tuyến tính và xác suất – thống kê.',
      '---',
      '### Đại số và các quan hệ giữa đại lượng',
      'Phần đại số nhắc lại ba tính chất cơ bản: giao hoán, phân phối và kết hợp. Đây là nền tảng để biến đổi biểu thức mà không làm thay đổi giá trị. Slide cũng trình bày hàm mũ và logarit, phương trình bậc hai, nhị thức Newton và phân thức đơn giản. Các nội dung này được sử dụng khi cần biểu diễn sự biến thiên, giải phương trình hoặc biến đổi biểu thức trong mô hình toán học.',
      'Hàm mũ mô tả những quan hệ trong đó biến số xuất hiện ở số mũ; logarit là phép toán ngược giúp tìm số mũ khi biết giá trị của hàm. Nhị thức Newton hỗ trợ khai triển biểu thức dạng lũy thừa của tổng, trong khi phân thức đơn giản hỗ trợ phân tích một phân thức hữu tỉ thành những thành phần dễ xử lý hơn.',
      {
        type: 'formula',
        expression: 'y = aˣ   ⇔   x = logₐ(y)',
      },
      '---',
      '### Lượng giác và hình học',
      'Lượng giác mô tả quan hệ giữa góc và cạnh trong tam giác. Với tam giác vuông, các tỷ số sin, cos và tan kết nối cạnh đối, cạnh kề và cạnh huyền. Với tam giác bất kỳ, định luật sin và định luật cosin cho phép xác định cạnh hoặc góc khi biết những dữ kiện phù hợp. Các quan hệ này có ý nghĩa trong đo đạc, xác định vị trí, phân tích hướng và mô tả hình học của cơ cấu.',
      'Hình học cung cấp các mô hình về hình phẳng và hình khối. Những công thức về diện tích, thể tích và kích thước hình học giúp người kỹ sư mô tả không gian, ước lượng vật liệu và xem xét hình dạng của chi tiết hoặc sản phẩm.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_ae8f4ee7.png',
        alt: 'Sơ đồ tam giác vuông ghi cạnh đối a, cạnh kề b, cạnh huyền c cùng công thức c² = a² + b² và các tỷ số sin, cos, tan',
        caption:
          'Quan hệ cạnh – góc trong tam giác vuông giúp phân tích hình học và chiếu các đại lượng vectơ theo phương.',
        fit: 'contain',
      },
      {
        type: 'figure',
        src: '/assets/aistudio/image_03a1df86.png',
        alt: 'Sơ đồ tam giác thường minh họa định luật sin và định luật cosin theo ba cạnh a, b, c và ba góc α, β, θ',
        caption:
          'Định luật sin và định luật cosin cho phép giải bài toán cạnh và góc trên tam giác bất kỳ.',
        fit: 'contain',
      },
      '---',
      '### Ma trận và thống kê',
      'Slide nêu đại số tuyến tính với nội dung ma trận và các phép tính ma trận; đồng thời đề cập xác suất – thống kê. Đây là những lĩnh vực toán học hỗ trợ tổ chức và xử lý nhiều đại lượng cùng lúc, cũng như mô tả dữ liệu và sự biến thiên. Phần slide hiện có chỉ giới thiệu tên các nội dung này, không triển khai thành hệ công thức hoặc phương pháp chi tiết.',
      '> Ghi nhớ: Toán học giúp kỹ sư chuyển những quan hệ trong thực tế thành biểu thức, mô hình và quy luật có thể phân tích.',
    ],
  },
  {
    id: 'ch7-mechanics-basics',
    category: 'Chương 7',
    detailCategory: 'Chương 7: Cơ sở kỹ thuật',
    title: 'Cơ học cơ bản: Lực, cân bằng và chuyển động',
    sapo: 'Từ một chiếc lò xo đến một kết cấu chịu tải, cơ học giúp giải thích cách vật thể phản ứng trước lực và thay đổi trạng thái chuyển động.',
    imageLabel: 'Sơ đồ vật thể tự do và điều kiện cân bằng lực – mômen',
    imageSrc: '/assets/aistudio/image_5190a848.png',
    imageAlt:
      'Minh họa cần cẩu nâng động cơ bên cạnh sơ đồ vật thể tự do với các vectơ lực, phản lực gối và điều kiện cân bằng tổng lực và tổng mômen bằng không',
    imageFit: 'contain',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Cơ học là nền tảng để phân tích các vật thể và cơ cấu trong kỹ thuật. Trong chương này, nội dung cơ học được trình bày qua tĩnh học và động học/động lực học. Tĩnh học quan tâm đến sự cân bằng của vật thể dưới tác dụng của hệ lực; phần chuyển động xem xét trạng thái và sự thay đổi chuyển động dưới tác động của lực.',
      '---',
      '### Tĩnh học: lực và mômen',
      'Lực biểu thị sự tương tác giữa các vật thể và được mô tả bằng độ lớn, hướng và điểm đặt. Trong hệ SI, đơn vị lực là newton (N), được xác định từ quan hệ giữa khối lượng và gia tốc. Khi ngoại lực tác động lên vật, bên trong vật liệu có thể xuất hiện nội lực nhằm duy trì liên kết giữa các phần.',
      'Một dạng lực được đề cập trong slide là lực đàn hồi của lò xo. Trong miền đàn hồi tuyến tính, lực kéo hoặc nén tỷ lệ với độ biến dạng; với lò xo xoắn, mômen xoắn liên hệ với góc quay và độ cứng xoắn. Ma sát cũng là lực quan trọng, gồm ma sát khô và ma sát ướt. Ma sát tĩnh có thể chống lại xu hướng trượt cho đến một giới hạn phụ thuộc vào hệ số ma sát và phản lực.',
      {
        type: 'formula',
        expression: 'F = kx     •     Fₘₐₓ = μN',
      },
      {
        type: 'figure',
        src: '/assets/aistudio/image_b4f13017.png',
        alt: 'Sơ đồ lò xo có độ cứng k chịu lực kéo F dẫn tới độ giãn x',
        caption:
          'Trong giới hạn đàn hồi tuyến tính, độ biến dạng x của lò xo tỷ lệ thuận với lực tác dụng F theo độ cứng k.',
        fit: 'contain',
      },
      'Mômen thể hiện khả năng làm vật quay quanh một trục. Tác dụng quay phụ thuộc vào độ lớn lực và cánh tay đòn – khoảng cách vuông góc từ trục quay đến đường tác dụng của lực. Ngẫu lực gồm hai lực song song, bằng nhau về độ lớn và ngược chiều, tạo xu hướng quay. Để vật rắn cân bằng, tổng lực và tổng mômen tác dụng lên vật phải bằng không.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_5190a848.png',
        alt: 'Minh họa cơ cấu nâng và sơ đồ vật thể tự do thể hiện lực tác dụng, phản lực tại gối tựa cùng phương trình cân bằng tổng lực và tổng mômen bằng không',
        caption:
          'Sơ đồ vật thể tự do tách kết cấu chịu tải khỏi liên kết để biểu diễn đầy đủ các lực tác dụng, phản lực gối và điều kiện cân bằng ΣF = 0, ΣM = 0.',
        fit: 'contain',
      },
      '---',
      '### Động học và động lực học',
      'Slide giới thiệu các định luật Newton về chuyển động. Định luật thứ nhất mô tả quán tính: khi hợp lực bằng không, vật giữ trạng thái đứng yên hoặc chuyển động thẳng đều. Định luật thứ hai liên hệ hợp lực với khối lượng và gia tốc. Định luật thứ ba mô tả lực và phản lực giữa hai vật tương tác: chúng có độ lớn bằng nhau, cùng đường tác dụng và ngược chiều.',
      {
        type: 'formula',
        expression: 'ΣF = ma',
      },
      'Các đại lượng mô tả chuyển động gồm quãng đường, thời gian, tốc độ, vận tốc và gia tốc. Tốc độ cho biết mức độ nhanh chậm; vận tốc còn bao gồm hướng chuyển động; gia tốc mô tả sự thay đổi vận tốc theo thời gian. Slide cũng giới thiệu định luật vạn vật hấp dẫn và phân biệt khối lượng với trọng lượng. Khối lượng là đại lượng đặc trưng cho vật thể, trong khi trọng lượng là lực hấp dẫn tác dụng lên vật và phụ thuộc vào gia tốc trọng trường.',
      {
        type: 'formula',
        expression: 'W = mg',
      },
      '> Ghi nhớ: Tĩnh học xét điều kiện cân bằng; động học mô tả chuyển động; động lực học liên hệ chuyển động với nguyên nhân là lực.',
    ],
  },
  {
    id: 'ch7-energy-circuits',
    category: 'Chương 7',
    detailCategory: 'Chương 7: Cơ sở kỹ thuật',
    title: 'Công, năng lượng và mạch điện: Những nguyên lý vận hành hệ thống',
    sapo: 'Máy móc cần năng lượng để hoạt động; mạch điện cần dòng điện và điện áp để truyền năng lượng hoặc tín hiệu.',
    imageLabel: 'Sơ đồ mạch điện nhiều vòng với nguồn áp, điện trở và dòng vòng',
    imageSrc: '/assets/aistudio/image_974f5fd7.png',
    imageAlt:
      'Sơ đồ mạch điện gồm nguồn áp 20 V, bốn điện trở 5 Ω, 10 Ω, 15 Ω, 20 Ω và hai vòng dòng điện I1, I2',
    imageFit: 'contain',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Khi lực làm vật dịch chuyển, năng lượng được truyền thông qua công. Công phụ thuộc vào thành phần lực theo hướng dịch chuyển và quãng đường. Công suất cho biết tốc độ thực hiện công hoặc tốc độ truyền năng lượng. Trong hệ SI, công và năng lượng dùng đơn vị joule (J), còn công suất dùng watt (W).',
      {
        type: 'formula',
        expression: 'W = Fd cosθ     •     P = W/t',
      },
      'Slide đề cập các dạng năng lượng gồm động năng, thế năng và năng lượng đàn hồi. Động năng gắn với trạng thái chuyển động của vật; thế năng hấp dẫn liên quan đến vị trí của vật trong trường trọng lực; năng lượng đàn hồi gắn với sự biến dạng của vật đàn hồi. Những khái niệm này cho phép mô tả quá trình năng lượng được tích trữ, truyền và chuyển hóa trong hệ thống.',
      {
        type: 'formula',
        expression: 'Eₖ = ½mv²     •     Eₚ = mgΔh',
      },
      '---',
      '### Mạch điện và các đại lượng cơ bản',
      'Mạch điện là sự liên kết của các phần tử nhằm tạo ra, phân phối hoặc chuyển đổi điện năng, hoặc xử lý thông tin dưới dạng tín hiệu điện. Mạch có thể là một chiều (DC) hoặc xoay chiều (AC). Các đại lượng cơ bản được nêu trong slide gồm điện tích Q, dòng điện I, điện áp V, năng lượng E và công suất P.',
      'Dòng điện biểu thị tốc độ dịch chuyển điện tích theo thời gian; điện áp biểu diễn năng lượng trên một đơn vị điện tích; công suất là tốc độ truyền hoặc tiêu thụ năng lượng. Những đại lượng này liên kết với nhau trong quá trình hoạt động của mạch.',
      {
        type: 'formula',
        expression: 'I = dQ/dt     •     V = E/Q     •     P = dE/dt',
      },
      'Ba phần tử thụ động được giới thiệu là điện trở, điện cảm và điện dung, thường ký hiệu R, L và C. Nguồn điện có thể được mô hình hóa thành nguồn áp hoặc nguồn dòng. Định luật Ohm liên hệ điện áp, dòng điện và điện trở trong phần tử tuân theo quan hệ tuyến tính.',
      {
        type: 'formula',
        expression: 'V = IR',
      },
      'Định luật Kirchhoff về dòng điện (KCL) phát biểu tổng dòng điện đi vào một nút bằng tổng dòng điện đi ra nút đó. Định luật Kirchhoff về điện áp (KVL) phát biểu tổng đại số điện áp quanh một vòng kín bằng không. Slide còn giới thiệu phương pháp dòng nhánh, phương pháp dòng vòng và việc đơn giản hóa mạch, trong đó có cách mắc nối tiếp và song song.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_a64075c0.png',
        alt: 'Các biểu thức Định luật Kirchhoff về điện áp (KVL), dòng điện (KCL) và Định luật Ohm cho mạch DC và AC',
        caption:
          'Tổng hợp định luật Kirchhoff (KVL cho một vòng kín, KCL tại một nút) và định luật Ohm trong phân tích mạch một chiều (DC) lẫn xoay chiều (AC).',
        fit: 'contain',
      },
      {
        type: 'figure',
        src: '/assets/aistudio/image_974f5fd7.png',
        alt: 'Sơ đồ mạch điện có nguồn áp 20 V, các điện trở 5 Ω, 10 Ω, 15 Ω, 20 Ω và hai vòng dòng điện I1, I2',
        caption:
          'Ví dụ sơ đồ mạch điện minh họa phương pháp phân tích dòng vòng (I₁, I₂) dựa trên định luật Kirchhoff và định luật Ohm.',
        fit: 'contain',
      },
      '> Ghi nhớ: Công và năng lượng mô tả việc truyền hoặc tích trữ năng lượng; công suất mô tả tốc độ truyền năng lượng; Ohm và Kirchhoff là các nguyên lý nền tảng để phân tích mạch điện.',
    ],
  },
  {
    id: 'ch8-communication-basics',
    category: 'Chương 8',
    detailCategory: 'Chương 8: Giao tiếp trong kỹ thuật',
    layoutVariant: 'magazine-dossier',
    editorialBadge: 'Khung Giao Tiếp Kỹ Thuật',
    dossierSummary: {
      label: 'Nguyên lý truyền tin',
      text: 'Giao tiếp kỹ thuật không dừng ở việc phát biểu lưu loát; thông điệp chỉ hoàn tất khi người nhận giải mã đúng và phản hồi xác nhận.',
    },
    title: 'Người kỹ sư giỏi chuyên môn đã đủ chưa?',
    sapo: 'Trong kỹ thuật, một ý tưởng dù tốt đến đâu cũng khó trở thành sản phẩm hoàn chỉnh nếu người tạo ra nó không thể truyền đạt rõ ràng cho những người cùng thực hiện.',
    imageLabel: 'Nhóm kỹ sư trao đổi bản vẽ kỹ thuật tại bàn làm việc',
    imageSrc: '/src/assets/images/ch8_comm_workbench_1795862048280.jpg',
    imageAlt:
      'Ba kỹ sư cùng trao đổi và chỉ rõ các chi tiết trên bản vẽ kỹ thuật cạnh mô hình chi tiết máy tại bàn làm việc',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Hãy thử hình dung một kỹ sư thiết kế vừa hoàn thành bản vẽ cho một chi tiết máy. Các thông số đã được tính toán, kích thước đã được xác định và phương án thiết kế cũng đã được lựa chọn. Tuy nhiên, khi bản vẽ được chuyển đến bộ phận sản xuất, người vận hành lại hiểu sai một yêu cầu kỹ thuật. Chi tiết được gia công không đúng như dự kiến, thời gian sản xuất bị kéo dài và nhóm thiết kế phải thực hiện lại một phần công việc.',
      'Vấn đề trong tình huống này không nhất thiết nằm ở năng lực tính toán hay thiết kế. Đôi khi, nguyên nhân đơn giản là thông tin chưa được truyền đạt và tiếp nhận chính xác.',
      'Đây là lý do giao tiếp trở thành một năng lực không thể thiếu đối với người làm kỹ thuật.',
      '---',
      '### Giao tiếp không chỉ là nói chuyện',
      'Theo định nghĩa được sử dụng trong tài liệu học tập, giao tiếp là hoạt động hoặc quá trình diễn đạt ý tưởng, cảm xúc, chia sẻ thông tin và kiến thức với người khác. Trong môi trường kỹ thuật, quá trình này còn bao gồm việc trao đổi kinh nghiệm nghề nghiệp, trình bày phương án thiết kế, giải thích các kết quả phân tích và phối hợp giải quyết vấn đề.',
      'Giao tiếp có thể diễn ra bằng nhiều cách. Một kỹ sư có thể trình bày ý tưởng trong cuộc họp, gửi báo cáo qua email, giải thích bản vẽ cho đồng nghiệp hoặc sử dụng mô hình kỹ thuật để mô tả hoạt động của một thiết bị. Ngay cả một biểu đồ hay một ký hiệu trên bản vẽ cũng có thể trở thành phương tiện truyền tải thông tin.',
      'Vì vậy, giao tiếp không đơn thuần là khả năng nói lưu loát. Điều quan trọng hơn là làm sao để người nhận hiểu đúng nội dung mà người gửi muốn truyền đạt.',
      {
        type: 'figure',
        src: '/src/assets/images/ch8_comm_workbench_1795862048280.jpg',
        alt: 'Nhóm kỹ sư đang cùng trao đổi bản vẽ kỹ thuật trên bàn làm việc bên cạnh chi tiết mẫu',
        caption:
          'Trao đổi trực tiếp trên bản vẽ và mô hình giúp nhóm thiết kế và bộ phận thực hiện thống nhất yêu cầu kỹ thuật.',
        fit: 'cover',
      },
      '---',
      '### Một thông điệp phải đi qua những bước nào?',
      'Quá trình giao tiếp thường bắt đầu khi một người hình thành ý tưởng cần truyền đạt. Ý tưởng đó được chuyển thành thông điệp bằng lời nói, chữ viết, hình ảnh hoặc ký hiệu. Thông điệp tiếp tục được truyền qua một kênh như cuộc trò chuyện trực tiếp, điện thoại, email hay báo cáo. Ở phía bên kia, người nhận tiếp nhận và giải mã thông tin để hiểu nội dung. Cuối cùng, họ đưa ra phản hồi để người gửi biết thông điệp đã được tiếp nhận như thế nào.',
      {
        type: 'processDiagram',
        title: 'Mô hình quá trình giao tiếp kỹ thuật',
        subtitle: 'Chuỗi 5 bước truyền tải thông điệp hai chiều kèm vòng phản hồi',
        theme: 'dark',
        steps: [
          {
            label: 'Người gửi',
            detail: 'Hình thành ý tưởng, thông số hoặc yêu cầu cần truyền đạt.',
          },
          {
            label: 'Mã hóa',
            detail: 'Chuyển thành lời nói, văn bản, bản vẽ hoặc ký hiệu kỹ thuật.',
          },
          {
            label: 'Kênh truyền',
            detail: 'Cuộc họp trực tiếp, điện thoại, email hoặc báo cáo.',
          },
          {
            label: 'Giải mã',
            detail: 'Người nhận tiếp nhận và hiểu đúng ý nghĩa kỹ thuật.',
          },
          {
            label: 'Phản hồi',
            detail: 'Đặt câu hỏi và xác nhận để đồng bộ cách hiểu.',
          },
        ],
        loopNote:
          'Phản hồi mở ra lượt trao đổi tiếp theo để hai bên hiệu chỉnh đến khi thống nhất hoàn toàn.',
        noiseNote:
          'Nhiễu (Noise): tiếng ồn công trường, đường truyền kém, thuật ngữ rối hoặc mất tập trung có thể làm sai lệch thông điệp.',
      },
      {
        type: 'figure',
        src: '/assets/ch8/comm_5_steps.svg',
        alt: 'Sơ đồ 5 bước cơ bản của quá trình giao tiếp gồm: người gửi có ý tưởng, mã hóa ý tưởng, truyền qua các kênh, người nhận giải mã thông điệp, phản hồi cho người gửi và hồi đáp thêm',
        caption:
          'Hình 1. Năm bước cơ bản của quá trình giao tiếp kèm vòng phản hồi hai chiều.',
        fit: 'contain',
      },
      'Điểm đáng chú ý là giao tiếp không kết thúc ngay sau khi người nhận hiểu thông điệp. Phản hồi có thể tạo ra một lượt trao đổi tiếp theo. Người gửi giải thích thêm, người nhận đặt câu hỏi hoặc hai bên cùng điều chỉnh cách hiểu cho đến khi thống nhất được nội dung.',
      'Trong một cuộc họp kỹ thuật, chẳng hạn, người thiết kế trình bày phương án lắp ráp. Người phụ trách sản xuất có thể yêu cầu giải thích thêm về vị trí của một bộ phận. Câu hỏi này chính là phản hồi giúp người thiết kế nhận ra phần thông tin chưa đủ rõ.',
      'Bên cạnh đó, mô hình giao tiếp còn cho thấy sự xuất hiện của yếu tố nhiễu. Tiếng ồn tại công trường, đường truyền điện thoại không ổn định, cách diễn đạt quá phức tạp hay sự thiếu tập trung đều có thể làm sai lệch thông điệp.',
      {
        type: 'figure',
        src: '/assets/ch8/comm_noise_model.svg',
        alt: 'Sơ đồ mô hình giao tiếp tiếng Việt gồm Người gửi, Các kênh giao tiếp, Người nhận, Phản hồi và yếu tố Nhiễu',
        caption:
          'Hình 2. Mô hình người gửi, kênh giao tiếp, người nhận, phản hồi và tác động của yếu tố nhiễu.',
        fit: 'contain',
      },
      {
        type: 'figure',
        src: '/assets/ch8/comm_process_en.svg',
        alt: 'Sơ đồ The Communication Process gồm Sender, Encoding, Message, Channel, Decoding, Receiver, Feedback và Noise',
        caption:
          'Hình 3. Chu trình truyền tin (The Communication Process) với các khâu mã hóa (Encoding), giải mã (Decoding), nhiễu (Noise) và phản hồi (Feedback).',
        fit: 'contain',
      },
      '---',
      '### Khi mỗi người hiểu một kiểu',
      'Có một hình minh họa khá thú vị thường được sử dụng để nói về thất bại trong giao tiếp của các dự án. Cùng một yêu cầu ban đầu về việc xây dựng một chiếc xích đu, nhưng khách hàng, người quản lý dự án, người phân tích, lập trình viên và bộ phận tư vấn lại hiểu, thiết kế hoặc thực hiện theo những cách khác nhau. Kết quả cuối cùng có thể rất xa so với thứ khách hàng thực sự cần.',
      {
        type: 'figure',
        src: '/assets/ch8/tree_swing_mismatch.svg',
        alt: 'Bộ tranh minh họa 10 khung về chiếc xích đu qua các góc nhìn từ khách hàng, quản lý dự án, phân tích, lập trình, tư vấn cho đến thứ khách hàng thực sự cần',
        caption:
          'Hình 4. Minh họa kinh điển về sự sai lệch thông tin giữa các bộ phận trong cùng một dự án.',
        fit: 'contain',
      },
      'Hình ảnh mang tính hài hước này phản ánh một vấn đề nghiêm túc: mỗi bộ phận có thể hoàn thành phần việc của mình nhưng toàn bộ dự án vẫn thất bại nếu các thành viên không thống nhất về mục tiêu và yêu cầu.',
      'Đối với kỹ sư, giao tiếp hiệu quả vì thế cần sự rõ ràng, tập trung và phản hồi thường xuyên. Người nói phải có trách nhiệm diễn đạt thông tin dễ hiểu; người nghe cũng cần chủ động xác nhận những nội dung chưa rõ.',
      'Một kỹ sư giỏi không chỉ biết tìm ra lời giải cho vấn đề kỹ thuật. Họ còn phải biết trình bày lời giải đó để người khác có thể hiểu, đánh giá và cùng thực hiện. Bởi suy cho cùng, kỹ thuật là công việc của kiến thức, nhưng để biến kiến thức thành kết quả, con người vẫn cần giao tiếp với nhau.',
    ],
  },
  {
    id: 'ch8-technical-presentation',
    category: 'Chương 8',
    detailCategory: 'Chương 8: Giao tiếp trong kỹ thuật',
    title: 'Đằng sau một bài thuyết trình kỹ thuật thuyết phục',
    sapo: 'Một bài trình bày tốt không bắt đầu khi người nói đứng trước màn hình. Nó bắt đầu từ việc hiểu mình cần nói gì, nói với ai và muốn người nghe nhớ điều gì.',
    imageLabel: 'So sánh slide thuyết trình nhiều chữ và slide trực quan',
    imageSrc: '/assets/ch8/slide_dont_do.svg',
    imageAlt:
      'Bảng so sánh một slide PowerPoint dày đặc chữ (Don’t) với một slide trình bày cô đọng có bố cục trực quan và biểu tượng minh họa (Do)',
    imageFit: 'contain',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Trong một buổi bảo vệ đồ án, hai nhóm sinh viên có thể cùng nghiên cứu một đề tài, có lượng dữ liệu tương đương và đưa ra những kết quả gần giống nhau. Tuy nhiên, nhóm thứ nhất trình bày rõ ràng, có hình ảnh minh họa phù hợp và giải thích được những điểm quan trọng. Nhóm còn lại dành phần lớn thời gian đọc nội dung trên slide, khiến người nghe khó theo dõi.',
      'Sự khác biệt đôi khi không nằm ở chất lượng đồ án mà ở cách các thành viên truyền đạt thành quả của mình.',
      'Trong môi trường kỹ thuật, người kỹ sư thường xuyên phải trình bày phương án thiết kế, kết quả thực nghiệm, tiến độ dự án hoặc một vấn đề chuyên môn trước đồng nghiệp, nhà quản lý và khách hàng. Có bài trình bày được chuẩn bị trước cho hội nghị, cuộc họp hoặc buổi báo cáo chính thức. Cũng có những lần người kỹ sư phải giải thích ngắn gọn một vấn đề ngay trong quá trình làm việc.',
      'Dù ở hình thức nào, sự chuẩn bị vẫn là yếu tố quyết định.',
      '---',
      '### Bắt đầu từ người nghe, không phải từ PowerPoint',
      'Trước khi mở phần mềm trình chiếu, người thuyết trình cần xác định mục đích của bài nói. Mình đang muốn giới thiệu một sản phẩm, giải thích một nguyên lý, báo cáo kết quả thí nghiệm hay thuyết phục người khác lựa chọn phương án thiết kế?',
      'Mục đích khác nhau sẽ quyết định cách lựa chọn nội dung và hình thức thể hiện.',
      'Một yếu tố không kém phần quan trọng là người nghe. Một nhóm kỹ sư có thể hiểu các thuật ngữ chuyên ngành, nhưng khách hàng không có nền tảng kỹ thuật có thể cần những ví dụ và hình ảnh trực quan hơn. Cùng một thông tin, nếu được trình bày theo cách phù hợp với đối tượng tiếp nhận, khả năng hiểu và ghi nhớ sẽ cao hơn.',
      'Người chuẩn bị cũng cần dự kiến số lượng người nghe, kiến thức nền của họ, thời lượng trình bày và những câu hỏi có khả năng xuất hiện. Đối với một buổi báo cáo đồ án, chẳng hạn, sinh viên nên dự kiến trước những câu hỏi về cơ sở lựa chọn phương án thiết kế, độ chính xác của kết quả và những hạn chế trong quá trình thực hiện.',
      '---',
      '### Một bài trình bày cần có mạch dẫn rõ ràng',
      'Thông thường, bài thuyết trình có phần mở đầu, nội dung chính và kết luận. Trước khi đi vào vấn đề, người trình bày nên giới thiệu bản thân hoặc nhóm thực hiện, thông báo chủ đề, nội dung dự kiến và thời gian trình bày. Đây là những thông tin giúp người nghe biết mình sắp tiếp nhận điều gì.',
      'Phần nội dung nên được sắp xếp theo trình tự hợp lý. Với một báo cáo kỹ thuật, người trình bày có thể bắt đầu từ vấn đề cần giải quyết, sau đó giới thiệu cơ sở lý thuyết, phương pháp thực hiện, kết quả và những phân tích liên quan. Các phần phải liên kết với nhau để người nghe thấy được quá trình từ câu hỏi ban đầu đến kết quả cuối cùng.',
      'Kết luận không nên chỉ lặp lại toàn bộ nội dung đã trình bày. Đây là lúc người nói nhấn mạnh những kết quả quan trọng nhất, nêu nhận xét hoặc đề xuất hướng giải quyết tiếp theo.',
      '---',
      '### Slide tốt không phải slide chứa nhiều thông tin',
      'Một trong những lỗi phổ biến khi làm PowerPoint là cố gắng đưa toàn bộ nội dung cần nói lên màn hình. Những slide chứa quá nhiều chữ khiến người nghe phải lựa chọn giữa việc đọc và việc lắng nghe diễn giả.',
      'Một slide nên tập trung vào một ý tưởng chính. Thay vì viết cả đoạn giải thích dài, người trình bày có thể sử dụng từ khóa, biểu đồ, sơ đồ, hình ảnh hoặc bảng số liệu để hỗ trợ cho phần diễn giải bằng lời.',
      {
        type: 'figure',
        src: '/assets/ch8/slide_dont_do.svg',
        alt: 'Minh họa so sánh giữa slide thiết kế quá nhiều văn bản dày đặc (Don’t) và slide chia khối trực quan kết hợp hình ảnh rõ ràng (Do)',
        caption:
          'So sánh cách trình bày slide nhiều đoạn chữ dàn trải (bên trái) và slide cô đọng ý chính kết hợp minh họa trực quan (bên phải).',
        fit: 'contain',
      },
      'Tài liệu học tập đưa ra một số nguyên tắc thiết kế như sử dụng màu sắc có tương phản, lựa chọn phông chữ dễ đọc, dùng kích thước chữ phù hợp và hạn chế quá nhiều kiểu chữ trong cùng một bài. Quy luật 6 × 7 cũng được giới thiệu như một gợi ý: không quá sáu dòng trên một slide và không quá bảy từ trên một dòng. Đây là một mẹo giúp tránh quá tải, không phải giới hạn bắt buộc cho mọi loại slide.',
      {
        type: 'statSpotlight',
        headline: 'Quy luật 6 × 7',
        label: 'Gợi ý giữ slide gọn nhẹ, dễ theo dõi',
        summary:
          'Giúp khán giả vừa nghe diễn giả trình bày vừa nắm được từ khóa thay vì phải đọc từng đoạn văn dày đặc trên màn hình.',
        theme: 'yellow',
        items: [
          { value: '≤ 6 dòng', caption: 'Giới hạn số dòng chữ trên một slide' },
          { value: '≤ 7 từ', caption: 'Giới hạn số từ trên mỗi dòng trình chiếu' },
          { value: '1 ý chính', caption: 'Mỗi slide tập trung vào một thông điệp cốt lõi' },
        ],
      },
      'Đối với nội dung kỹ thuật, biểu đồ và hình ảnh cần được lựa chọn có mục đích. Một bản vẽ có chú thích đúng vị trí có thể diễn đạt một phương án lắp ráp tốt hơn nhiều câu văn. Tuy nhiên, hình ảnh trang trí không liên quan đến vấn đề lại có thể làm người nghe mất tập trung.',
      {
        type: 'comparison',
        title: 'Thiết kế slide & làm chủ bài trình bày',
        goodTitle: 'Slide trực quan & Làm chủ bài nói',
        badTitle: 'Slide quá tải chữ',
        pairs: [
          {
            topic: 'Mật độ nội dung',
            good: 'Từ khóa cô đọng, bản vẽ chú thích đúng vị trí, sơ đồ và số liệu có mục đích.',
            bad: 'Chép cả đoạn giải thích dài lên slide khiến người nghe vừa đọc vừa mất tập trung.',
          },
          {
            topic: 'Thị giác & Chữ',
            good: 'Màu sắc tương phản rõ ràng, phông chữ dễ đọc và thống nhất kiểu chữ.',
            bad: 'Dùng nhiều kiểu chữ lộn xộn hoặc thêm hình trang trí không liên quan.',
          },
          {
            topic: 'Cách trình bày',
            good: 'Hiểu mạch dẫn và giải thích tự nhiên mà không phụ thuộc vào ghi chú.',
            bad: 'Đọc nguyên văn từng chữ trên màn hình chiếu.',
          },
        ],
      },
      '---',
      '### Luyện tập để bài nói không phụ thuộc vào slide',
      'Sau khi hoàn thành nội dung, người thuyết trình cần luyện tập trước gương, trước đồng nghiệp hoặc trong không gian tương tự buổi trình bày thực tế. Việc sử dụng đồng hồ bấm giờ giúp kiểm soát thời lượng và xác định phần nội dung có thể rút gọn khi cần thiết.',
      'Một cách luyện tập hữu ích là thử trình bày mà không nhìn vào ghi chú. Khi hiểu rõ nội dung, người nói có thể giải thích tự nhiên hơn thay vì đọc nguyên văn từ màn hình.',
      'Một bài thuyết trình kỹ thuật thuyết phục không phải là bài có nhiều hiệu ứng hay hình ảnh cầu kỳ. Đó là bài giúp người nghe hiểu được vấn đề, nắm bắt được lập luận và nhớ được kết quả quan trọng. Muốn làm được điều đó, người trình bày phải chuẩn bị kỹ cả kiến thức lẫn cách truyền đạt.',
    ],
  },
  {
    id: 'ch8-public-speaking',
    category: 'Chương 8',
    detailCategory: 'Chương 8: Giao tiếp trong kỹ thuật',
    title: 'Khi đứng trước đám đông: Điều gì khiến người nghe tin tưởng bạn?',
    sapo: 'Kiến thức chuyên môn giúp người kỹ sư có điều để trình bày, nhưng phong thái và cách tương tác quyết định người nghe tiếp nhận phần trình bày ấy như thế nào.',
    imageLabel: 'Diễn giả thuyết trình bản vẽ kỹ thuật trước khán giả',
    imageSrc: '/src/assets/images/ch8_public_speaking_1795862048234.jpg',
    imageAlt:
      'Kỹ sư đứng thuyết trình tự tin trước màn hình lớn hiển thị bản vẽ CAD kỹ thuật và tương tác với người nghe',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Đứng trước một nhóm người để trình bày kết quả nghiên cứu không phải lúc nào cũng dễ dàng. Có người nắm rất chắc kiến thức nhưng khi bắt đầu nói lại quá hồi hộp, nhìn liên tục vào màn hình hoặc diễn đạt không thành câu. Một số người khác có thể chuẩn bị nội dung rất tốt nhưng lúng túng khi khán giả đặt câu hỏi ngoài dự kiến.',
      'Thực tế, thuyết trình không chỉ là việc đọc hoặc nói lại những gì đã chuẩn bị. Đó còn là quá trình người nói tương tác với khán giả, giúp họ hiểu vấn đề và duy trì sự chú ý trong suốt buổi trình bày.',
      '---',
      '### Ánh mắt và tư thế cũng là một phần của thông điệp',
      'Khi thuyết trình, ánh mắt là một phương tiện giúp người nói duy trì sự kết nối với người nghe. Thay vì chỉ nhìn vào màn hình hoặc chăm chú vào một người duy nhất, diễn giả nên quan sát toàn bộ khán phòng, luân phiên giao tiếp bằng mắt với các nhóm người nghe.',
      'Một ánh mắt tự nhiên kết hợp với nụ cười phù hợp có thể tạo cảm giác thân thiện và cởi mở. Ngược lại, việc liên tục nhìn xuống tài liệu, né tránh ánh mắt hoặc tỏ ra mất tập trung có thể khiến người nghe khó duy trì sự kết nối.',
      'Tư thế đứng cũng có vai trò tương tự. Người trình bày nên giữ lưng thẳng, đầu hướng về phía trước, hai chân tạo thế đứng vững vàng và hai tay ở tư thế thoải mái. Có thể sử dụng cử chỉ để nhấn mạnh những điểm quan trọng, chẳng hạn chỉ vào một chi tiết trên bản vẽ hoặc dùng tay mô tả hướng chuyển động của một cơ cấu.',
      'Tuy nhiên, cử chỉ chỉ có giá trị khi được sử dụng đúng lúc. Việc vung tay liên tục, khoanh tay, lắc lư cơ thể, nghịch bút hoặc gãi đầu quá nhiều có thể làm giảm sự tập trung của khán giả.',
      {
        type: 'figure',
        src: '/src/assets/images/ch8_public_speaking_1795862048234.jpg',
        alt: 'Diễn giả giữ tư thế đứng vững vàng, ánh mắt hướng về người nghe bên cạnh màn hình trình chiếu bản vẽ kỹ thuật',
        caption:
          'Phong thái điềm tĩnh, ánh mắt giao tiếp với khán giả và cử chỉ tay tự nhiên giúp tăng độ tin cậy cho phần trình bày kỹ thuật.',
        fit: 'cover',
      },
      '---',
      '### Giọng nói giúp thông tin trở nên dễ tiếp nhận',
      'Một nội dung chuyên môn dù chính xác cũng có thể trở nên khó hiểu nếu được truyền đạt quá nhanh, quá nhỏ hoặc thiếu ngắt nghỉ. Vì thế, người thuyết trình cần chú ý đến âm lượng, tốc độ, cách phát âm và sự nhấn giọng.',
      'Khi trình bày một quy trình kỹ thuật có nhiều bước, việc ngắt nghỉ hợp lý giúp khán giả có thời gian tiếp nhận từng phần. Đối với những thông số hoặc kết quả quan trọng, người nói nên nhấn giọng vừa đủ để người nghe nhận biết đâu là thông tin cần chú ý.',
      'Không phải lúc nào nói thật nhanh cũng thể hiện được sự thành thạo. Một diễn giả có phong thái tốt là người biết điều chỉnh tốc độ nói phù hợp với độ phức tạp của vấn đề và khả năng tiếp nhận của người nghe.',
      'Trước buổi trình bày, việc giữ gìn sức khỏe, bảo vệ giọng nói và chuẩn bị trang phục phù hợp cũng cần được quan tâm. Trang phục nên sạch sẽ, gọn gàng, tạo sự thoải mái trong cử động và phù hợp với tính chất của buổi báo cáo.',
      '---',
      '### Khi khán giả đặt câu hỏi',
      'Đối với một bài thuyết trình kỹ thuật, phần hỏi đáp đôi khi là thời điểm thể hiện rõ nhất mức độ hiểu biết của người trình bày. Một câu hỏi có thể yêu cầu giải thích thêm về phương pháp tính toán, làm rõ một giả định hoặc chất vấn độ tin cậy của kết quả thực nghiệm.',
      'Điều đầu tiên cần làm là bình tĩnh lắng nghe toàn bộ câu hỏi. Nếu câu hỏi chưa rõ, người nói có thể nhắc lại hoặc diễn đạt theo cách hiểu của mình để xác nhận. Việc này vừa giúp kiểm tra nội dung câu hỏi, vừa tạo thêm thời gian suy nghĩ trước khi trả lời.',
      'Khi có nhiều câu hỏi, người thuyết trình có thể ghi lại để tránh bỏ sót và trả lời theo thứ tự phù hợp. Những câu hỏi dễ hoặc liên quan trực tiếp đến nội dung đã chuẩn bị có thể được trả lời trước. Với câu hỏi phức tạp, nên chia câu trả lời thành các ý để người nghe dễ theo dõi.',
      'Một tình huống rất quan trọng là khi người trình bày không biết câu trả lời. Thay vì suy đoán như thể đó là sự thật hoặc cố gắng né tránh, cách chuyên nghiệp hơn là thừa nhận giới hạn thông tin. Có thể nói rằng vấn đề chưa nằm trong phạm vi nghiên cứu, dữ liệu hiện tại chưa đủ để kết luận hoặc cần kiểm tra thêm trước khi đưa ra câu trả lời chính xác.',
      'Sự trung thực không làm giảm giá trị của người trình bày. Ngược lại, biết rõ giới hạn của kết quả cũng là một biểu hiện của tư duy kỹ thuật nghiêm túc.',
      'Một buổi thuyết trình thành công không đòi hỏi người nói phải hoàn hảo trong mọi tình huống. Điều quan trọng là họ có kiến thức, chuẩn bị tốt, thể hiện sự tự tin và tôn trọng người nghe. Khi những yếu tố đó kết hợp với nhau, phần trình bày sẽ trở thành một cuộc trao đổi có giá trị thay vì chỉ là một bài nói một chiều.',
      {
        type: 'comparison',
        title: 'Phong thái thuyết trình trước khán giả',
        goodTitle: 'Phong thái tạo niềm tin',
        badTitle: 'Thói quen làm mất kết nối',
        pairs: [
          {
            topic: 'Giao tiếp ánh mắt',
            good: 'Quan sát toàn bộ khán phòng, luân phiên giao tiếp bằng mắt với người nghe.',
            bad: 'Đọc liên tục từ màn hình, nhìn xuống tài liệu hoặc né tránh ánh mắt.',
          },
          {
            topic: 'Tư thế & Cử chỉ',
            good: 'Đứng vững vàng, dùng cử chỉ tay chỉ chi tiết bản vẽ đúng lúc để nhấn mạnh.',
            bad: 'Vung tay liên tục, khoanh tay, lắc lư cơ thể hoặc nghịch bút.',
          },
          {
            topic: 'Giọng nói & Nhịp độ',
            good: 'Ngắt nghỉ hợp lý giữa các bước quy trình và nhấn giọng ở thông số trọng tâm.',
            bad: 'Nói quá nhanh, quá nhỏ hoặc đều đều thiếu điểm nhấn.',
          },
          {
            topic: 'Khi gặp câu hỏi khó',
            good: 'Nhắc lại để xác nhận ý hỏi và trung thực thừa nhận giới hạn dữ liệu khi chưa biết.',
            bad: 'Suy đoán như thể đó là sự thật hoặc cố tình né tránh câu hỏi.',
          },
        ],
      },
    ],
  },
  {
    id: 'ch8-technical-report',
    category: 'Chương 8',
    detailCategory: 'Chương 8: Giao tiếp trong kỹ thuật',
    title: 'Một bản báo cáo kỹ thuật tốt không chỉ nằm ở những con số',
    sapo: 'Một kết quả thí nghiệm có thể rất chính xác, nhưng nếu được trình bày thiếu rõ ràng, người đọc vẫn khó đánh giá được giá trị thực sự của công việc.',
    imageLabel: 'Cấu trúc đề xuất cho một bản báo cáo kỹ thuật',
    imageSrc: '/assets/ch8/report_structure.svg',
    imageAlt:
      'Sơ đồ cấu trúc chuẩn của một bản báo cáo kỹ thuật (Recommended Technical Report Structure) phân loại các mục bắt buộc, tùy trường hợp và theo yêu cầu',
    imageFit: 'contain',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Sau nhiều ngày thực hiện một thí nghiệm, nhóm sinh viên cuối cùng cũng thu được bảng số liệu hoàn chỉnh. Các thông số đã được đo đạc, tính toán và so sánh. Tuy nhiên, khi đưa vào báo cáo, nhóm chỉ tập hợp các con số thành nhiều bảng dài mà không giải thích điều gì đáng chú ý. Người đọc có thể nhìn thấy dữ liệu nhưng không biết kết quả ấy chứng minh điều gì.',
      'Đây là một trong những vấn đề thường gặp khi viết báo cáo kỹ thuật. Viết báo cáo không chỉ là ghi lại những gì đã làm, mà còn là trình bày quá trình thực hiện và giúp người đọc hiểu được ý nghĩa của kết quả.',
      '---',
      '### Báo cáo là phương tiện trao đổi thông tin của người kỹ sư',
      'Trong môi trường đại học, báo cáo giúp giảng viên và người hướng dẫn đánh giá mức độ hiểu biết, khả năng vận dụng kiến thức và kết quả thực hiện nhiệm vụ của sinh viên. Khi đi làm, báo cáo kỹ thuật có thể được gửi đến nhà quản lý, khách hàng, đồng nghiệp hoặc những người chịu trách nhiệm triển khai thiết kế.',
      'Người đọc không phải lúc nào cũng có thời gian theo dõi từng chi tiết. Vì vậy, một báo cáo tốt cần rõ ràng, ngắn gọn, chính xác và được tổ chức hợp lý. Người viết phải xác định mục đích của tài liệu và đối tượng sẽ tiếp nhận nó trước khi bắt đầu.',
      'Một nguyên tắc quan trọng là không dùng những câu dài và thuật ngữ phức tạp khi có thể diễn đạt bằng cách đơn giản hơn. Tuy nhiên, sự đơn giản không có nghĩa là lược bỏ những thông tin kỹ thuật cần thiết. Mỗi thông số, giả định hoặc kết quả có ảnh hưởng đến kết luận đều phải được trình bày đầy đủ.',
      '---',
      '### Tổ chức báo cáo theo một trình tự có logic',
      'Một báo cáo kỹ thuật thông thường có thể bắt đầu bằng trang tiêu đề, tóm tắt và mục lục, sau đó là phần giới thiệu, cơ sở lý thuyết, phương pháp hoặc thiết bị thực nghiệm, kết quả, thảo luận, kết luận, tài liệu tham khảo và phụ lục.',
      {
        type: 'figure',
        src: '/assets/ch8/report_structure.svg',
        alt: 'Sơ đồ cấu trúc Recommended Technical Report Structure gồm Cover page, Table of Contents, Objective/Abstract, Introduction, List of Equipment, Procedure, Results, Results Analysis and Discussion, Summary/Conclusion, Appendix và References',
        caption:
          'Sơ đồ cấu trúc đề xuất cho báo cáo kỹ thuật, phân biệt rõ các phần bắt buộc (Mandatory), cần thiết khi phù hợp (If Necessary) và phần theo yêu cầu (If Required).',
        fit: 'contain',
      },
      'Phần tóm tắt có nhiệm vụ giúp người đọc nhanh chóng nắm được mục tiêu, phương pháp và kết quả chính. Theo nội dung tài liệu học tập, phần này thường được giới hạn trong khoảng 150–250 từ.',
      {
        type: 'statSpotlight',
        headline: '150–250 từ',
        label: 'Chuẩn độ dài phần Tóm tắt báo cáo kỹ thuật',
        summary:
          'Đủ ngắn gọn để người đọc nắm ngay mục tiêu, phương pháp và kết quả chính trước khi đi sâu vào bảng biểu và phần thảo luận.',
        theme: 'slate',
        items: [
          { value: '3 nhóm cấu trúc', caption: 'Bắt buộc · Khi cần thiết · Theo yêu cầu' },
          { value: 'Bảng & Biểu đồ', caption: 'Luôn kèm tiêu đề, đơn vị đo và nhãn trục' },
          { value: 'Thảo luận', caption: 'Đối chiếu số liệu thực nghiệm với lý thuyết' },
        ],
      },
      'Trong phần giới thiệu, người viết cần chỉ ra vấn đề đang được nghiên cứu, lý do thực hiện và mục tiêu cần đạt được. Phần lý thuyết trình bày những nguyên tắc, phương trình và giả định được sử dụng. Nếu có các thuật ngữ hoặc ký hiệu đặc biệt, chúng cần được giải thích để tránh gây nhầm lẫn.',
      'Đối với báo cáo thực nghiệm, người viết cần mô tả thiết bị, dụng cụ đo, độ chính xác hoặc phạm vi đo khi có liên quan, cùng với cách tiến hành thí nghiệm. Một sơ đồ bố trí thiết bị có thể giúp người đọc hình dung quá trình thực hiện dễ hơn so với một đoạn mô tả dài.',
      '---',
      '### Bảng biểu không thay thế được phần phân tích',
      'Kết quả thực nghiệm có thể được trình bày bằng bảng hoặc biểu đồ. Tuy nhiên, những dữ liệu này cần có tiêu đề, đơn vị, nhãn trục và chú thích rõ ràng. Các hình và bảng cũng cần được đánh số thống nhất để người đọc dễ tìm kiếm khi theo dõi nội dung.',
      'Một biểu đồ chỉ có ý nghĩa khi người đọc biết trục ngang và trục đứng thể hiện thông số gì, đơn vị đo là gì và các đường biểu diễn đại diện cho đại lượng nào. Việc đưa một biểu đồ đẹp nhưng không có chú thích đầy đủ có thể khiến thông tin trở nên khó hiểu hơn.',
      'Sau khi trình bày dữ liệu, phần thảo luận cần làm rõ những kết quả quan trọng. Nếu có thể, kết quả thực nghiệm nên được so sánh với giá trị lý thuyết hoặc các tài liệu tham khảo phù hợp. Sự khác biệt giữa kết quả dự kiến và kết quả đo được cần được phân tích, thay vì chỉ ghi nhận rằng hai giá trị không giống nhau.',
      'Phần kết luận là nơi người viết đối chiếu kết quả với mục tiêu ban đầu. Những kiến nghị tiếp theo cần xuất phát từ những gì báo cáo đã chứng minh, không nên đưa ra những đề xuất thiếu căn cứ.',
      '---',
      '### Báo cáo thí nghiệm và báo cáo thiết kế không hoàn toàn giống nhau',
      'Đối với báo cáo thiết kế, bên cạnh mục tiêu, lý thuyết và kết luận, người viết cần quan tâm đến các giả định thiết kế, những hạn chế, thông số kỹ thuật, các phương án thay thế, bản vẽ thiết kế và phân tích kinh tế khi phù hợp.',
      'Trong khi đó, báo cáo thực nghiệm tập trung nhiều hơn vào thiết bị, quy trình, dữ liệu đo và phân tích kết quả.',
      'Sự khác biệt này cho thấy không có một khuôn mẫu duy nhất phù hợp cho mọi báo cáo kỹ thuật. Cấu trúc cần được điều chỉnh theo mục đích của công việc và yêu cầu của người nhận.',
      'Sau cùng, một báo cáo tốt không được đánh giá chỉ bằng số trang hay số lượng bảng biểu. Giá trị của nó nằm ở khả năng giúp người đọc hiểu điều gì đã được thực hiện, kết quả ra sao và những kết luận nào có thể rút ra từ bằng chứng. Đó cũng chính là trách nhiệm của người kỹ sư khi truyền đạt kết quả công việc bằng văn bản.',
    ],
  },
  {
    id: 'ch8-active-listening',
    category: 'Chương 8',
    detailCategory: 'Chương 8: Giao tiếp trong kỹ thuật',
    title: 'Lắng nghe – Kỹ năng ít được chú ý nhưng quyết định hiệu quả giao tiếp',
    sapo: 'Trong một cuộc trao đổi, ai cũng muốn ý kiến của mình được lắng nghe. Nhưng không phải ai cũng dành đủ sự tập trung để thực sự hiểu người khác đang nói gì.',
    imageLabel: 'Năm giai đoạn của quá trình lắng nghe chủ động',
    imageSrc: '/assets/ch8/listening_stages.svg',
    imageAlt:
      'Biểu đồ 5 giai đoạn của quá trình lắng nghe (Stages of Listening): Tiếp nhận, Hiểu, Ghi nhớ, Đánh giá và Phản hồi',
    imageFit: 'contain',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Trong một buổi họp nhóm thực hiện đồ án, một thành viên đang giải thích nguyên nhân khiến thiết bị hoạt động không ổn định. Tuy nhiên, những người còn lại đã vội vàng đưa ra giải pháp trước khi nghe hết phần trình bày. Kết quả là nhóm mất thêm thời gian tranh luận về những phương án chưa phù hợp, trong khi nguyên nhân thực sự của sự cố vẫn chưa được làm rõ.',
      'Tình huống này cho thấy nghe và lắng nghe không hoàn toàn giống nhau.',
      'Nghe là khả năng tiếp nhận âm thanh thông qua cơ quan thính giác. Lắng nghe là quá trình chủ động hơn, đòi hỏi người tiếp nhận phải chú ý, hiểu nội dung, suy nghĩ về thông tin và đưa ra phản hồi phù hợp. Một người có thể nghe thấy lời nói nhưng tâm trí lại đang bận nghĩ đến vấn đề khác. Khi đó, thông tin đã đến tai nhưng chưa chắc đã được hiểu đầy đủ.',
      '---',
      '### Lắng nghe là một quá trình chủ động',
      'Quá trình lắng nghe có thể được hình dung bắt đầu từ việc tiếp nhận âm thanh. Sóng âm tác động lên màng nhĩ và tín hiệu được hệ thần kinh truyền đến não. Tuy nhiên, để hiểu được thông điệp, người nghe còn phải chú ý đến nội dung, xác định ý chính và liên hệ với kiến thức của mình.',
      {
        type: 'figure',
        src: '/assets/ch8/listening_stages.svg',
        alt: 'Sơ đồ Stages of Listening gồm 5 giai đoạn nối tiếp: Receiving, Understanding, Remembering, Evaluating và Responding',
        caption:
          'Năm giai đoạn của quá trình lắng nghe: Tiếp nhận (Receiving), Hiểu (Understanding), Ghi nhớ (Remembering), Đánh giá (Evaluating) và Phản hồi (Responding).',
        fit: 'contain',
      },
      'Trong giao tiếp, lắng nghe còn bao gồm việc ghi nhớ và hồi đáp. Người nghe có thể đặt câu hỏi, nhắc lại nội dung hoặc diễn giải điều vừa tiếp nhận để xác nhận rằng mình hiểu đúng.',
      {
        type: 'processDiagram',
        title: '5 giai đoạn của lắng nghe chủ động',
        theme: 'light',
        steps: [
          { label: 'Tiếp nhận', detail: 'Tập trung đón nhận trọn vẹn lời nói.' },
          { label: 'Hiểu', detail: 'Nắm ý chính và liên hệ bối cảnh.' },
          { label: 'Ghi nhớ', detail: 'Ghi chú thông số, đầu việc quan trọng.' },
          { label: 'Đánh giá', detail: 'Xem xét khách quan trước khi kết luận.' },
          { label: 'Phản hồi', detail: 'Diễn giải lại và đặt câu hỏi xác nhận.' },
        ],
      },
      'Đây là lý do lắng nghe cần được xem là một kỹ năng chứ không đơn thuần là hoạt động tự nhiên của đôi tai.',
      '---',
      '### Điều gì khiến chúng ta nghe kém hiệu quả?',
      'Có nhiều nguyên nhân làm giảm chất lượng lắng nghe. Một số người không tập trung vì đang làm việc khác, suy nghĩ về những vấn đề riêng hoặc chỉ chờ đến lượt mình nói. Một số khác có xu hướng nghe một phần thông tin rồi tự suy đoán phần còn lại.',
      'Môi trường bên ngoài cũng có thể ảnh hưởng. Tiếng máy móc tại nhà xưởng, các cuộc trò chuyện xen lẫn trong phòng họp hoặc kết nối điện thoại không ổn định đều khiến người nghe khó tiếp nhận đầy đủ thông tin.',
      'Ngoài ra, lượng thông tin quá nhiều, cách nói quá nhanh, thiếu hiểu biết về thuật ngữ chuyên ngành hoặc cảm xúc cá nhân cũng có thể trở thành rào cản. Khi người nghe đã có định kiến với người nói, họ có thể chỉ chú ý đến những phần củng cố suy nghĩ ban đầu và bỏ qua những thông tin quan trọng khác.',
      '---',
      '### Làm thế nào để trở thành người biết lắng nghe?',
      'Trước hết, người nghe cần dành sự chú ý cho cuộc trò chuyện. Hãy tạm gác những công việc khác, hướng ánh mắt về phía người nói và hạn chế để các yếu tố bên ngoài làm gián đoạn.',
      'Không nên vội ngắt lời hoặc tranh luận khi người khác chưa trình bày xong. Ngay cả khi không đồng ý, người nghe cũng nên để đối phương có cơ hội diễn đạt đầy đủ quan điểm. Việc dừng lại một chút trước khi phản hồi giúp tránh những câu trả lời thiếu cân nhắc do cảm xúc chi phối.',
      'Khi chưa rõ nội dung, hãy đặt câu hỏi. Những câu hỏi như "Anh có thể giải thích rõ hơn phần thông số này không?" hoặc "Có phải ý anh là thiết bị đang gặp vấn đề ở giai đoạn khởi động?" sẽ giúp kiểm tra lại cách hiểu.',
      'Một cách khác là nhắc lại hoặc diễn giải thông tin bằng lời của mình. Chẳng hạn, sau khi nghe đồng nghiệp mô tả sự cố, kỹ sư có thể nói: "Như vậy, vấn đề không nằm ở động cơ mà xuất hiện khi hệ thống truyền động bắt đầu chịu tải, đúng không?". Cách phản hồi này giúp người nói xác nhận hoặc điều chỉnh thông tin ngay lập tức.',
      'Việc ghi chép cũng rất hữu ích, đặc biệt trong các cuộc họp có nhiều thông số, nhiệm vụ và thời hạn. Người nghe nên ghi lại ý chính, số liệu quan trọng và những nội dung cần kiểm tra sau cuộc trao đổi thay vì cố gắng chép lại mọi câu nói.',
      {
        type: 'figure',
        src: '/src/assets/images/ch8_active_listening_team_1795862048086.jpg',
        alt: 'Nhóm kỹ sư quây quanh bàn bản vẽ tại nhà máy, các thành viên chăm chú lắng nghe và ghi chép trong lúc đồng nghiệp chỉ vào chi tiết kỹ thuật',
        caption:
          'Lắng nghe tập trung kết hợp ghi chép các thông số và đầu việc quan trọng giúp cuộc trao đổi kỹ thuật đạt hiệu quả cao.',
        fit: 'cover',
      },
      '---',
      '### Người nghe tốt không phải là người im lặng',
      'Lắng nghe chủ động không đồng nghĩa với việc không được đưa ra ý kiến. Người biết lắng nghe vẫn đặt câu hỏi, phản biện và nêu quan điểm riêng, nhưng họ thực hiện những điều đó sau khi đã hiểu nội dung cần trao đổi.',
      'Trong môi trường kỹ thuật, một câu hỏi đúng lúc có thể giúp phát hiện sai sót trước khi thiết bị được đưa vào vận hành. Một phản hồi chính xác có thể giúp nhóm điều chỉnh phương án thiết kế. Và đôi khi, việc dành thêm vài phút để nghe đồng nghiệp giải thích có thể tiết kiệm rất nhiều thời gian sửa chữa về sau.',
      {
        type: 'comparison',
        title: 'Lắng nghe chủ động hay Nghe thụ động?',
        goodTitle: 'Lắng nghe chủ động',
        badTitle: 'Nghe kém hiệu quả',
        pairs: [
          {
            topic: 'Sự tập trung',
            good: 'Gác việc khác, giữ ánh mắt hướng về người nói và để đối phương trình bày hết ý.',
            bad: 'Vừa làm việc riêng vừa nghe hoặc nóng vội ngắt lời đưa ra giải pháp sớm.',
          },
          {
            topic: 'Kiểm tra cách hiểu',
            good: 'Đặt câu hỏi làm rõ thông số và diễn giải lại bằng lời của mình để xác nhận.',
            bad: 'Chỉ nghe một phần thông tin rồi tự suy đoán phần còn lại.',
          },
          {
            topic: 'Ghi nhận nội dung',
            good: 'Ghi chép ý chính, số liệu và thời hạn cần kiểm tra lại sau cuộc họp.',
            bad: 'Chép nguyên văn mọi câu nói hoặc để định kiến cá nhân che mất thông tin chính.',
          },
        ],
      },
      'Lắng nghe vì thế không phải là kỹ năng đứng sau giao tiếp. Nó là một nửa quan trọng của quá trình trao đổi thông tin và là nền tảng để con người thực sự phối hợp với nhau.',
    ],
  },
  {
    id: 'ch8-asking-questions',
    category: 'Chương 8',
    detailCategory: 'Chương 8: Giao tiếp trong kỹ thuật',
    title: 'Đặt câu hỏi đúng – Chìa khóa giải quyết vấn đề trong kỹ thuật',
    sapo: 'Một câu hỏi tốt không chỉ giúp tìm kiếm câu trả lời. Đôi khi, nó còn giúp phát hiện rằng vấn đề ban đầu đã được hiểu sai.',
    imageLabel: 'Nhóm kỹ sư thảo luận và đặt câu hỏi trước bảng trắng',
    imageSrc: '/src/assets/images/ch8_asking_questions_1795862049035.jpg',
    imageAlt:
      'Một kỹ sư đứng bên bảng trắng vẽ sơ đồ hệ thống, đặt câu hỏi trao đổi cùng các thành viên trong phòng họp',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Khi một thiết bị không hoạt động như mong muốn, phản ứng thường thấy là nhanh chóng tìm cách sửa chữa. Tuy nhiên, nếu chưa xác định được nguyên nhân, việc thay đổi linh kiện hoặc điều chỉnh thông số có thể chỉ giải quyết phần biểu hiện bên ngoài.',
      'Một kỹ sư có tư duy phân tích sẽ bắt đầu bằng việc đặt câu hỏi: Sự cố xuất hiện từ khi nào? Nó xảy ra trong điều kiện nào? Có thông số nào thay đổi trước thời điểm xảy ra sự cố? Những bộ phận nào có liên quan?',
      'Thông qua từng câu hỏi, vấn đề dần được thu hẹp và người thực hiện có cơ sở để lựa chọn phương án kiểm tra.',
      'Đặt câu hỏi vì thế không chỉ là một kỹ năng giao tiếp mà còn là công cụ hỗ trợ tư duy và giải quyết vấn đề.',
      '---',
      '### Không phải câu hỏi nào cũng có cùng mục đích',
      'Trong hoạt động thảo luận, có những câu hỏi được đưa ra cho cả nhóm nhằm khuyến khích mọi người suy nghĩ. Đây là dạng câu hỏi chung chung. Chẳng hạn, khi bắt đầu một buổi họp thiết kế, trưởng nhóm có thể hỏi: "Theo mọi người, những khó khăn lớn nhất của phương án này là gì?". Câu hỏi không hướng đến một cá nhân cụ thể mà tạo cơ hội để nhiều thành viên cùng đóng góp.',
      'Ưu điểm của cách hỏi này là khuyến khích sự tham gia và giúp mở đầu cuộc thảo luận. Tuy nhiên, nếu câu hỏi quá rộng hoặc không có định hướng, người tham gia có thể không biết nên bắt đầu từ đâu và cuối cùng không ai đưa ra ý kiến.',
      'Ngược lại, câu hỏi trực tiếp hướng đến một người hoặc một nhóm nhỏ. Trong cuộc họp, người điều phối có thể hỏi kỹ sư phụ trách: "Anh đã kiểm tra độ sai lệch của cảm biến chưa?". Cách hỏi này giúp thu được câu trả lời cụ thể và tạo cơ hội cho những người ít nói tham gia. Tuy nhiên, cần tránh đặt câu hỏi khiến người được hỏi cảm thấy bị dồn vào thế khó khi họ chưa có đủ thông tin.',
      {
        type: 'figure',
        src: '/src/assets/images/ch8_asking_questions_1795862049035.jpg',
        alt: 'Nhóm kỹ sư đang thảo luận trước bảng trắng có sơ đồ hệ thống để cùng phân tích và trả lời các câu hỏi kỹ thuật',
        caption:
          'Đặt đúng câu hỏi trước sơ đồ hệ thống giúp nhóm làm rõ giả định, thu hẹp phạm vi kiểm tra và phối hợp hiệu quả hơn.',
        fit: 'cover',
      },
      '---',
      '### Câu hỏi mở và câu hỏi xác định',
      'Câu hỏi mở thường bắt đầu bằng những từ như ai, cái gì, khi nào, ở đâu, như thế nào và tại sao. Loại câu hỏi này khuyến khích người trả lời giải thích, phân tích và cung cấp thêm thông tin.',
      'Ví dụ, thay vì chỉ hỏi "Thiết bị có hoạt động không?", kỹ sư có thể hỏi "Thiết bị hoạt động như thế nào khi tải tăng?". Câu hỏi thứ hai có khả năng mở ra nhiều thông tin hơn về điều kiện vận hành, sự thay đổi của thông số và những hiện tượng xảy ra.',
      'Tuy nhiên, câu hỏi mở đôi khi khó trả lời nếu quá rộng. Đặc biệt, câu hỏi bắt đầu bằng "tại sao" có thể khiến người được hỏi cảm thấy mình đang bị chất vấn. Vì thế, cần diễn đạt một cách trung lập và tập trung vào vấn đề thay vì quy trách nhiệm cho cá nhân.',
      'Câu hỏi xác định lại có mục đích tìm kiếm thông tin thực tế và làm rõ những điểm chưa cụ thể. Ví dụ: "Thông số nhiệt độ đo được là bao nhiêu?", "Thiết bị được vận hành trong thời gian bao lâu?" hoặc "Lần kiểm tra gần nhất được thực hiện vào ngày nào?".',
      'Loại câu hỏi này đặc biệt hữu ích khi nhóm cần xác nhận dữ liệu và tránh đưa ra kết luận dựa trên những nhận định chung chung.',
      '---',
      '### Khi cuộc thảo luận đi chệch hướng',
      'Trong các buổi họp nhóm, đôi khi một ý kiến mới xuất hiện lại khiến mọi người chuyển sang thảo luận một vấn đề không liên quan trực tiếp đến mục tiêu ban đầu. Lúc đó, câu hỏi định hướng lại có thể giúp đưa cuộc trao đổi trở về trọng tâm.',
      'Chẳng hạn, người điều phối có thể hỏi: "Ý kiến này có ảnh hưởng như thế nào đến phương án thiết kế mà chúng ta đang đánh giá?". Câu hỏi vừa ghi nhận ý kiến vừa giúp nhóm xem xét lại mối liên hệ giữa vấn đề đang bàn và mục tiêu chung.',
      'Tuy nhiên, việc sử dụng câu hỏi định hướng lại cần khéo léo. Nếu thực hiện liên tục hoặc không giải thích rõ lý do, người tham gia có thể cảm thấy ý kiến của mình không được tôn trọng.',
      '---',
      '### Hỏi để hiểu, không phải chỉ để phản bác',
      'Một cuộc trao đổi hiệu quả không nhất thiết là cuộc trao đổi có nhiều người nói nhất. Đôi khi, một câu hỏi ngắn nhưng đúng trọng tâm có thể giúp cả nhóm tiết kiệm hàng giờ tranh luận.',
      'Khi đặt câu hỏi, người hỏi nên xác định mình đang cần thông tin gì, câu trả lời sẽ giúp làm rõ vấn đề nào và người được hỏi có đủ điều kiện cung cấp thông tin hay không.',
      'Trong môi trường kỹ thuật, câu hỏi càng rõ ràng thì quá trình phân tích càng có cơ sở. Biết cách đặt câu hỏi cũng đồng nghĩa với việc biết cách tìm kiếm những thông tin còn thiếu trước khi đưa ra quyết định.',
      'Một kỹ sư không cần phải có ngay mọi câu trả lời. Nhưng họ cần biết phải hỏi điều gì để có thể tiến gần hơn đến lời giải đúng.',
    ],
  },
  {
    id: 'ch8-email-correspondence',
    category: 'Chương 8',
    detailCategory: 'Chương 8: Giao tiếp trong kỹ thuật',
    title: 'Email và thư tín – Những chi tiết nhỏ tạo nên sự chuyên nghiệp',
    sapo: 'Một email chỉ mất vài phút để soạn thảo, nhưng cách viết thiếu rõ ràng có thể khiến công việc bị chậm trễ, thông tin bị hiểu sai và người nhận phải mất thêm thời gian xác minh.',
    imageLabel: 'Soạn thảo email kỹ thuật tại bàn làm việc',
    imageSrc: '/src/assets/images/ch8_email_laptop_1795862050256.jpg',
    imageAlt:
      'Góc nhìn qua vai người làm việc đang soạn email trên laptop tại bàn làm việc cùng sổ ghi chú và bút',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Trong một dự án kỹ thuật, kỹ sư thiết kế cần gửi bản vẽ cập nhật cho bộ phận sản xuất. Nếu email chỉ có nội dung "Gửi anh bản vẽ mới, kiểm tra giúp em", người nhận sẽ phải tự tìm hiểu bản vẽ nào được thay thế, điểm nào đã chỉnh sửa và cần phản hồi trước thời điểm nào.',
      'Ngược lại, một email có tiêu đề cụ thể, nội dung trình bày rõ ràng và tệp đính kèm được đặt tên hợp lý sẽ giúp người nhận nhanh chóng biết mình cần làm gì.',
      'Đó là sự khác biệt giữa việc chỉ gửi một thông điệp và việc giao tiếp bằng văn bản một cách chuyên nghiệp.',
      '---',
      '### Một lá thư tốt cần rõ ràng và chính xác',
      'Trong hoạt động công việc, thư tín thường được sử dụng để trao đổi thông tin, yêu cầu xử lý công việc, xác nhận lịch họp, giao hàng hoặc phản hồi về một vấn đề cụ thể.',
      'Một lá thư hiệu quả trước hết phải có nội dung rõ ràng. Người nhận cần hiểu người gửi đang đề cập đến vấn đề gì và mong muốn nhận được phản hồi hay hành động nào. Những thông tin quan trọng như ngày giờ, địa điểm, số lượng, đơn giá và thời hạn cần được kiểm tra cẩn thận trước khi gửi.',
      'Bên cạnh đó, nội dung thư phải đầy đủ và nhất quán. Người viết không nên đề cập đến những yêu cầu mâu thuẫn hoặc sử dụng những nhận định chưa được xác minh như thể đó là thông tin chắc chắn.',
      'Ngôn ngữ cũng cần lịch sự, nhã nhặn và phù hợp với mối quan hệ giữa người gửi và người nhận. Một thông điệp chuyên nghiệp không nhất thiết phải sử dụng những câu từ cầu kỳ. Ngược lại, cách viết tự nhiên và đơn giản thường giúp người đọc nắm bắt thông tin nhanh hơn.',
      {
        type: 'figure',
        src: '/src/assets/images/ch8_email_laptop_1795862050256.jpg',
        alt: 'Một người đang soạn thư điện tử tại bàn làm việc với laptop hiển thị giao diện email bên cạnh sổ ghi chú',
        caption:
          'Soạn thảo email công việc rõ ràng, kiểm tra đầy đủ thông tin và thời hạn trước khi gửi giúp quá trình phối hợp kỹ thuật thông suốt.',
        fit: 'cover',
      },
      '---',
      '### Tiêu đề email là cánh cửa đầu tiên của thông tin',
      'Trong môi trường làm việc, người quản lý hoặc đồng nghiệp có thể nhận nhiều email mỗi ngày. Một tiêu đề không rõ nội dung khiến người nhận khó phân loại và xác định mức độ ưu tiên của thư.',
      'Vì vậy, tiêu đề nên ngắn gọn nhưng đủ thông tin để người đọc nhận biết mục đích. Chẳng hạn, thay vì viết "Gửi tài liệu", có thể viết "Gửi bản vẽ cập nhật cụm truyền động – phiên bản 02". Nếu cần phản hồi trước một thời điểm nhất định, thông tin về thời hạn cũng có thể được thể hiện ngay trong tiêu đề khi thực sự cần thiết.',
      'Phần nội dung email nên đi thẳng vào vấn đề. Người viết có thể mở đầu bằng lời chào, nêu mục đích liên hệ, trình bày thông tin cần thiết và kết thúc bằng yêu cầu hoặc thời hạn phản hồi.',
      'Ví dụ, một email gửi bản vẽ cập nhật có thể được trình bày theo hướng:',
      '> "Chào anh,\nEm gửi anh bản vẽ cập nhật cụm truyền động của đồ án. Phiên bản này đã điều chỉnh kích thước vị trí lắp ổ đỡ theo nội dung trao đổi trong cuộc họp ngày hôm qua.\nNhờ anh kiểm tra giúp phần kích thước lắp ghép và phản hồi trước ngày ... để nhóm có thể tiếp tục hoàn thiện bản vẽ chế tạo.\nEm cảm ơn anh."',
      'Một cách viết như vậy giúp người nhận nhanh chóng biết tài liệu được gửi là gì, có thay đổi nào và cần thực hiện hành động gì.',
      '---',
      '### Đừng để những chi tiết nhỏ làm giảm tính chuyên nghiệp',
      'Lỗi chính tả, cách xuống dòng thiếu hợp lý và việc sử dụng quá nhiều kiểu chữ có thể khiến email trở nên khó đọc. Việc viết toàn bộ nội dung bằng chữ in hoa cũng không nên được sử dụng vì gây cảm giác nặng nề và có thể bị hiểu là thiếu lịch sự.',
      'Các đoạn văn nên được chia thành những phần ngắn, mỗi phần tập trung vào một nội dung. Những thông tin thật sự quan trọng có thể được in đậm nhưng cần sử dụng thống nhất, tránh lạm dụng màu sắc hoặc kiểu chữ.',
      'Tệp đính kèm cũng cần được kiểm tra trước khi gửi. Tên file nên thể hiện được nội dung và phiên bản tài liệu, ví dụ: "Ban_ve_cum_truyen_dong_V02.pdf" thay vì những tên chung chung như "File_moi.pdf" hoặc "Ban_sua_lan_cuoi_final_final.pdf".',
      'Ngoài ra, người gửi cần kiểm tra xem mình đã đính kèm đúng tài liệu chưa, người nhận có phải đối tượng cần nhận thông tin hay không và những người được thêm vào mục CC có thực sự liên quan đến công việc hay không.',
      'Đối với email công vụ, phản hồi kịp thời cũng thể hiện sự tôn trọng. Tài liệu học tập khuyến nghị cố gắng trả lời email công việc trong vòng 24 giờ. Đây nên được hiểu là nguyên tắc về tính chủ động và lịch sự, có điều chỉnh theo mức độ khẩn cấp cũng như yêu cầu của từng tổ chức.',
      {
        type: 'statSpotlight',
        headline: '24 giờ',
        label: 'Nguyên tắc phản hồi email công việc kịp thời',
        summary:
          'Thể hiện sự chủ động và tôn trọng người gửi, đồng thời giữ nhịp phối hợp bản vẽ, tiến độ và xử lý sự cố kỹ thuật.',
        theme: 'ink',
        items: [
          { value: 'Tiêu đề rõ', caption: 'Ghi cụ thể nội dung & phiên bản (VD: phiên bản 02)' },
          { value: 'Tên tệp chuẩn', caption: 'Ban_ve_cum_truyen_dong_V02.pdf' },
          { value: 'Chữ ký đủ', caption: 'Họ tên, chức danh, đơn vị và thông tin liên hệ' },
        ],
      },
      {
        type: 'comparison',
        title: 'Soạn thảo email kỹ thuật chuyên nghiệp',
        goodTitle: 'Email chuẩn mực',
        badTitle: 'Email thiếu chuyên nghiệp',
        pairs: [
          {
            topic: 'Tiêu đề thư',
            good: 'Gửi bản vẽ cập nhật cụm truyền động – phiên bản 02.',
            bad: 'Gửi tài liệu / Kiểm tra giúp em.',
          },
          {
            topic: 'Nội dung & Định dạng',
            good: 'Đi thẳng vào vấn đề, chia đoạn ngắn rõ mục đích và hạn phản hồi.',
            bad: 'Viết toàn bộ chữ IN HOA hoặc dùng nhiều màu sắc, phông chữ rối mắt.',
          },
          {
            topic: 'Đặt tên tệp đính kèm',
            good: 'Ban_ve_cum_truyen_dong_V02.pdf thể hiện đúng tài liệu và phiên bản.',
            bad: 'File_moi.pdf hoặc Ban_sua_lan_cuoi_final_final.pdf.',
          },
        ],
      },
      'Cuối email, chữ ký cá nhân có thể bao gồm họ tên, chức danh, đơn vị và thông tin liên hệ để người nhận dễ dàng xác định người gửi.',
      '---',
      '### Viết email cũng là một kỹ năng nghề nghiệp',
      'Một email chuyên nghiệp không cần quá dài, nhưng phải đủ thông tin. Người gửi cần biết điều gì nên viết, điều gì cần kiểm tra và điều gì cần được người nhận thực hiện sau khi đọc thư.',
      'Trong công việc kỹ thuật, email có thể là căn cứ trao đổi về bản vẽ, tiến độ, yêu cầu thay đổi hoặc kết quả xử lý sự cố. Vì vậy, sự rõ ràng và chính xác trong từng thông điệp không chỉ giúp tiết kiệm thời gian mà còn góp phần duy trì sự phối hợp giữa các bộ phận.',
      'Một kỹ sư có thể rất giỏi thiết kế hoặc tính toán, nhưng khả năng trình bày một email rõ ràng cũng là một phần của năng lực làm việc chuyên nghiệp. Đôi khi, ấn tượng về một người không bắt đầu từ cuộc gặp trực tiếp, mà bắt đầu từ chính bức thư đầu tiên họ gửi đi.',
    ],
  },
  {
    id: 'ch9-engineering-ethics-intro',
    category: 'Chương 9',
    detailCategory: 'Chương 9: Đạo đức nghề nghiệp',
    layoutVariant: 'magazine-dropcap',
    editorialBadge: 'Nền Tảng Đạo Đức',
    title: 'Khi một bản vẽ đi vào đời sống: Đạo đức của kỹ sư bắt đầu từ đâu?',
    sapo: 'Một bản thiết kế có thể bắt đầu trên màn hình máy tính, một phép tính có thể chỉ xuất hiện trong vài dòng ghi chú, nhưng sản phẩm cuối cùng của kỹ sư lại đi vào đời sống của rất nhiều người.',
    imageLabel: 'Kỹ sư kiểm tra bản vẽ kết cấu tại công trường',
    imageSrc: '/assets/aistudio/image_93c630b7.png',
    imageAlt:
      'Kỹ sư đội mũ bảo hộ và mặc áo phản quang đang đối chiếu bản vẽ thiết kế với khung cốt thép thực tế tại công trường xây dựng',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một sản phẩm hoàn chỉnh có thể là một chi tiết máy trong nhà xưởng, một cây cầu, một hệ thống xử lý nước thải hay một thiết bị được sử dụng hằng ngày. Khi sản phẩm được đưa vào vận hành, những quyết định kỹ thuật không còn nằm riêng trong phạm vi của người thiết kế. Chúng có thể ảnh hưởng đến sự an toàn, sức khỏe, tài sản và môi trường sống của cộng đồng.',
      'Đó là lý do nghề kỹ sư không chỉ đòi hỏi kiến thức chuyên môn.',
      'Theo nội dung môn học Nhập môn về kỹ thuật, kỹ sư là người được đào tạo trong lĩnh vực kỹ thuật, có kiến thức chuyên môn, kỹ năng thực hành và kinh nghiệm nghề nghiệp. Công việc của họ là cung cấp các dịch vụ khoa học, kỹ thuật và công nghệ cho khách hàng cũng như thị trường. Tuy nhiên, năng lực chuyên môn chỉ là một phần của nghề nghiệp. Một kỹ sư còn cần tinh thần trách nhiệm, sự trung thực, văn hóa ứng xử, bản lĩnh chuyên môn và lương tâm nghề nghiệp.',
      'Có thể hình dung sự khác biệt qua một tình huống đơn giản: hai kỹ sư cùng phát hiện một sai số trong kết quả thử nghiệm. Người thứ nhất chủ động kiểm tra lại, báo cáo trung thực và đề xuất khắc phục. Người thứ hai nhận thấy sai số nhưng bỏ qua vì cho rằng nó không đủ lớn để ảnh hưởng đến tiến độ bàn giao. Cả hai có thể cùng được đào tạo về kỹ thuật, nhưng cách họ lựa chọn hành động đã cho thấy sự khác biệt về đạo đức nghề nghiệp.',
      {
        type: 'pullQuote',
        quote:
          'Với người kỹ sư, đạo đức nghề nghiệp không phải phẩm chất trang trí cho hồ sơ cá nhân, mà là nền tảng để thực hiện công việc một cách có trách nhiệm.',
        attribution: 'Chương 9 — Đạo đức nghề nghiệp kỹ sư',
        tone: 'ink',
        pairedParagraph:
          'Đạo đức, theo định nghĩa được trình bày trong tài liệu học tập, là những tiêu chuẩn và nguyên tắc được xã hội thừa nhận, dùng để điều chỉnh hành vi cũng như mối quan hệ giữa con người với nhau và với xã hội. Khi những nguyên tắc đó được áp dụng trong một lĩnh vực nghề nghiệp cụ thể, chúng trở thành đạo đức nghề nghiệp. Với người kỹ sư, đạo đức nghề nghiệp không phải một phẩm chất trang trí cho hồ sơ cá nhân, mà là nền tảng để họ thực hiện công việc một cách có trách nhiệm.',
      },
      '---',
      '### Một sản phẩm tốt chưa chắc đã được tạo ra từ một quyết định đúng',
      'Trong kỹ thuật, đôi khi một lựa chọn có thể mang lại hiệu quả kinh tế trước mắt nhưng đặt ra câu hỏi về lợi ích lâu dài. Một phương án sản xuất tiết kiệm chi phí có thể làm tăng rủi ro cho người vận hành. Một báo cáo được trình bày thuận lợi có thể giúp dự án tiếp tục, nhưng nếu thông tin quan trọng bị lược bỏ thì người sử dụng sản phẩm sẽ không có đủ cơ sở để đánh giá rủi ro.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_93c630b7.png',
        alt: 'Kỹ sư đối chiếu bản vẽ kỹ thuật với kết cấu cốt thép ngoài hiện trường',
        caption:
          'Từ bản vẽ đến hiện trường: mỗi quyết định kỹ thuật đều gắn liền với sự an toàn và chất lượng công trình phục vụ cộng đồng.',
        fit: 'cover',
      },
      'Mối liên hệ giữa đạo đức và kỹ thuật xuất phát từ chính tác động của sản phẩm và quy trình kỹ thuật đối với xã hội. Người kỹ sư không chỉ thiết kế và chế tạo một sản phẩm để đáp ứng yêu cầu của khách hàng; họ còn cần xem xét sản phẩm đó đem lại lợi ích gì, có thể gây ra tác động nào và những ai sẽ chịu ảnh hưởng khi sản phẩm được đưa vào sử dụng.',
      'Vì thế, trách nhiệm xã hội và trách nhiệm nghề nghiệp luôn gắn liền với nhau. Trách nhiệm xã hội đặt ra yêu cầu người kỹ sư phải quan tâm đến nhu cầu và lợi ích của cộng đồng. Trách nhiệm nghề nghiệp biến yêu cầu đó thành những hành động cụ thể trong công việc: tính toán cẩn thận, thử nghiệm trung thực, không ký xác nhận khi chưa đủ cơ sở chuyên môn, cảnh báo khi phát hiện nguy cơ và không che giấu thông tin có thể ảnh hưởng đến người sử dụng.',
      'Điều này cũng giúp phân biệt đạo đức với việc chỉ làm đúng quy định pháp luật. Pháp luật đưa ra những giới hạn và nghĩa vụ có tính bắt buộc. Đạo đức còn đặt ra những câu hỏi về sự công bằng, trung thực và trách nhiệm mà một người cần tự cân nhắc ngay cả khi chưa có quy định pháp luật nào mô tả đầy đủ tình huống ấy. Một hành động hợp pháp không đương nhiên giải đáp được mọi câu hỏi về đạo đức. Người kỹ sư vì vậy không thể chỉ hỏi “Việc này có bị cấm không?”, mà còn cần tự hỏi “Việc này có công bằng không?”, “Ai có thể bị ảnh hưởng?” và “Tôi có sẵn sàng chịu trách nhiệm về quyết định này không?”.',
      '---',
      '### Đạo đức nghề nghiệp được hình thành từ những việc rất nhỏ',
      'Đạo đức của người kỹ sư không đợi đến khi họ đảm nhận một dự án lớn mới bắt đầu. Nó đã thể hiện từ những năm tháng học tập. Việc trung thực với số liệu tính toán, không sao chép tài liệu, tôn trọng bản quyền, không gian lận trong thi cử và không nhờ người khác làm thay công việc của mình đều là những biểu hiện cụ thể của thái độ nghề nghiệp.',
      'Một sinh viên quen với việc sửa số liệu để kết quả “đẹp hơn” có thể dễ dàng xem nhẹ tính trung thực khi bước vào môi trường làm việc. Ngược lại, người có thói quen kiểm tra lại phép tính, thừa nhận sai sót và tôn trọng đóng góp của người khác sẽ có nền tảng tốt hơn để đối diện với những lựa chọn khó khăn trong nghề nghiệp.',
      'Kỹ thuật có thể tạo ra những sản phẩm phức tạp, nhưng trách nhiệm của người làm kỹ thuật đôi khi bắt đầu từ một lựa chọn rất giản dị: nói đúng sự thật, làm đúng phần việc mình có đủ năng lực và không đẩy rủi ro sang người khác.',
      'Một kỹ sư giỏi không chỉ được đánh giá qua việc họ làm ra sản phẩm gì, mà còn qua cách họ tạo ra sản phẩm ấy và trách nhiệm họ sẵn sàng nhận về những tác động của nó.',
    ],
  },
  {
    id: 'ch9-six-ethical-principles',
    category: 'Chương 9',
    detailCategory: 'Chương 9: Đạo đức nghề nghiệp',
    title: 'Một chữ ký có thể bảo đảm điều gì? Sáu nguyên tắc không thể xem nhẹ của người kỹ sư',
    sapo: 'Trên một bản vẽ kỹ thuật, chữ ký của người phụ trách có thể chỉ chiếm một góc nhỏ. Nhưng phía sau chữ ký đó là trách nhiệm đối với thiết kế, quá trình thi công, chất lượng sản phẩm và sự an toàn của rất nhiều người.',
    imageLabel: 'Hai kỹ sư rà soát bản vẽ và mô hình CAD trước khi xác nhận',
    imageSrc: '/assets/aistudio/image_3e00be71.png',
    imageAlt:
      'Hai kỹ sư kiểm tra đối chiếu bản vẽ giấy với mô hình thiết kế 3D trên màn hình máy tính trước khi ký xác nhận',
    readTime: '6 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một kỹ sư ký tên vào bản vẽ không chỉ xác nhận rằng mình đã hoàn thành một thủ tục. Họ đang thể hiện rằng mình có đủ cơ sở chuyên môn để chịu trách nhiệm về nội dung được xác nhận.',
      'Đạo đức nghề nghiệp vì thế không phải một bộ quy tắc xa rời công việc hằng ngày. Nó đi theo người kỹ sư từ lúc nhận nhiệm vụ, thực hiện tính toán, trao đổi với khách hàng cho đến khi sản phẩm được đưa vào sử dụng.',
      'Theo tài liệu môn học, mục tiêu của các chuẩn mực đạo đức nghề nghiệp là bảo vệ cuộc sống, sức khỏe, tài sản của cộng đồng và luôn hướng tới lợi ích xã hội. Từ mục tiêu này, sáu chuẩn mực cơ bản được đặt ra cho người kỹ sư.',
      'Điểm quan trọng nhất là an toàn, sức khỏe và lợi ích của cộng đồng. Khi đứng trước lựa chọn giữa một giải pháp thuận tiện, tiết kiệm chi phí và một giải pháp bảo đảm an toàn hơn, người kỹ sư cần đánh giá đầy đủ rủi ro thay vì chỉ nhìn vào chi phí trước mắt. Một quy trình sản xuất nhanh hơn không thể được xem là hiệu quả nếu nó khiến người vận hành phải làm việc trong điều kiện nguy hiểm. Một thiết kế có giá thành thấp hơn cũng không thể được coi là tốt nếu những rủi ro quan trọng đối với người sử dụng chưa được xem xét.',
      'Đi cùng với an toàn là nguyên tắc chỉ thực hiện công việc trong phạm vi năng lực chuyên môn. Không phải kỹ sư nào cũng có thể nhận mọi nhiệm vụ kỹ thuật. Việc được đào tạo trong một ngành không đồng nghĩa với việc đã đủ kiến thức và kinh nghiệm để xử lý tất cả vấn đề liên quan đến ngành đó. Một người chưa nắm vững thiết kế không nên ký xác nhận chỉ vì được cấp trên yêu cầu. Trong trường hợp cần thiết, kỹ sư phải tìm sự hỗ trợ của người có chuyên môn phù hợp.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_3e00be71.png',
        alt: 'Hai kỹ sư cùng rà soát bản vẽ kỹ thuật và mô hình CAD 3D trên màn hình trước khi xác nhận hồ sơ thiết kế',
        caption:
          'Rà soát cẩn trọng bản vẽ và thông số thiết kế trong phạm vi năng lực chuyên môn trước khi ký xác nhận.',
        fit: 'cover',
      },
      '---',
      '### Trung thực là điều kiện để người khác có thể tin vào kết quả kỹ thuật',
      'Một báo cáo thử nghiệm chỉ có giá trị khi dữ liệu trong đó phản ánh đúng những gì đã được đo đạc. Một nhận định chuyên môn chỉ đáng tin khi nó dựa trên sự kiện và đánh giá có cơ sở. Vì vậy, chuẩn mực thứ ba yêu cầu kỹ sư phải tuyên bố công khai một cách khách quan và trung thực khi thực hiện nhiệm vụ chuyên môn.',
      'Sự trung thực không chỉ nằm ở việc không cố ý làm sai số liệu. Nó còn thể hiện ở việc không lựa chọn những kết quả có lợi để trình bày rồi bỏ qua những dữ kiện bất lợi, không đưa ra ý kiến vượt quá hiểu biết của mình và không tạo cho người khác cảm giác rằng một vấn đề đã được kiểm chứng đầy đủ khi thực tế chưa phải như vậy.',
      'Chuẩn mực thứ tư yêu cầu kỹ sư phục vụ người sử dụng lao động và khách hàng bằng năng lực, sự tận tâm, công bằng và minh bạch. Điều này không có nghĩa là người kỹ sư phải luôn đồng ý với mọi yêu cầu của khách hàng hay cấp trên. Ngược lại, sự tận tâm đôi khi đòi hỏi họ phải giải thích vì sao một yêu cầu không phù hợp, chỉ ra giới hạn của thiết kế hoặc đề xuất phương án khác an toàn và đáng tin cậy hơn.',
      'Hai chuẩn mực còn lại liên quan đến việc tôn trọng pháp luật, bảo vệ môi trường và tự kiểm soát đạo đức nghề nghiệp. Người kỹ sư cần tránh hành vi lừa đảo, không xem nhẹ những tác động môi trường do hoạt động kỹ thuật gây ra và thường xuyên tự đánh giá trách nhiệm của bản thân. Uy tín nghề nghiệp không chỉ được hình thành trong một dự án thành công; nó được tích lũy qua nhiều quyết định nhất quán, ngay cả khi những quyết định ấy không đem lại lợi ích tức thì cho cá nhân.',
      'Các nguyên tắc này cũng tương đồng với những nội dung cơ bản trong Quy tắc đạo đức của Hiệp hội Kỹ sư chuyên nghiệp quốc gia Hoa Kỳ (NSPE), trong đó nhấn mạnh việc đặt an toàn, sức khỏe và phúc lợi cộng đồng lên hàng đầu; chỉ thực hiện dịch vụ trong lĩnh vực có năng lực; phát biểu khách quan, trung thực và tránh hành vi gian dối.',
      {
        type: 'statSpotlight',
        headline: '6 Chuẩn mực đạo đức',
        label: 'Cam kết chuyên môn phía sau mỗi chữ ký kỹ sư',
        summary:
          'Mọi quyết định kỹ thuật đều nhằm bảo vệ cuộc sống, sức khỏe, tài sản của cộng đồng và hướng tới lợi ích xã hội.',
        theme: 'yellow',
        items: [
          { value: '1. An toàn cộng đồng', caption: 'Đặt an toàn, sức khỏe và phúc lợi xã hội lên hàng đầu' },
          { value: '2. Đúng phạm vi năng lực', caption: 'Chỉ thực hiện và ký xác nhận việc đủ chuyên môn' },
          { value: '3. Khách quan & Trung thực', caption: 'Không chọn lọc dữ liệu hay nói quá giới hạn kiểm chứng' },
          { value: '4. Tận tâm & Minh bạch', caption: 'Phục vụ khách hàng công bằng, dám chỉ ra rủi ro thiết kế' },
          { value: '5. Pháp luật & Môi trường', caption: 'Tránh gian dối, kiểm soát tác động môi trường' },
          { value: '6. Tự kiểm soát', caption: 'Thường xuyên tự đánh giá trách nhiệm và giữ uy tín nghề' },
        ],
      },
      '---',
      '### Không phải cứ ký tên là đã hoàn thành trách nhiệm',
      'Hãy thử đặt người kỹ sư trước một bản thiết kế mà họ chưa trực tiếp kiểm tra. Cấp trên đang cần hồ sơ gấp, khách hàng chờ bàn giao và tiến độ dự án đã bị chậm. Nếu ký xác nhận, công việc có thể tiếp tục đúng kế hoạch. Nếu từ chối, họ có thể phải giải thích với cấp trên và đối diện với áp lực tiến độ.',
      'Trong hoàn cảnh đó, chữ ký không nên được xem là một thủ tục hành chính có thể thực hiện cho xong. Nó là một cam kết chuyên môn. Người kỹ sư cần biết mình đang xác nhận điều gì, có đủ căn cứ để xác nhận hay không và ai sẽ chịu ảnh hưởng nếu nội dung đó không chính xác.',
      'Đôi khi, hành động có trách nhiệm nhất không phải là ký nhanh để giữ tiến độ, mà là yêu cầu kiểm tra lại, bổ sung dữ liệu hoặc tìm người có đủ chuyên môn để đánh giá. Một quyết định như vậy có thể gây bất tiện trong ngắn hạn, nhưng nó bảo vệ giá trị của công việc kỹ thuật và niềm tin mà xã hội dành cho người kỹ sư.',
      'Đạo đức nghề nghiệp không làm cho công việc kỹ thuật chậm lại một cách vô ích. Nó giúp bảo đảm rằng tốc độ, lợi nhuận và thành tích không lấn át mục tiêu quan trọng nhất: tạo ra những sản phẩm và quy trình có ích, đáng tin cậy và an toàn cho con người.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_d7e4c6f8.png',
        alt: 'Kỹ thuật viên đứng cạnh máy ép thủy lực công nghiệp có khung lưới bảo vệ an toàn màu vàng che chắn vùng làm việc',
        caption:
          'Lồng lưới bảo vệ an toàn trên máy ép thủy lực minh họa nguyên tắc đặt an toàn người vận hành lên hàng đầu trong thiết kế và chế tạo.',
        fit: 'contain',
      },
    ],
  },
  {
    id: 'ch9-employer-client-public',
    category: 'Chương 9',
    detailCategory: 'Chương 9: Đạo đức nghề nghiệp',
    title: 'Khi người kỹ sư đứng giữa sếp, khách hàng và cộng đồng',
    sapo: 'Trong một cuộc họp kiểm tra chất lượng, nếu phát hiện lỗi xuất phát từ chính công ty mình, người kỹ sư phải trung thành với cấp trên, bảo vệ lợi ích doanh nghiệp hay nói ra sự thật để khách hàng hiểu đúng vấn đề?',
    imageLabel: 'Kiểm tra thiết bị và an toàn vận hành trong xưởng sản xuất',
    imageSrc: '/assets/aistudio/image_b6d11c11.png',
    imageAlt:
      'Kỹ thuật viên mang thiết bị bảo hộ gồm chụp tai chống ồn, kính bảo vệ và găng tay đang kiểm tra chi tiết trên máy ép có lồng chắn an toàn màu vàng',
    readTime: '7 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một cuộc họp giữa nhà cung cấp và khách hàng đang diễn ra bình thường cho đến khi người kỹ sư nhận ra chi tiết máy bị hư hỏng có thể xuất phát từ lỗi của chính công ty mình. Người quản lý đại diện nhà máy vẫn khẳng định sản phẩm không có vấn đề. Kỹ sư phụ trách kỹ thuật bắt đầu nghi ngờ kết quả kiểm tra trước đó chưa chính xác, nhưng nếu lên tiếng, công ty có thể phải thừa nhận sai sót trước khách hàng. Nếu im lặng, cuộc họp có thể kết thúc nhẹ nhàng hơn.',
      'Đây là tình huống được nêu trong tài liệu học tập về đạo đức nghề nghiệp kỹ sư. Nó đặt ra một câu hỏi không dễ trả lời: người kỹ sư phải trung thành với cấp trên, bảo vệ lợi ích doanh nghiệp hay nói ra sự thật để khách hàng có thể hiểu đúng vấn đề?',
      'Thực tế, trách nhiệm của kỹ sư không chỉ hướng đến một phía. Họ có bổn phận với xã hội, với người sử dụng lao động và khách hàng, đồng thời phải tôn trọng những người cùng làm nghề.',
      '---',
      '### Trách nhiệm với xã hội không thể bị thu hẹp thành lợi ích của một doanh nghiệp',
      'Khi thực hiện nhiệm vụ chuyên môn, người kỹ sư có trách nhiệm cao nhất đối với lợi ích xã hội. Điều này thể hiện rõ nhất trong những quyết định liên quan đến an toàn, sức khỏe, tài sản và phúc lợi cộng đồng. Kỹ sư chỉ nên chứng nhận những thiết kế có cơ sở bảo đảm các yêu cầu cần thiết và tuân thủ tiêu chuẩn kỹ thuật. Nếu nhận thấy phán xét chuyên môn hoặc một hoạt động kỹ thuật có thể dẫn đến nguy hại cho cộng đồng, họ cần cảnh báo người sử dụng lao động, đồng nghiệp và những bên có liên quan.',
      'Trung thực trong báo cáo cũng là một phần của trách nhiệm ấy. Người kỹ sư không nên đưa ra kết luận chuyên môn nếu không dựa trên dữ kiện và đánh giá đáng tin cậy. Khi cung cấp thông tin về sản phẩm, họ cần trình bày đầy đủ những nội dung liên quan, thay vì chỉ chọn phần thuận lợi cho đơn vị mình đại diện.',
      'Điều đó không có nghĩa là mọi thông tin nội bộ đều có thể được công bố tùy ý. Kỹ sư vẫn có nghĩa vụ bảo mật thông tin nghề nghiệp của người sử dụng lao động và khách hàng, trừ trường hợp pháp luật yêu cầu hoặc cho phép tiết lộ. Nhưng bảo mật không thể trở thành lý do để che giấu một vấn đề có thể gây nguy hại cho cộng đồng. Người kỹ sư phải cân nhắc đúng phạm vi nghĩa vụ và sử dụng những kênh báo cáo phù hợp.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_c09ac9a7.png',
        alt: 'Nhân sự kỹ thuật thao tác kiểm tra cụm cơ cấu truyền động và gá lắp tại dây chuyền gia công trong nhà máy',
        caption:
          'Kiểm soát chất lượng tại dây chuyền gia công giúp phát hiện sớm sai lệch kỹ thuật thay vì che giấu khi sản phẩm đã xuất xưởng.',
        fit: 'cover',
      },
      '---',
      '### Trung thành với khách hàng không đồng nghĩa với việc bỏ qua xung đột lợi ích',
      'Trong quan hệ với người sử dụng lao động và khách hàng, kỹ sư cần nhận những nhiệm vụ thuộc lĩnh vực được đào tạo hoặc có đủ kiến thức, kinh nghiệm thực tế. Họ chỉ nên xác nhận, ký tên vào bản vẽ và thiết kế khi đã nắm vững nội dung hoặc trực tiếp điều hành, giám sát công việc theo yêu cầu chuyên môn.',
      'Một trách nhiệm khác thường dễ bị xem nhẹ là xung đột lợi ích. Người kỹ sư không nên nhận quà biếu, tiền hoa hồng hay những đặc quyền từ nhà thầu và tổ chức khác khi việc đó có thể ảnh hưởng đến phán xét chuyên môn. Nếu có tình huống có khả năng làm ảnh hưởng đến tính khách quan, họ cần thông báo cho người sử dụng lao động hoặc khách hàng. Việc nhận thù lao từ nhiều phía trong cùng một dự án cũng cần được công bố và có sự chấp thuận của các bên liên quan.',
      'Những nguyên tắc này không chỉ nhằm ngăn chặn hành vi trục lợi. Chúng còn bảo vệ chất lượng của quyết định kỹ thuật. Khi người tư vấn đồng thời có lợi ích tài chính từ một phương án mà mình đang đánh giá, khách hàng có quyền biết điều đó để cân nhắc mức độ khách quan của lời khuyên.',
      '---',
      '### Trở lại câu chuyện nhà máy A',
      'Trong tình huống được nêu ở đầu bài, người kỹ sư đã nghi ngờ chi tiết máy hư hỏng do lỗi nội bộ và kết quả thử nghiệm trước đó có thể chưa chính xác. Sau cuộc họp, người quản lý đề nghị không thừa nhận bản chất sự việc, chỉ thay thế thiết bị như một cử chỉ thiện chí để giữ hình ảnh doanh nghiệp.',
      'Xét từ các chuẩn mực được trình bày trong tài liệu, cách xử lý này chưa giải quyết đầy đủ vấn đề. Việc thay thế sản phẩm có thể khắc phục thiệt hại trước mắt, nhưng khách hàng vẫn không được biết nguyên nhân thực sự của lỗi. Nếu nguyên nhân đó còn tồn tại ở những sản phẩm khác, nguy cơ có thể tiếp tục lặp lại. Hơn nữa, khách hàng không có đủ thông tin để đánh giá chất lượng và mức độ tin cậy của nhà cung cấp.',
      'Một cách xử lý có trách nhiệm hơn là người kỹ sư cần báo cáo đầy đủ các dữ kiện cho cấp quản lý, đưa ra đánh giá chuyên môn có căn cứ và đề nghị doanh nghiệp thông tin trung thực cho khách hàng về sai sót cũng như biện pháp khắc phục. Đây là phần phân tích rút ra từ các chuẩn mực về trung thực, minh bạch và trách nhiệm xã hội trong slide; tài liệu đặt tình huống để thảo luận chứ không đưa ra một đáp án duy nhất cho câu chuyện nhà máy A.',
      'Bên cạnh trách nhiệm với xã hội và khách hàng, người kỹ sư còn có bổn phận với đồng nghiệp. Họ không được giới thiệu sai về bằng cấp, chức danh, năng lực hay mức độ đóng góp của người khác. Khi phê bình công việc chuyên môn, họ cần khách quan, cẩn trọng và trung thực, không làm tổn hại uy tín đồng nghiệp bằng những nhận xét mơ hồ hoặc thiếu căn cứ.',
      'Cuối cùng, một người kỹ sư không thể đo lường đạo đức nghề nghiệp chỉ bằng việc họ bảo vệ được lợi ích của công ty trong một cuộc họp. Uy tín bền vững cần được xây dựng bằng chất lượng sản phẩm, sự minh bạch trong hợp tác và khả năng đứng ra nhận trách nhiệm khi có sai sót. Đôi khi, nói thật về một lỗi kỹ thuật là quyết định khó khăn, nhưng cũng chính là cách giữ gìn niềm tin lâu dài giữa doanh nghiệp và khách hàng.',
      {
        type: 'comparison',
        title: 'Đứng giữa cấp trên, khách hàng và cộng đồng',
        goodTitle: 'Ứng xử chuẩn mực nghề nghiệp',
        badTitle: 'Rủi ro vi phạm đạo đức',
        pairs: [
          {
            topic: 'Khi phát hiện lỗi nội bộ',
            good: 'Báo cáo đầy đủ dữ kiện chuyên môn, đề nghị thông tin trung thực và nêu biện pháp khắc phục.',
            bad: 'Im lặng hoặc chỉ đổi sản phẩm cho êm chuyện, che giấu nguyên nhân gốc với khách hàng.',
          },
          {
            topic: 'Xung đột lợi ích',
            good: 'Từ chối quà biếu, hoa hồng ảnh hưởng phán xét và công khai khi có lợi ích liên quan.',
            bad: 'Nhận thù lao từ nhiều bên hoặc giấu quyền lợi tài chính khi tư vấn phương án.',
          },
          {
            topic: 'Ký xác nhận thiết kế',
            good: 'Chỉ ký khi trực tiếp giám sát, nắm vững thiết kế và đáp ứng tiêu chuẩn an toàn.',
            bad: 'Ký hợp thức hóa hồ sơ ngoài phạm vi năng lực để kịp tiến độ bàn giao.',
          },
        ],
      },
      {
        type: 'figure',
        src: '/assets/aistudio/image_b6d11c11.png',
        alt: 'Kỹ thuật viên trang bị đầy đủ bảo hộ lao động đang kiểm tra chi tiết gia công trên máy ép công nghiệp',
        caption:
          'Sự cẩn trọng trong kiểm định chất lượng và tuân thủ chuẩn mực an toàn là nền tảng bảo vệ uy tín lâu dài với khách hàng.',
        fit: 'cover',
      },
    ],
  },
  {
    id: 'ch9-challenger-disaster',
    category: 'Chương 9',
    detailCategory: 'Chương 9: Đạo đức nghề nghiệp',
    layoutVariant: 'magazine-dossier',
    editorialBadge: 'Hồ Sơ Sự Cố STS-51-L',
    dossierSummary: {
      label: 'Bài học quyết định kỹ thuật',
      text: 'Ngày 28/1/1986, cảnh báo của kỹ sư về vòng làm kín O-ring ở nhiệt độ thấp 36°F không đến được người ra quyết định phóng cuối cùng.',
    },
    title: '73 giây của Challenger: Khi cảnh báo kỹ thuật không đến được người ra quyết định',
    sapo: 'Ngày 28/1/1986, tàu con thoi Challenger rời bệ phóng tại Trung tâm Vũ trụ Kennedy và bị phá hủy chỉ sau 73 giây. Vì sao những quan ngại về an toàn đã xuất hiện trước thời điểm phóng nhưng con tàu vẫn được cho phép cất cánh?',
    imageLabel: 'Tàu con thoi Challenger phóng ngày 28/1/1986',
    imageSrc: '/assets/aistudio/image_bba09cf8.png',
    imageAlt:
      'Tàu con thoi Challenger (nhiệm vụ STS-51-L) rời bệ phóng tại Trung tâm Vũ trụ Kennedy ngày 28/1/1986 giữa những cột khói lửa',
    readTime: '7 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Ngày 28/1/1986, tàu con thoi Challenger rời bệ phóng tại Trung tâm Vũ trụ Kennedy, mang theo phi hành đoàn gồm bảy người. Chuyến bay STS-51-L được kỳ vọng là một nhiệm vụ quan trọng của chương trình tàu con thoi Hoa Kỳ. Nhưng chỉ 73 giây sau khi phóng, thảm họa xảy ra. Challenger bị phá hủy và toàn bộ bảy thành viên phi hành đoàn thiệt mạng.',
      'Sau tai nạn, cuộc điều tra không chỉ tập trung vào việc tìm ra bộ phận kỹ thuật bị hỏng. Một câu hỏi lớn hơn được đặt ra: vì sao những quan ngại về an toàn đã xuất hiện trước thời điểm phóng nhưng con tàu vẫn được cho phép cất cánh?',
      {
        type: 'statSpotlight',
        headline: '73 giây · 36°F · 7 phi hành gia',
        label: 'Dữ kiện điều tra thảm họa tàu con thoi Challenger (28/1/1986)',
        summary:
          'Nhiệt độ bệ phóng 36°F — thấp hơn 15°F so với mọi chuyến bay trước đó — làm vòng làm kín O-ring tên lửa đẩy mất khả năng đàn hồi.',
        theme: 'ink',
        items: [
          { value: '73 giây', caption: 'Thời điểm tàu Challenger bị phá hủy sau khi rời bệ phóng' },
          { value: '36°F (-15°F)', caption: 'Nhiệt độ không khí thấp kỷ lục làm rò khí nóng ở khớp nối SRB' },
          { value: 'Đứt gãy thông tin', caption: 'Cảnh báo của kỹ sư bị chặn trước cấp ra quyết định' },
        ],
      },
      {
        type: 'figure',
        src: '/assets/aistudio/image_bba09cf8.png',
        alt: 'Ảnh tư liệu chính thức của NASA chụp tàu con thoi Challenger rời bệ phóng ngày 28/1/1986',
        caption: 'Nhiệm vụ STS-51-L của tàu con thoi Challenger, ngày 28/1/1986 (NASA).',
        fit: 'cover',
      },
      '---',
      '### Một lỗi kỹ thuật và một chuỗi quyết định',
      'Theo báo cáo của Ủy ban Điều tra Tổng thống về tai nạn Challenger, nguyên nhân kỹ thuật trực tiếp liên quan đến sự hư hỏng của các vòng làm kín tại mối nối của tên lửa đẩy nhiên liệu rắn bên phải. Các vòng làm kín này có nhiệm vụ ngăn khí nóng thoát ra ngoài trong quá trình động cơ hoạt động. Khi hệ thống làm kín không còn bảo đảm, khí nóng rò rỉ và dẫn đến chuỗi hư hỏng nghiêm trọng.',
      'Nhiệt độ là yếu tố đặc biệt đáng chú ý trong vụ việc. Báo cáo NASA ghi nhận nhiệt độ không khí tại thời điểm phóng là 36 độ Fahrenheit, thấp hơn 15 độ Fahrenheit so với mọi lần phóng trước đó. Trước ngày phóng, các kỹ sư đã có quan ngại về khả năng hoạt động của vòng làm kín trong điều kiện nhiệt độ thấp. Tuy nhiên, những cảnh báo đó không được chuyển tải đầy đủ đến những người đưa ra quyết định cuối cùng.',
      'Ủy ban điều tra kết luận quy trình ra quyết định phóng có nhiều thiếu sót. Thông tin liên lạc bị gián đoạn, khiến quyết định được đưa ra dựa trên những thông tin không đầy đủ và đôi khi gây hiểu nhầm. Dữ liệu kỹ thuật của các kỹ sư đã xung đột với nhận định của cấp quản lý. Cấu trúc quản lý của chương trình cũng cho phép một số vấn đề an toàn nội bộ không được chuyển đến đúng cấp có thẩm quyền.',
      'Điều đáng suy nghĩ là tai nạn không chỉ xuất phát từ một chi tiết vật liệu. Một bộ phận có thể bị lỗi vì thiết kế chưa phù hợp, điều kiện vận hành bất lợi hoặc quá trình thử nghiệm chưa đủ. Nhưng để một rủi ro kỹ thuật trở thành thảm họa, còn có thể cần đến nhiều quyết định nối tiếp nhau: cảnh báo không được lắng nghe, dữ liệu không được trình bày đầy đủ và việc đánh giá rủi ro bị chi phối bởi những áp lực ngoài chuyên môn.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_23bd5491.png',
        alt: 'Sơ đồ mặt cắt các đốt tên lửa đẩy nhiên liệu rắn cho thấy vị trí hai vòng cao su O-ring và mối nối hiện trường bị rò rỉ khí nóng',
        caption:
          'Sơ đồ các đốt tên lửa đẩy nhiên liệu rắn (SRB) chỉ rõ vị trí hai vòng làm kín O-ring tại mối nối hiện trường bị rò rỉ.',
        fit: 'contain',
      },
      '---',
      '### Khi trách nhiệm nghề nghiệp phải đối diện với áp lực',
      'Tình huống Challenger cho thấy người kỹ sư có thể đứng trước mâu thuẫn giữa ý kiến chuyên môn và quyết định quản lý. Một bên là dữ liệu, kết quả thử nghiệm và những rủi ro đã được cảnh báo; bên kia là tiến độ, chi phí, kế hoạch hoạt động và kỳ vọng của tổ chức.',
      'Trong slide học tập, các yếu tố kinh tế và áp lực chính trị cũng được đặt ra như những yếu tố cần xem xét khi phân tích quyết định phóng. Tuy nhiên, điều quan trọng không phải là tìm một cá nhân để quy toàn bộ trách nhiệm, mà là nhận diện cách tổ chức tiếp nhận, đánh giá và phản hồi các cảnh báo an toàn.',
      'Với người kỹ sư, trách nhiệm không kết thúc khi đã gửi một email hoặc phát biểu một lần trong cuộc họp. Khi nhận thấy quyết định có thể gây nguy hại cho cộng đồng, họ cần trình bày cơ sở kỹ thuật rõ ràng, thông báo cho cấp quản lý và những người liên quan, đồng thời sử dụng các kênh báo cáo phù hợp để bảo đảm thông tin không bị bỏ qua. Nếu vấn đề liên quan đến an toàn công cộng, sự im lặng vì sợ ảnh hưởng đến tiến độ hoặc vị trí công việc có thể khiến rủi ro tiếp tục tồn tại.',
      '---',
      '### Một cách tiếp cận có hệ thống khi gặp tình huống khó xử',
      'Tài liệu học tập đề xuất quá trình giải quyết tình huống đạo đức bắt đầu bằng việc xác định dữ kiện liên quan, xác định những việc cần làm và những người chịu ảnh hưởng. Sau đó, kỹ sư cần tìm các phương án có thể thực hiện, đánh giá từng phương án, so sánh và lựa chọn giải pháp trước khi hành động.',
      {
        type: 'processDiagram',
        title: '5 bước giải quyết tình huống đạo đức nghề nghiệp',
        theme: 'light',
        steps: [
          { label: 'Xác định dữ kiện', detail: 'Thu thập bằng chứng và ai chịu ảnh hưởng.' },
          { label: 'Tìm các phương án', detail: 'Liệt kê mọi hướng hành động khả thi.' },
          { label: 'Đánh giá đa chiều', detail: 'Xét lợi ích số đông, quyền lợi, công bằng.' },
          { label: 'Kiểm tra phép thử', detail: 'Phép thử phổ quát & phép thử dư luận.' },
          { label: 'Hành động trách nhiệm', detail: 'Báo cáo rõ ràng và dừng lại khi mất an toàn.' },
        ],
      },
      'Để đánh giá, có thể đặt quyết định dưới nhiều góc nhìn. Lý thuyết nhóm người có liên quan yêu cầu xem xét giải pháp đem lại lợi ích cho số đông như thế nào. Lý thuyết về quyền lợi đặt câu hỏi liệu quyền cá nhân, quyền riêng tư và sự công bằng có được tôn trọng hay không. Lý thuyết về sự công bằng xem xét cách phân chia lợi ích và trách nhiệm. Phép thử về tính phổ quát đặt câu hỏi: điều gì sẽ xảy ra nếu mọi người đều hành động theo cách đó? Cuối cùng, phép thử dư luận yêu cầu người ra quyết định tự hỏi liệu mình có sẵn sàng để quyết định ấy xuất hiện trên trang đầu một tờ báo hay không.',
      'Những cách đánh giá này không thay thế kiến thức chuyên môn, nhưng giúp người kỹ sư nhìn rộng hơn khỏi lợi ích cá nhân hoặc sức ép trước mắt. Một quyết định có thể đúng về mặt kỹ thuật trong điều kiện thông thường nhưng chưa chắc có thể chấp nhận khi các rủi ro, quyền lợi và tác động xã hội được xem xét đầy đủ.',
      'Challenger là lời nhắc nhở đau lòng rằng một hệ thống kỹ thuật phức tạp cần nhiều hơn những thiết kế chính xác. Nó cần một môi trường mà cảnh báo chuyên môn được lắng nghe, dữ liệu được truyền đạt trung thực và người có trách nhiệm có đủ thông tin để đưa ra quyết định an toàn. Trong kỹ thuật, đôi khi quyết định quan trọng nhất không phải là khi nào nên bắt đầu, mà là khi nào cần dừng lại.',
    ],
  },
  {
    id: 'ch9-workshop-ethics-cases',
    category: 'Chương 9',
    detailCategory: 'Chương 9: Đạo đức nghề nghiệp',
    layoutVariant: 'magazine-dossier',
    editorialBadge: '3 Tình Huống Thực Tế',
    dossierSummary: {
      label: 'Khung xử lý hiện trường',
      text: 'Đối chiếu quy trình chuẩn, trao đổi trực tiếp dựa trên tiêu chuẩn an toàn, báo cáo theo cấp quản lý và minh bạch thông tin với khách hàng.',
    },
    title: 'Ba lần thử thách đạo đức trong xưởng máy: An toàn, nước thải và vật liệu tái chế',
    sapo: 'Người kỹ sư đôi khi phải đưa ra quyết định ngay trong xưởng máy, bên hệ thống xử lý nước thải hoặc khi trao đổi về một hợp đồng vật liệu – nơi lợi ích kinh tế, tiến độ và trách nhiệm cộng đồng không cùng hướng.',
    imageLabel: 'Kiểm tra hệ thống xử lý nước thải công nghiệp',
    imageSrc: '/assets/aistudio/image_ce10badd.png',
    imageAlt:
      'Hai kỹ sư mặc trang phục bảo hộ và mũ cứng đang kiểm tra, ghi chép thông số vận hành tại bể sục khí xử lý nước thải công nghiệp',
    readTime: '7 phút đọc',
    initialLikes: 0,
    initialComments: [],
    bodyParagraphs: [
      'Một kỹ sư trẻ vừa nhận việc tại nhà máy. Trong những ngày đầu, anh nhận thấy công nhân thường bỏ qua một số thao tác an toàn trên máy dập và máy ép. Khi được hỏi, các công nhân giải thích rằng thực hiện đầy đủ quy trình sẽ làm giảm năng suất và tốn thêm chi phí. Họ cho rằng cách vận hành rút gọn vẫn an toàn vì mọi người đã quen với máy.',
      'Người kỹ sư có thể im lặng để hòa nhập với môi trường làm việc, yêu cầu công nhân tuân thủ quy trình ngay lập tức, hoặc báo cáo với quản đốc. Không lựa chọn nào hoàn toàn dễ dàng, nhất là với một nhân viên mới chưa có nhiều kinh nghiệm và quyền hạn.',
      'Nhưng câu hỏi cốt lõi không phải là người kỹ sư có muốn gây khó khăn cho đồng nghiệp hay không. Đó là liệu cách vận hành hiện tại có tiềm ẩn nguy cơ tai nạn hay không.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_ba778d50.png',
        alt: 'Minh họa rào chắn an toàn cố định (Fixed Barrier Guard) trên máy dập công nghiệp kèm cụm nút bấm điều khiển hai tay của OSHA',
        caption:
          'Rào chắn an toàn cố định trên máy dập (Fixed Barrier Guard on a Power Press, OSHA) giúp ngăn ngừa tai nạn trực tiếp tại vùng ép.',
        fit: 'contain',
      },
      'Theo phương án giải quyết được đề xuất trong slide, kỹ sư cần tìm hiểu và so sánh quy trình vận hành chuẩn do công ty ban hành với quy trình rút gọn mà công nhân đang thực hiện. Nếu thao tác rút gọn tiềm ẩn nguy cơ tai nạn, người kỹ sư cần báo cáo quản đốc và đề nghị công nhân thực hiện đúng quy trình chuẩn. Nếu nhận thấy quy trình chuẩn chưa tối ưu nhưng cách vận hành thực tế có cơ sở hợp lý, kỹ sư nên báo cáo và đề xuất sửa đổi quy trình theo hướng phù hợp hơn. Điều cần tránh là tự ý bỏ qua các bước an toàn chỉ vì áp lực năng suất.',
      '---',
      '### Khi một dòng nước thải vượt giới hạn cho phép',
      'Tình huống thứ hai diễn ra trong dự án thiết kế và lắp đặt hệ thống xử lý nước thải cho một nhà máy công nghiệp. Một kỹ sư phát hiện đồng nghiệp phụ trách xử lý nước thải thường chấp nhận mức hóa chất độc hại cao hơn tiêu chuẩn cho phép trước khi thải ra sông. Khi được góp ý, người đồng nghiệp cho rằng mức vượt không lớn, không gây nguy hiểm nghiêm trọng và không đáng để đầu tư thêm thời gian, chi phí.',
      'Đây là tình huống mà lợi ích kinh tế của dự án có thể xung đột với trách nhiệm bảo vệ môi trường. Nếu người kỹ sư bỏ qua vấn đề vì nghĩ rằng mình không phải người phụ trách trực tiếp, rủi ro vẫn tiếp tục tồn tại. Nhưng nếu phản ứng thiếu căn cứ hoặc không theo quy trình, việc xử lý cũng có thể không hiệu quả.',
      'Slide đề xuất một trình tự rõ ràng: trước hết thuyết phục đồng nghiệp chỉnh sửa thiết kế để bảo đảm tiêu chuẩn cho phép. Nếu đồng nghiệp từ chối, cần báo cáo lên cấp trên để đề nghị xử lý. Trường hợp cấp cao nhất của nhà máy vẫn không giải quyết, người kỹ sư cần báo cáo cơ quan thanh tra môi trường.',
      {
        type: 'processDiagram',
        title: 'Trình tự xử lý vi phạm an toàn – môi trường theo cấp',
        theme: 'dark',
        steps: [
          {
            label: 'Kiểm tra chuẩn',
            detail: 'Đối chiếu quy trình vận hành chuẩn và ngưỡng kỹ thuật.',
          },
          {
            label: 'Trao đổi đồng nghiệp',
            detail: 'Thuyết phục điều chỉnh thiết kế hoặc thao tác đúng chuẩn.',
          },
          {
            label: 'Báo cáo cấp quản lý',
            detail: 'Chuyển quản đốc hoặc lãnh đạo nhà máy xử lý khi bị từ chối.',
          },
          {
            label: 'Thanh tra / Minh bạch',
            detail: 'Báo cáo cơ quan chuyên trách hoặc thông tin rõ với khách hàng.',
          },
        ],
      },
      'Điểm đáng lưu ý là trách nhiệm nghề nghiệp không chỉ thuộc về người trực tiếp thiết kế hoặc vận hành hệ thống. Khi đã biết một nguy cơ có thể ảnh hưởng đến môi trường và cộng đồng, người kỹ sư không nên xem đó là vấn đề của riêng đồng nghiệp. Việc cảnh báo và báo cáo đúng kênh là cách để đưa vấn đề trở lại quá trình kiểm tra, đánh giá và xử lý có trách nhiệm.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_ce10badd.png',
        alt: 'Hai kỹ sư giám sát và ghi nhận thông số tại bể xử lý nước thải công nghiệp',
        caption:
          'Kiểm soát nồng độ hóa chất và quy trình xử lý nước thải đòi hỏi tính trung thực chuyên môn và tuân thủ nghiêm ngặt tiêu chuẩn môi trường.',
        fit: 'cover',
      },
      {
        type: 'figure',
        src: '/assets/aistudio/image_ef2e347c.png',
        alt: 'Toàn cảnh khu bể xử lý và đường ống thu gom, thoát nước thải công nghiệp tại nhà máy',
        caption:
          'Hệ thống bể xử lý và tuyến đường ống thoát nước công nghiệp phải bảo đảm đạt chuẩn trước khi xả ra môi trường tự nhiên.',
        fit: 'cover',
      },
      '---',
      '### Sản phẩm rẻ hơn có cần thông báo cho khách hàng?',
      'Tình huống thứ ba không liên quan trực tiếp đến tai nạn lao động hay ô nhiễm môi trường. Một kỹ sư thiết kế phát triển thành công loại vật liệu xây dựng mới từ nguyên liệu tái chế. Công nghệ này được doanh nghiệp áp dụng cho toàn bộ sản phẩm, giúp giảm đáng kể chi phí sản xuất và giá bán.',
      'Tuy nhiên, một vấn đề xuất hiện khi công ty đã ký hợp đồng với khách hàng. Hợp đồng quy định những điều khoản và tiêu chuẩn bảo đảm chất lượng sản phẩm, nhưng không ghi rõ tên nguyên vật liệu sử dụng. Khi công nghệ sản xuất thay đổi, doanh nghiệp có cần thông báo cho khách hàng hay không? Nếu chi phí giảm nhiều, khách hàng có quyền được biết và cùng thảo luận lại giá cả hay không?',
      'Đây không chỉ là câu hỏi về việc sản phẩm có đáp ứng tiêu chuẩn kỹ thuật hay không. Nó còn liên quan đến tính minh bạch trong quan hệ giữa nhà cung cấp và khách hàng. Khách hàng đã ký hợp đồng trên cơ sở những thông tin được cung cấp tại thời điểm giao kết. Khi công nghệ và vật liệu đầu vào thay đổi, việc thông báo giúp khách hàng hiểu rõ sản phẩm đang được cung cấp và có cơ sở trao đổi về những điều khoản liên quan.',
      'Phương án giải quyết trong slide đề xuất doanh nghiệp cần thông báo đầy đủ cho khách hàng về thay đổi công nghệ, vật liệu sử dụng và giá sản phẩm theo công nghệ mới. Các bên nên thảo luận lại hợp đồng để cùng chia sẻ lợi ích từ việc giảm chi phí sản xuất. Người kỹ sư trực tiếp tham gia thiết kế và chế tạo cũng có trách nhiệm góp tiếng nói để bảo đảm thông tin được truyền đạt minh bạch.',
      {
        type: 'figure',
        src: '/assets/aistudio/image_18c2dd63.png',
        alt: 'Infographic Circular Economy of concrete mô tả vòng đời bê tông từ khai thác nguyên liệu, sản xuất, vận chuyển, sử dụng đến tái chế cốt liệu',
        caption:
          'Vòng đời tuần hoàn của bê tông và vật liệu xây dựng tái chế (Circular Economy of concrete, tác giả Gaslord, Wikimedia Commons, CC BY-SA 4.0).',
        fit: 'contain',
      },
      'Ba tình huống trên khác nhau về bối cảnh nhưng có chung một điểm: người kỹ sư phải đưa ra quyết định trong khi lợi ích kinh tế, tiến độ, quan hệ đồng nghiệp và trách nhiệm với cộng đồng có thể không cùng hướng. Không phải lúc nào cũng có một lựa chọn đem lại thuận lợi cho tất cả các bên. Tuy nhiên, những nguyên tắc về an toàn, trung thực, minh bạch, tuân thủ pháp luật và bảo vệ lợi ích xã hội có thể giúp người kỹ sư xác định đâu là giới hạn không nên vượt qua.',
      'Đạo đức nghề nghiệp không chỉ được thử thách trong những thảm họa lớn hay các quyết định cấp cao. Nó xuất hiện ngay trong xưởng máy, tại hệ thống xử lý nước thải và trong cuộc trao đổi về một hợp đồng cung cấp vật liệu. Có khi, lựa chọn có trách nhiệm chỉ đơn giản là không bỏ qua một bước an toàn, không chấp nhận một kết quả vượt tiêu chuẩn và không giữ im lặng khi khách hàng cần được biết sự thật.',
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

export const FEATURED_REFERENCE_LIMIT = 4;
export const SIDEBAR_REFERENCE_LIMIT = 5;
export const INITIAL_GRID_VISIBLE_COUNT = 4;

export interface RandomizedReferenceFeed {
  featuredPosts: readonly ReferencePost[];
  sidebarPosts: readonly ReferencePost[];
  gridPosts: readonly ReferencePost[];
}

export function isPlaceholderReferencePost(post: ReferencePost): boolean {
  return post.title.includes('(Placeholder)');
}

export function shuffleReferencePosts<T>(
  items: readonly T[],
  rng: () => number = Math.random
): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const rawIndex = Math.floor(rng() * (i + 1));
    const j = Math.max(0, Math.min(i, rawIndex));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const MANDATORY_FEATURED_REFERENCE_IDS: readonly string[] = [
  'featured-2', // Steve Jobs, Bill Gates & GUI Xerox (Chương 1)
  'featured-1', // Dell & Asus (Chương 2)
  'ch3-active-reading', // Đọc hết một cuốn sách không có nghĩa là đã hiểu nó (Chương 3)
  'ch7-si-measurement', // Đo lường và hệ SI: Nền tảng của ngôn ngữ kỹ thuật (Chương 7)
];

export const MANDATORY_ALWAYS_VISIBLE_REFERENCE_IDS: readonly string[] = [
  'ch2-frdparrc', // Chương 2: Từ ý tưởng đến giải pháp: Vì sao kỹ sư cần một bản đồ để tổ chức tư duy?
  'ch3-learn-how-to-learn', // Chương 3: Bước vào đại học, sinh viên phải học lại cách học
  'ch3-smart-goals', // Chương 3: Mục tiêu học tập: từ một ước muốn đến kế hoạch có thể thực hiện
  'ch4-project-balance', // Chương 4: Thành công của dự án là bài toán cân bằng
  'ch4-pert-and-gantt', // Chương 4: PERT và Gantt: Khi tiến độ dự án được nhìn thấy
  'ch5-communication-conflict', // Chương 5: Khi bất đồng trở thành rào cản: Nghệ thuật giao tiếp và giải quyết xung đột
  'ch6-scamper-mindmap', // Chương 6: Sáng tạo không nhất thiết bắt đầu từ con số không
  'ch6-root-cause-selection', // Chương 6: Tìm đúng nguyên nhân, chọn đúng phương án
  'ch8-active-listening', // Chương 8: Lắng nghe – Kỹ năng ít được chú ý nhưng quyết định hiệu quả giao tiếp
];

export function createRandomizedReferenceFeed(
  posts: readonly ReferencePost[] = ALL_REFERENCE_POSTS,
  rng: () => number = Math.random
): RandomizedReferenceFeed {
  const realPosts = posts.filter((post) => !isPlaceholderReferencePost(post));
  const placeholderPosts = posts.filter((post) =>
    isPlaceholderReferencePost(post)
  );

  const anchorFeaturedPosts = MANDATORY_FEATURED_REFERENCE_IDS
    .map((id) => realPosts.find((p) => p.id === id))
    .filter((p): p is ReferencePost => Boolean(p))
    .slice(0, FEATURED_REFERENCE_LIMIT);

  const featuredIdSet = new Set(anchorFeaturedPosts.map((p) => p.id));

  const alwaysVisiblePosts = MANDATORY_ALWAYS_VISIBLE_REFERENCE_IDS
    .filter((id) => !featuredIdSet.has(id))
    .map((id) => realPosts.find((p) => p.id === id))
    .filter((p): p is ReferencePost => Boolean(p));

  const alwaysVisibleIdSet = new Set(alwaysVisiblePosts.map((p) => p.id));

  const remainingRealPosts = realPosts.filter(
    (post) => !featuredIdSet.has(post.id) && !alwaysVisibleIdSet.has(post.id)
  );
  const shuffledRemaining = shuffleReferencePosts(remainingRealPosts, rng);

  const remainingNeededForFeatured = Math.max(
    0,
    FEATURED_REFERENCE_LIMIT - anchorFeaturedPosts.length
  );
  const featuredPosts = [
    ...anchorFeaturedPosts,
    ...shuffledRemaining.slice(0, remainingNeededForFeatured),
  ];

  const cursor = remainingNeededForFeatured;
  const nonFeaturedQueue = [
    ...alwaysVisiblePosts,
    ...shuffledRemaining.slice(cursor),
  ];

  const sidebarPosts = nonFeaturedQueue.slice(0, SIDEBAR_REFERENCE_LIMIT);
  const gridPosts = [
    ...nonFeaturedQueue.slice(SIDEBAR_REFERENCE_LIMIT),
    ...placeholderPosts,
  ];

  return {
    featuredPosts,
    sidebarPosts,
    gridPosts,
  };
}

export const PAGE_LOAD_REFERENCE_FEED: RandomizedReferenceFeed =
  createRandomizedReferenceFeed();

export interface ReferenceChapterInfo {
  chapterNumber: number;
  label: string;
  detailLabel: string;
}

export const REFERENCE_CHAPTERS: readonly ReferenceChapterInfo[] = Array.from(
  { length: 9 },
  (_, index) => {
    const chapterNumber = index + 1;
    const label = `Chương ${chapterNumber}`;
    let detailLabel = label;
    if (chapterNumber === 1) {
      detailLabel = 'Chương 1: Giới thiệu nhập môn kỹ thuật';
    } else if (chapterNumber === 2) {
      detailLabel = 'Chương 2: Thiết kế kỹ thuật';
    } else if (chapterNumber === 3) {
      detailLabel = 'Chương 3: Phương pháp học tập hiệu quả';
    } else if (chapterNumber === 4) {
      detailLabel = 'Chương 4: Quản lý dự án';
    } else if (chapterNumber === 5) {
      detailLabel = 'Chương 5: Kỹ năng làm việc nhóm';
    } else if (chapterNumber === 6) {
      detailLabel = 'Chương 6: Kỹ năng giải quyết vấn đề';
    } else if (chapterNumber === 7) {
      detailLabel = 'Chương 7: Cơ sở kỹ thuật';
    } else if (chapterNumber === 8) {
      detailLabel = 'Chương 8: Giao tiếp trong kỹ thuật';
    } else if (chapterNumber === 9) {
      detailLabel = 'Chương 9: Đạo đức nghề nghiệp';
    }
    return {
      chapterNumber,
      label,
      detailLabel,
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
  total: number = FEATURED_REFERENCE_LIMIT
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

export const VISITOR_ENGAGEMENT_ID = 'visitor@local';

export function validateArticleCommentInput(
  authorName: string,
  commentText: string
): string | null {
  const hasAuthor = authorName.trim().length > 0;
  const hasComment = commentText.trim().length > 0;
  if (!hasAuthor && !hasComment) {
    return 'Vui lòng nhập tên và nội dung bình luận.';
  }
  if (!hasAuthor) {
    return 'Vui lòng nhập tên của bạn.';
  }
  if (!hasComment) {
    return 'Vui lòng nhập nội dung bình luận.';
  }
  return null;
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
