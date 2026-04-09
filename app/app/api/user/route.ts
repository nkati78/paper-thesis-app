import { auth } from "auth";
import { NextRequest, NextResponse } from "next/server";
import settings from "../../../lib/settings";

export async function GET(req: NextRequest, res: NextResponse) {

    try {

        const session = await auth();
        const token = session?.user.token;

        const user = await fetch(settings.pt_api.me, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            }
        }).then((res) => res.json());

        return Response.json({ user });

    } catch (error) {

        return new Response(`${error.message}`, {
            status: 400
        });

    }

}