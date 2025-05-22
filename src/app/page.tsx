'use client'

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import Tenis from "./components/Tenis";
import Aparelhos from "./components/Aparelhos";
import RoupaFem from "./components/RoupaFem";
import RoupaMasc from "./components/RoupaMasc";
import { useCategoria } from "./context/CategoriaContext";
import ListaGenerica from "./components/ListaGenerica";




export default function Home() {

  const { categorias, limparCategorias } = useCategoria();

  const renderCategoria = (categoria: string) => {
    switch (categoria) {
      case "tênis":
        return <Tenis key={categoria} />;
      case "aparelhos":
        return <Aparelhos key={categoria} />;
      case "roupas femininas":
        return <RoupaFem key={categoria} />;
      case "roupas masculinas":
        return <RoupaMasc key={categoria} />;
      default:
        return <ListaGenerica key={categoria} categoria={categoria} />
    }
  };


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            {/* <button
              onClick={limparCategorias}
              className="ml-4 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
            >
              Limpar Categorias
            </button> */}
          </div>
        </header>
        <div className="py-16">{categorias.map(renderCategoria)}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
