export interface AiAssistant {
  id: string;
  name: string;
  provider: string;
  url: string;
  badge: string;
  logoSrc: string;
}

export interface ProblemSolvingDiagram {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  alt: string;
  description: string;
  aspect: 'square' | 'portrait' | 'landscape' | 'wide';
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  prompt: string;
}

export const AI_ASSISTANTS: readonly AiAssistant[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    provider: 'OpenAI',
    url: 'https://chatgpt.com',
    badge: 'chatgpt.com',
    logoSrc: '/assets/aistudio/image_6a6e43cc.png',
  },
  {
    id: 'claude',
    name: 'Claude',
    provider: 'Anthropic',
    url: 'https://claude.ai',
    badge: 'claude.ai',
    logoSrc: '/assets/aistudio/image_1543538e.png',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    provider: 'Google',
    url: 'https://gemini.google.com',
    badge: 'gemini.google.com',
    logoSrc: '/assets/aistudio/image_4dcd9216.png',
  },
] as const;

export const PROBLEM_SOLVING_DIAGRAMS: readonly ProblemSolvingDiagram[] = [
  {
    id: '5w1h',
    title: 'Mô hình 5W1H',
    subtitle: 'Nhận diện & Làm rõ bài toán',
    src: '/assets/aistudio/image_0cc75f57.png',
    alt: 'Sơ đồ hình tròn 5W1H gồm 6 câu hỏi: Who, What, Where, When, Why, How',
    description:
      'Đặt 6 câu hỏi trọng tâm (Ai, Cái gì, Ở đâu, Khi nào, Vì sao, Thế nào) để xác định chính xác hiện trạng và ranh giới bài toán trước khi đưa ra giải pháp.',
    aspect: 'square',
  },
  {
    id: 'fishbone',
    title: 'Biểu đồ xương cá (Ishikawa)',
    subtitle: 'Phân tích nguyên nhân gốc rễ',
    src: '/assets/aistudio/image_e635f020.png',
    alt: 'Biểu đồ xương cá Ishikawa gồm 6 nhánh: Methods, Machines, People, Materials, Measurement, Environment dẫn đến Problem',
    description:
      'Phân tách các nguồn gây lỗi theo 6 nhánh tiêu chuẩn công nghiệp: Phương pháp, Máy móc, Con người, Vật liệu, Đo lường và Môi trường vận hành.',
    aspect: 'landscape',
  },
  {
    id: 'scamper',
    title: 'Kỹ thuật sáng tạo SCAMPER',
    subtitle: 'Kích hoạt phương án cải tiến',
    src: '/assets/aistudio/image_30a5c63a.png',
    alt: 'Bảng 7 phương pháp SCAMPER: Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse',
    description:
      'Bảy lăng kính gợi ý để cải tiến đối tượng có sẵn: Thay thế, Kết hợp, Thích nghi, Điều chỉnh, Đổi mục đích sử dụng, Loại bỏ và Đảo ngược trình tự.',
    aspect: 'wide',
  },
  {
    id: 'six-hats',
    title: 'Sáu chiếc mũ tư duy (Six Thinking Hats)',
    subtitle: 'Đánh giá đa chiều có hệ thống',
    src: '/assets/aistudio/image_a1091a3c.png',
    alt: 'Bảng tóm tắt Six Thinking Hats gồm Mũ xanh dương (Quy trình), Trắng (Dữ kiện), Đỏ (Cảm xúc), Xanh lá (Sáng tạo), Vàng (Lợi ích), Đen (Rủi ro)',
    description:
      'Phương pháp tư duy song song của Edward de Bono: tách biệt 6 trạng thái suy nghĩ giúp nhóm tránh xung đột, nhìn nhận rủi ro và ra quyết định cân bằng.',
    aspect: 'portrait',
  },
] as const;

export const SUGGESTED_PROMPTS: readonly SuggestedPrompt[] = [
  {
    id: 'prompt-1',
    label: 'Truy tìm nguyên nhân 5 Why',
    prompt:
      'Tôi đang giải quyết sự cố kỹ thuật sau: [mô tả sự cố]. Hãy hướng dẫn tôi áp dụng kỹ thuật 5 Why để tìm ra các nguyên nhân gốc rễ tiềm ẩn và đề xuất các bước kiểm chứng.',
  },
  {
    id: 'prompt-2',
    label: 'Cải tiến sản phẩm theo SCAMPER',
    prompt:
      'Tôi muốn cải tiến sản phẩm kỹ thuật: [mô tả thiết bị/sản phẩm]. Hãy áp dụng lần lượt 7 tiêu chí của mô hình SCAMPER (Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse) để đưa ra ít nhất 7 ý tưởng đổi mới cụ thể.',
  },
  {
    id: 'prompt-3',
    label: 'Đánh giá theo Sáu chiếc mũ tư duy',
    prompt:
      'Nhóm chúng tôi đang cân nhắc phương án thiết kế sau: [mô tả phương án]. Hãy phân tích phương án này lần lượt dưới 6 góc nhìn: Dữ liệu thực tế (Trắng), Cảm xúc trực giác (Đỏ), Điểm tích cực (Vàng), Rủi ro điểm yếu (Đen), Giải pháp sáng tạo (Xanh lá) và Tổ chức thực thi (Xanh dương).',
  },
] as const;
