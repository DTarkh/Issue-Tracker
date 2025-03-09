"use client";

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const currentPath = usePathname();
  const { data, status: session } = useSession();
  console.log(data);

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
            {session === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar src={data.user!.image!} fallback="A" size="2" radius="full"/>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text>{data.user!.email}</Text>
                  </DropdownMenu.Label>
                    <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Sign-out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {session === "unauthenticated" && (
              <Link href="/api/auth/signin">Sign-in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
