// components/SignInButton.tsx

import { auth, signIn, signOut } from "@/auth"

export async function SignInButton() {
  const session = await auth()

  if (session?.user) {
    console.log(session.user)
    console.log("Session:", session)
    return (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <p className="font-bold text-2xl">{session.user.name}</p>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button type="submit" className="bg-red-500 text-white font-bold py-2 px-4 rounded">Sign Out</button>
        </form>
      </div>
    )
  }

  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Sign in with GitHub</button>
    </form>
  )
}