"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { data, status: session } = useSession();

  const Links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="border-b mb-5 px-5 py-5">
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/">
              <FaBug />
            </Link>
            <ul className="flex space-x-5">
              {Links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      "text-zinc-950": link.href === currentPath,
                      "text-zinc-600": link.href !== currentPath,
                      "hover:text-zinc-950 transition-colors": true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {session === "unauthenticated" && (
              <Link href="/api/auth/signin">Sign-in</Link>
            )}
            {session === "authenticated" && (
              <Link href="/api/auth/signout">Sign-out</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
