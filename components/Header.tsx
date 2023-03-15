"use client";
import {useSupabase} from "@/components/supabase-provider";
type HeaderProps = {
    email: string | undefined
}
export default function Header(props: HeaderProps) {
    const {supabase} = useSupabase();
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log({ error });
        }
    };
    return (
        <div className="h-[70px] flex justify-between items-center bg-[#2C2C2C] pl-5 pr-5">
            <img src="/Quivo.svg" alt="Logo" />
            <div className="flex w-[300px] justify-around">
                <button type="button" className="text-white" onClick={handleLogout}>Logout</button>
                <a className="text-white">
                    {props.email}
                </a>
            </div>
        </div>
    )
}