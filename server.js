const path = require('path')
const express = require('express')
const app = express()


//设置静态文件目录
app.use(express.static(path.resolve(__dirname, 'dist'))) 

var server = app.listen(3100, () => {
    var port = server.address().port

	global.console.log("应用实例，访问地址为 http://localhost:%s", port)
})
