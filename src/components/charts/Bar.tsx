import {
    Box,
    BoxProps,
    Flex,
    HStack,
    Skeleton,
    SkeletonProps,
    Text,
} from "@chakra-ui/react";
import Skeletons from "@components/skeletons";
import { ResponsiveBar } from "@nivo/bar";
import { memo } from "react";

interface BarProps extends BoxProps {
    data: any;
    dataKey: any[];
    dataIndexBy: string;
    isLoading?: boolean;
}

const App = ({
    data,
    dataKey,
    dataIndexBy,
    isLoading = false,
}: BarProps): JSX.Element => {
    return (
        <>
            {/* <BarSkeleton isLoaded={isLoading} width="2rem" height="80%" /> */}
            {isLoading && <Skeletons.BarSkeleton />}
            {!isLoading && (
                <ResponsiveBar
                    data={data}
                    keys={dataKey}
                    enableLabel={false}
                    // label={(d) => `${d.value}`}
                    // layout="horizontal"
                    indexBy={dataIndexBy}
                    valueFormat={(d) => `${d} val`}
                    margin={{ top: 50, right: 25, bottom: 50, left: 60 }}
                    padding={0.3}
                    groupMode="grouped"
                    valueScale={{ type: "linear" }}
                    indexScale={{ type: "band", round: true }}
                    colors={{ scheme: "category10" }}
                    defs={[
                        {
                            id: "dots",
                            type: "patternDots",
                            background: "inherit",
                            color: "#38bcb2",
                            size: 4,
                            padding: 1,
                            stagger: true,
                        },
                        {
                            id: "lines",
                            type: "patternLines",
                            background: "inherit",
                            color: "rgba(255, 255, 255, 0.3)",
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10,
                        },
                    ]}
                    fill={[
                        {
                            match: {
                                id: "ditolak",
                            },
                            id: "dots",
                        },
                    ]}
                    borderColor={{
                        from: "color",
                        modifiers: [["darker", 1.6]],
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -56,
                        format: (d) => `${d}`,
                        // legend: "Kategori",
                        // legendPosition: "middle",
                        // legendOffset: 32,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Jumlah Izin",
                        legendPosition: "middle",
                        legendOffset: -40,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor="#FFFFFF"
                    // tooltipLabel={(d) =>
                    //     `${d.indexValue} - ${d.id.toString().toUpperCase()}`
                    // }
                    tooltip={(d) => (
                        <Box
                            w="44"
                            h="fit-content"
                            bg="white"
                            shadow="md"
                            p={2}
                            rounded="lg"
                            border=".3px solid grey"
                        >
                            <Text fontSize="xs" mb={0}>
                                {d.data.kode}
                            </Text>
                            <Text fontSize="xs" mb={1} fontWeight="semibold">
                                {d.indexValue}
                            </Text>
                            <Text fontSize="xs" mb={0}>
                                {d.id.toString().toUpperCase()}:{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    {d.value}
                                </span>
                            </Text>
                        </Box>
                    )}
                    // tooltipLabel={(d) =>
                    //     `${d.id} ${
                    //         d.indexValue.toString().match(/\(.*\)/g)?.[0] || "-"
                    //     }`
                    // }
                    // legends={[
                    //     {
                    //         dataFrom: "keys",
                    //         anchor: "bottom-right",
                    //         direction: "column",
                    //         justify: false,
                    //         translateX: 120,
                    //         translateY: 0,
                    //         itemsSpacing: 2,
                    //         itemWidth: 100,
                    //         itemHeight: 20,
                    //         itemDirection: "left-to-right",
                    //         itemOpacity: 0.85,
                    //         symbolSize: 20,
                    //         effects: [
                    //             {
                    //                 on: "hover",
                    //                 style: {
                    //                     itemOpacity: 1,
                    //                 },
                    //             },
                    //         ],
                    //     },
                    // ]}
                    role="application"
                    ariaLabel="Bar chart"
                    barAriaLabel={function (e) {
                        return (
                            e.id +
                            ": " +
                            e.formattedValue +
                            " Total: " +
                            e.indexValue
                        );
                    }}
                />
            )}
        </>
    );
};

const Bar = memo(App, (prevProp, nextProp) => prevProp.data === nextProp.data);

export default Bar;
