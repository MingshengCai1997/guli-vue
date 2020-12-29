<template>
  <div class="app-container">
    讲师列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 详细的看typra -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>

// 引入调用teacher.js文件
import teacher from '@/api/edu/teacher'
export default {
    // 写核心代码的位置
    //data:{

    //},
    data(){    // 定义变量和初始值【因为有三个变量，所以下面我们定义三个变量】
        return {
            list:null,  // 就是我们查询之后显示结果，给一个初始值
            page:1,
            limit:10,
            total:0,
            teacherQuery:{}                 // 这里面没有属性也是可以的，不用像Java中定义属性才可以赋值
        }
    },
    created() {
        this.getList()
    },
    methods:{

        // 这里非常巧妙的是，直接设置一个默认值1，你不传的话默认就是第一页，如果你传的话，就是你想要的那页

        getList(page = 1) {         
            this.page = page
            // 以前是：axiso.post("").then().catch()  由于我们在teacher.js中定义了函数，这里直接调用函数就可以了。
            teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
            .then(response =>{                              // 请求成功
                // reponse 就是接口返回的数据
                // console.log(response)
                this.list = response.data.rows
                this.total = response.data.total
                console.log(this.list) 
                console.log(this.total)
            })                                           
            .catch(error =>{                                // 请求失败
                console.log(error)                    
            })                                    
        },
        resetData() {   //  清空功能
        // 既然是有了双向绑定之后，将对象清空，那么那里面的就清空了
            this.teacherQuery = {}
        // 查询所有的数据
            this.getList()
        },

        // 删除讲师的方法
        removeDataById(id) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return teacher.deleteTeacherById(id)
            }).then(response => {
                // 提示信息
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                // 删除成功之后再查询
                this.getList()
            })
            // 点击取消删除的时候，不需要有提示的
            // .catch(response => { // 失败
            //     if (response === 'cancel') {
            //         this.$message({
            //             type: 'info',
            //             message: '已取消删除'
            //         })
            //     } else {
            //         this.$message({
            //             type: 'error',
            //             message: '删除失败'
            //         })
            //     }
            // })  
        }
    }       
            
}
</script>


