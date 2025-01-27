import { useParams } from "react-router-dom";
import {
  Text,
  Image,
  Grid,
  GridItem,
  Stack,
  Flex,
  Divider,
  Box,
  Heading,
} from "@chakra-ui/react";
import CardForms from "../components/CardForms";
import useAssetItemDetails from "../hooks/useAssetItemDetails";
import SkeletonLoading from "../components/SkeletonLoading";
import getCroppedImageUrl from "../image-url";

const AssetItemDetails = () => {
  const { id } = useParams();
  const { data: assetItemDetails, isLoading } = useAssetItemDetails(
    parseInt(id!)
  );

  if (isLoading) {
    return (
      <Flex justifyContent="center">
        <CardForms>
          <SkeletonLoading loadingType="details" />
        </CardForms>
      </Flex>
    );
  }

  if (!assetItemDetails || assetItemDetails.length === 0) {
    return (
      <Flex justifyContent="center">
        <CardForms>
          <Text>No asset item details found.</Text>
        </CardForms>
      </Flex>
    );
  }

  return (
    <Flex justifyContent="center">
      <CardForms>
        {assetItemDetails?.map((assetItemDetails) => (
          <Stack spacing={5} key={assetItemDetails.id}>
            <Heading as="h2" size="lg" textAlign="center" mb={4}>
              Asset Details
            </Heading>

            <Grid templateColumns="repeat(2, 1fr)" gap={4} alignItems="center">
              <GridItem>
                <Text fontWeight="bold" color="teal.500">
                  Asset Number:
                </Text>
              </GridItem>
              <GridItem>
                <Text>{assetItemDetails.assetHeader.assetNumber}</Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="bold" color="teal.500">
                  Duty:
                </Text>
              </GridItem>
              <GridItem>
                <Text>{assetItemDetails.duty}</Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="bold" color="teal.500">
                  Specification:
                </Text>
              </GridItem>
              <GridItem>
                <Text>{assetItemDetails.specification}</Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="bold" color="teal.500">
                  Valve Type:
                </Text>
              </GridItem>
              <GridItem>
                <Text>{assetItemDetails.valveType}</Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="bold" color="teal.500">
                  Valve Size:
                </Text>
              </GridItem>
              <GridItem>
                <Text>{assetItemDetails.valveSize}</Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="bold" color="teal.500">
                  Actuation:
                </Text>
              </GridItem>
              <GridItem>
                <Text>{assetItemDetails.actuation}</Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="bold" color="teal.500">
                  Actuation Type:
                </Text>
              </GridItem>
              <GridItem>
                <Text>{assetItemDetails.actuationType}</Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="bold" color="teal.500">
                  Flange Connection:
                </Text>
              </GridItem>
              <GridItem>
                <Text>{assetItemDetails.flangeConnection}</Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="bold" color="teal.500">
                  Instrumentation:
                </Text>
              </GridItem>
              <GridItem>
                <Text>{assetItemDetails.instrumentation}</Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="bold" color="teal.500">
                  OEM Part Number:
                </Text>
              </GridItem>
              <GridItem>
                <Text>{assetItemDetails.oemPartNumber}</Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="bold" color="teal.500">
                  ANSI:
                </Text>
              </GridItem>
              <GridItem>
                <Text>{assetItemDetails.ansi}</Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="bold" color="teal.500">
                  General Notes:
                </Text>
              </GridItem>
              <GridItem>
                <Text>{assetItemDetails.generalNotes}</Text>
              </GridItem>
            </Grid>

            <Divider my={4} />

            <Box>
              <Text fontWeight="bold" color="teal.500" mb={2}>
                Image/s:
              </Text>
              <Flex wrap="wrap" gap={4}>
                {assetItemDetails.images.split(";").map((image, index) => (
                  <Image
                    src={getCroppedImageUrl(image)}
                    key={index}
                    alt={`Asset Image ${index + 1}`}
                    borderRadius="md"
                    boxShadow="md"
                  />
                ))}
              </Flex>
            </Box>
          </Stack>
        ))}
      </CardForms>
    </Flex>
  );
};

export default AssetItemDetails;
