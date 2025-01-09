import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import assetHeaderService, {
  AssetHeader,
} from "../services/assetHeader-service";

const useAddAssetHeaders = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const mutate = useMutation<AssetHeader, Error, AssetHeader>({
    mutationFn: assetHeaderService.create,
    onSuccess: (savedAssetHeader) => {
      queryClient.setQueryData<AssetHeader[]>(
        ["assetHeader"],
        (assetHeader) => [savedAssetHeader, ...(assetHeader || [])]
      );

      setAlertMessage(
        `Asset Header "${savedAssetHeader.assetNumber}" has been created successfully!`
      );

      // Clear alert after 3 seconds
      setTimeout(() => setAlertMessage(null), 3000);
    },
  });

  return { ...mutate, alertMessage };
};

export default useAddAssetHeaders;
