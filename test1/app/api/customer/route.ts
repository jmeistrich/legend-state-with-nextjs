import { NextResponse } from "next/server";
import { createCustomer } from "@/lib/customers";

export async function POST(req: Request) {
  const customer = await req.json();
  return NextResponse.json(createCustomer(customer));
}
