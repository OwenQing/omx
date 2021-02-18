import Model from './model.js'
import { dateFormat } from './utils.js'


/**
 *  Todo 待办事项存储类
 *  @param task 待办任务
 *  @param priority 三个优先级 3 2 1 (low middle high)
 *  @param status bool 对应完成状态 
*/
class Todo extends Model {
    constructor(task='', priority=3) {
        super()
        // 手动设置
        this.task = task
        this.priority = priority
        // 自动设置
        this.status = false
        this.startTime = dateFormat(new Date())
        this.endTime = null
    }
}

export default Todo;