"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  async function handleSubscribe(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage(null);

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok && data?.ok) {
        setMessage({
          type: "success",
          text: "Thanks — subscription request sent.",
        });
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: data?.error || "Failed to send subscription.",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error — try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full py-1 relative bottom-0 bg-foreground">
      <div className="container mx-auto text-center bg-background rounded-2xl px-100 py-20 -m-90">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Subscribe Our <span className="text-primary">Newsletter</span>
        </h2>

        <p className="text-foreground/70 mt-4 text-sm md:text-base leading-relaxed">
          Get special offers
        </p>

        <form
          onSubmit={handleSubscribe}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="h-12 rounded-lg bg-secondary border-none focus-visible:ring-0 px-6"
            aria-label="email"
          />

          <Button
            type="submit"
            disabled={loading}
            className="h-12 px-8 rounded-lg bg-primary hover:bg-primary/90 text-background"
          >
            {loading ? "Sending..." : "Subscribe"}
          </Button>
        </form>

        {message && (
          <p
            className={`mt-4 ${message.type === "error" ? "text-red-500" : "text-green-500"}`}
          >
            {message.text}
          </p>
        )}
      </div>
    </section>
  );
}
