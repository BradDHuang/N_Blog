module.exports = {
  port: 3000,
  session: {
    secret: 'bradsblog',
    key: 'bradsblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/bradsblog'
}

// port: 程序启动要监听的端口号
// session: express-session 的配置信息，后面介绍
// mongodb: mongodb 的地址，
// 以 mongodb:// 协议开头，bradsblog 为 db 名
