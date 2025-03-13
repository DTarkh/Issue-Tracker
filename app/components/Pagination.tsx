import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

interface Props {
  itemsNumber: number;
  itemsPerPage: number;
  currentPage: number;
}

const Pagination = ({ itemsNumber, itemsPerPage, currentPage }: Props) => {


  const totalPages = Math.ceil(itemsNumber / itemsPerPage);

  if(totalPages <= 1 ) return null;
  return (
    <Flex gap="2" align="center" >
      <Text size="2">
        Page {currentPage} of {totalPages}
      </Text>
      <Button variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button variant="soft" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button variant="soft" disabled={currentPage === totalPages}>
        <DoubleArrowRightIcon />
      </Button>
      <Button variant="soft" disabled={currentPage === totalPages}>
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
