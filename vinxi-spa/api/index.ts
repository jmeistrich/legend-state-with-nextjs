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
    console.log(id);
    if (event.method === "GET") {
      return getCustomer(+id);
    }
    if (event.method === "PUT") {
      const customer = await readBody(event) as Customer;
      return updateCustomer(+id, customer);
    }
  }
  if (info.pathname.startsWith("/api/customers")) {
    if (event.method === "POST") {
      const customer = await readBody(event) as Customer;
      return createCustomer(customer);
    } else if (event.method === "GET") {
      return getCustomers();
    }
  }
});
