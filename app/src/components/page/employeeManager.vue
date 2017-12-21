<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>
                    <!-- <i class="el-icon-menu"></i>  -->
                    员工管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>录入员工</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-row :gutter="20">
                <el-col :span="8">
                    <span class="search-label">入职时间</span>
                    <el-date-picker
                            v-model="searchInfo.entryDateBegin"
                            type="date"
                            placeholder="开始时间">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker
                            v-model="searchInfo.entryDateEnd"
                            type="date"
                            placeholder="结束时间">
                    </el-date-picker>
                </el-col>

                <el-col :span="5">
                    <el-input v-model="searchInfo.searchInput" placeholder="姓名、手机号码"></el-input>
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

            </el-row>

            <el-row :gutter="20" class="m-top20">

                <el-col :span="8">
                    <span class="search-label">离职时间</span>
                    <el-date-picker
                            v-model="searchInfo.leaveDateBegin"
                            type="date"
                            placeholder="开始时间">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker
                            v-model="searchInfo.leaveDateEnd"
                            type="date"
                            placeholder="结束时间">
                    </el-date-picker>
                </el-col>

                <el-col :span="6">
                    <el-button type="primary" icon="search" @click="triggerSearch">搜索</el-button>
                    <el-button type="primary" class="handle-del mr10" @click="openDialog">更新</el-button>
                </el-col>
            </el-row>

            <el-dialog title="批量更新" :visible.sync="dialogFormVisible1" align='left' size="small">
                <el-form :model="new_form">
                    <el-form-item label="导入更新员工文件：" :label-width="formLabelWidth">
                        <el-upload
                                class="upload-demo"
                                ref="deleteupload"
                                action="/employeeBatchSave"
                                :multiple="false"
                                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                :on-preview="handlePreview"
                                :before-upload="handleBefore"
                                :on-remove="handleRemove"
                                :on-success="handleSuccess"
                                :on-change="handleChange"
                                :on-error="handleError"
                                :file-list="fileList"
                                :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" align='center'>
                    <el-button type="primary" @click="$refs.deleteupload.submit();dialogFormVisible1 = false;">导入</el-button>
                    <el-button @click="dialogFormVisible1 = false;">取 消</el-button>
                </div>
            </el-dialog>

            <!--<el-dialog title="批量更新" :visible.sync="dialogFormVisible1" align='left' size="small">-->
                <!--<el-form :model="new_form">-->
                    <!--<el-form-item label="导入更新员工文件：" :label-width="formLabelWidth">-->
                        <!--<el-upload-->
                                <!--class="upload-demo"-->
                                <!--ref="deleteupload"-->
                                <!--action="http://192.168.101.155:5701/employeeBatchSave"-->
                                <!--:multiple="false"-->
                                <!--accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"-->
                                <!--:on-preview="handlePreview"-->
                                <!--:before-upload="handleBefore"-->
                                <!--:on-remove="handleRemove"-->
                                <!--:on-success="handleSuccess"-->
                                <!--:on-error="handleError"-->
                                <!--:file-list="fileList"-->
                                <!--:auto-upload="false">-->
                            <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
                        <!--</el-upload>-->
                    <!--</el-form-item>-->
                <!--</el-form>-->
                <!--<div slot="footer" class="dialog-footer" align='center'>-->
                    <!--<el-button type="primary" @click="$refs.deleteupload.submit();dialogFormVisible1 = false;fileList=[]">导入</el-button>-->
                    <!--<el-button @click="dialogFormVisible1 = false;fileList=[]">取 消</el-button>-->
                <!--</div>-->
            <!--</el-dialog>-->
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable" :row-style="{'height':'40px'}">
            <el-table-column prop="date" label="序号" width="70" align="center">
                <template scope="scope">
                    <span v-text="scope.$index + 1"></span>
                </template>
            </el-table-column>
            <el-table-column prop="groupName" label="集团" align="center"></el-table-column>
            <el-table-column prop="companyName" label="机构" align="center"></el-table-column>
            <el-table-column prop="department" label="部门" width="100" align="center"></el-table-column>
            <el-table-column prop="position" label="职位" width="120" align="center"></el-table-column>
            <el-table-column prop="custName" label="姓名" align="center" width="130" >
            </el-table-column>
            <el-table-column prop="certNo" label="身份证号"align="center" width="200">
            </el-table-column>
            <el-table-column prop="tel" label="联系方式" width="130"  align="center">
            </el-table-column>
            <el-table-column prop="entryDate" label="入职时间" width="130" align="center" >
            </el-table-column>
            <el-table-column prop="leaveDate" label="离职时间" width="130" align="center">
            </el-table-column>
            <el-table-column prop="workStatus.value" label="状态" align="center" width="80">
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageSize:30,
                recordsTotal:null,
                pageIndex:null,
                searchInfo:{
                    type:'SUCCESS',                 //上传成功
                    searchInput:'',                 //搜索框内容
                    entryDateBegin:'',              //入职开始时间
                    entryDateEnd:'',                //入职结束时间
                    leaveDateBegin:'',              //离职开始时间
                    leaveDateEnd:'',                //离职结束时间
                    workStatus:'',                  //工作状态
                    pageSize:30,                    //每页显示数据
                    pageIndex:0                     //当前页码
                },
                tableData: [],
                workStatusList:[],

                url: './static/vuetable.json',

                cur_page: 1,
                multipleSelection: [],
                select_status: '正常',
                select_word: '',
                del_list: [],
                is_search: false,
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogFormVisible1: false,
                dialogFormVisible2: false,
                form: {

                },
                new_form:{

                },
                formLabelWidth: '170px',
                fileList: []
            }
        },
        created(){
            this.getDict();
        },
        methods: {
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
                const promise = new Promise(function(resolve, reject) {
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
                promise.then(function(json) {
                    self.workStatusList = json.data;
                    self.pageIndex = 1;//改变pageIndex的值出发handleCurrentChange
                }, function(json) {
                    self.$message.error(json.message);
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
                const self = this;
                if( this.searchInfo.entryDateEnd!='' && this.searchInfo.entryDateBegin!= ''
                        && this.searchInfo.entryDateEnd-this.searchInfo.entryDateBegin < 0 ){
                    this.$message.error('入职结束时间需大于开始时间');
                    this.searchInfo.entryDateBegin = '';
                    this.searchInfo.entryDateEnd = '';
                    return;
                }
                if( this.searchInfo.leaveDateBegin!='' && this.searchInfo.leaveDateEnd!= ''
                        && this.searchInfo.leaveDateEnd-this.searchInfo.leaveDateBegin < 0 ){
                    this.$message.error('离职结束时间需大于开始时间');
                    this.searchInfo.leaveDateBegin = '';
                    this.searchInfo.leaveDateEnd = '';
                    return;
                }
                this.searchInfo.entryDateBegin = this.convertTime(this.searchInfo.entryDateBegin);
                this.searchInfo.entryDateEnd = this.convertTime(this.searchInfo.entryDateEnd);
                this.searchInfo.leaveDateBegin = this.convertTime(this.searchInfo.leaveDateBegin);
                this.searchInfo.leaveDateEnd = this.convertTime(this.searchInfo.leaveDateEnd);
                resource.manageUploadList(self.searchInfo,function(result){
                    if(result.code=='000000'){
                        self.tableData = result.data.pageResult.data;
                        self.tableData.forEach(function(item,index,array){
                           item.workStatus = self.convertDict(item.workStatus,self.workStatusList);
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
            openDialog(){
                this.dialogFormVisible1 = true;
                this.fileList = [];
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                let self = this;
                const h = this.$createElement;
                this.dialogFormVisible = true;
                this.form = row;
            },
            changePassWord(index, row) {
                this.dialogFormVisible1 = true;
                this.form = row;
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            delAll(){
                const self = this,
                        length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addNew(){
                this.new_form = {}
                this.dialogFormVisible2 = true;
            },
            handleBefore(file,fileList) {
                var filename = file.name;
                var fileType = filename.substr(filename.lastIndexOf("."));
                if([".xls",".xlsx"].indexOf(fileType)<0){
                    this.$message.error('请上传正确的文件类型');
                    return false;
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSuccess(result, file) {
                console.log(result);
                if(result.success){
                    this.$message({
                        message: result.msg,
                        type: 'success'
                    });
                }else{
                    this.$message.error(result.msg);
                }
            },
            handleChange(file, fileList){
                if(fileList.length>1){
                    fileList.pop();
                    this.$message({
                        message: '只能上传1份文件',
                        type: 'warning'
                    });
                }
            },
            handleError(err, file, fileList){
                alert('error')
                console.log(err);
            },
            submitUpload() {
                this.$refs.addupload.submit();
                this.dialogFormVisible2 = false;
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
    .m-top20{
        margin-top: 20px;
    }
    .search-label{
        font-size:14px;
        margin-right:10px;
    }

</style>

