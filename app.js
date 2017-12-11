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

