"use client";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { observer } from "@legendapp/state/react";
import { Observable, observable } from "@legendapp/state";
import { syncedQuery } from "@legendapp/state/sync-plugins/tanstack-query";

import { Input } from "../components/ui/input";

import type { Customer } from "../lib/customers";

import { queryClient } from "./queryClient";

import { fetchCustomer } from "./fetchCustomer";

function createCustomerStoreVendor() {
  const loadStates: Record<string, Observable<Customer>> = {};
  const states: Record<string, Observable<Customer>> = {};

  return (customer: Customer): Observable<Customer> => {
    const id = customer.id;
    if (!loadStates[id]) {
      loadStates[id] = observable(customer);
      states[id] = observable(syncedQuery<Customer>({
        queryClient,
        query: {
          queryKey: ["customer", id],
          queryFn: () => fetchCustomer(id),
          initialData: customer,
        },
        mutation: {
          mutationFn: async function <Customer,>(variables: Customer) {
            const { name, email } = loadStates[id].get();
            const sendData: Partial<Customer> = {};
            if (variables.name !== name) {
              sendData.name = variables.name;
            }
            if (variables.email !== email) {
              sendData.email = variables.email;
            }
            return fetch(
              `/api/customers/${customer.id}`,
              { method: "PUT", body: JSON.stringify(sendData) },
            ).then((v) => v.json());
          },
        },
        transform: {
          load: (data) => {
            loadStates[id].set(data);
            return data;
          },
        },
        persist: {
          plugin: ObservablePersistLocalStorage,
          retrySync: true,
          name: "profile",
        },
      }));
    }
    return states[id];
  };
}

const customerStore = createCustomerStoreVendor();

function EditableCustomer({ customer }: { customer: Customer }) {
  const state$ = customerStore(customer);

  return (
    <div className="flex flex-col gap-2">
      <div>{JSON.stringify(customer)}</div>
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
