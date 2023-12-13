"use client";

import { ReactNode, createContext, useContext } from "react";

export type UserContextProps = {
  user: string;
};

const UserContext = createContext<UserContextProps>(undefined as unknown as UserContextProps);

export function UserProvider({ children, user }: { children: ReactNode; user: string }) {
  const value = {
    user: user,
  } satisfies UserContextProps;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("userUser must be used within a UserProvider");
  }

  return context;
}
