"use client";
import{useEffect,useRef}from"react";import gsap from"gsap";import{links}from"@/lib/content";
const code=["const build = () => {","  return meaning;","};","<System />","{ ai: true }","SELECT * FROM ideas;"];
const nodes=[[900,120],[1040,260],[880,380],[1010,520],[1150,180]];
export default function Hero(){const root=useRef<HTMLElement>(null);
 useEffect(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  let mv:((e:MouseEvent)=>void)|null=null;
  const ctx=gsap.context(()=>{
   gsap.from("[data-h]",{yPercent:110,opacity:0,stagger:.12,duration:1.1,ease:"power4.out",delay:.2});
   gsap.from("[data-win]",{opacity:0,scale:.85,y:60,stagger:.15,duration:1.4,ease:"power3.out",delay:.4});
   if(matchMedia("(pointer:fine)").matches){const q=gsap.utils.toArray<HTMLElement>("[data-m]").map(l=>({x:gsap.quickTo(l,"x",{duration:.8}),y:gsap.quickTo(l,"y",{duration:.8}),k:parseFloat(l.dataset.m||"10")}));
    mv=e=>{const nx=e.clientX/innerWidth-.5,ny=e.clientY/innerHeight-.5;q.forEach(o=>{o.x(-nx*o.k);o.y(-ny*o.k)})};addEventListener("mousemove",mv)}
  },root);return()=>{if(mv)removeEventListener("mousemove",mv);ctx.revert()}},[]);
 return(<section id="home" ref={root} className="relative flex min-h-svh items-center overflow-hidden">
  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_30%,#2F6BFF33,transparent),radial-gradient(40%_40%_at_20%_80%,#8B7CF633,transparent),linear-gradient(#050B1A,#0a1330)]"/>
  <svg aria-hidden className="absolute inset-0 h-full w-full opacity-40" data-depth="0.1"><defs><pattern id="g" width="56" height="56" patternUnits="userSpaceOnUse"><path d="M56 0H0V56" fill="none" stroke="#2F6BFF" strokeOpacity=".18"/></pattern></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>
  <div aria-hidden className="absolute inset-0" data-m="14"><svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice"><g stroke="#3CE0F0" strokeOpacity=".5" fill="none" className="pulse"><path d="M900 120L1040 260L880 380L1010 520"/><path d="M1040 260L1150 180"/></g>{nodes.map(([x,y])=><circle key={x} cx={x} cy={y} r="4" fill="#3CE0F0"/>)}</svg></div>
  <div aria-hidden className="absolute inset-0 hidden sm:block" data-depth="0.25"><div data-m="26" className="absolute inset-0">
   {code.slice(0,3).map((c,i)=><pre key={c} data-win className="float absolute rounded-lg border border-violet/30 bg-charcoal/70 p-3 font-mono text-xs text-cyan/80" style={{right:`${6+i*9}%`,top:`${18+i*20}%`,animationDelay:`${i*1.5}s`}}>{c}</pre>)}</div></div>
  <div aria-hidden className="absolute inset-0" data-depth="0.45"><div data-m="40" className="absolute inset-0 font-mono text-xl text-electric/40">
   {code.slice(3).map((c,i)=><span key={c} className="float absolute" style={{left:`${8+i*28}%`,top:`${72-i*14}%`,animationDelay:`${i*2}s`}}>{c}</span>)}</div></div>
  <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-24">
   <p className="eyebrow mb-4 overflow-hidden"><span data-h className="inline-block">Computer Science Student | Aspiring Software Engineer</span></p>
   <h1 className="font-display text-[clamp(2.4rem,9vw,7rem)] font-extrabold leading-[.95]">{["LENJ JESTHER","MAGSINO"].map(w=><span key={w} className="block overflow-hidden"><span data-h className="block bg-gradient-to-r from-white to-cyan bg-clip-text text-transparent">{w}</span></span>)}</h1>
   <p className="mt-6 max-w-xl overflow-hidden text-lg text-white/75"><span data-h className="block">Building Intelligent Systems. Creating Meaningful Digital Experiences.</span></p>
   <div className="mt-8 flex flex-wrap gap-3"><a href="#projects" className="rounded-full bg-electric px-6 py-3 font-medium hover:bg-electric/80">Explore My Work</a><a href={links.resume} className="rounded-full border border-white/25 px-6 py-3 hover:border-cyan hover:text-cyan">Download Résumé</a></div>
  </div>
  <a href="#about" aria-label="Scroll to About" className="absolute bottom-6 left-1/2 -translate-x-1/2"><span className="block h-12 w-px bg-gradient-to-b from-cyan to-transparent pulse"/></a>
 </section>)}
