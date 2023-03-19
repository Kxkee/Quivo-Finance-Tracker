import Chart from "@/components/Chart";
import SideBar from "@/components/SideBar";

export default function Loading() {
    return (


    <div className="h-screen w-screen bg-[#161719] flex">
        <SideBar  />
        <div className="h-full] pl-[10px] w-full flex">
            <div className="w-full h-full flex-col flex justify-between p-5 items-center text-white bg-[#161719]">
                <div className="w-full p-5 h-[150px] rounded-lg bg-[#202123]">info</div>
                <div className="flex w-full h-full mt-5">
                    <div className="w-3/4 h-full rounded-lg bg-[#202123] p-5 mr-[10px] animate-pulse" >
                        <div className="w-full h-full bg-[#35373B] rounded-lg"></div>
                    </div>
                    <div className="w-1/4 h-full rounded-lg bg-[#202123] p-5 ml-[10px]">tx history</div>
                </div>
            </div>
        </div>
    </div>
    )
}