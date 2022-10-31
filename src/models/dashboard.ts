import { gql } from "graphql-request";
import { FilterDatasType } from "src/utils/types";

export const filtersQuery = () => {
    return gql`
        {
            getFiltersDashboard {
                tahun {
                    label: tahun
                    value: tahun
                }
                status {
                    label: status
                    value: status
                }
            }
        }
    `;
};

export const dashboardQuery = ({
    tahun,
    status,
}: FilterDatasType | undefined) => {
    const tahuns = tahun ? tahun?.flatMap((x) => x.value) : [-1];
    return gql`
        {
            getDashboards(tahun: [${tahuns}], status: "${
        status?.value || "ALL"
    }") {
                tahun
                status
                pieStatusAggregate{
                    label: _id
                    value
                }
                totalIzinAggregate{
                label: _id
                value
                }
                bidangSumAggregate{
                label: _id
                value
                }
                barTableAggregate{
                label: _id
                selesai
                ditolak
                }
                lineStatusAggregate{
                id: _id
                data{
                    x
                    y
                }
                }
            }
        }
    `;
};
