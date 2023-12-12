# Only1: Fullstack Developer Assignment

Your task is to create a basic post feed akin to Twitter using NextJS (App Router), Tailwind CSS, React Query v5, React Context, and React Suspense. You are given 1 day to complete this task.

UI frameworks may be used for this task, though they must be headless such that they must be styled via. Tailwind (i.e. Radix UI, Headless UI).

The choice of UI framework, alongside any other libraries of your choice must be specified to us and verified by us on Telegram beforehand with reasons as to why the UI framework/library is suitable to be used in production.

Accessibility via. ARIA roles should be taken into consideration. Consider `react-aria` for accessibility if the UI framework of choice (if you choose to use any) does not provide accessibility out of the box.

## Layout

All modals should be full-screen on mobile screens, and with a border + rounded-xl edges + centered to the top on desktop screens. On mobile, a 'X' button should be fixed to the top-left corner of the modal to dismiss the modal.

The post feed should be full-screen on mobile screens, and otherwise centered to the middle of the screen on desktop screens.

The `New Post` floating action button (FAB) should be stickied to the bottom-right corner of the screen on mobile screens, and sticked to the bottom-right of the post feed on desktop screens.

## Feed

The post feed is an infinite list of posts. The post feed is sorted chronologically such that the newest posts are at the top of the feed. When the user scrolls to the bottom of the feed, more posts are automatically loaded and appended to the end of the feed.

The query used to paginate post feed should be mocked to take 1 second to load. While the post feed is loading, a skeleton of the post feed should be shown using React Suspense.

## Delete Post

On each post in the post feed, a dropdown menu button should be available on the top right. The dropdown menu contains a 'Delete' button if the user is the creator of the post. The 'Delete' button may be clicked to delete the post.

A confirmation modal should be shown to the user prior to deleting the post. The modal should not be in a separate parallel route. The modal may not be dismissed by clicking anywhere outside of the modal. A `Cancel` button is available on the modal to dismiss the dialog.

The mutation used to delete a post should be mocked to be performed 1 second after the request to delete the post is made. While the post ie being deleted, the post's opacity should be 70% and the any HTML elements on the post should be set to be disabled such that they may not be interacted with. Some sort of loading indicator should be shown to the user that the request to delete the post is being handled.

## New Post

A `New Post` Floating Action Button (FAB) is used to create new posts. Clicking on it opens a `New Post` modal form located at the parallel route `/new` where you can enter text content and submit to create a new post. Creating a new post should prepend the new post to the top of the post feed.

Clicking outside of the New Post modal should close the modal and return the user to the last page in the router's history, if any previous page is available. If no previous page is available, redirect the user to the home page.

The mutation used to create a new post should be mocked to be performed 1 second after the request to create a new post is made. While the new post is being made, form controls where appropriate on the New Post modal form should be disabled. Some sort of loading indicator should be shown to the user that the request to create the new post is being handled.

The mutation used to create a new post has a 50% chance of erroring. If an error occurs, indicate to the user a message that can be provided to the team on what went wrong and allow them to try submitting the form again.

## Bonus

Bonus points will be given for any additional features, styling, or tests (unit tests/end-to-end tests) included. Bonus points will also be given should post data be persisted to a database.

Examples of additional features include i.e. providing a Filter option where users can filter the post feed only for posts created by the user themselves (or by other specific users), or implementing likes/comments.