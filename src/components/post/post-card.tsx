import { useUser } from "@/contexts/user-context";
import { Post } from "@/models/post";
import PostImageCarousel from "./post-image-carousel";
import PostMenu from "./post-menu";

export default function PostCard({ post }: { post: Post }) {
  const { user } = useUser();

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title flex flex-row justify-between'>
          <span>{post.title}</span>
          {post.createdBy === user && <PostMenu post={post} />}
        </h5>
        <p className='card-text'>{post.content}</p>
        <PostImageCarousel images={post.images} />
      </div>
    </div>
  );
}
