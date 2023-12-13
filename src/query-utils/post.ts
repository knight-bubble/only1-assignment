import { Post } from "@/models/post";

export type PagedPosts = {
  data: Post[];
  page: number;
};

export const POSTS_QUERY_KEY = ["posts"];

export const deletePostUpdater = (postId: string) => (oldData: { pages: PagedPosts[] }) => {
  if (!oldData) {
    return oldData;
  }

  return {
    ...oldData,
    pages: oldData.pages.map((page) => ({
      ...page,
      data: page.data.filter((p) => p.id !== postId),
    })),
  };
};

export const newPostUpdater = (newPost: Post) => (oldData: { pages: PagedPosts[] }) => {
  if (!oldData) {
    return oldData;
  }

  const page = oldData.pages[0];

  return {
    ...oldData,
    pages: [
      {
        ...page,
        data: [newPost, ...page.data],
      },
    ],
  };
};
