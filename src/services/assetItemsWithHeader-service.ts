import { AssetHeader } from "./assetHeader-service";
import { AssetItems } from "./assetItems-service";
import HttpService from "./http-service";

export interface AssetItemsWithHeaders extends AssetItems {
  assetHeader: AssetHeader;
}

export default new HttpService<AssetItemsWithHeaders>("/assetItemsWithHeader");
