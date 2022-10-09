import React from "react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import Pie from "@components/charts/Pie";
import { dataPie, dataBar } from "src/utils/datas/charts";
import { Cards } from "@components/cards";
import Bar from "@components/charts/Bar";

const Home: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh">
            <SimpleGrid
                columns={[1, 2, 2, 3]}
                spacing={8}
                px={[0, 4, 8]}
                py={[8, 16]}
            >
                <Cards title="Data xxx">
                    <Pie data={dataPie} />
                </Cards>
                <Cards title="Data xxx">
                    <Bar data={dataBar} />
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
