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
  Heading,
  Icon,
} from "@chakra-ui/react";
import useCustomers from "../hooks/useCustomers";
import CardForms from "../components/CardForms";
import useAddAssetHeaders from "../hooks/useAddAssetHeaders";
import AlertBanner from "../components/AlertBanner";
import Loading from "../components/Loading";
import { FaCheckCircle } from "react-icons/fa";

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
    formState: { errors, isSubmitting },
  } = useForm<AssetHeadersFormData>({ resolver: zodResolver(schema) });

  const {
    mutate: addAssetHeaders,
    showAlert,
    message,
    setShowAlert,
    isPending,
    isSuccess,
  } = useAddAssetHeaders(() => {
    // Reset fields on success
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

      {isPending && <Loading />}

      <form onSubmit={handleSubmit((data) => addAssetHeaders(data))}>
        <Flex justifyContent="center">
          <CardForms>
            <Heading as="h2" size="lg" textAlign="center" mb={6}>
              Add Asset Header
            </Heading>

            <Stack spacing={4}>
              <HStack spacing={4}>
                <VStack align="start" flex="1">
                  <Text fontWeight="bold">Customer ID</Text>
                  <Select
                    {...register("customerId", { valueAsNumber: true })}
                    placeholder="Customer ID"
                    isInvalid={!!errors.customerId}
                  >
                    {customers?.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.id} - {customer.customerName}
                      </option>
                    ))}
                  </Select>
                  {errors.customerId && (
                    <Text fontSize="xs" color="red.500">
                      {errors.customerId.message}
                    </Text>
                  )}
                </VStack>

                <VStack align="start" flex="1">
                  <Text fontWeight="bold">Asset Number</Text>
                  <Input
                    {...register("assetNumber")}
                    placeholder="e.g Asset 001"
                    isInvalid={!!errors.assetNumber}
                  />
                  {errors.assetNumber && (
                    <Text fontSize="xs" color="red.500">
                      {errors.assetNumber.message}
                    </Text>
                  )}
                </VStack>
              </HStack>

              <VStack align="start">
                <Text fontWeight="bold">Asset Description</Text>
                <Input
                  {...register("assetDescription")}
                  placeholder="e.g Valve for Hose 001"
                  isInvalid={!!errors.assetDescription}
                />
                {errors.assetDescription && (
                  <Text fontSize="xs" color="red.500">
                    {errors.assetDescription.message}
                  </Text>
                )}
              </VStack>

              <VStack align="start">
                <Text fontWeight="bold">Asset Serial Number</Text>
                <Input
                  {...register("assetSerialNo")}
                  placeholder="e.g ASNO001"
                  isInvalid={!!errors.assetSerialNo}
                />
                {errors.assetSerialNo && (
                  <Text fontSize="xs" color="red.500">
                    {errors.assetSerialNo.message}
                  </Text>
                )}
              </VStack>

              <VStack align="start">
                <Text fontWeight="bold">Site Section</Text>
                <Input
                  {...register("siteSection")}
                  placeholder="Site Section"
                  isInvalid={!!errors.siteSection}
                />
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
              marginTop={6}
              type="submit"
              leftIcon={<Icon as={FaCheckCircle} />}
              isLoading={isSubmitting || isPending}
              loadingText="Submitting"
              width="full"
            >
              Submit
            </Button>
          </CardForms>
        </Flex>
      </form>
    </>
  );
};

export default AssetHeadersForm;
