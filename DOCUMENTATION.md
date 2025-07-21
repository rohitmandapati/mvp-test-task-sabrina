Use this file for documentation.
 # Supabase Project Setup

 ## Using Supabase Dashboard
Go to https://supabase.com, create a new project and note the Project URL and API keys.
Create the following tables:
1. User: with fields id, supabaseUid, organizationId.
2. Message: with fields id, content, userId, organizationId, createdAt.
3. Enable Row-Level Security (RLS) and create appropriate policies.

## Environment Variables

Set the following in .env.local:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

##  Run Migrations
you can run the migration using 
npx prisma db push
You can sync tables directly via Supabase UI or use the CLI:
npx supabase db push


## Start the Dev Server & Test Chat Flow

npm install
npm run dev
Then go to http://localhost:3000/login 
dummy data for test (bugsndev@gmail.com password: bugs123)


Steps to test:
log in using Supabase Auth.
Type a message in the input box.
Click "Send" — your message should be stored in Supabase.

The server will generate a mock/stub reply 

## Project Directory Structure

.
├── src/
│   ├── app/
│   │   ├── chat/
│   │   │   └── page.tsx        # Chat UI component
│   │   └── api/
│   │       └── relay/
│   │           └── route.ts    # Handles POST requests, stores message
├── supabase/
│   └── functions/
│       └── relay/
│           └── index.ts        # Optional: Supabase Edge Function (not used directly)
├── lib/
│   └── supabaseClient.ts       # Supabase JS client setup
├── .env.local                  # Local environment config (not committed)
├── .env.example                # Example env file
└── DOCUMENTATION.md           # You're reading this
## Task Breakdown
Task	||                        Description
Setup Supabase	            Created project, tables, enabled RLS
User Auth	                Used Supabase Auth client to get session token
Save Message	            /api/relay/route.ts handles inserting messages
Chat UI	                    Built in page.tsx, uses useEffect and fetch()
Edge Function	            Present in Supabase, not used — local API is used instead
AI Reply	                Stub implemented, no external API calls