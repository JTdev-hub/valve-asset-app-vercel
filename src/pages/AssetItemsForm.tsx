import {
  Flex,
  HStack,
  Input,
  Select,
  VStack,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";

import CardForms from "../components/CardForms";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAssetHeaders from "../hooks/useAssetHeaders";
import {
  duty,
  specification,
  valveType,
  valveSize,
  actuation,
  actuationType,
  flangeConnection,
  instrumentation,
} from "../AssetFormItems";
import { useState } from "react";
import useAddAssetItems from "../hooks/useAddAssetItems";
import AlertBanner from "../components/AlertBanner";

const schema = z.object({
  assetHeaderId: z.number(),
  duty: z.string().min(1, { message: "Duty must be selected" }),
  specification: z
    .string()
    .min(1, { message: "Specification must be selected" }),
  valveType: z.string().min(1, { message: "Valve Type must be selected" }),
  valveSize: z.string().min(1, { message: "Valve Size must be selected" }),
  model: z
    .string()
    .min(5, { message: "Model should be at least 5 characters long" }),
  actuation: z.string().min(1, { message: "Actuation must be selected" }),
  actuationType: z
    .string()
    .min(1, { message: "Actuation Type must be selected" }),
  flangeConnection: z
    .string()
    .min(1, { message: "Flange Connection must be selected" }),
  instrumentation: z
    .string()
    .min(1, { message: "Instrumentation must be selected" }),
  oemPartNumber: z
    .string()
    .min(5, { message: "OEM Part Number must be at least 5 characters long" }),
  ansi: z.string().min(1, { message: "ANSI must be selected" }),
  generalNotes: z.string().max(50).optional(),
  images: z.string(),
});

type AssetItemsFormData = z.infer<typeof schema>;

const AssetItemsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    // formState: { errors },
  } = useForm<AssetItemsFormData>({ resolver: zodResolver(schema) });

  const {
    mutate: addAssetItems,
    isSuccess,
    showAlert,
    isPending,
    message,
    setShowAlert,
  } = useAddAssetItems(() => {
    //Reset fields on success
    reset();
    setSelectedImage(null);
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  });

  const { data: assetHeaders } = useAssetHeaders();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setValue("images", reader.result as string);
        console.log(selectedImage);
      };
      reader.readAsDataURL(file);

      // formData.append("file", image);
      // formData.append("upload_preset", "unsigned");
      // formData.append("api_key", import.meta.env.VITE_CLOUDINARY_APIKEY);

      // cloudinaryService.create(formData);
    }
  };

  return (
    <>
      {/* Display alert when success or when error */}
      {showAlert && (
        <AlertBanner
          message={message}
          isSuccess={isSuccess}
          onClose={() => {
            setShowAlert(false);
          }}
        />
      )}
      <form
        onSubmit={handleSubmit((data) => {
          addAssetItems(data);
        })}
      >
        <Flex justifyContent="center">
          <CardForms>
            {/* First part */}

            <VStack align="start" paddingY={3}>
              <Text fontWeight="bold">Asset Number</Text>
              <Select
                {...register("assetHeaderId", { valueAsNumber: true })}
                placeholder="Asset Number"
              >
                {assetHeaders?.map((assetHeader) => (
                  <option key={assetHeader.id} value={assetHeader.id}>
                    {assetHeader.id} - {assetHeader.assetNumber}
                  </option>
                ))}
              </Select>
            </VStack>

            <VStack align="start" paddingY={3}>
              <Text fontWeight="bold">Duty</Text>
              <Select {...register("duty")} placeholder="Duty">
                {duty?.map((duty) => (
                  <option key={duty} value={duty}>
                    {duty}
                  </option>
                ))}
              </Select>
            </VStack>

            {/* Second part */}

            <VStack align="start" paddingY={3}>
              <Text fontWeight="bold">Specification</Text>
              <Select
                {...register("specification")}
                placeholder="Specification"
              >
                {specification?.map((specification) => (
                  <option key={specification} value={specification}>
                    {specification}
                  </option>
                ))}
              </Select>
            </VStack>
            <VStack align="start" paddingY={3}>
              <Text fontWeight="bold">Valve Type</Text>
              <Select {...register("valveType")} placeholder="Valve Type">
                {valveType?.map((valveType) => (
                  <option key={valveType} value={valveType}>
                    {valveType}
                  </option>
                ))}
              </Select>
            </VStack>

            {/* Third Part */}

            <VStack align="start" paddingY={3}>
              <Text fontWeight="bold">Valve Size</Text>
              <Select {...register("valveSize")} placeholder="Valve Size">
                {valveSize?.map((valveSize) => (
                  <option key={valveSize} value={valveSize}>
                    {valveSize}
                  </option>
                ))}
              </Select>
            </VStack>

            <VStack align="start" paddingY={3}>
              <Text fontWeight="bold">Model</Text>
              <Input {...register("model")} placeholder="e.g Model 001"></Input>
            </VStack>

            {/* Fourth Part */}

            <VStack align="start" paddingY={3}>
              <Text fontWeight="bold">Actuation</Text>
              <Select {...register("actuation")} placeholder="Actuation">
                {actuation?.map((actuation) => (
                  <option key={actuation} value={actuation}>
                    {actuation}
                  </option>
                ))}
              </Select>
            </VStack>
            <VStack align="start">
              <Text fontWeight="bold">Actuation Type</Text>
              <Select
                {...register("actuationType")}
                placeholder="Actuation Type"
              >
                {actuationType?.map((actuationType) => (
                  <option key={actuationType} value={actuationType}>
                    {actuationType}
                  </option>
                ))}
              </Select>
            </VStack>

            {/* Fifth Part */}

            <VStack align="start" paddingY={3}>
              <Text fontWeight="bold">Flange Connection</Text>
              <Select
                {...register("flangeConnection")}
                placeholder="Flange Connection"
              >
                {flangeConnection?.map((flangeConnection) => (
                  <option key={flangeConnection} value={flangeConnection}>
                    {flangeConnection}
                  </option>
                ))}
              </Select>
            </VStack>
            <VStack align="start" paddingY={3}>
              <Text fontWeight="bold">Instrumentation</Text>
              <Select
                {...register("instrumentation")}
                placeholder="Instrumentation"
              >
                {instrumentation?.map((instrumentation) => (
                  <option key={instrumentation} value={instrumentation}>
                    {instrumentation}
                  </option>
                ))}
              </Select>
            </VStack>

            {/* Sixth Part */}

            <VStack align="start" paddingY={3}>
              <Text fontWeight="bold">OEM Part Number</Text>
              <Input
                {...register("oemPartNumber")}
                placeholder="e.g OEM Part 001"
              ></Input>
            </VStack>
            <VStack align="start" paddingY={3}>
              <Text fontWeight="bold">ANSI</Text>
              <Input {...register("ansi")} placeholder="e.g ANSI Code"></Input>
            </VStack>

            <VStack align="start" paddingY={3}>
              <Text fontWeight="bold">General Notes</Text>
              <Input
                {...register("generalNotes")}
                placeholder="General Notes"
              ></Input>
            </VStack>

            {/* Image upload */}
            <HStack>
              <VStack align="start" w="full">
                <Text fontWeight="bold">Upload Image</Text>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <Box mt={2}>
                    <Text>Selected Image:</Text>
                    <img
                      src={selectedImage}
                      alt="Selected"
                      style={{ maxWidth: "100%" }}
                    />
                  </Box>
                )}
              </VStack>
            </HStack>
            <Button
              colorScheme="teal"
              size="md"
              marginTop={3}
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Submitting" : "Submit"}
            </Button>
          </CardForms>
        </Flex>
      </form>
    </>
  );
};

export default AssetItemsForm;
