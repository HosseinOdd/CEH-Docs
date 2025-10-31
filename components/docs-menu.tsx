"use client";

import { ROUTES } from "@/lib/routes-config";
import SubLink from "./sublink";
import { usePathname } from "next/navigation";
import useLocale from "./hooks/useLocale";

export default function DocsMenu({ isSheet = false }) {
  const pathname = usePathname();
  const locale = useLocale();
  const isRTL = locale === 'fa';
  
  if (!/^\/[a-z]{2}\/docs/.test(pathname)) return null;

  return (
    <div className={`flex flex-col gap-3.5 mt-5 pb-6 ${isRTL ? 'pl-2' : 'pr-2'}`}>
      {ROUTES.map((item, index) => {
        const modifiedItems = {
          ...item,
          href: `/docs${item.href}`,
          level: 0,
          isSheet,
        };
        return <SubLink key={item.title + index} {...modifiedItems} />;
      })}
    </div>
  );
}
