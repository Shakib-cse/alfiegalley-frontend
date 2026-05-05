import Footer from "@/components/commonLayouts/Footer";
import Header from "@/components/commonLayouts/Header";
import { RadioPlayerProvider } from "@/components/commonLayouts/RadioPlayerProvider";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RadioPlayerProvider>
      <Header />
      {children}
      <Footer />
    </RadioPlayerProvider>
  );
}
