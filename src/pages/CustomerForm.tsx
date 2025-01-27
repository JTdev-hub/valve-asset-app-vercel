import {
  Button,
  Flex,
  Input,
  Stack,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CardForms from "../components/CardForms";
import useAddUsers from "../hooks/useAddUsers";
import AlertBanner from "../components/AlertBanner";
import Loading from "../components/Loading";

const schema = z.object({
  customerName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50),
  customerSite: z
    .string()
    .min(3, { message: "Site must be at least 3 characters" })
    .max(50),
  customerContact: z.string(),
});

type CustomerFormData = z.infer<typeof schema>;

const CustomerForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({ resolver: zodResolver(schema) });

  const {
    mutateAsync: addCustomers,
    isSuccess,
    showAlert,
    message,
    setShowAlert,
    isPending,
  } = useAddUsers(() => {
    reset(); // Reset fields on success
    setTimeout(() => {
      setShowAlert(false); // Hide success message after 3 seconds
    }, 3000);
  });

  const onSubmit = async (data: CustomerFormData) => {
    await addCustomers([data]);
    if (isSuccess || !isSuccess) {
      window.scrollTo({ top: 0, behavior: "auto" }); // Scroll to top after submission
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

      {isPending && <Loading />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justifyContent="center">
          <CardForms>
            <Heading as="h2" size="lg" textAlign="center" mb={6}>
              Add Customer
            </Heading>

            <Stack spacing={4}>
              <VStack align="start">
                <Text fontWeight="bold" color="teal.500">
                  Customer Name
                </Text>
                <Input
                  {...register("customerName")}
                  placeholder="e.g John"
                  isInvalid={!!errors.customerName}
                />
                {errors.customerName && (
                  <Text fontSize="xs" color="red.500">
                    {errors.customerName.message}
                  </Text>
                )}
              </VStack>

              <VStack align="start">
                <Text fontWeight="bold" color="teal.500">
                  Customer Site
                </Text>
                <Input
                  {...register("customerSite")}
                  placeholder="e.g Site 001"
                  isInvalid={!!errors.customerSite}
                />
                {errors.customerSite && (
                  <Text fontSize="xs" color="red.500">
                    {errors.customerSite.message}
                  </Text>
                )}
              </VStack>

              <VStack align="start">
                <Text fontWeight="bold" color="teal.500">
                  Customer Contact
                </Text>
                <Input
                  {...register("customerContact")}
                  placeholder="e.g +639171234567"
                  isInvalid={!!errors.customerContact}
                />
                {errors.customerContact && (
                  <Text fontSize="xs" color="red.500">
                    {errors.customerContact.message}
                  </Text>
                )}
              </VStack>
            </Stack>

            <Button
              colorScheme="teal"
              size="md"
              marginTop={6}
              type="submit"
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

export default CustomerForm;
