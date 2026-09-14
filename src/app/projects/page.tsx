import Link from "next/link";
import portfolioData from "@/data/portfolio.json";
import { Navbar, Footer } from "@/components/layout";

export const metadata = {
  title: "Project Archive | Akmal Aufa Alim",
  description: "A complete list of my software engineering and AI projects.",
};

export default function ArchivePage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen w-full bg-[#050505] relative z-10 text-[#f0f0f0] flex flex-col">
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
          
          {/* Navigasi Back */}
          <div className="mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-white transition-colors uppercase tracking-widest group"
            >
              <span className="mr-3 group-hover:-translate-x-2 transition-transform duration-300">&larr;</span> 
              Back to Home
            </Link>
          </div>

          <div className="mb-16 border-b border-neutral-900 pb-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white mb-6">
              Project Archive
            </h1>
            <p className="text-neutral-400 font-mono text-sm md:text-base max-w-2xl">
              A complete catalog of {portfolioData.projects.length} engineered solutions, machine learning models, and full-stack systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {portfolioData.projects.map((project, idx) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.id}`}
                className="block bg-neutral-950 border border-neutral-900 p-8 flex flex-col group hover:border-neutral-500 hover:bg-neutral-900/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="font-mono text-xs text-neutral-600">[ {String(idx + 1).padStart(2, '0')} ]</span>
                  <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-neutral-600 group-hover:text-white font-mono">
                    &rarr;
                  </span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-neutral-500 font-mono text-xs mb-8 uppercase tracking-widest leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>
                
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono text-neutral-500 border border-neutral-800 px-2 py-1 bg-neutral-950">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[10px] font-mono text-neutral-600 border border-transparent px-2 py-1">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
