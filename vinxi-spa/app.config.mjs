import reactRefresh from "@vitejs/plugin-react";
import { createApp } from "vinxi";

export default createApp({
  routers: [
    {
      name: "api",
      type: "http",
      base: "/api",
      target: "server",
      handler: "./api/index.ts",
    },
    {
      name: "client",
      type: "spa",
      handler: "./index.html",
      target: "browser",
      plugins: () => [reactRefresh()],
    },
  ],
});
