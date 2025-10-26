import { NextRequest, NextResponse } from "next/server";
import { getLocale, pathnameHasLocale } from "./lib/locale";

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

    // Redirect if there is no locale
    const locale = getLocale(pathnameWithoutBase);
    request.nextUrl.pathname = `${basePath}/${locale}${pathnameWithoutBase}`;
    // e.g. incoming request is /CEH-Docs/docs/get-started
    // The new URL is now /CEH-Docs/en/docs/get-started
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next).*)",
    ],
};
