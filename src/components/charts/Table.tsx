import {
    Flex,
    HStack,
    Skeleton,
    SkeletonProps,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { memo } from "react";

function App({ data, isLoading }: { data: any[]; isLoading: boolean }) {
    return (
        <TableContainer
            w="full"
            h="full"
            bg="white"
            overflowY="scroll"
            pb={2.5}
            position="relative"
        >
            <Table variant="simple" position="relative" overflowY="scroll">
                <Thead bg="gray.100" position="sticky" top={0} zIndex="docked">
                    <Tr>
                        <Th fontSize="sm">Bidang</Th>
                        <Th fontSize="sm">Total</Th>
                    </Tr>
                </Thead>
                <Tbody overflowY="scroll">
                    {!isLoading &&
                        data &&
                        data.map((d, i) => (
                            <Tr key={i}>
                                <Td>{d.label}</Td>
                                <Td>{d.value}</Td>
                            </Tr>
                        ))}
                    {isLoading && (
                        <BarSkeleton
                            isLoaded={isLoading}
                            width="2rem"
                            height="100%"
                        />
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

const TableBidang = memo(App, (p, n) => p.data !== n.data);

export default TableBidang;

function BarSkeleton({ ...res }: SkeletonProps): JSX.Element {
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
            display={res.isLoaded ? "none" : "flex"}
        >
            <Skeleton {...res} />
            <Skeleton {...res} />
            <Skeleton {...res} />
            <Skeleton {...res} />
            <Skeleton {...res} />
            <Skeleton {...res} />
        </HStack>
    );
}
