import {
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import Skeletons from "@components/skeletons";
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
                <Thead bg="gray.100" position="sticky" top={0} zIndex="2">
                    <Tr>
                        <Th fontSize="sm" w="80%">
                            Bidang
                        </Th>
                        <Th fontSize="sm" w="20%" textAlign="center">
                            Total
                        </Th>
                    </Tr>
                </Thead>
                <Tbody overflowY="scroll">
                    {!isLoading &&
                        data &&
                        data.length > 0 &&
                        data.map((d, i) => (
                            <Tr key={i}>
                                <Td>{d.label}</Td>
                                <Td textAlign="center">{d.value}</Td>
                            </Tr>
                        ))}
                    {isLoading && <Skeletons.Table column={2} row={5} />}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

const TableBidang = memo(App, (p, n) => p.data === n.data);

export default TableBidang;
