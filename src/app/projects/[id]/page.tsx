import { notFound } from "next/navigation";
import Link from "next/link";
import portfolioData from "@/data/portfolio.json";
import { Navbar, Footer } from "@/components/layout";

// Best Practice Next.js: Render semua halaman statis saat build-time
export async function generateStaticParams() {
  return portfolioData.projects.map((project) => ({
    id: project.id,
  }));
}

// Meta tags dinamis per project buat SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = portfolioData.projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };
  return { title: `${project.title} | Akmal Aufa Alim` };
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15+ wajib memperlakukan params sebagai Promise
  const { id } = await params;
  const project = portfolioData.projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Cek ketersediaan link (Mendukung Private Project)
  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl !== "#");
  const hasRepoUrl = Boolean(project.repoUrl && project.repoUrl !== "#");
  const hasAnyLink = hasLiveUrl || hasRepoUrl;

  return (
    <>
      <Navbar />
      
      {/* <main> di sini menjadi layer atas yang menutupi Footer fixed di bawahnya */}
      <main className="min-h-screen w-full bg-[#050505] relative z-10 text-[#f0f0f0] flex flex-col">
        <div className="flex-1 w-full max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24">
          
          {/* Navigasi Atas (Kiri-Kanan) */}
          <div className="mb-12 flex items-center justify-between">
            <Link 
              href="/" 
              className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-white transition-colors uppercase tracking-widest group"
            >
              <span className="mr-3 group-hover:-translate-x-2 transition-transform duration-300">&larr;</span> 
              Back to Home
            </Link>

            <Link 
              href="/projects" 
              className="inline-flex items-center text-xs font-mono text-neutral-500 hover:text-white transition-colors uppercase tracking-widest group"
            >
              View Projects Archive
              <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300">&rarr;</span> 
            </Link>
          </div>

          {/* Header Section */}
          <div className="border-b border-neutral-900 pb-12 mb-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 font-mono uppercase tracking-widest mb-10 leading-relaxed">
              {project.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, i) => (
                <span 
                  key={i} 
                  className="text-xs font-mono text-neutral-400 bg-neutral-950 border border-neutral-800 px-3 py-1.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Content & Sidebar Links Layout */}
          <div className={`grid grid-cols-1 gap-16 items-start ${hasAnyLink ? 'lg:grid-cols-[1fr_300px]' : ''}`}>
            
            {/* Main Content: Highlights */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-10 border-l-2 border-neutral-700 pl-4">
                Technical Execution
              </h2>
              {project.highlights.map((highlight, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <span className="text-neutral-700 font-mono mt-1 group-hover:text-white transition-colors">
                    {'>'}
                  </span>
                  <p className="text-neutral-400 leading-relaxed text-base md:text-lg group-hover:text-neutral-300 transition-colors">
                    {highlight}
                  </p>
                </div>
              ))}

              {/* NOTIS / CTA ARAHAN KE README GITHUB */}
              {hasRepoUrl && (
                <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col gap-3">
                  <p className="text-neutral-500 font-mono text-xs md:text-sm leading-relaxed uppercase tracking-widest">
                    // For deep dive system design, algorithms, and comprehensive architecture details, please refer to the official documentation.
                  </p>
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex w-fit items-center gap-3 text-white font-mono text-xs md:text-sm uppercase tracking-widest hover:text-neutral-400 transition-colors group"
                  >
                    <span className="border-b border-white group-hover:border-neutral-400 transition-colors pb-1">
                      Read Full README
                    </span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                  </a>
                </div>
              )}
            </div>

            {/* Sticky Sidebar: Resources */}
            {hasAnyLink && (
              <div className="flex flex-col gap-4 border border-neutral-900 bg-neutral-950 p-8 sticky top-32">
                <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4 text-center">
                  Live & Repo
                </h3>
                
                {hasLiveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-bold tracking-widest uppercase border border-neutral-800 bg-[#0a0a0a] hover:bg-white hover:text-black py-4 text-center transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Live Demo <span className="text-lg leading-none">↗</span>
                  </a>
                )}

                {hasRepoUrl && (
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-bold tracking-widest uppercase border border-neutral-800 bg-[#0a0a0a] hover:bg-white hover:text-black py-4 text-center transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Repositories GitHub <span className="text-lg leading-none">↗</span>
                  </a>
                )}
              </div>
            )}

          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
