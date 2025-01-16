import { useQuery } from "@tanstack/react-query";
import { AssetItemsWithHeaders } from "../services/assetItemsWithHeader-service";
import assetItemDetailsService from "../services/assetItemDetails-service";
import { ASSETITEMDETAIL_CACHE_KEY } from "../constants/cache-constants";

const useAssetItemDetails = (id?: number) => {
  return useQuery<AssetItemsWithHeaders[], Error>({
    queryKey: [ASSETITEMDETAIL_CACHE_KEY, id],
    queryFn: () => assetItemDetailsService.getAll(id),
    staleTime: 5 * 6 * 1000, //Stale time set to 5 mins
  });
};

export default useAssetItemDetails;
