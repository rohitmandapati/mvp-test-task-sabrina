# Chat MVP — Technical Test Task (4-Hour Limit)

This task is designed to confirm your practical skills with Supabase, Prisma, Next.js 15, and TypeScript. It should be completed in **no more than four (4) consecutive hours**. Focus on correctness, security, and clarity rather than polish.

---

## 1. Objectives

1. Model a secure, multi-tenant, AI chat schema with Prisma.  
2. Enforce row-level security (RLS) in Supabase so each user sees only messages belonging to their organization.  
3. Implement an Edge Function that persists user messages.  
4. Provide a minimal UI to demonstrate authentication and basic chat flow.  
5. Document your work so another developer can run the project end-to-end.

---

## 2. Required Stack

* Next.js 15 (App Router)  
* Tailwind CSS  
* TypeScript  
* Prisma (PostgreSQL)  
* Supabase (Auth, RLS, Edge Functions)  

---

## 3. Functional Requirements

| # | Item | Details |
|---|------|---------|
| 1 | **Prisma schema** | Create `Organization`, `User`, and `Message` models. Use UUID/CUID ids and proper `@relation` fields. Include a `Role` enum (`ADMIN`, `STUDENT`). |
| 2 | **Supabase Auth** | Email login (magic link or email + password). |
| 3 | **RLS policies** | Users must be able to read and insert messages *only* for their own `organizationId`. Enforce in SQL. |
| 4 | **Edge Function `/api/relay`** | Authenticates request (Supabase JWT), accepts `{ content: string }`, looks up user via auth.uid() and their organizationId, inserts a `Message` row with correct user/org linkage, returns JSON `{ status: "ok" }`. |
| 5 | **Minimal UI** | *Login page* and *chat page*.<br>– Display list of messages/responses for the logged-in org. Input box that POSTs to `/api/relay`. Styling can be bare; functionality must work. |
| 6 | **Chat Message UI** | Simple chat UI with send button. On submit, input must POST to the Edge Function
| 7 | **Documentation** | Update the provided `DOCUMENTATION.md` with setup instructions, RLS rationale, and any assumptions or trade-offs. |

---

## 4. Bonus (optional, only if you finish the core scope early)

* UI that displays messages and responses from AI bot (from stub, not real implementation)

---

## 5. Setup Expectations

A final documentation file `DOCUMENTATION.md` must include:

1. Supabase project setup (CLI or dashboard) and required environment variables.  
2. Commands to run migrations (`prisma db push`, SQL, or Supabase migrations).  
3. How to start the Next.js dev server and test the chat flow.  
4. Must explain each directory, include how each task was accomplished and split up. 
5. Include a filled out .env.example of environment values (obviously, do not provide real values).
6. Do not implement the AI response or call external API, use the stub. src/app/api/route.ts contains stub for generating AI response. Use any additional structure you prefer as long as it is logical and documented.

---

## 6. Submission

* Push your work to this repository in meaningful commits.  
* Ensure the project starts with `npm install` and `npm run dev`. 
* When finished, notify me with a brief summary of what is working, any incomplete parts, and estimated remaining effort if applicable.

---

Good luck. If anything in this brief is unclear, ask concise questions before you begin—the four-hour timer starts once you actively begin implementation. You will be assessed holistically on the produced repo.
