'use client';
import { useState } from "react";
import "./loginstyle.css";
import { login } from "@/app/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter()
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [error , setError ] = useState("")

  const handleLogin = async ()=>{
    setError("")
    try{
      await login (email,password)
      alert("Berhasil Login")
      router.push("/halaman/dashboard")
      

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err : any){
      alert("Error Login")
      setError(err.message)
    }
  }
  return (
    <main className="login-wrap">
      <div className="login-topbar" />

      <h1 className="login-title">SMART HOME</h1>

      <section className="login-card">
        <div className="login-fields">
          <input 
            className="email" 
            type="email" 
            placeholder="Email" 
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            className="password"
            type="password"
            placeholder="Password"
            onChange={(e)=>{setPassword(e.target.value)}}
          />

          <button 
            className="login-btn" 
            type="button"
            onClick={handleLogin }
            >
            Log In
          </button>

          <p className="login-footer">
            New User? <a href="#">Register</a>
          </p>
        </div>
      </section>
    </main>
  );
}
