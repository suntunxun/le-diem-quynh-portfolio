export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD') // Chuẩn hóa Unicode để tách dấu
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu
    .replace(/[đĐ]/g, 'd') // Thay thế chữ đ
    .replace(/([^0-9a-z-\s])/g, '') // Loại bỏ ký tự đặc biệt
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu -
    .replace(/-+/g, '-') // Loại bỏ nhiều dấu - liên tiếp
    .replace(/^-+|-+$/g, ''); // Loại bỏ dấu - ở đầu và cuối
}
