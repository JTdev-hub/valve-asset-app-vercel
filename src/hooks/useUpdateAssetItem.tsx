import { useMutation } from "@tanstack/react-query";

import assetItemUpdateService from "../services/assetItemUpdate-service";
import { AssetItems } from "../services/assetItems-service";

const useUpdateAssetItem = () => {
  return useMutation<
    AssetItems,
    Error,
    { assetItem: { id: number; assetHeaderId: number }; body: string }
  >({
    mutationFn: ({ assetItem, body }) =>
      assetItemUpdateService.update(assetItem, body),
  });
};

export default useUpdateAssetItem;
