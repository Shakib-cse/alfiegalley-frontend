import Image from "next/image";

export function AboutHeroBanner() {
  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4">
        <div className="relative w-full h-70 md:h-90 rounded-2xl overflow-hidden">
          {/* Background Image */}
          <Image
            src="/icons/aboutUs/Hero.png"
            alt="About Banner"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />

          {/* Content */}
          <div className="absolute inset-0 flex items-end p-6 md:p-10">
            <div className="text-background max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold">About Us</h2>
              <p className="mt-2 text-sm md:text-base text-background/90">
                Your Sound. Your Station. A modern digital platform crafted for
                the ultimate listening experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
