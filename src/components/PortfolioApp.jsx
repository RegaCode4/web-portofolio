import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import FeaturedFolders from './FeaturedFolders';
import ProjectsSection from './ProjectsSection';
import FlightPath from './FlightPath';
import ProjectModal from './ProjectModal';
import Footer from './Footer';
import NavigationFab from './NavigationFab';
import ExperienceSection from './ExperienceSection';
import AboutSection from './AboutSection';
import CatchMeSection from './CatchMeSection';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  // Listen to hash changes to switch views cleanly (SPA navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#projects' || hash === '#portfolio') {
        setCurrentView('projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#' || hash === '' || hash === '#home' || hash === '#work' || hash === '#experience' || hash === '#about' || hash === '#contact') {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateProjects = (proj) => {
    setCurrentView('projects');
    window.location.hash = '#projects';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (proj) {
      setSelectedProject(proj);
    }
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#1557ff] selection:text-white">
      
      {/* Background Flight Path */}
      <FlightPath />

      {/* Header Navigation */}
      <Navbar 
        onNavigateHome={handleNavigateHome} 
        onNavigateProjects={() => handleNavigateProjects()} 
        currentView={currentView} 
      />

      {/* Render Home View or Standalone Projects Page View */}
      {currentView === 'home' ? (
        <main className="relative z-10">
          <Hero />
          <FeaturedFolders 
            onSelectProject={handleNavigateProjects} 
          />
          <ExperienceSection />
          <AboutSection />
          <CatchMeSection />
        </main>
      ) : (
        <main className="relative z-10 pt-24 sm:pt-28">
          <ProjectsSection 
            onSelectProject={(proj) => setSelectedProject(proj)} 
          />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Floating Action Button (FAB) Navigation */}
      <NavigationFab 
        onNavigateHome={handleNavigateHome} 
        onNavigateProjects={() => handleNavigateProjects()} 
      />

      {/* Interactive Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

    </div>
  );
}
