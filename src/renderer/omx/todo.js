const Model = require('./model.js').Model
const dateFormat = require('./utils.js').dateFormat

class Todo extends Model {
    constructor(task='', priority='') {
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

u = new Todo(task='todo test', priority='1')
// u.save()
// u.checkFile()
console.log(u.all())