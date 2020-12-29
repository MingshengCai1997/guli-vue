import request from '@/utils/request'

export default {
    // 1. 讲师列表（条件分页查询）

    // 分别是当前页， 每页记录数， 条件查询对象
    getTeacherListPage(current, limit, teacherQuery) {
        return request({
            //url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
            url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            // teacerQuery条件对象，后端使用的是RequesetBody获取数据【后端使用requestbody获取数据的，前端就是需要这样的一个data属性】
            // data 就是将对象转换成json传递到接口中去；如果不是需要使用json的话，就可以直接使用param
            data: teacherQuery
          })
    },
    // 删除讲师
    deleteTeacherById(id) {
        return request({
            url: `/eduservice/edu-teacher/${id}`,
            method: 'delete'
          })
    },
    // 添加讲师
    addTeacher(teacher) {
        return request({
            url: `/eduservice/edu-teacher/addTeacher`,
            method: 'post',
            data: teacher 
          })
    },
    // 根据id查询信息
    getTeacherInfo(id) {
        return request({
            url: `/eduservice/edu-teacher/searchTeacherById/${id}`,
            method: 'get',
          })
    },
    // 修改讲师
    updateTeacherInfo(teacher) {
        return request({
            url: `eduservice/edu-teacher/updateTeacher`,
            method: 'post',
            data: teacher
        })
    }

}


