export interface PlaceholderItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export const PLACEHOLDER_ITEMS: readonly PlaceholderItem[] = [
  {
    id: 'muc-1',
    title: 'Định hướng ngành',
    subtitle: 'Chương 1: Giới thiệu',
    description:
      'Bài trắc nghiệm 20 câu hỏi định hướng 4 chuyên ngành kỹ thuật và đánh giá trọng số kỹ năng thông qua mô hình robot.',
  },
  {
    id: 'muc-2',
    title: 'Chọn phương án thiết kế',
    subtitle: 'Chương 2: Thiết kế kỹ thuật',
    description:
      'Công cụ chấm điểm ma trận quyết định kỹ thuật theo các tiêu chí và phân tích độ nhạy phương án tối ưu.',
  },
  {
    id: 'muc-3',
    title: 'Một ngày của bạn',
    subtitle: 'Chương 3: Quản lý thời gian hiệu quả',
    description:
      'Mô phỏng 24 giờ biểu đồ ma trận Eisenhower, phân loại nhóm hoạt động và đưa ra gợi ý cân bằng thời gian.',
  },
  {
    id: 'muc-4',
    title: 'Lập biểu đồ Gantt',
    subtitle: 'Chương 4: Quản lý dự án',
    description:
      'Công cụ tương tác lập tiến độ biểu đồ Gantt, phân công vai trò thành viên và xuất ảnh tiến độ dự án.',
  },
  {
    id: 'muc-5',
    title: 'Đánh giá kỹ năng làm việc nhóm',
    subtitle: 'Chương 5: Kỹ năng làm việc nhóm',
    description:
      'Khung xây dựng điều lệ nhóm, ma trận phân công vai trò và thang đo đánh giá hiệu quả phối hợp nhóm kỹ thuật.',
  },
  {
    id: 'muc-6',
    title: 'Kỹ thuật sáng tạo SCAMPER & 5 Why',
    subtitle: 'Chương 6: Kỹ năng giải quyết vấn đề và sáng tạo',
    description:
      'Công cụ kích thích ý tưởng theo 7 hướng SCAMPER, kết hợp bản đồ tư duy và biểu đồ xương cá xác định nguyên nhân gốc rễ.',
  },
  {
    id: 'muc-7',
    title: 'Quy đổi đơn vị kỹ thuật & Hệ SI',
    subtitle: 'Chương 7: Cơ sở kỹ thuật',
    description:
      'Bảng tra cứu và chuyển đổi các đại lượng đo lường chuẩn SI, cùng các công thức tính toán cơ học và mạch điện nền tảng.',
  },
  {
    id: 'muc-8',
    title: 'Chuẩn hóa báo cáo & Thuyết trình',
    subtitle: 'Chương 8: Giao tiếp trong kỹ thuật',
    description:
      'Cấu trúc biểu mẫu chuẩn cho báo cáo kỹ thuật, tiêu chí trực quan hóa slide thuyết trình và quy chuẩn soạn thảo thư tín chuyên nghiệp.',
  },
  {
    id: 'muc-9',
    title: 'Phân tích tình huống đạo đức kỹ sư',
    subtitle: 'Chương 9: Đạo đức nghề nghiệp',
    description:
      'Bộ tình huống thực tế và câu hỏi phân tích đạo đức kỹ sư: trách nhiệm an toàn cộng đồng, xung đột lợi ích và tính chính trực.',
  },
] as const;
