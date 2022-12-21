import { LayoutsProps } from "src/utils/types";
import AdminLayout from "./admin";
import Layout from "./Layout";

export default function Layouts({
    children,
    withHeader = true,
    withFooter = true,
    adminLayout = false,
}: LayoutsProps): JSX.Element {
    console.log(adminLayout, "-- layout session");
    if (adminLayout) {
        return (
            <AdminLayout
                children={children}
                withFooter={withFooter}
                withHeader={withHeader}
            />
        );
    } else {
        return (
            <Layout
                children={children}
                withFooter={withFooter}
                withHeader={withHeader}
            />
        );
    }
}
