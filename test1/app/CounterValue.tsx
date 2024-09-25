"use client";
import { Memo } from "@legendapp/state/react";

import { useCounter } from "./StateContext";
import React from "react";

export default function CounterValue() {
  const { counter$ } = useCounter();

  return (
    <div>
      <Memo>{() => <div>Counter Value: {counter$.get()}</div>}</Memo>
    </div>
  );
}
