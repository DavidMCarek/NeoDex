export default function urlToDexNo(urlStr: string) {
  const url = new URL(urlStr);
  const path = url.pathname;
  const pathParts = path.split("/").filter(Boolean);
  return pathParts[pathParts.length - 1];
}
