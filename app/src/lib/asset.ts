/** 解析 public 目录或站内绝对路径，兼容 GitHub Pages 子路径部署 */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL;
  return `${base}${normalized}`;
}
