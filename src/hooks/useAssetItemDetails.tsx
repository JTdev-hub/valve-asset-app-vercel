import { useQuery } from "@tanstack/react-query";
import { AssetItemsWithHeaders } from "../services/assetItemsWithHeader-service";
import assetItemDetailsService from "../services/assetItemDetails-service";

const useAssetItemDetails = (id?: number) => {
  return useQuery<AssetItemsWithHeaders[], Error>({
    queryKey: ["assetItemDetails"],
    queryFn: () => assetItemDetailsService.getAll(id),
  });
};

export default useAssetItemDetails;
