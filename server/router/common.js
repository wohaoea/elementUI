/**
 *  虚拟银行卡公用接口
 */
var controller = require('../controller/common');
module.exports = function(app) {
    // 模拟数据
    app.post(/^\/mock\/([\w\/]*)$/,controller.mock);
    // 获取cms IMG
    app.get(/^\/share\/([\w\/\.\-\_]+)$/, controller.getShareImg);
    // 文件上传
    app.post("/employeeBatchSave", controller.employeeBatchSave);
    //生成图形验证码
    app.get("/getImgCode", controller.getImgCode);
    //验证图形验证码
    app.post("/validateCaptcha", controller.validateCaptcha);
    //字典常量
    app.post("/getDictByType", controller.getDictByType);
};

