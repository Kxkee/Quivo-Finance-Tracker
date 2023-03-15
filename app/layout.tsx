import 'server-only'
import SupabaseListener from '../components/supabase-listener';
import SupabaseProvider from '../components/supabase-provider';
import './globals.css'
import { createClient } from '@/utils/supabaseServer';
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default async function RootLayout({ children }) {
  const supabase = createClient()

  const {data: { session }} = await supabase.auth.getSession()

  return (
      <html lang="en">

      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
              rel="stylesheet" />
      </head>
      <body>
      <SupabaseProvider>
        <SupabaseListener serverAccessToken={session?.access_token} />
          <div className="h-screen bg-[#141414]">
              <Header email={session?.user?.email} />
              <div className="h-[calc(100vh-70px)] flex">
                  <SideBar />
                  {children}
              </div>
          </div>

      </SupabaseProvider>
      </body>
      </html>
  )
}