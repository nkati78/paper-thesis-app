import { auth } from "auth";
import { NextRequest, NextResponse } from "next/server";
import settings from "../../../lib/settings";

export async function GET(req: NextRequest, res: NextResponse) {

    try {

        const session = await auth();
        const token = session?.user.token;

        const balance = await fetch(settings.pt_api.balance, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            }
        }).then((res) => res.json());

        return Response.json(balance);

    } catch (error) {

        return new Response(`${error.message}`, {
            status: 400
        });

    }

}