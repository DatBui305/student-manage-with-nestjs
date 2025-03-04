export class NotificationMessage {
  title: string; // Tiêu đề của thông báo
  message: string; // Nội dung chi tiết của thông báo
  createdAt: string; // Thời gian tạo (ISO 8601)

  constructor(title: string, message: string, createdAt: string) {
    this.title = title;
    this.message = message;
    this.createdAt = createdAt;
  }
}
