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
            bg={["gray.50", "gray.50"]}
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
                px={[4, 0]}
            >
                {children}
            </Stack>
            {withFooter && <Footer />}
        </Flex>
    );
}
