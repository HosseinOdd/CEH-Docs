"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * This component syncs the current locale with localStorage and cookies
 * so that the user's language preference persists across visits
 */
export function LocaleSync() {
  const pathname = usePathname();

  useEffect(() => {
    // Extract current locale from pathname
    const currentLocale = pathname.split("/")[1];
    
    if (currentLocale && (currentLocale === "en" || currentLocale === "fa")) {
      // Save to localStorage
      localStorage.setItem("preferred-locale", currentLocale);
      
      // Save to cookie (for middleware to read)
      document.cookie = `preferred-locale=${currentLocale}; path=/; max-age=31536000`; // 1 year
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}
