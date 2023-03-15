"use client";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {createBrowserSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {useSupabase} from "@/components/supabase-provider";

export default function Login() {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const router = useRouter();
    const {supabase} = useSupabase();
    const signInWithEmail = async() => {
        try {
            if(email && password) {
                const response = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                const user = response.data;
                console.log(user)
               }
        }catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="w-full h-screen flex justify-center items-center" style={{backgroundColor: "#141414"}}>
            <div className="w-1/2 h-2/3 shadow-lg rounded-md flex flex-col justify-center items-center" style={{backgroundColor: "#0F0F0F"}}>
                <h2 className="text-white text-4xl font-bold mb-10">Sign in 🟢</h2>
                <form className="w-1/2 h-2/3 flex flex-col justify-center">
                    <div className="flex flex-col gap-2">
                        <label className="text-white">Email</label>
                        <input type="text"
                               placeholder="You@example.com"
                               className="bg-gray-50 p-2 rounded-md"
                               onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-2 mt-10">
                        <label className="text-white">Password</label>
                        <input type="password"
                               placeholder="password"
                               className="bg-gray-50 p-2 rounded-md"
                               onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-2 mt-12">
                        <button type="button"
                                className="bg-green-400 text-white rounded-md p-2 font-bold hover:bg-green-500"
                                onClick={signInWithEmail}>
                            Sign in
                        </button>
                        <div className="flex w-full gap-1 text-white justify-center mt-5">
                            <a>You don't have an account ?</a><a href="/register" className="text-green-100">Sign up here</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
