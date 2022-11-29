import {
    Box,
    Flex,
    HStack,
    LinkBox,
    LinkOverlay,
    Stack,
    Text,
    UseDisclosureProps,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Ref } from "react";
import { IconType } from "react-icons";
import { IoBarChart, IoBook } from "react-icons/io5";

export default function Sidebar({
    disclosure,
}: {
    disclosure: UseDisclosureProps;
}) {
    return (
        <Stack
            w={disclosure.isOpen ? "64" : "fit-content"}
            as={Flex}
            h="full"
            shadow="md"
            bg="white"
            py={2}
            overflow="scroll"
            // spacing={2}
        >
            <ItemLink
                href="/admin"
                text="Dashboard"
                IconLink={IoBarChart}
                isOpen={disclosure.isOpen}
            />
            <ItemLink
                href="/admin/test"
                text="Test"
                IconLink={IoBook}
                isOpen={disclosure.isOpen}
            />
        </Stack>
    );
}

function ItemLink({
    href,
    text,
    IconLink,
    isOpen = false,
}: {
    isOpen?: boolean;
    href: string;
    text: string;
    IconLink: IconType;
}) {
    return (
        <LinkBox
            h="10"
            as={Flex}
            alignItems="center"
            _hover={{ background: "#C5E4F3", color: "#015884" }}
            _active={{ background: "#C5E4F3", color: "#015884" }}
            _activeLink={{ background: "#C5E4F3", color: "#015884" }}
        >
            <NextLink href={href} passHref>
                <LinkOverlay>
                    <HStack h="10" alignItems="center" px={4} spacing={4}>
                        <IconLink size={18} />
                        {isOpen && <Text>{text}</Text>}
                    </HStack>
                </LinkOverlay>
            </NextLink>
        </LinkBox>
    );
}
