import { queryOptions } from "@tanstack/react-query";

export const fetchCustomer = async (id: string) => {
  const res = await fetch(`/api/customers/${id}`);
  return res.json();
};

export const customerQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["customer", id],
    queryFn: () => fetchCustomer(id),
  });
