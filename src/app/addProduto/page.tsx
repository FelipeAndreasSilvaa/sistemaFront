"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useCategoria } from '../context/CategoriaContext';

type FormErros = {
  nomeProd?: string;
  descricao?: string;
  preco?: string;
  categoria?: string;
};


const AddProduto = () => {
  const [nomeProd, setnomeProd] = useState('')
  const [descricao, setdescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [categoria, setCategoria] = useState('')
  const { categorias, adicionarCategoria } = useCategoria();

  const [imagem, setImagem] = useState<File | null>(null);


  const [error, setError] = useState<FormErros>({});
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const valorComPrimeiraMaiuscula = valor.charAt(0).toUpperCase() + valor.slice(1);
    setCategoria(valorComPrimeiraMaiuscula);
  };
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const errors: Record<string, string> = {};
  
    if (!nomeProd.trim()) errors.nomeProd = "PREENCHA O CAMPO NOME DO PRODUTO";
    if (!descricao.trim()) errors.descricao = "PREENCHA O CAMPO DESCRIÇÃO";
    if (!preco.trim()) errors.preco = "PREENCHA O CAMPO PREÇO";
    if (!categoria.trim()) errors.categoria = "PREENCHA O CAMPO CATEGORIA";
  
    if (Object.keys(errors).length > 0) {
      setError(errors);
      setMessage("Preencha todos os campos obrigatórios.");
      setMessageType("error");
      return;
    }

    if (!categorias.includes(categoria)) {
      adicionarCategoria(categoria);
    }

  
    const data = new FormData();
    data.append('name', nomeProd);
    data.append('descricao', descricao);
    data.append('categoria', categoria);
    data.append('preco', preco);
    if (imagem) {
      data.append('imagem', imagem);
    }
  
    try {
      await axios.post('http://localhost:3001/Add_Produto', data);
      setMessage("Produto adicionado com sucesso!");
      setMessageType("success");
  
      // limpa campos
      setnomeProd('');
      setdescricao('');
      setPreco('');
      setCategoria('');
      setImagem(null);
      setError({});
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      setMessage("Erro ao adicionar produto.");
      setMessageType("error");
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 bg-white rounded-md shadow-md overflow-hidden"
    >
      <div className="px-6 py-4 bg-gray-900 text-white">
        <h1 className="text-lg font-bold">Adicionar produto</h1>
      </div>

      <div className="px-6 py-4">
        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              messageType === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Nome */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="nomeProd"
          >
            Nome do produto
          </label>
          <input
            id="nomeProd"
            type="text"
            value={nomeProd}
            onChange={(e) => setnomeProd(e.target.value)}
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700"
          />
          {error.nomeProd && (
            <p className="text-red-600 text-sm">{error.nomeProd}</p>
          )}
        </div>

        {/* Descrição */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="descricao"
          >
            Descrição
          </label>
          <input
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => {
                setdescricao(e.target.value);
              }}
              placeholder="Digite ou selecione a categoria"
              className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700"
            />
          {error.descricao && (
            <p className="text-red-600 text-sm">{error.descricao}</p>
          )}
        </div>

        {/* Categoria */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="categoria"
          >
            Categoria (selecione ou digite)
          </label>
          <input
            list="listaCategorias"
            id="categoria"
            value={categoria}
            onChange={handleCategoriaChange}
            placeholder="Digite ou selecione a categoria"
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700"
          />
          <datalist id="listaCategorias">
            {categorias.map((cat, index) => (
              <option key={index} value={cat} />
            ))}
          </datalist>

          {error.categoria && (
            <p className="text-red-600 text-sm">{error.categoria}</p>
          )}
        </div>

        {/* Preço */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="preco">
            Preço
          </label>
          <input
            id="preco"
            type="text"
            inputMode="decimal"
            pattern="^\d+(\.\d{0,2})?$"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700"
          />

          {error.preco && <p className="text-red-600 text-sm">{error.preco}</p>}
        </div>

        {/* Imagem */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="imagem"
          >
            Imagem do produto
          </label>
          <input
            id="imagem"
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files?.[0] || null)}
            className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 cursor-pointer w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Adicionar produto!
        </button>
      </div>
    </form>
  );
};

export default AddProduto;
