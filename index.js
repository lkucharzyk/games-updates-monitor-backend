var express = require("express");
var { createProxyMiddleware } = require("http-proxy-middleware");

var app = express();
var cors = require("cors");

var PORT = 443;
var HOST = "games-updates-monitor-backend.vercel.app";

var API_URL = "https://store.steampowered.com";
var API_URL2 = "https://api.steampowered.com";

app.use(cors());

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(PORT, function () {
  console.log("CORS-enabled web server listening on port");
});

app.get("/status", (req, res, next) => {
  res.send("This is a proxy service");
});

var proxyOptions = {
  target: API_URL,
  changeOrigin: true,
  //   xfwd: true,
  //   headers: {
  //     Host: "store.steampowered.com",
  //   },
};

var proxyOptions2 = {
  target: API_URL2,
  changeOrigin: true,
};

var proxy = createProxyMiddleware(proxyOptions);
var proxy2 = createProxyMiddleware(proxyOptions2);

app.use("/api", proxy);
app.use("/ISteamNews", proxy2);
app.use("/ISteamApps", proxy2);

app.listen(HOST, () => {
  console.log(`Proxy Started at ${HOST}`);
});
