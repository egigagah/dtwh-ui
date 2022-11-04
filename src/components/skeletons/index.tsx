import { Skeleton, Td, Tr } from "@chakra-ui/react";

type SkeletonTableProps = {
    column: number;
    row: number;
};

function Table({ column, row }: SkeletonTableProps) {
    return (
        <>
            {Array.from({ length: row }, (v, i) => i).map((d) => (
                <Tr key={d}>
                    {Array.from({ length: column }, (v, i) => i).map((c) => (
                        <Td key={c}>
                            <Skeleton w="full" h="2rem" />
                        </Td>
                    ))}
                </Tr>
            ))}
        </>
    );
}

const Skeletons = {
    Table,
};

export default Skeletons;
