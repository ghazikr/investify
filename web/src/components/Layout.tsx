import React from "react";
import { Header } from "./Header";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="text-gray-600 body-font overflow-hidden bg-indigo-50 min-h-screen">
      <Header />
      <main className="container py-12 mx-auto px-5">{children}</main>
    </div>
  );
};
