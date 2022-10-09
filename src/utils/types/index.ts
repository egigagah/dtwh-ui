import { PropsWithChildren } from "react";

export interface CustomAppElement {
    (): JSX.Element;
    appProps?: CustomAppProps;
}

export type CustomAppProps = {
    Layout?: {
        withHeader?: boolean;
        withFooter?: boolean;
    };
    Protected?: boolean;
    Permission?: string[];
};

export type Layouts = {
    withHeader?: boolean;
    withFooter?: boolean;
};

export type LayoutsProps = Layouts & PropsWithChildren;
