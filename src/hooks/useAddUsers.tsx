import { useMutation, useQueryClient } from "@tanstack/react-query";
import customerService, { Customer } from "../services/customer-service";
import { useState } from "react";
import { CUSTOMERS_CACHE_KEY } from "../constants/cache-constants";

const useAddUsers = (onAdd: () => void) => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const mutate = useMutation<Customer, Error, Customer>({
    mutationFn: customerService.create,
    // onMutate: (newCustomer: Customer) => {
    //   queryClient.setQueryData<Customer[]>(
    //     CUSTOMERS_CACHE_KEY,
    //     (customers = []) => [newCustomer, ...customers]
    //   );
    // },
    onSuccess: (savedCustomer) => {
      // queryClient.setQueryData<Customer[]>(CUSTOMERS_CACHE_KEY, (customers) =>
      //   customers?.map((customer) =>
      //     customer.id === newCustomer.id ? savedCustomer : customer
      //   )
      // );

      //Update cache with reply from server
      queryClient.setQueryData<Customer[]>(
        CUSTOMERS_CACHE_KEY,
        (customers = []) => [...customers, savedCustomer]
      );

      setShowAlert(true);
      setMessage(
        `Customer ${savedCustomer.customerName} has been successfully created!`
      );
      onAdd();
    },
    onError: (error, savedCustomer) => {
      setShowAlert(true);
      setMessage(
        `Encountered errors while saving customer ${savedCustomer.customerName}! (${error.message})`
      );
    },
  });

  return { ...mutate, showAlert, message, setShowAlert };
};

export default useAddUsers;
