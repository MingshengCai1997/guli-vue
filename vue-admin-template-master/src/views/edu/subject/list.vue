<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="subjectTree"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import suject from '@/api/edu/subject'
export default {

  data() {
    return {
      filterText: '',
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.subjectTree.filter(val)
    }
  },
  
  created() {
      // 为了只要到这个页面就会显示
      this.getAllSubject()
  },
  methods: {
      // 获取所有的分类列表
    getAllSubject() {
        suject.getSubjectList()
            .then(response => {
                this.data2 = response.data.list
            })
    },

    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase.indexOf(value) !== -1
    }
  }
}
</script>

