<template>
  <div>
    <h3>数据的增删改查</h3>

    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label="日期" prop="date" width="100px" align="center">
      </el-table-column>
      <el-table-column label="姓名" prop="name" width="100px" align="center">
      </el-table-column>
      <el-table-column label="住址" prop="address" width="300px" align="center">
      </el-table-column>
      <el-table-column label="修改" width="200px" align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div>
      <button @click="addfn">增加新用户</button>
    </div>

    <!-- from -->
    <MyDialog :form="form" :dialogFormVisible="dialogFormVisible" :formLabelWidth="formLabelWidth" @confirmfn_my="confirmfn" @myCancel="cancelfn"></MyDialog>

    <!-- 增加新用户的弹窗 -->
    <AddDialog :addform="addform" :incrementform="incrementform" :formLabelWidth="formLabelWidth" @my_addconfirm="addconfirmfn" @my_addcancel="addcancelfn"></AddDialog>

  </div>
</template>
<script>
import instance from '../api/api';
import dayjs from 'dayjs';
import MyDialog from '../components/MyDialog.vue'
import AddDialog from '../components/AddDialog.vue'
export default {
  name: 'Index',
  data() {
    return {
      incrementform: false,  // 增加表单的显示隐藏
      addform: {  // 增加表单绑定的数据
        date: null,
        name: '',
        address: ''
      },
      search: '',
      tableData: [],
      dialogFormVisible: false,  // 表单的显示隐藏
      form: {  // 表单绑定的数据
        index: 0,
        date: null,
        name: '',
        address: ''
      },
      formLabelWidth: '120px',
    }
  },
  components: {
    MyDialog,
    AddDialog
  },
  created() {
    this.getAll();
  },
  methods: {
    // 增加的取消功能
    addcancelfn() {

    },
    // 增加的确定功能
    addconfirmfn() {
      this.incrementfn().then(res => {
        this.$message({
          type: 'success',
          message: '添加成功',
          duration: 3000,
          onClose: () => {
            this.incrementform = false;
            this.getAll()
          }
        })
      }).catch(err => {

      })
    },
    // 增加新用户(用户行为)
    addfn() {
      this.incrementform = true;
    },
    // 增加业务
    async incrementfn() {
      let { date, name, address } = this.addform
      let { data } = await instance.post('/add', { date, name, address });
      console.log('增加的业务传过来的数据 --->', data);
    },


    cancelfn() {
      this.dialogFormVisible = false
    },
    // 编辑（用户行为）
    handleEdit(scope) {
      this.form = scope.row;
      this.form.index = scope.$index;
      this.dialogFormVisible = true;
    },
    // 修改（用户行为）
    confirmfn(form) {
      this.dialogFormVisible = false;
      this.form.date = dayjs(new Date(this.form.date)).format('YYYY-MM-DD');
      console.log('获取日期 --->', this.form.date);
      this.updatafn()
    },
    // 修改业务
    async updatafn() {
      let { date, name, address, index } = this.form;
      let { data } = await instance.put('/update', { date, name, address, index });
      console.log('修改业务 --->', data);
    },
    // 删除（用户行为）
    handleDelete(scope) {
      // console.log('scope --->', scope);
      this.$confirm('此删除操作不可逆！, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteFn(scope.$index).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 删除业务
    async deleteFn(index) {
      let { data } = await instance.delete('/delete', { params: { index } });
      // console.log('删除数据 --->', data);
      this.getAll()
    },
    // 请求的业务
    async getAll() {
      let { data } = await instance.get('/all');
      // console.log('all 获取的数据  --->', data);
      this.tableData = data.tableData
    }
  },
}
</script>
<style lang="scss" scoped>
</style>