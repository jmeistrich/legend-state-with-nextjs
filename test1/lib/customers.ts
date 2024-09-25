import fs from "node:fs";

export interface Customer {
  id: number;
  name: string;
  email: string;
}

export function getCustomers(): Customer[] {
  const data = fs.readFileSync("customers.json", "utf8");
  return JSON.parse(data);
}

export function getCustomer(id: number): Customer | null {
  const customers = getCustomers();
  return customers.find((customer) => customer.id === id) || null;
}

export function createCustomer(customer: Customer): Customer {
  const customers = getCustomers();
  const newCustomer = { ...customer, id: customers.length + 1 };

  customers.push(newCustomer);
  fs.writeFileSync("customers.json", JSON.stringify(customers, null, 2));
  return newCustomer;
}

export function updateCustomer(
  id: number,
  customer: Customer,
): Customer | null {
  const customers = getCustomers();
  const index = customers.findIndex((customer) => customer.id === id);

  console.log(customer);

  if (index === -1) {
    return null;
  }

  customers[index] = { ...customers[index], ...customer };
  fs.writeFileSync("customers.json", JSON.stringify(customers, null, 2));
  return customer;
}
