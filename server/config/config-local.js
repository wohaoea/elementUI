//本地调试环境配置
var path = require('path');
module.exports = {
    "env": "local",
    "debug": true,
    // session配置
    sessionconfig: {
        redisStore:{
            host:"192.168.101.201",
            port:"6379",
            ttl: 1000*60*30,
            pass: "testredis",
            logErrors : true
        },
        sessionCookieName: 'managersessionid',
        url: "mongodb://localhost:27017/managersession",
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            // domain: 'i-niuwa.com'
        }
    },
    // db配置
    mongodb: {
        url: "mongodb://localhost:27017",
    },

    // "domain": "http://192.168.101.201:36005/services/",
    // "domain": "http://192.168.101.201:36005/vcc-sp/",
    "domain": "http://192.168.102.191:27000/services/",
    // "domain3": "http://192.168.101.215:8011/" //app
    "domain1": "http://192.168.101.201:9001/ws/",
    "domain3": "http://192.168.101.201:8011/" //app
};
