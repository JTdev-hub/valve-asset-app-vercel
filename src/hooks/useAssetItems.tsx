import { useQuery } from "@tanstack/react-query";
import assetItemsService, { AssetItems } from "../services/assetItems-service";

const useAssetItems = () => {
  return useQuery<AssetItems[], Error>({
    queryKey: ["assetItems"],
    queryFn: () => assetItemsService.getAll(),
  });
};

export default useAssetItems;
