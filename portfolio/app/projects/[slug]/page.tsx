import Link from"next/link";import{notFound}from"next/navigation";import type{Metadata}from"next";import{projects}from"@/lib/content";import ProjectImage from"@/components/ProjectImage";
type P={params:Promise<{slug:string}>};
export const generateStaticParams=()=>projects.map(p=>({slug:p.id}));
export async function generateMetadata({params}:P):Promise<Metadata>{const{slug}=await params;const p=projects.find(x=>x.id===slug);return p?{title:`${p.name} — Case study | Lenj Jesther R. Magsino`,description:`${p.tag}. ${p.desc}`}:{}}
export default async function Page({params}:P){const{slug}=await params;const i=projects.findIndex(x=>x.id===slug);if(i<0)notFound();const p=projects[i];const n=projects[(i+1)%projects.length];
 const S=({h,c}:{h:string;c:string})=><section className="mt-12"><h2 className="eyebrow mb-3">{h}</h2><p className="max-w-3xl text-lg leading-relaxed text-white/80">{c}</p></section>;
 return(<main className="mx-auto max-w-5xl px-5 py-16"><Link href="/#projects" className="text-cyan hover:underline">← All projects</Link>
 <p className="eyebrow mt-10">{p.flagship?"Flagship case study":"Case study"}</p><h1 className="mt-2 font-display text-4xl font-extrabold md:text-7xl">{p.name}</h1>{p.fullTitle&&<p className="mt-3 max-w-4xl text-lg text-white/60">{p.fullTitle}</p>}<p className="mt-3 text-xl text-violet">{p.tag}</p><p className="mt-4 max-w-2xl text-white/70">{p.desc}</p>
 <div className="mt-10"><ProjectImage project={p}/></div>
 <S h="Problem" c={p.problem}/><S h="My role" c={p.role}/><S h="Approach" c={p.approach}/>
 <section className="mt-12"><h2 className="eyebrow mb-3">Technologies & platforms</h2>{p.stack.length?<ul className="flex flex-wrap gap-2">{p.stack.map(s=><li key={s} className="rounded-md border border-electric/30 px-3 py-1.5">{s}</li>)}</ul>:<p className="text-white/60">Implementation technologies have not yet been provided.</p>}</section>
 <S h="Outcome" c={p.outcome}/>
 <div className="mt-12 flex flex-wrap gap-4">{p.demo&&<a className="rounded-full bg-electric px-6 py-3" href={p.demo} target="_blank" rel="noreferrer">Visit website ↗</a>}{p.repo&&<a className="rounded-full border border-white/25 px-6 py-3" href={p.repo} target="_blank" rel="noreferrer">GitHub repository ↗</a>}</div>
 <Link href={`/projects/${n.id}`} className="mt-16 block border-t border-white/10 pt-6 hover:text-cyan">Next project: {n.name} →</Link></main>)}
