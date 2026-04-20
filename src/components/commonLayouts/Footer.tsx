"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLongArrowAltRight,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "News", href: "/news" },
  { name: "About Us", href: "/about" },
  { name: "Get In Touch", href: "/contact" },
];

const games = [
  { name: "All Games", href: "/become-a-teacher" },
  { name: "Featured", href: "/privacy-policy" },
  { name: "New Releases", href: "/new_releases" },
];

const connect = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebook,
  },
  {
    name: "Linkedin",
    href: "https://linkedin.com",
    icon: FaLinkedin,
  },
];

const Footer = () => {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription
    setEmail("");
  };

  return (
    <footer className="bg-foreground text-background">
      <section className="container mx-auto px-4 pt-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-12 text-center md:text-left">
          {/* Logo + Description */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image
              src="/icons/commonLayout/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ name, href }, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    className="text-sm text-ring hover:text-accent transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-medium mb-4">Connect</h3>
            <ul className="flex flex-col gap-3">
              {connect.map(({ name, href, icon: Icon }, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    target="_blank"
                    className="flex items-center gap-4 group transition-all"
                  >
                    {/* Purple Circular Icon */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-lg group-hover:scale-105 transition-transform">
                      <Icon size={20} className="text-background" />
                    </div>

                    {/* Text */}
                    <span className="text-base text-background transition-colors">
                      {name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Updated */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-medium mb-4">Stay Updated</h3>
            <p className="text-sm text-ring mb-4">
              Get the latest news and special offers
            </p>
            <form onSubmit={handleSubscribe} className="w-full">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-l-lg bg-gray-700 text-background placeholder-gray-400 text-sm focus:outline-none focus:ring-0"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-r-lg bg-primary text-background text-2xl hover:bg-primary/90 transition-colors focus:outline-none focus:ring-0"
                >
                  <FaLongArrowAltRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom Info */}
      <div className="border-t border-muted-foreground">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 py-4 px-4 text-center sm:text-left">
          {/* Left: Copyright */}
          <p className="text-xs sm:text-sm font-semibold text-ring">
            © {new Date().getFullYear()} Essex Estuary Radio. All rights
            reserved | hello@essex.com
          </p>

          {/* Right: Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/terms"
              className="text-sm font-semibold text-background/70 hover:text-background transition-colors"
            >
              Terms & conditions
            </Link>
            <span className="hidden sm:block text-muted-foreground">|</span>
            <Link
              href="/privacy"
              className="text-sm font-semibold text-background/70 hover:text-background transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
