import { Flex, HStack, Skeleton, SkeletonProps } from "@chakra-ui/react";
import Skeletons from "@components/skeletons";
import { ResponsiveLine, Serie } from "@nivo/line";
import { memo } from "react";

type LineChartProps = {
    data: Serie[];
    isLoading?: boolean;
};

const App = ({ data, isLoading }: LineChartProps): JSX.Element => {
    return (
        <>
            {!isLoading && data && (
                <ResponsiveLine
                    data={data}
                    enableGridX={false}
                    tooltipFormat={(d) => `test`}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: true,
                        reverse: false,
                    }}
                    colors={{ scheme: "set1" }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Bulan",
                        legendOffset: 36,
                        legendPosition: "middle",
                        format: (d) => `${d?.toString().slice(0, 3)}`,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Jumlah",
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            )}
            {isLoading && <Skeletons.BarSkeleton />}
        </>
    );
};

const LineChart = memo(App, (p, n) => p.data === n.data);

export default LineChart;
