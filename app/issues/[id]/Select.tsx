'use client'

import { Select } from "@radix-ui/themes";
import React from "react";

const SelectUser = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">David Tarkhnishvili</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectUser;
