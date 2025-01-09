import {
  useColorModeValue,
  Stack,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import NAV_ITEMS from "../NavItems";
import DesktopSubNav from "./DesktopSubNav";
import { useState } from "react";

const DesktopNav = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const selectedColor = useColorModeValue("green.600", "blue.300");

  const handleClick = (label: string) => {
    setSelectedItem(label);
  };
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={
                  selectedItem === navItem.label ? selectedColor : linkColor
                }
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                onClick={() => handleClick(navItem.label)} // Set the selected item
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export default DesktopNav;
