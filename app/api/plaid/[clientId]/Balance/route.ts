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
    const {access_token} = data;
    // Pull real-time balance information for each account associated
    // with the Item
    const plaidRequest = {
        access_token: access_token,
    };
    try {
        const response = await plaidClient.accountsBalanceGet(plaidRequest);
        const accounts = response.data.accounts;
        return NextResponse.json(accounts);
    } catch (error) {
        // handle error
        console.log(error);
    }
};

