"use client";

import { useState } from "react";
import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const Signup = () => {
  const [inputMessage, setInputMessage] = useState({
    email: "",
    name: "",
    password: "",
    address: "",
  });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDisabled, setDisabled] = useState(true);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    validSignup();
  };

  const validSignup = () => {
    if (
      inputMessage.email.length < 5 ||
      inputMessage.name.length < 5 ||
      inputMessage.password.length < 5 ||
      inputMessage.address.length < 5
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-200 text-white p-4">
      <header className="sticky top-0 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
        Resonance
      </header>
      
      <h1 className="text-xl font-bold mb-4 text-black">Sign Up for an Account</h1>
      
      <form onSubmit={handleSignup} className="bg-black p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            value={inputMessage.email}
            required
            placeholder="Enter your email"
            className="bg-black border border-purple-600 p-3 rounded-md"
            onChange={(e) => {
              validSignup();
              setInputMessage((prev) => ({ ...prev, email: e.target.value }));
            }}
          />

          <Input
            type="text"
            value={inputMessage.name}
            required
            placeholder="Enter your name"
            className="bg-black border border-purple-600 p-3 rounded-md"
            onChange={(e) => {
              validSignup();
              setInputMessage((prev) => ({ ...prev, name: e.target.value }));
            }}
          />

          <Input
            type="password"
            value={inputMessage.password}
            required
            placeholder="Enter your password"
            className="bg-black border border-purple-600 p-3 rounded-md"
            onChange={(e) => {
              validSignup();
              setInputMessage((prev) => ({ ...prev, password: e.target.value }));
            }}
          />

          <Input
            type="text"
            value={inputMessage.address}
            required
            placeholder="Enter your address"
            className="bg-black border border-purple-600 p-3 rounded-md"
            onChange={(e) => {
              setIsDropdownVisible(e.target.value.length > 0);
              validSignup();
              setInputMessage((prev) => ({ ...prev, address: e.target.value }));
            }}
            onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)}
            onFocus={() =>
              inputMessage.address.length > 0 && setIsDropdownVisible(true)
            }
          />
          {isDropdownVisible && (
            <ul className="relative bg-black border border-purple-600 rounded-md mt-1 w-full shadow-md z-10">
              <li className="p-2 cursor-pointer hover:bg-purple-500">Suggestion</li>
            </ul>
          )}
          
          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full p-3 rounded-md font-bold text-white transition duration-300 ${isDisabled ? 'bg-purple-500 opacity-50 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
           <Link href="/">Signup</Link>
          </button>
        </div>
      </form>

      <button className="mt-4 text-purple-400 hover:underline">
        <Link href="/login">Already have an account? Login here</Link>
      </button>
    </div>
  );
};

export default Signup;
