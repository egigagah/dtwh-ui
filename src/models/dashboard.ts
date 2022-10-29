import { gql } from "graphql-request";

export const dashboardQuery = (
    tahun: number[] = [-1],
    status: "SELESAI" | "DITOLAK" | "ALL" = "ALL",
) => {
    console.log(tahun, status, "-----tahun");
    return gql`
        {
            getDashboards(tahun: [${tahun}], status: "${status}") {
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
