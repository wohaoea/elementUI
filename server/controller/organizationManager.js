/**
 * Created by Administrator on 2017/11/10.
 */

var wsclient = require('../common/wsclient');
var constant = require('../common/constant');
var utils = require("../common/utils");
var controller = {};


/**机构列表**/
controller.findCooperationCompanyListPage = function*(){
    var params = this.request.body;
    var result = yield wsclient.findCooperationCompanyListPage(this,params);
    if(result.success){
        this.body = utils.successResult(result.data,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};

/**添加机构**/
controller.saveCooperationCompany = function*(){
    var params = this.request.body;
    params.custId = this.session.userInfo.custId;
    var result = yield wsclient.saveCooperationCompany(this,params);
    if(result.success){
        this.body = utils.successResult(result.data,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};

/**编辑机构信息**/
controller.updateCooperationCompany = function*(){
    var params = this.request.body;
    var result = yield wsclient.updateCooperationCompany(this,params);
    if(result.success){
        this.body = utils.successResult(result.data,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};





module.exports = controller;
