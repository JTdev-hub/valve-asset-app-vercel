import { useMutation } from "@tanstack/react-query";

import assetItemUpdateService from "../services/assetItemUpdate-service";
import { AssetItems } from "../services/assetItems-service";

const useUpdateAssetItem = () => {
  return useMutation<AssetItems, Error, { id: number; body: string }>({
    mutationFn: ({ id, body }) => assetItemUpdateService.update(id, body),
  });
};

export default useUpdateAssetItem;
