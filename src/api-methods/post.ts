import { Post } from "@/models/post";

export const newPostFn = async (newPost: { title: string; content: string }) => {
  const response = await fetch("/api/posts/new", {
    method: "POST",
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.error);
  }

  return response.json();
};

export const deletePostFn = async (postId: string) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.error);
  }

  return response.json();
};

export const fetchPosts = async ({ pageParam }: { pageParam: number }): Promise<{ data: Post[]; page: number }> => {
  const res = await fetch(`/api/posts?page=${pageParam}`);
  return res.json();
};
