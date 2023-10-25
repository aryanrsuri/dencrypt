import { words } from "./words.ts";
const cache = "0123456789!@#$%^&*()_+-=.";
export const genuser = async (s = 21) => {
  const bytes: Uint8Array = crypto.getRandomValues(new Uint8Array(s));
  const randint = Math.floor(Math.random() * 12485);
  let username = "";
  username += words[randint];
  while (s--) username += cache[bytes[s] & 23];
  return username;
};
