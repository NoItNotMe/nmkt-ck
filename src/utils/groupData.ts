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
    title: 'Hỗ trợ phân công',
    subtitle: 'Chương 5: Kỹ năng làm việc nhóm',
    description:
      'Bản đồ năng lực kỹ thuật: xác định kỹ năng của từng thành viên, nhận diện ngay lỗ hổng năng lực và điểm nghẽn phụ thuộc để phân công nhiệm vụ tối ưu.',
  },
  {
    id: 'muc-6',
    title: 'Hướng dẫn giải quyết vấn đề',
    subtitle: 'Chương 6: Kỹ năng giải quyết vấn đề',
    description:
      'Tổng hợp khung tư duy trực quan (5W1H, SCAMPER, Sáu chiếc mũ tư duy, Ishikawa), kênh hỏi đáp trợ lý AI và bài viết chuyên đề tham khảo.',
  },
  {
    id: 'muc-7',
    title: 'Quy đổi đơn vị về hệ SI',
    subtitle: 'Chương 7: Cơ sở kỹ thuật',
    description:
      'Công cụ tối giản quy đổi nhanh các đại lượng đo lường, biểu thức tích thương, tiền tố và đơn vị tiếng Việt về chuẩn hệ SI.',
  },
  {
    id: 'muc-8',
    title: 'Chữa slide',
    subtitle: 'Chương 8: Giao tiếp trong kỹ thuật',
    description:
      'Tìm và sửa các lỗi thường gặp trên slide thuyết trình kỹ thuật (chữ quá dày, tương phản kém, thiếu nhãn biểu đồ, bố cục rối) và xem quy tắc khắc phục.',
  },
  {
    id: 'muc-9',
    title: 'Tình huống đạo đức',
    subtitle: 'Chương 9: Đạo đức nghề nghiệp',
    description:
      'Mô phỏng 33 tình huống đạo đức kỹ thuật thực tế: đưa ra quyết định và đối chiếu qua 5 phép thử đạo đức cùng quy trình 8 bước giải quyết vấn đề.',
  },
] as const;
