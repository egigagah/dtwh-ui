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
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, Ref, useRef } from "react";
import { RiMenu3Line } from "react-icons/ri";
import Language from "./Language";

export default function Header({
    children,
    icon,
    btnMenuRef,
    disclosure,
}: {
    disclosure?: UseDisclosureProps;
    btnMenuRef?: Ref<any>;
    children: ReactNode;
    icon?: ReactNode | string;
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
                    <Link href="/api/auth/signout">
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                signOut({ redirect: true, callbackUrl: "/" });
                            }}
                        >
                            {t("signout")}
                        </a>
                    </Link>
                )}
                {!session && (
                    <Link href="/login">
                        <a>{t("signin")}</a>
                    </Link>
                )}
                <Divider
                    display={["none", "block"]}
                    orientation="vertical"
                    h="25px"
                />
                <Divider display={["block", "none"]} orientation="horizontal" />
                <Language
                    listItem={route?.locales || []}
                    onToggleLang={onToggleLanguageClick}
                    translation={t}
                    value={route.locale}
                />
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
            as="nav"
            align="center"
            pos="relative"
            justify="space-between"
            py={4}
            px={[6, 16]}
            boxSize="full"
            position="sticky"
            bg="white"
        >
            <Box fontSize="xl">
                {disclosure && disclosure.onClose && disclosure.onOpen && (
                    <IconButton
                        aria-label="sidebar-menu"
                        icon={<RiMenu3Line />}
                        onClick={handleMenuBtn}
                        ref={btnMenuRef}
                        variant="ghost"
                        mr={4}
                    />
                )}
                <Link href="/">{icon || <a>{t("logo-here")}</a>}</Link>
            </Box>
            <HStack spacing={4} display={["none", "flex"]}>
                <Menus />
            </HStack>
            <MobileMenus display={["flex", "none"]}>
                <Menus />
            </MobileMenus>
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
                        <Link href="/">
                            {props.icon || <a>{t("logo-here")}</a>}
                        </Link>
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
