import {
  Flex,
  Grid,
  Input,
  Select,
  Text,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
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
} from "../constants/AssetFormItems";
import { useState } from "react";
import useAddAssetItems from "../hooks/useAddAssetItems";
import AlertBanner from "../components/AlertBanner";
import Loading from "../components/Loading";

interface Images {
  image: string;
}

export interface FormDataPayload {
  formDataString: FormData;
}

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
    formState: { errors },
  } = useForm<AssetItemsFormData>({ resolver: zodResolver(schema) });

  const { data: assetHeaders } = useAssetHeaders();
  const [selectedImage, setSelectedImage] = useState<Images[]>([]);
  const [formDataImage, setFormDataImage] = useState<FormDataPayload[]>([]);
  //const toast = useToast();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: Images[] = [];
    const newFormData: FormDataPayload[] = [];

    const readFile = (
      file: File
    ): Promise<{ image: string; formDataString: FormData }> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "unsigned");
          formData.append("api_key", import.meta.env.VITE_CLOUDINARY_APIKEY);

          resolve({
            image: reader.result as string,
            formDataString: formData,
          });
        };
        reader.onerror = () => reject(reader.error);
      });
    };

    try {
      const results = await Promise.all(Array.from(files).map(readFile));
      results.forEach(({ image, formDataString }) => {
        newImages.push({ image });
        newFormData.push({ formDataString });
      });

      setValue("images", "");
      setSelectedImage((prevImages) => [...prevImages, ...newImages]);
      setFormDataImage((previousFormData) => [
        ...previousFormData,
        ...newFormData,
      ]);
    } catch (error) {
      console.error("Error reading files:", error);
    }
  };

  const {
    mutateAsync: addAssetItems,
    isSuccess,
    assetItemForm,
    setAssetItemForm,
    isPending,
  } = useAddAssetItems(() => {
    reset();
    setSelectedImage([]);
    setTimeout(() => {
      setAssetItemForm({
        showAlert: false,
      });
    }, 3000);
  }, formDataImage as FormDataPayload[]);

  return (
    <>
      {assetItemForm.showAlert && (
        <AlertBanner
          message={assetItemForm.message || ""}
          isSuccess={isSuccess}
          onClose={() => {
            setAssetItemForm({
              showAlert: false,
            });
          }}
        />
      )}

      {isPending && <Loading />}

      <form
        onSubmit={handleSubmit(async (data) => {
          await addAssetItems(data);
          if (isSuccess || !isSuccess) {
            window.scrollTo({ top: 0, behavior: "auto" });
          }
        })}
      >
        <Flex justifyContent="center" p={4}>
          <CardForms>
            <Heading as="h2" size="lg" textAlign="center" mb={6}>
              Add Asset Asset Items
            </Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              {/* Asset Number */}
              <FormControl isInvalid={!!errors.assetHeaderId}>
                <FormLabel fontWeight="bold">Asset Number</FormLabel>
                <Select
                  {...register("assetHeaderId", { valueAsNumber: true })}
                  placeholder="Select Asset Number"
                >
                  {assetHeaders?.map((assetHeader) => (
                    <option key={assetHeader.id} value={assetHeader.id}>
                      {assetHeader.id} - {assetHeader.assetNumber}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.assetHeaderId?.message}
                </FormErrorMessage>
              </FormControl>

              {/* Duty */}
              <FormControl isInvalid={!!errors.duty}>
                <FormLabel fontWeight="bold">Duty</FormLabel>
                <Select {...register("duty")} placeholder="Select Duty">
                  {duty?.map((duty) => (
                    <option key={duty} value={duty}>
                      {duty}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.duty?.message}</FormErrorMessage>
              </FormControl>

              {/* Specification */}
              <FormControl isInvalid={!!errors.specification}>
                <FormLabel fontWeight="bold">Specification</FormLabel>
                <Select
                  {...register("specification")}
                  placeholder="Select Specification"
                >
                  {specification?.map((specification) => (
                    <option key={specification} value={specification}>
                      {specification}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.specification?.message}
                </FormErrorMessage>
              </FormControl>

              {/* Valve Type */}
              <FormControl isInvalid={!!errors.valveType}>
                <FormLabel fontWeight="bold">Valve Type</FormLabel>
                <Select
                  {...register("valveType")}
                  placeholder="Select Valve Type"
                >
                  {valveType?.map((valveType) => (
                    <option key={valveType} value={valveType}>
                      {valveType}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.valveType?.message}</FormErrorMessage>
              </FormControl>

              {/* Valve Size */}
              <FormControl isInvalid={!!errors.valveSize}>
                <FormLabel fontWeight="bold">Valve Size</FormLabel>
                <Select
                  {...register("valveSize")}
                  placeholder="Select Valve Size"
                >
                  {valveSize?.map((valveSize) => (
                    <option key={valveSize} value={valveSize}>
                      {valveSize}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.valveSize?.message}</FormErrorMessage>
              </FormControl>

              {/* Model */}
              <FormControl isInvalid={!!errors.model}>
                <FormLabel fontWeight="bold">Model</FormLabel>
                <Input {...register("model")} placeholder="e.g Model 001" />
                <FormErrorMessage>{errors.model?.message}</FormErrorMessage>
              </FormControl>

              {/* Actuation */}
              <FormControl isInvalid={!!errors.actuation}>
                <FormLabel fontWeight="bold">Actuation</FormLabel>
                <Select
                  {...register("actuation")}
                  placeholder="Select Actuation"
                >
                  {actuation?.map((actuation) => (
                    <option key={actuation} value={actuation}>
                      {actuation}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.actuation?.message}</FormErrorMessage>
              </FormControl>

              {/* Actuation Type */}
              <FormControl isInvalid={!!errors.actuationType}>
                <FormLabel fontWeight="bold">Actuation Type</FormLabel>
                <Select
                  {...register("actuationType")}
                  placeholder="Select Actuation Type"
                >
                  {actuationType?.map((actuationType) => (
                    <option key={actuationType} value={actuationType}>
                      {actuationType}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.actuationType?.message}
                </FormErrorMessage>
              </FormControl>

              {/* Flange Connection */}
              <FormControl isInvalid={!!errors.flangeConnection}>
                <FormLabel fontWeight="bold">Flange Connection</FormLabel>
                <Select
                  {...register("flangeConnection")}
                  placeholder="Select Flange Connection"
                >
                  {flangeConnection?.map((flangeConnection) => (
                    <option key={flangeConnection} value={flangeConnection}>
                      {flangeConnection}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.flangeConnection?.message}
                </FormErrorMessage>
              </FormControl>

              {/* Instrumentation */}
              <FormControl isInvalid={!!errors.instrumentation}>
                <FormLabel fontWeight="bold">Instrumentation</FormLabel>
                <Select
                  {...register("instrumentation")}
                  placeholder="Select Instrumentation"
                >
                  {instrumentation?.map((instrumentation) => (
                    <option key={instrumentation} value={instrumentation}>
                      {instrumentation}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.instrumentation?.message}
                </FormErrorMessage>
              </FormControl>

              {/* OEM Part Number */}
              <FormControl isInvalid={!!errors.oemPartNumber}>
                <FormLabel fontWeight="bold">OEM Part Number</FormLabel>
                <Input
                  {...register("oemPartNumber")}
                  placeholder="e.g OEM Part 001"
                />
                <FormErrorMessage>
                  {errors.oemPartNumber?.message}
                </FormErrorMessage>
              </FormControl>

              {/* ANSI */}
              <FormControl isInvalid={!!errors.ansi}>
                <FormLabel fontWeight="bold">ANSI</FormLabel>
                <Input {...register("ansi")} placeholder="e.g ANSI Code" />
                <FormErrorMessage>{errors.ansi?.message}</FormErrorMessage>
              </FormControl>

              {/* General Notes */}
              <FormControl isInvalid={!!errors.generalNotes}>
                <FormLabel fontWeight="bold">General Notes</FormLabel>
                <Input
                  {...register("generalNotes")}
                  placeholder="General Notes"
                />
                <FormErrorMessage>
                  {errors.generalNotes?.message}
                </FormErrorMessage>
              </FormControl>
            </Grid>

            {/* Image Upload */}
            <FormControl mt={6}>
              <FormLabel fontWeight="bold">Upload Image</FormLabel>
              <Box
                border="2px dashed"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
                textAlign="center"
                cursor="pointer"
                _hover={{ borderColor: "teal.500" }}
              >
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                  display="none"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Icon as={FaUpload} w={8} h={8} color="gray.500" />
                  <Text mt={2} color="gray.500">
                    Drag & drop or click to upload
                  </Text>
                </label>
              </Box>
              {selectedImage.length > 0 && (
                <Box mt={4}>
                  <Text fontWeight="bold">Selected Images:</Text>
                  <Flex mt={2} wrap="wrap">
                    {selectedImage.map((image, index) => (
                      <Box key={index} m={2}>
                        <img
                          src={image.image}
                          alt={`Selected ${index}`}
                          style={{ maxWidth: "500px", borderRadius: "md" }}
                        />
                      </Box>
                    ))}
                  </Flex>
                </Box>
              )}
            </FormControl>

            {/* Submit Button */}
            <Flex justifyContent="flex-end" mt={6}>
              <Button
                colorScheme="teal"
                size="lg"
                type="submit"
                leftIcon={<Icon as={FaCheckCircle} />}
                isLoading={isPending}
                loadingText="Submitting"
              >
                Submit
              </Button>
            </Flex>
          </CardForms>
        </Flex>
      </form>
    </>
  );
};

export default AssetItemsForm;
