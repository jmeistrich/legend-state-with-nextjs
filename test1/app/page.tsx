import Link from "next/link";
import StateContextProvider from "./StateContext";
import Counter from "./Counter";
import CounterValue from "./CounterValue";

import { getCustomers } from "@/lib/customers";

export default async function Home() {
  const customers = await getCustomers();

  return (
    <div className="p-20">
      <StateContextProvider>
        <div className="flex flex-col gap-4">
          <Counter />
          <Counter />
          <CounterValue />
        </div>
      </StateContextProvider>
      <div className="flex flex-col gap-4">
        {customers.map((customer) => (
          <Link key={customer.id} href={`/customer/${customer.id}`}>
            {customer.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
