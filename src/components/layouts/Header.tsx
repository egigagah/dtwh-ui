import {
    Box,
    BoxProps,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    Flex,
    forwardRef,
    HStack,
    IconButton,
    Stack,
    useDisclosure,
    UseDisclosureProps,
} from "@chakra-ui/react";
import NextLink from "@components/links";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ReactNode, Ref, useRef } from "react";
import { RiMenu3Line } from "react-icons/ri";
import Language from "./Language";
import { ItemLink } from "./Sidebar";
import { IoBarChart, IoHome } from "react-icons/io5";

export default function Header({
    children,
    icon,
    btnMenuRef,
    disclosure,
    subMenu = false,
}: {
    disclosure?: UseDisclosureProps;
    btnMenuRef?: Ref<any>;
    children: ReactNode;
    icon?: ReactNode | string;
    subMenu?: boolean;
}): JSX.Element {
    const { t } = useTranslation();
    const route = useRouter();
    const { data: session } = useSession();

    const onToggleLanguageClick = (newLocale: string) => {
        const { pathname, asPath, query } = route;
        route.push({ pathname, query }, asPath, { locale: newLocale });
    };

    const Menus = () => {
        return (
            <>
                {children}
                <Divider
                    display={["none", "block"]}
                    orientation="vertical"
                    h="25px"
                />
                <Divider display={["block", "none"]} orientation="horizontal" />
                {session && (
                    <NextLink
                        href="/api/auth/signout"
                        onClick={(e) => {
                            e.preventDefault();
                            signOut({ redirect: true, callbackUrl: "/" });
                        }}
                    >
                        {t("signout")}
                    </NextLink>
                )}
                {!session && <NextLink href="/login">{t("signin")}</NextLink>}
                {!session && (
                    <>
                        <Divider
                            display={["none", "block"]}
                            orientation="vertical"
                            h="25px"
                        />
                        <Divider
                            display={["block", "none"]}
                            orientation="horizontal"
                        />
                        <Language
                            listItem={route?.locales || []}
                            onToggleLang={onToggleLanguageClick}
                            translation={t}
                            value={route.locale}
                        />
                    </>
                )}
            </>
        );
    };

    const handleMenuBtn = () => {
        if (disclosure && disclosure?.onClose && disclosure.onOpen) {
            disclosure.isOpen ? disclosure.onClose() : disclosure.onOpen();
        }
    };

    return (
        <Flex
            flex={0}
            pos="relative"
            boxSize="full"
            px={[6, 8]}
            position="sticky"
            top={-16}
            bg="white"
            borderBottom="1px solid #F0F0F0"
            direction="column"
            pt={4}
            pb={subMenu ? 0 : 4}
            gap={2}
        >
            <Flex
                align="center"
                justify="space-between"
                px={subMenu ? [2, 4] : 2}
            >
                <Box fontSize="xl">
                    {!subMenu &&
                        disclosure &&
                        disclosure.onClose &&
                        disclosure.onOpen && (
                            <IconButton
                                aria-label="sidebar-menu"
                                icon={<RiMenu3Line />}
                                onClick={handleMenuBtn}
                                ref={btnMenuRef}
                                variant="ghost"
                                mr={4}
                            />
                        )}
                    <NextLink href={session ? "/admin" : "/"}>
                        {icon || t("logo-here")}
                    </NextLink>
                </Box>
                <HStack spacing={4} display={["none", "flex"]}>
                    <Menus />
                </HStack>
                <MobileMenus display={["flex", "none"]}>
                    <Menus />
                </MobileMenus>
            </Flex>

            {subMenu && (
                <HStack
                    as="nav"
                    bg="white"
                    w="full"
                    minH="10"
                    h="max-content"
                    alignItems="flex-end"
                >
                    <ItemLink
                        href="/admin"
                        text="Home"
                        IconLink={IoHome}
                        isOpen={disclosure?.isOpen}
                        direction="vertical"
                    />
                    <ItemLink
                        href="/admin/report-table"
                        text="Report"
                        IconLink={IoBarChart}
                        isOpen={disclosure?.isOpen}
                        direction="vertical"
                    />
                </HStack>
            )}
        </Flex>
    );
}

interface MobileMenusProps extends BoxProps {
    children: ReactNode;
    icon?: ReactNode | string;
}

const MobileMenus = forwardRef<MobileMenusProps, "div">((props, ref) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const btnRef = useRef<any>(undefined as any);
    const { t } = useTranslation();

    return (
        <Box {...props}>
            <IconButton
                aria-label="open-menu"
                icon={<RiMenu3Line />}
                onClick={onOpen}
                ref={btnRef}
                variant="ghost"
            />
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size="full"
            >
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <NextLink href="/">
                            {props.icon || t("logo-here")}
                        </NextLink>
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack
                            h="100%"
                            spacing={4}
                            // justifyContent="space-between"
                        >
                            {props.children}
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
});
