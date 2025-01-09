import { Box, Card, CardBody } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const CardForms = ({ children }: Props) => {
  return (
    <Box padding={3}>
      <Card minW={{ base: "sm", lg: "2xl" }} variant="outline">
        <CardBody>{children}</CardBody>
      </Card>
    </Box>
  );
};

export default CardForms;
