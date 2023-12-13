"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <button onClick={handleThemeChange} className='btn btn-sm btn-square btn-ghost print:hidden'>
        {theme === "light" ? <HiOutlineMoon size='1.5rem' /> : <HiOutlineSun size='1.5rem' />}
      </button>
    </>
  );
}
