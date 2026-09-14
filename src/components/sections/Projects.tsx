"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import portfolioData from "@/data/portfolio.json";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Kloning EXACTLY 100% dari raw Vanilla JS referensi lu
    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return;
      
      const section = sectionRef.current;
      const track = trackRef.current;
      
      const scrollTop = window.scrollY;
      const offset = section.offsetTop;
      const height = section.offsetHeight;
      const winH = window.innerHeight;
      
      // Hitungan persis kayak di AETHER Template
      if (scrollTop >= offset && scrollTop <= (offset + height - winH)) {
        const pct = (scrollTop - offset) / (height - winH);
        const move = (track.scrollWidth - window.innerWidth) * pct;
        track.style.transform = `translateX(-${move}px)`;
      } else if (scrollTop < offset) {
        track.style.transform = `translateX(0px)`;
      } else if (scrollTop > (offset + height - winH)) {
        const maxMove = track.scrollWidth - window.innerWidth;
        track.style.transform = `translateX(-${maxMove}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Set posisi saat pertama render
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Wrapper ditambah tingginya jadi 400vh biar pergeserannya lebih lambat dan panjang
    <section id="projects" ref={sectionRef} className="relative h-[400vh] bg-transparent">
      
      {/* Sticky Viewport - Flex items-center buat otomatis ke tengah dan gak nabrak Navbar */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden ">
        
        {/* Sliding Track - Kontainer yang bergerak ke kiri */}
        <div 
          ref={trackRef}
          className="flex gap-12 md:gap-24 px-6 md:px-24 w-max relative z-20 items-center will-change-transform"
        >
          {/* 1. Judul Section (Jadi Item Pertama di Track kayak AETHER) */}
          <div className="w-[80vw] md:w-[500px] flex-shrink-0">
            <h2 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-700 uppercase">
              Projects
            </h2>
          </div>

          {/* 2. Project Cards (Cuma load 4 terbaik biar HR ga capek) */}
          {portfolioData.projects.slice(0, 4).map((project, idx) => (
            <div 
              key={project.id} 
              // Tinggi dikecilin dikit biar aman dari Navbar di layar kecil/medium
              className="w-[85vw] md:w-[550px] h-[60vh] md:h-[500px] bg-neutral-950 border border-neutral-800 p-6 md:p-10 flex flex-col flex-shrink-0 group hover:border-neutral-500 hover:bg-neutral-900/50 transition-all duration-500 relative"
            >
              {/* Nomor Urut Brutalist */}
              <div className="absolute top-6 right-6 font-mono text-sm text-neutral-700">
                [ 0{idx + 1} ]
              </div>

              {/* Header Project */}
              <div className="flex-1 mt-8">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-neutral-500 font-mono text-xs md:text-sm mb-8 uppercase tracking-widest">
                  {project.subtitle}
                </p>
                
                {/* Cuplikan Highlights */}
                <ul className="space-y-4">
                  {project.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="text-sm md:text-base text-neutral-400 line-clamp-3">
                      <span className="text-neutral-600 mr-2 font-mono">{'>'}</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Footer / Tech Stack & Link */}
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.slice(0, 4).map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] md:text-xs font-mono text-neutral-500 border border-neutral-800 px-2 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[10px] md:text-xs font-mono text-neutral-600 px-2 py-1 border border-transparent">
                      +{project.techStack.length - 4} tools
                    </span>
                  )}
                </div>
                
                {/* Link Deep Routing (Persiapan Tahap 2) */}
                <Link 
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center justify-between w-full border-t border-neutral-800 pt-6 text-neutral-300 group-hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
                >
                  View Case Study 
                  <span className="transform group-hover:translate-x-3 transition-transform duration-300">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          ))}

          {/* 3. Kartu Ekstra: Pintu masuk ke halaman Gudang Archive */}
          <div className="w-[85vw] md:w-[400px] h-[60vh] md:h-[500px] border border-dashed border-neutral-800 flex flex-col items-center justify-center flex-shrink-0 group hover:border-white transition-all duration-500 hover:bg-neutral-900/20">
            <Link href="/projects" className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-full border border-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:border-white">
                <span className="text-2xl text-neutral-500 group-hover:text-white">&rarr;</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-500 group-hover:text-white uppercase tracking-widest mt-4">
                View Full Archive
              </h3>
              <p className="text-xs text-neutral-600 font-mono mt-2">
                Explore all {portfolioData.projects.length} projects
              </p>
            </Link>
          </div>

          {/* Bantalan Kanan Biar Card Terakhir Gak Nabrak Tembok Layar */}
          <div className="w-[10vw] md:w-[20vw] flex-shrink-0" />
        </div>

      </div>
    </section>
  );
}
