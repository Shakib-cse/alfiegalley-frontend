"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLongArrowAltRight,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "News", href: "/news" },
  { name: "About Us", href: "/about-us" },
  { name: "Get In Touch", href: "/get-in-touch" },
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

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-medium mb-4">Contact</h3>

            <ul className="flex flex-col gap-4 text-sm text-ring">
              {/* Email */}
              <li className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full text-primary">
                  <FaEnvelope />
                </div>
                <span>alfie@essexestuaryradio.co.uk</span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full text-primary">
                  <FaPhone />
                </div>
                <span>+1 555-987-6543</span>
              </li>

              {/* Location */}
              <li className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full text-primary">
                  <FaMapMarkerAlt />
                </div>
                <span>Florida, USA</span>
              </li>
            </ul>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
