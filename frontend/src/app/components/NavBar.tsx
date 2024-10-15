"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconX } from "@tabler/icons-react";

import Logo from "@/public/images/anything-list-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-neutral-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Image src={Logo} width={164} alt="..." className="w-[152px] md:w-[164px]" />
        </div>
        <div className="flex items-center">
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none p-0 text-sm"
            >
              {isOpen ? <IconX  style={{ color: '#ffd401' }} size={20}/> : "Menu"}
            </button>
          </div>
          <div className={`md:flex space-x-4 ${isOpen ? "block" : "hidden"} flex items-center`}>
            <Link
              href="/"
              className="text-sm text-white px-3 py-2 rounded-md"
            >
              Home Page
            </Link>
            {/* <Link
              href="/produtos"
              className="text-sm text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            >
              Meu Items
            </Link>
            <Link
              href="/perfil"
              className="text-sm text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            >
              Meu Perfil
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
