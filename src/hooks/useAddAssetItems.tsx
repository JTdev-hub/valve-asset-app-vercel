import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import assetItemsService, { AssetItems } from "../services/assetItems-service";
import { ASSETITEMS_CACHE_KEY } from "../constants/cache-constants";
import useAddPhotos from "./useAddPhotos";

import useUpdateAssetItem from "./useUpdateAssetItem";
import { FormDataPayload } from "../pages/AssetItemsForm";
import { AssetItemsWithHeaders } from "../services/assetItemsWithHeader-service";

interface AssetItemForm {
  showAlert?: boolean;
  message?: string;
  assetItemId?: number | null;
}

const useAddAssetItems = (
  onAdd: () => void,
  imageString: FormDataPayload[]
) => {
  const { mutateAsync: addPhoto } = useAddPhotos();
  const { mutateAsync: updateAssetItem } = useUpdateAssetItem();

  const [assetItemForm, setAssetItemForm] = useState<AssetItemForm>(
    {} as AssetItemForm
  );

  const queryClient = useQueryClient();

  const mutate = useMutation<AssetItemsWithHeaders, Error, AssetItems>({
    mutationFn: assetItemsService.create,
    onSuccess: async (savedAssetItem) => {
      try {
        queryClient.setQueryData<AssetItems[]>(
          ASSETITEMS_CACHE_KEY,
          (assetItem = []) => [...assetItem, savedAssetItem]
        );

        const uploadPhotoPromise = imageString.map(async (image) => {
          const photoResult = await addPhoto(image.formDataString);
          return photoResult.secure_url;
        });

        // Wait for all uploads to complete and get the secure URLs
        const photoUrls = await Promise.all(uploadPhotoPromise);

        const photoUrlList = photoUrls.map((photoUrl) => photoUrl).join(";");
        //TODO: Fix the secureURL
        updateAssetItem({
          assetItem: {
            id: savedAssetItem.id as number,
            assetHeaderId: savedAssetItem.assetHeaderId as number,
          },
          body: photoUrlList as string,
        });

        setAssetItemForm({
          showAlert: true,
          message: `Asset Item ${savedAssetItem.assetHeader.assetNumber} - ${savedAssetItem.id} has been successfully created!`,
          assetItemId: savedAssetItem.id || null,
        });
        onAdd();
      } catch (error) {
        console.log(error);
        setAssetItemForm({
          showAlert: true,
          message: `Encountered errors while saving image/s on ${savedAssetItem.assetHeader.assetNumber}`,
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
