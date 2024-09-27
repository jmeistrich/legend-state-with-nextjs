import { eventHandler, getRequestURL, readBody } from "vinxi/http";

import {
  createCustomer,
  type Customer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../lib/customers";

export default eventHandler(async (event) => {
  const info = getRequestURL(event);

  if (info.pathname.startsWith("/api/customers/")) {
    const id = info.pathname.split("/")[3];
    if (event.method === "GET") {
      return getCustomer(id);
    }
    if (event.method === "PUT") {
      const data = await readBody(event);
      const customer = JSON.parse(data) as Customer;
      return updateCustomer(id, customer);
    }
  }
  if (info.pathname.startsWith("/api/customers")) {
    if (event.method === "POST") {
      const data = await readBody(event);
      const customer = JSON.parse(data) as Customer;
      return createCustomer(customer);
    } else if (event.method === "GET") {
      return getCustomers();
    }
  }
});
