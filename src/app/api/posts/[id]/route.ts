import { deletePost } from "@/mocks/posts";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const postId = params.id;

  if (!postId) {
    return new NextResponse(null, { status: 400 });
  }

  const result = await deletePost(postId);

  return NextResponse.json(result);
}
