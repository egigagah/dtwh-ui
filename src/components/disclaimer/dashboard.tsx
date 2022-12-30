import { Text } from "@chakra-ui/react";
import moment from "moment";

export default function Dashboard() {
    return (
        <Text fontSize={["xs", "sm"]} color="blackAlpha.500" mb={0}>
            *Data ini diupdate pada tanggal {moment().format("DD MMMM YYYY")}{" "}
            dan jam 07.00 WIB <br />
        </Text>
    );
}
