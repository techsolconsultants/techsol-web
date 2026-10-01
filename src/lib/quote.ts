// Pricing engine. Edit the PRICES block to change rates (all in PKR).
export type Cfg={site:string;count:number;dedicated:string[];common:boolean;kind:'analog'|'digital';hdds:number;env:string;days:number;stories:number;rating:string;distance:number;features:string[];boxes:'all'|'few'|'none'}
export type Line={id:string;name:string;qty:number;unit:number;note?:string}
export const PRICES={cam:{analog2:2800,analog4:4000,ip2:4200,ip4:6200,wifi:7500,wireless4g:28000},ded:{LPR:38000,Hyperlapse:55000,Thermal:180000,PTZ:60000} as Record<string,number>,
dvr:{4:9000,8:13000,16:24000,32:48000} as Record<number,number>,nvr:{4:14000,8:20000,16:38000,32:65000,64:120000} as Record<number,number>,
hdd:{1:9000,2:13500,4:21000,6:27000,8:36000,10:45000,12:52000,16:72000,18:80000} as Record<number,number>,
poe:{4:8000,8:14000,16:26000,24:38000} as Record<number,number>,cat6Box:35500,coax:9800,psu10A:4800,box:450,misc:350,labour:{Residential:2500,Commercial:3000,Industrial:3500} as Record<string,number>,
extra:{'Built-In Audio':600,'Built-In Mic':500,'SD Card':1200,'Dual Light night vision':1200,'Full-Color night vision':1800,'Dark Areas':2000} as Record<string,number>}
export const WIRELESS_FEATURES=['Solar Panel','Battery','4G']
export const isWireless=(c:Cfg)=>WIRELESS_FEATURES.some(f=>c.features.includes(f))
const up=(a:number,t:number[])=>t.find(x=>x>=a)??t[t.length-1]
const keys=(o:object)=>Object.keys(o).map(Number)
export function disabledFeatures(c:Cfg):string[]{const d:string[]=[]
 const analog=c.common&&c.kind==='analog'&&!c.dedicated.length
 if(analog)d.push('SD Card','4G','Solar Panel','Battery')
 if(c.dedicated.some(x=>['LPR','Thermal'].includes(x)))d.push('4G','Solar Panel','Battery')
 if(c.env==='Indoor')d.push('Solar Panel')
 if(c.features.includes('Dual Light night vision'))d.push('Full-Color night vision')
 if(c.features.includes('Full-Color night vision'))d.push('Dual Light night vision')
 return d}
export function hddTB(c:Cfg){const ch=Math.max(1,c.count);const mbps=c.features.includes('High Definition')?4:2;return ch*mbps*10.8*0.6*c.days*1.1/1000}
export function buildBom(c:Cfg):Line[]{const L:Line[]=[];const add=(id:string,name:string,qty:number,unit:number,note?:string)=>{if(qty>0)L.push({id,name,qty,unit:Math.round(unit),note})}
 const n=Math.max(1,c.count),hd=c.features.includes('High Definition'),wl=isWireless(c)
 const dm=({20:1,30:1,50:1.3,100:2,150:3,300:5,500:8} as Record<number,number>)[c.distance]||1
 const rate=(c.rating==='IP67'?1.1:1)*(c.rating==='IK10'?1.15:1)*(c.env==='Outdoor'?1.05:1)
 const ex=c.features.reduce((s,f)=>s+(PRICES.extra[f]||0),0)
 const dq:Record<string,number>={};const d=c.dedicated
 if(c.common)d.forEach(x=>dq[x]=1);else d.forEach((x,i)=>dq[x]=Math.floor(n/d.length)+(i<n%d.length?1:0))
 const nCommon=c.common?Math.max(0,n-d.length):0
 d.forEach(x=>add('ded-'+x,x+' camera',dq[x],PRICES.ded[x]*rate+ex))
 const analog=c.kind==='analog'&&!wl
 const cu=wl?(c.features.includes('4G')||c.features.includes('Solar Panel')?PRICES.cam.wireless4g:PRICES.cam.wifi):analog?(hd?PRICES.cam.analog4:PRICES.cam.analog2):(hd?PRICES.cam.ip4:PRICES.cam.ip2)
 add('common',wl?'Wireless camera'+(hd?' (HD)':''):(analog?'Analog':'IP')+' camera'+(hd?' 4MP':' 2MP'),nCommon,cu*dm*rate+ex,c.distance+' m capture')
 const sa=(dq.Hyperlapse||0)
 const ch=n-sa
 if(!wl&&ch>0){
  if(analog&&nCommon===ch){const s=up(ch,keys(PRICES.dvr));add('rec','DVR '+s+'-channel',1,PRICES.dvr[s])}
  else{const s=up(ch,keys(PRICES.nvr));add('rec','NVR '+s+'-channel',1,PRICES.nvr[s])}
  const per=Math.ceil(hddTB(c)/c.hdds);const sz=up(per,keys(PRICES.hdd));add('hdd','Hard disk '+sz+' TB',c.hdds,PRICES.hdd[sz],c.days+' days retention'+(per>18?' – add disks':''))}
 const ft=c.site==='Residential'?25:60,note=c.site==='Residential'?undefined:'Provisional – finalized after site survey'
 if(!wl){if(analog&&nCommon===ch){add('coax','Coaxial cable coil 270 ft',Math.ceil(n*ft/270),PRICES.coax,note);add('psu','Power supply 10A (1A per camera)',Math.ceil(n/10),PRICES.psu10A)}
  else{add('cat6','CAT-6 cable box 1000 ft',Math.ceil(n*ft/1000),PRICES.cat6Box,note)
   const pf=Math.ceil(n/c.stories);for(let f=1;f<=c.stories;f++){let left=pf;while(left>0){const s=up(left,keys(PRICES.poe));add('poe'+f+'-'+left,'PoE switch '+s+'-port'+(c.stories>1?' (floor '+f+')':''),1,PRICES.poe[s]);left-=s}}}}
 const jb=c.boxes==='all'?n:c.boxes==='few'?Math.ceil(n/4):0
 add('jb','Camera junction box',jb,PRICES.box);add('misc','Connectors, pins & fittings',n,PRICES.misc);add('lab','Commissioning labour (per camera)',n,PRICES.labour[c.site]||2500)
 return L}
export const rs=(n:number)=>'Rs '+Math.round(n).toLocaleString('en-PK')
