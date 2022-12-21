import { useQuery } from "@tanstack/react-query";
import { ReportTablePagination } from "src/gql/graphql";
import { ReportTableQuery } from "src/models";
import useGraphql from "../graphql";

export const cacheName = "dashboards";
export type QueryReportTableAll = {
    reportDataTable: ReportTablePagination;
};
export type PaginationsArgs = {
    limit: number;
    page: number;
};
export type ReportSearchDataArgs = {
    service_point?: string;
    status?: string;
    source_db?: string;
    level_wilayah?: string;
    tahun?: string;
    bidang?: string;
    kategori?: string;
    nama_izin?: string;
    nomor_permohonan?: string;
    no_identitas_pemohon?: string;
    nama_pemohon?: string;
    npwp_perusahaan?: string;
    nama_perusahaan?: string;
    nama_usaha?: string;
    nomor_sk?: string;
};
export type ReportFilterArgs = ReportSearchDataArgs & PaginationsArgs;

export async function getReportTableDatas(params: ReportFilterArgs) {
    console.log(params, "--- query");
    const data = await useGraphql.request<QueryReportTableAll>(
        ReportTableQuery,
        { ...params },
    );
    return data.reportDataTable;
}

export function useReportTable(params: ReportFilterArgs) {
    return useQuery(
        [cacheName, JSON.stringify(params)],
        async () => await getReportTableDatas(params),
        {
            keepPreviousData: true,
        },
    );
}
