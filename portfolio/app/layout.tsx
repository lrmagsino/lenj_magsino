import type{Metadata}from"next";import{Inter,Sora,JetBrains_Mono}from"next/font/google";import"./globals.css";
const inter=Inter({subsets:["latin"],variable:"--font-inter"});const sora=Sora({subsets:["latin"],variable:"--font-sora"});const jb=JetBrains_Mono({subsets:["latin"],variable:"--font-jb"});
export const metadata:Metadata={title:"Lenj Jesther Magsino — Computer Science Student & Aspiring Software Engineer",description:"Portfolio of Lenj Jesther Magsino: web development, AI and software projects including DocuGraph."};
export default function Root({children}:{children:React.ReactNode}){return<html lang="en" className={`${inter.variable} ${sora.variable} ${jb.variable}`}><body>{children}</body></html>}
