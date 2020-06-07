export default {
  jwt: {
    secret: process.env.APP_SECRET || 'dafault-secret',
    expiresIn: '1d',
  },
};
