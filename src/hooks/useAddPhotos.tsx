import { useMutation } from "@tanstack/react-query";
import cloudinaryService, {
  CloudinaryRes,
} from "../services/cloudinary-service";
import { useState } from "react";

const useAddPhotos = () => {
  const [secureURL, setSecureURL] = useState<string | null>(null);

  const mutate = useMutation<CloudinaryRes, Error, FormData>({
    mutationFn: cloudinaryService.create,
    onSuccess: (savedImage) => {
      setSecureURL(savedImage.secure_url);
    },
  });

  return {
    secureURL,
    mutateAsync: mutate.mutateAsync,
  };
};

export default useAddPhotos;
