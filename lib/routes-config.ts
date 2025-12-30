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
      { title: "hacking_steps", href: "/hacking-steps" },
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
  {
    title: "network_scanning",
    href: "/network-scanning",
    noLink: true,
    items: [
      { title: "network_scanning_intro", href: "/network-scanning-intro" },
      { title: "port_scan_basics", href: "/port-scan-basics" },
      { title: "hping3", href: "/hping3" },
      { title: "nmap", href: "/nmap" },
      { title: "idle_scan", href: "/idle-scan" },
      { title: "os_fingerprinting", href: "/os-fingerprinting" },
      { title: "nessus", href: "/nessus" },
      { title: "solar_winds", href: "/solar-winds" },
      { title: "scapy", href: "/scapy" },
      { title: "proxies", href: "/proxies" },
    ],
  },
    {
    title: "enumeration",
    href: "/enumeration",
    noLink: true,
    items: [
      { title: "enumeration_introduction", href: "/enumeration-introduction" },
      { title: "windows_enumeration", href: "/windows-enumeration" },
      { title: "linux_enumeration", href: "/linux-enumeration" },
      { title: "netBIOS_enumeration", href: "/netBIOS-enumeration" },
      { title: "DNS_enumeration", href: "/DNS-enumeration" },
      { title: "SNMP_enumeration", href: "/SNMP-enumeration" },
      { title: "LDAP_enumeration", href: "/LDAP-enumeration" },
      { title: "NTP_enumeration", href: "/NTP-enumeration" },
      { title: "SMTP_enumeration", href: "/SMTP-enumeration" },
    ],
  },
  {
    title: "malware",
    href: "/malware",
    noLink: true,
    items: [
      { title: "malware_intro", href: "/malware-intro" },
      { title: "spyware", href: "/spyware" },
      { title: "trojans", href: "/trojans" },
      { title: "viruses", href: "/viruses" },
      { title: "malware_detection", href: "/malware-detection" },
      { title: "malware_lifecycle", href: "/malware-lifecycle" },
      { title: "file_verification", href: "/file-verification" },
      { title: "malware_analyze", href: "/malware-analyze" },
      { title: "buffer_overflow", href: "/buffer-overflow" },
      
    ],
  },
  {
    title: "sniffing",
    href: "/sniffing",
    noLink: true,
    items: [
      { title: "sniffing_intro", href: "/sniffing-intro" },
      { title: "tcpdump_wireshark", href: "/tcpdump-wireshark" },
      { title: "cam_table", href: "/cam-table" },
      { title: "dhcp_snooping", href: "/dhcp-snooping" },
      { title: "arp_attacks", href: "/arp-attacks" },
    ],
  },
    {
    title: "social__engineering",
    href: "/social-engineering",
    noLink: true,
    items: [
      { title: "social_engineering_introduction", href: "/social-engineering-introduction" },
      { title: "social_engineering_phases", href: "/social-engineering-phases" },
      { title: "social_engineering_attack", href: "/social-engineering-attack" },
      { title: "social_engineering_prevention", href: "/social-engineering-prevention" },

    ],
  },
  
    {
    title: "dos",
    href: "/dos",
    noLink: true,
    items: [
      { title: "dos_introduction", href: "/dos-introduction" },
      { title: "dos_layers", href: "/dos-layers" },
      { title: "dos_hping3", href: "/dos-hping3" },
      { title: "dos_prevention", href: "/dos-prevention" }

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
