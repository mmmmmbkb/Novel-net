import React from 'react';
import {
  Sparkles,
  Film,
  PenTool,
  WandSparkles,
  PlayCircle,
  Users,
  Mail,
  ArrowRight,
  Star,
  Clapperboard
} from 'lucide-react';

const SERVICES = [
  {
    icon: PenTool,
    title: 'Story Development',
    description: 'From idea to screenplay, we craft emotional stories with memorable characters.'
  },
  {
    icon: WandSparkles,
    title: '2D & 3D Animation',
    description: 'Fluid sakuga-inspired motion combined with modern digital production pipelines.'
  },
  {
    icon: Film,
    title: 'Series Production',
    description: 'Full production support for TV anime, streaming originals, and short films.'
  }
];

const PROJECTS = [
  {
    name: 'Skybound Hearts',
    type: 'Fantasy Romance • TV Series',
    description: 'A coming-of-age story set in floating cities where music controls the wind.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Neon Ronin',
    type: 'Cyberpunk Action • OVA',
    description: 'A rogue samurai faces megacorp armies in a rain-soaked, neon future.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Moonlight Kitchen',
    type: 'Slice of Life • Film',
    description: 'An uplifting culinary journey through friendship, loss, and second chances.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
  }
];

const STATS = [
  { label: 'Episodes Produced', value: '120+' },
  { label: 'Global Partners', value: '35' },
  { label: 'Awards Won', value: '18' },
  { label: 'Artists & Staff', value: '90+' }
];

export default function App() {
  return (
    <div className="min-h-screen text-gray-100 font-sans">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-anime-dark/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-anime-primary to-anime-accent rounded-md shadow-[0_0_20px_rgba(112,0,255,0.5)]">
              <Clapperboard size={18} />
            </div>
            <span className="font-bold tracking-wide">STUDIO ANIME</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#works" className="hover:text-white">Works</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-4 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-[0.2em] border border-anime-secondary/40 text-anime-secondary mb-6">
              <Sparkles size={14} /> Original Anime Studio
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-glow">
              We Create <span className="text-anime-secondary">Stories</span> That Move the World
            </h1>
            <p className="mt-6 text-gray-300 max-w-xl leading-relaxed">
              Studio Anime is a creative house for high-quality anime production. We blend traditional artistry with modern pipelines to deliver unforgettable worlds, characters, and emotions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#works" className="inline-flex items-center gap-2 px-5 py-3 bg-anime-primary hover:bg-anime-accent transition-colors font-semibold">
                View Our Works <ArrowRight size={16} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 hover:border-anime-secondary transition-colors">
                Start a Project
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-radial-glow blur-2xl" />
            <img
              className="relative z-10 w-full h-[380px] object-cover border border-white/10 shadow-2xl"
              src="https://images.unsplash.com/photo-1580477371194-45968e8d0d66?auto=format&fit=crop&w=1400&q=80"
              alt="Anime studio workspace"
            />
          </div>
        </section>

        <section id="about" className="border-y border-white/10 bg-anime-card/50">
          <div className="max-w-6xl mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((item) => (
              <div key={item.label} className="p-5 border border-white/10 bg-anime-dark/60">
                <p className="text-3xl font-black text-anime-secondary">{item.value}</p>
                <p className="mt-1 text-sm text-gray-300">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-10">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <article key={service.title} className="p-6 border border-white/10 bg-anime-card/70 hover:border-anime-secondary/60 transition-colors">
                <service.icon className="text-anime-accent mb-4" size={24} />
                <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="works" className="max-w-6xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Works</h2>
            <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">Latest Releases</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <article key={project.name} className="overflow-hidden border border-white/10 bg-anime-card group">
                <img src={project.image} alt={project.name} className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="p-5">
                  <p className="text-xs text-anime-secondary uppercase tracking-wider">{project.type}</p>
                  <h3 className="text-xl font-semibold mt-2">{project.name}</h3>
                  <p className="text-sm text-gray-300 mt-2">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 bg-anime-card/40">
          <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold">Let&apos;s Make Your Next Anime Project</h2>
              <p className="mt-3 text-gray-300">
                Whether you need full production or co-production support, our team is ready to help bring your vision to life.
              </p>
            </div>
            <div className="p-6 border border-white/10 bg-anime-dark/70 space-y-4">
              <div className="flex items-center gap-3 text-sm"><Mail size={16} className="text-anime-secondary" /> hello@studioanime.com</div>
              <div className="flex items-center gap-3 text-sm"><Users size={16} className="text-anime-secondary" /> Partnerships & Talent Inquiries</div>
              <button className="w-full py-3 bg-anime-primary hover:bg-anime-accent transition-colors font-semibold inline-flex items-center justify-center gap-2">
                <PlayCircle size={16} /> Book a Discovery Call
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-4 text-xs text-gray-400 flex items-center gap-2">
          <Star size={14} className="text-anime-accent" /> © 2026 Studio Anime. Crafted with passion.
        </div>
      </footer>
    </div>
  );
}
