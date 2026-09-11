import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { appStore } from '../data/store.js';

gsap.registerPlugin(ScrollTrigger);

let stInstance = null;

export function renderScrollytelling(container) {
  if (!appStore.showScrollytelling) {
    if (stInstance) {
      ScrollTrigger.getAll().forEach(t => t.kill());
      stInstance = null;
    }
    container.innerHTML = '';
    return;
  }

  if (container.querySelector('#scrollytelling-overlay')) return;

  container.innerHTML = `
    <div id="scrollytelling-overlay" class="relative z-[600] bg-[#fafafa] flex flex-col w-full font-sans">
      
      <!-- Scroll Runway (1000vh for multi-chapter cinematic pacing) -->
      <div id="st-runway" class="w-full relative" style="height: 1000vh;">
        
        <!-- Sticky Visualization Window -->
        <div id="st-visual-window" class="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden bg-[#fafafa]" style="perspective: 1500px;">
          
          <!-- Shared Editorial Headers (Constant) -->
          <div class="absolute top-8 left-8 sm:top-12 sm:left-12 z-50 pointer-events-none" id="st-global-header">
            <div class="w-6 h-6 bg-[#141414] text-white flex items-center justify-center font-bold text-[10px] mb-2">C</div>
            <h2 id="st-status" class="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#141414] uppercase">VIRTUAL FLIGHT</h2>
          </div>
          
          <div class="absolute top-8 right-8 sm:top-12 sm:right-12 z-50 flex flex-col items-end pointer-events-none">
             <p id="st-counter" class="text-4xl sm:text-5xl font-black text-[#141414] font-mono tracking-tighter opacity-0">0<span class="text-xl text-gray-400">m²</span></p>
             <span class="text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-1">Bole Atlas</span>
          </div>

          <!-- Master Scene Container (Takes the 3D transforms) -->
          <div id="st-master-scene" class="relative w-full h-full flex items-center justify-center" style="transform-style: preserve-3d; will-change: transform;">
            
            <!-- CHAPTER 1: Map Flyover -->
            <div id="st-chap1-map" class="absolute inset-0 flex items-center justify-center w-full h-full overflow-hidden pointer-events-none will-change-transform">
              <!-- Abstract Map Grid/Lines -->
              <div id="st-map-grid" class="absolute w-[200vw] h-[200vh] bg-[radial-gradient(circle_at_center,_transparent_0%,_#fafafa_70%),repeating-linear-gradient(0deg,transparent,transparent_49px,#e5e7eb_49px,#e5e7eb_50px),repeating-linear-gradient(90deg,transparent,transparent_49px,#e5e7eb_49px,#e5e7eb_50px)] opacity-60"></div>
              
              <!-- Map Clouds / Overlay for depth -->
              <div id="st-map-clouds" class="absolute w-[300vw] h-[300vh] opacity-20 bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_transparent_100%)] blur-2xl"></div>
              
              <!-- POI Texts -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="st-poi absolute top-[20%] left-[20%] text-[10px] tracking-widest font-bold text-slate-400">BOLE ATLAS PREMIUM CAFE CORRIDOR</div>
                <div class="st-poi absolute bottom-[30%] right-[15%] text-[10px] tracking-widest font-bold text-slate-400">INTERNATIONAL SCHOOL RESIDENCY</div>
                <div class="st-poi absolute top-[60%] left-[10%] text-[10px] tracking-widest font-bold text-slate-400">PARKWAY LANDMARKS</div>
              </div>

              <!-- Center Target Pin -->
              <div id="st-target-pin" class="absolute w-8 h-8 bg-[#141414] rounded-[50%_50%_50%_0] transform rotate-[-45deg] flex items-center justify-center z-10 origin-center will-change-transform">
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            <!-- CHAPTER 2: Hero Photo & Walkthrough -->
            <div id="st-chap2-hero" class="absolute inset-0 w-full h-full overflow-hidden opacity-0 flex items-center justify-center bg-[#141414] pointer-events-none transform-gpu will-change-transform">
              <img id="st-hero-img" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80" class="absolute w-[110%] h-[110%] object-cover opacity-80 will-change-transform" alt="Penthouse Interior">
              
              <!-- Narrative Text Overlays -->
              <div class="relative z-10 w-full max-w-3xl px-8 flex flex-col items-center justify-center text-center h-full">
                <p id="slide-a" class="absolute text-2xl sm:text-4xl font-light text-white tracking-wide opacity-0 transform translate-y-8">Premium European hardwood flooring throughout.</p>
                <p id="slide-b" class="absolute text-2xl sm:text-4xl font-light text-white tracking-wide opacity-0 transform translate-y-8">Custom book-matched stone countertops and integrated chef's kitchen.</p>
                <p id="slide-c" class="absolute text-2xl sm:text-4xl font-light text-white tracking-wide opacity-0 transform translate-y-8">Full smart-home wiring and biometric digital security integration.</p>
              </div>
            </div>

            <!-- CHAPTER 3: Floor Plan SVG Canvas -->
            <div id="st-chap3-blueprint" class="absolute w-full max-w-5xl aspect-video px-4 sm:px-12 flex items-center justify-center opacity-0 pointer-events-none transform-gpu will-change-transform bg-[#fafafa]">
              
              <svg id="st-svg-canvas" class="w-full h-full drop-shadow-sm" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Envelope -->
                <path id="st-envelope" d="M200 150 L1000 150 L1000 350 L1100 350 L1100 650 L200 650 Z" stroke="#141414" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/>
                <path id="st-pillars" d="M220 170 h20 v20 h-20 z M960 170 h20 v20 h-20 z M960 610 h20 v20 h-20 z M220 610 h20 v20 h-20 z M600 170 h20 v20 h-20 z M600 610 h20 v20 h-20 z" fill="#141414" opacity="0"/>

                <!-- Partitions & Flow -->
                <g id="st-partitions" opacity="0">
                  <path d="M200 400 L500 400 L500 650" stroke="#141414" stroke-width="2"/>
                  <path d="M500 150 L500 300 L800 300" stroke="#141414" stroke-width="2"/>
                  <path d="M800 150 L800 300" stroke="#141414" stroke-width="2"/>
                  <path d="M1000 350 L800 350 L800 650" stroke="#141414" stroke-width="2" stroke-dasharray="10 10"/>
                  <path class="door-arc" d="M500 350 Q450 350 450 400" stroke="#141414" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>
                  <path class="door-arc" d="M750 300 Q750 350 800 350" stroke="#141414" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>
                  <path class="door-arc" d="M500 500 Q550 500 550 550" stroke="#141414" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>
                </g>

                <!-- Furniture Scale -->
                <g id="st-furniture" opacity="0">
                  <rect x="250" y="450" width="120" height="140" stroke="#888" stroke-width="1.5" fill="#fafafa"/>
                  <rect x="260" y="460" width="45" height="30" stroke="#888" stroke-width="1"/>
                  <rect x="315" y="460" width="45" height="30" stroke="#888" stroke-width="1"/>
                  <circle cx="900" cy="450" r="60" stroke="#888" stroke-width="1.5" fill="#fafafa"/>
                  <rect x="830" y="435" width="20" height="30" stroke="#888" stroke-width="1" rx="5"/>
                  <rect x="950" y="435" width="20" height="30" stroke="#888" stroke-width="1" rx="5"/>
                  <rect x="885" y="380" width="30" height="20" stroke="#888" stroke-width="1" rx="5"/>
                  <rect x="885" y="500" width="30" height="20" stroke="#888" stroke-width="1" rx="5"/>
                  <path d="M550 450 L750 450 L750 600 L680 600 L680 520 L550 520 Z" stroke="#888" stroke-width="1.5" fill="#fafafa"/>
                  <rect x="600" y="550" width="50" height="50" stroke="#888" stroke-width="1"/>
                </g>

                <!-- Golden Light & Family -->
                <g id="st-lighting" opacity="0">
                  <defs>
                    <radialGradient id="sunlight" cx="50%" cy="100%" r="70%">
                      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.12"/>
                      <stop offset="100%" stop-color="#fafafa" stop-opacity="0"/>
                    </radialGradient>
                  </defs>
                  <rect x="200" y="150" width="900" height="500" fill="url(#sunlight)" pointer-events="none"/>
                  <g fill="#141414" opacity="0.8">
                    <circle cx="600" cy="490" r="12" />
                    <circle cx="640" cy="485" r="10" />
                    <circle cx="680" cy="490" r="14" />
                  </g>
                </g>
              </svg>
            </div>

            <!-- CTA Exit Overlay (Sits on top of everything) -->
            <div id="st-final-cta" class="absolute inset-0 flex flex-col items-center justify-center bg-[#fafafa]/80 backdrop-blur-md opacity-0 pointer-events-none z-[100]">
               <div class="mb-8 text-center" id="st-final-text">
                 <h1 class="text-4xl sm:text-5xl font-black tracking-tight text-[#141414]">Experience the Flow.</h1>
                 <p class="text-xs font-bold tracking-widest text-slate-500 uppercase mt-4">18 Exclusive Units • Bole Atlas</p>
               </div>
               <button id="st-inspect-btn" class="group px-8 py-4 bg-emerald-600 text-white font-bold text-xs sm:text-sm tracking-widest uppercase rounded-xl hover:bg-emerald-700 shadow-xl hover:shadow-2xl transition transform hover:scale-[1.02] active:scale-95 flex items-center gap-3">
                  <span>Inspect Component Units</span>
                  <span class="transition-transform group-hover:translate-x-1.5">→</span>
               </button>
            </div>

          </div> <!-- End Master Scene -->

          <!-- Scroll Prompt -->
          <div id="st-scroll-prompt" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#141414] opacity-50 animate-bounce pointer-events-none">
            <span class="text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
            <span>↓</span>
          </div>
        </div>
      </div>
    </div>
  `;

  stInstance = true;

  setTimeout(() => {
    initGSAPTimeline(container);
  }, 100);
}

function initGSAPTimeline(container) {
  const envelope = container.querySelector('#st-envelope');
  if (!envelope) return;

  const envelopeLength = envelope.getTotalLength();
  
  gsap.set(envelope, { 
    strokeDasharray: envelopeLength, 
    strokeDashoffset: envelopeLength 
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container.querySelector('#st-runway'),
      start: "top top",
      end: "bottom bottom",
      scrub: 1, 
    }
  });

  const statusEl = container.querySelector('#st-status');
  const counterEl = container.querySelector('#st-counter');
  const counterObj = { val: 0 };
  const updateCounter = () => {
    counterEl.innerHTML = `${Math.round(counterObj.val)}<span class="text-xl text-gray-400">m²</span>`;
  };

  tl.to(container.querySelector('#st-scroll-prompt'), { opacity: 0, duration: 0.1 }, 0);

  // ==========================================
  // CHAPTER 1: Virtual Neighborhood Flyover (0 - 30%)
  // ==========================================
  const chap1 = "chap1";
  tl.add(chap1, 0);

  // Zoom into the map pin
  tl.to(container.querySelector('#st-chap1-map'), { scale: 50, ease: "power2.in", duration: 3 }, chap1);
  tl.to(container.querySelectorAll('.st-poi'), { opacity: 0, scale: 1.5, stagger: 0.1, duration: 1 }, chap1);
  tl.to(container.querySelector('#st-target-pin'), { scale: 5, ease: "power3.in", duration: 3 }, chap1);

  // Black screen takeover at the end of the zoom (using the black pill as the transition boundary)
  tl.set(container.querySelector('#st-chap2-hero'), { opacity: 1 }, chap1 + "+=2.8");

  // ==========================================
  // CHAPTER 2: The Walkthrough Story (30 - 65%)
  // ==========================================
  const chap2 = "chap2";
  tl.add(chap2, chap1 + "+=3");
  tl.add(() => { statusEl.innerText = "THE RESIDENCE"; }, chap2);

  // Counter-parallax image
  tl.to(container.querySelector('#st-hero-img'), { y: 30, duration: 3, ease: "none" }, chap2);

  // Text slides sequence
  const slideA = container.querySelector('#slide-a');
  const slideB = container.querySelector('#slide-b');
  const slideC = container.querySelector('#slide-c');

  tl.to(slideA, { opacity: 1, y: 0, duration: 0.5 }, chap2)
    .to(slideA, { opacity: 0, y: -10, duration: 0.5 }, chap2 + "+=0.8")
    .to(slideB, { opacity: 1, y: 0, duration: 0.5 }, chap2 + "+=1")
    .to(slideB, { opacity: 0, y: -10, duration: 0.5 }, chap2 + "+=1.8")
    .to(slideC, { opacity: 1, y: 0, duration: 0.5 }, chap2 + "+=2")
    .to(slideC, { opacity: 0, y: -10, duration: 0.5 }, chap2 + "+=2.8");

  // Tilt-Shift Camera Pivot & Dissolve
  const chap2Pivot = "chap2Pivot";
  tl.add(chap2Pivot, chap2 + "+=3");
  
  tl.to(container.querySelector('#st-chap2-hero'), { 
    rotateX: 45, 
    scale: 0.9, 
    opacity: 0, 
    duration: 1, 
    ease: "power2.inOut" 
  }, chap2Pivot);

  // Reveal Blueprint beneath
  tl.set(container.querySelector('#st-chap3-blueprint'), { opacity: 1 }, chap2Pivot);
  tl.fromTo(container.querySelector('#st-chap3-blueprint'), 
    { rotateX: -30, scale: 0.8 }, 
    { rotateX: 0, scale: 1, duration: 1, ease: "power2.out" }, 
    chap2Pivot
  );

  // ==========================================
  // CHAPTER 3: Interactive Floor Plan (65 - 100%)
  // ==========================================
  const chap3 = "chap3";
  tl.add(chap3, chap2Pivot + "+=1");
  tl.add(() => { statusEl.innerText = "STRUCTURAL ENVELOPE"; }, chap3);

  tl.to(counterEl, { opacity: 1, duration: 0.2 }, chap3)
    .to(envelope, { strokeDashoffset: 0, duration: 2, ease: "power1.inOut" }, chap3)
    .to(counterObj, { val: 240, duration: 2, onUpdate: updateCounter, ease: "power1.inOut" }, chap3)
    .to(container.querySelector('#st-pillars'), { opacity: 1, duration: 0.5 }, chap3 + "+=1.5");

  tl.add(() => { statusEl.innerText = "ARCHITECTURAL FLOW"; }, chap3 + "+=2")
    .to(container.querySelector('#st-partitions'), { opacity: 1, duration: 0.8, ease: "power2.out" }, chap3 + "+=2");

  tl.add(() => { statusEl.innerText = "TRUE SCALE ANALYSIS"; }, chap3 + "+=2.8")
    .fromTo(container.querySelector('#st-furniture'), 
      { opacity: 0, scale: 0.98, transformOrigin: "center center" }, 
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" }, 
      chap3 + "+=2.8"
    );

  tl.to(container.querySelector('#st-lighting'), { opacity: 1, duration: 1 }, chap3 + "+=3.8")
    .to(container.querySelector('#st-final-cta'), { opacity: 1, pointerEvents: "auto", duration: 0.5 }, chap3 + "+=4.2");

  // ==========================================
  // EXIT PROTOCOL: GEOMETRIC MORPH
  // ==========================================
  container.querySelector('#st-inspect-btn').addEventListener('click', () => {
    const masterScene = container.querySelector('#st-master-scene');
    const overlay = container.querySelector('#scrollytelling-overlay');
    const finalCTA = container.querySelector('#st-final-cta');
    const blueprint = container.querySelector('#st-chap3-blueprint');

    // Hide the CTA immediately
    gsap.to(finalCTA, { opacity: 0, duration: 0.2 });

    // Step 1: Perspective Break (Isometric Skew)
    gsap.to(masterScene, {
      rotateX: 60,
      rotateZ: -45,
      scale: 0.7,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        // Step 2: Structural Split (Clip paths)
        // We clone the blueprint to split it
        const leftHalf = blueprint.cloneNode(true);
        const rightHalf = blueprint.cloneNode(true);
        
        masterScene.innerHTML = '';
        masterScene.appendChild(leftHalf);
        masterScene.appendChild(rightHalf);

        gsap.set(leftHalf, { clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)", position: "absolute" });
        gsap.set(rightHalf, { clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)", position: "absolute" });

        // Left shrinks to a point (simulating map pin)
        // Right expands outward (simulating cards)
        gsap.to(leftHalf, {
          x: -200,
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "power2.in"
        });

        gsap.to(rightHalf, {
          x: 400,
          scale: 1.5,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            // Garbage Collection & Execution
            ScrollTrigger.getAll().forEach(t => t.kill());
            stInstance = null;
            appStore.dismissScrollytelling();
          }
        });
      }
    });
  });
}
