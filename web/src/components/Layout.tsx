import React from "react";
import { Header } from "./Header";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <Header />
      <main className="container mx-auto px-8">{children}</main>
    </section>
  );
};
