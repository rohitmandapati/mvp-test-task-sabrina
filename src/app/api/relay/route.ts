
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function generateAIReply(content: string): Promise<string> {
  return `AI reply to: "${content}"`
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Missing auth header' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { content } = await req.json()

    const {
      data: { user },
    } = await supabase.auth.getUser(token)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: dbUser } = await supabase
      .from('User')
      .select('*')
      .eq('supabaseuid', user.id)
      .single()

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

 
    await supabase.from('Message').insert([
      {
        userId: dbUser.id,
        organizationId: dbUser.organizationId,
        content,
      },
    ])

 
    const aiReply = await generateAIReply(content)


    await supabase.from('Message').insert([
      {
        userId: dbUser.id,
        organizationId: dbUser.organizationId,
        content: aiReply,
      },
    ])

    return NextResponse.json({ status: 'ok', reply: aiReply })
  } catch (err) {
    console.error('Error in /api/relay:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
