import bcrypt from 'bcryptjs';

export async function hash(password: string) {
  const SALT = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, SALT);
}

export async function compare(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
