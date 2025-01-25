import { useParams } from "react-router-dom";

import { Text, Image, HStack, Stack, Flex } from "@chakra-ui/react";
import CardForms from "../components/CardForms";
import useAssetItemDetails from "../hooks/useAssetItemDetails";
import SkeletonLoading from "../components/SkeletonLoading";
import getCroppedImageUrl from "../image-url";

const AssetItemDetails = () => {
  const { id } = useParams();
  const { data: assetItemDetails, isLoading } = useAssetItemDetails(
    parseInt(id!)
  );

  if (isLoading)
    return (
      <Flex justifyContent="center">
        <CardForms>
          <SkeletonLoading loadingType="details" />
        </CardForms>
      </Flex>
    );
  return (
    <Flex justifyContent="center">
      <CardForms>
        {assetItemDetails?.map((assetItemDetails) => (
          <Stack spacing={3} key={assetItemDetails.id}>
            <HStack>
              <Text fontWeight="bold">Asset Number: </Text>
              <Text>{assetItemDetails.assetHeader.assetNumber}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Duty: </Text>
              <Text>{assetItemDetails.duty}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Specification: </Text>
              <Text>{assetItemDetails.specification}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Valve Type: </Text>
              <Text>{assetItemDetails.valveType}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Valve Size: </Text>
              <Text>{assetItemDetails.valveSize}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Actuation: </Text>
              <Text>{assetItemDetails.actuation}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Actuation Type: </Text>
              <Text>{assetItemDetails.actuationType}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Flange Connection: </Text>
              <Text>{assetItemDetails.flangeConnection}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Instrumentation: </Text>
              <Text>{assetItemDetails.instrumentation}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">OEM Part Number: </Text>
              <Text>{assetItemDetails.oemPartNumber}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">ANSI: </Text>
              <Text>{assetItemDetails.ansi}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">General Notes: </Text>
              <Text>{assetItemDetails.generalNotes}</Text>
            </HStack>
            <Text fontWeight="bold">Image/s: </Text>
            {assetItemDetails.images.split(";").map((image, index) => (
              <Image src={getCroppedImageUrl(image)} key={index}></Image>
            ))}
          </Stack>
        ))}
      </CardForms>
    </Flex>
  );
};

export default AssetItemDetails;
