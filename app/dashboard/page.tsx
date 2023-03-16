import {createClient} from "@/utils/supabaseServer";
import PlaidLink from "@/components/PlaidLink";
import axios from "axios";
import Chart from "@/components/Chart";
export default async function Portfolio() {
    const supabase = createClient()
    const {data: { session }} = await supabase.auth.getSession()
    const getAccessToken = async() => {
        try {
            const {data, error} = await supabase
                .from("bank")
                .select("accessToken")
                .eq("user_id", session?.user.id);
            const {accessToken} = data[0]
            return accessToken;
        }catch (err) {
            console.log(err);
        }

    }

    const getUserBalance = async() => {
        try {
            const response = await axios.post(`http://localhost:3000/api/plaid/${session?.user.id}/Balance`, {
                access_token: accessToken,
            })
                const {balances: {available}} = response.data[0];
                return available;
        }catch (err) {
            console.log(err);
        }
    }
    const accessToken = await getAccessToken();
    const balance = await getUserBalance();

    return (
        <div className="w-full h-full flex-col flex justify-between p-5 items-center text-white bg-[#161719]">
            <div className="w-full p-5 h-[150px] rounded-lg bg-[#202123]">info</div>
            <div className="flex w-full h-full mt-5">
                <Chart />
                <div className="w-1/4 h-full rounded-lg bg-[#202123] p-5 ml-[10px]">tx history</div>
            </div>
        </div>
        )
}