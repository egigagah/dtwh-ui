import React, { useCallback, useEffect, useState } from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { appWithTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
import { ReactQueryDevtools } from "react-query/devtools";
import { CustomAppElement, CustomAppProps } from "src/utils/types";
import { Layout } from "@components/index";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
        </>
    );
}

export default appWithTranslation(MyApp);
