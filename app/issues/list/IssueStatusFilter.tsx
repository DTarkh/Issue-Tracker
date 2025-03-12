"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const issues: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssueStatusFilter = () => {
    const router = useRouter()
  return (
    <Select.Root onValueChange={status=>{
        const query = status !=="value undefined" ? `?status=${status}` : "";
        router.push("/issues/list" + query)
    } }>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {issues.map((issue) => (
          <Select.Item
            key={issue.value}
            value={issue.value || "value undefined"}
          >
            {issue.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
