/**
 *  系统管理
 */
var controller = require('../controller/systemManager');
module.exports = function(app) {
    app.post("/login", controller.login);       //登录
    app.post("/loginOut", controller.loginOut);       //登录
    app.post("/checkUserLoginStatus", controller.checkUserLoginStatus);   //检测是否在其他地方登录
    app.post("/findUserListPage",controller.findUserListPage);  //后端管理人员列表
    app.post("/saveUser", controller.saveUser);     //增加后台管理人员
    app.post("/updateUser", controller.updateUser);   //修改后台人员信息
    app.post("/resetPassword", controller.resetPassword);   //重置密码
    app.post("/updatePassword", controller.updatePassword);   //重置密码
};

