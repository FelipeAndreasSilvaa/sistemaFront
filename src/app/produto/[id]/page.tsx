"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../../components/ui/sidebar";
import { AppSidebar } from "../../../components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import Image from "next/image";

type Produto = {
  _id: string;
  name: string;
  categoria: string;
  preco: string;
  imagem: string;
};

const ProdutoDetalhe = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:3001/Get_Produto/${id}`)
      .then((response) => {
        setProduto(response.data);
      })
      .catch((err) => {
        setError("Erro ao buscar o produto.");
        console.error("Erro ao buscar produto:", err);
      });
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {produto.imagem && (
            <div className="w-full md:max-w-2xl lg:max-w-3xl relative h-72 sm:h-96">
              <Image
                src={`http://localhost:3001${
                  produto.imagem.startsWith("/uploads") ? produto.imagem : "/uploads/" + produto.imagem
                }`}
                alt={produto.name}
                width={350}
                height={350}
                className="object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          <div className="w-full md:flex-1 flex flex-col items-start gap-y-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">{produto.name}</h1>
            <p className="text-base sm:text-lg text-gray-600">{produto.categoria}</p>
            <p className="text-xl sm:text-2xl font-semibold text-green-600">R$ {produto.preco}</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full">
              <button className="w-full sm:w-[250px] px-9 py-3 bg-green-500 text-white rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                Adicionar ao carrinho
              </button>
              <Link href="/Compra" className="w-full sm:w-[250px]">
                <button className="w-full px-6 py-3 bg-primary text-white rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                  Comprar Produto
                </button>
              </Link>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProdutoDetalhe;
