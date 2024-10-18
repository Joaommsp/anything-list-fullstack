"use client";

import { Product } from "@/types/produto";
import {
  IconDeviceFloppy,
  IconEdit,
  IconTrash,
  IconWashDrycleanOff,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Produtos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
    userId: parseInt(localStorage.getItem("userId") || "0"),
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeID, setActiveID] = useState<number | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    if (userId) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        userId: parseInt(userId),
      }));
    }
    getProducts();
  }, []);

  async function getProducts() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const resp = await fetch(
      `http://localhost:3001/produtos/meusprodutos/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const products = await resp.json();
    setProducts(products);
  }

  async function getProductById(id: number) {
    const resp = await fetch(`http://localhost:3001/produtos/${id}`);
    const products = await resp.json();
    setProduct(products);
  }

  async function updateProcess(id: number) {
    await getProductById(id);
    setActiveID(id);
    setIsUpdating(true);
  }

  function cancelUpdate() {
    setIsUpdating(false);
    setProduct({
      name: "",
      price: 0,
      description: "",
      userId: parseInt(localStorage.getItem("userId") || "0"),
    });
  }

  async function updateProduct(id: number | null) {
    if (activeID === null) return;

    console.log(activeID);
    await fetch(`http://localhost:3001/produtos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...product,
        userId: parseInt(localStorage.getItem("userId") || "0"),
      }),
    });

    await getProducts();
  }

  async function createProduct() {
    console.log(product);
    await fetch("http://localhost:3001/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    setProduct({
      name: "",
      price: 0,
      description: "",
      userId: parseInt(localStorage.getItem("userId") || "0"),
    });
    await getProducts();
  }

  async function deleteProduct(id: number) {
    console.log(product);
    await fetch(`http://localhost:3001/produtos/${id}`, {
      method: "DELETE",
    });
    setIsUpdating(false);
    setActiveID(null);
    await getProducts();
  }

  function renderizeProducts() {
    return (
      <table className="w-full border-collaps shadow-md">
        <thead>
          <tr className="bg-[#171717] text-white">
            <th className="px-4 py-2 text-left font-medium">ID</th>
            <th className="px-4 py-2 text-left font-medium">Nome do produto</th>
            <th className="px-4 py-2 text-left font-medium">Descrição</th>
            <th className="px-4 py-2 text-left font-medium">Preço</th>
            <th className="px-4 py-2 text-left font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod: Product) => (
            <>
              <tr
                key={prod.id}
                className="border-b border-gray-200 hover:bg-gray-800"
              >
                <td className="px-4 py-2 text-sm">{prod.id}</td>
                <td className="px-4 py-2 text-sm">{prod.name}</td>
                <td className="px-4 py-2 text-sm">{prod.description}</td>
                <td className="px-4 py-2 text-sm">R${prod.price}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-2 bg-red-500 flex items-center gap-2 rounded-md"
                    >
                      <IconTrash size={20} />
                    </button>
                    <button
                      onClick={() => updateProcess(prod.id)}
                      className="p-2 bg-blue-500 flex items-center gap-2 rounded-md"
                    >
                      <IconEdit size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    );
  }

  function renderizeForm() {
    return (
      <div className="w-full flex flex-col items-center mb-8 border-b-2 border-gray-600">
        <div className="w-full mb-4 flex items-end justify-between gap-2">
          <div className="w-full flex items-end justify-start gap-2">
            <div className="flex flex-col ">
              <input
                placeholder="Nome do item"
                id="input-name"
                className="outline-none text-sm rounded-md bg-neutral-900 text-gray-50 p-2 w-full"
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col ">
              <input
                placeholder="Descrição"
                id="input-description"
                className="outline-none text-sm rounded-md bg-neutral-900 text-gray-50 p-2 w-full"
                type="text"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col ">
              <input
                id="input-name"
                className="outline-none text-sm rounded-md bg-neutral-900 text-gray-50 p-2 w-full"
                type="number"
                placeholder="R$"
                onChange={(e) =>
                  setProduct({ ...product, price: +e.target.value })
                }
              />
            </div>
            <div className="flex flex-col ">
              <input
                id="input-name"
                className="outline-none text-xs rounded-md bg-neutral-900 text-gray-50 p-2 w-full"
                type="file"
                // onChange={(e) =>
                //   setProduct({ ...product, price: +e.target.value })
                // }
              />
            </div>
          </div>
          <div className="flex  items-end gap-2">
            {isUpdating == true ? (
              <button
                onClick={() => updateProduct(activeID)}
                className="flex items-center gap-2 bg-blue-500 text-neutral-950 font-semibold rounded-md px-4 py-2"
              >
                <IconDeviceFloppy size={20} />
              </button>
            ) : (
              <button
                onClick={createProduct}
                className="flex items-center gap-2 bg-green-500 text-neutral-950 font-semibold rounded-md px-4 py-2"
              >
                <IconDeviceFloppy size={20} />
              </button>
            )}
            {isUpdating == true ? (
              <button
                onClick={() => cancelUpdate()}
                className="flex items-center gap-2 bg-red-500 text-neutral-950 font-semibold rounded-md px-4 py-2"
              >
                <IconWashDrycleanOff size={20} />
              </button>
            ) : (
              <button
                onClick={() => cancelUpdate()}
                className="flex items-center gap-2 bg-gray-500 text-neutral-950 font-semibold rounded-md px-4 py-2"
              >
                <IconWashDrycleanOff size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full h-full p-8 flex  justify-center">
      <div className="flex-col items-center justify-center max-w-[1000px] w-full h-full">
        <h1 className="text-2xl mb-8 font-medium">Minha lista</h1>
        {renderizeForm()}
        {renderizeProducts()}
      </div>
    </main>
  );
}
