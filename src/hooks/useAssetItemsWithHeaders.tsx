import { useQuery } from "@tanstack/react-query";
import assetItemsWithHeaderService, {
  AssetItemsWithHeaders,
} from "../services/assetItemsWithHeader-service";
import { ASSET_ITEMS_WITH_HEADERS_CACHE_KEY } from "../constants/cache-constants";

const useAssetItemsWithHeaders = (id?: number) => {
  return useQuery<AssetItemsWithHeaders[], Error>({
    queryKey: ASSET_ITEMS_WITH_HEADERS_CACHE_KEY,
    queryFn: () => assetItemsWithHeaderService.getAll(id),
  });
};

export default useAssetItemsWithHeaders;
