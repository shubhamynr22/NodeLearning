const http = require('http');
const fs = require('fs');
const { parse } = require('path');

const server = http.createServer((req, res)=>{
    //console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><h1>Hello from the other side !!</h1><form action = "/message" method = "POST" ><input type = "text" name ="message"><button type = "submit">Click Here!</button></body>');
        res.write('</html>');
        return res.end();  
    }
    if (url === '/message' && method == 'POST') {
        const body = [];
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        })
        req.on('end', ()=>{
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const message = parseBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        })
        fs.writeFileSync('message.txt', 'Ye Boi!');
        res.statusCode =302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Shubhams Response</title></head>');
    res.write('<body><h1>You are on the new page</h1></body>');
    res.write('</html>');
    res.end();
})

server.listen(3000);