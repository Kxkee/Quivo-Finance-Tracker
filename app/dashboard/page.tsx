import {createClient} from "@/utils/supabaseServer";
import PlaidLink from "@/components/PlaidLink";
export default async function Portfolio() {
    const supabase = createClient()
    const {data: { session }} = await supabase.auth.getSession()

    return (
        <div className="w-[calc(100%-200px)] h-full flex justify-between p-5 pl-[10px] items-center text-white" style={{backgroundColor: "#141414"}}>
            <div className="bg-[#2C2C2C] p-10 h-full w-[calc(80%-10px)] rounded">
                <PlaidLink id={session?.user?.id} />
            </div>
            <div className="bg-[#2C2C2C] h-full w-[calc(20%-10px)] rounded">
                <div className="w-full flex item-center justify-center p-10">
                    <h3 className="text-xl">Your transaction History</h3>
                </div>
            </div>
        </div>
        )
}