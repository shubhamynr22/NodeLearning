const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><h1>Hello from the other side !!</h1><form action = "/message" method = "POST" ><input type = "text" name ="message"><button type = "submit">Click Here!</button></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(parsedBody);
      fs.writeFile("message2.txt", message, (err) => {
        res.statusCode = "302";
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Shubhams Response</title></head>");
  res.write("<body><h1>You are on the new page</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
