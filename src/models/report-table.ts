import { gql } from "graphql-request";

export const ReportTableQuery = gql`
    query reportDataTable(
        $page: Int!
        $limit: Int!
        $nama_perusahaan: String
        $bidang: String
        $kategori: String
        $level_wilayah: String
        $nama_izin: String
        $nama_pemohon: String
        $nama_usaha: String
        $no_identitas_pemohon: String
        $nomor_permohonan: String
        $nomor_sk: String
        $npwp_perusahaan: String
        $service_point: String
        $source_db: String
        $status: String
        $tahun: String
        $sortField: String
        $sortType: String
    ) {
        reportDataTable(
            page: $page
            limit: $limit
            nama_perusahaan: $nama_perusahaan
            bidang: $bidang
            kategori: $kategori
            level_wilayah: $level_wilayah
            nama_izin: $nama_izin
            nama_pemohon: $nama_pemohon
            nama_usaha: $nama_usaha
            no_identitas_pemohon: $no_identitas_pemohon
            nomor_permohonan: $nomor_permohonan
            nomor_sk: $nomor_sk
            npwp_perusahaan: $npwp_perusahaan
            service_point: $service_point
            source_db: $source_db
            status: $status
            tahun: $tahun
            sortField: $sortField
            sortType: $sortType
        ) {
            items {
                id
                service_point
                status
                source_db
                level_wilayah
                tahun
                bulan
                bidang
                kategori
                nama_izin
                nomor_permohonan
                tgl_pengajuan
                tipe_pengajuan
                tipe_perizinan
                no_identitas_pemohon
                nama_pemohon
                alamat_pemohon
                npwp_perusahaan
                nama_perusahaan
                alamat_perusahaan
                nama_usaha
                alamat_izin
                koordinat_izin
                kode_wilayah_izin
                zonasi
                tgl_terbit_izin
                nomor_sk
                tgl_akhir_berlaku
                data_teknis
            }
            meta {
                itemCount
                totalItems
                itemsPerPage
                totalPages
                currentPage
            }
            links {
                first {
                    page
                    limit
                }
                prev {
                    page
                    limit
                }
                next {
                    page
                    limit
                }
                last {
                    page
                    limit
                }
            }
        }
    }
`;
