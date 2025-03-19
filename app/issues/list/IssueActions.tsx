import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React, { Suspense } from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import ItemsPerPage from "./ItemsPerPage";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Suspense fallback={<div>Loading actions...</div>}>
        <Flex gap="3">
          <IssueStatusFilter />
          <ItemsPerPage />
        </Flex>
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Suspense>
    </Flex>
  );
};

export default IssueActions;
