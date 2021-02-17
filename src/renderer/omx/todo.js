import Model from './model.js'
import { dateFormat } from './utils.js'

// const Model = require('./model.js').Model
// const dateFormat = require('./utils.js').dateFormat

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