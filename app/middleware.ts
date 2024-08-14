import { auth } from "/auth"

export default auth((req) => {

    if (req.auth && (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/auth/login" || req.nextUrl.pathname === "/auth/signup") ) {

        const newUrl = new URL("/dashboard", req.nextUrl.origin)

        return Response.redirect(newUrl)

    } else if (!req.auth && (req.nextUrl.pathname === "/account/settings" || req.nextUrl.pathname === "/account/transactions" || req.nextUrl.pathname === "/dashboard" || req.nextUrl.pathname === "/learn" || req.nextUrl.pathname === "/shop") ) {

        const newUrl = new URL("/auth/login", req.nextUrl.origin)

        return Response.redirect(newUrl)

    }

})