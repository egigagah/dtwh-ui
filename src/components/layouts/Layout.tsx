import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { LayoutsProps } from "src/utils/types";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({
    children,
    withHeader = true,
    withFooter = true,
}: LayoutsProps): JSX.Element {
    return (
        <Flex
            flex={1}
            flexDirection="column"
            bg={["white", "gray.50"]}
            minH="100vh"
        >
            {withHeader && (
                <Header>
                    <Link href="/dashboard">
                        <a>Dashboard</a>
                    </Link>
                    <Link href="/data-persebaran">
                        <a>Persebaran</a>
                    </Link>
                </Header>
            )}
            <Stack
                flex={1}
                justifyContent={["flex-start", "center"]}
                spacing={4}
                px={[4, 0]}
            >
                {children}
            </Stack>
            {withFooter && <Footer />}
        </Flex>
    );
}
