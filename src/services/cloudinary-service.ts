import HttpService from "./http-service";

//const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
// const CLOUDINARY_APIKEY = import.meta.env.VITE_CLOUDINARY_APIKEY;
// const CLOUDINARY_APISECRET = import.meta.env.VITE_CLOUDINARY_APISECRET;

export default new HttpService<FormData>(
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`
);
