import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Select,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useEffect, useMemo, useReducer, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp, AiFillFilter } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    PaginationState,
    getFilteredRowModel,
    getPaginationRowModel,
    ColumnFiltersState,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import { ReportFilterArgs, useReportTable } from "src/utils/query/report-table";
import { UseQueryResult } from "@tanstack/react-query";
import Filter from "./Filter";

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
    const rerender = useReducer(() => ({}), {})[1];
    const [searchIsOpen, setSearchIsOpen] = useState(false);
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
        console.log(
            columnFilters,
            sorting,
            sorting[0],
            sortParams[0],
            "columnFilters",
        );
        return {
            limit: pagination.pageSize,
            page: pagination.pageIndex + 1,
            ...searchParams,
            ...sortParams[0],
        };
    }, [sorting, pagination, columnFilters]);

    // const [dataTable, setData] = useState(() => []);
    const { data, isLoading, isError } = queryFn(params);

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
            <TableContainer w="full">
                <Table variant="simple" width="full">
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            borderRight="1px solid #edf2f7"
                                        >
                                            <Stack
                                                gap={2}
                                                py={2}
                                                w={
                                                    header.getSize() ||
                                                    "min-content"
                                                }
                                            >
                                                <HStack justifyContent="space-between">
                                                    {header.isPlaceholder ? null : (
                                                        <Flex
                                                            alignItems="center"
                                                            gap={2}
                                                            _hover={{
                                                                cursor: "pointer",
                                                            }}
                                                            {...{
                                                                className:
                                                                    header.column.getCanSort()
                                                                        ? "cursor-pointer select-none"
                                                                        : "",
                                                                onClick:
                                                                    header.column.getToggleSortingHandler(),
                                                            }}
                                                        >
                                                            <Text
                                                                fontSize="lg"
                                                                mb="0"
                                                            >
                                                                {flexRender(
                                                                    header
                                                                        .column
                                                                        .columnDef
                                                                        .header,
                                                                    header.getContext(),
                                                                )}
                                                            </Text>
                                                            {{
                                                                asc: (
                                                                    <AiFillCaretUp
                                                                        size={
                                                                            15
                                                                        }
                                                                    />
                                                                ),
                                                                desc: (
                                                                    <AiFillCaretDown
                                                                        size={
                                                                            15
                                                                        }
                                                                    />
                                                                ),
                                                            }[
                                                                header.column.getIsSorted() as string
                                                            ] ?? null}
                                                        </Flex>
                                                    )}
                                                    {header.column.getCanFilter() && (
                                                        <IconButton
                                                            aria-label="search"
                                                            icon={<FaFilter />}
                                                            variant="link"
                                                            onClick={() =>
                                                                setSearchIsOpen(
                                                                    !searchIsOpen,
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </HStack>
                                                <Box
                                                    maxW={["full", "80"]}
                                                    hidden={searchIsOpen}
                                                >
                                                    <Filter
                                                        column={header.column}
                                                        table={table}
                                                        isDisabled={
                                                            !header.column.getCanFilter()
                                                        }
                                                    />
                                                </Box>
                                            </Stack>
                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td
                                                key={cell.id}
                                                borderRight="1px solid #edf2f7"
                                                p={2}
                                            >
                                                <Box
                                                    overflowWrap="break-word"
                                                    whiteSpace="normal"
                                                    wordBreak="break-word"
                                                    w={
                                                        cell.column.getSize() ||
                                                        "min-content"
                                                    }
                                                    overflowX="clip"
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
                                                </Box>
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination table={table} />
            {/* // <div>{table.getRowModel().rows.length} Rows</div>
          // <div>
          //     <button onClick={() => rerender()}>Force Rerender</button>
          // </div>
          // <div>
          //     <button onClick={() => refreshData()}>Refresh Data</button>
          // </div>
          // <pre>{JSON.stringify(sorting, null, 2)}</pre> */}
        </Flex>
    );
}
