import customerWithAssetsService, {
  CustomerWithAssets,
} from "../services/customerWithAssets-service";
import { useQuery } from "@tanstack/react-query";

const useCustomerAssetsHeader = (id?: number) => {
  return useQuery<CustomerWithAssets[], Error>({
    queryKey: ["customerWithAssetHeaders"],
    queryFn: () => customerWithAssetsService.getAll(id),
  });
};
export default useCustomerAssetsHeader;
