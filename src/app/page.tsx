import { Navbar, Footer } from "@/components/layout";
import { Hero, About, Experience, Projects, Skills } from "@/components/sections";
import DotMatrix from "@/components/ui/DotMatrix";

export default function Home() {
  return (
    <>
      {/* GLOBAL NAVBAR */}
      <Navbar />
      
      {/* MAIN CONTENT AREA */}
      {/* Diubah jadi bg-[#050505] relative z-10 agar menutupi Fixed Footer di belakangnya */}
      <main className="w-full flex flex-col bg-[#050505] relative z-10">
        <Hero />
        <About />
        
        {/* VISUAL SEPARATOR (About -> Skills) */}
        <div className="w-full h-[150px] md:h-[200px] -my-16 md:-my-32 relative z-0 pointer-events-none">
          <DotMatrix />
        </div>

        <Skills />
        
        {/* VISUAL SEPARATOR (Skills -> Experience) */}
        <div className="w-full h-[150px] md:h-[200px] -my-16 md:-my-32 relative z-0 pointer-events-none">
          <DotMatrix />
        </div>

        <Experience />

        {/* VISUAL SEPARATOR (Experience -> Projects) */}
        {/* Supaya batas atas dan bawah visualnya seukuran: 
            Kombinasi tarikan atas ekstrem (-mt-44) untuk melawan sisa padding item terakhir di Experience, 
            dan tarikan bawah ringan (-mb-10) untuk menyeimbangkan posisi teks Projects yang melayang di tengah layar */}
        <div className="w-full h-[150px] md:h-[200px] -mt-24 md:-mt-44 -mb-4 md:-mb-10 relative z-0 pointer-events-none">
          <DotMatrix />
        </div>

        <Projects />
      </main>

      {/* GLOBAL FOOTER */}
      <Footer />
    </>
  );
}
