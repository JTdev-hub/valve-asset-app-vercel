import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import useAddPhotos from "../hooks/useAddPhotos";

interface Images {
  image: string;
}

interface FormDataPayload {
  formDataString: FormData;
}

const PhotoUpload = () => {
  const [selectedImage, setSelectedImage] = useState<Images[]>([]);
  const [formDataImage, setFormDataImage] = useState<FormDataPayload[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
    //const newImages: Images[] = [];

    if (files)
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            //newImages.push({ image: reader.result as string });
            setSelectedImage((prevImages) => [
              ...prevImages,
              { image: reader.result as string },
            ]);
            // Update the selected images state after processing all files
            // if (newImages.length === files.length) {
            //   setSelectedImage((prevImages) => [...prevImages, ...newImages]);
            // }

            //setValue("images", reader.result as string);
            //console.log(selectedImage);
          };

          // formData.append("file", image);
          // formData.append("upload_preset", "unsigned");
          // formData.append("api_key", import.meta.env.VITE_CLOUDINARY_APIKEY);

          // cloudinaryService.create(formData);
        }
      }
  };

  const { mutateAsync: addPhoto, secureURL } = useAddPhotos();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    selectedImage.forEach((image) => {
      const formData = new FormData();
      formData.append("file", image.image);
      formData.append("upload_preset", "unsigned");
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_APIKEY);

      setFormDataImage((formDataPayload) => [
        ...formDataPayload,
        { formDataString: formData },
      ]);
    });

    console.log(formDataImage);

    formDataImage.map(async (formData) => {
      await addPhoto(formData.formDataString).then((res) => console.log(res));
    });
  };
  return (
    <>
      {secureURL && <Text>{secureURL}</Text>}
      <form onSubmit={handleSubmit}>
        <VStack align="start" w="full">
          <Text fontWeight="bold">Upload Image</Text>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
        </VStack>
        {selectedImage && (
          <Box mt={2}>
            <Text>Selected Image:</Text>
            {selectedImage.map((image, index) => (
              <img
                key={index}
                src={image.image}
                alt="Selected"
                style={{ maxWidth: "100%" }}
              />
            ))}
          </Box>
        )}

        <Button colorScheme="teal" size="md" marginTop={3} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default PhotoUpload;
