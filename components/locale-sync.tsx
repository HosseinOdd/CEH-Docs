"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * This component syncs the current locale with localStorage and cookies
 * ONLY when user manually changes language (via LangSelect)
 */
export function LocaleSync() {
  const pathname = usePathname();

  useEffect(() => {
    // Extract current locale from pathname
    const pathParts = pathname.split("/").filter(Boolean);
    const currentLocale = pathParts[0];
    
    if (currentLocale && (currentLocale === "en" || currentLocale === "fa")) {
      const storedLocale = localStorage.getItem("preferred-locale");
      
      // Only save if locale changed (user clicked language selector)
      // Don't overwrite on initial load
      if (storedLocale && storedLocale !== currentLocale) {
        localStorage.setItem("preferred-locale", currentLocale);
        document.cookie = `preferred-locale=${currentLocale}; path=/; max-age=31536000; SameSite=Lax`;
        console.log(`[LocaleSync] User changed locale: ${storedLocale} -> ${currentLocale}`);
      } else if (!storedLocale) {
        // First time visitor - save current locale
        localStorage.setItem("preferred-locale", currentLocale);
        document.cookie = `preferred-locale=${currentLocale}; path=/; max-age=31536000; SameSite=Lax`;
        console.log(`[LocaleSync] First visit, saving locale: ${currentLocale}`);
      }
    }
  }, [pathname]);

  return null;
}
