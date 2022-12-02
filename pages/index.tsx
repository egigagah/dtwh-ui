import React, { useMemo, useState } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import { useSession } from "next-auth/react";
import { CustomAppElement } from "src/utils/types";
import Image from "next/image";

const defaultData = {
    status: {
        value: "ALL",
        label: "ALL",
    },
    tahun: [
        {
            value: -1,
            label: "ALL",
        },
    ],
};

const App: CustomAppElement = () => {
    return (
        <Flex direction="column" h="full" px={[2, 8, 16]} bg="white">
            <Stack
                direction={["column", "row"]}
                w="full"
                as={Flex}
                // flex={1}
                h="80vh"
                justifyContent="center"
                alignItems="center"
            >
                <Flex flex={2} w="full" textAlign="center" direction="column">
                    <Text
                        fontSize={["xl", "3xl", "4xl", "5xl", "6xl"]}
                        m={0}
                        fontWeight="extrabold"
                        lineHeight="none"
                    >
                        Data Warehouse and Dashboard Analytics
                    </Text>
                </Flex>
                <Flex flex={3} w="full" h="600" position="relative">
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
            ...(await getServerSideTranslations(locale as string, ["common"])),
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
