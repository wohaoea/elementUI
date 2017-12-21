/**
 * Created by Administrator on 2016/6/20.
 */
import Vue from 'vue'
import axios from 'axios'

var outExports = {
    imgCodeUrl:window.location.protocol + "//" + window.location.hostname + ":5701" + '/getImgCode?t='
};

var models = {};

var domains = "";

if (window.location.port == "8080") {
    domains = window.location.protocol + "//" + window.location.hostname + ":5701"
    axios.defaults.withCredentials = true
}

var getMethods = {
    billList:domains + '/bill/billList',
    notBillOutOrderList:domains + '/bill/notBillOutOrderList',
    OrderListForBill:domains + '/bill/OrderListForBill',
    historyBillList:domains + '/bill/historyBillList',
    getUserPwdStatus: domains + '/getUserPwdStatus',
    setDate: domains + '/setDate',
    getRepaymentsInfo: domains + '/getRepaymentsInfo',
    confirmRepay: domains + '/confirmRepay',
    realInfo: domains + '/realInfo',
    getSupportBankInfos: domains + '/getSupportBankInfos',
    findCardInfo: domains + '/findCardInfo',
    getActivityInfo: domains + '/getActivityInfo',
    merchantName: domains + '/merchantName',
    protocol: domains + '/protocol',
    generateProtocol: domains + '/generateProtocol',
    getCustFlows: domains + '/bill/getCustFlows',



};

var postMethods = {

    validateCaptcha: domains + '/validateCaptcha',              //验证图片验证码
    login: domains + '/login',                                  //登录
    loginOut: domains + '/loginOut',                            //登出
    checkUserLoginStatus: domains + '/checkUserLoginStatus',    //检测是否在其他地方登录
    findEmployeeListPage: domains + '/findEmployeeListPage',    //查询员工列表
    findEmployeeDatil: domains + '/findEmployeeDatil',          //员工详细信息
    employeeDataRefesh: domains + '/employeeDataRefesh',        //员工详细信息
    findUserListPage: domains + '/findUserListPage',            //查询后台人员信息
    saveUser: domains + '/saveUser',                            //添加后台人员信息
    updateUser: domains + '/updateUser',                        //修改后台人员信息
    updatePassword: domains + '/updatePassword',                //修改密码
    resetPassword: domains + '/resetPassword',                  //重置密码
    getDictByType: domains + '/getDictByType',                  //字典常量
    manageUploadList: domains + '/manageUploadList',            //员工管理
    batchUploadLog: domains + '/batchUploadLog',                //更新记录
    findCooperationCompanyListPage: domains + '/findCooperationCompanyListPage',    //查询机构信息
    saveCooperationCompany: domains + '/saveCooperationCompany',                    //新增机构信息
    updateCooperationCompany: domains + '/updateCooperationCompany'                 //修改机构信息
};

var jsonpMethods = {};

function turnJson(json) {
    return json;
}

function httpError(response, callback) {
    if (response.status == 200) {
        requestError(response.data, callback)
    }
    if (response.status == 404) {
        callback.call('', "404")
    }
}

function requestError(data, callback) {
    callback.call('', data)
}

Object.keys(getMethods).forEach(function(key) {
    outExports[key] = function(jsondata, callback) {
        var newJson = turnJson(jsondata);
        axios.get(getMethods[key], {params:newJson}).then((response) => {
            httpError(response, callback);
        }, (response) => {
            httpError(response, callback);
        })
    };
});

Object.keys(postMethods).forEach(function(key) {
    outExports[key] = function(jsondata, callback) {
        var newJson = turnJson(jsondata);
        axios.post(postMethods[key], newJson).then((response) => {
            httpError(response, callback);
        }, (response) => {
            httpError(response, callback);
        })
    };
});

Object.keys(jsonpMethods).forEach(function(key) {
    outExports[key] = function(jsondata, callback) {
        var newJson = turnJson(jsondata);
        axios.jsonp(jsonpMethods[key], newJson).then((response) => {
            httpError(response, callback);
        }, (response) => {
            httpError(response, callback);
        })
    };
});

export default outExports;
