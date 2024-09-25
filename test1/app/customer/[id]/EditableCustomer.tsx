"use client";
import { useObservableSyncedQuery } from "@legendapp/state/sync-plugins/tanstack-react-query";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { observer, useObservable } from "@legendapp/state/react";

import { Input } from "@/components/ui/input";

import type { Customer } from "@/lib/customers";

function EditableCustomer({ customer }: { customer: Customer }) {
  const loadState$ = useObservable(customer);
  const state$ = useObservableSyncedQuery<Customer>({
    query: {
      queryKey: ["user", customer.id],
      queryFn: async () => {
        return fetch(`/api/customer/${customer.id}`).then((v) => v.json());
      },
      initialData: customer,
    },
    mutation: {
      mutationFn: async function <Customer,>(variables: Customer) {
        const { name, email } = loadState$.get();
        const sendData: Partial<Customer> = {};
        if (variables.name !== name) {
          sendData.name = variables.name;
        }
        if (variables.email !== email) {
          sendData.email = variables.email;
        }
        return fetch(
          `/api/customer/${customer.id}`,
          { method: "PUT", body: JSON.stringify(sendData) },
        ).then((v) => v.json());
      },
    },
    transform: {
      load: (data) => {
        loadState$.set(data);
        return data;
      },
    },
    persist: {
      plugin: ObservablePersistLocalStorage,
      retrySync: true,
      name: "profile",
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Input
        value={state$.get().name}
        onChange={(e) => state$.name.set(e.target.value)}
        placeholder="Customer name"
      />
      <Input
        value={state$.get().email}
        onChange={(e) => state$.email.set(e.target.value)}
        placeholder="Customer email"
      />
    </div>
  );
}

export default observer(EditableCustomer);
