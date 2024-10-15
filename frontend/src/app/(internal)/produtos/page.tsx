"use client";

import { Product } from "@/types/produto";
import { IconDeviceFloppy, IconEdit, IconTrash } from "@tabler/icons-react";
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
      <div className="flex flex-col justify-center items-center w-full bg-neutral-800 p-4 gap-4 rounded-md">
        {products.map((prod: Product) => (
          <div className="flex items-center gap-4" key={prod.id}>
            <div className="w-72 bg-transparent border-4 border-[#0a0a0a] p-4 rounded-xl">
              <span className="text-gray-100">{prod.name}</span>
              <p className="text-gray-100">{prod.description}</p>
              <span className="text-gray-100">R${prod.price}</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 bg-red-500 flex items-center gap-2 rounded-md">
                <IconTrash size={24} />
                <span onClick={() => deleteProduct(prod.id)}>Deletar</span>
              </button>
              <button className="p-2 bg-blue-500 flex items-center gap-2 rounded-md">
                <IconEdit size={24} />
                <span onClick={() => updateProcess(prod.id)}>Atualizar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderizeForm() {
    return (
      <div className="flex flex-col items-center mb-8">
        <div className="w-full mb-4 flex items-center justify-center gap-4">
          <div className="flex flex-col ">
            <label htmlFor="input-name">Nome</label>
            <input
              id="input-name"
              className="outline-none rounded-md bg-neutral-900 text-gray-50 p-2 w-72"
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="input-description">Descrição</label>
            <input
              id="input-description"
              className="outline-none rounded-md bg-neutral-900 text-gray-50 p-2 w-72"
              type="text"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="input-name">Preço</label>
            <input
              id="input-name"
              className="outline-none rounded-md bg-neutral-900 text-gray-50 p-2 w-72"
              type="number"
              placeholder="R$"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: +e.target.value })
              }
            />
          </div>
        </div>
        <div>
          {isUpdating == true ? (
            <button
              onClick={() => updateProduct(activeID)}
              className="flex items-center gap-2 bg-blue-500 text-neutral-950 font-semibold rounded-md px-4 py-2"
            >
              <IconDeviceFloppy size={24} />
              <span>Atualizar Produto</span>
            </button>
          ) : (
            <button
              onClick={createProduct}
              className="flex items-center gap-2 bg-green-500 text-neutral-950 font-semibold rounded-md px-4 py-2"
            >
              <IconDeviceFloppy size={24} />
              <span>Salvar Produto</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <main className="w-full h-full p-8">
      <div className="flex-col items-center justify-center w-full h-full">
        {renderizeForm()}
        {renderizeProducts()}
      </div>
    </main>
  );
}
