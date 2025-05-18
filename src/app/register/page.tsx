"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import axios from 'axios'
import { useRouter } from 'next/navigation';

type Errors = {
  name?: string;
  email?: string;
  password?: string;
};

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState<Errors>({})
  const [message, setMessage] = useState('')
  const [messageType] = useState<"success" | "error" | null>(null);


  const router = useRouter()


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errors: Errors = {};

    if(!name) errors.name = "PREENCHA O CAMPO NOME."
    if(!email) errors.email = "PREENCHA O CAMPO EMAIL"
    if(!password) errors.password = "PREENCHA O CAMPO PASSWORD"

    if(Object.keys(errors).length > 0){
      setError(errors)
      return
    }

    axios.post('http://localhost:3001/register', {name,email, password})
      .then(result => {
        console.log(result);
        setMessage("Usuario encontrado!")
        setTimeout(() => {
          router.push('/login')
        }, 1000)
        
      })
    
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="bg-blue-500 text-white p-8 md:p-12 md:w-1/2 relative overflow-hidden">
        <div className="z-10 relative">
          <h2 className="text-2xl font-bold mb-6">Your Logo</h2>
          <div className="mt-20 md:mt-32">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sign in to</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Lorem Ipsum is simply
            </h2>
            <p className="max-w-md opacity-90">
              Lorem Ipsum has been the industry&rsquo;s standard dummy text ever since the 1500s.
            </p>

          </div>
        </div>

        <div className="absolute right-0 top-1/3 transhtmlForm translate-x-1/4">
          <div className="relative w-64 h-64">
            <svg
              className="text-white/20 absolute top-10 left-10 w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>

            <svg
              className="text-white/20 absolute bottom-10 right-10 w-20 h-20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>

            <div className="absolute top-1/2 left-1/2 transhtmlForm -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-40 h-40">
                <svg
                  className="text-orange-400 w-40 h-40 transhtmlForm rotate-45"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <svg
          className="text-white/20 absolute bottom-10 left-10 w-24 h-24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      </div>

      <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
          <div className="mb-8">
            <p className="text-gray-600 mb-1">
              Welcome to <span className="text-blue-500 font-bold">LOREM</span>
            </p>
            <h1 className="text-4xl font-bold">Cadastro</h1>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Preencha seu nome"
                  className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
               />
                {error.name && <p className="text-sm text-red-600">{error.name}</p>}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Preencha seu Email"
                  className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                />
                {error.email && <p className="text-sm text-red-600">{error.email}</p>}

              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Preencha sua senha"
                  className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                />
                {error.password && <p className="text-sm text-red-600">{error.password}</p>}

                <div className="text-right">
                  <Link href="#" className="text-blue-500 text-sm">
                    Esqueceu senha
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-200"
              >
                Cadastrar
              </button>
            </div>
            {message && (
            <p className={`text-sm ${messageType === "success" ? "text-red-500" : "text-green-500"}`}>
              {message}
            </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register