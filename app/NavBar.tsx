"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { data, status: session } = useSession();

  const Links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="flex space-x-5 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-5">
        {Links.map((link) => (
          <Link
            className={classNames({
              "text-zinc-950": link.href === currentPath,
              "text-zinc-600": link.href !== currentPath,
              "hover:text-zinc-950 transition-colors": true,
            })}
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
      <Box>
        {session === "unauthenticated" && (
          <Link href="/api/auth/signin">Sign-in</Link>
        )}
        {session === "authenticated" && (
          <Link href="/api/auth/signout">Sign-out</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
