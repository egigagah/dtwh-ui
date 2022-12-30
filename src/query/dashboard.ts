import { gql } from "graphql-request";

export const filtersQuery = gql`
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

export const dashboardQuery = gql`
    query getDashboards($tahun: [Int!], $status: String) {
        getDashboards(tahun: $tahun, status: $status) {
            tahun
            status
            pieStatusAggregate {
                label: _id
                value
            }
            totalIzinAggregate {
                value
            }
            bidangSumAggregate {
                label: _id
                value
            }
            barTableAggregate {
                kode: kode
                label: _id
                selesai
                ditolak
            }
            lineStatusAggregate {
                id: _id
                data {
                    x
                    y
                }
            }
            lineStatusCsv {
                bulan
                ditolak
                selesai
            }
        }
    }
`;

export const lineStatusCsvQuery = gql`
    query lineStatusCsvAggregate($tahun: [Int!]) {
        lineStatusCsvAggregate(tahun: $tahun) {
            bulan: _id
            ditolak
            selesai
        }
    }
`;
