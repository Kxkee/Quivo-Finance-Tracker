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
    const {asset_report_token} = data;

    const plaidRequest = {
        asset_report_token,
        include_insights: true,
    }

    try {
        const response = await plaidClient.assetReportGet(plaidRequest);
        return NextResponse.json(response.data);
    }catch (err) {
        console.log(err)
    }
};

