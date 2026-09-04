import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import {Activity,AlertTriangle,CheckCircle,Server,Shield,Clock3,Database,BrainCircuit,Zap,Search,Menu} from "lucide-react";
import {LineChart,Line,ResponsiveContainer,Tooltip,XAxis,YAxis,AreaChart,Area} from "recharts";
import "./style.css";

const data=[{t:"10:00",v:32},{t:"10:10",v:38},{t:"10:20",v:41},{t:"10:30",v:39},{t:"10:40",v:72},{t:"10:50",v:64},{t:"11:00",v:46},{t:"11:10",v:43}];
const incidents=[
 {id:"INC-2048",title:"Checkout API latency spike",sev:"CRITICAL",time:"2 min ago",service:"checkout-api",status:"Investigating"},
 {id:"INC-2047",title:"Elevated auth failures",sev:"HIGH",time:"18 min ago",service:"auth-service",status:"Mitigated"},
 {id:"INC-2046",title:"Database connection saturation",sev:"MEDIUM",time:"41 min ago",service:"orders-db",status:"Resolved"}];

function App(){
 const [active,setActive]=useState("Command Center"),[selected,setSelected]=useState(incidents[0]),[open,setOpen]=useState(false);
 const nav=["Command Center","Incidents","Services","Analytics"];
 return <div className="app">
  <aside className={open?"open":""}><div className="brand"><Shield/><div><b>SentinelOps</b><small>INCIDENT INTELLIGENCE</small></div></div>
   <div className="nav">{nav.map(x=><button className={active===x?"active":""} onClick={()=>setActive(x)}>{x}</button>)}</div>
   <div className="sidebox"><span>● SYSTEM STATUS</span><b>All systems operational</b><small>Last checked 8 sec ago</small></div>
  </aside>
  <main><header><button className="hamb" onClick={()=>setOpen(!open)}><Menu/></button><div><small>OPERATIONS / {active.toUpperCase()}</small><h1>{active}</h1></div><div className="search"><Search size={17}/> Search incidents...</div></header>
   <section className="hero"><div><span className="pill">LIVE • 12 SERVICES</span><h2>Production Control Plane</h2><p>Real-time observability, anomaly detection and incident intelligence.</p></div><div className="heroMetric"><b>99.94%</b><small>30D AVAILABILITY</small></div></section>
   <div className="cards">
    <Card icon={<Activity/>} label="REQUEST RATE" value="18.4K" note="+8.2% vs avg"/>
    <Card icon={<AlertTriangle/>} label="ACTIVE INCIDENTS" value="03" note="1 critical"/>
    <Card icon={<Clock3/>} label="MTTR" value="18m" note="-22% this week"/>
    <Card icon={<Zap/>} label="ANOMALY SCORE" value="0.81" note="elevated"/>
   </div>
   <div className="grid">
    <div className="panel chart"><div className="pt"><b>API LATENCY</b><span>LAST 80 MIN</span></div><ResponsiveContainer width="100%" height={270}><AreaChart data={data}><XAxis dataKey="t"/><YAxis/><Tooltip/><Area type="monotone" dataKey="v" fillOpacity=".12"/><Line type="monotone" dataKey="v" strokeWidth={3}/></AreaChart></ResponsiveContainer></div>
    <div className="panel"><div className="pt"><b>SERVICE HEALTH</b><span>12 / 12 ONLINE</span></div>{["gateway","auth-service","checkout-api","orders-api","recommendation","orders-db"].map((s,i)=><div className="service"><span><i></i>{s}</span><b>{i===2?"94.2%":"99.9%"}</b></div>)}</div>
   </div>
   <div className="grid lower">
    <div className="panel"><div className="pt"><b>CRITICAL SIGNALS</b><span>LIVE</span></div>{incidents.map(x=><button className="incident" onClick={()=>setSelected(x)}><span className={"sev "+x.sev.toLowerCase()}>{x.sev}</span><div><b>{x.title}</b><small>{x.service} · {x.time}</small></div><strong>›</strong></button>)}</div>
    <div className="panel ai"><div className="pt"><b><BrainCircuit size={17}/> AI ROOT-CAUSE ENGINE</b><span>CONFIDENCE 91%</span></div><h3>{selected.title}</h3><p>Correlated signals suggest elevated latency is linked to a recent traffic burst and downstream dependency saturation.</p><div className="cause"><Database/> <span><b>Likely cause</b><small>orders-db connection pool saturation</small></span></div><button className="action">Generate Incident Report</button></div>
   </div>
  </main>
 </div>
}
function Card({icon,label,value,note}){return <div className="card">{icon}<small>{label}</small><strong>{value}</strong><span>{note}</span></div>}
createRoot(document.getElementById("root")).render(<App/>);