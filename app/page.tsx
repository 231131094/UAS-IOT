'use client'

import Link from "next/link";
import "./pagestyle.css";
import { register } from "./auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = async () => {
    setError("")
    try{
      await register(email,password)
      router.push("/halaman/login")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch (err : any){
      setError(err.message)
    }
  }
  return (
    <main className="container">
      <div className="card">
        {/* bagian kirinya */}
        <div className="left">
          <h2>Welcome Back!</h2>
          <p>
            To keep connected with us, please login <br />
            with your personal information
          </p>
          <Link href="/halaman/login" className="btn-outline">
            Sign In
          </Link>
        </div>

        {/* container bgn kanan */}
        <div className="right">
          <h1>CREATE ACCOUNT</h1>

          <div className="form-box">
            <input 
              type="text" 
              placeholder="Username" 
            />
            <input 
              type="email" 
              placeholder="Email" 
              onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button className="btn-outline small" onClick={handleRegister}>Sign Up</button>
          </div>
        </div>
      </div>
    </main>
  );
}
