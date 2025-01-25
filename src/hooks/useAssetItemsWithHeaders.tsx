import { useQuery } from "@tanstack/react-query";
import assetItemsWithHeaderService, {
  AssetItemsWithHeaders,
} from "../services/assetItemsWithHeader-service";
import { ASSET_ITEMS_WITH_HEADERS_CACHE_KEY } from "../constants/cache-constants";

const useAssetItemsWithHeaders = (id?: number, assetItemsQuery?: string) => {
  return useQuery<AssetItemsWithHeaders[], Error>({
    queryKey: assetItemsQuery
      ? ["assetItemWithHeader", assetItemsQuery]
      : ASSET_ITEMS_WITH_HEADERS_CACHE_KEY,
    queryFn: () => assetItemsWithHeaderService.getAll(id, assetItemsQuery),
  });
};

export default useAssetItemsWithHeaders;
