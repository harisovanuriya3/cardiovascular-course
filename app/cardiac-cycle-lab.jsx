"use client";

import {useEffect,useMemo,useState} from "react";
import {cardiacState} from "./cardiac-cycle-model";

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

const phases=[
  {id:"fill",from:0,to:0.36,ru:"Наполнение желудочков",en:"Ventricular filling",kz:"Қарыншалардың толуы",av:true,sem:false,explain:"Давление в предсердиях выше давления в желудочках: АВ-клапаны открыты, объём растёт."},
  {id:"atrial",from:0.36,to:0.44,ru:"Систола предсердий",en:"Atrial systole",kz:"Жүрекшелер систоласы",av:true,sem:false,explain:"Зубец P предшествует сокращению предсердий; завершается наполнение желудочков."},
  {id:"isoC",from:0.44,to:0.54,ru:"Изоволюмическое сокращение",en:"Isovolumetric contraction",kz:"Изоволюметриялық жиырылу",av:false,sem:false,explain:"После QRS закрываются АВ-клапаны (S1). Все клапаны закрыты: давление быстро растёт, объём постоянен."},
  {id:"eject",from:0.54,to:0.78,ru:"Изгнание крови",en:"Ventricular ejection",kz:"Қанды айдау",av:false,sem:true,explain:"Давление желудочка превышает аортальное: полулунные клапаны открыты, объём уменьшается."},
  {id:"isoR",from:0.78,to:0.88,ru:"Изоволюмическое расслабление",en:"Isovolumetric relaxation",kz:"Изоволюметриялық босаңсу",av:false,sem:false,explain:"После T закрываются полулунные клапаны (S2). Все клапаны закрыты: давление падает, объём постоянен."},
  {id:"rapid",from:0.88,to:1,ru:"Быстрое наполнение",en:"Rapid filling",kz:"Жылдам толу",av:true,sem:false,explain:"Давление желудочка становится ниже предсердного: АВ-клапаны открываются и начинается новый цикл."}
];

const words={
  ru:{title:"Интерактивная лаборатория сердечного цикла",play:"Запустить",pause:"Пауза",step:"Следующая фаза",phase:"Фаза",av:"АВ-клапаны",sem:"Полулунные клапаны",open:"открыты",closed:"закрыты",pressure:"Давление",volume:"Объём ЛЖ",ecg:"ЭКГ",sounds:"Тоны",settings:"Условия демонстрации",hr:"ЧСС",preload:"Преднагрузка",afterload:"Постнагрузка",contractility:"Сократимость",task:"Учебное задание",check:"Проверить",reset:"Норма",systole:"Систола",diastole:"Диастола"},
  en:{title:"Interactive cardiac cycle laboratory",play:"Play",pause:"Pause",step:"Next phase",phase:"Phase",av:"AV valves",sem:"Semilunar valves",open:"open",closed:"closed",pressure:"Pressure",volume:"LV volume",ecg:"ECG",sounds:"Sounds",settings:"Demonstration settings",hr:"Heart rate",preload:"Preload",afterload:"Afterload",contractility:"Contractility",task:"Learning task",check:"Check",reset:"Normal",systole:"Systole",diastole:"Diastole"},
  kz:{title:"Жүрек циклі интерактивті зертханасы",play:"Іске қосу",pause:"Кідіріс",step:"Келесі фаза",phase:"Фаза",av:"АВ қақпақшалар",sem:"Жарты айшық қақпақшалар",open:"ашық",closed:"жабық",pressure:"Қысым",volume:"СҚ көлемі",ecg:"ЭКГ",sounds:"Жүрек тондары",settings:"Демонстрация шарттары",hr:"ЖСЖ",preload:"Алдыңғы жүктеме",afterload:"Кейінгі жүктеме",contractility:"Жиырылғыштық",task:"Оқу тапсырмасы",check:"Тексеру",reset:"Қалыпты",systole:"Систола",diastole:"Диастола"}
};

function pathFor(points,x,y,w,h,min,max,key){return points.map((p,i)=>`${i?"L":"M"}${(x+p.t*w).toFixed(1)},${(y+h-(p[key]-min)/(max-min)*h).toFixed(1)}`).join(" ")}
function Trace({t,settings,label}){
  const points=Array.from({length:121},(_,i)=>({t:i/120,...cardiacState(i/120,settings)}));
  const x=42,w=708;
  return <svg className="cycle-chart" viewBox="0 0 780 360" role="img" aria-label={label}>
    <rect x="42" y="20" width="708" height="310" rx="8" fill="#fff" stroke="#cadfe2"/>
    {[.44,.54,.78,.88].map(v=><line key={v} x1={x+v*w} x2={x+v*w} y1="20" y2="330" stroke="#d9e5e7" strokeDasharray="4 4"/>)}
    <text x="7" y="35">mmHg</text><text x="7" y="196">mL</text><text x="7" y="294">ECG</text>
    <path d={pathFor(points,x,28,w,130,0,140,"ventricular")} className="trace vent"/>
    <path d={pathFor(points,x,28,w,130,0,140,"aortic")} className="trace aorta"/>
    <path d={pathFor(points,x,28,w,130,0,140,"atrial")} className="trace atrium"/>
    <path d={pathFor(points,x,175,w,75,35,145,"volume")} className="trace vol"/>
    <path d={pathFor(points,x,270,w,42,-.45,1.05,"ecg")} className="trace ecg"/>
    {[.46,.79].map((v,i)=><g key={v}><line x1={x+v*w} x2={x+v*w} y1="315" y2="327" stroke="#40204c" strokeWidth={i?4:7}/><text x={x+v*w-9} y="345">S{i+1}</text></g>)}
    <line x1={x+t*w} x2={x+t*w} y1="20" y2="330" className="cursor"/>
    <g className="legend"><text x="55" y="17" className="vent-label">● ЛЖ</text><text x="115" y="17" className="aorta-label">● Аорта</text><text x="190" y="17" className="atrium-label">● Предсердие</text><text x="290" y="17" className="vol-label">● Объём</text></g>
  </svg>
}

function Heart({phase,state}){
  const contracting=phase.id==="isoC"||phase.id==="eject";
  const scale=clamp(.82+(state.volume-40)/130*.22,.84,1.04);
  return <svg className="heart-model" viewBox="0 0 300 300" role="img" aria-label="Анимированная схема левых камер сердца">
    <path d="M153 272C68 218 43 160 65 104c18-45 71-43 91-5 21-38 74-40 91 5 23 56-4 114-94 168Z" fill={contracting?"#d94f64":"#e97583"} stroke="#8d2f45" strokeWidth="7" style={{transform:`scale(${scale})`,transformOrigin:"155px 170px",transition:"transform .2s"}}/>
    <path d="M151 105v128" stroke="#fff" strokeWidth="7" opacity=".75"/>
    <path d="M112 42v64M199 42v64" stroke="#65869c" strokeWidth="22" strokeLinecap="round"/>
    <g className={phase.av?"valve open":"valve closed"}><path d="M107 112l35 18M196 112l-35 18"/><text x="88" y="151">AV</text></g>
    <g className={phase.sem?"valve open":"valve closed"}><path d="M119 87l-12 24M184 87l12 24"/><text x="128" y="82">SL</text></g>
    {phase.sem?<path d="M151 101v-56" className="flow-arrow"/>:null}{phase.av?<path d="M151 76v62" className="flow-arrow"/>:null}
  </svg>
}

export function CardiacCycleLab(){
  const [lang,setLang]=useState("ru"),[t,setT]=useState(0),[running,setRunning]=useState(false);
  const [settings,setSettings]=useState({hr:75,preload:50,afterload:50,contractility:50});
  const [answer,setAnswer]=useState(""),[feedback,setFeedback]=useState("");
  const W=words[lang],phase=phases.find(p=>t>=p.from&&t<p.to)||phases[phases.length-1];
  const state=useMemo(()=>cardiacState(t,settings),[t,settings]);
  useEffect(()=>{if(!running)return;const interval=setInterval(()=>setT(v=>(v+settings.hr/60/50)%1),20);return()=>clearInterval(interval)},[running,settings.hr]);
  function next(){const i=phases.findIndex(p=>p.id===phase.id);setT(phases[(i+1)%phases.length].from+.002)}
  const phaseName=phase[lang];
  return <section className="visual-lab cardiac-cycle-lab">
    <div className="lab-heading"><div><span className="model-badge">Учебная демонстрационная модель · Educational demo · Оқу демонстрациясы</span><h3>{W.title}</h3></div><label className="language-picker"><span>RU / EN / KZ</span><select value={lang} onChange={e=>setLang(e.target.value)} aria-label="Language"><option value="ru">Русский</option><option value="en">English</option><option value="kz">Қазақша</option></select></label></div>
    <p className="validation-note"><strong>Граница применимости:</strong> форма кривых и причинные связи соответствуют нормальному циклу левых камер, но численные значения являются типичными учебными ориентирами. Модель не валидирована по данным конкретного пациента и не предназначена для диагностики.</p>
    <div className="cycle-toolbar"><button onClick={()=>setRunning(v=>!v)} aria-pressed={running}>{running?W.pause:W.play}</button><button onClick={next}>{W.step}</button>{phases.map(p=><button className="phase-chip" aria-pressed={p.id===phase.id} onClick={()=>{setRunning(false);setT(p.from+.002)}} key={p.id}>{p[lang]}</button>)}</div>
    <label className="timeline"><strong>{W.phase}: {phaseName}</strong><input type="range" min="0" max="1000" value={Math.round(t*1000)} onChange={e=>{setRunning(false);setT(Number(e.target.value)/1000)}}/></label>
    <div className="cycle-stage"><div><Heart phase={phase} state={state}/><div className="valve-status"><span className={phase.av?"is-open":"is-closed"}>{W.av}: {phase.av?W.open:W.closed}</span><span className={phase.sem?"is-open":"is-closed"}>{W.sem}: {phase.sem?W.open:W.closed}</span></div></div><div className="cycle-readout"><h4>{phaseName}</h4><p>{phase.explain}</p><dl><div><dt>{W.pressure} ЛЖ</dt><dd>{state.ventricular.toFixed(0)} mmHg</dd></div><div><dt>{W.volume}</dt><dd>{state.volume.toFixed(0)} mL</dd></div><div><dt>EDV / ESV</dt><dd>{state.edv.toFixed(0)} / {state.esv.toFixed(0)} mL</dd></div><div><dt>SV / EF</dt><dd>{state.stroke.toFixed(0)} mL / {(state.stroke/state.edv*100).toFixed(0)}%</dd></div></dl></div></div>
    <Trace t={t} settings={settings} label={`${W.pressure}, ${W.volume}, ${W.ecg}, ${W.sounds}`}/>
    <p className="graph-help">Красный: давление ЛЖ · синий: аорта · зелёный: левое предсердие · оранжевый: объём ЛЖ · фиолетовый: ЭКГ. S1 — закрытие АВ-клапанов, S2 — закрытие полулунных.</p>
    <details className="model-settings"><summary>{W.settings}</summary><div className="lab-controls">{[["hr",W.hr,40,140,"/min"],["preload",W.preload,0,100,"%"],["afterload",W.afterload,0,100,"%"],["contractility",W.contractility,0,100,"%"]].map(([key,name,min,max,unit])=><label key={key}>{name}: <strong>{settings[key]} {unit}</strong><input type="range" min={min} max={max} value={settings[key]} onChange={e=>setSettings(v=>({...v,[key]:Number(e.target.value)}))}/></label>)}</div><button onClick={()=>setSettings({hr:75,preload:50,afterload:50,contractility:50})}>{W.reset}</button><p className="muted">Зависимости направленные и учебные: ↑преднагрузки → ↑EDV; ↑постнагрузки → ↑ESV; ↑сократимости → ↓ESV. Они не заменяют калиброванную модель эластичности и сосудистого импеданса.</p></details>
    <section className="lab-task"><h4>{W.task}</h4><p>При повышении постнагрузки без изменения сократимости какой показатель сначала увеличится?</p><div className="toolbuttons">{["Конечный систолический объём","Фракция выброса","Скорость наполнения"].map(v=><button key={v} aria-pressed={answer===v} onClick={()=>{setAnswer(v);setFeedback("")}}>{v}</button>)}<button disabled={!answer} onClick={()=>setFeedback(answer==="Конечный систолический объём"?"✓ Верно: желудочку труднее изгнать кровь, поэтому ESV растёт, а ударный объём и фракция выброса снижаются.":"Попробуйте ещё раз: проследите, сколько крови останется после изгнания против большего давления.")}>{W.check}</button></div>{feedback?<p className={feedback.startsWith("✓")?"right":"wrong"} aria-live="polite">{feedback}</p>:null}</section>
  </section>
}
