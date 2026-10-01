import {useState} from 'react';import {Search,ExternalLink} from 'lucide-react';import {faqs,manuals} from '../data/site';import {Head} from './Home'
const cats=['All',...Array.from(new Set(faqs.map(f=>f.cat)))]
export default function Support(){const [q,setQ]=useState('');const [c,setC]=useState('All')
const list=faqs.filter(f=>(c==='All'||f.cat===c)&&(f.q+f.steps.join(' ')).toLowerCase().includes(q.toLowerCase()))
return(<div className="wrap py-14"><Head t="Support Centre" s="Troubleshooting guides and manuals"/>
<div className="relative max-w-xl mx-auto"><Search className="absolute left-3 top-3 text-muted" size={18}/><input className="field !pl-10" placeholder="Search problems…" value={q} onChange={e=>setQ(e.target.value)}/></div>
<div className="flex flex-wrap gap-2 justify-center my-6">{cats.map(x=><button key={x} onClick={()=>setC(x)} className={'px-4 py-1 rounded-full border border-border/40 text-sm '+(c===x?'bg-primary text-primary-foreground':'hover:bg-primary/10')}>{x}</button>)}</div>
<div className="grid md:grid-cols-2 gap-5">{list.map(f=><div key={f.q} className="glass glass-hover p-5"><div className="text-xs text-primary uppercase tracking-wider">{f.cat}</div><h3 className="font-bold my-1">{f.q}</h3><ol className="list-decimal pl-5 text-sm text-muted space-y-1">{f.steps.map(s=><li key={s}>{s}</li>)}</ol></div>)}{!list.length&&<p className="text-muted text-center col-span-2">No results. Call us for help.</p>}</div>
<h2 className="text-2xl font-bold gradient-text mt-14 mb-4">Manual Portals</h2><div className="flex flex-wrap gap-3">{manuals.map(([n,u])=><a key={n} href={u} target="_blank" rel="noreferrer" className="glass glass-hover px-5 py-3 flex gap-2 items-center">{n}<ExternalLink size={14}/></a>)}</div></div>)}
