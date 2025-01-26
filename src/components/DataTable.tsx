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
  return (
    <>
      {" "}
      {onSearch ? (
        <SearchInput onSearch={onSearch} searchObject={caption}></SearchInput>
      ) : (
        ""
      )}
      <TableContainer>
        <Table variant="simple" size={{ base: "sm", lg: "lg" }}>
          <TableCaption placement="top">{caption}</TableCaption>
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={column.accessor} textAlign="left">
                  {column.header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => (
              <Tr key={row.id}>
                {columns.map((column) => (
                  <Td key={column.accessor} textAlign="left">
                    {column.accessor === "link" ? (
                      <Link to={row[column.accessor] as string}>
                        <Icon as={ChevronRightIcon} />
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
    </>
  );
};

export default DataTable;
