import { Post } from "@/models/post";
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
  createdBy: "user1",
}));

export const getPosts = async (page: number) => {
  const pageSize = 20;

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const results = posts.slice(startIndex, endIndex);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return { data: results, page: page };
};

export const addPost = async (newPost: Pick<Post, "content" | "title">) => {
  const post: Post = {
    ...newPost,
    id: v4(),
    created: new Date(),
    images: generateImages(),
    createdBy: "user2",
  };

  posts = [post, ...posts];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return { data: post };
};

export const deletePost = async (postId: string) => {
  posts = posts.filter((post) => post.id !== postId);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {};
};
