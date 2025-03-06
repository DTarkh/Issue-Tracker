import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/app/lib/prisma";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";


interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();


  return (
    <Box>
      <Heading>{issue.title}</Heading>
      <Flex my="3" gap="2" align="center">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <Text>{issue.description}</Text>
      </Card>
    </Box>
  );
};

export default IssueDetailPage;
