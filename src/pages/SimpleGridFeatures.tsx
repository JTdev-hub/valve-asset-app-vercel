import { Box, SimpleGrid, Icon, Card, CardBody } from "@chakra-ui/react";
import { FcConferenceCall, FcFolder, FcFilingCabinet } from "react-icons/fc";
import Feature from "./Feature";

const SimpleGridFeatures = () => {
  return (
    <Box p={4} padding={20}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Card>
          <CardBody>
            <Feature
              icon={<Icon as={FcConferenceCall} w={10} h={10} />}
              title={"Customers"}
              text={"Maintain and view list of customers."}
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Feature
              icon={<Icon as={FcFolder} w={10} h={10} />}
              title={"Asset Headers"}
              text={"Maintain and view list of asset headers."}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Feature
              icon={<Icon as={FcFilingCabinet} w={10} h={10} />}
              title={"Asset Items"}
              text={
                "Maintain and view asset items that are associated with their respective asset headers."
              }
            />
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default SimpleGridFeatures;
