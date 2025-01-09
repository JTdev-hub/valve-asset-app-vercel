import { useMutation, useQueryClient } from "@tanstack/react-query";
import customerService, { Customer } from "../services/customer-service";
import { useState } from "react";
import { CUSTOMER_CACHE_KEY } from "../constants/cache-constants";

const useAddUsers = (onAdd: () => void) => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const mutate = useMutation<Customer, Error, Customer>({
    mutationFn: customerService.create,
    onSuccess: (savedCustomer) => {
      queryClient.setQueryData<Customer[]>(CUSTOMER_CACHE_KEY, (customer) => [
        savedCustomer,
        ...(customer || []),
      ]);

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
