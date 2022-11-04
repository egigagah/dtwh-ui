import React, { useMemo, useState } from "react";
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
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { FilterDatasType } from "src/utils/types";
import { useDashboard, cacheName, getDatas } from "src/utils/query/dashboards";
import { FilterDashboards } from "@components/filters";
import moment from "moment";
import { Serie } from "@nivo/line";

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

function Home() {
    const [datas, setDatas] = useState<FilterDatasType>(defaultData);
    const { data, isLoading, refetch, isRefetching } = useDashboard(datas);
    function submitFilter(d: FilterDatasType) {
        setDatas(d);
        refetch();
    }

    function generateFilenameSlug(tahun: number[], status: string) {
        let res = "";
        if (tahun.includes(-1)) res += "tahun: ALL ";
        else res += `tahun: ${tahun.join(", ")} `;
        if (status) res += `status: ${status}`;
        return res;
    }

    const slugFileName = useMemo(
        () =>
            generateFilenameSlug(
                data?.getDashboards?.tahun || [-1],
                data?.getDashboards.status || "ALL",
            ),
        [data, datas],
    );

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
                        onSubmit={(d: FilterDatasType) => submitFilter(d)}
                    />
                </HStack>
            </HStack>
            <SimpleGrid
                id="report"
                columns={[1, 2, 2, 2]}
                spacing={8}
                pb={[8, 16]}
            >
                <Cards
                    title="Permohonan Berdasarkan Bidang"
                    dataCollection={data?.getDashboards?.bidangSumAggregate}
                    bodyH="full"
                    fileName={`Permohonan Berdasarkan Perizinan ( ${slugFileName})`}
                >
                    <Charts.TableBidang
                        data={data?.getDashboards?.bidangSumAggregate as any[]}
                        isLoading={isLoading && isRefetching}
                    />
                </Cards>
                <Cards
                    title="Permohonan Berdasarkan Perizinan"
                    dataCollection={data?.getDashboards?.barTableAggregate}
                    fileName={`Permohonan Berdasarkan Perizinan ( ${slugFileName})`}
                >
                    {data && (
                        <Charts.Bar
                            data={data?.getDashboards?.barTableAggregate}
                            dataIndexBy="label"
                            dataKey={["selesai", "ditolak"]}
                            isLoading={isLoading && isRefetching}
                        />
                    )}
                </Cards>
                <Cards
                    title="Permohonan Berdasarkan Status"
                    dataCollection={data?.getDashboards?.pieStatusAggregate}
                    fileName={`Permohonan Berdasarkan Status ( ${slugFileName})`}
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
                                isLoading={isLoading && isRefetching}
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
                    title="Permohonan Berdasarkan Bulan"
                    dataCollection={data?.getDashboards?.lineStatusCsv as any[]}
                    fileName={`Permohonan Berdasarkan Bulan ( ${slugFileName})`}
                >
                    <Charts.Line
                        data={
                            data?.getDashboards?.lineStatusAggregate as Serie[]
                        }
                        isLoading={isLoading && isRefetching}
                    />
                </Cards>
            </SimpleGrid>
        </Flex>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const queryClient = new QueryClient();
    async function getData() {
        return await getDatas(defaultData);
    }
    await queryClient.prefetchQuery([cacheName, defaultData], getData, {
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
