"use server";

import FeedContentPage from "./content";

export default async function FeedPage() {
  return (
    <main className='w-full h-full '>
      <FeedContentPage></FeedContentPage>
    </main>
  );
}
