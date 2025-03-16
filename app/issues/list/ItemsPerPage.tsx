import { Select } from "@radix-ui/themes";
import React from "react";

const ItemsPerPage = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Select page size" />
      <Select.Content>
        <Select.Group>
          <Select.Item value="10">10 Items per page</Select.Item>
          <Select.Item value="20">20 Items per page</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default ItemsPerPage;
