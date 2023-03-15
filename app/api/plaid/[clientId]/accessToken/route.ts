import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import {NextResponse} from "next/server";

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.NEXT_PUBLIC_PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.NEXT_PUBLIC_PLAID_SECRET,
        },
    },
});

const plaidClient = new PlaidApi(configuration);

export async function POST(request: Request) {

    const data = await request.json();
    const {public_token} = data;
    console.log("publiccccTOKEN: ",public_token);
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: public_token,
        });
        // These values should be saved to a persistent database and
        // associated with the currently signed-in user
        const accessToken = response.data.access_token;
        return NextResponse.json(accessToken);
    } catch (error) {
        // handle error
        console.log(error)
    }
};

