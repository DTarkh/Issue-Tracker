import prisma from "@/app/lib/prisma";

import { notFound, redirect } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { auth } from "@/auth";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}
const IssueEditPage = async ({ params }: Props) => {
  const session = await auth();
    if (!session) redirect("/api/auth/signin");
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
