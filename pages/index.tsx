import React from "react";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import { CustomAppElement } from "src/utils/types";
import Image from "next/image";
import { useRouter } from "next/router";

const App: CustomAppElement = () => {
    const router = useRouter();
    return (
        <Flex direction="column" h="full" px={[2, 8, 16]} bg="white">
            <Stack
                direction="column"
                w="full"
                as={Flex}
                flex={1}
                h="80vh"
                justifyContent="center"
                alignItems="center"
                py={["10", "14", "24"]}
                px={["0", "10", "20"]}
                gap={10}
            >
                <Flex
                    w="full"
                    maxW="container.xl"
                    textAlign="center"
                    direction="column"
                >
                    <Text
                        fontSize={["4xl", "5xl", "6xl", "7xl"]}
                        m={0}
                        fontWeight="800"
                        lineHeight="none"
                        letterSpacing="-.06em"
                    >
                        Dashboard. Analytics. Insight.
                    </Text>
                </Flex>
                <Flex
                    w="full"
                    maxW="container.xl"
                    textAlign="center"
                    direction="column"
                    px={["4", "8", "12"]}
                >
                    <Text
                        fontSize={"2xl"}
                        m={0}
                        color="blackAlpha.500"
                        // fontWeight="800"
                        lineHeight="none"
                        // letterSpacing="-.06em"
                    >
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Sequi, itaque harum neque odit distinctio incidunt
                        ex eligendi molestias minima aliquam totam eius libero
                        maiores delectus ab consequatur quisquam? Harum,
                        blanditiis.
                    </Text>
                </Flex>
                <Flex
                    flexDirection="row"
                    w="full"
                    maxW="container.xl"
                    direction="column"
                    px={["4", "8", "12"]}
                    justifyContent="center"
                    gap={4}
                >
                    <Button
                        size="lg"
                        bg="black"
                        color="white"
                        _hover={{
                            background: "white",
                            color: "black",
                            border: "1px solid black",
                        }}
                        onClick={() => router.push("/dashboard")}
                    >
                        Open Data
                    </Button>
                    <Button size="lg" variant="outline">
                        Sign In
                    </Button>
                </Flex>
                <Flex w="full" maxW="container.lg" h="600" position="relative">
                    <Image
                        layout="fill"
                        objectFit="contain"
                        src="/images/main-screen.png"
                        alt="dashboard-1"
                        quality={100}
                    />
                    <Image
                        layout="fixed"
                        objectPosition="right bottom"
                        width={300}
                        height={200}
                        src="/images/screen-01.png"
                        alt="dashboard-2"
                        quality={100}
                    />
                </Flex>
            </Stack>
        </Flex>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await getServerSideTranslations(locale as string, [
                "common",
                "auth",
                "login",
            ])),
        },
    };
};

App.appProps = {
    Layout: {
        withHeader: true,
        withFooter: true,
        adminLayout: false,
    },
};

export default App;
