"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const signIn = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to continue to Chat
          </p>
        </div>

        <form onSubmit={signIn} className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded px-4 py-2"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <div>Or continue with</div>
          <div className="flex gap-2 justify-center mt-3">
            <button className="px-3 py-2 border rounded">Google</button>
            <button className="px-3 py-2 border rounded">GitHub</button>
          </div>
          <div className="mt-4">
            Don't have an account?
            <a href="/signup" className="text-blue-600">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
