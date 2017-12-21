/**
 *  机构管理
 */
var controller = require('../controller/organizationManager');
module.exports = function(app) {
    app.post("/findCooperationCompanyListPage", controller.findCooperationCompanyListPage);   //查询机构信息
    app.post("/saveCooperationCompany", controller.saveCooperationCompany);   //添加机构信息
    app.post("/updateCooperationCompany", controller.updateCooperationCompany);   //修改机构信息
};

