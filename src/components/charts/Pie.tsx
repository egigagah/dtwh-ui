import {
    Flex,
    HStack,
    Skeleton,
    SkeletonCircle,
    Stack,
    StackProps,
    useBreakpoint,
} from "@chakra-ui/react";
import { ResponsivePie } from "@nivo/pie";
import { memo, useRef } from "react";
import { useSize } from "@chakra-ui/react-use-size";
import Skeletons from "@components/skeletons";

interface PieProps extends StackProps {
    data: any;
    total: number;
    isLoading?: boolean;
}

const App = ({
    data,
    total,
    isLoading = true,
    ...res
}: PieProps): JSX.Element => {
    const ref = useRef<HTMLDivElement | null>(null);
    const dimension = useSize(ref);
    const breakpoint = useBreakpoint();

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
            {isLoading && dimension && (
                <Skeletons.PieSkeleton dimension={dimension} />
                // <SkeletonPie isLoaded={isLoading} dimension={dimension} />
            )}
            {dimension && data && !isLoading && (
                <ResponsivePie
                    data={data}
                    id="label"
                    arcLabel={(d) => `${((d.value / total) * 100).toFixed(2)}%`}
                    margin={{
                        top:
                            (dimension?.height *
                                (breakpoint !== "sm" ? 8 : 5)) /
                            100,
                        right:
                            breakpoint !== "sm"
                                ? (dimension?.height * 10) / 100
                                : 0,
                        bottom: (dimension?.height * 8) / 100,
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
                    colors={{ scheme: "set1" }}
                    arcLinkLabelsTextColor="#ffffff"
                    borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.2]],
                    }}
                    enableArcLinkLabels={false}
                    // arcLinkLabelsSkipAngle={10}
                    // arcLinkLabelsTextColor="#333333"
                    // arcLinkLabelsThickness={2}
                    // arcLinkLabelsColor={{ from: "color" }}
                    sortByValue={true}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor="#ffffff"
                    defs={[
                        {
                            id: "dots",
                            background: "inherit",
                            color: "rgba(255, 255, 255, 0.3)",
                            type: "patternLines",
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10,
                        },
                    ]}
                    fill={[
                        {
                            match: {
                                id: "DITOLAK",
                            },
                            id: "dots",
                        },
                    ]}
                    legends={[
                        {
                            anchor: "bottom-left",
                            direction: "column",
                            justify: false,
                            translateX: 0,
                            translateY: (dimension.height * 5) / 100,
                            itemsSpacing: 10,
                            itemWidth:
                                (dimension.width * 80) / 100 / data?.length,
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
        </Stack>
    );
};

const Pie = memo(App, (prevProp, nextProp) => prevProp.data === nextProp.data);

export default Pie;

function SkeletonPie({
    isLoaded,
    dimension,
}: {
    isLoaded: boolean;
    dimension?: {
        width: number;
        height: number;
    };
}) {
    return (
        <>
            <SkeletonCircle
                height={
                    isLoaded
                        ? "100%"
                        : (dimension && (dimension?.width * 70) / 100) || "auto"
                }
                width={isLoaded ? "100%" : "70%"}
                isLoaded={isLoaded}
            ></SkeletonCircle>
            <HStack as={Flex} flex={0} spacing="3" w="100%" h="100%" px={8}>
                <Skeleton width="20" height="1rem" isLoaded={isLoaded} />
                <Skeleton width="20" height="1rem" isLoaded={isLoaded} />
                <Skeleton width="20" height="1rem" isLoaded={isLoaded} />
                <Skeleton width="20" height="1rem" isLoaded={isLoaded} />
            </HStack>
        </>
    );
}
