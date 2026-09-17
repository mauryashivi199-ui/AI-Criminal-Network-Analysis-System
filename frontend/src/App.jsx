import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CytoscapeGraph from './components/GraphView/CytoscapeGraph';
import KingpinRankings from './components/Analytics/KingpinRankings';
import CDRMatrix from './components/CDR/CDRMatrix';
import MuleTracker from './components/Financial/MuleTracker';
import CrimeMap from './components/GeoSpatial/CrimeMap';
import CopilotDrawer from './components/Copilot/CopilotDrawer';
import DossierView from './components/Dossier/DossierView';
import IngestModal from './components/Ingestion/IngestModal';
import { getGraphData, switchDataset } from './services/api';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('graph');
  const [currentCase, setCurrentCase] = useState('operation_garuda');
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isIngestOpen, setIsIngestOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState([]);

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

  return (
    <div className="flex flex-col h-screen w-screen bg-[#070b14] text-slate-100 overflow-hidden font-sans">
      {/* Top Navbar */}
      <Navbar
        currentCase={currentCase}
        onSwitchCase={handleSwitchCase}
        onOpenIngest={() => setIsIngestOpen(true)}
        onRefreshGraph={() => fetchGraph(currentCase)}
        isLive={true}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Responsive Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Dynamic Center Viewport */}
        <main className="flex-1 h-full overflow-hidden relative bg-[#070b14]">
          {loading && !graphData ? (
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
    </div>
  );
}
