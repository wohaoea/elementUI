<template>
    <div class="wrap">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>
                    员工管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>员工信息</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <p class="number">员工数：<span v-text="recordsTotal"></span></p>
        <el-row :gutter="20">
            <el-col :span="5">
                <el-input v-model="searchInfo.searchInput" placeholder="用户名、姓名、手机号、机构"></el-input>
            </el-col>
            <el-col :span="8">
                <span class="search-label">注册时间</span>
                <el-date-picker
                        v-model="searchInfo.registerBeginTime"
                        type="date"
                        placeholder="开始时间">
                </el-date-picker>
                <span>-</span>
                <el-date-picker
                        v-model="searchInfo.registerEndTime"
                        type="date"
                        placeholder="结束时间">
                </el-date-picker>
            </el-col>
            <el-col :span="3">
                <span class="search-label">状态</span>
                <el-select v-model="searchInfo.workStatus" clearable  placeholder="全部" class="handle-select width-110">
                    <el-option
                            v-for="item in workStatusList"
                            :key="item.code"
                            :label="item.value"
                            :value="item.code"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" icon="search" @click="triggerSearch">搜索</el-button>
            </el-col>
        </el-row>


        <el-row :gutter="20" class="m-top20">
            <el-col :span="3">
                <span class="search-label">是否待还</span>
                <el-select v-model="isWaitPayCode" clearable  placeholder="请选择" class="handle-select width-100">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <span class="search-label">是否逾期</span>
                <el-select v-model="isOverDueCode" placeholder="全部" class="handle-select width-100">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <span class="search-label">信用借款</span>
                <el-select v-model="creditLoanStatusCode" placeholder="全部" class="handle-select width-100">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="开通" value="1"></el-option>
                    <el-option label="未开通" value="0"></el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <span class="search-label">虚拟信用卡</span>
                <el-select v-model="virtualCreditCardStatusCode" placeholder="全部" class="handle-select width-100">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="开通" value="1"></el-option>
                    <el-option label="未开通" value="0"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" class="statistics-time">
                <span class="search-label">数据统计截止时间:</span>
                <span class="search-label" v-text="lastUpdateTime"></span>
                <el-button type="primary" plain size="small" @click="refresh">刷新</el-button>
            </el-col>
        </el-row>

        <el-table class="m-top20" :data="tableData" v-loading="loading" border style="width: 100%" :row-style="{'height':'40px'}">
            <el-table-column prop="date" label="序号" width="70" align="center">
                <template scope="scope">
                    <span v-text="scope.$index + 1"></span>
                </template>
            </el-table-column>
            <el-table-column prop="companyName" label="机构" align="center" width="250" ></el-table-column>
            <el-table-column prop="department" label="部门" width="150" align="center"></el-table-column>
            <el-table-column prop="position" label="职位" align="center" width="110"></el-table-column>
            <el-table-column prop="custName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="tel" label="手机号码" width="130" align="center"></el-table-column>
            <el-table-column prop="registerTime" label="注册时间" width="180" align="center"></el-table-column>
            <el-table-column prop="loginName" label="用户名" width="150" align="center"></el-table-column>
            <el-table-column prop="creditScore" label="信用评分" width="100" align="center"></el-table-column>
            <el-table-column prop="creditLimit" label="信用额度" width="100" align="center"></el-table-column>
            <el-table-column prop="creditLoan" label="信用借款" width="100" align="center"></el-table-column>
            <el-table-column prop="virtualCreditCard" label="虚拟信用卡" width="110" align="center"></el-table-column>
            <el-table-column prop="nowWaitPay" label="当前待还" width="100" align="center"></el-table-column>
            <el-table-column prop="nowOverdue" label="当前逾期" width="100" align="center"></el-table-column>
            <el-table-column label="操作" align="center" >
                <template scope="scope" >
                    <el-button type="text" size="small" @click="showDialog( scope.$index,scope.row )">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageIndex"
                    :page-sizes="[10, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="recordsTotal">
            </el-pagination>
        </div>
        <el-dialog title="员工信息" :visible.sync="dialogShow">
            <el-tabs v-model="activeTab" type="card">
                <el-tab-pane label="基本信息" name="baseInfo"></el-tab-pane>
                <el-tab-pane label="信用信息" name="creditInfo"></el-tab-pane>
                <div v-show="activeTab=='baseInfo'">
                    <h3 class="bg-gray">注册信息</h3>
                    <el-row class="border-top-left">
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>用户名:</span>
                                <span v-text="dialogInfo.loginName"></span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>注册时间:</span>
                                <span v-text="dialogInfo.registerTime"></span>
                            </div>
                        </el-col>
                    </el-row>

                    <h3 class="bg-gray m-top20">基本信息</h3>
                    <el-row class="border-top-left">
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>姓名:</span>
                                <span v-text="dialogInfo.custName"></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>身份证号码:</span>
                                <span v-text="dialogInfo.certNo"></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>手机号码:</span>
                                <span v-text="dialogInfo.tel"></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>性别:</span>
                                <span v-text="dialogInfo.sex"></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>年龄:</span>
                                <span v-text="dialogInfo.age"></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>婚姻状况:</span>
                                <span v-text="dialogInfo.maritalStatus"></span>
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>现住址:</span>
                                <span v-text="dialogInfo.familyAddr"></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right"></div>
                        </el-col>
                    </el-row>

                    <h3 class="bg-gray m-top20">工作信息</h3>
                    <el-row class="border-top-left">
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>集团:</span>
                                <span v-text="dialogInfo.groupName"></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>机构:</span>
                                <span v-text="dialogInfo.companyName"></span>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>部门:</span>
                                <span v-text="dialogInfo.department"></span>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>职位:</span>
                                <span v-text="dialogInfo.position"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>公司省份:</span>
                                <span v-text="dialogInfo.workProvince"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>公司城市:</span>
                                <span v-text="dialogInfo.workCity"></span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>公司地址:</span>
                                <span v-text="dialogInfo.workAddr"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>公司电话:</span>
                                <span v-text="dialogInfo.companySpecialPlane"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>入职时间:</span>
                                <span v-text="(dialogInfo.entryDate||'').substring(0,10)"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>劳动关系:</span>
                                <span v-text="dialogInfo.laborRelationsType"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>月薪范围:</span>
                                <span v-text="dialogInfo.monthlySalaryRange"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>工作状态:</span>
                                <span v-text="dialogInfo.workStatus.value"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>离职时间:</span>
                                <span v-text="(dialogInfo.leaveDate||'').substring(0,10)"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right"></div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right"></div>
                        </el-col>
                    </el-row>


                    <h3 class="bg-gray m-top20">紧急联系人</h3>
                    <el-row class="border-top-left">
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>联系人:</span>
                                <span v-text="dialogInfo.emergencyContactsName"></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>联系人手机号:</span>
                                <span v-text="dialogInfo.emergencyContactsMobile"></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>关系:</span>
                                <span v-text="dialogInfo.emergencyContactsRelation"></span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="activeTab=='creditInfo'">
                    <h3 class="bg-gray">认证情况</h3>
                    <el-row class="border-top-left">
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>手机认证:</span>
                                <span v-text="dialogInfo.phoneAuth ? '【√】' : '【×】' "></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>身份认证:</span>
                                <span v-text="dialogInfo.certAuth ? '【√】' : '【×】' "></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>人脸认别:</span>
                                <span v-text="dialogInfo.faceAuth ? '【√】' : '【×】' "></span>
                            </div>
                        </el-col>
                    </el-row>

                    <h3 class="bg-gray m-top20">信用情况</h3>
                    <el-row class="border-top-left">
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>信用评分:</span>
                                <span v-text="dialogInfo.creditScore"></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>开通功能:</span>
                                <span v-text="dialogInfo.creditLoan ? '【信用借款】' : '' "></span>
                                <span v-text=" dialogInfo.virtualCreditCard ? '【虚拟信用卡】' : '' "></span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>虚拟信用卡类别:</span>
                                <span v-text="dialogInfo.virtualCreditCardType"></span>
                            </div>
                        </el-col>
                    </el-row>

                    <h3 class="bg-gray m-top20">信用历史</h3>
                    <el-row class="border-top-left">
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>当前待还:</span>
                                <span v-text=" dialogInfo.nowWaitPay ? '【√】' : '【×】' "></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>当前待还总额:</span>
                                <span v-text="dialogInfo.nowWaitPayTotalAmount"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>当前逾期:</span>
                                <span v-text="dialogInfo.nowOverdue ? '【√】' : '【×】' "></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>当前逾期天数:</span>
                                <span v-text="dialogInfo.nowOverdueDays"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>历史逾期:</span>
                                <span v-text="dialogInfo.historyOverdue ? '【√】' : '【×】' "></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>历史逾期期数:</span>
                                <span v-text="dialogInfo.historyOverdueTerm"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right">
                                <span>最长历史逾期天数:</span>
                                <span v-text="dialogInfo.longestHistoryOverdueDays"></span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark height36 border-bottom-right"></div>
                        </el-col>
                    </el-row>

                </div>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogShow = false">关 闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="refreshDialog" width="30%">
            <p>数据更新中,请等待...</p>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                pageSize:30,
                recordsTotal:null,
                pageIndex:1,
                lastUpdateTime:'',

                creditLoanStatusCode:'',        //信用借款状态
                virtualCreditCardStatusCode:'', //虚拟信用卡状态
                isWaitPayCode:'',               //是否待还
                isOverDueCode:'',               //是否逾期
                searchInfo:{
                    searchInput:'',                 //搜索框内容
                    registerBeginTime:'',           //注册开始时间
                    registerEndTime:'',             //注册结束时间
                    workStatus:'',                  //工作状态
                    pageSize:30,                    //每页显示数据
                    pageIndex:0                     //当前页码
                },
                workStatusList:null,                //工作状态
                laborRelationsTypeList:null,        //劳动关系
                activeTab:'baseInfo',
                dialogShow:false,
                refreshDialog:false,
                dialogInfo:{workStatus:{}},
                tableData:[],
                loading:false
            }
        },
        created(){
            this.getDict();
            let now = new Date();
            const nowDate = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate();
            const seven = parseInt((new Date(nowDate + ' 07:00').getTime() - now.getTime()));
            const twelve = parseInt((new Date(nowDate + ' 12:00').getTime() - now.getTime()));
            const eighteen = parseInt((new Date(nowDate + ' 18:00').getTime() - now.getTime()));
            this.timing(seven);
            this.timing(twelve);
            this.timing(eighteen);
        },
        methods:{
            timing(arg){
                let self = this;
                if(arg>0){
                    setTimeout(function(){
                        self.refresh();
                    },arg)
                }
            },
            refresh(){
                let self = this;
                self.refreshDialog = true;
                resource.employeeDataRefesh({},function(result){
                    if(result.code=='000000'){
                        self.search();
                    }else{
                        self.$message.error(result.msg);
                    }
                    self.refreshDialog = false;
                });
            },
            handleSizeChange(val) {
                if(val<this.pageSize){
                    this.tableData.splice(val);
                    this.pageSize = val;
                    this.searchInfo.pageSize = val;
                }else{
                    this.pageSize = val;
                    this.searchInfo.pageSize = val;
                    this.search();
                }
            },
            handleCurrentChange(val){
                this.pageIndex = val;
                this.searchInfo.pageIndex = val-1;
                this.search();
            },
            getDict(){
                let self = this;
                const p1 = new Promise(function(resolve, reject) {
                    resource.getDictByType({type:'work_status'},function(result){
                        if(result.code=='000000'){
                            resolve(result);
                        }else{
                            reject(result);
                        }
                    });
                });
                p1.then(function(json) {
                    self.workStatusList = json.data;
                }, function(json) {
                    self.$message.error(json.message);
                });

                const p2 = new Promise(function(resolve, reject) {
                    resource.getDictByType({
                        type:'labor_relations_type'
                    },function(result){
                        if(result.code=='000000'){
                            resolve(result);
                        }else{
                            reject(result);
                        }
                    });
                });
                p2.then(function(json) {
                    self.laborRelationsTypeList = json.data;
                }, function(json) {
                    self.$message.error(json.msg);
                });

                this.search();
            },
            triggerSearch(){
                if(this.pageIndex == 1){
                    this.search();
                }else{
                    this.pageIndex = 1;
                }
            },
            search(){
                var self = this;
                if( this.searchInfo.registerEndTime!='' && this.searchInfo.registerBeginTime!= ''
                    && this.searchInfo.registerEndTime-this.searchInfo.registerBeginTime < 0 ){
                    this.$message.error('结束时间需大于开始时间');
                    this.searchInfo.registerBeginTime = '';
                    this.searchInfo.registerEndTime = '';
                    return;
                }
                this.searchInfo.registerBeginTime = this.convertTime(this.searchInfo.registerBeginTime);
                this.searchInfo.registerEndTime = this.convertTime(this.searchInfo.registerEndTime);
                this.searchInfo.creditLoanStatus = this.searchConvert(this.creditLoanStatusCode);
                this.searchInfo.virtualCreditCardStatus = this.searchConvert(this.virtualCreditCardStatusCode);
                this.searchInfo.isWaitPay = this.searchConvert(this.isWaitPayCode);
                this.searchInfo.isOverDue = this.searchConvert(this.isOverDueCode);

                resource.findEmployeeListPage(self.searchInfo,function(result){
                    if(result.code=='000000'){
                        self.tableData = result.data.pageResult.data;
                        self.tableData.forEach(function(item,index,arr){
                            item.nowOverdue = item.nowOverdue ? '【√】' : '【×】';
                            item.nowWaitPay = item.nowWaitPay ? '【√】' : '【×】';
                            item.virtualCreditCard = item.virtualCreditCard ? '【√】' : '【×】';
                            item.creditLoan = item.creditLoan ? '【√】' : '【×】';
                            item.workStatus = self.convertDict(item.workStatus,self.workStatusList);
                        });
                        self.recordsTotal = result.data.recordsTotal;
                        self.lastUpdateTime = result.data.lastUpdateTime;
                    }else{
                        self.$message.error(result.msg);
                    }
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
            convertTime(date){
                if(date instanceof Date){
                    let year = date.getFullYear();
                    let month = date.getMonth()+1;
                    let day = date.getDate();
                    return year + '-' + (month<10?'0'+month:month) + '-' + (day<10?'0'+day:day);
                }else{
                    return date;
                }
            },
            searchConvert(val){
                if(val!=''){
                    return val==!!val;
                }
                return val;
            },
            showDialog( index , item ){
                let self = this;
                resource.findEmployeeDatil({id:item.id},function(result){
                    if(result.code=='000000'){
                        self.dialogInfo = result.data || {};
                        self.dialogInfo.workStatus = self.convertDict(self.dialogInfo.workStatus,self.workStatusList).value;
                        self.dialogInfo.laborRelationsType = self.convertDict(self.dialogInfo.laborRelationsType,self.workStatusList).value;
                        self.dialogShow = true;
                    }else{
                        self.$message.error(result.msg);
                    }
                });

            }
        }
    }
</script>

<style scoped>
    .search-label{
        font-size:14px;
        margin-right:10px;
    }
    .width-100{
        width: 100px;
    }
    .width-110{
        width: 110px;
    }
    .m-top20{
        margin-top: 20px;
    }
    .statistics-time{
        padding-top: 15px;
    }
    .statistics-time span{
        color: #FA5555;
    }
    .height36{
        height: 36px;
        line-height: 36px;
        box-sizing: border-box;
        text-indent: 18px;
    }
    .border-top-left{
        border-top: 1px solid #d1dbe5;
        border-left: 1px solid #d1dbe5;
    }
    .border-bottom-right{
        border-bottom: 1px solid #d1dbe5;
        border-right: 1px solid #d1dbe5;
    }
    .number{
        color: #8492A6;
        margin-bottom: 20px;
    }
    .bg-gray{
        background-color: #E5E9F2;
    }
    h3{
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        font-weight: 500;
        background-color: #E5E9F2;
        text-indent: 18px;
    }
    .page-bottom{
        position: absolute;
        bottom: 20px;
        right: 40px;
    }

</style>
