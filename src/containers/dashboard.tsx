import React, {
    Dispatch,
    LegacyRef,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    Box,
    Flex,
    FlexProps,
    Heading,
    HStack,
    Stack,
    Tag,
    Text,
} from "@chakra-ui/react";
import { Cards } from "@components/cards";
import { FilterDatasType } from "src/utils/types";
import { useDashboard } from "src/utils/models/dashboards";
import moment from "moment";
import { Serie } from "@nivo/line";
import { FilterDashboards } from "@components/filters";
import Charts from "@components/charts";
import Disclaimer from "@components/disclaimer";

interface DashBoardContainersProps extends FlexProps {
    defaultData: any;
}

export default function DashBoardContainers({
    defaultData,
    ...rest
}: DashBoardContainersProps): JSX.Element {
    const [isSticky, setIsSticky] = useState(false);
    const [datas, setDatas] = useState<FilterDatasType>(defaultData);
    const { data, isLoading, refetch, isRefetching } = useDashboard(datas);

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

    useEffect(() => {
        console.log(isSticky);
    }, [isSticky]);

    return (
        <>
            <HeaderSection
                datas={datas}
                setDatas={setDatas}
                refetch={refetch}
                total={
                    (data?.getDashboards?.totalIzinAggregate
                        ?.value as number) || 0
                }
            />
            <Flex
                direction="column"
                {...rest}
                minH={rest.minH || "100vh"}
                px={rest.px || [0, 8, 16, 32]}
                position="relative"
            >
                <Flex id="report" direction="column" gap={8} pb={[8, 16]}>
                    <Cards
                        title="Permohonan Berdasarkan Bidang"
                        subTitle="Data permohonan berdasarkan bidang izin"
                        dataCollection={data?.getDashboards?.bidangSumAggregate}
                        bodyH="full"
                        fileName={`Permohonan Berdasarkan Perizinan ( ${slugFileName})`}
                    >
                        <Charts.TableBidang
                            data={
                                data?.getDashboards?.bidangSumAggregate as any[]
                            }
                            isLoading={isLoading || isRefetching}
                        />
                    </Cards>
                    <Cards
                        title="Permohonan Berdasarkan Perizinan"
                        subTitle="Data permohonan berdasarkan izin"
                        dataCollection={data?.getDashboards?.barTableAggregate}
                        fileName={`Permohonan Berdasarkan Perizinan ( ${slugFileName})`}
                    >
                        {data && (
                            <Charts.Bar
                                data={data?.getDashboards?.barTableAggregate}
                                dataIndexBy="label"
                                dataKey={["selesai", "ditolak"]}
                                isLoading={isLoading || isRefetching}
                            />
                        )}
                    </Cards>
                    <Cards
                        title="Permohonan Berdasarkan Status"
                        subTitle="Data permohonan berdasarkan status"
                        dataCollection={data?.getDashboards?.pieStatusAggregate}
                        fileName={`Permohonan Berdasarkan Status ( ${slugFileName})`}
                    >
                        <Stack w="full" h="full" flex={1} pt={4}>
                            {!(isLoading || isRefetching) && (
                                <Flex
                                    direction="row"
                                    w="full"
                                    justifyContent="center"
                                >
                                    <Text mb={0} fontSize="lg" fontWeight={500}>
                                        Total Izin{" "}
                                        <span>
                                            {
                                                data?.getDashboards
                                                    ?.totalIzinAggregate?.value
                                            }
                                        </span>
                                    </Text>
                                </Flex>
                            )}
                            <Stack flex={1} w="full" h="full">
                                <Charts.Pie
                                    data={
                                        data?.getDashboards?.pieStatusAggregate
                                    }
                                    isLoading={isLoading || isRefetching}
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
                        subTitle="Data permohonan berdasarkan jumlah rata-rata perbulan dari setiap tahun"
                        dataCollection={
                            data?.getDashboards?.lineStatusCsv as any[]
                        }
                        fileName={`Permohonan Berdasarkan Bulan ( ${slugFileName})`}
                    >
                        <Charts.Line
                            data={
                                data?.getDashboards
                                    ?.lineStatusAggregate as Serie[]
                            }
                            isLoading={isLoading || isRefetching}
                        />
                    </Cards>
                </Flex>
            </Flex>
        </>
    );
}

function HeaderSection({
    datas,
    setDatas,
    refetch,
    total,
}: {
    datas: FilterDatasType;
    setDatas: (d: any) => void;
    refetch: (d?: any) => Promise<any>;
    total: number;
}) {
    function submitFilter(d: FilterDatasType) {
        console.warn(d, "refetch run", "---");
        setDatas(d);
        refetch();
    }

    return (
        <Flex
            direction={["column", "row"]}
            px={[10, 12, 16, 32]}
            py={4}
            justifyContent="space-between"
            position="sticky"
            top={-12}
            zIndex="5"
            bg="white"
            borderBottom="1px solid #F0F0F0"
            gap={[4, 0]}
        >
            <Stack as={Flex} spacing={[2, 4]} w="full" flexDirection="column">
                <Heading fontSize={["xl", "2xl", "3xl"]}>
                    Dashboard Perizinan
                </Heading>
                <Stack
                    direction={["column", "row"]}
                    spacing={[2, 4]}
                    pt={[2, 0]}
                >
                    <HStack>
                        <Text
                            fontSize={["sm", "md", "lg", "xl"]}
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
                            fontSize={["sm", "md", "lg", "xl"]}
                            fontWeight={400}
                            mb={0}
                        >
                            Status:
                        </Text>
                        <Tag colorScheme="telegram">{datas?.status?.label}</Tag>
                    </HStack>
                    <HStack>
                        <Text
                            fontSize={["sm", "md", "lg", "xl"]}
                            fontWeight={400}
                            mb={0}
                        >
                            Total Permohonan:
                        </Text>
                        <Text
                            fontSize={["sm", "md", "lg", "xl"]}
                            fontWeight="bold"
                            mb={0}
                        >
                            {total}
                        </Text>
                    </HStack>
                </Stack>
                <Flex
                    w={["full", "full", "full", "75%", "50%"]}
                    direction="row"
                >
                    <Disclaimer.Dashboard />
                </Flex>
            </Stack>
            <Flex justifyContent="flex-end" alignItems="center">
                <Box mt={[0, 4]}>
                    <FilterDashboards
                        datas={datas}
                        onSubmit={(d: FilterDatasType) => submitFilter(d)}
                    />
                </Box>
            </Flex>
        </Flex>
    );
}
