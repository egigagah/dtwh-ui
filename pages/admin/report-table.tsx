import React, { useMemo } from "react";
import { Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { CustomAppElement } from "src/utils/types";
import { cacheName, getDatas } from "src/utils/query/dashboards";
import { useSession } from "next-auth/react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportTable } from "src/gql/graphql";
import {
    ReportFilterArgs,
    ReportSearchDataArgs,
    useReportTable,
} from "src/utils/query/report-table";
import DataTable from "@components/datatable";

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
const params: ReportSearchDataArgs = {
    bidang: "",
    kategori: "",
    level_wilayah: "",
    nama_izin: "",
    nama_pemohon: "",
    nama_perusahaan: "",
    nama_usaha: "",
    no_identitas_pemohon: "",
    nomor_permohonan: "",
    nomor_sk: "",
    npwp_perusahaan: "",
    service_point: "",
    source_db: "",
    status: "",
    tahun: "",
};

const App: CustomAppElement = () => {
    const { data: session, status } = useSession();

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
            },
        ],
        [],
    );

    return (
        <Flex direction="column" h="full" px={[2, 8, 16]}>
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
                </Stack>
            </HStack>
            <Flex py={8}>
                <DataTable
                    columns={columns}
                    queryFn={useReportTable}
                    searchParams={params}
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
