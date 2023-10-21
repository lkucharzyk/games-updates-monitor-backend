const { createProxyMiddleware } = require("http-proxy-middleware");

const apiProxy = createProxyMiddleware({
  target: "https://store.steampowered.com",
  changeOrigin: true,
  onProxyRes(proxyRes) {
    proxyRes.headers["x-added"] = "foobar"; // add new header to response
    delete proxyRes.headers["x-removed"]; // remove header from response
  },
});

// Expose the proxy on the "/api/*" endpoint.
export default function (req, res) {
  return apiProxy(req, res);
}
