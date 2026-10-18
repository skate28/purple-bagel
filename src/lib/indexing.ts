/** Search indexing stays off until the shop owner approves it. */
export function allowIndexing(): boolean {
  return process.env.ALLOW_INDEXING === "true";
}
