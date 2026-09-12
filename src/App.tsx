import { useState } from 'react';
import { Header, Footer } from './components/Navigation';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProtocolSection } from './components/ProtocolSection';
import { PublicRegistrySection } from './components/PublicRegistrySection';
import { WorkWithUsSection } from './components/WorkWithUsSection';
import { OngoingSection } from './components/OngoingSection';
import { ContactSection } from './components/ContactSection';
import { GlobalThreeBackground } from './components/GlobalThreeBackground';
import { SidebarNavigation } from './components/SidebarNavigation';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-cyan-500/25 selection:text-cyan-200 relative overflow-x-hidden w-full">
      {/* 3D background with interactive wave */}
      <GlobalThreeBackground />

      {/* Simplified sidebar navigation drawer */}
      <SidebarNavigation
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Sovereign Navigation Bar */}
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

      {/* Main Sections rendered directly with 100% native unobstructed scrolling */}
      <main className="relative z-10 overflow-x-hidden w-full">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Ce que nous faisons (Services) */}
        <ServicesSection />

        {/* 3. Le protocole (Protocol) */}
        <ProtocolSection />

        {/* 4. Registre public (Registry) */}
        <PublicRegistrySection />

        {/* 5. Travailler avec le labo */}
        <WorkWithUsSection />

        {/* 6. En cours */}
        <OngoingSection />

        {/* 7. Contact */}
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}


