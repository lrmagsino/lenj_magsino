"use client";
import{useEffect}from"react";import gsap from"gsap";import{ScrollTrigger}from"gsap/ScrollTrigger";import Lenis from"lenis";
gsap.registerPlugin(ScrollTrigger);
export default function Motion(){useEffect(()=>{
 if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 const lenis=new Lenis({lerp:.09});lenis.on("scroll",ScrollTrigger.update);
 const tick=(t:number)=>lenis.raf(t*1000);gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
 const ctx=gsap.context(()=>{
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el=>gsap.from(el,{y:48,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 85%"}}));
  gsap.utils.toArray<HTMLElement>("[data-depth]").forEach(el=>{const d=parseFloat(el.dataset.depth||"0.2");
   gsap.to(el,{y:()=>-d*400,ease:"none",scrollTrigger:{trigger:el.closest("section")||document.body,start:"top bottom",end:"bottom top",scrub:true}})});
  gsap.utils.toArray<HTMLElement>("[data-line]").forEach(el=>gsap.from(el,{scaleY:0,transformOrigin:"top",ease:"none",scrollTrigger:{trigger:el,start:"top 80%",end:"bottom 60%",scrub:true}}));
  const sc=document.querySelector<HTMLElement>("[data-hscroll]");const tr=sc?.firstElementChild as HTMLElement|null;
  if(sc&&tr&&innerWidth>=1024)gsap.to(tr,{x:()=>-(tr.scrollWidth-innerWidth+96),ease:"none",scrollTrigger:{trigger:sc,pin:true,scrub:.6,end:()=>"+="+(tr.scrollWidth-innerWidth),invalidateOnRefresh:true}});
 });
 return()=>{ctx.revert();gsap.ticker.remove(tick);lenis.destroy()};
},[]);return null}
