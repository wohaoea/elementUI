<template>
    <div class="wrap">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>机构信息</el-breadcrumb-item>
                <el-breadcrumb-item>机构列表</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <el-input v-model="searchInfo.searchInput" placeholder="机构名称"  style="width: 180px"></el-input>
        <el-select v-model="searchInfo.status" placeholder="请选择" class="m-left20">
            <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.value"
                :value="item.code">
            </el-option>
        </el-select>
        <el-button type="primary" icon="search" @click="triggerSearch" class="m-left20">搜索</el-button>
        <el-button @click="handleAdd" class="m-left20">新增</el-button>

        <el-table class="table-list" :data="tableData"border style="" :row-style="{height:'30px'}">
            <el-table-column label="序号" width="70" scope="scope" align="center">
                <template scope="scope">
                    <span v-text="scope.$index+1"></span>
                </template>
            </el-table-column >
            <el-table-column prop="companyName" label="机构名称"  align="center" ></el-table-column>
            <el-table-column prop="industryCategory.value" label="行业类别" align="center" width="190" ></el-table-column>
            <el-table-column prop="companyNature.value" label="企业性质" align="center" width="120"></el-table-column>
            <el-table-column prop="companyScale.value" label="企业人数" align="center"  width="130"></el-table-column>
            <el-table-column prop="createTime" label="新增时间" align="center" width="180"></el-table-column>
            <el-table-column prop="status.value" label="当前状态" align="center" width="130"></el-table-column>
            <el-table-column prop="creditLoan" label="信用借款" align="center" width="120"></el-table-column>
            <el-table-column prop="virtualCreditCard" label="虚拟信用卡" align="center" width="120"></el-table-column>
            <el-table-column  label="操作" align="center">
                <template scope="scope">
                    <el-button @click="changeOrgStatus('normal', scope.$index, scope.row)" type="text" size="small" v-if="scope.row.status.code=='forbidden'">开通</el-button>
                    <el-button @click="changeOrgStatus('forbidden', scope.$index, scope.row)" type="text" size="small" v-if="scope.row.status.code=='normal'">禁用</el-button>
                    <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div>
            <el-dialog title="编辑机构" :visible.sync="editInfoDialog">
                <el-form :model="editItem" :rules="rules" ref="editItem" :label-position="'right'" label-width="250px">
                    <el-form-item label="机构名称">
                        <el-input :value="editItem.companyName" :disabled="true" class="w400"></el-input>
                    </el-form-item>
                    <el-form-item label="行业类别">
                        <el-select v-model="editItem.industryCategory" placeholder="请选择行业类别" class="w400">
                            <el-option
                                    v-for="item in industryCategoryList"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="机构性质">
                        <el-select v-model="editItem.companyNature" placeholder="请选择机构性质" class="w400">
                            <el-option
                                    v-for="item in companyNatureList"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.code">
                            </el-option>

                        </el-select>
                    </el-form-item>

                    <el-form-item label="机构人数">
                        <el-select v-model="editItem.companyScale" placeholder="请选择人数规模" class="w400">
                            <el-option
                                    v-for="item in companyScaleList"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.code">
                            </el-option>

                        </el-select>
                    </el-form-item>

                    <el-form-item label="机构简介">
                        <el-input type="textarea" v-model="editItem.companyBriefIntroduction" class="w400"></el-input>
                    </el-form-item>

                    <el-form-item label="开通功能">
                        <el-checkbox-group v-model="editItem.openFunction" @change="handleOpenFunctionChange">
                            <el-checkbox v-for="item in functionList" :label="item.value" >{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer" align="center">
                    <el-button type="primary" @click="updateCooperationCompany">确 定</el-button>
                    <el-button @click="editInfoDialog = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>

        <el-dialog title="新增机构" :visible.sync="addItemDialog">
            <el-form :model="newItem" :rules="rules" ref="newItem" :label-position="'right'" label-width="250px" >
                <el-form-item label="机构名称" prop="companyName" >
                    <el-input v-model="newItem.companyName" class="w400"></el-input>
                </el-form-item>

                <el-form-item label="行业类别" prop="industryCategory" >
                    <el-select placeholder="请选择行业类别" v-model="newItem.industryCategory" class="w400">
                        <el-option
                                v-for="item in industryCategoryList"
                                :key="item.value"
                                :label="item.value"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="机构性质" prop="companyNature" >
                    <el-select placeholder="请选择机构性质" v-model="newItem.companyNature" class="w400">
                        <el-option
                                v-for="item in companyNatureList"
                                :key="item.value"
                                :label="item.value"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="机构人数" prop="companyScale" >
                    <el-select placeholder="请选择人数规模" v-model="newItem.companyScale" class="w400">
                        <el-option
                                v-for="item in companyScaleList"
                                :key="item.value"
                                :label="item.value"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="机构简介" >
                    <el-input type="textarea" v-model="newItem.companyBriefIntroduction" class="w400"></el-input>
                </el-form-item>

                <el-form-item label="开通功能">
                    <el-checkbox-group v-model="newItem.openFunction" @change="handleOpenFunctionChange">
                        <el-checkbox v-for="item in functionList" :label="item.value" >{{item.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer" align='center'>
                <el-button type="primary" @click="saveCooperationCompany('newItem')">确 定</el-button>
                <el-button @click="addItemDialog = false">取 消</el-button>
            </div>
        </el-dialog>
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
    </div>
</template>

<script>
    const functionList = [
        {
            label:'信用借款',
            value:'CREDIT_LOAN'
        },{
            label:'虚拟信用卡',
            value:'VIRTUAL_CREDIT_CARD'
        }
    ];
    export default{
        data(){
            return{
                searchInfoIsChange:false,   //查询条件是否改变
                pageSize:30,
                recordsTotal:null,
                pageIndex:0,
                functionList:functionList,
                openFunction:[],
                searchInfo:{
                    searchInput:'',
                    status:'',
                    pageSize:30,
                    pageIndex:0
                },
                tableData:null,
                newItem: {},
                editItem:{},
                tmpRow:{},
                rules:{
                    companyName:[
                        { required: true, message: '请输入机构名称', trigger: 'blur' }
                    ],industryCategory:[
                        { required: true, message: '请选择行业类别', trigger: 'change' }
                    ],companyNature:[
                        { required: true, message: '请选择机构性质', trigger: 'change' }
                    ],companyScale:[
                        { required: true, message: '请选择机构人数', trigger: 'change' }
                    ]
                },

                industryCategoryList:[],    //行业类别
                companyNatureList:[],       //机构性质
                companyScaleList:[],        //机构人数
                statusList:[],       //当前状态
                editInfoDialog: false,
                addItemDialog: false
            }
        },
        created(){
            this.getDict();
        },
        methods: {
            handleOpenFunctionChange(value) {
                var len = value.length;
                switch(len){
                    case 0:
                        this.openFunction = [];
                        break;
                    case 1:
                        this.openFunction = [value[0]];
                        break;
                    case 2:
                        this.openFunction = [value[0],value[1]];
                        break;
                }
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.searchInfo.pageSize = val;
                if(val<this.pageSize){
                    this.tableData.splice(val);
                }else{
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
                    resource.getDictByType({
                        type:'industry_category'
                    },function(result){
                        if(result.code=='000000'){
                            resolve(result);
                        }else{
                            reject(result);
                        }
                    });
                });
                p1.then(function(json) {
                    self.industryCategoryList = json.data;
                }, function(json) {
                    self.$message.error(json.msg);
                });

                const p2 = new Promise(function(resolve, reject) {
                    resource.getDictByType({
                        type:'company_nature'
                    },function(result){
                        if(result.code=='000000'){
                            resolve(result);
                        }else{
                            reject(result);
                        }
                    });
                });
                p2.then(function(json) {
                    self.companyNatureList = json.data;
                }, function(json) {
                    self.$message.error(json.msg);
                });

                const p3 = new Promise(function(resolve, reject) {
                    resource.getDictByType({
                        type:'company_scale'
                    },function(result){
                        if(result.code=='000000'){
                            resolve(result);
                        }else{
                            reject(result);
                        }
                    });
                });
                p3.then(function(json) {
                    self.companyScaleList = json.data;
                }, function(json) {
                    self.$message.error(json.msg);
                });

                const p4 = new Promise(function(resolve, reject) {
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
                p4.then(function(json) {
                    self.statusList = json.data;
                }, function(json) {
                    self.$message.error(json.msg);
                });

                const promise = Promise.all([p1, p2, p3, p4]);
                promise.then(function(json) {
                    self.pageIndex = 1; //改变pageIndex的值出发handleCurrentChange
                }, function(json) {
                    self.$message.error(json.msg);
                });
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
                resource.findCooperationCompanyListPage(self.searchInfo,function(result){
                    if(result.code=='000000'){
                        self.tableData = result.data.pageResult.data;
                        self.tableData.forEach(function(item,index,arr){
                            item.industryCategory = self.convertDict(item.industryCategory,self.industryCategoryList);
                            item.companyNature = self.convertDict(item.companyNature,self.companyNatureList);
                            item.companyScale = self.convertDict(item.companyScale,self.companyScaleList);
                            item.status = self.convertDict(item.status,self.statusList);
                            item.creditLoan = item.creditLoan?'开通':'未开通';
                            item.virtualCreditCard = item.virtualCreditCard?'开通':'未开通';
                            item.openFunction = (item.openFunction||'').split(',');
                        });
                        self.recordsTotal = result.data.pageResult.recordsTotal;
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
            handleAdd(){
                this.newItem = {
                    openFunction:[]
                };
                this.addItemDialog = true;
            },
            handleEdit(index, row) {
                this.tmpRow = row;
                this.editItem = {
                    companyName:row.companyName,
                    industryCategory:row.industryCategory.code,
                    companyNature:row.companyNature.code,
                    companyScale:row.companyScale.code,
                    companyBriefIntroduction:row.companyBriefIntroduction,
                    openFunction:row.openFunction,
                    status:row.status.code
                };
                this.editInfoDialog = true;
            },
            saveCooperationCompany(formName){
                var self = this;
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        self.newItem.openFunction = self.newItem.openFunction.join(',');
                        resource.saveCooperationCompany(self.newItem,function(result){
                            if(result.code=='000000'){
                                self.addItemDialog = false;
                                self.$message({
                                    message: result.msg,
                                    type: 'success'
                                });
                                self.pageIndex = 1;
                            }else{
                                self.$message.error(result.msg);
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            updateCooperationCompany(callback,args){
                let self = this;
                this.editItem.openFunction = this.editItem.openFunction.join(',');
                resource.updateCooperationCompany(self.editItem,function(result){
                    if(result.code=='000000'){
                        self.editItem.openFunction = self.editItem.openFunction.split(',');
                        self.propertyExtend(self.editItem,self.tmpRow);
                        self.$message({
                            message: result.msg,
                            type: 'success'
                        });
                        self.editInfoDialog = false;
                        if(typeof callback == 'function'){
                            callback(args);
                        }
                    }else{
                        self.$message.error(result.msg);
                    }
                });
            },
            changeOrgStatus:function(operation,index,row){
                var self = this;
                this.editItem = {
                    companyName:row.companyName,
                    status:operation,
                    openFunction:row.openFunction
                };
                this.updateCooperationCompany(function(args){
                    args.row.status = args.context.convertDict(args.operation,self.statusList);
                },{row:row,context:self,operation:operation});
            }
        },
        computed:{

        }
    }
</script>

<style scoped>
    .table-list{
        margin-top: 20px;
    }
    .el-table td, .el-table th{
        height: 30px;
    }
    .m-left12{
        margin-left: 12px;
    }
    .m-left20{
        margin-left: 20px;
    }
    .w400{
        width: 400px;
    }

</style>
