function getIPAdress() {
      var interfaces = require('os').networkInterfaces();
      for (var devName in interfaces) {
          var iface = interfaces[devName];
          for (var i = 0; i < iface.length; i++) {
              var alias = iface[i];
              if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                  return alias.address;
              }
          }
      }
  }
  const express = require("express");
  const chalk = require("chalk");
  const path = require("path");
  const port = 8080;
  const app = express();
  const ip = getIPAdress();
  
  app.use(express.static(path.join(__dirname, "/")));
  
  app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "index.html"))
  })
  
  app.listen(port, function () {
      console.log(chalk.bgBlue(`server running in http://${ip}:${port}`));
  })
  