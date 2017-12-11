# nodejs 生成二维码

> 用express简单生成一个服务器，前端传给后台参数，后台生成对应的二维码图片，返回给前端

# 安装包

    cnpm i qr-image --save-dev

    cnpm i express --save

    cnpm i node-uuid-generator //生成不同的id值

# 代码详见 app.js index.html

```js
    const express = require('express');
    const qr = require('qr-image');
    const fs = require('fs');
    const generator = require('node-uuid-generator');
    const app = express();

    app.use(express.static('./static'));

    app.get('/create_qr_image',(req,res) => {
        
        console.log(req.url);
        console.log(req.query);

        let val = req.query.val; //前台传过来的值

        let uuid = generator.generate();
        let imgname = 'qr_image'+uuid+'.png';

        let img = qr.image(val,{type:'png',size:12});
        img.pipe(fs.createWriteStream('static/'+imgname));

        res.json({
            msg: 'ok',
            imageUrl: imgname
        });
    });

    app.listen(3000,() => {
        console.log('server is listening at 3000 ...');
    });

```