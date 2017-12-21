<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>后台人员管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="searchInput" placeholder="姓名/手机号" class="handle-input mr10" style="width:220px"></el-input>
            <span style="font-size:14px;margin-left:30px;margin-right:10px">注册时间</span>
            <el-date-picker
                    v-model="createStartTime"
                    type="date"
                    placeholder="开始时间">
            </el-date-picker>
            <span>-</span>
            <el-date-picker
                    v-model="createEndTime"
                    type="date"
                    placeholder="结束时间">
            </el-date-picker>
            <span style="font-size:14px;margin-left:30px;margin-right:10px">状态</span>
            <el-select v-model="selectStatus" placeholder="请选择状态" class="handle-select mr10">
                <el-option
                        v-for="item in statusSearchList"
                        :key="item.value"
                        :label="item.value"
                        :value="item.code">
                </el-option>
            </el-select>

            <el-button type="primary" icon="search" @click="triggerSearch" style="margin-left:30px;">搜索</el-button>
            <el-button type="primary" class="handle-del mr10" @click="handleAdd">新增</el-button>
            <el-dialog title="新增后台人员" :visible.sync="addItemDialog" align='left'>
                <el-form :model="newItem" :rules="rules" ref="newItem" :label-position="'right'" label-width="250px" inline-message>

                    <el-form-item label="姓名" prop="userName" >
                        <el-input v-model="newItem.userName" class="row"></el-input>
                    </el-form-item>

                    <el-form-item label="用户名" prop="loginName" >
                        <el-input v-model="newItem.loginName" class="row"></el-input>
                    </el-form-item>

                    <el-form-item label="集团" prop="groupName" >
                        <el-input v-model="newItem.groupName" class="row"></el-input>
                    </el-form-item>

                    <el-form-item label="机构" prop="companyName" >
                        <el-input v-model="newItem.companyName" class="row"></el-input>
                    </el-form-item>

                    <el-form-item label="部门" prop="department" >
                        <el-input v-model="newItem.department" class="row"></el-input>
                    </el-form-item>

                    <el-form-item label="职位" prop="position" >
                        <el-input v-model="newItem.position" class="row"></el-input>
                    </el-form-item>

                    <el-form-item label="联系方式" prop="tel" >
                        <el-input v-model="newItem.tel" class="row"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email" >
                        <el-input v-model="newItem.email" class="row"></el-input>
                    </el-form-item>

                    <el-form-item label="初始密码" prop="loginPassword" >
                        <el-input v-model="newItem.loginPassword" type="password" class="row"></el-input>
                    </el-form-item>

                    <el-form-item label="用户状态" prop="status" align ='left'>
                        <el-select placeholder="请选择状态" v-model="newItem.status" class="row">
                            <el-option
                                    v-for="item in statusList"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" align='center'>
                    <el-button type="primary" @click="saveItem('newItem')">确 定</el-button>
                    <el-button @click="addItemDialog = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable" :row-style="{'height':'40px'}">
            <el-table-column prop="date" label="序号" width="70" align="center">
                <template scope="scope">
                    <span v-text="scope.$index + 1"></span>
                </template>
            </el-table-column>
            <el-table-column prop="groupName" label="集团" width="100" align="center"></el-table-column>
            <el-table-column prop="companyName" label="机构" width="100" align="center"></el-table-column>
            <el-table-column prop="department" label="部门" width="140" align="center"></el-table-column>
            <el-table-column prop="position" label="职位" width="120" align="center"></el-table-column>
            <el-table-column prop="userName" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="loginName" label="用户名" width="130" align="center">
            </el-table-column>
            <el-table-column prop="tel" label="联系方式" width="130"  align="center">
            </el-table-column>
            <el-table-column prop="email" label="邮箱地址" row-style="{font-size:12px}" width="180"  align="center">
            </el-table-column>
            <el-table-column prop="status.value" label="状态"  align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" width="180">
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" align="center" width="180">
            </el-table-column>
            <el-table-column prop="lastLoginTime" label="上次登录" align="center" width="180">
            </el-table-column>

            <el-table-column label="操作" width="150" align="center">
                <template scope="scope">
                    <el-button size="small" type="text"
                               @click="handleEdit(scope.$index, scope.row)">信息修改</el-button>
                    <el-button size="small" type="text"
                               @click="handleUpPwd(scope.$index, scope.row)">重置密码</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalRecord">
            </el-pagination>
        </div>
        <el-dialog title="修改信息" :visible.sync="editInfoDialog">
            <el-form :model="editItem" :rules="rules" ref="editItem" :label-position="'right'" label-width="250px">

                <el-form-item label="姓名" prop="userName" >
                    <el-input :value="editItem.userName" :disabled="true" class="row"></el-input>
                </el-form-item>

                <el-form-item label="用户名" prop="loginName" >
                    <el-input :value="editItem.loginName" :disabled="true" class="row"></el-input>
                </el-form-item>

                <el-form-item label="集团" prop="groupName" >
                    <el-input :value="editItem.groupName" :disabled="true" class="row"></el-input>
                </el-form-item>

                <el-form-item label="机构" prop="companyName" >
                    <el-input v-model="editItem.companyName" class="row"></el-input>
                </el-form-item>

                <el-form-item label="部门" prop="department" >
                    <el-input v-model="editItem.department" class="row"></el-input>
                </el-form-item>

                <el-form-item label="职位" prop="position" >
                    <el-input v-model="editItem.position" class="row"></el-input>
                </el-form-item>

                <el-form-item label="联系方式" prop="tel" >
                    <el-input v-model="editItem.tel" class="row"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email" >
                    <el-input v-model="editItem.email" class="row"></el-input>
                </el-form-item>

                <el-form-item label="用户状态" prop="status" align ='left'>
                    <el-select placeholder="请选择状态" v-model="editItem.status" class="row">
                        <el-option
                                v-for="item in statusList"
                                :key="item.value"
                                :label="item.value"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align='center'>
                <el-button type="primary" @click="updateUser('editItem')">确 定</el-button>
                <el-button @click="editInfoDialog = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="重置密码" :visible.sync="resetPwdDialog" align='left'>
            <el-form :model="upPwdItem" :rules="rules" ref="upPwdItem" :label-position="'right'" label-width="250px">
                <el-form-item label="姓名" prop="userName" >
                    <el-input v-model="upPwdItem.userName" :disabled="true" class="row"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="loginName" >
                    <el-input v-model="upPwdItem.loginName" :disabled="true" class="row"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newLoginPassword" >
                    <el-input v-model="upPwdItem.newLoginPassword" type="password" class="row"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmLoginPassword" >
                    <el-input v-model="upPwdItem.confirmLoginPassword" type="password" class="row"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align='center'>
                <el-button type="primary" @click="resetPassword('upPwdItem')">确 定</el-button>
                <el-button @click="resetPwdDialog = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            let regPassWord = new RegExp(/^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,30}$/);   //密码校验(6-20位数字字母特殊符号两种以上组合)
            let regEmail = new RegExp(/^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\.){1,4}[a-z]{2,4}$/);    //邮箱
            var regTel = new RegExp(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/);
            var validateTel = (rule, value, callback) => {
                if (value === '' || value == undefined) {
                    callback(new Error('请输入手机号'));
                }else{
                    if (!regTel.test(value)) {
                        callback(new Error('请输入正确的手机号'));
                    }
                    callback();
                }
            };
            var validateEmail = (rule, value, callback) => {
                if (value === '' || value == undefined) {
                    callback(new Error('请输入邮箱'));
                }else{
                    if (!regEmail.test(value)) {
                        callback(new Error('请输入正确的邮箱'));
                    }
                    callback();
                }
            };
            var validateLoginPassword = (rule, value, callback) => {
                if (value === '' || value == undefined) {
                    callback(new Error('请输入初始密码'));
                } else {
                    if(!regPassWord.test(value)){
                        callback(new Error('初始密码长度为6-30位字符，必须以数字或字母开头，由数字、字母、特殊符号至少两种组合组成'));
                    }
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if(!regPassWord.test(value)){
                    callback(new Error('密码长度为6-30位字符，必须以数字或字母开头，由数字、字母、特殊符号至少两种组合组成'));
                }else{
                    if (this.upPwdItem.confirmLoginPassword !== '') {
                        this.$refs.upPwdItem.validateField('confirmLoginPassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {

                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.upPwdItem.newLoginPassword) {
                    callback(new Error('您输入的新密码与确认密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                pageSize:30,
                totalRecord:0,
                currentPage:1,
                tableData: [],
                statusList:[],
                statusSearchList:[],
                searchInput: '',
                createStartTime:'',
                createEndTime:'',
                multipleSelection: [],
                selectStatus: '',
                newItem:{},
                editItem:{status:{}},
                tmpRow:{},
                upPwdItem:{},
                rules:{
                    userName:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 20, message: '最长20位字符', trigger: 'blur' }
                    ],loginName:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 1, max: 20, message: '最长20位字符', trigger: 'blur' }
                    ],groupName:[
                        { required: true, message: '请输入所在集团', trigger: 'blur' },
                        { min: 1, max: 20, message: '最长20位字符', trigger: 'blur' }
                    ],companyName:[
                        { required: true, message: '请输入所在机构', trigger: 'blur' },
                        { min: 1, max: 20, message: '最长20位字符', trigger: 'blur' }
                    ],department:[
                        { required: true, message: '请输入所在部门', trigger: 'blur' },
                        { min: 1, max: 20, message: '最长20位字符', trigger: 'blur' }
                    ],position:[
                        { required: true, message: '请输入职位信息', trigger: 'blur' },
                        { min: 1, max: 20, message: '最长20位字符', trigger: 'blur' }
                    ],tel:[
                        { validator: validateTel, trigger: 'blur' }
                    ],email:[
                        { validator: validateEmail, trigger: 'blur' }
                    ],
                    loginPassword:[
                        { validator: validateLoginPassword, trigger: 'blur' }
                    ],status:[
                        { required: true, message: '请选择用户状态', trigger: 'change' }
                    ],newLoginPassword: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    confirmLoginPassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                editInfoDialog: false,
                addItemDialog: false,
                resetPwdDialog: false,
                formLabelWidth: '120px'
            }
        },
        created(){
            if(localStorage.getItem('ms_index')=='1'){
                window.location.reload();
                localStorage.setItem('ms_index','2');
            }else{
                this.getDict();
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                if(val<this.pageSize){
                    this.tableData.splice(val);
                }else{
                    this.search();
                }
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.search();
            },
            resetForm(formName) {
                if( typeof this.$refs[formName]!= 'undefined'  && typeof this.$refs[formName].resetFields == 'function' ){
                    this.$refs[formName].resetFields();
                }
            },
            getDict(){
                let self = this;
                const promise = new Promise(function(resolve, reject) {
                    resource.getDictByType({
                        type:'current_status'
                    },function(result){
                        if(result.code=='000000'){
                            resolve(result);
                        }else{
                            reject(result);
                        }
                    });
                });
                promise.then(function(json) {
                    self.statusList = json.data;
                    self.statusSearchList = self.statusList.concat();
                    self.statusSearchList.unshift({
                        code:'',
                        value:'全部'
                    });
                    self.currentPage = 0;//改变currentPage的值会触发handleCurrentChange()
                }, function(json) {
                    self.$message.error(json.message);
                });
            },
            convertDict(code,arr){
                for(let i=0;i<arr.length;i++){
                    let item = arr[i];
                    if(code==item.code){
                        return item;
                    }
                }
                return {};
            },
            propertyExtend(source,target){
                for(var key in source){
                    if(source[key] != target[key] ){
                        if(typeof target[key] != 'object' || Array.isArray(target[key])){
                            target[key] = source[key];
                        }else{
                            target[key] = this.convertDict(source[key],this[key+'List']);
                        }
                    }
                }
            },
            triggerSearch(){
                if(this.currentPage == 1){
                    this.search();
                }else{
                    this.currentPage = 1;
                }
            },
            search(){
                var self = this;
                if( this.createStartTime!='' && this.createEndTime!= ''
                        && this.createEndTime-this.createStartTime<0){
                    this.$message.error('结束时间需大于开始时间');
                    this.createStartTime = '';
                    this.createEndTime = '';
                }
                resource.findUserListPage({
                    pageIndex:this.currentPage-1,
                    pageSize:this.pageSize,
                    searchInput:this.searchInput,
                    createStartTime:this.createStartTime,
                    createEndTime:this.createEndTime,
                    status:this.selectStatus
                },function(result){
                    if(result.code=='000000'){
                        self.tableData = result.data.data;
                        self.tableData.forEach(function(item,index,arr){
                            item.status = self.convertDict(item.status,self.statusList);
                        });
                        self.totalRecord = result.data.recordsTotal;
                    }else{
                        self.$message.error(result.msg);
                    }
                });
            },
            handleAdd(){
                this.newItem = {};
                this.addItemDialog = true;
                this.resetForm('newItem');
            },
            handleEdit(index, row) {
                this.tmpRow = row;
                this.editItem = {
                    id:row.id,
                    userName:row.userName,
                    loginName:row.loginName,
                    groupName:row.groupName,
                    companyName:row.companyName,
                    department:row.department,
                    position:row.position,
                    tel:row.tel,
                    email:row.email,
                    status:row.status.code
                };
                this.editInfoDialog = true;
                this.resetForm('editItem');
            },
            handleUpPwd(index, row){
                this.upPwdItem = {
                    userName:row.userName,
                    loginName:row.loginName,
                    newLoginPassword:'',
                    confirmLoginPassword:''
                };
                this.resetPwdDialog = true;
                this.resetForm('upPwdItem');
            },
            saveItem(formName){
                var self = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        resource.saveUser(self.newItem,function(result){
                            if(result.code=='000000'){
                                self.$message({
                                    message: result.msg,
                                    type: 'success'
                                });
                                self.addItemDialog = false;
                                self.currentPage = 0;
                                self.search();
                            }else{
                                self.$message.error(result.msg);
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            updateUser(formName){
                let self = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        resource.updateUser(self.editItem,function(result){
                            if(result.code=='000000'){
                                self.propertyExtend(self.editItem,self.tmpRow);
                                self.$message({
                                    message: result.msg,
                                    type: 'success'
                                });
                                self.editInfoDialog = false;
                            }else{
                                self.$message.error(result.msg);
                            }
                        });
                        console.log(self.editItem);
                    } else {
                        return false;
                    }
                });
            },
            resetPassword(formName){
                let self = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        resource.resetPassword(self.upPwdItem,function(result){
                            if(result.code=='000000'){
                                self.$message({
                                    message: result.msg,
                                    type: 'success'
                                });
                                self.resetPwdDialog = false;
                            }else{
                                self.$message.error(result.msg);
                            }
                        });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

    .handle-box{
        margin-bottom: 20px;
    }
    .handle-select{
        width: 120px;
    }
    .handle-input{
        width: 300px;
        display: inline-block;
    }
    .row{
        width:400px;
    }
</style>
