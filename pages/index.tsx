import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Flex,
    Heading,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    SimpleGrid,
    Stack,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    GetStaticProps,
} from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import Pie from "@components/charts/Pie";
import { Cards, ChartMenus } from "@components/cards";
import Charts from "@components/charts";
import { dataBar, dataPie } from "src/utils/datas/charts";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";
import { MenusWrapper } from "@components/cards/Menus";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import useGraphql from "src/utils/graphql";
import request, { gql } from "graphql-request";
import { dashboardQuery } from "src/models";
import { generateDataPie } from "src/utils/chart/helper";
import Test from "@components/Test";
import {
    dehydrate,
    QueryCache,
    QueryClient,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

const cacheName = "dashboards";

function Home() {
    const [isLoadingData, setLoadingData] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null as any);
    function generatePdf() {
        const target = document.querySelector("#report");
        if (!target) return;
        const report = new jsPDF({
            orientation: "landscape",
            unit: "px",
        });
        console.log(target);
        report
            .html(target as HTMLElement)
            .then(() => report.save("Dashboard.pdf"));
    }

    const { data, isLoading, error } = useDashboard();

    useEffect(() => {
        if (isLoading !== isLoadingData) setLoadingData(isLoading);
    }, [isLoading]);

    return (
        <Flex direction="column" minH="100vh" px={[2, 8, 16]}>
            <HStack justifyContent="space-between">
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
                        Warehouse PTSP, yang merupakan kumpulan dari data
                        Sosial, Pelayanan, Jakevo. <br />
                    </Text>
                </Stack>
                {/* <HStack>
                    <Tooltip label="Export All to PDF">
                        <IconButton
                            aria-label="Print"
                            icon={<FaFilePdf color="gray" size={20} />}
                            variant="ghost"
                            onClick={generatePdf}
                        />
                    </Tooltip>
                    <Tooltip label="Export All to CSV">
                        <Box>
                            <IconButton
                                aria-label="csv"
                                as={CSVLink}
                                data={}
                                variant="ghost"
                                filename="export-dashboard.csv"
                            >
                                <FaFileCsv color="gray" size={20} />
                            </IconButton>
                        </Box>
                    </Tooltip>
                </HStack> */}
            </HStack>
            <SimpleGrid
                id="report"
                ref={reportRef}
                columns={[1, 2, 2, 2]}
                spacing={8}
                pb={[8, 16]}
            >
                <Cards title="Data xxx" dataCollection={dataPie}>
                    <Charts.Pie
                        data={data?.getDashboards?.pieStatusAggregate}
                        isLoading={isLoadingData}
                        total={
                            data?.getDashboards?.totalIzinAggregate?.value || 0
                        }
                    />
                </Cards>
                <Cards title="Data xxx" dataCollection={dataBar}>
                    {data && (
                        <Charts.Bar
                            data={data?.getDashboards?.barTableAggregate}
                            dataIndexBy="label"
                            dataKey={["selesai", "ditolak"]}
                            isLoading={isLoadingData}
                        />
                    )}
                </Cards>
                <Cards title="Data xxx" dataCollection={dataPie}>
                    <Pie data={dataPie} isLoading={isLoadingData} total={200} />
                </Cards>
                <Cards title="Data xxx" dataCollection={dataPie}>
                    <Pie data={dataPie} isLoading={isLoadingData} total={200} />
                </Cards>
            </SimpleGrid>
        </Flex>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const queryClient = new QueryClient();
    async function getData() {
        return await useGraphql.request(dashboardQuery());
    }
    await queryClient.prefetchQuery([cacheName], getData, {
        cacheTime: 12 * 60 * 60 * 1000,
        staleTime: 12 * 60 * 60 * 1000,
    });

    return {
        props: {
            ...(await getServerSideTranslations(locale as string, ["common"])),
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 2 * 60 * 60,
    };
};

export default Home;

async function getDatas() {
    console.log("----called get data");
    return await useGraphql.request(dashboardQuery());
}

function useDashboard() {
    const cacheQuery = useQueryClient();
    const query = cacheQuery.getQueriesData([cacheName])[0];
    console.log(query, "---- cache");
    // if (!query) {
    // }
    // return query[1];
    return useQuery([cacheName], getDatas, {
        staleTime: 12 * 60 * 60 * 1000,
        cacheTime: 12 * 60 * 60 * 1000,
    });
}
