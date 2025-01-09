import { useQuery } from "@tanstack/react-query";
import { AssetItemsWithHeaders } from "../services/assetItemsWithHeader-service";
import assetItemDetailsService from "../services/assetItemDetails-service";

const useAssetItemDetails = (id?: number) => {
  return useQuery<AssetItemsWithHeaders[], Error>({
    queryKey: ["assetItemDetails", id],
    queryFn: () => assetItemDetailsService.getAll(id),
    staleTime: 5 * 6 * 1000, //Stale time set to 5 mins
  });
};

export default useAssetItemDetails;
