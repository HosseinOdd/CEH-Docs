import { NextRequest, NextResponse } from "next/server";
import { pathnameHasLocale, locales } from "./lib/locale";

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    
    // Remove basePath if it exists for locale checking
    const basePath = process.env.NODE_ENV === 'production' ? '/CEH-Docs' : '';
    const pathnameWithoutBase = basePath && pathname.startsWith(basePath) 
        ? pathname.slice(basePath.length) 
        : pathname;
    
    const hasLocale = pathnameHasLocale(pathnameWithoutBase);
    if (hasLocale) return;

    // Try to get preferred locale from cookie first
    const preferredLocaleCookie = request.cookies.get('preferred-locale')?.value;
    
    // Determine which locale to use
    let locale = locales[0]; // default to 'en'
    
    // If user has a preferred locale saved in cookie, use it
    if (preferredLocaleCookie && locales.includes(preferredLocaleCookie as any)) {
        locale = preferredLocaleCookie;
    }
    
    request.nextUrl.pathname = `${basePath}/${locale}${pathnameWithoutBase}`;
    // e.g. incoming request is /CEH-Docs/docs/get-started
    // The new URL is now /CEH-Docs/fa/docs/get-started (if user preferred fa)
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next).*)",
    ],
};
