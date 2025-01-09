import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import assetItemsService, { AssetItems } from "../services/assetItems-service";

const useAddAssetItems = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const mutate = useMutation<AssetItems, Error, AssetItems>({
    mutationFn: assetItemsService.create,
    onSuccess: (savedAssetItem) => {
      queryClient.setQueryData<AssetItems[]>(["assetItem"], (assetItem) => [
        savedAssetItem,
        ...(assetItem || []),
      ]);

      setAlertMessage(
        `Asset Item "${savedAssetItem.assetHeaderId}" has been created successfully!`
      );

      // Clear alert after 3 seconds
      setTimeout(() => setAlertMessage(null), 3000);
    },
  });

  return { ...mutate, alertMessage };
};

export default useAddAssetItems;
