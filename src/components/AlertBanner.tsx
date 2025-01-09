import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton,
} from "@chakra-ui/react";

import { ERROR_STATUS, SUCCESS_STATUS } from "../constants/status-constants";
interface Props {
  onClose: () => void;
  message: string;
  isSuccess: boolean;
}
const AlertBanner = ({ onClose, message, isSuccess }: Props) => {
  return (
    <Alert status={isSuccess ? SUCCESS_STATUS : ERROR_STATUS} marginBottom={4}>
      <AlertIcon />
      <Box>
        <AlertDescription>{message}</AlertDescription>
      </Box>
      {!isSuccess && (
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          onClick={onClose}
        />
      )}
    </Alert>
  );
};

export default AlertBanner;
