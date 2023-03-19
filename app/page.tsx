"use client";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
  return (
      <div style={{height: "200vh"}} >
          <div className="w-full h-1/2 bg-black overflow-hidden relative bg-homepage" >
              <div className="h-1/2">
              <div className="flex justify-between p-6 pl-11 pr-11">
                  <img className="w-20" src="/Quivo.svg" alt="Logo" />
                <a className="text-white font-semibold">Sign in</a>
              </div>
              <div className="flex gap-1 font-bold text-5xl justify-center mt-20 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                  <h1>Track all your accounts in <span style={{
                      background: "linear-gradient(180deg, rgba(4,255,120,1) 0%, rgba(0,0,0,0.6993172268907564) 100%)",
                     "-webkit-background-clip": "text",
                      "-webkit-text-fill-color": "transparent"}}>one</span> place</h1>
              </div>
              <div className="flex gap-1  text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 font-bold text-4xl justify-center mt-7">
                    <h3>With our easy-to-use banking app.</h3>
              </div>
              <div className="flex gap-1 text-gray-300 font-semibold text-xl flex-col items-center mt-10">
                    <h4>Quivo is a powerful banking application that</h4>
                    <h4>allows you to easily track all your accounts in one place.</h4>
              </div>
              </div>
              <div className="h-1/2 flex justify-center items-center">
                  <button type="button"
                      className="outline text-white rounded-3xl p-4 pl-10 pr-10 font-bold z-10"
                          onClick={()=> router.push('/register')}
                      >
                      Get Started
              </button>
              </div>
          </div>
          <div className="h-1/2 flex justify-center items-center" style={{backgroundColor: "#141414"}}>
              <div className="w-3/4 h-4/5 rounded-md shadow-lg text-white p-7 pl-20 pr-20 flex flex-col" style={{backgroundColor: "#0F0F0F"}}>
                  <div className="h-1/2 flex gap-5">
                      <div className="w-1/2 flex flex-col justify-center items-end">
                          <h5 className="text-green-500 w-3/4 font-bold text-3xl">Securely Track</h5>
                          <h5 className="w-3/4 font-bold text-3xl">All your Accounts in One Place</h5>
                          <p className="w-3/4 mt-4">we constantly monitor our system</p>
                          <p className="w-3/4">to ensure the highest level of security for our users.</p>
                      </div>
                      <div className=" w-1/2 flex justify-start">
                          <img src="secure.svg" style={{width: "380px"}} />
                      </div>
                  </div>

              </div>
          </div>
      </div>
  )
}
