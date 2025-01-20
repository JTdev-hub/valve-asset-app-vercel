import { Flex } from "@chakra-ui/react";

import CardForms from "../components/CardForms";
import SkeletonLoading from "../components/SkeletonLoading";
import useAssetHeaders from "../hooks/useAssetHeaders";
import DataTable from "../components/DataTable";
import { assetHeaderColumns } from "../components/TableDefinitions";

const AssetHeadersDetails = () => {
  const { data: assetHeaders, isLoading } = useAssetHeaders();

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
      caption="Asset Headers"
      columns={assetHeaderColumns}
      data={
        assetHeaders?.map((item) => ({
          ...item,
          link: `/viewAssetItem/${item.id}`,
        })) ?? []
      }
    ></DataTable>
  );
};

export default AssetHeadersDetails;
