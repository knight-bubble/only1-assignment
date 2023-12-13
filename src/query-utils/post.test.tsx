import { Post } from "@/models/post";
import { describe, expect, it } from "vitest";
import { PagedPosts, deletePostUpdater, newPostUpdater } from "./post";

describe("post query utils", () => {
  describe("deletePostUpdater()", () => {
    it("removes the correct post", () => {
      const oldData = {
        pages: [
          {
            data: [{ id: "1" }, { id: "2" }],
            page: 1,
          } as PagedPosts,
        ],
      };

      const updatedData = deletePostUpdater("1")(oldData);

      expect(updatedData.pages[0].data).toEqual([{ id: "2" }]);
    });
  });

  describe("newPostUpdater()", () => {
    it("adds a new post to the beginning of the first page", () => {
      const oldData = {
        pages: [
          {
            data: [{ id: "1" }, { id: "2" }],
            page: 1,
          } as PagedPosts,
        ],
      };

      const newPost = { id: "3" } as Post;
      const updatedData = newPostUpdater(newPost)(oldData);

      expect(updatedData.pages[0].data).toEqual([{ id: "3" }, { id: "1" }, { id: "2" }]);
    });
  });
});
