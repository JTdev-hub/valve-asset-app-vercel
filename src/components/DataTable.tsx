import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
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
import React from "react";

import { Link } from "react-router-dom";
import CardForms from "./CardForms";
import { Column } from "./TableDefinitions";

interface Items {
  id?: number;
  [key: string]: unknown;
}

interface Props {
  caption: string;
  columns: Column[];
  data: Items[];
}

const isReactNode = (value: unknown): value is React.ReactNode => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    React.isValidElement(value) ||
    (Array.isArray(value) && value.every(isReactNode))
  );
};
const DataTable = ({ caption, columns, data }: Props) => {
  {
    console.log(data.map((row) => row.id));
  }
  return (
    <Box overflowX="auto">
      <CardForms>
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
                        <Link
                          to={
                            isReactNode(row[column.accessor])
                              ? (row[column.accessor] as string)
                              : ""
                          }
                        >
                          <Icon as={ChevronRightIcon} />
                        </Link>
                      ) : isReactNode(row[column.accessor]) ? (
                        (row[column.accessor] as string)
                      ) : null}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardForms>
    </Box>
  );
};

export default DataTable;
