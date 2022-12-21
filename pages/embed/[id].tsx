import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import { dataPie } from "src/utils/datas/charts";
import { Box, Flex } from "@chakra-ui/react";
import { CustomAppElement } from "src/utils/types";
import Charts from "@components/charts";
import ChartMenus from "@components/cards/Menus";

const EmbedApp: CustomAppElement = () => {
    // const router = useRouter();
    // const { id } = router.query;

    return (
        <Flex flex={1} justify="center" h="100%" w="100%" position="relative">
            <Charts.Pie data={dataPie} total={100} />
            <Box position="fixed" right={5} top={5}>
                <ChartMenus />
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
