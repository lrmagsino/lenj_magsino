"use client";
import{useEffect,useState}from"react";import{links}from"@/lib/content";
const items=["home","about","skills","projects","experience","contact"];
export default function Nav(){const[open,setOpen]=useState(false);const[active,setActive]=useState("home");
 useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setActive(e.target.id)),{rootMargin:"-45% 0px -50% 0px"});
  items.forEach(i=>{const el=document.getElementById(i);el&&io.observe(el)});return()=>io.disconnect()},[]);
 return(<header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-midnight/60">
  <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
   <a href="#home" className="font-display font-bold tracking-tight">LJM<span className="text-cyan">.</span></a>
   <button className="p-2 md:hidden" aria-expanded={open} aria-controls="menu" onClick={()=>setOpen(!open)}>{open?"Close":"Menu"}</button>
   <ul id="menu" className={`${open?"flex":"hidden"} absolute left-0 right-0 top-full flex-col gap-3 bg-midnight/95 p-5 md:static md:flex md:flex-row md:items-center md:gap-6 md:bg-transparent md:p-0`}>
    {items.map(i=><li key={i}><a href={`#${i}`} onClick={()=>setOpen(false)} aria-current={active===i?"page":undefined} className={`text-sm capitalize transition-colors hover:text-cyan ${active===i?"text-cyan":"text-white/70"}`}>{i}</a></li>)}
    <li><a href={links.resume} className="rounded-full border border-electric/60 px-4 py-1.5 text-sm hover:bg-electric/20">Résumé</a></li>
   </ul></nav></header>)}
