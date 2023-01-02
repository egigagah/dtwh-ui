import {
    Box,
    Flex,
    HStack,
    LinkBox,
    LinkOverlay,
    Stack,
    Text,
    Tooltip,
    UseDisclosureProps,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { IoBarChart, IoHome } from "react-icons/io5";

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
        >
            <ItemLink
                href="/admin"
                text="Home"
                IconLink={IoHome}
                isOpen={disclosure.isOpen}
            />
            <ItemLink
                href="/admin/report-table"
                text="Report"
                IconLink={IoBarChart}
                isOpen={disclosure.isOpen}
            />
        </Stack>
    );
}

export function ItemLink({
    href,
    text,
    IconLink,
    isOpen = false,
    direction = "horizontal",
}: {
    isOpen?: boolean;
    href: string;
    text: string;
    IconLink: IconType;
    direction?: "horizontal" | "vertical";
}) {
    const router = useRouter();
    const border =
        direction === "horizontal"
            ? { borderRight: "2.5px solid black" }
            : { borderBottom: "2.5px solid black" };
    return (
        <Tooltip
            label={text}
            placement="right"
            hasArrow
            fontSize="sm"
            isDisabled={isOpen || direction === "vertical"}
        >
            <LinkBox
                h="10"
                as={Flex}
                alignItems="center"
                bg="white"
                color="#808080"
                _hover={{ background: "#F5F5F5", color: "black" }}
                style={
                    router.pathname === href
                        ? {
                              color: "black",
                              ...border,
                          }
                        : {}
                }
            >
                <NextLink href={href} passHref>
                    <LinkOverlay>
                        <HStack h="10" alignItems="center" px={4} spacing={4}>
                            {direction === "horizontal" && (
                                <IconLink size={18} />
                            )}
                            {(isOpen || direction === "vertical") && (
                                <Text mb="0">{text}</Text>
                            )}
                        </HStack>
                    </LinkOverlay>
                </NextLink>
            </LinkBox>
        </Tooltip>
    );
}
