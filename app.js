const Koa = require('koa')
const Router = require("koa-router");
const koaBody = require('koa-body')
const uploadFile = require('./src/util/upload')
const static = require('koa-static')
let app = new Koa();

const router = new Router();
app.use(koaBody({
    multipart:true,
    formidable:{
        maxFileSize: 200*1024*1024
    }
}))

app.use(static(__dirname+'/public'))

app.use(async (ctx,next)=>{
        console.log(ctx.URL)
        next()
})

router.use("/api",uploadFile)


app.use(router.routes())
app.listen(3000, () => {
    console.log("listening port 3000");
})