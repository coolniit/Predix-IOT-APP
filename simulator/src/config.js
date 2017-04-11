import dotenv from 'dotenv';

export default () => {
  dotenv.load();

  return {
    port: process.env.PORT,
    apiUrl: process.env.API_URL,
    interval: process.env.INTERVAL,
  };
}
