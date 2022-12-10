import { Button, HStack, Select, Text } from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";

export default function Pagination({ table }: { table: Table<any> }) {
    return (
        <HStack alignItems="center" justifyContent="flex-end" gap={8} px={4}>
            <HStack alignItems="center">
                <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Prev
                </Button>
                <HStack alignItems="center">
                    <Text mb={0}>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </strong>
                    </Text>
                    <Text mb={0}>Page</Text>
                </HStack>
                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </HStack>
            <HStack alignItems="center">
                <Text mb={0}>Show</Text>
                <Select
                    variant="unstyled"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 25, 50, 100].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </Select>
            </HStack>
        </HStack>
    );
}
