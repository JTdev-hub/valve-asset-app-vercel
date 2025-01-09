import assetHeaderService, {
  AssetHeader,
} from "../services/assetHeader-service";
import { useQuery } from "@tanstack/react-query";

const useAssetHeaders = () => {
  return useQuery<AssetHeader[], Error>({
    queryKey: ["assetHeaders"],
    queryFn: () => assetHeaderService.getAll(),
  });
};
export default useAssetHeaders;
