import React, { PropsWithChildren } from "react";
import {
    SimpleGrid,
    Box,
    Heading,
    Text,
    BoxProps,
    Flex,
    Divider,
    HStack,
} from "@chakra-ui/react";
import Menus from "./Menus";

interface CardsProps extends BoxProps {
    title: string;
}

export const Cards = ({ title, children }: CardsProps): JSX.Element => {
    return (
        <Box
            data-testid="container"
            shadow="xl"
            h={"28rem"}
            borderRadius="lg"
            overflow="clip"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.200"
        >
            <HStack
                justifyContent="space-between"
                py={5}
                bg="white"
                px={[4, 8]}
            >
                <Heading fontSize={16} fontWeight="500">
                    {title}
                </Heading>
                <Menus />
            </HStack>
            <Divider />
            <Flex flex={1} h="80%">
                {children}
            </Flex>
        </Box>
    );
};
