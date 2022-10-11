import React from "react";
import {
    Divider,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import Pie from "@components/charts/Pie";
import { Cards } from "@components/cards";
import Charts from "@components/charts";
import { dataBar, dataPie } from "src/utils/datas/charts";

const Home: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh" px={[2, 8, 16]}>
            <Stack
                as={Flex}
                spacing={4}
                w={["full", "full", "full", "75%", "50%"]}
                py={8}
                flexDirection="column"
            >
                <Heading fontSize={["xl", "2xl", "3xl"]}>
                    Dashboard Perizinan
                </Heading>
                <Text fontSize="sm" color="gray.500">
                    Data ini bersifat open data, dan bersumber dari Data
                    Warehouse PTSP, yang merupakan kumpulan dari data Sosial,
                    Pelayanan, Jakevo. <br />
                </Text>
            </Stack>
            <SimpleGrid columns={[1, 2, 2, 2, 3]} spacing={8} pb={[8, 16]}>
                <Cards title="Data xxx">
                    <Charts.Pie data={dataPie} />
                </Cards>
                <Cards title="Data xxx">
                    <Charts.Bar data={dataBar} />
                </Cards>
                <Cards title="Data xxx">
                    <Pie data={dataPie} />
                </Cards>
                <Cards title="Data xxx">
                    <Pie data={dataPie} />
                </Cards>
            </SimpleGrid>
        </Flex>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await getServerSideTranslations(locale as string, ["common"])),
            data: [],
        },
    };
};

export default Home;
