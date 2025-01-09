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
import useCustomerAssetsHeader from "../hooks/useCustomerWithAssetHeaders";
import CardForms from "../components/CardForms";
import SkeletonLoading from "../components/SkeletonLoading";

const AssetHeadersDetails = () => {
  const { data: assetHeaders, isLoading } = useCustomerAssetsHeader();

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
            <TableCaption placement="top">Asset Headers</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center">Customer</Th>
                <Th textAlign="center">Customer Site</Th>
                <Th width="50px" textAlign="center">
                  Asset Number
                </Th>
                <Th textAlign="center">Asset Serial Number</Th>
                <Th textAlign="center">Asset Description</Th>
                <Th textAlign="center">Site Section</Th>
              </Tr>
            </Thead>
            <Tbody>
              {assetHeaders?.map((assetHeader) =>
                assetHeader.assetHeaders.map((headerDetails) => (
                  <Tr key={headerDetails.id}>
                    <Td textAlign="center">{assetHeader.customerName}</Td>
                    <Td textAlign="center">{assetHeader.customerSite}</Td>
                    <Td textAlign="center">{headerDetails.assetNumber}</Td>
                    <Td textAlign="center">{headerDetails.assetSerialNo}</Td>
                    <Td textAlign="center">{headerDetails.assetDescription}</Td>
                    <Td textAlign="center">{headerDetails.siteSection}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </CardForms>
    </Box>
  );
};

export default AssetHeadersDetails;
