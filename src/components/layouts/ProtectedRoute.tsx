import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ScreenLoading from "./ScreenLoading";
import { useSession } from "next-auth/react";

export default function ProtectedRoute({
    protectedRoutes,
    children,
}: {
    protectedRoutes?: any[];
    children: ReactElement;
}): JSX.Element {
    const router = useRouter();
    const { status } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "authenticated" && router.pathname === "/") {
            router.push("/admin").then(() => setLoading(false));
        } else if (status !== "loading") setLoading(false);
    }, [status]);

    if (status === "loading" || loading) {
        return <ScreenLoading />;
    }

    return children;
}
