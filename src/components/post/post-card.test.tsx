import { UserProvider } from "@/contexts/user-context";
import { Post } from "@/models/post";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PostCard from "./post-card";

const queryClient = new QueryClient();

vi.mock("./post-image-carousel", () => ({
  default: ({ images }: { images: string[] }) => <div>Mock PostImageCarousel</div>,
}));
vi.mock("../base/toast", () => ({
  default: ({ message, type, isShown }: { message: string; type: "error" | "success"; isShown: boolean }) => (
    <div>Mock Toast</div>
  ),
}));

describe("PostCard", () => {
  it("PostCard renders correctly", () => {
    const mockPost = {
      id: "1",
      title: "Test Post",
      content: "This is a test post.",
      images: [],
      createdBy: "someuser",
      created: new Date(),
    } as Post;

    const { getByText } = render(
      <UserProvider user='someuser'>
        <QueryClientProvider client={queryClient}>
          <PostCard post={mockPost} />
        </QueryClientProvider>
      </UserProvider>
    );

    expect(getByText("Test Post")).toBeDefined();
    expect(getByText("This is a test post.")).toBeDefined();
  });
});
