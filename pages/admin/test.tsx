import React, { useMemo, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import { useSession } from "next-auth/react";
import { CustomAppElement } from "src/utils/types";

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
        <Flex direction="column" h="full" px={[2, 8, 16]}>
            <Text>Test Page</Text>
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
        withFooter: false,
        adminLayout: true,
    },
};

export default App;
