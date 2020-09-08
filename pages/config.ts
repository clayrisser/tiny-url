export interface Config {
  maxUploadSize: number;
}

const METABYTE = 1000000;
const { env } = process;

const config: Config = {
  maxUploadSize: Number(env.MAX_UPLOAD_SIZE || 10 * METABYTE)
};

export default config;
