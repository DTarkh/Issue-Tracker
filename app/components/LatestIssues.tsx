import { prisma } from "@/prisma";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./IssueStatusBadge";

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedUser: true,
    },
  });

  return (
    <Card>
      <Heading mb="4" size="4">
        Latest Issues
      </Heading>
      <Table.Root>
        {latestIssues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Flex justify="between">
                <Flex direction="column" gap="2" align="start">
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <IssueStatusBadge status={issue.status} />
                </Flex>
                {issue.assignedUser && (
                  <Avatar
                    fallback="?"
                    src={issue.assignedUser.image!}
                    size="2"
                    radius="full"
                  />
                )}
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
