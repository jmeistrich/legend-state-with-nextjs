"use client";
import { Memo, observer } from "@legendapp/state/react";

import { Button } from "@/components/ui/button";

import { useCounter } from "./StateContext";
import React from "react";

function Counter() {
  const { counter$ } = useCounter();

  return (
    <div>
      <Button onClick={() => counter$.set((c) => c + 1)}>
        Counter: {counter$.get()}
      </Button>
      <Memo>{() => <div>Count: {counter$.get()}</div>}</Memo>
    </div>
  );
}

export default observer(Counter);
