webpackJsonp([9],{1e3:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"sidebar"},[o("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":e.onRoutes,theme:"dark","unique-opened":"",router:""}},[e._l(e.items,function(t){return[t.subs?[o("el-submenu",{attrs:{index:t.index}},[o("template",{attrs:{slot:"title"},slot:"title"},[o("i",{class:t.icon}),e._v(e._s(t.title))]),e._v(" "),e._l(t.subs,function(t,s){return o("el-menu-item",{key:s,attrs:{index:t.index}},[e._v(e._s(t.title)+"\n                    ")])})],2)]:[o("el-menu-item",{attrs:{index:t.index}},[o("i",{class:t.icon}),e._v(e._s(t.title)+"\n                ")])]]})],2)],1)},staticRenderFns:[]}},1003:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"wrapper"},[o("v-head"),e._v(" "),o("v-sidebar"),e._v(" "),o("div",{staticClass:"content"},[o("transition",{attrs:{name:"move",mode:"out-in"}},[o("router-view")],1)],1)],1)},staticRenderFns:[]}},1014:function(e,t,o){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"header"},[s("div",{staticClass:"logo"},[e._v("人力金融管理系统")]),e._v(" "),s("div",{staticClass:"user-info"},[s("el-dropdown",{attrs:{trigger:"click"},on:{command:e.handleCommand}},[s("span",{staticClass:"el-dropdown-link"},[s("img",{staticClass:"user-logo",attrs:{src:o(975)}}),e._v("\n                "+e._s(e.username)+"\n            ")]),e._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{command:"updatepasword"}},[e._v("修改密码")]),e._v(" "),s("el-dropdown-item",{attrs:{command:"loginout"}},[e._v("退出")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"修改密码",visible:e.upPasswordDialog,width:"30%",center:""},on:{"update:visible":function(t){e.upPasswordDialog=t}}},[s("el-form",{ref:"upPwdForm",attrs:{model:e.upPwdForm,rules:e.rules,"label-position":"right","label-width":"200px"}},[s("el-form-item",{attrs:{label:"原密码",prop:"originalLoginPassword"}},[s("el-col",{staticClass:"line",attrs:{span:18}},[s("el-input",{attrs:{type:"password"},model:{value:e.upPwdForm.originalLoginPassword,callback:function(t){e.$set(e.upPwdForm,"originalLoginPassword",t)},expression:"upPwdForm.originalLoginPassword"}})],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"新密码",prop:"newLoginPassword"}},[s("el-col",{staticClass:"line",attrs:{span:18}},[s("el-input",{attrs:{type:"password"},model:{value:e.upPwdForm.newLoginPassword,callback:function(t){e.$set(e.upPwdForm,"newLoginPassword",t)},expression:"upPwdForm.newLoginPassword"}})],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"确认密码",prop:"confirmLoginPassword"}},[s("el-col",{staticClass:"line",attrs:{span:18}},[s("el-input",{attrs:{type:"password"},model:{value:e.upPwdForm.confirmLoginPassword,callback:function(t){e.$set(e.upPwdForm,"confirmLoginPassword",t)},expression:"upPwdForm.confirmLoginPassword"}})],1)],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer",align:"center"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(t){e.updatePassword("upPwdForm")}}},[e._v("确 定")]),e._v(" "),s("el-button",{on:{click:function(t){e.upPasswordDialog=!1}}},[e._v("取 消")])],1)],1)],1)])},staticRenderFns:[]}},504:function(e,t,o){var s=o(200)(o(554),o(1003),null,null);e.exports=s.exports},553:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){var e=this;return{name:"",upPasswordDialog:!1,upPwdForm:{},rules:{originalLoginPassword:[{required:!0,message:"请输入原密码",trigger:"blur"}],newLoginPassword:[{validator:function(t,o,s){""===o?s(new Error("请输入新密码")):(""!==e.upPwdForm.confirmLoginPassword&&e.$refs.upPwdForm.validateField("confirmLoginPassword"),s())},trigger:"blur"}],confirmLoginPassword:[{validator:function(t,o,s){""===o?s(new Error("请再次输入密码")):o!==e.upPwdForm.newLoginPassword?s(new Error("两次输入密码不一致!")):s()},trigger:"blur"}]}}},created:function(){},computed:{username:function(){var e=localStorage.getItem("ms_username");return e||this.name}},methods:{checkUserLoginStatus:function(){var e=this;resource.checkUserLoginStatus({},function(t){"000000"==t.code?0==t.data.isValid?(e.$message.error("您的账号在其他地方登录"),e.$router.push("/login")):2==t.data.isValid||setTimeout(function(){e.checkUserLoginStatus()},3e3):e.$message.error(t.msg)})},handleCommand:function(e){if("loginout"==e){var t=this;resource.loginOut({loginName:this.username},function(e){"000000"==e.code?(t.$message({message:"已退出登录",type:"success"}),localStorage.removeItem("ms_username"),t.$router.push("/login")):t.$message.error(e.msg)})}"updatepasword"==e&&(this.upPwdForm={loginName:this.username,originalLoginPassword:"",newLoginPassword:"",confirmLoginPassword:""},this.upPasswordDialog=!0,this.resetForm("upPwdForm"))},resetForm:function(e){void 0!==this.$refs[e]&&"function"==typeof this.$refs[e].resetFields&&this.$refs[e].resetFields()},updatePassword:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return alert("error submit!"),!1;t.upPwdForm.loginName=t.username,resource.updatePassword(t.upPwdForm,function(e){"000000"==e.code?t.$message({message:e.msg,type:"success"}):t.$message.error(e.msg),t.upPasswordDialog=!1})})}}}},554:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o(984),r=o.n(s),i=o(985),n=o.n(i);t.default={components:{vHead:r.a,vSidebar:n.a}}},555:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{items:[{icon:"el-icon-setting",index:"readme",title:"系统管理",subs:[{index:"basetable",title:"后台人员管理"}]},{icon:"el-icon-menu",index:"2",title:"员工管理",subs:[{index:"employeeManager",title:"员工管理"},{index:"updateRecord",title:"更新记录"},{index:"employee",title:"员工信息"}]},{icon:"el-icon-date",index:"3",title:"机构信息",subs:[{index:"organization",title:"机构列表"}]}]}},computed:{onRoutes:function(){return this.$route.path.replace("/","")}}}},672:function(e,t,o){t=e.exports=o(502)(!1),t.push([e.i,".sidebar[data-v-55d36d76]{display:block;position:absolute;width:250px;left:0;top:70px;bottom:0;background:#2e363f}.sidebar>ul[data-v-55d36d76]{height:100%}",""])},684:function(e,t,o){t=e.exports=o(502)(!1),t.push([e.i,".header[data-v-fcc1de3a]{position:relative;box-sizing:border-box;width:100%;height:70px;font-size:22px;line-height:70px;color:#fff}.header .logo[data-v-fcc1de3a]{float:left;width:250px;text-align:center}.user-info[data-v-fcc1de3a]{float:right;padding-right:50px;font-size:16px;color:#fff}.user-info .el-dropdown-link[data-v-fcc1de3a]{position:relative;display:inline-block;padding-left:50px;color:#fff;cursor:pointer;vertical-align:middle}.user-info .user-logo[data-v-fcc1de3a]{position:absolute;left:0;top:15px;width:40px;height:40px;border-radius:50%}.el-dropdown-menu__item[data-v-fcc1de3a]{text-align:center}.row[data-v-fcc1de3a]{width:1000px}",""])},775:function(e,t,o){var s=o(672);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);o(503)("5573abdb",s,!0)},787:function(e,t,o){var s=o(684);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);o(503)("c62d355c",s,!0)},975:function(e,t,o){e.exports=o.p+"static/img/img.2aab7b4.jpg"},984:function(e,t,o){o(787);var s=o(200)(o(553),o(1014),"data-v-fcc1de3a",null);e.exports=s.exports},985:function(e,t,o){o(775);var s=o(200)(o(555),o(1e3),"data-v-55d36d76",null);e.exports=s.exports}});