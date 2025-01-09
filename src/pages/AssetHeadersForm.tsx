import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Stack,
  Input,
  Button,
  Text,
  HStack,
  Select,
  VStack,
  Flex,
} from "@chakra-ui/react";
import useCustomers from "../hooks/useCustomers";
import CardForms from "../components/CardForms";
import useAddAssetHeaders from "../hooks/useAddAssetHeaders";
import AlertBanner from "../components/AlertBanner";

const schema = z.object({
  customerId: z.number(),
  assetNumber: z
    .string()
    .min(5, { message: "Asset Number must be at least 5 characters" })
    .max(50),
  assetDescription: z
    .string()
    .min(3, { message: "Asset Description must be at least 3 characters" })
    .max(50),
  assetSerialNo: z
    .string()
    .min(5, { message: "Asset Serial Number must be at least 5 characters" })
    .max(20),
  siteSection: z
    .string()
    .min(3, { message: "Site Section must be at least 5 characters" })
    .max(10),
});

type AssetHeadersFormData = z.infer<typeof schema>;

const AssetHeadersForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssetHeadersFormData>({ resolver: zodResolver(schema) });

  const {
    mutate: addAssetHeaders,
    showAlert,
    message,
    setShowAlert,
    isPending,
    isSuccess,
  } = useAddAssetHeaders(() => {
    //Reset fields on success
    reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  });

  const { data: customers } = useCustomers();

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
          addAssetHeaders(data);
        })}
      >
        <Flex justifyContent="center">
          <CardForms>
            <Stack spacing={3}>
              <HStack>
                <VStack align="start">
                  <Text>Customer ID</Text>
                  <Select
                    {...register("customerId", { valueAsNumber: true })}
                    placeholder="Customer ID"
                  >
                    {customers?.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.id} - {customer.customerName}
                      </option>
                    ))}
                  </Select>
                </VStack>
                <VStack align="start">
                  <Text>Asset Number</Text>
                  <Input
                    {...register("assetNumber")}
                    placeholder="e.g Asset 001"
                  ></Input>
                  {errors.assetNumber && (
                    <Text fontSize="xs" color="red.500">
                      {errors.assetNumber.message}
                    </Text>
                  )}
                </VStack>
              </HStack>
              <VStack align="start">
                <Text>Asset Description</Text>
                <Input
                  {...register("assetDescription")}
                  placeholder="e.g Valve for Hose 001"
                ></Input>
                {errors.assetDescription && (
                  <Text fontSize="xs" color="red.500">
                    {errors.assetDescription.message}
                  </Text>
                )}
              </VStack>
              <VStack align="start">
                <Text>Asset Serial Number</Text>
                <Input
                  {...register("assetSerialNo")}
                  placeholder="e.g ASNO001"
                ></Input>
                {errors.assetSerialNo && (
                  <Text fontSize="xs" color="red.500">
                    {errors.assetSerialNo.message}
                  </Text>
                )}
              </VStack>
              <VStack align="start">
                <Text>Site Section</Text>
                <Input
                  {...register("siteSection")}
                  placeholder="Site Section"
                ></Input>
                {errors.siteSection && (
                  <Text fontSize="xs" color="red.500">
                    {errors.siteSection.message}
                  </Text>
                )}
              </VStack>
            </Stack>
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

export default AssetHeadersForm;
