import Link from 'next/link'
import React from 'react'

const Obrigado = () => {
  return (
    <div className="h-screen w-full bg-black dark:bg-gray-100">
    <div className="h-full lg:w-[60%] sm:w-[80%] xs:w-[90%] mx-auto flex gap-8 items-center">
        <div
            className="flex flex-col gap-4 text-white dark:text-black p-4 rounded-lg border border-green-300 shadow-xl shadow-green-400/30">
            <div className="w-full flex gap-2 items-center justify-around">
                <div className="text-4xl font-semibold uppercase font-serif">Parabéns pela sua compra</div>
            </div>

            <div className="flex gap-4 justify-center">
                <Link href={'/'}>
                 <button className="w-full px-4 py-1 border-2 border-green-500 rounded-sm">Voltar para a principal</button>
                </Link>
                <Link href={'/admin'}>
                    <button className="w-full text-black px-4 py-1 bg-green-500 rounded-sm">Voltar para a página de administrador</button>
                </Link>
            </div>
        </div>
    </div>
</div>
  )
}

export default Obrigado