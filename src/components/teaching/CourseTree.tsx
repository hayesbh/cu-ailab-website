import React, { useEffect } from 'react';
import type { Course } from './CourseInteractions';

interface CourseTreeProps {
  courses: Course[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  isUnlocked: (id: string) => boolean;
  totalCredits: number;
}

export function CourseTree({ courses, selectedIds, onToggle, isUnlocked, totalCredits }: CourseTreeProps) {
  // Pan and Zoom State
  const [transform, setTransform] = React.useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lastMousePos = React.useRef({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleFactor = 0.001;
    const newScale = Math.min(Math.max(0.2, transform.scale - e.deltaY * scaleFactor), 3);
    
    // Zoom towards mouse pointer logic could go here, but simple center/current zoom is easier for now
    // Let's implement basic zoom relative to center or current position
    // For now, just scaling
    setTransform(prev => ({ ...prev, scale: newScale }));
  };

  const zoomIn = () => setTransform(prev => ({ ...prev, scale: Math.min(3, prev.scale + 0.2) }));
  const zoomOut = () => setTransform(prev => ({ ...prev, scale: Math.max(0.2, prev.scale - 0.2) }));
  const resetZoom = () => setTransform({ x: 0, y: 0, scale: 1 });

  // Handle Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag if not clicking a button
    if ((e.target as HTMLElement).closest('button')) return;
    
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      
      setTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Generate connections (lines)
  const connections: { start: { x: number; y: number }; end: { x: number; y: number }; active: boolean }[] = [];

  courses.forEach(course => {
    course.requisites.forEach(reqId => {
      const reqCourse = courses.find(c => c.id === reqId);
      if (reqCourse) {
        connections.push({
          start: reqCourse.coordinates,
          end: course.coordinates,
          active: selectedIds.has(reqId) 
        });
      }
    });
  });

  return (
    <div className="flex-grow flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <h2 className="text-text-main dark:text-white text-[32px] font-bold leading-tight">AI Course Tree</h2>
        {/* Legend... (unchanged) */}
        <div className="flex gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary border border-black/10"></div>
            <span className="text-text-main dark:text-gray-300">Core</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white border-2 border-primary"></div>
            <span className="text-text-main dark:text-gray-300">Elective</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300"></div>
            <span className="text-text-main dark:text-gray-300">Locked</span>
          </div>
        </div>
      </div>

      {/* Graph Container */}
      <div 
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        className={`relative w-full h-[600px] bg-white dark:bg-[#2a2912] rounded-xl border border-[#e6e6db] dark:border-white/10 overflow-hidden shadow-sm ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
         {/* Grid Background - Static or moving? Usually moving is better reference visually. Let's move it with content or keep static? 
             If static, scrolling content looks weird. Let's make it static for "viewport" feel, but content moves.
         */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#181811 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Zoom Controls */}
        <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
          <button onClick={zoomIn} className="w-10 h-10 bg-white dark:bg-[#2a2912] border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm" aria-label="Zoom In">
             <span className="material-symbols-outlined">add</span>
          </button>
          <button onClick={zoomOut} className="w-10 h-10 bg-white dark:bg-[#2a2912] border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm" aria-label="Zoom Out">
             <span className="material-symbols-outlined">remove</span>
          </button>
          <button onClick={resetZoom} className="w-10 h-10 bg-white dark:bg-[#2a2912] border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm" aria-label="Reset Zoom">
             <span className="material-symbols-outlined">restart_alt</span>
          </button>
        </div>
        
        <div 
            style={{ 
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`, 
                transformOrigin: '0 0',
                width: '100%', 
                height: '100%' 
            }}
            className="w-full h-full transition-transform duration-75 ease-out will-change-transform"
        >
            <svg className="absolute w-[3000px] h-[3000px] pointer-events-none z-0 stroke-[#e6e6db] dark:stroke-white/20" strokeWidth="2">
            {connections.map((conn, idx) => {
                const midX = (conn.start.x + conn.end.x) / 2;
                const d = `M${conn.start.x},${conn.start.y} C${midX},${conn.start.y} ${midX},${conn.end.y} ${conn.end.x},${conn.end.y}`;
                return (
                <path 
                    key={idx} 
                    d={d} 
                    fill="none" 
                    className={conn.active ? 'stroke-primary transition-colors duration-500' : 'transition-colors duration-500'}
                    strokeWidth={conn.active ? 3 : 2}
                />
                );
            })}
            </svg>

            {courses.map(course => {
            const isSelected = selectedIds.has(course.id);
            const unlocked = isUnlocked(course.id);
            const isCore = course.type === 'core';
            
            const limitReached = totalCredits >= 30;
            const isSelectable = unlocked && (isSelected || !limitReached);

            let buttonClass = "flex items-center justify-center z-10 transition-all duration-300 ";
            
            if (isSelected) {
                buttonClass += "w-16 h-16 rounded-full bg-primary shadow-[0_0_15px_rgba(249,245,6,0.5)] hover:scale-110 cursor-pointer text-text-main";
            } else if (isSelectable) {
                buttonClass += `w-14 h-14 rounded-full bg-white dark:bg-background-dark hover:scale-110 cursor-pointer text-text-main dark:text-white ${isCore ? 'border-4 border-primary' : 'border-2 border-primary'}`;
            } else {
                buttonClass += "w-12 h-12 rounded-full bg-[#f5f5f0] dark:bg-white/10 border border-gray-300 cursor-not-allowed grayscale opacity-70 text-gray-400";
            }

            return (
                <div
                key={course.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group/node"
                style={{ left: course.coordinates.x, top: course.coordinates.y }}
                >
                    <button
                        className={`${buttonClass}`}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent drag start
                            if (isSelectable) onToggle(course.id);
                        }}
                        onMouseDown={(e) => e.stopPropagation()} // Allow click but don't start pan
                        disabled={!isSelectable && !isSelected} 
                    >
                    <span className={`material-symbols-outlined ${isSelected ? 'text-2xl' : isSelectable ? 'text-xl' : 'text-lg'}`}>
                        {course.icon}
                    </span>
                    
                    {!isSelectable && !isSelected && (
                        <div className="absolute bottom-full mb-2 bg-text-main text-white text-xs py-1 px-3 rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                        {unlocked && limitReached ? "Credit Limit Reached" : `Prereq: ${course.requisites.join(', ')}`}
                        </div>
                    )}
                    </button>
                    <div className={`text-xs font-bold whitespace-nowrap max-w-[120px] text-center ${isSelected ? 'text-text-main dark:text-white' : isSelectable ? 'text-text-main dark:text-white' : 'text-gray-400'}`}>
                        {course.code}: {course.title}
                    </div>
                </div>
            );
            })}
        </div>
      </div>
    </div>
  );
}
