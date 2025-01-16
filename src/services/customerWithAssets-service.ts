import { AssetHeader } from "./assetHeader-service";
import { Customer } from "./customer-service";
import HttpService from "./http-service";

export interface CustomerWithAssets extends Customer {
  assetHeaders: AssetHeader[];
}

export default new HttpService<CustomerWithAssets, CustomerWithAssets>(
  "/customersAssetHeaders"
);
