//本地调试环境配置
var path = require('path');
module.exports = {
  "env":"local",
  "debug": true,
  // session配置
  sessionconfig:{
    redisStore:{
      host:"192.168.101.211",
      port:"6379",
      ttl: 1000*60*60*24*30,
      pass: "test211redis",
      logErrors : true
    },
    sessionCookieName: 'managersessionid',
    url: "mongodb://192.168.101.211:27017/managersession",
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      // domain: 'i-niuwa.com'
    }
  },
  // db配置
  mongodb:{
    url :"mongodb://192.168.101.211:27017",
  },
  "domain": "http://192.168.101.211:36011/services/",
  "domain1": "http://192.168.101.211:9001/ws/",
  //"test": "http://192.168.101.138:8080/niuwa-p2ps/",
  "domain3": "http://192.168.101.211:8011/" //app
};
