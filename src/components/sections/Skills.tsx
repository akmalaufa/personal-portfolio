"use client";

import { useEffect, useRef, useState } from "react";
import portfolioData from "@/data/portfolio.json";

export default function Skills() {
  const { skills } = portfolioData;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Setup Intersection Observer to detect which skill card is in the center of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px", // Trigger when element hits the middle 20% of the screen
        threshold: 0,
      }
    );

    containerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      containerRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="skills" className="w-full py-24 md:py-40 px-6 bg-transparent relative">
      {/* 
        Container utamanya dikembalikan ke flex-col untuk Mobile agar logis secara UX.
        Efek Focus/Dim diterapkan menggunakan JS IntersectionObserver.
      */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-16 md:gap-24 relative items-start">
        
        {/* STICKY LABEL (Mobile: Atas | Desktop: Kanan) */}
        <div className="w-full md:w-1/3 flex flex-col items-start md:items-center text-left md:text-center relative md:sticky top-0 md:top-[40vh] h-fit z-10">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase break-words">
            ADAPTIVE STACK
          </h2>
          <p className="mt-4 text-sm text-neutral-500 font-mono tracking-widest uppercase">
            // Core Tech
          </p>
        </div>

        {/* CONTENT GRID (Mobile: Bawah | Desktop: Kiri) */}
        <div className="w-full md:w-2/3 flex flex-col gap-8 md:gap-12">
          {skills.map((skillGroup, idx) => {
            const isActive = activeIndex === idx;
            
            return (
              <div 
                key={idx}
                ref={(el) => { containerRefs.current[idx] = el; }}
                data-index={idx}
                className={`flex flex-col border p-6 md:p-8 transition-all duration-500 ease-out ${
                  isActive 
                    ? "border-white/30 bg-[#0c0c0c] opacity-100 scale-100" 
                    : "border-white/5 bg-[#050505] opacity-40 scale-[0.97]"
                }`}
              >
                {/* Kategori (e.g., AI & Machine Learning) */}
                <h3 className={`font-[family-name:var(--font-space-grotesk)] text-lg md:text-xl mb-6 uppercase tracking-tight transition-colors duration-500 ${isActive ? "text-white" : "text-neutral-500"}`}>
                  {skillGroup.category}
                </h3>
                
                {/* Deretan Skill (Text Pills + Monochrome Icons) */}
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((item, itemIdx) => (
                    <span 
                      key={itemIdx}
                      className={`group flex items-center gap-2.5 font-mono text-xs md:text-sm border px-4 py-2 transition-all cursor-default ${
                        isActive 
                          ? "text-neutral-300 border-neutral-700 hover:text-white hover:border-neutral-400 hover:bg-white/10" 
                          : "text-neutral-600 border-neutral-800"
                      }`}
                    >
                      {/* Devicon Logic */}
                      {item.icon && (
                        <i 
                          className={`${item.icon} text-base transition-all duration-300 ${
                            isActive 
                              ? "grayscale contrast-200 opacity-80 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100" 
                              : "grayscale opacity-30"
                          }`}
                        ></i>
                      )}
                      
                      {/* SimpleIcons Logic */}
                      {item.imgUrl && (
                        <img 
                          src={item.imgUrl} 
                          alt={item.name}
                          className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${
                            isActive 
                              ? "grayscale contrast-200 opacity-80 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100" 
                              : "grayscale opacity-30"
                          }`}
                        />
                      )}

                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
