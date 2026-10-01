import {useState,useEffect,ReactNode} from 'react';import {Link,NavLink,useLocation} from 'react-router-dom';import {Menu,X,Phone,Mail,Globe} from 'lucide-react';import {site} from '../data/site'
const links=[['/','Home'],['/solutions','Solutions'],['/support','Support']]
export default function Layout({children}:{children:ReactNode}){const [o,setO]=useState(false);const {pathname}=useLocation();useEffect(()=>{setO(false);window.scrollTo(0,0)},[pathname])
return(<><header className="fixed top-0 inset-x-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/30"><div className="wrap flex items-center justify-between h-20">
<Link to="/" className="flex items-center gap-3"><img src="/logo.png" alt="TECHSOL logo" className="h-14 w-14 object-contain"/><div className="leading-none"><div className="text-3xl font-extrabold tracking-tight gradient-text">{site.name}</div><div className="text-[10px] tracking-[0.35em] uppercase text-primary mt-1">{site.sub}</div></div></Link>
<nav className="hidden md:flex items-center gap-7">{links.map(([t,l])=><NavLink key={t} to={t} className={({isActive})=>isActive?'text-primary font-semibold':'text-muted hover:text-foreground'}>{l}</NavLink>)}<Link to="/quote" className="btn-primary !py-2">Free Quote</Link></nav>
<button className="md:hidden" aria-label="Menu" onClick={()=>setO(!o)}>{o?<X/>:<Menu/>}</button></div>
{o&&<nav className="md:hidden glass !rounded-none p-4 flex flex-col gap-4">{links.map(([t,l])=><Link key={t} to={t}>{l}</Link>)}<Link to="/quote" className="btn-primary">Free Quote</Link></nav>}</header>
<main className="pt-20 min-h-screen">{children}</main>
<footer className="border-t border-border/30 mt-20 py-12"><div className="wrap grid md:grid-cols-3 gap-8">
<div><div className="flex items-center gap-3"><img src="/logo.png" alt="" className="h-12 w-12"/><div className="text-2xl font-extrabold gradient-text">{site.name}</div></div><p className="text-muted mt-3 text-sm">{site.motto}</p><p className="text-primary text-xs mt-2 tracking-wider">{site.tagline}</p></div>
<div className="space-y-2 text-sm"><div className="font-semibold">Contact</div><a href={'tel:'+site.phoneHref} className="flex gap-2 text-muted hover:text-primary"><Phone size={16}/>{site.phone}</a><a href={'mailto:'+site.email} className="flex gap-2 text-muted hover:text-primary"><Mail size={16}/>{site.email}</a></div>
<div className="space-y-2 text-sm"><div className="font-semibold">Follow us</div>{site.socials.map(([n,u])=><a key={n} href={u} target="_blank" rel="noreferrer" className="flex gap-2 text-muted hover:text-primary"><Globe size={16}/>{n}</a>)}</div></div>
<p className="wrap text-center text-xs text-muted mt-10">© {new Date().getFullYear()} TECHSOL Consultants. All rights reserved. End-to-End Encrypted.</p></footer></>)}
