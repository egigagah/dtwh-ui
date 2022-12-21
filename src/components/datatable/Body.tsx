import { Box, Center, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import Skeletons from "@components/skeletons";
import { flexRender, Table } from "@tanstack/react-table";

export default function Body({
    table,
    isLoading,
    rowsLength = 10,
    isEmpty,
}: {
    table: Table<any>;
    isLoading: boolean;
    rowsLength: number;
    isEmpty: boolean;
}) {
    console.log(
        isLoading,
        table.getRowModel().rows.length,
        table.getAllColumns().length,
        "body table",
    );
    return (
        <Tbody>
            {isLoading && (
                <Skeletons.Table
                    row={rowsLength}
                    column={table.getAllColumns().length}
                />
            )}
            {!isLoading &&
                !isEmpty &&
                table.getRowModel().rows.map((row) => {
                    return (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <Td
                                        key={cell.id}
                                        borderRight="1px solid #edf2f7"
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
                                                cell.column.columnDef.cell,
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
    );
}
