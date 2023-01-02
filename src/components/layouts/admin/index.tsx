import { Flex, HStack, Stack, useDisclosure } from "@chakra-ui/react";
import NextLink from "@components/links";
import { useTranslation } from "next-i18next";
import { useRef } from "react";
import { LayoutsProps } from "src/utils/types";
import Footer from "../Footer";
import Header from "../Header";

export default function AdminLayout({
    children,
    withHeader = true,
    withFooter = true,
}: LayoutsProps): JSX.Element {
    const { t } = useTranslation();
    const btnMenuRef = useRef();
    const disclosure = useDisclosure();
    return (
        <Flex
            flex={1}
            flexDirection="column"
            bg={["white", "blackAlpha.50"]}
            h="100vh"
            overflow="hidden"
        >
            {withHeader && (
                <Header
                    btnMenuRef={btnMenuRef}
                    disclosure={disclosure}
                    subMenu={true}
                >
                    <NextLink href="/dashboard">{t("Dashboard")}</NextLink>
                </Header>
            )}
            <HStack
                flex={1}
                w="full"
                alignItems="flex-start"
                h="full"
                overflow="hidden"
            >
                {/* <Sidebar disclosure={disclosure} /> */}
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
