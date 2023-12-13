import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchPosts } from "@/api-methods/post";
import { POSTS_QUERY_KEY } from "@/query-utils/post";
import VirtualScrollContainer from "../base/virtual-scroll-container";
import PostsFeedSkeleton from "../skeletons/posts-feed-skeleton";
import PostCard from "./post-card";

export default function PostsFeed() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.data.length > 0 ? lastPage.page + 1 : undefined),
  });

  const posts = data?.pages.flatMap((pageData) => pageData.data) ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (status === "pending") {
    return <PostsFeedSkeleton />;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <VirtualScrollContainer count={hasNextPage ? posts.length + 1 : posts.length} loadMore={loadMore}>
      {(virtualIndex) => {
        const isLoaderRow = virtualIndex > posts.length - 1;
        const post = posts[virtualIndex];

        if (!isLoaderRow) {
          return <PostCard key={post.id} post={post} />;
        }

        return hasNextPage ? "Loading more..." : "Nothing more to load";
      }}
    </VirtualScrollContainer>
  );
}
