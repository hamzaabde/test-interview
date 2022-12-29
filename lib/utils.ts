export function buildAPIUrl(path: string, https: boolean = false) {
  return `http${https ? "s" : ""}://${process.env.API_URL}/api/${path}`;
}
