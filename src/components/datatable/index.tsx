import {
    Box,
    Center,
    Flex,
    Table,
    TableCaption,
    TableContainer,
    Text,
    Tfoot,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
    ColumnDef,
    getCoreRowModel,
    SortingState,
    useReactTable,
    PaginationState,
    ColumnFiltersState,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import { ReportFilterArgs, useReportTable } from "src/utils/query/report-table";
import { UseQueryResult } from "@tanstack/react-query";
import Body from "./Body";
import Head from "./Head";

export type DataTableProps = {
    queryFn: (d: any) => UseQueryResult<any, any>;
    columns: ColumnDef<any, any>[];
    searchParams: {
        [Key: string]: any;
    };
};

export default function DataTable({
    queryFn,
    columns,
    searchParams,
}: DataTableProps) {
    // const rerender = useReducer(() => ({}), {})[1];
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const params = useMemo<ReportFilterArgs>(() => {
        const paramsKey = Object.keys(searchParams);
        paramsKey.map((item) => {
            searchParams[item] =
                columnFilters.find((d) => d.id === item)?.value ?? "";
        });
        const sortParams = sorting.map((item) => {
            const obj = {
                sortField: item.id,
                sortType: item.desc ? "DESC" : "ASC",
            };
            return obj;
        });

        return {
            limit: pagination.pageSize,
            page: pagination.pageIndex + 1,
            ...searchParams,
            ...sortParams[0],
        };
    }, [sorting, pagination, columnFilters]);

    // const [dataTable, setData] = useState(() => []);
    const { data, isLoading, isError } = useReportTable(params);

    useEffect(() => {
        console.log(isLoading, "isLoading");
    }, [isLoading]);

    const table = useReactTable({
        data: data?.items || [],
        columns,
        pageCount: data?.meta?.totalPages,
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            pagination,
            columnFilters,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        debugTable: true,
    });

    return (
        <Flex
            direction="column"
            flex={1}
            w="full"
            gap={8}
            pb={8}
            bg="white"
            rounded="xl"
            shadow="sm"
        >
            {data && !isError && (
                <>
                    <TableContainer w="full">
                        <Table variant="simple" width="full">
                            <Head table={table} isLoading={isLoading} />
                            <Body
                                table={table}
                                isLoading={isLoading}
                                rowsLength={pagination.pageSize}
                                isEmpty={data?.items.length < 1}
                            />
                        </Table>
                    </TableContainer>
                    {data?.items.length < 1 && (
                        <Box px={8}>
                            <Flex
                                h="40"
                                bg="gray.50"
                                justifyContent="center"
                                alignItems="center"
                                rounded="lg"
                            >
                                <Text textAlign="center">Data is Empty</Text>
                            </Flex>
                        </Box>
                    )}
                    <Pagination table={table} />
                </>
            )}
            {isError && (
                <Center pt={8}>
                    There is something wrong. failed to get Data
                </Center>
            )}
        </Flex>
    );
}
