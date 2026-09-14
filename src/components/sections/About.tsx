import portfolioData from "@/data/portfolio.json";

export default function About() {
  const { profile } = portfolioData;

  return (
    <section id="about" className="w-full py-24 md:py-40 px-6 bg-transparent relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 relative items-start">
        
        {/* SECTION LABEL (Kiri - Sticky) */}
        <div className="w-full md:w-1/3 flex flex-col items-start md:items-center justify-center text-left md:text-center relative md:sticky top-0 md:top-[40vh] h-fit z-10">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase">
            ABOUT
          </h2>
        </div>

        {/* KONTEN SUMMARY & EDUCATION (Kanan) */}
        <div className="w-full md:w-2/3 flex flex-col justify-center gap-16 md:gap-20">
          
          {/* Main Summary */}
          <p className="font-[family-name:var(--font-space-grotesk)] text-lg md:text-2xl lg:text-3xl text-neutral-300 leading-relaxed md:leading-relaxed lg:leading-relaxed tracking-tight">
            {profile.summary}
          </p>

          {/* Academic Background Block */}
          <div className="flex flex-col gap-10">
            <h3 className="font-mono text-xs md:text-sm tracking-[0.2em] text-neutral-500 uppercase border-b border-neutral-900 pb-4">
              Academic Background
            </h3>
            
            <div className="flex flex-col gap-12">
              {portfolioData.education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-1 md:grid-cols-[150px_1fr] lg:grid-cols-[180px_1fr] gap-4 md:gap-8 group">
                  
                  {/* Timeline / Dates */}
                  <span className="font-mono text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest pt-1.5">
                    {edu.startDate} <br className="hidden md:block" />
                    <span className="md:hidden"> — </span>
                    {edu.endDate}
                  </span>
                  
                  {/* Education Details */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-white font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight text-xl md:text-2xl group-hover:text-neutral-300 transition-colors">
                      {edu.institution}
                    </h4>
                    <span className="font-mono text-xs md:text-sm text-neutral-400 uppercase tracking-widest">
                      {edu.degree}
                    </span>
                    
                    {/* Bullet Points / Thesis */}
                    {edu.details && (
                      <ul className="mt-4 flex flex-col gap-2 border-l-2 border-neutral-800 pl-4">
                        {edu.details.map((detail, idx) => (
                          <li key={idx} className="font-mono text-[10px] md:text-xs text-neutral-400 leading-relaxed">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
