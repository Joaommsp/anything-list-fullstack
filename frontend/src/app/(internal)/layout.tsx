import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "../components/NavBar";
import { ReactNode } from "react";

export interface InternalLayoutProps {
  children: ReactNode;
}

export default function InternalLayout(props: InternalLayoutProps) {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
}
