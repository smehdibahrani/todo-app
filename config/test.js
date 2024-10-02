module.exports = {
  port: 2000,
  mongo: 'mongodb://localhost/todo-list-test',
  jwt: {
    privateKey: './key/private.key',
    publicKey: './key/public.key',
    algorithm: 'RS256',
    accessTokenExpire: '1m',
  },
};
