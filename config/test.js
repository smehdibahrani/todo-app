module.exports = {
  port: 2000,
  mongo: 'mongodb://localhost/todo-list-test',
  jwt: {
    secretKey: 'asdsa;dklma;skdm;alsmd;lamsd;lasmd;lasfpjsdjgp;sd',
    algorithm: 'RS256',
    accessTokenExpire: '5m',
  },
};
