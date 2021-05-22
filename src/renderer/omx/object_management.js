import Model from './model'
import { dateFormat } from './utils.js'


/**
 * ObjectManagement 目标管理相关存储类
 * 使用 OKR 的方式
 * 	{
		"object": "减脂",
		"krs": [
			{
				"kr": "跑步",
				"weight": 30,
				"progress": 0
			}
		],
		"log": "",
		"startTime": "",
		"endTime": null,
		"id": 1
	}
*/
class ObjectManagement extends Model {
    constructor(object='', krs=[]) {
        super()
        this.object = object
        // kr => key result
        this.krs = krs
        this.krs.map(e => {
            // 进度条
            e.progress = 0
        })
        
        // 记录日志
        this.log = ''
        this.startTime = dateFormat(new Date())
        this.endTime = null
    }
}

export default ObjectManagement