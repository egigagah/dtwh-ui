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

const loginSchema = yup
    .object({
        email: yup
            .string()
            .email("Email tidak valid")
            .required("Email wajib diisi"),
        password: yup
            .string()
            .min(3, "Password minimal 3 character")
            .required("password wajib diisi"),
    })
    .required();

export default function Login({ locale }: { locale: string }): JSX.Element {
    const router = useRouter();
    const targetUrl = (router.query?.callbackUrl as string) || "/admin";
    const defaultUrl = locale !== "id" ? `/${locale}${targetUrl}` : targetUrl;
    const callbackUrl = defaultUrl;
    console.log(callbackUrl, locale);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState<string | undefined>(undefined);
    const { onClose, onOpen, isOpen } = useDisclosure({ defaultIsOpen: false });
    const {
        handleSubmit,
        register,
        formState: { errors, isValid, touchedFields },
    } = useForm({
        defaultValues: { email: "user@app.com", password: "123456" },
        resolver: yupResolver(loginSchema),
        mode: "onChange",
    });
    const { t } = useTranslation();
    const { data, status } = useSession();

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
                console.log(res, " -- login res");
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
                                <Heading textDecor="underline">Login</Heading>
                                <VStack spacing={4}>
                                    <FormControl
                                        isInvalid={
                                            !!errors.email &&
                                            touchedFields.email
                                        }
                                    >
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            type="email"
                                            {...register("email")}
                                        />
                                        <FormErrorMessage>
                                            {errors.email?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors.password &&
                                            touchedFields.password
                                        }
                                    >
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            type="password"
                                            {...register("password")}
                                        />
                                        <FormErrorMessage>
                                            {errors.password?.message ||
                                                "halloo"}
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
