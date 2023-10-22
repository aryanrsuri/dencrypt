export const a =
  "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
export const nnid = (s = 21) => {
  const bytes: Uint8Array = crypto.getRandomValues(new Uint8Array(s));
  let id = "";
  while (s--) id += a[bytes[s] & 63];
  return id;
};
