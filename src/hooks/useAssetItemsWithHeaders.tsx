import { useQuery } from "@tanstack/react-query";
import assetItemsWithHeaderService, {
  AssetItemsWithHeaders,
} from "../services/assetItemsWithHeader-service";

const useAssetItemsWithHeaders = (id?: number) => {
  return useQuery<AssetItemsWithHeaders[], Error>({
    queryKey: ["assetItemsWithHeader"],
    queryFn: () => assetItemsWithHeaderService.getAll(id),
  });
};

export default useAssetItemsWithHeaders;
