import { Box, BoxProps, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer({ ...props }: BoxProps): JSX.Element {
    return (
        <Box {...props} p={[8, 12]} bg="blackAlpha.800" color="white">
            <Stack
                direction={["column", "row"]}
                spacing={[2, 4]}
                textAlign={["center", "start"]}
                alignItems="center"
            >
                <Text m={0} fontSize={["lg, xl"]}>
                    PTSP DKI JAKARTA &copy; 2022
                </Text>
                <Text
                    as={Link}
                    href="https://pelayanan.jakarta.go.id/"
                    fontSize={["lg, xl"]}
                >
                    Pelayanan
                </Text>
                <Text
                    as={Link}
                    href="https://jakevo.jakarta.go.id/"
                    fontSize={["lg, xl"]}
                >
                    Jakevo
                </Text>
                <Text
                    as={Link}
                    href="https://pengawasan.jakarta.go.id/"
                    fontSize={["lg, xl"]}
                >
                    Pengawasan
                </Text>
            </Stack>
        </Box>
    );
}
