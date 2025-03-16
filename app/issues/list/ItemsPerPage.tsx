'use client'

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";


const ItemsPerPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()


  return (
    <Select.Root 
    defaultValue={searchParams.get("itemsPerPage")|| ""}
    onValueChange={(value) => {const params = new URLSearchParams(searchParams); 
      params.set("itemsPerPage", value)

      router.push("/issues/list?" + params)
     }}>
      <Select.Trigger placeholder="Select page size" />
      <Select.Content>
        <Select.Group>
          <Select.Item value="5">5 Items per page</Select.Item>
          <Select.Item value="10">10 Items per page</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default ItemsPerPage;
