import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import assetHeaderService, {
  AssetHeader,
} from "../services/assetHeader-service";

const useAddAssetHeaders = (onAdd: () => void) => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const mutate = useMutation<AssetHeader, Error, AssetHeader>({
    mutationFn: assetHeaderService.create,
    onSuccess: (savedAssetHeader) => {
      queryClient.setQueryData<AssetHeader[]>(
        ["assetHeader"],
        (assetHeader) => [savedAssetHeader, ...(assetHeader || [])]
      );

      setShowAlert(true);
      setMessage(
        `Asset Header ${savedAssetHeader.assetNumber} has been successfully created!`
      );

      // Clear alert after 3 seconds
      onAdd();
    },
    onError: (error, savedAssetHeader) => {
      setShowAlert(true);
      setMessage(
        `Encountered errors while saving asset header ${savedAssetHeader.assetNumber}! (${error.message})`
      );
    },
  });

  return { ...mutate, showAlert, message, setShowAlert };
};

export default useAddAssetHeaders;
