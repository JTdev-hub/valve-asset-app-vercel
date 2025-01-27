import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Icon,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Column } from "./TableDefinitions";
import { Customer } from "../services/customer-service";
import { AssetHeader } from "../services/assetHeader-service";
import { AssetItems } from "../services/assetItems-service";
import SearchInput from "./SearchInput";

interface Items {
  id?: number;
  [key: string]:
    | Customer
    | AssetHeader
    | AssetItems
    | string
    | number
    | undefined;
}

interface Props {
  caption: string;
  columns: Column[];
  data: Items[];
  onSearch?: (searchText: string) => void;
}

const DataTable = ({ caption, columns, data, onSearch }: Props) => {
  const tableBg = useColorModeValue("white", "gray.700");
  const tableBorderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.50", "gray.600");

  return (
    <Box>
      {onSearch && <SearchInput onSearch={onSearch} searchObject={caption} />}

      {/* Add margin between SearchInput and TableContainer */}
      <Box mt={4}>
        <TableContainer
          border="1px"
          borderColor={tableBorderColor}
          borderRadius="lg"
          bg={tableBg}
          boxShadow="md"
        >
          <Table variant="simple" size={{ base: "sm", lg: "lg" }}>
            <TableCaption placement="top" fontSize="lg" fontWeight="bold" p={4}>
              {caption}
            </TableCaption>
            <Thead bg={useColorModeValue("teal.500", "teal.700")}>
              <Tr>
                {columns.map((column) => (
                  <Th
                    key={column.accessor}
                    textAlign="left"
                    color="white"
                    py={3}
                    px={4}
                  >
                    {column.header}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, index) => (
                <Tr
                  key={index}
                  _hover={{ bg: hoverBg, transition: "background 0.2s" }}
                >
                  {columns.map((column, index) => (
                    <Td key={index} textAlign="left" py={3} px={4}>
                      {column.accessor === "link" ? (
                        <Link to={row[column.accessor] as string}>
                          <Icon as={ChevronRightIcon} color="teal.500" />
                        </Link>
                      ) : (
                        (row[column.accessor] as string)
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DataTable;
