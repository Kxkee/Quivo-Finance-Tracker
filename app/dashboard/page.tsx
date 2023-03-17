import {createClient} from "@/utils/supabaseServer";
import axios from "axios";
import Chart from "@/components/Chart";
export default async function Portfolio() {
    const supabase = createClient()
    const {data: { session }} = await supabase.auth.getSession()
    const getAccessToken = async() => {
        try {
            const {data, error} = await supabase
                .from("bank")
                .select()
                .eq("user_id", session?.user.id);
            const {accessToken} = data[0];
            return accessToken;
        }catch (err) {
            console.log("you got an error", err);
        }

    }
    const getReportToken = async() => {
        try {
            const response = await axios.post(`http://localhost:3000/api/plaid/${session?.user.id}/reportToken`, {
                access_token: accessToken,
            })
            const report = response.data;
            return report;
        }catch (err) {
            console.log(err);
        }
    }

    const handleReport = () => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const response = await axios.post(
                        `http://localhost:3000/api/plaid/12/report`,
                        {
                            asset_report_token: reportToken,
                        }
                    );
                    const {
                        report: {
                            items: [{ accounts: [{ historical_balances }] }],
                        },
                    } = response.data;
                    resolve(historical_balances);
                } catch (err) {
                    console.log("handleReport Error : ", err);
                    reject(err);
                }
            }, 2000);
        });
    };



    const accessToken = await getAccessToken();
    const reportToken = await getReportToken()
    const report = await handleReport();

    return (
        <div className="w-full h-full flex-col flex justify-between p-5 items-center text-white bg-[#161719]">
            <div className="w-full p-5 h-[150px] rounded-lg bg-[#202123]">info</div>
            <div className="flex w-full h-full mt-5">
                {reportToken && (
                    <Chart balance={100} report={report} />
                )}
                <div className="w-1/4 h-full rounded-lg bg-[#202123] p-5 ml-[10px]">tx history</div>
            </div>
        </div>
    )
}