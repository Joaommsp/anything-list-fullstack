"use client";

import { useState } from "react";
import { IconDirectionSign } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import nextj_logo from "@/public/images/nextjs-fill-svgrepo-com.svg";
import nestj_logo from "@/public/images/nestjs-svgrepo-com.svg";
import tailwind_logo from "@/public/images/tailwind-svgrepo-com.svg";
import postgres_logo from "@/public/images/postgresql-svgrepo-com.svg";

import "../styles.css";

import Logo from "@/public/images/anything-list-logo-full.png";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function login(email: string, password: string) {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("email", data.email);
      router.push("/produtos");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Login failed");
      console.error("Login failed:", errorData);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    login(email, password);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      className="w-full p-2 min-h-[800px] md:min-h-[800px] h-full flex flex-col items-center justify-center"
    >
      <Image
        className="mb-8 vibrate-1 w-[184px]"
        src={Logo}
        alt="..."
        width={250}
      />
      <h1 className="mb-8">Faça Login</h1>

      <div className="mb-8 h-6">
        {errorMessage !== "" ? (
          <span className="text-red-400">{errorMessage}</span>
        ) : null}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full  p-2 flex-col items-center gap-8 mb-16"
      >
        <div className="flex w-full flex-col items-center gap-4">
          <input
            className="py-2 w-full text-sm md:text-base px-4 md:max-w-[400px] bg-neutral-800 text-gray-100 rounded-md outline-none border-2 border-transparent focus:border-2 focus:border-[#ffd401]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="py-2 w-full text-sm md:text-base px-4 md:max-w-[400px] bg-neutral-800 text-gray-100 rounded-md outline-none border-2 border-transparent focus:border-2 focus:border-[#ffd401]"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="text-xs px-2">
          Não possui uma conta? <Link className="text-[#ffd401]" href={"/cadastro"}>Cria sua conta</Link>{" "}
        </span>
        <button
          type="submit"
          className="uppercase w-full justify-center text-sm md:max-w-[400px] md:text-base flex items-center gap-2 bg-[#ffd401] text-neutral-950 font-medium rounded-md px-4 py-2"
        >
          <IconDirectionSign size={24} />
          <span className="text-sm">Entrar</span>
        </button>
      </form>
      <div className="bg-neutral-800 p-4 rounded-full flex items-center justify-center gap-8 mb-16">
        <Image
          className="rotate-in-center w-6 md:w-9 "
          src={nextj_logo}
          width={36}
          alt="..."
        />
        <Image
          className="rotate-in-center w-6 md:w-9"
          src={nestj_logo}
          width={36}
          alt="..."
        />
        <Image
          className="rotate-in-center w-6 md:w-9"
          src={postgres_logo}
          width={36}
          alt="..."
        />
        <Image
          className="rotate-in-center w-6 md:w-9"
          src={tailwind_logo}
          width={36}
          alt="..."
        />
      </div>
      <span className="font-light text-sm">
        by{" "}
        <a
          className="text-[#ffd401]"
          href="https://www.linkedin.com/in/joaomarcos10oficial/"
          target="_blank"
        >
          João Marcos
        </a>
        , 2024
      </span>
    </motion.div>
  );
}
