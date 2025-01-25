import { CUSTOMERS_CACHE_KEY } from "../constants/cache-constants";
import customerService, { Customer } from "../services/customer-service";
import { useQuery } from "@tanstack/react-query";

const useCustomers = (id?: number, customerQuery?: string) => {
  return useQuery<Customer[], Error>({
    queryKey: customerQuery ? ["Customer", customerQuery] : CUSTOMERS_CACHE_KEY,
    queryFn: () => customerService.getAll(id, customerQuery),
    //staleTime: 5 * 60 * 1000, //stale time for 5 mins
  });
};
export default useCustomers;
