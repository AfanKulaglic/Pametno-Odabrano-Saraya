import { NextResponse } from "next/server";
import collectionData from "../../../../mock/item.json";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return NextResponse.json(collectionData);
}
