"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

import { newPostFn } from "@/api-methods/post";

import { POSTS_QUERY_KEY, newPostUpdater } from "@/query-utils/post";
import Button from "../base/button";
import Loader from "../base/loader";
import Modal from "../base/modal";
import Toast from "../base/toast";

type NewPostFormInput = {
  title: string;
  content: string;
};

export default function NewPostButton() {
  let [isOpen, setIsOpen] = useState(false);

  const openNewPostModal = () => {
    setIsOpen(true);
  };

  const cancelNewPost = () => {
    setIsOpen(false);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: newPostFn,
    onSuccess: (newPost) => {
      queryClient.setQueryData(POSTS_QUERY_KEY, newPostUpdater(newPost.data));

      reset();
      setIsOpen(false);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewPostFormInput>();

  const onSubmit = (data: NewPostFormInput) => mutation.mutateAsync(data);

  return (
    <>
      <div className='absolute bottom-0 -translate-y-1/2 right-[calc(50%-12rem)]'>
        <Button className='btn-primary btn-circle' onPress={openNewPostModal}>
          <FaPlus />
        </Button>
      </div>

      <Modal title='Add new Post' isOpen={isOpen} onCancel={cancelNewPost}>
        <Loader loading={mutation.isPending}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Title</span>
              </label>
              <input
                className={twMerge("input input-bordered", errors.title && "input-error")}
                placeholder='A title for your post'
                id='title'
                type='text'
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                })}
              />
              <div className='label'>
                {errors.title && <div className='label-text-alt text-error'>{errors.title.message}</div>}
              </div>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Content</span>
              </label>
              <textarea
                className={twMerge("textarea textarea-bordered", errors.content && "textarea-error")}
                placeholder='The content of your post'
                id='content'
                {...register("content", {
                  required: {
                    value: true,
                    message: "Content is required",
                  },
                })}
              />
              <div className='label'>
                {errors.content && <div className='label-text-alt text-error'>{errors.content.message}</div>}
              </div>
            </div>
            <div className='modal-action'>
              <Button onPress={cancelNewPost}>Cancel</Button>
              <Button type='submit' className='btn-accent'>
                Save
              </Button>
            </div>
          </form>
        </Loader>
      </Modal>

      <Toast isShown={mutation.isError} type='error' message={`Post was not created: ${mutation.error?.message}`} />
      <Toast isShown={mutation.isSuccess} type='success' message='Post was created successfully' />
    </>
  );
}
