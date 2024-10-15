"use client";

import { useState } from "react";
import axios from "axios";
import { IconDirectionSign } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import Logo from "@/public/images/anything-list-logo-full.png";

import nextj_logo from "@/public/images/nextjs-fill-svgrepo-com.svg";
import nestj_logo from "@/public/images/nestjs-svgrepo-com.svg";
import tailwind_logo from "@/public/images/tailwind-svgrepo-com.svg";
import postgres_logo from "@/public/images/postgresql-svgrepo-com.svg";

import "../styles.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // Uso do useRouter

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email != "" && password != "") {
      try {
        await axios.post("http://localhost:3001/auth/register", {
          email,
          password,
        });
        router.push("/login");
      } catch (error) {
        console.log(error);
        setErrorMessage("Não foi possível realisar o cadastro");
        throw new Error("Não foi possível realisar o cadastro");
      }
    } else {
      setErrorMessage("Preencha todos os campos");
      resetErrorMessage();
    }
  };

  const resetErrorMessage = () => {
    const timer = setInterval(() => {
      setErrorMessage("");
      clearInterval(timer);
    }, 4000);
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
      <h1 className="mb-8">Crie sua conta</h1>

      <div className="mb-8 h-6">
        {errorMessage != "" ? (
          <span className="text-red-400">{errorMessage}</span>
        ) : null}
      </div>

      <form
        onSubmit={handleRegister}
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
        <button
          type="submit"
          className="uppercase w-full justify-center text-sm md:max-w-[400px] md:text-base flex items-center gap-2 bg-[#ffd401] text-neutral-950 font-medium rounded-md px-4 py-2"
        >
          <IconDirectionSign size={24} />
          <span className="text-sm">cadastrar</span>
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
