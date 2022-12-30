import React, { useMemo, useState } from "react";
import {
    Badge,
    Divider,
    Flex,
    Heading,
    HStack,
    Stack,
    Text,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { CustomAppElement, FilterDatasType } from "src/utils/types";
import { cacheName, getDatas } from "src/utils/models/dashboards";
import { useSession } from "next-auth/react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportTable } from "src/gql/graphql";
import {
    ReportFilterArgs,
    ReportQueryParamArgs,
    ReportSearchDataArgs,
    SortsArgs,
    useReportTable,
} from "src/utils/models/report-table";
import DataTable from "@components/datatable";
import Disclaimer from "@components/disclaimer";
import { FilterReportTable } from "@components/filters";

const defaultData = {
    status: {
        value: "ALL",
        label: "ALL",
    },
    level_wilayah: [
        {
            value: "ALL",
            label: "ALL",
        },
    ],
    service_point: [
        {
            value: "ALL",
            label: "ALL",
        },
    ],
    // tahun: [
    //     {
    //         value: -1,
    //         label: "ALL",
    //     },
    // ],
    // bidang: [
    //     {
    //         value: -1,
    //         label: "ALL",
    //     },
    // ],
    // kategori: [
    //     {
    //         value: -1,
    //         label: "ALL",
    //     },
    // ],
    // source_db: [
    //     {
    //         value: -1,
    //         label: "ALL",
    //     },
    // ],
};

const searchParams: ReportSearchDataArgs = {
    nama_izin: "",
    nama_pemohon: "",
    nama_perusahaan: "",
    nama_usaha: "",
    no_identitas_pemohon: "",
    nomor_permohonan: "",
    nomor_sk: "",
    npwp_perusahaan: "",
};

const filterParams: ReportFilterArgs = {
    bidang: ["ALL"],
    kategori: ["ALL"],
    level_wilayah: ["ALL"],
    service_point: ["ALL"],
    source_db: ["ALL"],
    status: "All",
    tahun: [-1],
};

const App: CustomAppElement = () => {
    const columns = useMemo<ColumnDef<ReportTable>[]>(
        () => [
            {
                header: "Nama Usaha",
                accessorKey: "nama_usaha",
                size: 96,
            },
            {
                header: "Perusahaan",
                accessorKey: "nama_perusahaan",
                size: 96,
            },
            {
                header: "Npwp",
                accessorKey: "npwp_perusahaan",
            },
            {
                header: "Izin",
                accessorKey: "nama_izin",
                size: 96,
            },
            {
                header: "Tanggal",
                accessorKey: "tgl_terbit_izin",
                enableColumnFilter: false,
            },
            {
                header: "status",
                accessorKey: "status",
                cell: ({ cell }) => {
                    return (
                        <Badge
                            key={cell.id}
                            colorScheme={
                                (cell.getValue() as string) === "selesai"
                                    ? "whatsapp"
                                    : "red"
                            }
                        >
                            {cell.getValue() as string}
                        </Badge>
                    );
                },
            },
            {
                header: "SK",
                accessorKey: "nomor_sk",
                size: 80,
            },
            {
                header: "Tipe Izin",
                accessorKey: "tipe_perizinan",
            },
            {
                header: "Permohonan",
                accessorKey: "tipe_pengajuan",
            },
            {
                header: "Bidang ",
                accessorKey: "bidang",
            },
            {
                header: "Kategori",
                accessorKey: "kategori",
            },
            {
                header: "Level",
                accessorKey: "level_wilayah",
            },
            {
                header: "Service Point",
                accessorKey: "service_point",
                size: 64,
            },
            {
                header: "Source",
                accessorKey: "source_db",
                cell: ({ cell }) => {
                    const colorScheme: Record<string, string> = {
                        jakevo: "orange",
                        pelayanan: "linkedin",
                        oss_jakevo: "purple",
                        sosial: "green",
                    };
                    const data = cell.getValue() as string;
                    return (
                        <Badge
                            key={cell.id}
                            colorScheme={colorScheme[data] || "gray"}
                        >
                            {data}
                        </Badge>
                    );
                },
            },
        ],
        [],
    );
    const [datas, setDatas] = useState<FilterDatasType>(defaultData);

    return (
        <Flex direction="column" h="full" px={[2, 8]}>
            <HStack justifyContent="space-between">
                <Stack
                    as={Flex}
                    spacing={4}
                    w="full"
                    py={8}
                    flexDirection="column"
                >
                    <Heading fontSize={["xl", "2xl", "3xl"]}>
                        Report Perizinan
                    </Heading>
                    <Stack>
                        <Text color="blackAlpha.500" mb={0}>
                            Data perizinan dari seluruh sumber perizinan PTSP
                            DKI JAKARTA
                        </Text>
                        <Disclaimer.Dashboard />
                    </Stack>
                </Stack>
            </HStack>
            <Flex py={8} direction="column" bg="white" position="relative">
                <FilterReportTable
                    datas={datas}
                    onSubmit={(d: FilterDatasType) => {
                        setDatas(d);
                    }}
                />
                <Divider />
                <DataTable
                    columns={columns}
                    queryFn={useReportTable}
                    searchParams={searchParams}
                    filterParams={datas}
                />
            </Flex>
        </Flex>
    );
};

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

App.appProps = {
    Layout: {
        withHeader: true,
        withFooter: false,
        adminLayout: true,
    },
};

export default App;
