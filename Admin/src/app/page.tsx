'use client'

import { auth } from "@/auth";
import HomePage from "@/components/layouts/home";
import Navbar from "@/components/layouts/navbar";
import { SessionProvider } from "next-auth/react";

export default function Home() {
 
  return (
    <SessionProvider>
      <Navbar/>
      <HomePage/>
      </SessionProvider>
   
  );
}
