const http = require("http");
const fs = require("fs");

const hostnameV4 = "127.0.0.1";
const hostnameV6 = "::";
const port = 3000;

const { handleIPv6Request } = require("./IPv6/handleIPv6Request");
const { handleIPv4Request } = require("./IPv4/handleIPv4Request");

// Create separate server instances for IPv4 and IPv6
const serverV4 = http.createServer((req, res) => {
  handleIPv4Request(req, res);
});

const serverV6 = http.createServer((req, res) => {
  handleIPv6Request(req, res);
});

// Listen on both IPv4 and IPv6 addresses
serverV4.listen(port, hostnameV4, () => {
  console.log(`Server running at http://${hostnameV4}:${port}/ (IPv4)`);
});

serverV6.listen(port, hostnameV6, () => {
  console.log(`Server running at http://[${hostnameV6}]:${port}/ (IPv6)`);
});
