import {
    Box,
    Button,
    Code,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    UseDisclosureProps,
} from "@chakra-ui/react";

export default function PopupDetail({
    disclosure,
    data,
}: {
    disclosure: UseDisclosureProps;
    data: any;
}) {
    const { isOpen, onOpen, onClose } = disclosure;
    console.log(data);
    return (
        <>
            {isOpen && onOpen && onClose && (
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    size={["full", "xl", "3xl", "4xl"]}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Data Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack>
                                <HStack>
                                    <Text>{data?.alamat_izin}</Text>
                                </HStack>
                                <HStack w="full" overflow="scroll">
                                    <Code w="full" colorScheme="blackAlpha">
                                        <pre>
                                            {JSON.stringify(
                                                data?.data_teknis,
                                                null,
                                                4,
                                            )}
                                        </pre>
                                    </Code>
                                </HStack>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="ghost">Secondary Action</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}
