import React, { useState } from "react";
import {
    Box,
    Heading,
    BoxProps,
    Flex,
    Divider,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Code,
} from "@chakra-ui/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ChartMenus from "./Menus";

interface CardsProps extends BoxProps {
    title: string;
    fileName?: string;
    dataCollection?: any[];
    bodyH?: number | string;
}

export const Cards = ({
    title,
    children,
    dataCollection,
    fileName,
    bodyH,
    ...res
}: CardsProps): JSX.Element => {
    const [modalEmbedShow, setModalEmbedShow] = useState(false);
    const isFullScreen = useFullScreenHandle();

    return (
        <Box
            {...res}
            data-testid="card-container"
            shadow={res?.shadow || "xl"}
            h={res.h || res?.height || "28rem"}
            borderRadius={res.borderRadius || "lg"}
            overflow={res?.overflow || "clip"}
            borderWidth={res?.borderWidth || "1px"}
            borderStyle={res?.borderStyle || "solid"}
            borderColor={res?.borderColor || "gray.200"}
            bg="white"
        >
            <HStack
                justifyContent="space-between"
                py={3}
                pl={4}
                pr={2}
                bg="white"
            >
                <Heading fontSize={["md", "lg"]} fontWeight="500">
                    {title}
                </Heading>
                <ChartMenus
                    setModalEmbedShow={() => setModalEmbedShow(!modalEmbedShow)}
                    dataCollections={dataCollection}
                    fileName={`${fileName || title}.csv`}
                />
            </HStack>
            <Divider />
            <FullScreen handle={isFullScreen} className="fullscreen-el">
                <Flex flex={1} h={bodyH || "80%"}>
                    {children}
                </Flex>
            </FullScreen>
            <EmbedModal
                isOpen={modalEmbedShow}
                onClose={() => setModalEmbedShow(false)}
            />
        </Box>
    );
};

export function EmbedModal({
    ...props
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <>
            <Modal {...props} isCentered size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Get Embeded Code Here</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flex={1} w="full" justifyContent="center">
                            <Code
                                w="full"
                                p="1.5rem 1rem"
                                bg="blackAlpha.800"
                                color="white"
                                borderRadius="xl"
                                overflow="scroll"
                            >
                                <pre>{`<iframe src="https://dtwh-ui.vercel.app/embed/pie" width="50%" height="200px" />`}</pre>
                            </Code>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        {/* <Button
                            colorScheme="gray"
                            onClick={props.onClose}
                            variant="ghost"
                        >
                            Close
                        </Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
