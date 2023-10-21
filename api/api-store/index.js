const { createProxyMiddleware } = require("http-proxy-middleware");

const apiProxy = createProxyMiddleware({
  target: "https://store.steampowered.com",
  changeOrigin: true,
  onProxyRes(proxyRes) {
    proxyRes.headers["access-control-allow-origin"] = "*";
  },
});

// Expose the proxy on the "/api/*" endpoint.
export default function (req, res) {
  return apiProxy(req, res);
}
