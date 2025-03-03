import NextLink from "next/link";

interface Props {
  children: string;
  href: string;
}
const Link = ({ children, href }: Props) => {
  return <NextLink href={href} className="text-amber-500 font-bold hover:underline">{children}</NextLink>;
};

export default Link;
