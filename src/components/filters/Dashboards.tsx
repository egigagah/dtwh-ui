import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const filterSchema = yup
    .object({
        tahun: yup
            .array()
            .of(
                yup
                    .object()
                    .shape({
                        value: yup.number().required(),
                        label: yup.mixed().required(),
                    })
                    .required(),
            )
            .min(1, "Pilih tahun terlebih dahulu")
            .required("Pilih tahun terlebih dahulu"),
        status: yup
            .object()
            .shape({
                value: yup.string(),
                label: yup.string(),
            })
            .required("Pilih status terlebih dahulu"),
    })
    .required();

export default function FilterModal({
    datas,
    onSubmit,
}: {
    datas: FilterDatasType;
    onSubmit: (d: FilterDatasType) => void;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
        reset,
    } = useForm({
        defaultValues: datas,
        resolver: yupResolver(filterSchema),
        mode: "onChange",
    });

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

    function submitForm(data: FilterDatasType) {
        onSubmit(data);
        closeModal(false);
    }

    function closeModal(isReset = true) {
        if (isReset)
            reset({
                tahun: datas.tahun,
                status: datas.status,
            });
        onClose();
    }

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

            <Modal isOpen={isOpen} onClose={() => closeModal()}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <ModalHeader>Filter Dashboard</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>
                                Filter data yang ingin anda tampilkan di
                                dashboard
                            </Text>
                            <Stack spacing={4}>
                                <FormControl isInvalid={!!errors.tahun}>
                                    <FormLabel>Tahun</FormLabel>
                                    <Controller
                                        name="tahun"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <ReactSelect
                                                {...field}
                                                isMulti
                                                options={
                                                    data?.getFiltersDashboard
                                                        ?.tahun
                                                }
                                            />
                                        )}
                                    />
                                    <FormErrorMessage>
                                        {errors?.tahun?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.status}>
                                    <FormLabel>Status</FormLabel>
                                    <Controller
                                        name="status"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <ReactSelect
                                                {...field}
                                                options={
                                                    data?.getFiltersDashboard
                                                        ?.status
                                                }
                                            />
                                        )}
                                    />
                                    <FormErrorMessage>
                                        {errors?.status?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                variant="ghost"
                                colorScheme="gray"
                                mr={3}
                                onClick={() => closeModal()}
                            >
                                Close
                            </Button>
                            <Button
                                colorScheme="blue"
                                type="submit"
                                disabled={!isValid}
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
