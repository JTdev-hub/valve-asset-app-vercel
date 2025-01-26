import { useMutation, useQueryClient } from "@tanstack/react-query";
import customerService, { Customer } from "../services/customer-service";
import { useState } from "react";
import { CUSTOMERS_CACHE_KEY } from "../constants/cache-constants";

const useAddUsers = (onAdd: () => void) => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const mutate = useMutation<Customer[], Error, Customer[]>({
    mutationFn: customerService.createMany,
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
        (customers = []) => [...customers, ...savedCustomer]
      );

      setShowAlert(true);
      if (savedCustomer.length == 1) {
        setMessage(
          `Customer ${savedCustomer.map(
            (savedCustomer) => savedCustomer.customerName
          )} has been successfully created!`
        );
      } else {
        setMessage(`Customer(s) been successfully created!`);
      }

      onAdd();
    },
    onError: (error, savedCustomer) => {
      setShowAlert(true);

      if (savedCustomer.length == 1) {
        setMessage(
          `Encountered errors while saving customer  ${savedCustomer.map(
            (savedCustomer) => savedCustomer.customerName
          )}! (${error.message})`
        );
      } else {
        setMessage(`Encountered errors while saving customer(s)`);
      }
    },
  });

  return { ...mutate, showAlert, message, setShowAlert };
};

export default useAddUsers;
