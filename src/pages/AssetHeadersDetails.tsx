import { Flex } from "@chakra-ui/react";

import CardForms from "../components/CardForms";
import SkeletonLoading from "../components/SkeletonLoading";
import useAssetHeaders from "../hooks/useAssetHeaders";
import DataTable from "../components/DataTable";
import { assetHeaderColumns } from "../components/TableDefinitions";
import { useState } from "react";

const AssetHeadersDetails = () => {
  const [assetHeaderQuery, setAssetHeaderQuery] = useState<string>("");
  const { data: assetHeaders, isLoading } = useAssetHeaders(
    assetHeaderQuery ? assetHeaderQuery : undefined
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
    <DataTable
      caption="Asset Headers"
      columns={assetHeaderColumns}
      data={
        assetHeaders?.map((item) => ({
          ...item,
          link: `/viewAssetItem/${item.id}`,
        })) ?? []
      }
      onSearch={(assetHeaderQuery) => setAssetHeaderQuery(assetHeaderQuery)}
    ></DataTable>
  );
};

export default AssetHeadersDetails;
