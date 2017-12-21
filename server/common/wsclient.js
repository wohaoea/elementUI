/**
 * Created by xiongze on 2017/4/20.
 */
var request = require('koa-request');
var config = require('../config/config.js')
var wsclient = {}

var common = {
  get: {
      "simulation": "http://192.168.101.161:3500/simulation?a=1&b=2"
  },
  post:{
      "genVerifyCode": config.domain1 + "verifyCode/genVerifyCode",                       //获取图片验证码
      "getDictByType":config.domain + "dict/getDictByType",                               //获取字典常量
      "userLogin": config.domain + "users/userLogin",                                     //用户登录
      "userLoginOut": config.domain + "users/userLoginOut",                               //用户登出
      "checkUserLoginStatus": config.domain + "users/checkUserLoginStatus",               //检测是否在其他地方登录
      "resetPassword": config.domain + "users/resetPassword",                             //重置密码
      "updatePassword": config.domain + "users/updatePassword",                           //修改密码
      "manageUploadList": config.domain + "employee/manageUploadList",                    //员工管理
      "batchUploadLog": config.domain + "employee/batchUploadLog",                        //上传日志
      "findEmployeeListPage": config.domain + "employee/findEmployeeListPage",            //查询员工列表
      "employeeDataRefesh": config.domain + "employee/employeeDataRefesh",                //刷新员工
      "findEmployeeDatil": config.domain + "employee/findEmployeeDatil",                  //员工详细信息
      "findUserListPage": config.domain + "users/findUserListPage",                       //查询后台人员信息
      "saveUser": config.domain + "users/saveUser",                                       //添加后台人员信息
      "updateUser": config.domain + "users/updateUser",                                   //修改后台人员信息
      "saveCooperationCompany": config.domain + "company/saveCooperationCompany",         //新增机构信息
      "findCooperationCompanyListPage": config.domain + "company/findCooperationCompanyListPage",         //查询机构信息
      "updateCooperationCompany": config.domain + "company/updateCooperationCompany",     //修改机构信息                                 
      "employeeBatchSave": config.domain + "employee/batchSave"
  }
};

Object.keys(common.get).forEach(function(key) {
  wsclient[key] = function *(self, jsondata, callback){
    return yield funFactory(self, "GET", common.get[key], jsondata, callback);
  };
});
Object.keys(common.post).forEach(function(key) {
  wsclient[key] = function *(self, jsondata, callback){
    return yield funFactory(self, "POST", common.post[key], jsondata, callback);
  }
});


function *funFactory(self, method,  url , jsondata, callback) {
  if(self.config.env=="local"){
    console.log("Start to invoke web service : " ,url)
    console.log("Invoke web service data is : ", jsondata);
  }else if(self.config.debug){
    self.logger.request("Start to invoke web service : " ,url);
    self.logger.request("Invoke web service data is : ", jsondata);
  }

  if(typeof callback == "function"){
    request({
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      requesConfig: {
        timeout: 1000
      },
      responseConfig: {
        timeout: 1000
      },
      url: url, //
      method: method,
      json:true,
      body:jsondata
    })(function(e, response){
      if(e){
        if(self.config.env=="local"){
          console.log("Finish to invoke web service : ", url);
          console.log("Invoke web service is error: ", e);
        }else if(self.config.debug){
          self.app.logger.request("Finish to invoke web service : ", url);
          self.app.logger.request("Invoke web service is error: ", e);
        }
        callback({fail:true})
      }else{
        if(self.config.env=="local"){
          console.log("Finish to invoke web service : ", url);
          console.log("Invoke web service result is : ", response.body);
        }else if(self.config.debug) {
          self.app.logger.request("Finish to invoke web service : ", url);
          self.app.logger.request("Invoke web service result is : ", response.body);
        }
        callback(response.body);
      }
    })
    return null;
  }

  try {
    var response = yield request({
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      requesConfig: {
        timeout: 1000
      },
      responseConfig: {
        timeout: 1000
      },
      url: url, //
      method: method,
      json:true,
      body:jsondata
    });
  } catch (e){
    if(self.config.env=="local"){
      console.log("Finish to invoke web service : ", url);
      console.log("Invoke web service is error: ", e);
    }else if(self.config.debug){
      self.app.logger.request("Finish to invoke web service : ", url);
      self.logger.request("Invoke web service is error: ", e);
    }
    return {fail:true};
  }
  if(self.config.env=="local"){
    console.log("Finish to invoke web service : ", url);
    console.log("Invoke web service result is : ", response.body);
  }else if(self.config.debug) {
    self.app.logger.request("Finish to invoke web service : ", url);
    self.app.logger.request("Invoke web service result is : ", response.body);
  }

  return response.body;
}

module.exports = wsclient;
