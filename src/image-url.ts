import noImage from "./assets/no-image-placeholder-6f3882e0.webp";

const getCroppedImageUrl = (url: string) => {
  if (!url) return noImage;
  const target = "upload/";
  const index = url.indexOf(target) + target.length;
  return (
    url.slice(0, index) + "f_auto,q_auto,w_600,h_400,c_fill/" + url.slice(index)
  );
};

export default getCroppedImageUrl;
