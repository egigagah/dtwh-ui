import {
    Button,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { Column, Table } from "@tanstack/react-table";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Filter({
    column,
    table,
}: {
    column: Column<any, any>;
    table: Table<any>;
}) {
    const [state, setState] = useState("");
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    const columnFilterValue = column.getFilterValue();

    return typeof firstValue === "number" ? (
        <div className="flex space-x-2">
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[0] ?? ""}
                onChange={(e) =>
                    column.setFilterValue((old: [number, number]) => [
                        e.target.value,
                        old?.[1],
                    ])
                }
                placeholder={`Min`}
                className="w-24 border shadow rounded"
            />
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[1] ?? ""}
                onChange={(e) =>
                    column.setFilterValue((old: [number, number]) => [
                        old?.[0],
                        e.target.value,
                    ])
                }
                placeholder={`Max`}
                className="w-24 border shadow rounded"
            />
        </div>
    ) : (
        <InputGroup size="md">
            <Input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        column.setFilterValue(state);
                    }
                }}
                onBlur={() => column.setFilterValue(state)}
                placeholder={`Search...`}
                className="w-36 border shadow rounded"
            />
            {state && (
                <InputRightElement>
                    <IconButton
                        aria-label="clear"
                        onClick={() => {
                            setState("");
                            column.setFilterValue("");
                        }}
                        icon={<AiFillCloseCircle size={20} />}
                        variant="link"
                    />
                </InputRightElement>
            )}
        </InputGroup>
    );
}
