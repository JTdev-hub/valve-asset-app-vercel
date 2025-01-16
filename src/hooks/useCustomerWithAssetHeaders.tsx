import { CUSTOMER_WITH_ASSET_HEADERS_CACHE_KEY } from "../constants/cache-constants";
import customerWithAssetsService, {
  CustomerWithAssets,
} from "../services/customerWithAssets-service";
import { useQuery } from "@tanstack/react-query";

const useCustomerAssetsHeader = (id?: number) => {
  return useQuery<CustomerWithAssets[], Error>({
    queryKey: CUSTOMER_WITH_ASSET_HEADERS_CACHE_KEY,
    queryFn: () => customerWithAssetsService.getAll(id),
    staleTime: 5 * 6 * 1000, //cache set to 5 min
  });
};
export default useCustomerAssetsHeader;
