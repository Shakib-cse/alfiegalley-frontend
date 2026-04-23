import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Page() {
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
        <div className="bg-background rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-sm text-foreground">Full name</label>
              <Input
                placeholder="Enter your full name"
                className="mt-1 h-11 rounded-lg bg-foreground/10 border-none focus-visible:ring-0"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm text-foreground">Subject</label>
              <Input
                placeholder="What do you need help with?"
                className="mt-1 h-11 rounded-lg bg-foreground/10 border-none focus-visible:ring-0"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm text-foreground">Message</label>
              <Textarea
                placeholder="Write your message here..."
                className="mt-1 min-h-[120px] rounded-lg bg-foreground/10 border-none focus-visible:ring-0"
              />
            </div>

            {/* Button */}
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-background rounded-lg mt-2">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
