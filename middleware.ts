import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    // function middleware(req: NextRequestWithAuth) {
    //     const url = req.nextUrl.clone();
    //     const token = req.nextauth.token;
    //     console.log(
    //         url.pathname.startsWith("/login"),
    //         !!token,
    //         "token ---",
    //         url.pathname,
    //     );
    //     // if (url.pathname === "/" && !!token) url.pathname = "/admin";
    //     // else if (url.pathname.startsWith("/admin") && !token)
    //     //     url.pathname = "/login";
    //     // else if (url.pathname.startsWith("/login") && !!token)
    //     //     url.pathname = "/admin";
    //     return NextResponse.redirect(url);
    // },
    {
        pages: {
            signIn: "/login",
        },
    },
);
export const config = { matcher: ["/admin/:path*"] };
