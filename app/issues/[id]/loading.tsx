
import { Flex, Card, Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex my="3" gap="2" align="center">
        <Skeleton width="6rem" />
        <Skeleton width="9rem" />
      </Flex>
      <Card>
      <Skeleton count={3} />
      </Card>
    </Box >
  );
};

export default LoadingIssueDetailPage;
