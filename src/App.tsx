/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header, Footer } from './components/Navigation';
import { Hero } from './components/Hero';
import { Vision } from './components/Vision';
import { Expertise } from './components/Expertise';
import { CommercialOffers } from './components/CommercialOffers';
import { ValidationSection } from './components/ValidationSection';
import { RepositoriesExplorer } from './components/RepositoriesExplorer';
import { ProtocolSection } from './components/ProtocolSection';
import { IntegritySection } from './components/IntegritySection';
import { ScientificParametersSimulator } from './components/ScientificParametersSimulator';
import { ContactProtocolSection } from './components/ContactProtocolSection';
import { CustomCursor } from './components/CustomCursor';
import { ParallaxBackground } from './components/ParallaxBackground';
import { GlobalThreeBackground } from './components/GlobalThreeBackground';
import { TestExecutionConsole } from './components/TestExecutionConsole';
import { SidebarNavigation } from './components/SidebarNavigation';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { FloatingShortcutsBar } from './components/FloatingShortcutsBar';
import { PhysicalPartnershipSection } from './components/PhysicalPartnershipSection';

export default function App() {
  const [isTestConsoleOpen, setIsTestConsoleOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [selectedTestRepo, setSelectedTestRepo] = useState<string>('ratiss-lewm-integration');

  const handleOpenTest = (repoName: string = 'ratiss-lewm-integration') => {
    setSelectedTestRepo(repoName);
    setIsTestConsoleOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-cyan-500/25 selection:text-cyan-200 relative overflow-x-hidden w-full">
      {/* Persistent Full-Page 3D Three.js Background with Fast-Scroll Damping */}
      <GlobalThreeBackground />

      {/* Subtle depth layered background parallax */}
      <ParallaxBackground />

      {/* Custom Stylized Reactive Cursor */}
      <CustomCursor />

      {/* Live Interactive Benchmark & Unit Test Runner Modal with Recalibration & Exit */}
      <TestExecutionConsole
        isOpen={isTestConsoleOpen}
        onClose={() => setIsTestConsoleOpen(false)}
        targetRepoName={selectedTestRepo}
      />

      {/* Sovereign Sidebar Navigation & Hardware Telemetry (Toggleable via Header, Floating Bar, or Ctrl+B) */}
      <SidebarNavigation
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenTestConsole={() => handleOpenTest()}
        onOpenShortcutsModal={() => setIsShortcutsOpen(true)}
      />

      {/* Keyboard Shortcuts Cheatsheet & Global Key Handler (Ctrl+K, Ctrl+P, Ctrl+B, Esc) */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        onOpenTestConsole={() => handleOpenTest()}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      {/* Floating Bottom Shortcuts Bar for quick navigation */}
      <FloatingShortcutsBar
        onOpenTestConsole={() => handleOpenTest()}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenShortcutsModal={() => setIsShortcutsOpen(true)}
      />

      {/* Sovereign Navigation Bar */}
      <Header 
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenTestConsole={() => handleOpenTest()}
      />
      
      <main className="relative z-10 overflow-x-hidden w-full">
        {/* Hero with transparent background opening directly into 3D universe */}
        <Hero />

        {/* 01 / Vision & Fondations */}
        <Vision />

        {/* 02 / Expertise Fondamentale */}
        <Expertise />

        {/* Matrice des 7 Offres Commerciales Cadrées (CTO Consulting) */}
        <CommercialOffers />

        {/* 03 / Validation Empirique & Suite Data-Viz (Bloch Sphere, Homologie, Radar QPU) */}
        <ValidationSection />

        {/* Audit des 43 Dépôts Publics & Traçabilité avec Lanceur de Tests Directs */}
        <RepositoriesExplorer onRunTest={handleOpenTest} />

        {/* 08 / Pôle Partenariat Industriel & Construction Physique (Clé 70/30 - Les 5 Dépôts Piliers) */}
        <PhysicalPartnershipSection onRunTest={handleOpenTest} />

        {/* 04 / Protocole Scientifique (Plan. Execute. Certify. Transfer.) */}
        <ProtocolSection />

        {/* 07 / Console de Contrôle & Paramètres Topologiques */}
        <ScientificParametersSimulator onOpenTestConsole={() => handleOpenTest('ratiss-lewm-integration')} />

        {/* 05 / Intégrité Scientifique & Délimitation */}
        <IntegritySection />

        {/* 06 / Contact & Ouverture de Protocole */}
        <ContactProtocolSection />
      </main>

      <Footer />
    </div>
  );
}
