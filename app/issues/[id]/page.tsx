import prisma from "@/app/lib/prisma";
import { Avatar, Box, Card, Flex, Grid, Separator, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { auth } from "@/auth";
import SelectUser from "./SelectUser";
import { cache } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await auth();
  const issue = await fetchUser(parseInt(params.id));
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
        <CommentForm issueId={params.id}/>
      </Box>
      <Box className="col-span-1">
        {session && (
          <Flex direction="column" gap="4">
            <SelectUser issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

const CommentForm = async ({ issueId}: {issueId: string}) => {
  const comments = await prisma.comment.findMany({
    where: { issueId: parseInt(issueId)  },
    include: {
      user: true,
    },
  });

  if(!comments) return null;

  return (
    <>
      <Text className="text-lg font-bold">Comments</Text>
      <Separator my="3" />

      {/* {comments.length === 0 ? (
        <Text>No comments yet. Be the first to comment!</Text>
      ) : ( */}
        {(comments.map((comment) => (
          <Card key={comment.id}>
          <Flex  direction="column" gap="2" className="mb-4">
            <Flex align="center" gap="3">
              <Avatar
                src={comment.user?.image || "https://via.placeholder.com/40"}
                fallback="?"
                size="3"
              />
              <Flex direction="column">
                <Text className="font-medium">{comment.user?.name || "Anonymous"}</Text>
                <Text className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </Text>
              </Flex>
            </Flex>
            <ReactMarkdown>{comment.content}</ReactMarkdown>
            <Separator my="2" />
          </Flex>
           </Card>
        ))
      )}
       </>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return { title: issue?.title, descrption: "Details of issue" + issue?.id };
}

export default IssueDetailPage;
