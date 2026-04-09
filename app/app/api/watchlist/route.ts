import { auth } from "auth";
import { NextRequest, NextResponse } from "next/server";
import settings from "../../../lib/settings";

export async function GET(req: NextRequest, res: NextResponse) {

    try {

        const session = await auth();
        const token = session?.user.token;

        const watchlist_fetch = await fetch(`${settings.pt_api.watchlist}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            },
        }).then((res) => res.json());

        return Response.json(watchlist_fetch);

    } catch (error) {

        return new Response(`${error.message}`, {
            status: 400
        });

    }

}

export async function POST(req: NextRequest, res: NextResponse) {

    try {

        const session = await auth();
        const token = session?.user.token;
        const body = await req.json();

        if (req.body) {

            const watchlist_post = await fetch(`${settings.pt_api.watchlist}`, {
                method: body.type === 'remove' ? 'DELETE' : 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                },
                body: JSON.stringify({
                    symbol: body.symbol,
                    user_id: body.user_id,
                })
            }).then((res) => res.json());

            return Response.json(watchlist_post);

        } else {

            return new Response(`Bad Watchlist Request ${body}`, {
                status: 400
            });

        }

    } catch (error) {

        return new Response(`${error.message}`, {
            status: 400
        });

    }

}