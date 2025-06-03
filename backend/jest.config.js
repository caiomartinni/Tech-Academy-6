/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  }
};
export default config;