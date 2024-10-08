"use client";

import { usePathname } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import Link from "next/link";


const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Wallpapers", href: "/wallpapers" },
];

export default function SideNav({ ...props }) {
  const pathname = usePathname();

  return (
    <Flex
      direction="column"
      {...props}>
      {links.map(link => {
        return (
          <Link
            key={link.name}
            href={link.href}
          >
            {link.name}
          </Link>
        );
      })}
    </Flex>
  );
}
