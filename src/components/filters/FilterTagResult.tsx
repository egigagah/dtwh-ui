import { Flex, HStack, Tag, Text } from "@chakra-ui/react";

export default function FilterTagResult({
    label,
    value,
}: {
    label: string;
    value: string | number | any[];
}) {
    return (
        <HStack>
            <Text
                minW="max-content"
                fontSize={["sm", "md", "lg", "xl"]}
                fontWeight={400}
                mb={0}
            >
                {label}:
            </Text>
            {!Array.isArray(value) && (
                <Tag colorScheme="telegram">
                    {value.toString().toUpperCase()}
                </Tag>
            )}
            {Array.isArray(value) && (
                <Flex direction="row" wrap="wrap" flexWrap="wrap" gap={2}>
                    {value.map((item, idx) => (
                        <Tag
                            textAlign="center"
                            key={`${label}-${idx}`}
                            colorScheme="telegram"
                        >
                            {item?.label?.toString().toUpperCase() || "ALL"}
                        </Tag>
                    ))}
                </Flex>
            )}
        </HStack>
    );
}
