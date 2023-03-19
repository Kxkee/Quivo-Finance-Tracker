import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    const supabase = createMiddlewareSupabaseClient({ req, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()


    const url = req.nextUrl.pathname;

    switch(url) {
        case '/dashboard':
            if (!session) {
                // Auth condition not met, redirect to home page.
                const redirectUrl = req.nextUrl.clone();
                redirectUrl.pathname = '/';
                return NextResponse.redirect(redirectUrl);
            }
            break;

    }


    return res
}