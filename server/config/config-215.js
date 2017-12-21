//本地调试环境配置
var path = require('path');
module.exports = {
  "env":"local",
  "debug": true,
  // session配置
  sessionconfig:{
    redisStore:{
      host:"192.168.101.215",
      port:"6379",
      ttl: 1000*60*60*24*30,
      pass: "testredis",
      logErrors : true
    },
    sessionCookieName: 'managersessionid',
    url: "mongodb://192.168.101.215:27017/managersession",
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      // domain: 'i-niuwa.com'
    }
  },
  // db配置
  mongodb:{
    url :"mongodb://192.168.101.215:27017",
  },
  "domain": "http://192.168.101.215:36011/services/",
  "domain1": "http://192.168.101.215:9001/ws/",
  "domain3": "http://192.168.101.215:8011/", //app

};
