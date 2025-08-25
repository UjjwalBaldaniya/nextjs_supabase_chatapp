'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const signIn = async () => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert(error.message);
  } else {
    router.refresh(); 
    router.push('/');
  }
};

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        placeholder="Email"
        className="border p-2 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        className="border p-2 rounded"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn} className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}
