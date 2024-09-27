import fs from "node:fs";

export interface Customer {
  id: string;
  name: string;
  email: string;
}

const CUSTOMERS_FILE = "customers-data.json";

export function getCustomers(): Customer[] {
  const data = fs.readFileSync(CUSTOMERS_FILE, "utf8");
  return JSON.parse(data);
}

export function getCustomer(id: string): Customer | null {
  const customers = getCustomers();
  return customers.find((customer) => customer.id === id) || null;
}

export function createCustomer(customer: Customer): Customer {
  const customers = getCustomers();
  const newCustomer = { ...customer, id: `${customers.length + 1}` };

  customers.push(newCustomer);
  fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(customers, null, 2));
  return newCustomer;
}

export function updateCustomer(
  id: string,
  customer: Customer,
): Customer | null {
  const customers = getCustomers();
  const index = customers.findIndex((customer) => customer.id === id);

  if (index === -1) {
    return null;
  }

  customers[index] = { ...customers[index], ...customer };
  fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(customers, null, 2));
  return customer;
}
