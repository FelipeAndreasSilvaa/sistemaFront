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
    axios.get("https://sistemaback-h033.onrender.com/session", { withCredentials: true })
      .then(res => {
        console.log("Resposta da sessão:", res.data) // <-- Aqui para debug
        if (res.data.loggedIn) {
          setName(res.data.user.name)
        } else {
          router.push("/login")
        }
      })
      .catch(err => {
        setError("Erro ao verificar sessão")
        router.push("/login")
      })
      .finally(() => {
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
