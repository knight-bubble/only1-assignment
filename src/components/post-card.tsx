import { Post } from "@/models/post";
import Image from "next/image";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{post.title}</h5>
        <p className='card-text'>{post.content}</p>
        {post.images.map((image, index) => (
          <Image className='card-img-top' key={index} src={image} width={500} height={300} alt={post.title} />
        ))}
      </div>
    </div>
  );
}
