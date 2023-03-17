"use client";
import {usePlaidLink} from "react-plaid-link";
import {useState, useEffect} from "react";
import {useSupabase} from "@/components/supabase-provider";
import axios from "axios";


type PropsPlaidLink = {
    id: string,
    accessToken: string | undefined,
}

export default function PlaidLink(props: PropsPlaidLink) {
    const [linkToken, setLinkToken] = useState<string>();
    const [publicToken, setPublicToken] = useState<string>();
    const {supabase} = useSupabase();
    useEffect(() => {
        const addBank = async (accessToken: String) => {
            console.log('adding')
            console.log(accessToken);
            try {
                console.log('voici les access', accessToken, props.id)
                if(accessToken && props.id) {
                    const { data, error } = await supabase.from("bank").insert({
                        user_id: props.id,
                        accessToken,
                    });
                    console.log("data: ", data);
                }
            }catch (err) {
                console.log(err);
            }

        }

        async function getLinkToken() {
            const response = await axios.post(`http://localhost:3000/api/plaid/${props.id}`);
            setLinkToken(response.data.link_token);
        }

        async function getAccessToken() {
            const response = await axios.post(`http://localhost:3000/api/plaid/${props.id}/accessToken`, {
                public_token: publicToken}).then((res)=>{
                console.log("accessToken: ", res.data)
                addBank(res.data);

            })

        }

        if(!props.accessToken) {

            if (!publicToken) {
                console.log("pas d'accesstoken")
                getLinkToken();
            } else {
                console.log("j'ai accesstoken")
                getAccessToken();
            }
        }

    }, [publicToken])

    const { open, ready } = usePlaidLink({
        token: linkToken ? linkToken : null,
        onSuccess: (public_token, metadata) => {
            setPublicToken(public_token);
            console.log("success: ", public_token, metadata);
            // send public_token to server
        },
    });


    return (
        <div className="w-[calc(100%-200px)] h-full flex justify-between p-5 pl-[10px] items-center text-white" style={{backgroundColor: "#141414"}}>
            <div className="bg-[#2C2C2C] p-10 h-full w-[calc(80%-10px)] rounded">
            <button onClick={() => open()} disabled={!ready}>
                Connect a bank account
            </button>
            </div>
        </div>


    );
}