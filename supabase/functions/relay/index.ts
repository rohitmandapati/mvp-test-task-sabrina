// supabase/functions/relay/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'
import error from 'next/error'

serve(async (req) => {
  const { content } = await req.json()

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { data: userData } = await supabase
    .from('User')
    .select('id, organizationId')
    .eq('supabaseUid', user.id)
    .single()

  if (!userData)
    return new Response('User not found in DB', { status: 404 })

  await supabase.from('Message').insert({
    content,
    userId: userData.id,
    organizationId: userData.organizationId,
  })

  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
