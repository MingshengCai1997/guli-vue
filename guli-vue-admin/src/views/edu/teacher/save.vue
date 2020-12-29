<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像 -->
<el-form-item label="讲师头像">

    <!-- 头衔缩略图 -->
    <pan-thumb :image="teacher.avatar"/>
    <!-- 文件上传按钮 -->
    <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
    </el-button>

    <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
    <image-cropper
                   v-show="imagecropperShow"
                   :width="300"
                   :height="300"
                   :key="imagecropperKey"
                   :url="BASE_API+'/eduoss/fileoss'"
                   field="file"
                   @close="close"
                   @crop-upload-success="cropSuccess"/>

</el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
    components: {ImageCropper, PanThumb},    // 声明组件
    data() {
        return {
            teacher:{
                name: '',
                sort: 1,
                level: 1,
                career: '',
                intro: '',
                avatar: ''
            },
            // 上传弹窗的组件是否显示初始化
            imagecropperShow: false,
            // 上传组件的唯一标识    
            imagecropperKey:0,
            // 设置默认的请求路ing
            BASE_API:process.env.BASE_API,
            saveBtnDisabled: false // 保存按钮是否禁用,
        }
    },
    created() {
        this.init()
    }, 
    watch: {
    $route(to, from) {
      console.log('watch $route')
      this.init()
      }
    },
     methods: {
       // 关闭上传弹框的方法
        close() {
          this.imagecropperShow = false
          // 选择完一张之后如果想要修改的话就无法选择第二张，会出现上传成功，所以将组件初始化就可以
          this.imagecropperKey = this.imagecropperKey+1
        },
        // 上传成功的方法
        cropSuccess(data) {
          this.imagecropperShow = false
          // 上传之后接口返回图片地址，将这个地址给对应的属性就可以了
          this.teacher.avatar = data.url
          this.imagecropperKey = this.imagecropperKey+1

        },
        init() {
          if (this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id
            this.getInfo(id)
          } else {
            // 清空teacher
            this.teacher = {}
          }
        },
        // 回显信息【又是因为有双向绑定，所以这里的属性有值的话，上面也会有值】(当初这里没有进行回显是因为页面中没有调用这个方法)
        getInfo(id) {
            teacherApi.getTeacherInfo(id)
            .then(response => {
                this.teacher = response.data.item
            })
        }, 

        // 既可以做添加还可以修改
        saveOrUpdate() {
            // 判断是修改还是添加，实现对应的功能【根据是否有id进行实现】
            if (!this.teacher.id) {
                this.saveTeacher()
            } else {
                this.updateTeacher()
            }
         },
         // 修改讲师的方法
        updateTeacher() {
             teacherApi.updateTeacherInfo(this.teacher)
             .then(response =>{
                return this.$message({
                type: 'success',
                message: '修改成功!'
                });
                // 路由重定向，回到列表页
                this.$router.push({ path: '/teacher/table' })
             })
         },
         // 单独添加讲师的方法
        saveTeacher() {
            teacherApi.addTeacher(this.teacher)
            .then(response =>{
                return this.$message({
                type: 'success',
                message: '保存成功!'
                })
            })
            // 路由重定向，回到列表页
            .then(resposne => {
                this.$router.push({ path: '/teacher/table' })
            })
            .catch(response => {
                this.$message({
                type: 'error',
                message: '保存失败'
                })
            })
        }   
    }
}
</script>