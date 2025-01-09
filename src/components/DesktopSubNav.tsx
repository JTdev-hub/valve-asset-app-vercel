import { NavItem } from "../NavItems";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  useColorModeValue,
  Stack,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      //as="a"
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
    >
      <Link to={href || ""}>
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "green.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"green.400"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </Box>
  );
};

export default DesktopSubNav;
