import {
  Box,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import useAssetItemWithHeaders from "../hooks/useAssetItemsWithHeaders";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import CardForms from "../components/CardForms";
import SkeletonLoading from "../components/SkeletonLoading";

const AssetItemTables = () => {
  const { data: assetItemsWithHeaders, isLoading } = useAssetItemWithHeaders();

  if (isLoading)
    return (
      <Flex justifyContent="center">
        <CardForms>
          <SkeletonLoading loadingType="table" />
        </CardForms>
      </Flex>
    );
  return (
    <Box overflowX="auto">
      <CardForms>
        <TableContainer>
          <Table variant="striped" size={{ base: "sm", lg: "lg" }}>
            <TableCaption placement="top">Asset Items</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center">Asset Number</Th>
                <Th textAlign="center">Duty</Th>
                <Th textAlign="center">Specification</Th>
                <Th textAlign="center">Valve Type</Th>
                <Th textAlign="center">Valve Size</Th>
                <Th textAlign="center">Model</Th>
                <Th textAlign="center">Actuation</Th>
                <Th textAlign="center">Actuation Type</Th>
                <Th textAlign="center">Flange Connection</Th>
                <Th textAlign="center">Instrumentation</Th>
                <Th textAlign="center">OEM Part Number</Th>
                <Th textAlign="center">ANSI</Th>
                <Th textAlign="center">General Notes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {assetItemsWithHeaders?.map((assetItemWithHeader) => (
                <Tr key={assetItemWithHeader.id}>
                  <Td textAlign="center">
                    {assetItemWithHeader.assetHeader.assetNumber}
                  </Td>
                  <Td textAlign="center">{assetItemWithHeader.duty}</Td>
                  <Td textAlign="center">
                    {assetItemWithHeader.specification}
                  </Td>
                  <Td textAlign="center">{assetItemWithHeader.valveType}</Td>
                  <Td textAlign="center">{assetItemWithHeader.valveSize}</Td>
                  <Td textAlign="center">{assetItemWithHeader.model}</Td>
                  <Td textAlign="center">{assetItemWithHeader.actuation}</Td>
                  <Td textAlign="center">
                    {assetItemWithHeader.actuationType}
                  </Td>
                  <Td textAlign="center">
                    {assetItemWithHeader.flangeConnection}
                  </Td>
                  <Td textAlign="center">
                    {assetItemWithHeader.instrumentation}
                  </Td>
                  <Td textAlign="center">
                    {assetItemWithHeader.oemPartNumber}
                  </Td>
                  <Td textAlign="center">{assetItemWithHeader.ansi}</Td>
                  <Td textAlign="center">{assetItemWithHeader.generalNotes}</Td>
                  <Td textAlign="center">
                    <Link to={"/viewAssetItem/" + assetItemWithHeader.id}>
                      <ChevronRightIcon />
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardForms>
    </Box>

    // <div>
    //   {assetItems?.map((assetItem) => (
    //     <Image src={assetItem.images} />
    //   ))}
    // </div>
  );
};

export default AssetItemTables;
