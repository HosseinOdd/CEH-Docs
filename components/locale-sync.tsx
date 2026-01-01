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
    const pathParts = pathname.split("/").filter(Boolean);
    const currentLocale = pathParts[0];
    
    if (currentLocale && (currentLocale === "en" || currentLocale === "fa")) {
      // Save to localStorage
      localStorage.setItem("preferred-locale", currentLocale);
      
      // Save to cookie (for middleware to read)
      // Set cookie with proper attributes for GitHub Pages
      document.cookie = `preferred-locale=${currentLocale}; path=/; max-age=31536000; SameSite=Lax`;
      
      console.log(`[LocaleSync] Saved locale: ${currentLocale}`);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}
