import { Flex } from "@chakra-ui/react";

import useAssetItemWithHeaders from "../hooks/useAssetItemsWithHeaders";

import CardForms from "../components/CardForms";
import SkeletonLoading from "../components/SkeletonLoading";
import DataTable from "../components/DataTable";
import { assetItemColumns } from "../components/TableDefinitions";

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
    <DataTable
      caption="Asset Items"
      columns={assetItemColumns}
      data={
        assetItemsWithHeaders?.map((item) => ({
          ...item.assetHeader,
          ...item,
          link: `/viewAssetItem/${item.id}`,
        })) ?? []
      }
    ></DataTable>
  );
};

export default AssetItemTables;
