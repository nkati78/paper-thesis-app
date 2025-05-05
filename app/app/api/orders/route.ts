import { auth } from "auth";
import { NextRequest, NextResponse } from "next/server";
import settings from "../../../lib/settings";
import { Order } from "../../../types/api_types";

export async function GET(req: NextRequest, res: NextResponse) {

    try {

        const session = await auth();
        const token = session?.user.token;

        const orders: Order[] = await fetch(settings.pt_api.orders, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            }
        }).then((res) => res.json());

        return Response.json(orders);

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

        const orders = await fetch(settings.pt_api.orders, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            },
            body: JSON.stringify(body)
        }).then((res) => res.json());

        return Response.json(orders);

    } catch (error) {

        return new Response(`${error.message}`, {
            status: 400
        });

    }

}