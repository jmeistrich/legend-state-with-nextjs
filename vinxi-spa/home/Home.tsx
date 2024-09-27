/// <reference types="vinxi/types/client" />
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { type Customer } from "../lib/customers";

export default function Home() {
  const { data, isLoading } = useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: () => fetch("/api/customers").then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-5 text-2xl flex flex-col gap-4">
      {data?.map((customer) => (
        <Link
          key={customer.id}
          to={`/customers/${customer.id}`}
          className="hover:underline"
        >
          <div>{customer.name}</div>
        </Link>
      ))}
    </div>
  );
}
