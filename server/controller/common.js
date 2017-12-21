var parse = require('co-busboy');
var fs = require('fs');
var cofs = require('co-fs');
var os = require('os');
var path = require('path');
var wsclient = require('../common/wsclient')
var constant = require('../common/constant')
var utils = require("../common/utils");
var controller = {};

controller.mock = function *() {
    var data = yield cofs.readFile(path.join(__dirname, "../mock/" + this.params[0]));
    eval("outData =" + data);
    this.body = outData;
};

/*
 * 获取cms IMG
 */
controller.getShareImg = function *() {
  if (!this.params[0]) {
      this.body = "无此图片";
  }
  var imgid = this.params[0];

  var accessPath = "/share/";

  try{
    var data = yield fs.readFile(accessPath + imgid);
    if (data) {
      this.set("Content-Type", 'image/jpeg');
      this.body = data;
    } else {
      this.body = "图片不存在";
    }
  }catch (e){
    this.body = "图片不存在";
  }

};

controller.employeeBatchSave = function *() {
    var files = parse(this.request);
    var filePath;
    var writer;
    var fileType;
    while (file = yield files) {
        var filename = file.filename;
        fileType = filename.substr(filename.lastIndexOf("."));
        filePath = path.join("/share/temp", filename);
        writer = fs.createWriteStream(filePath);
        file.pipe(writer);
    }
    var imageBuf = fs.readFileSync(filePath)
    var result = yield wsclient.employeeBatchSave(this, {
        fileStreamBase64: imageBuf.toString("base64"),
        fileType: fileType,
        custId:this.session.userInfo.custId,
        type:'EMPLOYEE'
    })
    this.body = result

};

/**生成图形验证码**/
controller.getImgCode = function *(){
    var uinfo = {
        sessionid: this.session.id||"123123"
    };
    //将验证码保存在session中
    var captcha = {
        code: 'cdde',
        time: new Date().getTime()
    };
    //invoke webservice
    var wsresult = yield wsclient.genVerifyCode(this, uinfo);
    if (wsresult.success) {
        //将验证码保存在session中
        var captcha = {
            code: wsresult.data.radomStr,
            time: new Date().getTime()
        };
        this.session.captcha = captcha;
        //将图片返回给页面
        var buffer = new Buffer(wsresult.data.base64String, 'base64');
        this.set({
            'Content-Type': 'image/png',
            'Content-Length': buffer.length
        });
        this.body = buffer;
    } else {
        this.body = utils.failResult(constant.error,null,wsresult.msg);
    }
};

/** 验证图形验证码 **/
controller.validateCaptcha = function *() {
    var vcode = this.request.body.vcode;
    if (utils.isNull(vcode)) {
        this.body = utils.failResult(constant.vcodeIsNull);
    } else if (this.session.captcha == null || new Date().getTime() - new Number(this.session.captcha.time) > 300 * 1000) { //5分钟
        this.body = utils.failResult(constant.vcodeOvertime,null);
    }
    //与session中保存的验证码对比
    else if (this.session.captcha.code.toLowerCase() != vcode.toLowerCase()) {
        this.body = utils.failResult(constant.vcodeIsIncorrect,null);
    } else {
        this.body = utils.successResult(null);
    }
};

/**字典常量**/
controller.getDictByType = function*(){
    var params = this.request.body;
    var result = yield wsclient.getDictByType(this,params);
    if(result.success){
        this.body = utils.successResult(result.data,result.msg);
    }else{
        this.body = utils.failResult(constant.error,null,result.msg);
    }
};


module.exports = controller;
