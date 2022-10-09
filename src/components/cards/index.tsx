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

export const Cards = ({ title, children, ...res }: CardsProps): JSX.Element => {
    return (
        <Box
            {...res}
            data-testid="card-container"
            shadow={res?.shadow || "xl"}
            h={res.h || res?.height || "28rem"}
            borderRadius={res.borderRadius || "lg"}
            overflow={res?.overflow || "clip"}
            borderWidth={res?.borderWidth || "1px"}
            borderStyle={res?.borderStyle || "solid"}
            borderColor={res?.borderColor || "gray.200"}
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
