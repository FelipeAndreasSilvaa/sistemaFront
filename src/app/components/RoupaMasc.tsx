"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from "next/image";


type Produto = {
  _id: string;
  name: string;
  categoria: string;
  preco: string;
  imagem: string;
}
const RoupaMasc = () => {
  const [produtos, setProdutos] = useState<Produto[]>([])
  
  useEffect(() => {
    axios.get('http://localhost:3001/Get_Produto')
      .then(res => {
        const filtrados = res.data.filter((produto: Produto) =>
          produto.categoria.toLowerCase() === 'roupas masculinas'
        );
        setProdutos(filtrados);
      })
      .catch(err => console.log("Erro ao buscar produto", err));
  }, []);
  
  return (
    <div className="container mx-auto px-4 mb-4">
      <h2 className="text-3xl font-bold text-black mb-8">Roupas Masculinas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {produtos.length === 0 ? (
      <p className="text-center text-gray-700 text-lg">Nenhum produto encontrado para essa categoria.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {produtos.map((produto) => (
          <div
            key={produto._id}
            className="bg-black rounded-lg shadow-lg p-6 sm:p-8"
          >
            <div className="relative overflow-hidden h-64 sm:h-72 rounded-md">
              <Image
                src={`http://localhost:3001${
                  produto.imagem.startsWith("/uploads")
                    ? produto.imagem
                    : "/uploads/" + produto.imagem
                }`}
                alt={produto.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Link href={`/produto/${produto._id}`}>
                  <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">
                    View Product
                  </button>
                </Link>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-4">
              {produto.name}
            </h3>
            <p className="text-white text-sm mt-2">{produto.categoria}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-2 sm:gap-0">
              <span className="text-white font-bold text-lg">
                R$ {Number(produto.preco).toFixed(2)}
              </span>
              <button className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
      </div>
    </div>
  );
}

export default RoupaMasc