import { CUSTOMERS_CACHE_KEY } from "../constants/cache-constants";
import customerService, { Customer } from "../services/customer-service";
import { useQuery } from "@tanstack/react-query";

const useCustomers = (id?: number) => {
  return useQuery<Customer[], Error>({
    queryKey: CUSTOMERS_CACHE_KEY,
    queryFn: () => customerService.getAll(id),
  });
};
export default useCustomers;
