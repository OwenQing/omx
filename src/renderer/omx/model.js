const fs = require('fs')


/**
 *  定义数据存储 Model 
 *  Model 类似于 ORM BaseModel 
 *  由于本项目数据量比较小，所以采用直接将 json 存文件的方式
 * 
 **/
class Model {
    constructor() {}

    /* 读取文件内容 */
    __read(path) {
        const data = fs.readFileSync(path, 'utf-8')
        // console.log('JSON ------>', JSON.parse(data))
        return JSON.parse(data)
    }

    /* 存储对象 */
    __write(path, data) {
        data = JSON.stringify(data, null, '\t')
        fs.writeFileSync(path, data)
    }

    /*
    *   检测文件是否存在，不存在就创建
    */
    checkFile(path) {
        // 数据目录
        if (!fs.existsSync('D:/omxlog')) {
            fs.mkdirSync('D:/omxlog')
        }

        let status = fs.existsSync(this.getPath())
        if (!status) {
            fs.writeFileSync(this.getPath(), JSON.stringify([]))
        }
    }
    /* 获取存储路径 */
    getPath() {
        let classname = this.constructor.name
        let path = `D:/omxlog/${classname}.txt`
        // console.log('debugxxx-->', path)
        return path
    }

    /* 获取所有对象 */
    all() {
        this.checkFile()
        let path = this.getPath()
        return this.__read(path)
    }

    /* 
        条件查询 
        user.findFirst({name: "Jack"})
    */
    findFirst(kwargs) {
        this.checkFile()
        let models = this.all()
        for (let m of models) {
            let flag = true
            for (let k in kwargs) {
                if (kwargs[k] != m[k]) {
                    flag = false
                    break
                }
            }
            if (flag === true) return m
        }
    }

    /*
    * 批量条件查询
    */
   findAll() {
       // FIXME
   }

    /*
    *   根据 id 查询
    */
    find(id) {
        return this.findFirst({id: id})
    }

    /*
    *   根据 id 删除数据
    */
    delete(id) {
        let models = this.all()
        let index = -1
        for (let i = 0; i < models.length; i++) {
            let m = models[i]
            if (m.id === id) {
                index = i
                break
            }
        }

        if (index === -1) {
            // 未找到
        } else {
            let obj = models.splice(index, 1)
            this.__write(this.getPath(), models)
            return obj
        }
    }

    /*
    *   对象存储
    */
    save() {
        // 检测文件是否存在
        this.checkFile()
        let models = this.all()
        // 未定义 id 字段
        if (this.id === undefined) {
            if (models.length === 0) {
                this.id = 1
            } else {
                let m = models[models.length - 1]
                this.id = m.id + 1
            }
            models.push(this)
        } else {
            let index = models.length
            for (let i in models) {
                let m = models[i]
                if (m.id === this.id) {
                    index = i
                    break
                }
            }
            // 这里处理为更新
            models[index] = this
        }
        // 写入文件
        this.__write(this.getPath(), models)
    }
}



// class User extends Model {
//     constructor(nickname='', email='', passwd='') {
//         super()
//         this.nickname = nickname
//         this.email = email
//         this.passwd = passwd
//     }
// }

// u = new User()
// // fs.mkdirSync('D:/omxlog')
// u.save()
// // u.checkFile()

// module.exports = {
//     Model: Model
// }

export default Model