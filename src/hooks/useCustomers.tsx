import { CUSTOMERS_CACHE_KEY } from "../constants/cache-constants";
import customerService, { Customer } from "../services/customer-service";
import { useQuery } from "@tanstack/react-query";

const useCustomers = (id?: number) => {
  return useQuery<Customer[], Error>({
    queryKey: CUSTOMERS_CACHE_KEY,
    queryFn: () => customerService.getAll(id),
    staleTime: 5 * 60 * 1000, //stale time for 5 mins
  });
};
export default useCustomers;
