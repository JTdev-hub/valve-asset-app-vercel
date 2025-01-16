const PhotoUpload = () => {
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file && file.type.startsWith("image/")) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result as string);
  //       //setValue("images", reader.result as string);
  //       //console.log(selectedImage);
  //     };
  //     // formData.append("file", image);
  //     // formData.append("upload_preset", "unsigned");
  //     // formData.append("api_key", import.meta.env.VITE_CLOUDINARY_APIKEY);
  //     // cloudinaryService.create(formData);
  //   }
  // };
  // const { mutate: addPhoto, secureURL } = useAddPhotos();
  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   if (!selectedImage) return;
  //   formData.append("file", selectedImage);
  //   formData.append("upload_preset", "unsigned");
  //   formData.append("api_key", import.meta.env.VITE_CLOUDINARY_APIKEY);
  //   addPhoto(formData);
  // };
  // return (
  //   <>
  //     {secureURL && <Text>{secureURL}</Text>}
  //     <form onSubmit={handleSubmit}>
  //       <VStack align="start" w="full">
  //         <Text fontWeight="bold">Upload Image</Text>
  //         <Input type="file" accept="image/*" onChange={handleImageChange} />
  //       </VStack>
  //       {selectedImage && (
  //         <Box mt={2}>
  //           <Text>Selected Image:</Text>
  //           <img
  //             src={selectedImage}
  //             alt="Selected"
  //             style={{ maxWidth: "100%" }}
  //           />
  //         </Box>
  //       )}
  //       <Button colorScheme="teal" size="md" marginTop={3} type="submit">
  //         Submit
  //       </Button>
  //     </form>
  //   </>
  // );
};

export default PhotoUpload;
