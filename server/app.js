let createError = require('http-errors')
let path = require('path')
let express = require('express')
let app = express()


// app.use(express.static(path.join(__dirname, '../three.js-dev')))  //例如访问：http://localhost:8081/test.html
app.use('/three.js-dev', express.static(path.join(__dirname, '../three.js-dev')))  //例如访问：http://localhost:8081/three.js-dev/test.html
app.use('/lesson', express.static(path.join(__dirname, '../lesson')))  //例如访问：http://localhost:8081/lesson/test.html
app.use('/public', express.static('public'));  //例如访问：http://localhost:8081/public/imgs/logo.png



const PORT = 8081
let server = app.listen(PORT, () => {
    let port = server.address().port
    console.info("node本地服务已启动,端口：", port)
})
