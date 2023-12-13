import PostCardSkeleton from "./post-card-skeleton";

export default function PostsFeedSkeleton() {
  return (
    <div className='w-full h-full'>
      <div className='w-96 mx-auto'>
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    </div>
  );
}
