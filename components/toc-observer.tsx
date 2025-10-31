"use client";

import { getDocsTocs } from "@/lib/markdown";
import clsx from "clsx";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import useLocale from "./hooks/useLocale";

type Props = { data: Awaited<ReturnType<typeof getDocsTocs>> };

export default function TocObserver({ data }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const locale = useLocale();
  const isRTL = locale === 'fa';

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        setActiveId(visibleEntry.target.id);
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-20px 0px 0px 0px",
      threshold: 0.1,
    });

    const elements = data.map((item) =>
      document.getElementById(item.href.slice(1))
    );

    elements.forEach((el) => {
      if (el && observer.current) {
        observer.current.observe(el);
      }
    });

    return () => {
      if (observer.current) {
        elements.forEach((el) => {
          if (el) {
            observer.current!.unobserve(el);
          }
        });
      }
    };
  }, [data]);

  return (
    <div className={`flex flex-col gap-2.5 text-sm dark:text-stone-300/85 text-stone-800 ${isRTL ? 'mr-0.5' : 'ml-0.5'}`}>
      {data.map(({ href, level, text }, index) => {
        return (
          <Link
            key={href + text + level + index}
            href={href}
            className={clsx(
              isRTL ? 'text-right' : 'text-left',
              {
                "pr-0": isRTL && level == 2,
                "pr-4": isRTL && level == 3,
                "pr-8": isRTL && level == 4,
                "pl-0": !isRTL && level == 2,
                "pl-4": !isRTL && level == 3,
                "pl-8": !isRTL && level == 4,
                "dark:font-medium font-semibold !text-red-500":
                  activeId == href.slice(1),
              }
            )}
          >
            {text}
          </Link>
        );
      })}
    </div>
  );
}
