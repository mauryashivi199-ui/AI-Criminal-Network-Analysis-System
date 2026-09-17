import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Filter, 
  Search, 
  Route, 
  Sparkles, 
  Layers
} from 'lucide-react';
import NodeDetailModal from './NodeDetailModal';

try {
  cytoscape.use(cola);
} catch (e) {
  // Ignore duplicate registration
}

const TYPE_COLORS = {
  SUSPECT: '#ef4444',
  GANG: '#a855f7',
  PHONE: '#3b82f6',
  ACCOUNT: '#10b981',
  VEHICLE: '#f59e0b',
  LOCATION: '#06b6d4',
  CRIME_CASE: '#f97316',
};

export default function CytoscapeGraph({ graphData, onSelectNode, highlightedNodeIds = [] }) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [activeLayout, setActiveLayout] = useState('cose');
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [pathSource, setPathSource] = useState('');
  const [pathTarget, setPathTarget] = useState('');
  const [shortestPathInfo, setShortestPathInfo] = useState(null);

  useEffect(() => {
    if (!containerRef.current || !graphData || !graphData.nodes) return;

    const elements = [];

    const filteredNodes = graphData.nodes.filter((n) => {
      if (filterType === 'ALL') return true;
      return n.type === filterType;
    });

    const allowedNodeIds = new Set(filteredNodes.map((n) => n.id));

    filteredNodes.forEach((node) => {
      const isKingpin = node.role && (node.role.toLowerCase().includes('kingpin') || node.role.toLowerCase().includes('chief'));
      const isHighlighted = highlightedNodeIds.includes(node.id);

      elements.push({
        group: 'nodes',
        data: {
          id: node.id,
          label: node.name,
          type: node.type,
          role: node.role || 'Associate',
          threat_score: node.threat_score || 50,
          color: TYPE_COLORS[node.type] || '#94a3b8',
          borderColor: isHighlighted ? '#00f0ff' : isKingpin ? '#fbbf24' : '#1e293b',
          borderWidth: isHighlighted ? 4 : isKingpin ? 3 : 1.5,
          size: isKingpin ? 46 : (node.threat_score > 80 ? 38 : 30),
          raw: node,
        },
      });
    });

    (graphData.edges || []).forEach((edge, idx) => {
      if (allowedNodeIds.has(edge.source) && allowedNodeIds.has(edge.target)) {
        const isPredicted = edge.type === 'PREDICTED_LINK';
        const isFinancial = edge.type === 'TRANSFERRED_FUNDS';
        const isCall = edge.type === 'COMMUNICATED';

        elements.push({
          group: 'edges',
          data: {
            id: `e-${edge.source}-${edge.target}-${idx}`,
            source: edge.source,
            target: edge.target,
            type: edge.type,
            weight: edge.weight || 1.0,
            lineStyle: isPredicted ? 'dashed' : 'solid',
            lineColor: isPredicted ? '#c084fc' : isFinancial ? '#34d399' : isCall ? '#60a5fa' : '#94a3b8',
            width: Math.max((edge.weight || 1.0) * 2.5, 1.5),
            label: edge.type.replace('_', ' '),
            raw: edge,
          },
        });
      }
    });

    const cy = cytoscape({
      container: containerRef.current,
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            'label': 'data(label)',
            'color': '#f8fafc',
            'font-size': '10px',
            'font-family': 'Inter, sans-serif',
            'text-valign': 'bottom',
            'text-margin-y': 5,
            'text-background-color': '#070b14',
            'text-background-opacity': 0.85,
            'text-background-padding': '2px',
            'text-background-shape': 'roundrectangle',
            'border-color': 'data(borderColor)',
            'border-width': 'data(borderWidth)',
            'width': 'data(size)',
            'height': 'data(size)',
            'transition-property': 'background-color, line-color, target-arrow-color, width, height',
            'transition-duration': '0.3s',
          },
        },
        {
          selector: 'edge',
          style: {
            'width': 'data(width)',
            'line-color': 'data(lineColor)',
            'line-style': 'data(lineStyle)',
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': 'data(lineColor)',
            'arrow-scale': 0.8,
            'opacity': 0.8,
            'font-size': '8px',
            'color': '#64748b',
          },
        },
        {
          selector: ':selected',
          style: {
            'border-color': '#00f0ff',
            'border-width': 4,
            'shadow-blur': 20,
            'shadow-color': '#00f0ff',
            'shadow-opacity': 0.8,
          },
        },
      ],
      layout: {
        name: activeLayout,
        animate: true,
        animationDuration: 600,
        nodeDimensionsIncludeLabels: true,
        fit: true,
        padding: 30,
      },
    });

    cy.on('tap', 'node', (evt) => {
      const nodeData = evt.target.data('raw');
      setSelectedNodeData(nodeData);
      if (onSelectNode) onSelectNode(nodeData);
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [graphData, activeLayout, filterType, highlightedNodeIds]);

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (!cyRef.current) return;

    if (!q.trim()) {
      cyRef.current.nodes().style('opacity', 1);
      cyRef.current.edges().style('opacity', 0.8);
      return;
    }

    const matches = cyRef.current.nodes().filter((n) => {
      const name = n.data('label').toLowerCase();
      const id = n.data('id').toLowerCase();
      return name.includes(q.toLowerCase()) || id.includes(q.toLowerCase());
    });

    cyRef.current.nodes().style('opacity', 0.15);
    cyRef.current.edges().style('opacity', 0.05);

    matches.style('opacity', 1);
    matches.connectedEdges().style('opacity', 0.9);
  };

  const handleFindPath = () => {
    if (!cyRef.current || !pathSource || !pathTarget) return;
    const aStar = cyRef.current.elements().aStar({
      root: `#${pathSource}`,
      goal: `#${pathTarget}`,
      directed: false,
    });

    if (aStar.found) {
      cyRef.current.elements().style('opacity', 0.1);
      aStar.path.style('opacity', 1);
      aStar.path.select();
      setShortestPathInfo({
        found: true,
        distance: aStar.distance,
        steps: aStar.path.nodes().map((n) => n.data('label')),
      });
    } else {
      setShortestPathInfo({ found: false });
    }
  };

  const handleResetView = () => {
    if (cyRef.current) {
      cyRef.current.elements().style('opacity', 1);
      cyRef.current.fit();
      setShortestPathInfo(null);
      setSearchQuery('');
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#070b14] overflow-hidden">
      {/* Top Floating Control Toolbar (Responsive on mobile) */}
      <div className="absolute top-2 left-2 right-2 z-10 flex flex-wrap items-center justify-between gap-1.5 p-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl max-h-28 overflow-y-auto sm:max-h-none sm:overflow-visible">
        {/* Search Input */}
        <div className="flex items-center space-x-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 w-full sm:w-52 md:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search suspect, phone..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-full font-mono"
          />
        </div>

        {/* Node Type Filter */}
        <div className="flex items-center space-x-1 overflow-x-auto py-0.5">
          <Filter className="w-3 h-3 text-slate-400 hidden sm:inline flex-shrink-0" />
          {['ALL', 'SUSPECT', 'PHONE', 'ACCOUNT'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2 py-0.5 rounded text-[10px] md:text-[11px] font-medium transition ${
                filterType === t
                  ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Layout Switcher & Reset */}
        <div className="flex items-center space-x-1 ml-auto">
          {['cose', 'circle', 'grid'].map((layoutName) => (
            <button
              key={layoutName}
              onClick={() => setActiveLayout(layoutName)}
              className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-mono transition ${
                activeLayout === layoutName
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {layoutName}
            </button>
          ))}
          <button
            onClick={handleResetView}
            className="p-1 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition"
            title="Reset View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Cytoscape Canvas */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Path Finding Banner */}
      {shortestPathInfo && (
        <div className="absolute bottom-12 sm:bottom-4 left-2 right-2 sm:left-4 sm:right-4 z-10 p-2.5 rounded-xl bg-slate-900/95 border border-purple-500/40 backdrop-blur shadow-2xl flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <div className="truncate">
              <div className="text-[11px] font-semibold text-purple-300">
                {shortestPathInfo.distance} hops separation
              </div>
              <div className="text-[10px] text-slate-300 font-mono truncate">
                {shortestPathInfo.steps ? shortestPathInfo.steps.join(' ➔ ') : 'No path found.'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShortestPathInfo(null)}
            className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 bg-slate-800 rounded ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Color Legend Badge (Responsive) */}
      <div className="hidden sm:flex absolute bottom-3 left-3 z-10 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300 flex-wrap gap-2.5 pointer-events-none">
        <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-red-500"></span><span>Suspect</span></span>
        <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span><span>Gang</span></span>
        <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span>Phone</span></span>
        <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span><span>Mule/Crypto</span></span>
      </div>

      {/* Node Detail Inspector Modal / Bottom Sheet */}
      {selectedNodeData && (
        <NodeDetailModal
          node={selectedNodeData}
          onClose={() => setSelectedNodeData(null)}
        />
      )}
    </div>
  );
}
