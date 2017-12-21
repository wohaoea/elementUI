//本地调试环境配置
var path = require('path');
module.exports = {
  "env":"local",
  "debug": true,
  // session配置
  sessionconfig:{
    redisStore:{
      host:"172.16.50.160",
      port:"6379",
      ttl: 1000*60*60*24*30,
      pass: "31d3fFec1C1CC451",
      logErrors : true
    },
    sessionCookieName: 'managersessionid',
    url: "mongodb://172.16.99.52:27017/managersession",
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      // domain: 'i-niuwa.com'
    }
  },
  // db配置
  mongodb:{
    url :"mongodb://172.16.99.52:27017",
  },
  "domain": "http://172.16.50.212/ws/",
  "domain1": "http://172.16.50.212/ws/"

};
