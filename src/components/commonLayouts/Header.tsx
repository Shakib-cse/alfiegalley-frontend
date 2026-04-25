"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, Pause, Play, Radio, X } from "lucide-react";
import { usePathname } from "next/navigation";
import SvgIcon from "./SvgIcon";
import { useRadioPlayer } from "./RadioPlayerProvider";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isPlaying, togglePlayback } = useRadioPlayer();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "News", path: "/news" },
    { name: "About Us", path: "/about-us" },
    { name: "Get In Touch", path: "/get-in-touch" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Top Bar */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <SvgIcon />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {navLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? pathname === link.path
                : pathname.startsWith(link.path);

            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "text-primary"
                    : "text-foreground/60 hover:text-primary"
                }`}
              >
                {link.name}

                {/* underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 w-full bg-primary transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Right Button */}
        <div className="hidden lg:flex">
          <Button
            onClick={togglePlayback}
            className="bg-primary hover:bg-primary/90 text-background rounded-xl px-5 xl:px-6 py-4 xl:py-5 flex items-center gap-2 text-sm"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            {isPlaying ? "Pause Radio" : "Listen Radio"}
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </section>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed inset-0 bg-foreground/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-background z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Top Bar with Close */}
        <div className="flex justify-between items-center px-4 h-16 border-b">
          <span className="text-lg font-semibold">Menu</span>

          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col items-center justify-center h-[calc(100%-64px)] gap-8 px-6">
          {navLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? pathname === link.path
                : pathname.startsWith(link.path);

            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-medium transition ${
                  isActive ? "text-primary" : "text-foreground/70"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Button */}
          <Button
            onClick={togglePlayback}
            className="bg-primary text-background rounded-full px-8 py-5 flex items-center gap-2 text-base cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Radio className="w-5 h-5" />
            )}
            {isPlaying ? "Pause Radio" : "Listen Radio"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
