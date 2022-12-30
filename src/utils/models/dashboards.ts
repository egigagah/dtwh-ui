import { useQuery } from "@tanstack/react-query";
import { MultiValue } from "react-select";
import { GetDashboardsQuery } from "src/gql/graphql";
import { dashboardQuery, filtersQuery, lineStatusCsvQuery } from "src/query";
import useGraphql from "../graphql";
import { FilterDatasType, FilterValueType } from "../types";

export const cacheName = "dashboards";
export const cacheNameFilters = "filters-dashboards";

export async function getDatas(params: FilterDatasType) {
    const { tahun, status } = params;
    return await useGraphql.request<GetDashboardsQuery>(dashboardQuery, {
        tahun: tahun?.flatMap((x) => x.value) || [-1],
        status: status?.value || "ALL",
    });
}

export function useDashboard(params: FilterDatasType) {
    return useQuery([cacheName, params], async () => await getDatas(params), {
        staleTime: 12 * 60 * 60 * 1000,
        cacheTime: 12 * 60 * 60 * 1000,
    });
}

export async function getFilterDatas() {
    return await useGraphql.request(filtersQuery);
}

export function useFilterDashboard() {
    // const cacheQuery = useQueryClient();
    // const query = cacheQuery.getQueriesData([cacheNameFilters])[0];
    return useQuery([cacheNameFilters], getFilterDatas, {
        staleTime: 12 * 60 * 60 * 1000,
        cacheTime: 12 * 60 * 60 * 1000,
    });
}

export async function getLineStatusCsv(tahun?: MultiValue<FilterValueType>) {
    return await useGraphql.request(lineStatusCsvQuery, {
        tahun: tahun?.flatMap((x) => x.value) || [-1],
    });
}

export function useLineStatusCsv(tahun?: MultiValue<FilterValueType>) {
    return useQuery(
        ["lineStatusCsv", tahun],
        async () => await getLineStatusCsv(tahun),
        {
            staleTime: 12 * 60 * 60 * 1000,
            cacheTime: 12 * 60 * 60 * 1000,
        },
    );
}
