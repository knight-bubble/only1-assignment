import { getPosts } from "@/mocks/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageQueryParam = searchParams.get("page");
  const page = pageQueryParam ? parseInt(pageQueryParam, 10) : 1;

  const result = await getPosts(page);

  return NextResponse.json(result);
}
