import { ASSETHEADERS_CACHE_KEY } from "../constants/cache-constants";
import assetHeaderService, {
  AssetHeader,
} from "../services/assetHeader-service";
import { useQuery } from "@tanstack/react-query";

const useAssetHeaders = (assetHeaderQuery?: string) => {
  return useQuery<AssetHeader[], Error>({
    queryKey: assetHeaderQuery
      ? ["assetHeader", assetHeaderQuery]
      : ASSETHEADERS_CACHE_KEY,
    queryFn: () => assetHeaderService.getAll(undefined, assetHeaderQuery),
    staleTime: 5 * 60 * 1000, //Cache time set to 5 min
  });
};
export default useAssetHeaders;
