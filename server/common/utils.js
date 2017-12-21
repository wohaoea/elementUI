/**
 * Created by xiongze on 2017/4/20.
 */
var constant = require("./constant")
var utils = {};

// 相应数据
function resultVo(code, data, msg) {
    this.code = code;
    this.data = data;
    this.msg = msg;
}


utils.failResult = function (code, data ,msg) {
    return new resultVo(code.code, data, msg||code.message)
}

utils.successResult = function (data, msg) {
    return new resultVo(constant.success.code, data, msg || constant.success.message)
}

utils.dealCard = function (cardNo){
    var newCardNo = '';
    if(cardNo){
        newCardNo = cardNo.slice(0,4) + '********' + cardNo.slice(-4)
        return newCardNo
    }
}

/** 判断一个对象是否为空 **/
utils.isNull = function(obj) {
    return !obj || obj == null || (typeof(obj) == 'string' && obj.trim().length == 0);
};

module.exports = utils;
