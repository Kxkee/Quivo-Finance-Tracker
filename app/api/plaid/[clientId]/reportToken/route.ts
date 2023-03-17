import {AssetReportCreateRequest, Configuration, PlaidApi, PlaidEnvironments} from 'plaid';
import {NextResponse} from "next/server";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
    const plaidRequest: AssetReportCreateRequest = {
        access_tokens: [access_token],
        days_requested: 60,
    };
    try {
        const response = await plaidClient.assetReportCreate(plaidRequest)
        const {asset_report_token} = response.data;
        return NextResponse.json(asset_report_token);

    } catch (error) {
        // handle error
        console.log(error);
    }
};
