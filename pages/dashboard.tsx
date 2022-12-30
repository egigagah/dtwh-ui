import React from "react";
import { GetStaticProps } from "next";
import { getServerSideTranslations } from "src/utils/i18n/getServerSideTranslations";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { cacheName, getDatas } from "src/utils/models/dashboards";
import DashBoardContainers from "src/containers/dashboard";

const defaultData = {
    status: {
        value: "ALL",
        label: "ALL",
    },
    tahun: [
        {
            value: -1,
            label: "ALL",
        },
    ],
};

function Home() {
    return <DashBoardContainers defaultData={defaultData} />;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const queryClient = new QueryClient();
    async function getData() {
        return await getDatas(defaultData);
    }
    await queryClient.prefetchQuery([cacheName, defaultData], getData, {
        cacheTime: 12 * 60 * 60 * 1000,
        staleTime: 12 * 60 * 60 * 1000,
    });

    return {
        props: {
            ...(await getServerSideTranslations(locale as string, ["common"])),
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 2 * 60 * 60,
    };
};

export default Home;
