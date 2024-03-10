const axios = require("axios");
const fs = require("fs");
const url = require("url");
function getQueryParam(url, param) {
  const startIndex = url.indexOf(`?${param}=`);
  if (startIndex === -1) return null;

  const endIndex = url.indexOf("&", startIndex);

  return url.slice(startIndex + param.length + 2);
}

// Function to handle requests
async function handleIPv6Request(req, res) {
  const { method, url } = req;

  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Key": "15968c3829msh38022259b2d5f40p1b2502jsn7852ac926d81",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  try {
    // Routing
    // API route
    if (method === "GET" && url === "/api/prices") {
      const response = await axios.request(options);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(response.data));
    }

    if (method === "GET" && url.startsWith("/api/prices/coin")) {
      const queryParams = getQueryParam(req.url, "coin");
    

      const priceOptions = {
        method: "GET",
        url:
          "https://coinranking1.p.rapidapi.com/coin/" +
          queryParams +
          "/history",
        params: {
          timePeriod: "24h",
        },
        headers: {
          "X-RapidAPI-Key":
            "15968c3829msh38022259b2d5f40p1b2502jsn7852ac926d81",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      };

      const response = await axios.request(priceOptions);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(response.data));
    }

    if (method === "GET" && url.startsWith("/api/details")) {
      const queryParams = getQueryParam(req.url, "coin");
     

      const coinDetails = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coin/" + queryParams,
        params: {
          timePeriod: "24h",
        },
        headers: {
          "X-RapidAPI-Key":
            "15968c3829msh38022259b2d5f40p1b2502jsn7852ac926d81",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      };

      const response = await axios.request(coinDetails);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(response.data));
    }

    // HTML route
    if (method === "GET" && url === "/") {
      fs.readFile("IPv6/index.html", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          res.end("Internal Server Error");
          return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    }

    if (method === "GET" && url.startsWith("/coin")) {
      fs.readFile("IPv6/coin.html", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain");
          res.end("Internal Server Error");
          return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error: " + error.message);
  }
}
exports.handleIPv6Request = handleIPv6Request;
