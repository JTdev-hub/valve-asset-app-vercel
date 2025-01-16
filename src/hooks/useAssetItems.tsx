import { useQuery } from "@tanstack/react-query";
import assetItemsService, { AssetItems } from "../services/assetItems-service";
import { ASSETITEMS_CACHE_KEY } from "../constants/cache-constants";

const useAssetItems = () => {
  return useQuery<AssetItems[], Error>({
    queryKey: ASSETITEMS_CACHE_KEY,
    queryFn: () => assetItemsService.getAll(),
    staleTime: 5 * 60 * 1000, // stale time for 5 mins
  });
};

export default useAssetItems;
