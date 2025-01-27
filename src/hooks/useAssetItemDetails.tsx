import { useQuery } from "@tanstack/react-query";
import { AssetItemsWithHeaders } from "../services/assetItemsWithHeader-service";
import assetItemDetailsService from "../services/assetItemDetails-service";
import { ASSETITEMDETAIL_CACHE_KEY } from "../constants/cache-constants";

const useAssetItemDetails = (assetItem: {
  id: number;
  assetHeaderId: number;
}) => {
  return useQuery<AssetItemsWithHeaders, Error>({
    queryKey: [ASSETITEMDETAIL_CACHE_KEY, assetItem],
    queryFn: () => assetItemDetailsService.getAssetItemDetails(assetItem),
    staleTime: 5 * 6 * 1000, //Stale time set to 5 mins
  });
};

export default useAssetItemDetails;
