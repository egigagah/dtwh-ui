import {
    Box,
    Center,
    Flex,
    Table,
    TableContainer,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
    ColumnDef,
    getCoreRowModel,
    SortingState,
    useReactTable,
    PaginationState,
    ColumnFiltersState,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import {
    ReportQueryParamArgs,
    ReportSearchDataArgs,
    useReportTable,
} from "src/utils/models/report-table";
import { UseQueryResult } from "@tanstack/react-query";
import Body from "./Body";
import Head from "./Head";
import PopupDetail from "./Popup";

export type DataTableProps = {
    queryFn: (d: any) => UseQueryResult<any, any>;
    columns: ColumnDef<any, any>[];
    searchParams?: {
        [Key: string]: any;
    };
    filterParams?: {
        [Key: string]: any;
    };
    size?: "sm" | "md" | "lg";
};

export default function DataTable({
    queryFn,
    columns,
    searchParams,
    filterParams,
    size = "sm",
}: DataTableProps) {
    // const rerender = useReducer(() => ({}), {})[1];
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [selected, setSelected] = useState(undefined);
    const disclosure = useDisclosure();
    const params = useMemo<ReportQueryParamArgs>(() => {
        if (searchParams) {
            const searchKey = Object.keys(
                searchParams as Array<keyof ReportSearchDataArgs>,
            );
            searchKey.map((item) => {
                searchParams[item] =
                    columnFilters.find((d) => d.id === item)?.value ?? "";
            });
        }
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
            ...filterParams,
            ...sortParams[0],
        };
    }, [sorting, pagination, columnFilters, filterParams]);

    // const [dataTable, setData] = useState(() => []);
    const { data, isLoading, isError } = useReportTable(params);

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

    function onSelect(data: any) {
        setSelected(data);
        disclosure.onOpen();
    }

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
                        <Table variant="simple" width="full" size={size}>
                            <Head table={table} isLoading={isLoading} />
                            <Body
                                table={table}
                                isLoading={isLoading}
                                rowsLength={pagination.pageSize}
                                isEmpty={data?.items.length < 1}
                                onSelect={onSelect}
                            />
                        </Table>
                    </TableContainer>
                    {data?.items.length < 1 && (
                        <Box px={8}>
                            <Flex
                                h="40"
                                bg="blackAlpha.50"
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
            <PopupDetail disclosure={disclosure} data={selected} />
            {isError && (
                <Center pt={8}>
                    There is something wrong. failed to get Data
                </Center>
            )}
        </Flex>
    );
}
