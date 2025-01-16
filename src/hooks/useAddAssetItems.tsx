import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import assetItemsService, { AssetItems } from "../services/assetItems-service";
import { ASSETITEMS_CACHE_KEY } from "../constants/cache-constants";
import useAddPhotos from "./useAddPhotos";

import useUpdateAssetItem from "./useUpdateAssetItem";

interface AssetItemForm {
  showAlert?: boolean;
  message?: string;
  assetItemId?: number | null;
}

const useAddAssetItems = (onAdd: () => void, imageString: FormData) => {
  const { mutateAsync: addPhoto } = useAddPhotos();
  const { mutateAsync: updateAssetItem } = useUpdateAssetItem();

  const [assetItemForm, setAssetItemForm] = useState<AssetItemForm>(
    {} as AssetItemForm
  );

  const queryClient = useQueryClient();

  const mutate = useMutation<AssetItems, Error, AssetItems>({
    mutationFn: assetItemsService.create,
    onSuccess: async (savedAssetItem) => {
      try {
        queryClient.setQueryData<AssetItems[]>(
          ASSETITEMS_CACHE_KEY,
          (assetItem = []) => [...assetItem, savedAssetItem]
        );

        const photoResult = await addPhoto(imageString);

        //TODO: Fix the secureURL
        updateAssetItem({
          id: savedAssetItem.id as number,
          body: photoResult.secure_url as string,
        });

        setAssetItemForm({
          showAlert: true,
          message: `Asset Item ${savedAssetItem.assetHeaderId} has been successfully created!`,
          assetItemId: savedAssetItem.id || null,
        });
        onAdd();
      } catch (error) {
        console.log(error);
        setAssetItemForm({
          showAlert: true,
          message: `Encountered errors while saving image/s on ${savedAssetItem.assetHeaderId}`,
          assetItemId: savedAssetItem.id || null,
        });
      }
    },
    onError: (error, savedAssetItem) => {
      setAssetItemForm({
        showAlert: true,
        message: `Encountered errors while saving Asset Item ${savedAssetItem.assetHeaderId}! (${error.message})`,
        assetItemId: null,
      });
    },
  });

  return { ...mutate, assetItemForm, setAssetItemForm };
};

export default useAddAssetItems;

//Save Items First
//Get Item ID
//Get Image data
//Upload Image
//Update Items
