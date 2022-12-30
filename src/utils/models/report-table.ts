import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { MultiValue, SingleValue } from "react-select";
import { AllFiltersData, ReportTablePagination } from "src/gql/graphql";
import { AllFiltersReportTable, ReportTableQuery } from "src/query";
import useGraphql from "../graphql";
import { FilterDatasType } from "../types";

export const cacheName = "dashboards";
export type QueryReportTableAll = {
    reportDataTable: ReportTablePagination;
};
export type QueryAllFiltersData = {
    getAllFilters: AllFiltersData;
};
export type PaginationsArgs = {
    limit: number;
    page: number;
};
export type SortsArgs = {
    sortType?: string;
    sortField?: string;
};
export type ReportSearchDataArgs = {
    nama_izin?: string;
    nomor_permohonan?: string;
    no_identitas_pemohon?: string;
    nama_pemohon?: string;
    npwp_perusahaan?: string;
    nama_perusahaan?: string;
    nama_usaha?: string;
    nomor_sk?: string;
};
export type ReportFilterArgs = {
    service_point?: [string];
    status?: string;
    source_db?: [string];
    level_wilayah?: [string];
    tahun?: [number];
    bidang?: [string];
    kategori?: [string];
};
export type ReportQueryParamArgs = ReportSearchDataArgs &
    FilterDatasType &
    PaginationsArgs &
    SortsArgs;

function mapReactSelectToQueryParams<T>(
    target?: MultiValue<T | any> | SingleValue<T | any>,
    defaultValue?: any,
) {
    if (Array.isArray(target)) {
        if (target[0]?.label) {
            const res = target.flatMap((x: any) => x.label);
            return res ?? defaultValue;
        }
        return target || defaultValue;
    } else return target?.label || target || defaultValue;
}

export async function getReportTableDatas(params: ReportQueryParamArgs) {
    const {
        bidang,
        kategori,
        level_wilayah,
        status,
        tahun,
        source_db,
        service_point,
        ...restParam
    } = params;
    return await useGraphql
        .request<QueryReportTableAll>(ReportTableQuery, {
            ...restParam,
            bidang: mapReactSelectToQueryParams(bidang, ["ALL"]),
            kategori: mapReactSelectToQueryParams(kategori, ["ALL"]),
            level_wilayah: mapReactSelectToQueryParams(level_wilayah, ["ALL"]),
            status: mapReactSelectToQueryParams(status, "ALL"),
            tahun: mapReactSelectToQueryParams(tahun, [-1]),
            source_db: mapReactSelectToQueryParams(source_db, ["ALL"]),
            service_point: mapReactSelectToQueryParams(service_point, ["ALL"]),
        })
        .then((d) => d.reportDataTable);
}

export function useReportTable(params: ReportQueryParamArgs) {
    return useQuery(
        [cacheName, JSON.stringify(params)],
        async () => await getReportTableDatas(params),
        {
            keepPreviousData: true,
        },
    );
}

async function getFilterDatas() {
    return await useGraphql
        .request(AllFiltersReportTable)
        .then((d) => d?.getAllFilters);
}

export function useFilterReportTable() {
    // const cacheQuery = useQueryClient();
    // const query = cacheQuery.getQueriesData([cacheNameFilters])[0];
    return useQuery(["all-filters-data"], getFilterDatas, {
        staleTime: 12 * 60 * 60 * 1000,
        cacheTime: 12 * 60 * 60 * 1000,
    });
}
