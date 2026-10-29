import 'dotenv/config';

/**
 * Central place for run-time configuration.
 * Values come from the environment (or a local, git-ignored .env file).
 */
export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  username: process.env.SAUCE_USER ?? 'standard_user',
  password: process.env.SAUCE_PASSWORD ?? '',
  get hasCredentials(): boolean {
    return this.password !== '';
  },
};
