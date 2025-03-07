import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Flex, Heading, Text, Card } from "@radix-ui/themes";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex my="3" gap="2" align="center" justify="between">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <Text>{issue.description}</Text>
      </Card>
    </>
  );
};

export default IssueDetails;
