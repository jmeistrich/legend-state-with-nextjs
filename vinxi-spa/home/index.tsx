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
import { QueryClientProvider, useSuspenseQuery } from "@tanstack/react-query";

import { queryClient } from "./queryClient";

import Home from "./Home";
import EditableCustomer from "./EditableCustomer";

import "./index.css";

import { customerQueryOptions } from "./fetchCustomer";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
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
  component: Home,
});

const customersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "customers",
});

const customersIndexRoute = createRoute({
  getParentRoute: () => customersRoute,
  path: "/",
  component: Home,
});

const customerDetailRoute = createRoute({
  getParentRoute: () => customersRoute,
  path: "$customerId",
  loader: ({ context: { queryClient }, params: { customerId } }) => {
    return queryClient.ensureQueryData(customerQueryOptions(customerId));
  },
  component: () => {
    const { customerId } = customerDetailRoute.useParams();
    const customerQuery = useSuspenseQuery(customerQueryOptions(customerId));
    const customer = customerQuery.data;

    return <EditableCustomer customer={customer} key={customerId} />;
  },
});

const routeTree = rootRoute.addChildren([
  customersRoute.addChildren([customersIndexRoute, customerDetailRoute]),
  indexRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
