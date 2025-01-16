import HttpService from "./http-service.js";

export interface AssetItems {
  id?: number;
  assetHeaderId: number; // Foreign key referencing AssetHeader
  duty: string;
  specification: string;
  valveType: string;
  valveSize: string;
  model: string;
  actuation: string;
  actuationType: string;
  flangeConnection: string;
  instrumentation: string;
  oemPartNumber: string;
  ansi: string;
  generalNotes?: string;
  images: string;
}

export default new HttpService<AssetItems, AssetItems>("/assetItems");
