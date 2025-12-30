// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  {
    // this title is translation key present in en.json or other language files
    // make sure you add translation for this key in all language files
    title: "getting_started",
    href: "/getting-started",
    noLink: true,
    items: [
      { title: "introduction", href: "/introduction" },
      { title: "metasploitable", href: "/metasploitable" },
      { title: "owaspbwa", href: "/owaspbwa" },
    ],
  },
  {
    title: "ceh_phrases",
    href: "/ceh-phrases",
    noLink: true,
    items: [
      { title: "ethical_hacking_phrases", href: "/ethical-hacking-phrases" },
      { title: "infosec_phrases", href: "/infosec-phrases" },
      { title: "attack_phrases", href: "/attack-phrases" },
      { title: "hacking_fundamentals", href: "/hacking-fundamentals" },
    ],
  },
  {
    title: "footprinting_reconnaissance",
    href: "/footprinting-reconnaissance",
    noLink: true,
    items: [
      { title: "footprinting_intro", href: "/footprinting-intro" },
      { title: "hack_using_google", href: "/hack-using-google" },
      { title: "social_engineering", href: "/social-engineering" },
      { title: "website_reconnaissance", href: "/website-reconnaissance" },
      { title: "email_header", href: "/email-header" },
      { title: "dns_footprinting", href: "/dns-footprinting" },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
