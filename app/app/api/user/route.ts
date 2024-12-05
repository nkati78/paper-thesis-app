export async function GET(request: Request) {

    console.log(request);

    const dad = {
        status: 200
    };

    return Response.json(dad);

}