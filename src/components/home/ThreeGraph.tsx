'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeGraph() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    
    // Camera params - moved further back and lower to look up at the "mountains"
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 25);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 12000; // Increased count for denser resolution
    
    const positions = new Float32Array(count * 3);
    const originalY = new Float32Array(count);
    const phases = new Float32Array(count);
    
    // Grid parameters
    const rows = 80;
    const cols = 150;
    const width = 80;
    const depth = 40;
    
    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        if (i >= count) break;
        
        // Normalized coordinates (-1 to 1)
        const u = (x / cols) * 2 - 1;
        const v = (z / rows) * 2 - 1;
        
        const xPos = u * (width / 2);
        const zPos = v * (depth / 2);
        
        // Flatiron shape math
        // A main ridge that drops off, with some distinct peaks
        // Using noise-like combination of sines for distinct peaks
        
        // Base elevation based on Z (higher in back)
        let y = Math.max(0, -v * 2); 
        
        // Add "peaks"
        // 5 distinct peaks across the horizon
        const peakShape = Math.abs(Math.sin(u * 5 + Math.cos(v * 2))) * Math.exp(-Math.abs(u) * 1.5);
        y += peakShape * 8; // Height of mountains
        
        // Add details
        y += Math.sin(u * 20 + v * 10) * 0.5;

        // Taper edges to ground
        y *= Math.max(0, 1 - Math.abs(u));
        
        // Flatten the "foreground" (bottom of z)
        if (z < rows * 0.2) {
             y *= (z / (rows * 0.2));
        }

        positions[i * 3] = xPos;
        positions[i * 3 + 1] = y - 5; // Shift down
        positions[i * 3 + 2] = zPos;
        
        originalY[i] = positions[i * 3 + 1];
        phases[i] = Math.random() * Math.PI * 2;
        i++;
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xCFB87C, 
      size: 0.12,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4, // Reduced transparency as requested ("fade into background")
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Floating Bubbles (Background)
    const bubblesGeometry = new THREE.BufferGeometry();
    const bubblesCount = 100; // Scatter a few bubbles
    const bubblesPositions = new Float32Array(bubblesCount * 3);
    const bubblesSizes = new Float32Array(bubblesCount);
    const bubblesSpeeds = new Float32Array(bubblesCount);

    for (let i = 0; i < bubblesCount; i++) {
        // Random spread
        bubblesPositions[i * 3] = (Math.random() - 0.5) * 100; // X: wide spread
        bubblesPositions[i * 3 + 1] = Math.random() * 20 - 5; // Y: mostly upper half
        bubblesPositions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10; // Z: depth

        bubblesSizes[i] = Math.random() * 0.5 + 0.2; // Varying sizes
        bubblesSpeeds[i] = Math.random() * 0.02 + 0.005; // Varying slow speeds
    }

    bubblesGeometry.setAttribute('position', new THREE.BufferAttribute(bubblesPositions, 3));
    bubblesGeometry.setAttribute('size', new THREE.BufferAttribute(bubblesSizes, 1));

    // Custom shader material for soft circular particles if possible, but PointsMaterial is faster/easier for now
    // Using a texture or just soft square points. For "circles", we need a map or shader.
    // Let's use simple PointsMaterial for now, might look square but with low opacity it's okay for "bokeh"
    // Actually, let's generate a simple circle texture on canvas to make them round
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(16, 16, 16, 0, Math.PI * 2);
        ctx.fill();
    }
    const circleTexture = new THREE.CanvasTexture(canvas);

    const bubblesMaterial = new THREE.PointsMaterial({
        color: 0xCFB87C,
        map: circleTexture, // Make them round
        size: 0.5, // Base size, attribute will scale? No, PointsMaterial size is uniform unless using shader.
        // Wait, standard PointsMaterial doesn't support per-point size easily without sizeAttenuation true, but all points get same base size.
        // Let's just stick to uniform size or randomized 'size' in geometry is ignored by basic material.
        // We'll trust sizeAttenuation acts on distance to give variety.
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        alphaTest: 0.1, // Fix transparency overlapping issues slightly
        depthWrite: false,
    });

    const bubblesMesh = new THREE.Points(bubblesGeometry, bubblesMaterial);
    scene.add(bubblesMesh);


    // Fog to help it fade into background
    // Match the dark background color
    scene.fog = new THREE.FogExp2(0x000000, 0.035);

    // Animation
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      // Much slower time increment
      time += 0.002; 
      
      // Update Mountain Particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      
      let i = 0;
      for (let x = 0; x < cols; x++) {
        for (let z = 0; z < rows; z++) {
          if (i >= count) break;
          
          const yBase = originalY[i];
          const perturbation = Math.sin(x * 0.1 + z * 0.1 + time) * 0.2 + 
                               Math.cos(x * 0.05 + time * 0.5) * 0.1;

          positions[i * 3 + 1] = yBase + perturbation;
          i++;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      particlesMesh.rotation.y = Math.sin(time * 0.1) * 0.05;

      // Update Bubbles
      const bPositions = bubblesGeometry.attributes.position.array as Float32Array;
      for (let j = 0; j < bubblesCount; j++) {
          // Move left
          bPositions[j * 3] -= bubblesSpeeds[j];

          // Wrap around
          if (bPositions[j * 3] < -50) {
              bPositions[j * 3] = 50;
          }
      }
      bubblesGeometry.attributes.position.needsUpdate = true;


      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none fade-mask" />;
}
