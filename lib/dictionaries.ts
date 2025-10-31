import { cache } from "react";
import { Locale } from "./locale";

export type LangProps = { params: Promise<{ lang: Locale }> };

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  fa: () => import("@/dictionaries/fa.json").then((module) => module.default),
};

const getDictionaryUncached = async (locale: Locale) => dictionaries[locale]();

export const getDictionary = cache(getDictionaryUncached);

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
