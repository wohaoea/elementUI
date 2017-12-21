/**
 * Created by Administrator on 2017/11/10.
 */

var wsclient = require('../common/wsclient');
var constant = require('../common/constant');
var utils = require("../common/utils");
var controller = {};


/**员工管理**/
controller.manageUploadList = function*(){
    var params = this.request.body;
    var result = yield wsclient.manageUploadList(this,params);
    if(result.success){
        this.body = utils.successResult(result.data,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};

/**更新记录**/
controller.batchUploadLog = function*(){
    var params = this.request.body;
    params.custId = this.session.userInfo.custId;
    var result = yield wsclient.batchUploadLog(this,params);
    if(result.success){
        this.body = utils.successResult(result.data,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};

/**员工列表**/
controller.findEmployeeListPage = function*(){
    var params = this.request.body;
    params.custId = this.session.userInfo.custId;
    var result = yield wsclient.findEmployeeListPage(this,params);
    if(result.success){
        this.body = utils.successResult(result.data,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};


/**员工详细信息**/
controller.findEmployeeDatil = function*(){
    var params = this.request.body;
    var result = yield wsclient.findEmployeeDatil(this,params);
    if(result.success){
        this.body = utils.successResult(result.data,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};

/**员工数据刷新**/
controller.employeeDataRefesh = function*(){
    var params = this.request.body;
    params.custId = this.session.userInfo.custId;
    var result = yield wsclient.employeeDataRefesh(this,params);
    if(result.success){
        this.body = utils.successResult(result.data,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};

module.exports = controller;
