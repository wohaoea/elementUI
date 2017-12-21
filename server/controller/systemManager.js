/**
 * Created by Administrator on 2017/11/10.
 */

var wsclient = require('../common/wsclient');
var constant = require('../common/constant');
var utils = require("../common/utils");
var controller = {};

/**登录**/
controller.login = function*() {
    var params = this.request.body;
    var result = yield wsclient.userLogin(this,params);
    if(result.success){
        this.session.userInfo = {
            custId:result.data.id,
            loginStatusToken:result.data.loginStatusToken
        };
        this.body = utils.successResult({userName:result.data.userName},result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};

/**登出**/
controller.loginOut = function*() {
    var params = this.request.body;
    var result = yield wsclient.userLoginOut(this,params);
    if(result.success){
        this.session.userInfo = null;
        this.body = utils.successResult(null,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};

/**检测是否在其他地方登录**/
controller.checkUserLoginStatus = function*(){
    var self = this;
    var params = self.request.body;
    if(self.session.userInfo){
        params.loginStatusToken = self.session.userInfo.loginStatusToken;
        var result =  yield wsclient.checkUserLoginStatus(self,params);
        if(result.success){
            this.body = utils.successResult(result.data,result.msg);
        }else{
            this.body = utils.failResult(constant.error,null,result.msg);
        }
    }else{
        this.body = utils.successResult({isValid: 2});
    }

};

/**后台人员管理列表**/
controller.findUserListPage = function*(){
    var params = this.request.body;
    var result = yield wsclient.findUserListPage(this,params);
    if(result.success){
        this.body = utils.successResult(result.data.pageResult,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};

/**保存后台管理人员信息**/
controller.saveUser = function*(){
    var params = this.request.body;
    var result = yield wsclient.saveUser(this,params);
    if(result.success){
        this.body = utils.successResult(null,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};

/**修改后台管理人员信息**/
controller.updateUser = function*(){
    var params = this.request.body;
    var result = yield wsclient.updateUser(this,params);
    if(result.success){
        this.body = utils.successResult(null,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};

/**修改密码**/
controller.updatePassword = function*(){
    var params = this.request.body;
    var result = yield wsclient.updatePassword(this,params);
    if(result.success){
        this.body = utils.successResult(null,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};

/**重置密码**/
controller.resetPassword = function*(){
    var params = this.request.body;
    var result = yield wsclient.resetPassword(this,params);
    if(result.success){
        this.body = utils.successResult(null,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};





module.exports = controller;
