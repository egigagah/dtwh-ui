import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
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
import ReactSelect, { GroupBase } from "react-select";
import { FilterDatasType } from "src/utils/types";
import { useFilterDashboard } from "src/utils/models/dashboards";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFilterReportTable } from "src/utils/models/report-table";

const filterSchema = yup
    .object({
        status: yup
            .object()
            .shape({
                value: yup.string(),
                label: yup.string(),
            })
            .required("Pilih status terlebih dahulu"),
        service_point: yup
            .array()
            .of(
                yup
                    .object()
                    .shape({
                        value: yup.mixed().required(),
                        label: yup.mixed().required(),
                    })
                    .required(),
            )
            .min(1, "Pilih service_point terlebih dahulu")
            .required("Pilih service_point terlebih dahulu"),
        level_wilayah: yup
            .array()
            .of(
                yup
                    .object()
                    .shape({
                        value: yup.mixed().required(),
                        label: yup.mixed().required(),
                    })
                    .required(),
            )
            .min(1, "Pilih level_wilayah terlebih dahulu")
            .required("Pilih level_wilayah terlebih dahulu"),
        // tahun: yup
        //     .array()
        //     .of(
        //         yup
        //             .object()
        //             .shape({
        //                 value: yup.number().required(),
        //                 label: yup.mixed().required(),
        //             })
        //             .required(),
        //     )
        //     .min(1, "Pilih tahun terlebih dahulu")
        //     .required("Pilih tahun terlebih dahulu"),
        // source_db: yup
        //     .array()
        //     .of(
        //         yup
        //             .object()
        //             .shape({
        //                 value: yup.mixed().required(),
        //                 label: yup.mixed().required(),
        //             })
        //             .required(),
        //     )
        //     .min(1, "Pilih source_db terlebih dahulu")
        //     .required("Pilih source_db terlebih dahulu"),
        // bulan: yup
        //     .array()
        //     .of(
        //         yup
        //             .object()
        //             .shape({
        //                 value: yup.mixed().required(),
        //                 label: yup.mixed().required(),
        //             })
        //             .required(),
        //     )
        //     .min(1, "Pilih bulan terlebih dahulu")
        //     .required("Pilih bulan terlebih dahulu"),
        // bidang: yup
        //     .array()
        //     .of(
        //         yup
        //             .object()
        //             .shape({
        //                 value: yup.mixed().required(),
        //                 label: yup.mixed().required(),
        //             })
        //             .required(),
        //     )
        //     .min(1, "Pilih bidang terlebih dahulu")
        //     .required("Pilih bidang terlebih dahulu"),
        // kategori: yup
        //     .array()
        //     .of(
        //         yup
        //             .object()
        //             .shape({
        //                 value: yup.mixed().required(),
        //                 label: yup.mixed().required(),
        //             })
        //             .required(),
        //     )
        //     .min(1, "Pilih kategori terlebih dahulu")
        //     .required("Pilih kategori terlebih dahulu"),
    })
    .required();

export default function FilterReportTable({
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
        formState: { errors, isValid, isDirty },
        reset,
    } = useForm({
        defaultValues: datas,
        resolver: yupResolver(filterSchema),
        mode: "onChange",
    });

    const { data, isLoading, error } = useFilterReportTable();

    function submitForm(data: FilterDatasType) {
        onSubmit(data);
        // closeModal(false);
    }

    // function closeModal(isReset = true) {
    //     if (isReset)
    //         reset({
    //             tahun: datas.tahun,
    //             status: datas.status,
    //         });
    //     onClose();
    // }

    return (
        <Flex
            direction="column"
            w="full"
            flex={1}
            px={[2, 4, 8]}
            pb={[2, 4, 8]}
        >
            <Flex
                w="full"
                flex={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Text mb={0}>
                    Filter data yang ingin anda tampilkan di dashboard
                </Text>
                <Tooltip label="Filter Data">
                    <Box>
                        <Button
                            leftIcon={<FaFilter color="gray" size={20} />}
                            variant="outline"
                            onClick={isOpen ? onClose : onOpen}
                            color="gray"
                            size={["sm", "md"]}
                        >
                            Filter Data
                        </Button>
                    </Box>
                </Tooltip>
            </Flex>
            {isOpen && (
                <Flex
                    direction="row"
                    w="full"
                    flex={1}
                    px={[2, 4, 8]}
                    pt={[2, 4, 8]}
                >
                    <form
                        onSubmit={handleSubmit(submitForm)}
                        style={{ width: "100%" }}
                    >
                        <Flex w="full" flex={1} direction="column" gap={4}>
                            <Stack spacing={4} w="full" direction="row">
                                <FormControl
                                    w={["full", "sm"]}
                                    isInvalid={!!errors.status}
                                >
                                    <FormLabel>Status</FormLabel>
                                    <Controller
                                        name="status"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <ReactSelect
                                                {...field}
                                                options={data?.status}
                                            />
                                        )}
                                    />
                                    <FormErrorMessage>
                                        {errors?.status?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.level_wilayah}>
                                    <FormLabel>Level Wilayah</FormLabel>
                                    <Controller
                                        name="level_wilayah"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <ReactSelect
                                                {...field}
                                                isMulti
                                                options={data?.wilayah}
                                            />
                                        )}
                                    />
                                    <FormErrorMessage>
                                        {errors?.level_wilayah?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.service_point}>
                                    <FormLabel>Service Point</FormLabel>
                                    <Controller
                                        name="service_point"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <ReactSelect
                                                {...field}
                                                isMulti
                                                options={data?.servicePoint}
                                            />
                                        )}
                                    />
                                    <FormErrorMessage>
                                        {errors?.service_point?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Stack>
                            <Flex direction="row" justifyContent="flex-end">
                                <Button
                                    variant="ghost"
                                    colorScheme="gray"
                                    mr={3}
                                    onClick={() => reset()}
                                    disabled={!isDirty}
                                >
                                    Reset Filter
                                </Button>
                                <Button
                                    colorScheme="blue"
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Save
                                </Button>
                            </Flex>
                        </Flex>
                    </form>
                </Flex>
            )}
        </Flex>
    );
}
