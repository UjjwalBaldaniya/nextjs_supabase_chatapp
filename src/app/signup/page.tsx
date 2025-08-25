'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for confirmation!');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Sign Up</h2>
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
      <button onClick={signUp} className="bg-green-600 text-white px-4 py-2 rounded">
        Sign Up
      </button>
      <p>
        Already have an account? <a href="/login" className="text-blue-500">Login</a>
      </p>
    </div>
  );
}
