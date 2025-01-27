import { Box, Flex } from "@chakra-ui/react";

import useAssetItemWithHeaders from "../hooks/useAssetItemsWithHeaders";

import CardForms from "../components/CardForms";
import SkeletonLoading from "../components/SkeletonLoading";
import DataTable from "../components/DataTable";
import { assetItemColumns } from "../components/TableDefinitions";
import { useState } from "react";

const AssetItemTables = () => {
  const [assetItemQuery, setAssetItemQuery] = useState<string>("");
  const { data: assetItemsWithHeaders, isLoading } = useAssetItemWithHeaders(
    undefined,
    assetItemQuery ? assetItemQuery : undefined
  );

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
        <DataTable
          caption="Asset Items"
          columns={assetItemColumns}
          data={
            assetItemsWithHeaders?.map((item) => ({
              ...item.assetHeader,
              ...item,
              link: `/viewAssetItem/${item.id}/${item.assetHeaderId}`,
            })) ?? []
          }
          onSearch={(assetItemQuery) => setAssetItemQuery(assetItemQuery)}
        ></DataTable>
      </CardForms>
    </Box>
  );
};

export default AssetItemTables;
