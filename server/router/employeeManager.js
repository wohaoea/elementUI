/**
 *  员工管理
 */
var controller = require('../controller/employeeManager');
module.exports = function(app) {
    app.post("/findEmployeeListPage", controller.findEmployeeListPage);   //查询员工列表
    app.post("/findEmployeeDatil", controller.findEmployeeDatil);   //查询员工列表
    app.post("/manageUploadList", controller.manageUploadList);     //员工管理
    app.post("/batchUploadLog", controller.batchUploadLog);         //更新记录
    app.post("/employeeDataRefesh", controller.employeeDataRefesh);         //更新记录
};

