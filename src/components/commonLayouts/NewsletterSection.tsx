import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section className="w-full py-1 relative bottom-0 bg-foreground">
      <div className="container mx-auto text-center bg-background rounded-2xl px-100 py-20 -m-90">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Subscribe Our <span className="text-primary">Newsletter</span>
        </h2>

        {/* Description */}
        <p className="text-foreground/70 mt-4 text-sm md:text-base leading-relaxed">
          Get the latest insights, stories, and updates delivered directly to
          your inbox. Join the Essex Estuary Radio community today!
        </p>

        {/* Input + Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-12 rounded-lg bg-secondary border-none focus-visible:ring-0 px-6"
          />

          <Button className="h-12 px-8 rounded-lg bg-primary hover:bg-primary/90 text-background">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
