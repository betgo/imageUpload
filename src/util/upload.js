const fs = require('fs')
const path = require('path')
const Router = require("koa-router");
const router = new Router();

router.post('/uploadfile',async(ctx,next)=>{
   let filename =  uploadFile(ctx)

   let res = {
       location:`images/${filename}`
   }
    return ctx.body = res
})

const    uploadFile = ctx =>{
    const fileName  = ctx.request.body.name
    const file = ctx.request.files.file
    const render = fs.createReadStream(file.path)
    let filePath = path.join('public/images',file.name)
    

    const upStream = fs.createWriteStream(filePath)
    render.pipe(upStream)
    console.log('uploading %s -> %s', file.name, upStream.path)
    return file.name;
 //   ctx.redirect(stream.path.substr(6).replace(/\\/g,'/'))
}

module.exports =  router.routes()