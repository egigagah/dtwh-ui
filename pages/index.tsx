import React, { useEffect, useState } from "react";
import {
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    Stack,
    Tag,
    Text,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import { Cards } from "@components/cards";
import Charts from "@components/charts";
import { dataBar, dataPie } from "src/utils/datas/charts";
import useGraphql from "src/utils/graphql";
import { dashboardQuery } from "src/models";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { FilterDatasType } from "src/utils/types";
import { useDashboard, cacheName } from "src/utils/query/dashboards";
import { FilterDashboards } from "@components/filters";
import moment from "moment";

function Home() {
    const [isLoadingData, setLoadingData] = useState(false);
    const [datas, setDatas] = useState<FilterDatasType>({
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
    });

    const { data, isLoading, refetch, isRefetching } = useDashboard(datas);

    useEffect(() => {
        setLoadingData(isLoading && !isRefetching);
    }, [isLoading, isRefetching]);

    useEffect(() => {
        console.log(datas, "--datas form change");
    }, [datas]);

    return (
        <Flex direction="column" minH="100vh" px={[2, 8, 16]}>
            <HStack justifyContent="space-between">
                <Stack
                    as={Flex}
                    spacing={4}
                    w="full"
                    py={8}
                    flexDirection="column"
                >
                    <Heading fontSize={["xl", "2xl", "3xl"]}>
                        Dashboard Perizinan
                    </Heading>
                    <Stack direction={["column", "row"]} spacing={4}>
                        <HStack>
                            <Text
                                fontSize={["md", "lg", "xl"]}
                                fontWeight={400}
                                mb={0}
                            >
                                Tahun:
                            </Text>
                            {datas.tahun?.map((d, i) => (
                                <Tag colorScheme="telegram" key={i}>
                                    {d.label}
                                </Tag>
                            ))}
                        </HStack>
                        <HStack>
                            <Text
                                fontSize={["md", "lg", "xl"]}
                                fontWeight={400}
                                mb={0}
                            >
                                Status:
                            </Text>
                            <Tag colorScheme="telegram">
                                {datas?.status?.label}
                            </Tag>
                        </HStack>
                    </Stack>
                    <Flex
                        w={["full", "full", "full", "75%", "50%"]}
                        direction="row"
                    >
                        <Text fontSize="sm" color="gray.500">
                            *Data ini diupdate pada tanggal{" "}
                            {moment().format("DD MMMM YYYY")} dan jam 07.00 WIB{" "}
                            <br />
                        </Text>
                    </Flex>
                </Stack>
                <HStack>
                    <FilterDashboards
                        datas={datas}
                        setDatas={setDatas}
                        onSubmit={refetch}
                    />
                </HStack>
            </HStack>
            <SimpleGrid
                id="report"
                // ref={reportRef}
                columns={[1, 2, 2, 2]}
                spacing={8}
                pb={[8, 16]}
            >
                <Cards
                    title="Permohonan Berdasarkan Status"
                    dataCollection={dataPie}
                    bodyH="full"
                >
                    <Charts.TableBidang
                        data={data?.getDashboards?.bidangSumAggregate}
                        isLoading={isLoadingData}
                    />
                </Cards>
                <Cards
                    title="Permohonan Berdasarkan Status"
                    dataCollection={dataPie}
                >
                    <Stack w="full" h="full" flex={1} pt={4}>
                        <Flex direction="row" w="full" justifyContent="center">
                            <Text mb={0} fontSize="lg" fontWeight={500}>
                                Total Izin{" "}
                                <span>
                                    {
                                        data?.getDashboards?.totalIzinAggregate
                                            ?.value
                                    }
                                </span>
                            </Text>
                        </Flex>
                        <Stack flex={1} w="full" h="full">
                            <Charts.Pie
                                data={data?.getDashboards?.pieStatusAggregate}
                                isLoading={isLoadingData}
                                total={
                                    data?.getDashboards?.totalIzinAggregate
                                        ?.value || 0
                                }
                                h="full"
                            />
                        </Stack>
                    </Stack>
                </Cards>
                <Cards
                    title="Permohonan Berdasarkan Perizinan"
                    dataCollection={dataBar}
                >
                    {data && (
                        <Charts.Bar
                            data={data?.getDashboards?.barTableAggregate}
                            dataIndexBy="label"
                            dataKey={["selesai", "ditolak"]}
                            isLoading={isLoadingData}
                        />
                    )}
                </Cards>
                <Cards title="Permohonan Perbulan" dataCollection={dataPie}>
                    <Charts.Line
                        data={data?.getDashboards?.lineStatusAggregate}
                        isLoading={isLoadingData}
                    />
                </Cards>
            </SimpleGrid>
        </Flex>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const queryClient = new QueryClient();
    async function getData() {
        return await useGraphql.request(dashboardQuery({}));
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
