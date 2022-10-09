import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import { dataPie } from "src/utils/datas/charts";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/react";
import { CustomAppElement } from "src/utils/types";
import Charts from "@components/charts";
import { Cards } from "@components/cards";
import Menus from "@components/cards/Menus";

const EmbedApp: CustomAppElement = () => {
    const router = useRouter();
    const { id } = router.query;

    console.log(id);
    return (
        <Flex flex={1} justify="center" h="100%" w="100%" position="relative">
            {/* <Cards title="Data xxx" h="100%" w="100%"> */}
            <Charts.Pie data={dataPie} />
            {/* </Cards> */}
            <Box position="fixed" right={5} top={5}>
                <Menus />
            </Box>
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
