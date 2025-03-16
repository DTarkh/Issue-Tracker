"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const SelectUser = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const { data: users, error, isLoading } = useUsers();
  if (isLoading) return <Skeleton className="h-[35px]" />;
  if (error) return null;

  const selectUser = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedUserId: userId === "empty" ? null : userId,
      });

      if (userId === "empty") {
        toast.success("User unassigned successfully");
      } else {
        toast.success("User assigned successfully");
      }

      router.refresh();
    } catch {
      toast.error("Failed to assign user");
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedUserId ? issue.assignedUserId : "empty"}
        onValueChange={selectUser}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="empty">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 1000 * 60,
    retry: 3,
  });

export default SelectUser;
