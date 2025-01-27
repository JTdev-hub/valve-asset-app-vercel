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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import CardForms from "../components/CardForms";
import useAssetItemDetails from "../hooks/useAssetItemDetails";
import SkeletonLoading from "../components/SkeletonLoading";
import getCroppedImageUrl from "../image-url";
import { useState } from "react";
import React from "react";

const AssetItemDetails = () => {
  const { id, assetHeaderId } = useParams();
  const { data: assetItemDetails, isLoading } = useAssetItemDetails({
    id: parseInt(id!),
    assetHeaderId: parseInt(assetHeaderId!),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Flex justifyContent="center">
        <CardForms>
          <SkeletonLoading loadingType="details" />
        </CardForms>
      </Flex>
    );
  }

  if (!assetItemDetails) {
    return (
      <Flex justifyContent="center">
        <CardForms>
          <Text>No asset item details found.</Text>
        </CardForms>
      </Flex>
    );
  }

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    onOpen();
  };

  const {
    assetHeader,
    duty,
    specification,
    valveType,
    valveSize,
    model,
    actuation,
    actuationType,
    flangeConnection,
    instrumentation,
    oemPartNumber,
    ansi,
    generalNotes,
    images,
  } = assetItemDetails;

  return (
    <Flex justifyContent="center">
      <CardForms>
        <Stack spacing={5}>
          <Heading as="h2" size="lg" textAlign="center" mb={4}>
            Asset Details
          </Heading>

          <Grid templateColumns="repeat(2, 1fr)" gap={4} alignItems="center">
            {[
              { label: "Asset Number", value: assetHeader?.assetNumber },
              { label: "Asset Item Number", value: assetItemDetails.id },
              { label: "Duty", value: duty },
              { label: "Specification", value: specification },
              { label: "Model", value: model },
              { label: "Valve Type", value: valveType },
              { label: "Valve Size", value: valveSize },
              { label: "Actuation", value: actuation },
              { label: "Actuation Type", value: actuationType },
              { label: "Flange Connection", value: flangeConnection },
              { label: "Instrumentation", value: instrumentation },
              { label: "OEM Part Number", value: oemPartNumber },
              { label: "ANSI", value: ansi },
              { label: "General Notes", value: generalNotes },
            ].map(({ label, value }, index) => (
              <React.Fragment key={index}>
                <GridItem>
                  <Text fontWeight="bold" color="teal.500">
                    {label}:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>{value || "N/A"}</Text>
                </GridItem>
              </React.Fragment>
            ))}
          </Grid>

          <Divider my={4} />

          <Box>
            <Text fontWeight="bold" color="teal.500" mb={2}>
              Image/s:
            </Text>
            <Flex wrap="wrap" gap={4}>
              {images &&
                images.split(";").map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => handleImageClick(image)}
                    cursor="pointer"
                    _hover={{ opacity: 0.8 }}
                  >
                    <Image
                      src={getCroppedImageUrl(image)}
                      alt={`Asset Image ${index + 1}`}
                      borderRadius="md"
                      boxShadow="md"
                    />
                  </Box>
                ))}
            </Flex>
          </Box>
        </Stack>

        {/* Modal for Image Preview */}
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <Image
              src={selectedImage ? getCroppedImageUrl(selectedImage) : ""}
              alt="Enlarged Asset Image"
              borderRadius="md"
            />
          </ModalContent>
        </Modal>
      </CardForms>
    </Flex>
  );
};

export default AssetItemDetails;
