"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import LocalizedLink from "./localized-link";
import { Dictionary } from "@/lib/dictionaries";
import useLocale from "./hooks/useLocale";

type PaginationProps = {
  prev?: { title: string; href: string } | null;
  next?: { title: string; href: string } | null;
  dict: Dictionary;
};

export default function Pagination({ prev, next, dict }: PaginationProps) {
  const locale = useLocale();
  const isRTL = locale === 'fa';

  return (
    <div className="grid grid-cols-2 flex-grow sm:py-10 py-7 gap-3">
      <div>
        {prev && (
          <LocalizedLink
            className={buttonVariants({
              variant: "outline",
              className: `no-underline w-full flex flex-col ${isRTL ? 'pr-3 !items-end' : 'pl-3 !items-start'} !py-8`,
            })}
            href={`/docs${prev.href}`}
          >
            <span className="flex items-center text-muted-foreground text-xs">
              {isRTL ? (
                <>
                  {dict.docs.previous}
                  <ChevronRightIcon className={`w-[1rem] h-[1rem] ${isRTL ? 'ml-1' : 'mr-1'}`} />
                </>
              ) : (
                <>
                  <ChevronLeftIcon className={`w-[1rem] h-[1rem] ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {dict.docs.previous}
                </>
              )}
            </span>
            <span className={`mt-1 ${isRTL ? 'mr-1' : 'ml-1'}`}>
              {dict.leftbar[prev.title as keyof typeof dict.leftbar]}
            </span>
          </LocalizedLink>
        )}
      </div>
      <div>
        {next && (
          <LocalizedLink
            className={buttonVariants({
              variant: "outline",
              className: `no-underline w-full flex flex-col ${isRTL ? 'pl-3 !items-start' : 'pr-3 !items-end'} !py-8`,
            })}
            href={`/docs${next.href}`}
          >
            <span className="flex items-center text-muted-foreground text-xs">
              {isRTL ? (
                <>
                  <ChevronLeftIcon className={`w-[1rem] h-[1rem] ${isRTL ? 'mr-1' : 'ml-1'}`} />
                  {dict.docs.next}
                </>
              ) : (
                <>
                  {dict.docs.next}
                  <ChevronRightIcon className={`w-[1rem] h-[1rem] ${isRTL ? 'mr-1' : 'ml-1'}`} />
                </>
              )}
            </span>
            <span className={`mt-1 ${isRTL ? 'ml-1' : 'mr-1'}`}>
              {dict.leftbar[next.title as keyof typeof dict.leftbar]}
            </span>
          </LocalizedLink>
        )}
      </div>
    </div>
  );
}
