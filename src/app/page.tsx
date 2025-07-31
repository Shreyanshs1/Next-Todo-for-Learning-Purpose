// src/app/page.tsx

import { SignInButton } from "@/src/app/components/SignInButton";
import { auth } from "@/auth";
import TodoComponent from "@/src/app/components/TodoComponent";

export default async function Home() {
  const session = await auth();

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <SignInButton />
      {session?.user?.id && <TodoComponent userId={session.user.id} />}
    </main>
  );
}
