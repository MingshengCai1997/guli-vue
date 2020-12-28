import request from '@/utils/request'

export default {
    // 1. 课程分类

    // 分别是当前页， 每页记录数， 条件查询对象
    getSubjectList() {
        return request({
            //url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
            url: `/eduservice/subject/getAllSubject`,
            method: 'get'
          })
    }

}


