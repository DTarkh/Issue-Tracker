import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const Links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-5 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-5">
        {Links.map((link) => (
          <Link
            className="text-zinc-600 hover:text-black transition-colors duration-200"
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
