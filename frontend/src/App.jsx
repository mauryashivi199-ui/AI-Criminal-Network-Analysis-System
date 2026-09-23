import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './components/Home/HomePage';
import CytoscapeGraph from './components/GraphView/CytoscapeGraph';
import KingpinRankings from './components/Analytics/KingpinRankings';
import CDRMatrix from './components/CDR/CDRMatrix';
import MuleTracker from './components/Financial/MuleTracker';
import CrimeMap from './components/GeoSpatial/CrimeMap';
import CopilotDrawer from './components/Copilot/CopilotDrawer';
import DossierView from './components/Dossier/DossierView';
import IngestModal from './components/Ingestion/IngestModal';
import LoginModal from './components/Auth/LoginModal';
import SettingsView from './components/Settings/SettingsView';
import AboutView from './components/About/AboutView';
import { getGraphData, switchDataset } from './services/api';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentCase, setCurrentCase] = useState('operation_garuda');
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isIngestOpen, setIsIngestOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  
  // Officer / Google Authentication State
  const [currentOfficer, setCurrentOfficer] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Load saved officer on initial mount
  useEffect(() => {
    const saved = localStorage.getItem('kavachnet_officer');
    if (saved) {
      try {
        setCurrentOfficer(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default to Lead Inspector if not logged in
      const defaultOfficer = {
        officer_name: "Inspector Rajesh Kumar",
        badge_id: "DL-CYBER-8841",
        agency: "Special Cell / Cyber Crime Unit, Delhi Police",
        role: "Lead Cyber Crime Investigator",
        clearance_level: "Level 3 - Top Secret (LEA)"
      };
      setCurrentOfficer(defaultOfficer);
      localStorage.setItem('kavachnet_officer', JSON.stringify(defaultOfficer));
    }
  }, []);

  // Fetch graph on mount & case change
  const fetchGraph = async (caseKey = currentCase) => {
    setLoading(true);
    try {
      const data = await getGraphData(caseKey);
      setGraphData(data);
    } catch (err) {
      console.error('Error loading graph:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraph(currentCase);
  }, [currentCase]);

  const handleSwitchCase = async (newCase) => {
    setCurrentCase(newCase);
    try {
      await switchDataset(newCase);
      await fetchGraph(newCase);
    } catch (e) {
      console.error(e);
    }
  };

  const handleHighlightFromCopilot = (nodeIds) => {
    setHighlightedNodes(nodeIds);
    setActiveTab('graph');
  };

  const handleSearchFromHome = (query) => {
    if (!graphData?.nodes) {
      setActiveTab('graph');
      return;
    }
    const cleanQ = query.toLowerCase();
    const matched = graphData.nodes.filter(
      (n) =>
        n.name.toLowerCase().includes(cleanQ) ||
        n.id.toLowerCase().includes(cleanQ) ||
        (n.aliases && n.aliases.some((a) => a.toLowerCase().includes(cleanQ)))
    );
    if (matched.length > 0) {
      setHighlightedNodes(matched.map((m) => m.id));
    }
    setActiveTab('graph');
  };

  const handleLogout = () => {
    localStorage.removeItem('kavachnet_officer');
    setCurrentOfficer(null);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#070b14] text-slate-100 overflow-hidden font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigateTab={(tab) => setActiveTab(tab)}
        currentCase={currentCase}
        onSwitchCase={handleSwitchCase}
        onOpenIngest={() => setIsIngestOpen(true)}
        onRefreshGraph={() => fetchGraph(currentCase)}
        isLive={true}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        currentOfficer={currentOfficer}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Responsive Sidebar (collapsible / drawer) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Dynamic Center Viewport */}
        <main className="flex-1 h-full overflow-hidden relative bg-[#070b14]">
          {activeTab === 'home' && (
            <HomePage
              onNavigate={(tab) => setActiveTab(tab)}
              onSearchSuspect={handleSearchFromHome}
              onOpenIngest={() => setIsIngestOpen(true)}
            />
          )}

          {activeTab !== 'home' && loading && !graphData ? (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <div className="text-xs font-mono text-cyan-300">
                Synthesizing Multi-Relational Knowledge Graph...
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'graph' && (
                <CytoscapeGraph
                  graphData={graphData}
                  highlightedNodeIds={highlightedNodes}
                />
              )}
              {activeTab === 'kingpins' && <KingpinRankings />}
              {activeTab === 'cdr' && <CDRMatrix />}
              {activeTab === 'financial' && <MuleTracker />}
              {activeTab === 'geospatial' && <CrimeMap />}
              {activeTab === 'copilot' && (
                <CopilotDrawer onHighlightNodes={handleHighlightFromCopilot} />
              )}
              {activeTab === 'dossier' && <DossierView />}
              {activeTab === 'settings' && <SettingsView />}
              {activeTab === 'about' && <AboutView />}
            </>
          )}
        </main>
      </div>

      {/* Ingest FIR Modal */}
      <IngestModal
        isOpen={isIngestOpen}
        onClose={() => setIsIngestOpen(false)}
        onIngestSuccess={() => {
          setIsIngestOpen(false);
          fetchGraph(currentCase);
        }}
      />

      {/* Officer / Google Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentOfficer={currentOfficer}
        onLoginSuccess={(officer) => {
          setCurrentOfficer(officer);
          setIsLoginModalOpen(false);
        }}
      />
    </div>
  );
}
