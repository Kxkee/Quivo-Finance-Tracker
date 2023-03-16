"use client";
import {MdSpaceDashboard} from "react-icons/md";
export default function SideBar() {
    return (
        <div className=" w-[200px] bg-[#161719] flex items-center  pr-[10px] justify-center">
            <div className="bg-[#202123] h-full w-full pt-5">
                <div className="w-full flex items-center justify-around p-5 hover:bg-[#232323] cursor-pointer">
                    <a className="text-white font-semibold">DashBoard</a>
                </div>
            </div>
        </div>
    )
}