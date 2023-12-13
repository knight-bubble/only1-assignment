import { Post } from "@/models/post";
import { PiDotsThreeVertical } from "react-icons/pi";

import DeletePostButton from "../action-buttons/delete-post-button";
import Button from "../base/button";

export default function PostMenu({ post }: { post: Post }) {
  return (
    <div className='dropdown dropdown-end'>
      <Button className='btn-lg btn-ghost m-1'>
        <PiDotsThreeVertical />
      </Button>
      <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
        <li>
          <DeletePostButton post={post} />
        </li>
      </ul>
    </div>
  );
}
