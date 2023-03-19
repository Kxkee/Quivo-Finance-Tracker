"use client";
import {MdSpaceDashboard} from "react-icons/md";
import {AiOutlineUser} from "react-icons/ai";
import {useSupabase} from "@/components/supabase-provider";

type PropsSideBar = {
    mail: string
}
export default function SideBar({ mail }: PropsSideBar) {

    const {supabase} = useSupabase();
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log({ error });
        }
    };

    return (
        <div className="w-[250px] bg-[#161719] flex items-center pr-[10px] justify-center">
            <div className="bg-[#202123] h-full w-full pt-5 flex flex-col items-center gap-5">
                <div className="w-[195px] h-[70px] flex items-center justify-center pt-5 pb-5 text-white gap-2 border-b-2 border-b-gray-500">
                    <AiOutlineUser size={25} />
                    <a className="text-[15px]">{mail}</a>
                </div>
                <div className="w-[195px] h-[45px] flex items-center justify-start gap-3 p-5 hover:bg-[#009b65] cursor-pointer rounded-lg shadow bg-[#05AF75]">
                    <MdSpaceDashboard color="white" size={25} />
                    <a className="text-white font-md">DashBoard</a>
                </div>
                <div className="w-[195px] h-[45px] flex items-center justify-start gap-3 p-5 hover:bg-[#009b65] cursor-pointer rounded-lg shadow bg-[#05AF75]">
                    <MdSpaceDashboard color="white" size={25} />
                    <button type="button" className="text-white" onClick={handleLogout}>Logout</button>
                </div>

            </div>
        </div>
    )
}