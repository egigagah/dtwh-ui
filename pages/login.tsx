import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Button,
    Center,
    CloseButton,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetStaticProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import * as yup from "yup";

export default function Login({ locale }: { locale: string }): JSX.Element {
    const { t } = useTranslation("auth");
    const { data, status } = useSession();
    const loginSchema = yup
        .object({
            email: yup
                .string()
                .email(t("email-tidak-valid"))
                .required(t("email-wajib-diisi")),
            password: yup
                .string()
                .min(3, t("password-minimal-3-character"))
                .required(t("password-wajib-diisi")),
        })
        .required();
    const router = useRouter();
    const targetUrl = (router.query?.callbackUrl as string) || "/admin";
    const defaultUrl = locale !== "id" ? `/${locale}${targetUrl}` : targetUrl;
    const callbackUrl = defaultUrl;
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState<string | undefined>(undefined);
    const { onClose, onOpen, isOpen } = useDisclosure({ defaultIsOpen: false });
    const {
        handleSubmit,
        register,
        formState: { errors, isValid, touchedFields },
    } = useForm({
        defaultValues:
            process.env.NODE_ENV === "production"
                ? { email: "", password: "" }
                : { email: "user@app.com", password: "123456" },
        resolver: yupResolver(loginSchema),
        mode: "onChange",
    });

    function submitForm(data: any) {
        setError(undefined);
        setLoading(true);
        signIn("credentials", {
            redirect: true,
            email: data.email,
            password: data.password,
            callbackUrl: callbackUrl,
        })
            .then((res) => {
                if (res?.error) {
                    setError(res?.error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        if (isError) onOpen();
        else onClose();
    }, [isError]);

    return (
        <Flex flex={1} h="full" w="full" alignItems="center">
            <Center h="full" w="full">
                {status === "unauthenticated" && (
                    <Box w="lg" shadow="xl" bg="white" p={8} rounded="xl">
                        {isOpen && (
                            <Alert
                                status="error"
                                display="flex"
                                flex={1}
                                justifyContent="space-between"
                            >
                                <HStack>
                                    <AlertIcon />
                                    <AlertDescription>
                                        {isError}
                                    </AlertDescription>
                                </HStack>
                                <CloseButton onClick={onClose} float="right" />
                            </Alert>
                        )}
                        <form onSubmit={handleSubmit(submitForm)}>
                            <Stack spacing={8} w="full">
                                <Heading textDecor="underline">
                                    {t("login-form")}
                                </Heading>
                                <VStack spacing={4}>
                                    <FormControl
                                        isInvalid={
                                            !!errors.email &&
                                            touchedFields.email
                                        }
                                    >
                                        <FormLabel>{t("email")}</FormLabel>
                                        <Input
                                            type="email"
                                            {...register("email")}
                                        />
                                        <FormErrorMessage>
                                            {errors.email?.message as string}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors.password &&
                                            touchedFields.password
                                        }
                                    >
                                        <FormLabel>{t("password")}</FormLabel>
                                        <Input
                                            type="password"
                                            {...register("password")}
                                        />
                                        <FormErrorMessage>
                                            {errors.password?.message as string}
                                        </FormErrorMessage>
                                    </FormControl>
                                </VStack>
                                <Button
                                    type="submit"
                                    disabled={!isValid}
                                    colorScheme="facebook"
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                )}
                {status === "loading" && <Box w="md">loading...</Box>}
            </Center>
        </Flex>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await getServerSideTranslations(locale as string, [
                "common",
                "auth",
            ])),
            locale: locale,
            data: [],
        },
    };
};
