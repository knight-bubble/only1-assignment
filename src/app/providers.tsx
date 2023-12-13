"use client";

import { ToastProvider } from "@/contexts/toast-context";
import { UserProvider } from "@/contexts/user-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider user='user2'>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute='data-theme'>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}
