import { auth } from "./auth";

export default auth((req) => {

    if (req.auth && (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/auth/login" || req.nextUrl.pathname === "/auth/signup") ) {

        const newUrl = new URL("/dashboard", req.nextUrl.origin);

        return Response.redirect(newUrl);

    } else if (!req.auth && (req.nextUrl.pathname === "/account" || req.nextUrl.pathname === "/account/transactions" || req.nextUrl.pathname === "/dashboard") ) {

        const newUrl = new URL("/auth/login", req.nextUrl.origin);

        return Response.redirect(newUrl);

    } else if (req.nextUrl.pathname === "/learn" || req.nextUrl.pathname === "/shop") {

        const newUrl = new URL("/comingsoon", req.nextUrl.origin);

        return Response.redirect(newUrl);

    }

    //TODO: Add middleware to auto redirect

});