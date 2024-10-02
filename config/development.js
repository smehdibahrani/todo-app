module.exports = {
  port: 2000,
  mongo: 'mongodb://localhost/todo-list',
  jwt: {
    privateKey: './key/private.key',
    publicKey: './key/public.key',
    algorithm: 'RS256',
    accessTokenExpire: '24h',
  },
};
