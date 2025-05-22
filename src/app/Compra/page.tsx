"use client";
import  { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { CreditCard } from "lucide-react";



const Compra = () => {
  
  const [nome, setNome] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  const [produtos, setProdutos] = useState([]);

  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const router = useRouter();


  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("cart");
    if (carrinhoSalvo) {
      setProdutos(JSON.parse(carrinhoSalvo));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!nome) errors.nome = "Preencha o nome do destinatário";
    if (!numeroCartao) errors.numeroCartao = "Preencha o número do cartão";
    if (!validade) errors.validade = "Preencha a validade";
    if (!cvv) errors.cvv = "Preencha o CVV";

    if (!numeroCartao || numeroCartao.replace(/\s/g, "").length !== 16) {
      errors.numeroCartao = "Número do cartão inválido";
    }
    
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(validade)) {
      errors.validade = "Data inválida (formato MM/AA)";
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      errors.cvv = "CVV inválido";
    }
    
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

      // Se passou na validação
      setMessage("Pagamento realizado com sucesso!");
      setMessageType("success");

      setTimeout(() => {
        router.push("/Obrigado");
      }, 1500);

  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row items-center gap-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md p-6 rounded-xl w-[400px] mx-auto"
          >
            <div className="bg-[#0f172a] text-white rounded-t-xl px-6 py-4 -mt-6 -mx-6 mb-4">
              <h1 className="text-2xl font-bold">Pagamento</h1>
            </div>
            {produtos.length > 0 && (
              <div className="mb-6 w-full flex flex-col gap-4">
                {produtos.map((produto) => (
                  <div key={produto._id} className="flex items-center gap-4">
                    <img
                    src={`http://localhost:3001${produto.imagem}`}
                    alt={produto.name}
                      className="w-20 h-20 object-contain rounded"
                    />
                    <div>
                      <h2 className="text-lg font-bold">{produto.name}</h2>
                      <p className="text-gray-600">R$ {produto.preco}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-800 font-medium mb-1">
                Nome do destinatário
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-md py-2 px-4 w-full"
                placeholder="Alex Smith"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  if (error.nome) setError((prev) => ({ ...prev, nome: "" }));
                }}
              />
              {error.nome && (
                <p className="text-sm text-red-600 mt-1">{error.nome}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-800 font-medium mb-1">
                Número do cartão
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md py-2 px-4 pr-10 w-full"
                  placeholder="1234 123 1234 1234"
                  value={numeroCartao}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, ""); // remove tudo que não é número
                    value = value.replace(/(.{4})/g, "$1 ").trim(); // adiciona espaço a cada 4 números
                    setNumeroCartao(value);
                    if (error.numeroCartao) setError((prev) => ({ ...prev, numeroCartao: "" }));
                  }}
                  
                />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 h-5 w-5" />
              </div>
              {error.numeroCartao && (
                <p className="text-sm text-red-600 mt-1">
                  {error.numeroCartao}
                </p>
              )}
            </div>

            <div className="flex justify-between gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-800 font-medium mb-1">
                  Validade
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md py-2 px-4 w-full"
                  placeholder="MM/YY"
                  value={validade}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
                    if (value.length > 5) value = value.slice(0, 5);
                    setValidade(value);
                    if (error.validade) setError((prev) => ({ ...prev, validade: "" }));
                  }}
                  
                />
                {error.validade && (
                  <p className="text-sm text-red-600 mt-1">{error.validade}</p>
                )}
              </div>

              <div className="w-1/2">
                <label className="block text-gray-800 font-medium mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md py-2 px-4 w-full"
                  placeholder="..."
                  value={cvv}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setCvv(value);
                    if (error.cvv) setError((prev) => ({ ...prev, cvv: "" }));
                  }}
                />
                {error.cvv && (
                  <p className="text-sm text-red-600 mt-1">{error.cvv}</p>
                )}
              </div>
            </div>
          
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded-full transition-colors duration-300"
            >
              Realizar compra
            </button>

            {message && (
              <p
                className={`mt-4 text-sm font-medium ${
                  messageType === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
  };

export default Compra;
