import { NextRequest, NextResponse } from "next/server";

import { addPost } from "@/mocks/posts";
import { Post } from "@/models/post";

export async function POST(request: NextRequest) {
  const postBody: Pick<Post, "content" | "title"> = await request.json();

  if (!postBody) {
    return new NextResponse(null, { status: 400 });
  }

  if (Math.random() > 0.5) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

  const result = await addPost(postBody);

  return NextResponse.json(result);
}
