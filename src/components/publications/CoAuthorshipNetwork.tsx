"use client";

import { NetworkData } from '@/types/content';
import { useState, useRef, MouseEvent, WheelEvent } from 'react';

interface CoAuthorshipNetworkProps {
  data: NetworkData;
}

export function CoAuthorshipNetwork({ data }: CoAuthorshipNetworkProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const scaleFactor = 0.1;
    const newScale = Math.max(0.1, Math.min(5, scale + (e.deltaY > 0 ? -scaleFactor : scaleFactor)));
    setScale(newScale);
  };

  const zoomIn = () => setScale(s => Math.min(5, s + 0.2));
  const zoomOut = () => setScale(s => Math.max(0.1, s - 0.2));
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <section className="relative w-full bg-[#181811] rounded-[2rem] overflow-hidden shadow-lg border border-[#e5e5dc] dark:border-[#3a3928]">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h3 className="text-white font-bold text-lg bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-auto">Co-authorship Network</h3>
      </div>
      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        <button onClick={zoomIn} className="size-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <span className="material-symbols-outlined">add</span>
        </button>
        <button onClick={zoomOut} className="size-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <span className="material-symbols-outlined">remove</span>
        </button>
        <button onClick={resetZoom} className="size-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <span className="material-symbols-outlined">fit_screen</span>
        </button>
      </div>
      <div 
        ref={containerRef}
        className="w-full h-[500px] flex items-center justify-center cursor-move active:cursor-grabbing bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2a2915] to-[#181811]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
          <g transform={`translate(${position.x}, ${position.y}) scale(${scale})`} style={{ transformOrigin: 'center' }}>
            <g className="graph-group stroke-gray-600/40" strokeWidth="1">
              {data.links.map((link, i) => {
                const source = data.nodes.find(n => n.id === link.source);
                const target = data.nodes.find(n => n.id === link.target);
                if (!source || !target) return null;
                return <line key={i} x1={source.x} y1={source.y} x2={target.x} y2={target.y} className="graph-line transition-all duration-200" />;
              })}
            </g>
            <g className="fill-white font-sans text-xs font-medium" style={{ textAnchor: 'middle' }}>
              {data.nodes.map((node, i) => (
                <g key={i}>
                  <circle 
                    className={`graph-node transition-all duration-300 ${node.group === 'lab' ? 'fill-primary' : 'fill-gray-400'}`} 
                    cx={node.x} 
                    cy={node.y} 
                    r={node.group === 'lab' ? 12 : 8} 
                  />
                  <text 
                    fill={node.group === 'lab' ? 'white' : '#8c8b5f'}
                    opacity={node.group === 'lab' ? 0.8 : 1}
                    x={node.x} 
                    y={node.y + (node.group === 'lab' ? 35 : 25)}
                    className="select-none" 
                  >
                    {node.id}
                  </text>
                </g>
              ))}
            </g>
          </g>
        </svg>
      </div>
      <style jsx>{`
        .graph-node:hover {
          fill: #f9f506;
          cursor: pointer;
          filter: drop-shadow(0 0 5px rgba(249, 245, 6, 0.5));
        }
        .graph-line {
          transition: stroke-width 0.2s;
        }
        .graph-group:hover .graph-line {
          stroke-width: 2;
          stroke-opacity: 0.8;
        }
      `}</style>
    </section>
  );
}
