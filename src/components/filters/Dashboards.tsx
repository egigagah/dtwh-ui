import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import ReactSelect from "react-select";
import { FilterDatasType } from "src/utils/types";
import { useFilterDashboard } from "src/utils/query/dashboards";
import { useForm } from "react-hook-form";

export default function FilterModal({
    datas,
    setDatas,
    onSubmit,
}: {
    datas: FilterDatasType;
    setDatas: (d: FilterDatasType) => void;
    onSubmit: (d?: any) => void;
}) {
    console.log(datas, "--default val");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { data, isLoading, error } = useFilterDashboard();

    useEffect(() => {
        if (data) {
            data?.getFiltersDashboard?.tahun?.unshift({
                value: -1,
                label: "ALL",
            });
            data?.getFiltersDashboard?.status?.unshift({
                value: "ALL",
                label: "ALL",
            });
        }
    }, [data]);

    return (
        <>
            <Tooltip label="Filter Data">
                <Box>
                    <Button
                        leftIcon={<FaFilter color="gray" size={20} />}
                        variant="outline"
                        onClick={onOpen}
                        color="gray"
                    >
                        Filter Data
                    </Button>
                </Box>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form>
                        <ModalHeader>Filter Dashboard</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>
                                Filter data yang ingin anda tampilkan di
                                dashboard
                            </Text>
                            {data && !isLoading && !error && (
                                <Stack spacing={4}>
                                    <FormControl>
                                        <FormLabel>Tahun</FormLabel>
                                        <ReactSelect
                                            value={datas.tahun}
                                            isMulti
                                            name="colors"
                                            options={
                                                data?.getFiltersDashboard?.tahun
                                            }
                                            onChange={(d) => {
                                                setDatas({
                                                    ...datas,
                                                    tahun: d,
                                                });
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Status</FormLabel>
                                        <ReactSelect
                                            value={datas.status}
                                            name="colors"
                                            options={
                                                data?.getFiltersDashboard
                                                    ?.status
                                            }
                                            onChange={(d) => {
                                                setDatas({
                                                    ...datas,
                                                    status: d,
                                                });
                                            }}
                                        />
                                    </FormControl>
                                </Stack>
                            )}
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                variant="ghost"
                                colorScheme="gray"
                                mr={3}
                                onClick={onClose}
                            >
                                Close
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={() => {
                                    onSubmit();
                                    onClose();
                                }}
                            >
                                Save
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}
