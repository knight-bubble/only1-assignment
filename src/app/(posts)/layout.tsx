import Link from "next/link";
import { ReactNode } from "react";

import NewPostButton from "@/components/action-buttons/new-post-button";
import ThemeSwitcher from "@/components/base/theme-switcher";

export default function PostsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='navbar bg-base-200'>
        <Link href='/' className='btn btn-ghost text-xl'>
          Only1
        </Link>
        <ThemeSwitcher />
      </div>
      <main className='h-[calc(100vh-4rem)]'>{children}</main>
      <NewPostButton />
    </>
  );
}
