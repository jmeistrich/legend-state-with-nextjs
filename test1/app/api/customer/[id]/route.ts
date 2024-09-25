import { NextResponse } from "next/server";
import { getCustomer, updateCustomer } from "@/lib/customers";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  return NextResponse.json(getCustomer(parseInt(params.id)));
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const customer = await req.json();
  console.log(`Updating customer ${params.id}`, customer);
  return NextResponse.json(updateCustomer(parseInt(params.id), customer));
}
