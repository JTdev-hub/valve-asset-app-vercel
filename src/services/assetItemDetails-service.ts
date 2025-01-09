import { AssetItemsWithHeaders } from "./assetItemsWithHeader-service.js";
import HttpService from "./http-service.js";

export default new HttpService<AssetItemsWithHeaders>("/assetItemDetails");
