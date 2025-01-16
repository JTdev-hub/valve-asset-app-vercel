import { Customer } from "./customer-service.js";
import HttpService from "./http-service.js";

export interface AssetHeader {
  id?: number;
  customerId: number;
  assetNumber: string;
  assetDescription: string;
  assetSerialNo: string;
  siteSection: string;
  customer?: Customer;
}

export default new HttpService<AssetHeader, AssetHeader>("/assetHeaders");
