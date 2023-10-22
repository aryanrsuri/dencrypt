const cache =
  "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789!@#$%^&*()_+-=. ";
export const gen = (s = 21) => {
  const bytes: Uint8Array = crypto.getRandomValues(new Uint8Array(s));
  let id = "";
  while (s--) id += cache[bytes[s] & 63];
  return id;
};
