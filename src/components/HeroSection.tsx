import { Vortex } from "./ui/vortex";
import { FloatingNavbar } from "../components/ui/FloatingNavbar";

export function HeroSection() {
  const navItems = [
    { name: "Home", link: "#" },
    { name: "About", link: "#about" },
    // Ajoute les autres si besoin
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <FloatingNavbar navItems={navItems} showLogo={false} />

      <Vortex
        backgroundColor="#000000"
        particleCount={600}
        baseHue={35}           // Ton ambre/orange comme avant
        rangeHue={100}
        baseSpeed={0.3}
        rangeSpeed={1}
        baseRadius={1.5}
        rangeRadius={4}
        className="flex flex-col items-center justify-center h-full w-full px-4"
      >
        {/* Voile global très léger (exactement comme Aceternity) pour améliorer le contraste sans cacher les particules */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Contenu texte - style identique au demo Aceternity */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-bold text-white drop-shadow-2xl mb-8 tracking-wider">
            LUNA
          </h1>

          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-10" />

          <p className="text-3xl md:text-5xl font-semibold text-white drop-shadow-xl mb-8">
            Belly Dance 
          </p>

          <p className="text-lg md:text-2xl text-white/90 drop-shadow-lg max-w-3xl mx-auto mb-12 leading-relaxed px-4">
            Experience the art of belly dance with passionate instruction and graceful movement
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#reservation"
              className="px-10 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-lg rounded-full font-semibold hover:from-amber-500 hover:to-orange-500 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-amber-500/70"
            >
              Book a Class
            </a>
            <a
              href="#about"
              className="px-10 py-5 bg-white/10 text-white text-lg rounded-full font-semibold hover:bg-white/20 transform hover:scale-110 transition-all duration-300 border border-white/20"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Indicateur scroll comme dans le demo */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <svg className="w-8 h-8 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </Vortex>
    </section>
  );
}