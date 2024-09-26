/// <reference types="vinxi/types/client" />
import ReactDOM from "react-dom/client";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";

import { Button } from "../components/ui/button";

import "./index.css";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <ImageDisplay />,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => <div>About</div>,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = createRouter({ routeTree, defaultPreload: "intent" });

function ImageDisplay() {
  return (
    <>
      <div>
        <Button>Click me</Button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
