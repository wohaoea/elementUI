<template>
    <div class="header">
        <div class="logo">人力金融管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <!--<img class="user-logo" src="../../../static/img/img.jpg">-->
                    欢迎，{{userName}}&nbsp;&nbsp;
                    <i class="el-icon-arrow-down"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="updatepasword">修改密码</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dialog title="修改密码" :visible.sync="upPasswordDialog" width="30%" center>
                <el-form ref="upPwdForm" :model="upPwdForm" :rules="rules"  :label-position="'right'" label-width="200px">

                    <el-form-item label="姓名" >
                        <el-col class="line" :span="18">
                            <el-input :value="upPwdForm.userName" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="用户名" >
                        <el-col class="line" :span="18">
                            <el-input :value="upPwdForm.loginName" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="原密码" prop="originalLoginPassword" >
                        <el-col class="line" :span="18">
                            <el-input type="password" v-model="upPwdForm.originalLoginPassword" ></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="新密码" prop="newLoginPassword">
                        <el-col class="line" :span="18">
                            <el-input type="password" v-model="upPwdForm.newLoginPassword" ></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="confirmLoginPassword">
                        <el-col class="line" :span="18">
                            <el-input type="password" v-model="upPwdForm.confirmLoginPassword" ></el-input>
                        </el-col>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer" align='center'>
                    <el-button type="primary" @click="updatePassword('upPwdForm')">确 定</el-button>
                    <el-button @click="upPasswordDialog = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            let regPassWord = new RegExp(/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,30}$/);
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if(!regPassWord.test(value)){
                    callback(new Error('密码长度为6-30位字符，必须以数字或字母开头，由数字、字母、特殊符号至少两种组合组成'));
                } else {
                    if (this.upPwdForm.confirmLoginPassword !== '') {
                        this.$refs.upPwdForm.validateField('confirmLoginPassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.upPwdForm.newLoginPassword) {
                    callback(new Error('您输入的新密码与确认密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                loginName: '',
                userName: '',
                upPasswordDialog:false,
                upPwdForm: {},
                rules:{
                    originalLoginPassword:[
                        { required: true, message: '请输入原密码', trigger: 'blur' }
                    ],
                    newLoginPassword: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    confirmLoginPassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.loginName = localStorage.getItem('ms_loginName');
            this.userName = localStorage.getItem('ms_userName');
//            this.checkUserLoginStatus();
        },
        methods:{
            checkUserLoginStatus(){
                var self = this;
                resource.checkUserLoginStatus({},function(result){
                    if(result.code=='000000'){
                        if(result.data.isValid==false){
                            self.$message.error('您的账号在其他地方登录');
                            self.$router.push('/login');
                        }else if(result.data.isValid==2){

                        }else{
                            setTimeout(function(){
                                self.checkUserLoginStatus();
                            },3000);
                        }
                    }else{
                        self.$message.error(result.msg);
                    }
                });
            },
            handleCommand(command) {
                if(command == 'loginout'){
                    let self = this;
                    resource.loginOut({loginName:this.loginName},function(result){
                        if(result.code=='000000'){
                            self.$message({
                                message: '已退出登录',
                                type: 'success'
                            });
                            localStorage.removeItem('ms_loginName');
                            self.$router.push('/login');
                        }else{
                            self.$message.error(result.msg);
                        }
                    });

                }
                if(command == 'updatepasword'){
                    this.upPwdForm = {
                        userName:localStorage.getItem('ms_userName'),
                        loginName:localStorage.getItem('ms_loginName'),
                        originalLoginPassword: '',
                        newLoginPassword: '',
                        confirmLoginPassword: ''
                    };
                    this.upPasswordDialog = true;
                    this.resetForm('upPwdForm');
                }
            },
            resetForm(formName) {
                if( typeof this.$refs[formName]!= 'undefined'  && typeof this.$refs[formName].resetFields == 'function' ){
                    this.$refs[formName].resetFields();
                }
            },
            updatePassword(formName){
                let self = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        resource.updatePassword(self.upPwdForm,function(result){
                            if(result.code=='000000'){
                                self.$message({
                                    message: result.msg,
                                    type: 'success'
                                });
                                self.upPasswordDialog = false;
                            }else{
                                self.$message.error(result.msg);
                            }
                        });
                    }else{
                        return false;
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .row{
        width: 1000px;
    }
</style>
