import { notFound } from "next/navigation";

import { getCustomer } from "@/lib/customers";

import EditableCustomer from "./EditableCustomer";

export default async function CustomerPage(
  { params }: { params: { id: string } },
) {
  const customer = await getCustomer(+params.id);

  if (!customer) {
    notFound();
  }

  return <EditableCustomer customer={customer} />;
}
