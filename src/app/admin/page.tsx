"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

const Admin = () => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    console.log("Verificando sessão...")

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/session`, { withCredentials: true })
      .then(res => {
        console.log("Resposta da API /session:", res.data)

        if (res.data.loggedIn) {
          setName(res.data.user.name)
          console.log("Usuário autenticado:", res.data.user.name)
        } else {
          console.warn("Usuário não autenticado, redirecionando para /login")
          router.push("/login")
        }
      })
      .catch((err) => {
        console.error("Erro ao verificar sessão:", err)
        setError("Erro ao verificar sessão")
        router.push("/login")
      })
      .finally(() => {
        console.log("Verificação de sessão finalizada")
        setLoading(false)
      })
  }, [router])

  if (loading) return <p>Carregando...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Painel de Administração</h1>
        {name && <p className="text-lg text-gray-600 mb-6">Bem-vindo, <span className="font-semibold">{name}</span> 👋</p>}
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Voltar para a Home
        </button>
      </div>
    </div>
  )
}

export default Admin
