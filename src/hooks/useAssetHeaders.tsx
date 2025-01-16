import { ASSETHEADERS_CACHE_KEY } from "../constants/cache-constants";
import assetHeaderService, {
  AssetHeader,
} from "../services/assetHeader-service";
import { useQuery } from "@tanstack/react-query";

const useAssetHeaders = () => {
  return useQuery<AssetHeader[], Error>({
    queryKey: ASSETHEADERS_CACHE_KEY,
    queryFn: () => assetHeaderService.getAll(),
    staleTime: 5 * 60 * 1000, //Cache time set to 5 min
  });
};
export default useAssetHeaders;
