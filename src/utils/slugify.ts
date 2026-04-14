export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD') // Chuẩn hóa Unicode để tách dấu
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu tiếng Việt
    .replace(/[đĐ]/g, 'd') // Thay thế chữ đ
    .replace(/[^a-z0-9]+/g, '-') // Thay thế tất cả ký tự đặc biệt (bao gồm (), "", v.v.) bằng dấu gạch ngang
    .replace(/^-+|-+$/g, ''); // Loại bỏ dấu gạch ngang ở đầu và cuối
}
