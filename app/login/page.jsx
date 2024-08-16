// app/login/page.js
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <>
          <button onClick={() => signIn('google',{ callbackUrl: '/' })}>Sign in with Google</button>
        </>
      ) : (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
        </>
      )}
    </div>
  );
}
