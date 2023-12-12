import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";

import { Post } from "@/models/post";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import PostCard from "./post-card";

export default function PostsFeed() {
  const fetchPosts = async ({ pageParam }: { pageParam: number }): Promise<{ data: Post[]; page: number }> => {
    const res = await fetch("/api/posts?page=" + pageParam);
    return res.json();
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => (lastPage.data.length > 0 ? lastPage.page + 1 : undefined),
  });

  const posts = data?.pages.flatMap((pageData) => pageData.data) ?? [];

  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? posts.length + 1 : posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= posts.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, posts.length, isFetchingNextPage, virtualItems, rowVirtualizer]);

  return (
    <>
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {(error as Error).message}</span>
      ) : (
        <div
          ref={parentRef}
          className='w-full h-[calc(100vh-24px)] scrollbar scrollbar-w-2 scrollbar-thumb-rounded-lg scrollbar-thumb-base-300 scrollbar-track-base-400 overflow-y-scroll'
        >
          <div
            className='w-full relative'
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            <div
              className={twMerge("absolute top-0 left-0 w-full")}
              style={{
                transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
              }}
            >
              {virtualItems.map((virtualRow) => {
                const isLoaderRow = virtualRow.index > posts.length - 1;
                const post = posts[virtualRow.index];

                return (
                  <div key={virtualRow.index} className={isLoaderRow ? `h-[${virtualRow.size}px]` : ""}>
                    {isLoaderRow ? (
                      hasNextPage ? (
                        "Loading more..."
                      ) : (
                        "Nothing more to load"
                      )
                    ) : (
                      <PostCard key={post.id} post={post} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div>{isFetching && !isFetchingNextPage ? "Background Updating..." : null}</div>
    </>
  );
}
