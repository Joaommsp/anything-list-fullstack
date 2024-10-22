"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import Logo from "@/public/images/anything-list-logo-full.png";
import nextj_logo from "@/public/images/nextjs-fill-svgrepo-com.svg";
import nestj_logo from "@/public/images/nestjs-svgrepo-com.svg";
import tailwind_logo from "@/public/images/tailwind-svgrepo-com.svg";
import postgres_logo from "@/public/images/postgresql-svgrepo-com.svg";

import BackgroundImage from "@/public/images/bg-hero.png";

import "./styles.css";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage.src})`
      }}
      className="w-full  bg-cover bg-center bg-no-repeat bg-opacity-10 md:p-0 min-h-screen flex items-center justify-center"
    >
      <div className="w-full h-full p-2 bg-[#00000090] min-h-screen">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="flex h-full justify-center flex-col items-center pt-[200px]
        "
        >
          <Image
            className="mb-8 vibrate-1 w-[184px]"
            src={Logo}
            alt="..."
            width={250}
          />
          <h1 className="mb-4 text-lg text-center lg:text-xl text-gray-100">
            Bem vindo ao Lista de Qualquer coisa
          </h1>
          <p className="mb-16 text-xs md:text-base text-center text-gray-400 font-light">
            Uma lista, como diz o nome, para guardar qualquer coisa
          </p>
          <div className="flex w-full flex-col md:flex-row items-center justify-center gap-2 md:gap-4  mb-16">
            <Link
              href="/login"
              className="text-xs md:hover:scale-110 transition ease-in-out  md:text-sm font-medium w-full md:w-36  hover:opacity-80 text-center text-neutral-900 bg-[#ffd401] px-8 py-2 rounded-md"
            >
              Login
            </Link>
            <Link
              href="/cadastro"
              className="text-xs md:hover:scale-110 transition ease-in-out md:text-sm bg-transparent border-2 border-[#ffd401] font-medium w-full md:w-36 hover:opacity-80 text-center text-[#ffd401] px-8 py-2 rounded-md"
            >
              Cadastro
            </Link>
          </div>
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
      </div>
    </div>
  );
}
