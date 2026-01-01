"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Client-side locale redirect for static export
 * Since middleware doesn't work with static export, we need client-side redirect
 */
export function LocaleRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run on root path or paths without locale
    const pathParts = pathname.split("/").filter(Boolean);
    const firstPart = pathParts[0];
    
    // Check if first part is a valid locale
    const hasLocale = firstPart === "en" || firstPart === "fa";
    
    if (!hasLocale) {
      // Try to get preferred locale from localStorage or cookie
      let preferredLocale = "en"; // default
      
      if (typeof window !== "undefined") {
        // Check localStorage first
        const storedLocale = localStorage.getItem("preferred-locale");
        if (storedLocale === "fa" || storedLocale === "en") {
          preferredLocale = storedLocale;
        }
      }
      
      // Redirect to preferred locale
      const newPath = `/${preferredLocale}${pathname}`;
      console.log(`[LocaleRedirect] Redirecting to: ${newPath}`);
      router.replace(newPath);
    }
  }, [pathname, router]);

  return null;
}
