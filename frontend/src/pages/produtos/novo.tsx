import { api } from "@/api/axiosInstance";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

interface IErrorFields {
  field: string,
  message: string
}

export default function NovoProduto() {
  // TODO: um useState para cada campo do produto (nome, descricao, preco, quantidade)
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    nome: '',
    descricao: '',
    quantidade: '',
    preco: ''
  })

  const handleResetFieldErrors = () => {
    setFieldErrors({
      nome: '',
      descricao: '',
      quantidade: '',
      preco: ''
    })
  }

  const user = {
    age: 35,
    name: 'Daniel'
  }

  console.log('nome', user['name'])

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    // TODO: POST /produtos com os dados do formulário
    handleResetFieldErrors();
    const body = {
      nome,
      descricao,
      quantidade: Number(quantidade),
      preco: Number(preco)
    }
    try {
      const createProduct = await api.post(`/produtos`, body)
      console.log('update', createProduct.data)
      router.push('/produtos')
    } catch (error) {
      if (error instanceof AxiosError) {
        const fields: IErrorFields[] = error.response?.data.fields
        fields.map(aux => setFieldErrors(prev => ({ ...prev, [aux.field]: aux.message })))
        return console.warn(error?.response?.data)
      }
    }
    // TODO: redirecionar para /produtos após sucesso (useRouter)
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-screen flex flex-col items-center justify-center">
      {/* TODO: inputs controlados para nome, descricao, preco e quantidade */}
      <div className="flex flex-col justify-center relative mb-5">
        <label htmlFor="">Nome do produto: </label>
        <input className={`px-1 py-2 min-w-24 border ${fieldErrors.nome.length > 0 ? 'border-red-500' : 'border-zinc-400'} rounded-md`} type="text" name="nome" onChange={(e) => setNome(e.target.value)} value={nome} />
        <span className="text-sm text-red-500 -mb-21 absolute">{fieldErrors.nome}</span>
      </div>

      <div className="flex flex-col justify-center relative mb-5">
        <label htmlFor="">Descrição do produto: </label>
        <input className={`px-1 py-2 min-w-24 border ${fieldErrors.descricao.length > 0 ? 'border-red-500' : 'border-zinc-400'} rounded-md`} type="text" name="descricao" onChange={(e) => setDescricao(e.target.value)} value={descricao} />
        <span className="text-sm text-red-500 -mb-21 absolute">{fieldErrors.descricao}</span>
      </div>
      <div className="flex flex-col justify-center relative mb-5">
        <label htmlFor="">Quantidade do produto: </label>
        <input className={`px-1 py-2 min-w-24 border ${fieldErrors.quantidade.length > 0 ? 'border-red-500' : 'border-zinc-400'} rounded-md`} type="text" name="quantidade" onChange={(e) => setQuantidade(e.target.value)} value={quantidade} />
        <span className="text-sm text-red-500 -mb-21 absolute">{fieldErrors.quantidade}</span>
      </div>
      <div className="flex flex-col justify-center relative mb-5">
        <label htmlFor="">Preço do produto: </label>
        <input className={`px-1 py-2 min-w-24 border ${fieldErrors.preco.length > 0 ? 'border-red-500' : 'border-zinc-400'} rounded-md`} type="text" name="preco" onChange={(e) => setPreco(e.target.value)} value={preco} />
        <span className="text-sm text-red-500 -mb-21 absolute">{fieldErrors.preco}</span>
      </div>


      {/* TODO: botão de submit */}
      <button className="p-4 min-w-18 border border-zinc-300 bg-sky-700 text-white rounded-sm">Cadastrar</button>
    </form>
  );
}