import { Post } from "@/models/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { deletePost } from "@/mocks/posts";
import { POSTS_QUERY_KEY, deletePostUpdater } from "@/query-utils/post";
import Button from "../base/button";
import Modal from "../base/modal";
import Toast from "../base/toast";

export default function DeletePostButton({ post }: { post: Post }) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.setQueryData(POSTS_QUERY_KEY, deletePostUpdater(post.id));
      setIsOpen(false);
    },
  });

  const openDeleteModal = () => setIsOpen(true);

  const cancelDelete = () => setIsOpen(false);

  const handleDelete = async () => {
    await mutation.mutateAsync(post.id);

    if (mutation.isSuccess) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <a onClick={openDeleteModal}>Delete</a>
      <Modal title='Are you sure you want to delete?' isOpen={isOpen} onCancel={cancelDelete}>
        <div className='flex flex-row justify-end'>
          <Button className='btn-outline' onPress={cancelDelete}>
            Cancel
          </Button>
          <Button className='btn-danger' onPress={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>

      <Toast isShown={mutation.isError} type='error' message='Post couldn"t be deleted :(' />
      <Toast isShown={mutation.isSuccess} type='success' message='Post was deleted :(' />
    </>
  );
}
