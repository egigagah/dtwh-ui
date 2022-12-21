import React, { useCallback, useEffect, useState } from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import { appWithTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
import { CustomAppElement, CustomAppProps } from "src/utils/types";
import { Layout } from "@components/index";
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, useSession } from "next-auth/react";

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
    const queryClient = new QueryClient();
    const [componentState, setCompononentState] = useState<
        CustomAppProps | undefined
    >(undefined as any);

    // const { ToastContainer } = createStandaloneToast();

    const getComponentProps = useCallback(() => {
        const Layout = (Component as CustomAppElement)?.appProps || undefined;
        return Layout;
    }, [Component]);

    useEffect(() => {
        setCompononentState(getComponentProps());
    }, [Component]);
    return (
        <>
            <NextNProgress />
            <SessionProvider session={session}>
                <ChakraProvider theme={theme}>
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools initialIsOpen={false} />
                        <Hydrate state={pageProps.dehydratedState}>
                            <Layout {...componentState?.Layout}>
                                <Component {...pageProps} />
                            </Layout>
                        </Hydrate>
                    </QueryClientProvider>
                </ChakraProvider>
            </SessionProvider>
        </>
    );
}

export default appWithTranslation(MyApp);
