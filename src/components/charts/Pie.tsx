import {
    Flex,
    Skeleton,
    SkeletonCircle,
    Stack,
    StackProps,
    useBreakpoint,
} from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";
import { memo, useEffect, useRef, useState } from "react";
import { useSize } from "@chakra-ui/react-use-size";

interface PieProps extends StackProps {
    data: any;
}

const App = ({ data, ...res }: PieProps): JSX.Element => {
    const [isLoaded, setLoaded] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const dimension = useSize(ref);
    const breakpoint = useBreakpoint();

    useEffect(() => {
        if (ref && dimension && breakpoint) setLoaded(true);
    }, [ref, dimension, breakpoint]);

    return (
        <Stack
            {...res}
            ref={ref}
            w={res?.w || res?.width || "100%"}
            h={res?.h || res?.height || "auto"}
            as={Flex}
            justifyContent="center"
            alignItems="center"
            spacing={4}
        >
            <SkeletonCircle
                height={isLoaded ? "100%" : "70%"}
                width={isLoaded ? "100%" : "70%"}
                isLoaded={isLoaded}
            >
                {dimension && (
                    <ResponsivePie
                        data={data}
                        margin={{
                            top:
                                (dimension?.height *
                                    (breakpoint !== "sm" ? 8 : 5)) /
                                100,
                            right:
                                breakpoint !== "sm"
                                    ? (dimension?.height * 10) / 100
                                    : 0,
                            bottom:
                                (dimension?.height *
                                    (breakpoint !== "sm" ? 15 : 8)) /
                                100,
                            left:
                                breakpoint !== "sm"
                                    ? (dimension?.height * 10) / 100
                                    : 0,
                        }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{
                            from: "color",
                            modifiers: [["darker", 0.2]],
                        }}
                        enableArcLinkLabels={false}
                        // arcLinkLabelsSkipAngle={10}
                        // arcLinkLabelsTextColor="#333333"
                        // arcLinkLabelsThickness={2}
                        // arcLinkLabelsColor={{ from: "color" }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{
                            from: "color",
                            modifiers: [["darker", 2]],
                        }}
                        // defs={[
                        //     {
                        //         id: "dots",
                        //         type: "patternDots",
                        //         background: "inherit",
                        //         color: "rgba(255, 255, 255, 0.3)",
                        //         size: 4,
                        //         padding: 1,
                        //         stagger: true,
                        //     },
                        //     {
                        //         id: "lines",
                        //         type: "patternLines",
                        //         background: "inherit",
                        //         color: "rgba(255, 255, 255, 0.3)",
                        //         rotation: -45,
                        //         lineWidth: 6,
                        //         spacing: 10,
                        //     },
                        // ]}
                        // fill={[
                        //     {
                        //         match: {
                        //             id: "ruby",
                        //         },
                        //         id: "dots",
                        //     },
                        //     {
                        //         match: {
                        //             id: "c",
                        //         },
                        //         id: "dots",
                        //     },
                        //     {
                        //         match: {
                        //             id: "go",
                        //         },
                        //         id: "dots",
                        //     },
                        //     {
                        //         match: {
                        //             id: "python",
                        //         },
                        //         id: "dots",
                        //     },
                        //     {
                        //         match: {
                        //             id: "scala",
                        //         },
                        //         id: "lines",
                        //     },
                        //     {
                        //         match: {
                        //             id: "lisp",
                        //         },
                        //         id: "lines",
                        //     },
                        //     {
                        //         match: {
                        //             id: "elixir",
                        //         },
                        //         id: "lines",
                        //     },
                        //     {
                        //         match: {
                        //             id: "javascript",
                        //         },
                        //         id: "lines",
                        //     },
                        // ]}
                        legends={[
                            {
                                anchor: "bottom",
                                direction: "row",
                                justify: false,
                                translateX: 0,
                                translateY: (dimension.height * 10) / 100,
                                itemsSpacing: 10,
                                itemWidth:
                                    (dimension.width * 80) / 100 / data.length,
                                itemHeight: 18,
                                itemTextColor: "#999",
                                itemDirection: "left-to-right",
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: "circle",
                                effects: [
                                    {
                                        on: "hover",
                                        style: {
                                            itemTextColor: "#000",
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                )}
            </SkeletonCircle>
            <Skeleton
                display={isLoaded ? "none" : "block"}
                width="70%"
                height="2.5rem"
                isLoaded={isLoaded}
            />
        </Stack>
    );
};

const Pie = memo(
    App,
    (prevProp, nextProp) => prevProp.data !== nextProp.datatype,
);

export default Pie;
