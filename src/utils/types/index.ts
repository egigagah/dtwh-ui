import { PropsWithChildren } from "react";
import { MultiValue, SingleValue } from "react-select";

export interface CustomAppElement {
    (): JSX.Element;
    appProps?: CustomAppProps;
}

export type CustomAppProps = {
    Layout?: {
        withHeader?: boolean;
        withFooter?: boolean;
        adminLayout?: boolean;
    };
    Protected?: boolean;
    Permission?: string[];
};

export type Layouts = {
    withHeader?: boolean;
    withFooter?: boolean;
    adminLayout?: boolean;
};

export type LayoutsProps = Layouts & PropsWithChildren;

export type FilterValueType = {
    value: string | number;
    label: string | number;
};

export type FilterDatasType = {
    tahun?: MultiValue<FilterValueType>;
    status?: SingleValue<FilterValueType>;
};
