"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, description }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setDescription("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
        {/* LEFT TEXT */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            How Can We Help?
          </h2>
          <p className="text-foreground/70 mt-3 text-sm leading-relaxed">
            Have a question or need help with a trade? Send us a message and our
            team will get back to you within 24 hours.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-background rounded-2xl p-6 md:p-8 shadow-sm"
        >
          <div className="space-y-4">
            {/* Gmail/Email */}
            <div>
              <label className="text-sm text-foreground">Gmail (Optional)</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email address"
                className="mt-1 h-11 rounded-lg bg-foreground/10 border-none focus-visible:ring-0"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="text-sm text-foreground">Full name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-1 h-11 rounded-lg bg-foreground/10 border-none focus-visible:ring-0"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm text-foreground">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What do you need help with?"
                className="mt-1 h-11 rounded-lg bg-foreground/10 border-none focus-visible:ring-0"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-foreground">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your description here..."
                className="mt-1 min-h-30 rounded-lg bg-foreground/10 border-none focus-visible:ring-0"
                required
              />
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={status === "sending"}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-background rounded-lg mt-2"
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </Button>

            {status === "success" && (
              <p className="text-sm text-green-600">
                Message sent — thank you!
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600">
                Failed to send message. Try again later.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
