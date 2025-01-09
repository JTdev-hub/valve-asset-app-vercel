import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import assetItemsService, { AssetItems } from "../services/assetItems-service";

const useAddAssetItems = (onAdd: () => void) => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  const queryClient = useQueryClient();
  const mutate = useMutation<AssetItems, Error, AssetItems>({
    mutationFn: assetItemsService.create,
    onSuccess: (savedAssetItem) => {
      queryClient.setQueryData<AssetItems[]>(["assetItem"], (assetItem) => [
        savedAssetItem,
        ...(assetItem || []),
      ]);

      setShowAlert(true);
      setMessage(
        `Asset Item ${savedAssetItem.assetHeaderId} has been successfully created!`
      );
      onAdd();
    },
    onError: (error, savedAssetItem) => {
      setShowAlert(true);
      setMessage(
        `Encountered errors while saving Asset Item ${savedAssetItem.assetHeaderId}! (${error.message})`
      );
    },
  });

  return { ...mutate, showAlert, message, setShowAlert };
};

export default useAddAssetItems;
