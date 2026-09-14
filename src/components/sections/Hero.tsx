import Image from "next/image";
import portfolioData from "@/data/portfolio.json";
import wallpaperAkmal from "../../../public/wallpaper_akmal.png";

export default function Hero() {
  const { profile } = portfolioData;

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
      
      {/* GLOBAL KEYFRAMES (Scoped) */}
      <style>{`
        @keyframes scroll-down {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        @keyframes subtleZoom {
          0% { transform: scale(1) translateY(0px); }
          50% { transform: scale(1.05) translateY(-5px); }
          100% { transform: scale(1) translateY(0px); }
        }
      `}</style>

      {/* AREA 1: Visual Background (Image + Noise + Vignette) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none w-full h-full flex justify-center items-end"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          animation: "subtleZoom 20s ease-in-out infinite"
        }}
      >
        {/* Gambar Utama */}
        <Image
          src={wallpaperAkmal}
          alt={`${profile.name} Silhouette`}
          fill
          priority
          placeholder="blur"
          className="object-cover object-[center_44%] scale-[1.6] md:scale-100 grayscale contrast-125 opacity-40 mix-blend-luminosity"
          quality={90}
        />
        
        {/* Vignette Samping & Atas */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#050505] to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] opacity-60"></div>

        {/* Overlay Noise */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* AREA 2: Tipografi Raksasa */}
      <div className="relative z-30 flex flex-col items-center px-6 w-full text-center mt-16 md:mt-24">
        {/* Main Name Typography */}
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-[13vw] md:text-[9vw] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
          AKMAL AUFA<br className="md:hidden" /> ALIM
        </h1>

        {/* Short Punchline */}
        <p className="mt-6 md:mt-8 font-mono text-sm md:text-base text-white max-w-xl mx-auto tracking-[0.25em] uppercase">
          AI & <span className="text-neutral-400">SOFTWARE</span> ENGINEER
        </p>

        {/* CV Download CTA */}
        <div className="mt-10 md:mt-12">
          <a
            href="/CV_AkmalAufaAlim_SoftwareEngineer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 border border-neutral-700 hover:border-white transition-colors duration-300 overflow-hidden"
          >
            {/* Hover Invert Background */}
            <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            
            {/* Button Text */}
            <span className="relative z-10 font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-neutral-400 group-hover:text-black transition-colors duration-300 font-bold">
              DOWNLOAD CV
            </span>
            
            {/* Download Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative z-10 w-4 h-4 text-neutral-400 group-hover:text-black transition-colors duration-300">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      {/* AREA 3: Scroll Prompt */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-40">
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          {/* Animated Laser Line */}
          <div 
            className="w-full h-1/2 bg-white absolute top-0 left-0" 
            style={{ animation: "scroll-down 2s cubic-bezier(0.86, 0, 0.07, 1) infinite" }} 
          />
        </div>
      </div>

    </section>
  );
}
