import HttpService from "./http-service";

export interface AssetItemUpdate {
  id: number;
  imageData: string;
}

export default new HttpService<number, string>("/assetItems");
