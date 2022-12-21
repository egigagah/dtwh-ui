import {
    Box,
    Flex,
    HStack,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef } from "react";
import { LayoutsProps } from "src/utils/types";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function AdminLayout({
    children,
    withHeader = true,
    withFooter = true,
}: LayoutsProps): JSX.Element {
    const btnMenuRef = useRef();
    const disclosure = useDisclosure();
    return (
        <Flex
            flex={1}
            flexDirection="column"
            bg={["white", "gray.50"]}
            h="100vh"
            overflow="hidden"
        >
            {withHeader && (
                <Header btnMenuRef={btnMenuRef} disclosure={disclosure}>
                    <Link href="/dashboard">
                        <a>Dashboard</a>
                    </Link>
                    <Link href="/data-persebaran">
                        <a>Persebaran</a>
                    </Link>
                </Header>
            )}
            <HStack
                flex={1}
                w="full"
                alignItems="flex-start"
                h="full"
                overflow="hidden"
            >
                <Sidebar disclosure={disclosure} />
                <Stack
                    flex={1}
                    justifyContent={["flex-start", "center"]}
                    spacing={4}
                    px={[4, 0]}
                    h="full"
                    overflow="scroll"
                >
                    {children}
                </Stack>
            </HStack>
            {withFooter && <Footer />}
        </Flex>
    );
}
