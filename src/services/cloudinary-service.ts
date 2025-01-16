import HttpService from "./http-service";

//const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
// const CLOUDINARY_APIKEY = import.meta.env.VITE_CLOUDINARY_APIKEY;
// const CLOUDINARY_APISECRET = import.meta.env.VITE_CLOUDINARY_APISECRET;
export interface CloudinaryRes {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string; //TODO: check type if needs to be turned into date
  tags: [];
  bytes: number; //TODO: check if there is byte datatype
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
}

export default new HttpService<FormData, CloudinaryRes>(
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`
);
