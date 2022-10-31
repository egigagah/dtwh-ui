import { useQuery } from "@tanstack/react-query";
import { dashboardQuery, filtersQuery } from "src/models";
import useGraphql from "../graphql";
import { FilterDatasType } from "../types";

export const cacheName = "dashboards";
export const cacheNameFilters = "filters-dashboards";

export async function getDatas({ tahun, status }: FilterDatasType) {
    console.log("----called get data", tahun, status);
    return await useGraphql.request(dashboardQuery({ tahun, status }));
}

export function useDashboard({ tahun, status }: FilterDatasType) {
    return useQuery(
        [cacheName],
        async () => await getDatas({ tahun, status }),
        {
            staleTime: 12 * 60 * 60 * 1000,
            cacheTime: 12 * 60 * 60 * 1000,
        },
    );
}

export async function getFilterDatas() {
    console.log("----called getFilterDatas");
    return await useGraphql.request(filtersQuery());
}

export function useFilterDashboard() {
    // const cacheQuery = useQueryClient();
    // const query = cacheQuery.getQueriesData([cacheNameFilters])[0];
    return useQuery([cacheNameFilters], getFilterDatas, {
        staleTime: 12 * 60 * 60 * 1000,
        cacheTime: 12 * 60 * 60 * 1000,
    });
}
