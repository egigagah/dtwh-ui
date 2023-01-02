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
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Tag,
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
import FilterTagResult from "./FilterTagResult";

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
        formState: { errors, isValid, isDirty, defaultValues },
        reset,
    } = useForm({
        defaultValues: datas,
        resolver: yupResolver(filterSchema),
        mode: "onChange",
    });

    const { data, isLoading, error } = useFilterReportTable();

    function submitForm(data: FilterDatasType) {
        onSubmit(data);
        onClose();
    }

    function resetForm() {
        reset();
        onSubmit(defaultValues as FilterDatasType);
    }

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
                gap={4}
                pb={isOpen ? 4 : 0}
            >
                <Stack direction="column" wrap="wrap">
                    <Text
                        mb={0}
                        color="blackAlpha.500"
                        fontWeight="medium"
                        fontSize={"lg"}
                    >
                        Filter data yang anda tampilkan saat ini:
                    </Text>
                    <Stack direction={["column", "row"]} gap={4}>
                        <FilterTagResult
                            label="Status"
                            value={datas?.status?.label || "ALL"}
                        />
                        <FilterTagResult
                            label="Level Wilayah"
                            value={(datas?.level_wilayah as any[]) || "ALL"}
                        />
                        <FilterTagResult
                            label="Service Point"
                            value={(datas?.service_point as any[]) || "ALL"}
                        />
                    </Stack>
                </Stack>
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
                    py={[2, 4, 8]}
                    bg="blackAlpha.50"
                >
                    <form
                        onSubmit={handleSubmit(submitForm)}
                        style={{ width: "100%" }}
                    >
                        <Flex
                            w="full"
                            flex={1}
                            direction="column"
                            gap={[4, 6, 8]}
                            // borderTop="1px solid gray"
                        >
                            <Stack
                                spacing={4}
                                w="full"
                                direction="row"
                                // flexWrap="wrap"
                            >
                                <FormControl
                                    w={["full", "xs"]}
                                    minW={"xs"}
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
                                <FormControl
                                    w={["full", "sm"]}
                                    isInvalid={!!errors.level_wilayah}
                                >
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
                                <FormControl
                                    w={["full", "sm"]}
                                    isInvalid={!!errors.service_point}
                                >
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
                                    variant="outline"
                                    colorScheme="blackAlpha"
                                    mr={3}
                                    onClick={resetForm}
                                    disabled={!isDirty}
                                >
                                    Reset Filter
                                </Button>
                                <Button
                                    variant="outline"
                                    colorScheme="telegram"
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
