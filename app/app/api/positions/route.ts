import { auth } from "auth";
import { NextRequest, NextResponse } from "next/server";
import settings from "../../../lib/settings";

export async function GET(req: NextRequest, res: NextResponse) {

    try {

        const session = await auth();
        const token = session?.user.token;

        const positions = await fetch(settings.pt_api.positions, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            }
        }).then((res) => res.json());

        return Response.json({ positions });

    } catch (error) {

        return new Response(`${error.message}`, {
            status: 400
        });

    }

}