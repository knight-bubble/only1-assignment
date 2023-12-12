import { Post } from "@/models/post";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

const generateImages = () => {
  return Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => {
    return `https://placehold.co/600x400?text=Image+${(i % 5) + 1}`;
  });
};

let posts: Post[] = Array.from({ length: 200 }, (_, i) => ({
  id: v4(),
  title: `Post ${i + 1}`,
  images: generateImages(),
  content: `This is the content of post ${i + 1}`,
  created: new Date(),
}));

console.log("posts");

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageQueryParam = searchParams.get("page");
  const page = pageQueryParam ? parseInt(pageQueryParam, 10) : 1;

  const pageSize = 20;

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const results = posts.slice(startIndex, endIndex);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return NextResponse.json({ data: results, page: page });
}
