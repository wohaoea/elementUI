<template>
    <div class="wrap">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>
                    员工管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>更新记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table class="table-list" :data="tableData"border style="" :row-style="{height:'30px'}">
            <el-table-column label="序号" width="70" scope="scope" align="center">
                <template scope="scope">
                    <span v-text="scope.$index+1"></span>
                </template>
            </el-table-column >
            <el-table-column prop="batchNo" label="编号"  align="center" ></el-table-column>
            <el-table-column prop="totalCount" label="上传员工数量" align="center"  ></el-table-column>
            <el-table-column prop="successCount" label="上传成功" align="center"></el-table-column>
            <el-table-column prop="failCount" label="上传失败" align="center"  ></el-table-column>
            <el-table-column prop="loginName" label="操作人" align="center" ></el-table-column>
            <el-table-column prop="createTime" label="操作时间" align="center" ></el-table-column>
            <el-table-column label="操作" align="center" >
                <template scope="scope" >
                    <el-button type="text" size="small" @click="showBatchInfo(scope.$index)">查看</el-button>
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
        <el-dialog title="员工信息" :visible.sync="dialogTableVisible" class="batch-info-dialog">
            <el-tabs v-model="activeTab" type="card" @tab-click="handleSwitch">
                <el-tab-pane label="上传员工" name=""></el-tab-pane>
                <el-tab-pane label="上传成功" name="SUCCESS"></el-tab-pane>
                <el-tab-pane label="上传失败" name="FAIL"></el-tab-pane>

                <el-table :data="batchInfo.tableData" border style="width: 100%;" :row-style="{'height':'40px'}">
                    <el-table-column label="序号" width="70" scope="scope" align="center">
                        <template scope="scope">
                            <span v-text="scope.$index+1"></span>
                        </template>
                    </el-table-column >
                    <el-table-column prop="custName" label="姓名" align="center" width="100" >
                    </el-table-column>
                    <el-table-column prop="certNo" label="身份证号"align="center" width="200">
                    </el-table-column>
                    <el-table-column prop="companyName" label="集团" align="center" width="220"></el-table-column>
                    <el-table-column prop="organization" label="机构" align="center" width="150"></el-table-column>
                    <el-table-column prop="department" label="部门" align="center" width="120"></el-table-column>
                    <el-table-column prop="position" label="职位" align="center" width="120"></el-table-column>
                    <el-table-column prop="companyTel" label="公司电话" align="center" width="120"></el-table-column>
                    <el-table-column prop="tel" label="手机号" align="center" width="150"></el-table-column>
                    <el-table-column prop="entryDate" label="入职时间" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="laborRelationsType.value" label="劳动合同" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="monthlySalaryRange" label="月薪范围" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="workStatus.value" label="工作状态" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="leaveDate" label="离职时间" align="center" width="120">
                    </el-table-column>
                    <el-table-column v-if="isShow" prop="reason" label="失败原因" align="center" width="250"></el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            :current-page.sync="batchInfo.pageIndex"
                            :page-sizes="[10, 30, 50]"
                            :page-size="batchInfo.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="batchInfo.recordsTotal">
                    </el-pagination>
                </div>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                dialogTableVisible:false,
                pageSize:30,
                recordsTotal:null,
                pageIndex:1,
                searchInfo:{
                    pageSize:30,
                    pageIndex:0,
                    type:'EMPLOYEE'
                },
                tableData:null,
                workStatusList:null,
                laborRelationsTypeList:null,
                activeTab:'',
                batchInfo:{
                    pageSize:null,
                    recordsTotal:null,
                    pageIndex:1,
                    searchInfo:{
                        batchNo:null,       //当前查看编号
                        pageSize:30,
                        pageIndex:0,
                        type:''      //查询类型
                    },
                    tableData:null
                }
            }
        },
        computed:{
            isShow(){
                if(this.activeTab=='SUCCESS'){
                    return false;
                }else{
                    return true;
                }
            }
        },
        created(){
            this.getDict();
        },
        methods: {
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
            handleSizeChange2(val) {
                this.batchInfo.pageSize = val;
                this.batchInfo.searchInfo.pageSize = val;
                if(val<this.pageSize){
                    this.batchInfo.tableData.splice(val);
                }else{
                    this.batchSearch();
                }
            },
            handleCurrentChange2(val){
                this.batchInfo.pageIndex = val;
                this.batchInfo.searchInfo.pageIndex = val-1;
                this.batchSearch();
            },
            getDict(){
                var self = this;
                const p1 = new Promise(function(resolve, reject) {
                    resource.getDictByType({
                        type:'work_status'
                    },function(result){
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
                    self.$message.error(json.msg);
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
                self.search();
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
            handleSwitch(){
                this.batchInfo.searchInfo.type = this.activeTab;
                this.batchSearch();
            },
            showBatchInfo(index){
                if( this.tableData[index].batchNo != this.batchInfo.searchInfo.batchNo ){
                    this.batchInfo = {
                        pageSize:30,
                        recordsTotal:null,
                        pageIndex:1,
                        searchInfo:{
                            batchNo:this.tableData[index].batchNo,       //当前查看编号
                            pageSize:30,
                            pageIndex:0,
                            type:''      //查询类型
                        },
                        tableData:null
                    };
                    this.batchSearch();
                }

                this.dialogTableVisible = true;
            },
            search(){
                var self = this;
                resource.batchUploadLog(self.searchInfo,function(result){
                    if(result.code=='000000'){
                        self.tableData = result.data.data;
                        self.recordsTotal = result.data.recordsTotal;
                    }else{
                        self.$message.error(result.msg);
                    }
                });
            },
            batchSearch(){
                var self = this;
                resource.manageUploadList(self.batchInfo.searchInfo,function(result){
                    if(result.code=='000000'){
                        self.batchInfo.tableData = result.data.pageResult.data;
                        self.batchInfo.tableData.forEach(function(item,index,arr){
                            item.workStatus = self.convertDict(item.workStatus,self.workStatusList);
                            item.laborRelationsType = self.convertDict(item.laborRelationsType,self.workStatusList);
                        });
                        self.batchInfo.recordsTotal = result.data.pageResult.recordsTotal;
                    }else{
                        self.$message.error(result.msg);
                    }
                });
            }
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
    .batch-info-dialog{
        width:170%;
        margin-left: -35%;
    }
</style>
