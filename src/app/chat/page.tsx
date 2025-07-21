// app/chat/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '.././../../lib/supabaseClient'

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
    }

    getSession()
    fetchMessages()
  }, [])
  
  const fetchMessages = async () => {
    const { data, error } = await supabase.from('Message').select('*').order('createdAt', { ascending: true })
    if (data) setMessages(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    await fetch('/api/relay', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session?.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: message }),
    })
    
    setMessage('')
    fetchMessages()
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      <div className="border p-4 h-96 overflow-y-auto space-y-2 bg-gray-50 rounded">
        {messages.map((msg) => (
          <div key={msg.id} className="p-2 bg-black border rounded shadow ">
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex mt-4 gap-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  )
}
