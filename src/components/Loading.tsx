import { Box, Spinner, Text } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex={999}
      display="flex"
      justifyContent="center"
      alignItems="center"
      backdropFilter="blur(5px)" // Creates the blur effect
    >
      <Spinner size="xl" color="white" />
      <Text color="white" ml={4} fontSize="lg">
        Posting data...
      </Text>
    </Box>
  );
};

export default Loading;
