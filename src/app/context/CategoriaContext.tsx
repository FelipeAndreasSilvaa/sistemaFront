"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface CategoriaContextType {
  categorias: string[];
  adicionarCategoria: (nova: string) => void;
  limparCategorias: () => void;

}

const CategoriaContext = createContext<CategoriaContextType | undefined>(undefined);

export const CategoriaProvider = ({ children }: { children: ReactNode }) => {
  const [categorias, setCategorias] = useState<string[]>([]);

  // Carregar categorias do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem("categorias");
    if (stored) {
      setCategorias(JSON.parse(stored));
    } else {
      setCategorias(["tênis", "aparelhos", "roupas masculinas", "roupas femininas"]);
    }
  }, []);

  const adicionarCategoria = (nova: string) => {
    const categoriaFormatada = nova.toLowerCase();
    if (!categorias.includes(categoriaFormatada)) {
      const novas = [...categorias, categoriaFormatada];
      setCategorias(novas);
      localStorage.setItem("categorias", JSON.stringify(novas)); // Salvar
    }
  };

  const limparCategorias = () => {
    setCategorias([]);
    localStorage.removeItem("categorias");
  };

  return (
    <CategoriaContext.Provider value={{ categorias, adicionarCategoria, limparCategorias  }}>
      {children}
    </CategoriaContext.Provider>
  );
};

export const useCategoria = () => {
  const context = useContext(CategoriaContext);
  if (!context) throw new Error("useCategoria deve ser usado dentro de CategoriaProvider");
  return context;
};
