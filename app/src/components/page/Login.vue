<template>
    <div class="login-wrap">
        <div class="ms-login">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="0px" label-position="top">
                <div class="ms-title">人力金融管理系统</div>
                <el-form-item prop="username" label="用户名" class="myStyle" style="margin-bottom: 40px;">
                    <el-input v-model="ruleForm.username" auto-complete="off" placeholder="请输入用户名" class="myStyle"></el-input>
                    <div class="line"></div>
                </el-form-item>
                <el-form-item prop="password" label="登录密码" class="myStyle" style="margin-bottom: 40px;">
                    <el-input type="password" placeholder="请输入登录密码" v-model="ruleForm.password" class="myStyle" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    <div class="line"></div>
                </el-form-item>
                <el-form-item prop="yzm" label="验证码" class="myStyle yzmInput" style="margin-bottom: 40px;">
                    <!--<div class="yzm"></div>-->
                    <img :src="imgUrl" class="yzm" @click="change">
                    <el-input type="text" placeholder="请输入右侧验证码" v-model="ruleForm.yzm" class="myStyle"></el-input>

                    <div class="line"></div>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                imgUrl:'/app/src/assets/imgs/yzm.png',
                ruleForm: {
                    username: '',
                    password: '',
                    yzm: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    yzm: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                },
                erMsg:''
            }
        },
        created(){
            this.imgUrl = resource.imgCodeUrl + new Date().getTime();
        },
        methods: {
            submitForm(formName) {
                var self = this;
                this.$refs[formName].validate(function(valid){
                    if (valid){
                        const promise = new Promise(function(resolve, reject) {
                            resource.validateCaptcha({
                                vcode:self.ruleForm.yzm
                            },function(result){
                                if(result.code=='000000'){
                                    resolve(result);
                                }else{
                                    reject(result);
                                }
                            });
                        });
                        promise.then(function(json) {
                            resource.login({
                                loginName:self.ruleForm.username,
                                loginPassword:self.ruleForm.password
                            },function(result){
                                if(result.code=='000000'){
                                    localStorage.setItem('ms_loginName',self.ruleForm.username);
                                    localStorage.setItem('ms_userName',result.data.userName);
                                    localStorage.setItem('ms_index','1');
                                    self.$router.push('/basetable');
                                }else{
                                    self.erMsg = result.msg;
                                    self.errorMsg();
                                }
                            })
                        }, function(json) {
                            self.erMsg = json.msg;
                            self.errorMsg();
                        });
//                        resource.validateCaptcha({
//                            vcode:self.ruleForm.yzm
//                        },function(result){
//                            if(result.code=='000000'){
//                                self.$router.push('/basetable');
//                            }else{
//                                self.erMsg = result.msg;
//                                self.errorMsg();
//                            }
//                        });
                    }else{
                        return false;
                    }
                });
            },
            change(){
                this.imgUrl = resource.imgCodeUrl + new Date().getTime();
            },
            errorMsg(){
                this.$message.error(this.erMsg);
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url('../../assets/imgs/bg.png');
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        background-size: cover;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
    }
    .ms-title{
        /* position: absolute; */
        width:100%;
        margin-top: 42px;
        text-align: center;
        font-size:24px;
        color: #fff;
        margin-bottom: 34px;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width: 640px;
        height: 640px;
        margin:-320px 0 0 -320px;
        padding:30px 120px;
        box-sizing: border-box;
        border-radius: 5px;
        background: url('../../assets/imgs/area.png') 0 0 no-repeat;
    }
    .login-btn{
        text-align: center;
        /* margin-top: 38px; */
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .line{
        background: url('../../assets/imgs/line.png') 0 0 no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 2px;
    }
    .yzm{
        /*background: url('../../assets/imgs/yzm.png') 0 0 no-repeat;*/
        /*background-size: 100% 100%;*/
        width: 75px;
        height: 35px;
        float: right;
    }
</style>

<style>
    .yzmInput .myStyle{
        width: 80%;
        /* float: left; */

    }

    .myStyle .el-input__inner{
        height: 58px;
        background-color: rgba(0,0,0,0);
        border: none;
        padding: 0;
        color: #fff;
    }

    ::-webkit-input-placeholder {
        color: #ffffff!important;
        opacity: .2!important;
    }


    .myStyle .el-form-item__label{
        font-size: 18px;
        color: #fff;
        padding: 0;
        font-family: 'Microsoft YaHei'
    }

    .login-btn .el-button--primary{
        width: 280px!important;
        height: 60px!important;
        background-color: #ff5a6d;
        border-color: #ff5a6d;
        border-radius: 30px;
        font-size: 18px;
    }


</style>


