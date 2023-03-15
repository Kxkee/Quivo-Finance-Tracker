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

export async function POST(request: Request, { params }) {
  // Get the client_user_id by searching for the current user
  const {clientId} = params;
  const plaidRequest = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: clientId,
    },
    client_name: 'Plaid Test App',
    products: ['auth'],
    language: 'fr',
    redirect_uri: 'http://localhost:3000/dashboard/',
    country_codes: ['FR'],
  };
  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
    return NextResponse.json(createTokenResponse.data);
  } catch (error) {
    console.log(error);
  }
};
