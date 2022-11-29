import {
    Flex,
    HStack,
    Skeleton,
    SkeletonCircle,
    Stack,
    Td,
    Tr,
} from "@chakra-ui/react";

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

function BarSkeleton({ column }: { column?: number }): JSX.Element {
    return (
        <HStack
            spacing={4}
            p={[4, 8]}
            justifyContent="center"
            alignItems="center"
            as={Flex}
            flex={1}
            w="100%"
            h="100%"
        >
            {column &&
                Array.from({ length: column }, (v, i) => i).map((d) => (
                    <Skeleton key={d} w="full" h="full" />
                ))}
            {!column && <Skeleton w="full" h="full" />}
        </HStack>
    );
}

function PieSkeleton({
    dimension,
}: {
    dimension?: {
        width: number;
        height: number;
    };
}) {
    return (
        <Stack
            spacing={4}
            p={[4, 8]}
            justifyContent="center"
            alignItems="center"
            as={Flex}
            flex={1}
            w="100%"
            h="100%"
        >
            <SkeletonCircle
                w={dynamicSize(80, dimension?.height)}
                h={dynamicSize(80, dimension?.height)}
            />
        </Stack>
    );
}

function dynamicSize(expectSize: number, size?: number) {
    return size ? (size * expectSize) / 100 : "full";
}

const Skeletons = {
    Table,
    BarSkeleton,
    PieSkeleton,
};

export default Skeletons;
