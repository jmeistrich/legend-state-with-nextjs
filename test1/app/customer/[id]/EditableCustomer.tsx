"use client";
import { useObservableSyncedQuery } from "@legendapp/state/sync-plugins/tanstack-react-query";
import { observer } from "@legendapp/state/react";

import { Input } from "@/components/ui/input";

import type { Customer } from "@/lib/customers";

function EditableCustomer({ customer }: { customer: Customer }) {
  const state$ = useObservableSyncedQuery<Customer>({
    query: {
      queryKey: ["user", customer.id],
      queryFn: async () => {
        return fetch(`/api/customer/${customer.id}`).then((v) => v.json());
      },
      initialData: customer,
    },
    mutation: {
      mutationFn: async (variables) => {
        return fetch(
          `/api/customer/${customer.id}`,
          { method: "PUT", body: JSON.stringify(variables) },
        ).then((v) => v.json());
      },
    },
  });

  return state$.get()
    ? (
      <div className="flex flex-col gap-2">
        <Input
          value={state$.get().name}
          onChange={(e) => state$.get().name.set(e.target.value)}
          placeholder="Customer name"
        />
        <Input
          value={state$.get().email}
          onChange={(e) => state$.get().email.set(e.target.value)}
          placeholder="Customer email"
        />
      </div>
    )
    : null;
}

export default observer(EditableCustomer);
