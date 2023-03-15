"use client";
import {MdSpaceDashboard} from "react-icons/md";
export default function SideBar() {
    return (
        <div className=" w-[200px] bg-[#141414] flex items-center p-5 pr-[10px] justify-center">
            <div className="bg-[#2C2C2C] h-full w-full rounded pt-5">
                <div className="w-full flex items-center justify-around p-5 hover:bg-[#232323] cursor-pointer">
                    <MdSpaceDashboard color="white" size={20} />
                    <a className="text-white font-semibold">DashBoard</a>
                </div>
            </div>
        </div>
    )
}