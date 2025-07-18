// This file includes the stub function you will call to generate a reply. Do not implement it. 
// It also includes the recieving end of the POST function to ensure that he message is received
// and contains content.

import { NextRequest, NextResponse } from 'next/server'

// Stub utility function
async function generateText(_prompt: string): Promise<string> {
    return 'reply message'
}

// POST checker
export async function POST(req: NextRequest) {
    try {
        const { content } = await req.json()

        if (!content) {
            return NextResponse.json({ error: 'Missing `content` field' }, { status: 400 })
        }   

        const reply = await generateText(content)

        return NextResponse.json({ status: 'ok', reply })
    } catch (err) {
        console.error('Edge Function /api/relay error:', err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
