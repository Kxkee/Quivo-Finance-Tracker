"use client";
import {usePlaidLink} from "react-plaid-link";
import {useState, useEffect} from "react";
import axios from "axios";

type PropsPlaidLink = {
    id: string,
}

export default function PlaidLink(props: PropsPlaidLink) {
    const [linkToken, setLinkToken] = useState<string>();
    const [publicToken, setPublicToken] = useState<string >();
    useEffect(() => {
        async function getLinkToken() {
            const response = await axios.post(`http://localhost:3000/api/plaid/${props.id}`);
            setLinkToken(response.data.link_token);
        }
        getLinkToken();
    }, [])
    async function getAccessToken() {
        const response = await axios.post(`http://localhost:3000/api/plaid/${props.id}/accessToken`, {public_token: publicToken});
        console.log("accessToken: ", response.data)
    }
    const { open, ready } = usePlaidLink({
        token: linkToken ? linkToken : null,
        onSuccess: (public_token, metadata) => {
            setPublicToken(public_token);
            console.log("success: ", public_token, metadata);
            // send public_token to server
        },
    });


    return (
        <>
            {publicToken ? (
                <button type="button" onClick={getAccessToken}>Get Access Token</button>
            ) : (
                <button onClick={() => open()} disabled={!ready}>
                    Connect a bank account
                </button>
            )}
        </>
    );
}