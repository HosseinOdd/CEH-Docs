import { EachRoute } from "@/lib/routes-config";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LocalizedLink from "./localized-link";
import { useDictionary } from "./contexts/dictionary-provider";
import useLocale from "./hooks/useLocale";

export default function SubLink({
  title,
  href,
  items,
  noLink,
  level,
  isSheet,
}: EachRoute & { level: number; isSheet: boolean }) {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(level == 0);
  const dict = useDictionary();
  const locale = useLocale();
  const isRTL = locale === 'fa';

  useEffect(() => {
    if (path == href || path.includes(href)) setIsOpen(true);
  }, [href, path]);

  const Comp = (
    <LocalizedLink
      activeClassName="text-red-500 dark:font-medium font-semibold"
      href={href}
      className={cn(
        isSheet && isRTL && "w-full text-right"
      )}
    >
      {dict.leftbar[title as keyof typeof dict.leftbar]}
    </LocalizedLink>
  );

  const titleOrLink = !noLink ? (
    isSheet ? (
      <SheetClose asChild>{Comp}</SheetClose>
    ) : (
      Comp
    )
  ) : (
    <h4 className={cn(
      "font-medium sm:text-sm text-primary",
      isRTL ? "text-right w-full" : "text-left"
    )}>
      {dict.leftbar[title as keyof typeof dict.leftbar]}
    </h4>
  );

  if (!items) {
    return (
      <div className={cn(
        "flex flex-col w-full",
        isRTL ? "items-end" : "items-start"
      )}>
        {titleOrLink}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className={isRTL ? 'w-full pl-5' : 'w-full pr-5'}>
          <div className={cn(
            "flex items-center cursor-pointer w-full",
            isRTL && !isSheet && "sm:flex-row-reverse sm:justify-between",
            isRTL && isSheet && "justify-end gap-2",
            !isRTL && "justify-between"
          )}>
            {titleOrLink}
            <span>
              {!isOpen ? (
                isRTL ? (
                  <ChevronLeft className="h-[0.9rem] w-[0.9rem]" />
                ) : (
                  <ChevronRight className="h-[0.9rem] w-[0.9rem]" />
                )
              ) : (
                <ChevronDown className="h-[0.9rem] w-[0.9rem]" />
              )}
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div
            className={cn(
              "flex flex-col sm:text-sm dark:text-stone-300/85 text-stone-800 mt-2.5 gap-3",
              isRTL ? "items-end" : "items-start",
              level > 0 && (isRTL ? "pr-4 border-r mr-1.5 ml-0.5" : "pl-4 border-l ml-1.5 mr-0.5"),
              isSheet && isRTL && "pr-4 border-r"
            )}
          >
            {items?.map((innerLink) => {
              const modifiedItems = {
                ...innerLink,
                href: `${href + innerLink.href}`,
                level: level + 1,
                isSheet,
              };
              return <SubLink key={modifiedItems.href} {...modifiedItems} />;
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
