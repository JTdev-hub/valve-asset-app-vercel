import { Flex, useColorModeValue } from "@chakra-ui/react";

import DesktopNav from "../components/DesktopNav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "auto" }}
        >
          <DesktopNav />
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
};

export default Layout;
