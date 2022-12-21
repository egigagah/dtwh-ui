import {
    Box,
    Flex,
    HStack,
    IconButton,
    Stack,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { flexRender, Table } from "@tanstack/react-table";
import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import Filter from "./Filter";

export default function Head({
    table,
    isLoading,
}: {
    table: Table<any>;
    isLoading: boolean;
}) {
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    return (
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
                                    w={header.getSize() || "min-content"}
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
                                                <Text fontSize="lg" mb="0">
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                                {{
                                                    asc: (
                                                        <AiFillCaretUp
                                                            size={15}
                                                        />
                                                    ),
                                                    desc: (
                                                        <AiFillCaretDown
                                                            size={15}
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
                                                !header.column.getCanFilter() ||
                                                isLoading
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
    );
}
