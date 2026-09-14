import portfolioData from "@/data/portfolio.json";

export default function Experience() {
  return (
    <section id="experience" className="w-full py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto bg-transparent">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">EXPERIENCE</h2>
      </div>

      <div className="flex flex-col">
        {portfolioData.experience.map((job, idx) => (
          <div 
            key={idx} 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 py-12 border-b border-neutral-800 last:border-none group"
          >
            {/* Timeline Column */}
            <div className="col-span-1">
              <p className="font-mono text-sm text-neutral-500 uppercase tracking-widest mt-1">
                {job.startDate} &mdash; {job.endDate}
              </p>
            </div>

            {/* Content Column */}
            <div className="col-span-1 md:col-span-3">
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-200 group-hover:text-white transition-colors">
                {job.role}
              </h3>
              <h4 className="text-lg text-neutral-400 mt-2 mb-6">
                {job.company}
              </h4>

              {/* Impact Bullets */}
              <ul className="space-y-4 mb-8">
                {job.highlights?.map((desc, i) => (
                  <li key={i} className="flex items-start text-neutral-400 leading-relaxed text-sm md:text-base group-hover:text-neutral-300 transition-colors">
                    <span className="text-neutral-600 mr-3 mt-0.5 font-mono">{'>'}</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              {/* Job Specific Stack */}
              {job.technologies && (
                <div className="flex flex-wrap gap-2 mt-auto">
                  {job.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="font-mono text-xs text-neutral-500 border border-neutral-800 px-3 py-1 hover:text-white hover:border-neutral-500 hover:bg-white/5 transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
