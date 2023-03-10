var express = require('express');
var router = express.Router();

let fs = require('fs')
// 一个Node.js模块，主要用于解析表单，支持get post请求参数，文件上传等。
let formidable = require('formidable')
// 主要用于转换xlsx数据和读取xlsx的文件数据
let xlsx = require('node-xlsx')


router.post('/upload', function(req, res) {
    console.log("############# POST / UPLOAD   ##############")
    let fileTypeError = false;
    let target_path = ".\\public\\upload";
    //创建一个form表单对象
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.uploadDir = target_path;

    let files = [];
    let fields = []

    // 每当一个字段 / 值对已经收到时会触发该事件
    form.on('field', function(field, value) {
        fields.push([field, value])
    })
    //每当有一对字段/文件已经接收到，便会触发该事件。
    form.on('file', function(field, file) {
        // console.log("fileName:"+ file.name)
        let filext = file.name.substring(file.name.lastIndexOf("."), file.name.length)
        if (filext != '.xlsx') {
            fileTypeError = true
        } else {
            fileTypeError = false
            return
        }
        files.push([field, file])
    });
    // 当所有的请求已经接收到，并且所有的文件都已上传到服务器中，该事件会触发。
    form.on('end', async function() {
        //遍历上传的文件
        let fileName = ''
        let obj = ''
        let exfalg = true
        // 验证路径是否存在
        let folder_exists = await fs.existsSync(target_path)
        if (folder_exists) {
            // 列出文件
            let dirList = await fs.readdirSync(target_path)
                // console.log("dirList:",dirList)
            dirList.forEach(item => {
                // statSync获取文件信息 判断当前文件是否为文件夹
                if (!fs.statSync(target_path + '\\' + item).isDirectory()) {
                    fileName = target_path + '\\' + item;
                    if (!fileTypeError) {
                        obj = xlsx.parse(fileName)
                        res.send({ "rtnCode": "1", "rtnInfo": "成功导入数据", "data": obj })
                    } else {
                        //解析失败的
                        res.send({ "rtnCode": "1", "rtnInfo": "文件格式不对" })
                        exfalg = false
                    }
                    fs.unlinkSync(fileName)
                } else {
                    res.send({ "rtnCode": "1", "rtnInfo": "系统错误" })
                    return
                }
            })
        }
    })
    form.on('error', function(err) {       
       res.send({ "rtnCode": "1", "rtnInfo": "上传出错" })
    })
    form.on('aborted', function() {
       res.send({ "rtnCode": "1", "rtnInfo": "放弃上传" });
    });
    // 解析对象完成之后，我们就可以开始对表单进行解析了
    form.parse(req)
})
module.exports = router;