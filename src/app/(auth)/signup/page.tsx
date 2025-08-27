"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [signUpInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signUpFields = [
    {
      name: "name",
      placeholder: "Name",
      type: "text",
    },
    {
      name: "email",
      placeholder: "Email",
      type: "email",
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpInput((prev) => ({ ...prev, [name]: value }));
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Step 1: Sign up user with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: signUpInput.email,
        password: signUpInput.password,
        options: {
          data: {
            name: signUpInput.name,
          },
        },
      });

      if (signUpError) {
        toast.error(signUpError.message);
        return;
      }

      const user = data.user;
      if (!user) {
        toast.error("User creation failed.");
        return;
      }

      // Step 2: Create user profile in backend
      const response = await fetch("http://localhost:4000/api/v1/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          full_name: signUpInput.name,
          username: signUpInput.email.split("@")[0],
          avatar_url: "",
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Failed to create profile.");
        return;
      }

      toast.success("Sign-up successful! Please check your email.");
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="text-sm text-gray-500 mt-1">Sign up to use Chat</p>
        </div>

        <form onSubmit={signUp} className="space-y-4">
          {signUpFields.map((field) => (
            <input
              key={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={signUpInput[field.name as keyof typeof signUpInput]}
              className="w-full border rounded px-3 py-2"
              onChange={handleChange}
            />
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
