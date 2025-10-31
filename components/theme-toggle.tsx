"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dictionary } from "@/lib/dictionaries";
import { useDictionary } from "./contexts/dictionary-provider";
import useLocale from "./hooks/useLocale";

export function ModeToggle({}: { dict: Dictionary }) {
  const { setTheme } = useTheme();
  const dict = useDictionary();
  const locale = useLocale();
  const isRTL = locale === 'fa';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? "start" : "end"} className={isRTL ? "text-right" : ""}>
        <DropdownMenuItem onClick={() => setTheme("light")} className={isRTL ? "justify-end" : ""}>
          {dict.navbar.theme.light}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className={isRTL ? "justify-end" : ""}>
          {dict.navbar.theme.dark}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className={isRTL ? "justify-end" : ""}>
          {dict.navbar.theme.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
