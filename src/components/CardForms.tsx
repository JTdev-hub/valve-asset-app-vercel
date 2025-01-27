import { Box, Card, CardBody } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CardForms = ({ children }: Props) => {
  return (
    <Box padding={3}>
      <Card
        minW={{ base: "sm", lg: "2xl" }}
        variant="outline"
        boxShadow="lg" // Adds a larger shadow for a "pop-up" effect
        borderRadius="xl" // Rounded corners for a modern look
        borderWidth="1px" // Adds a subtle border
        borderColor="gray.200" // Light border color
        bg="white" // White background to contrast with the canvas
        _hover={{
          boxShadow: "xl", // Enhances shadow on hover for interactivity
          transform: "translateY(-2px)", // Slight lift effect on hover
          transition: "all 0.2s ease-in-out", // Smooth transition
        }}
      >
        <CardBody>{children}</CardBody>
      </Card>
    </Box>
  );
};

export default CardForms;
