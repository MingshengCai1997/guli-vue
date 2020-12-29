import request from '@/utils/request'

export default {
    // 1. 添加课程信息

    // 分别是当前页， 每页记录数， 条件查询对象
    addCourseInfo(courseInfo) {
        return request({
            //url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
            url: `/eduservice/course/addCourseInfo`,
            method: 'post',
            data: courseInfo
          })
    },

    // 2. 查询所有的讲师
    getListTeacher() {
        return request({
            //url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
            url: `/eduservice/edu-teacher/findAll`,
            method: 'get',
          })
    }

}


