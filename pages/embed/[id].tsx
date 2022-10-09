import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import Pie from "@components/charts/Pie";
import { dataPie } from "src/utils/datas/charts";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { CustomAppElement, CustomAppProps } from "src/utils/types";

const EmbedApp: CustomAppElement = () => {
    const router = useRouter();
    const { id } = router.query;

    console.log(id);
    return (
        <Flex flex={1} justify="center" h="100%" w="100%">
            <Pie data={dataPie} />
        </Flex>
    );
};

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [{ params: { id: "pie" } }, { params: { id: "test" } }],
        fallback: "blocking", // can also be true or 'blocking'
    };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await getServerSideTranslations(locale as string, ["common"])),
            data: [],
        },
    };
};

EmbedApp.appProps = {
    Layout: {
        withHeader: false,
        withFooter: false,
    },
};

export default EmbedApp;
