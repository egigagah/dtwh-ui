import { Flex, Stack } from "@chakra-ui/react";
import NextLink from "@components/links";
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
            bg={["blackAlpha.50", "blackAlpha.50"]}
            minH="100vh"
        >
            {withHeader && (
                <Header>
                    <NextLink href="/dashboard">Open Data</NextLink>
                </Header>
            )}
            <Stack
                flex={1}
                justifyContent={["flex-start", "center"]}
                spacing={4}
            >
                {children}
            </Stack>
            {withFooter && <Footer />}
        </Flex>
    );
}
