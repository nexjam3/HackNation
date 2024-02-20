const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = function (temp, el) {
  let output = temp.replace("{%USERNAME%}", el?.name);
  output = output.replace("{%EMAIL%}", el?.email);
  output = output.replace("{%NUMBER%}", el?.phone);
  output = output.replace("{%KMS%}", el?.totalTravelled);
  output = output.replace("{%RIDES%}", el?.totalRides);
  output = output.replace("{%MONEY}", el?.money);
  output = output.replaceAll("{%PHOTO%}", el?.photo);
  return output;
};

let dataObj = fs.readFileSync("./../Data/users.json", "utf-8"); // read the data file
dataObj = JSON.parse(dataObj);

const user = fs.readFileSync("./user.html", "utf-8");
const usercss = fs.readFileSync("./user.css", "utf-8");
const userJs = fs.readFileSync("./user.js", "utf-8");

const server = http.createServer(function (req, res) {
  const path = req.url;
  const { query, pathname } = url.parse(req.url, true);
  console.log(pathname, query.id);

  if (pathname === "/user" || path === "/") {
    const product = dataObj[query.id];
    const output = replaceTemplate(user, product);

    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.write(output);
    res.write(`<style>${usercss}</style>`);
    res.end(`<script>${userJs}</script>`);
  } else if (path === "/shop") {
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Local server is running");
});
