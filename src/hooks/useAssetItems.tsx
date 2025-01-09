import { useQuery } from "@tanstack/react-query";
import assetItemsService, { AssetItems } from "../services/assetItems-service";

const useAssetItems = () => {
  return useQuery<AssetItems[], Error>({
    queryKey: ["assetItems"],
    queryFn: () => assetItemsService.getAll(),
    staleTime: 5 * 60 * 1000, // stale time for 5 mins
  });
};

export default useAssetItems;
