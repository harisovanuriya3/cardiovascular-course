"use client";
import {moduleOne} from "../data/module-one";
import moduleOneTests from "../data/module-one-tests.json";
import {moduleTwo} from "../data/module-two";
import moduleTwoTests from "../data/module-two-tests.json";
import {useMemo,useState} from "react";
const modules=[
"Введение в физиологию сердечно-сосудистой системы",
"Морфофункциональные особенности сердца",
"Физиологические свойства сердечной мышцы",
"Электрофизиология кардиомиоцитов",
"Автоматия сердца и проводящая система",
"Возбуждение и сокращение миокарда",
"Сердечный цикл",
"Насосная функция сердца",
"Электрокардиография",
"Механические и звуковые проявления работы сердца",
"Функциональные методы исследования сердца",
"Функциональная классификация кровеносных сосудов",
"Основные законы гемодинамики",
"Артериальное давление и артериальный пульс",
"Микроциркуляция и транскапиллярный обмен",
"Венозное кровообращение и возврат крови к сердцу",
"Внутрисердечные механизмы регуляции",
"Нервная регуляция сердца и сосудов",
"Гуморальная и эндотелиальная регуляция кровообращения",
"Кратковременная и долговременная регуляция артериального давления",
"Коронарное кровообращение",
"Мозговое и почечное кровообращение",
"Лёгочное, печёночное и кожное кровообращение",
"Адаптация кровообращения к изменяющимся условиям",
"Интегративная и клиническая физиология кровообращения"];
const labels={
ru:{title:"Интерактивная физиология сердечно-сосудистой системы",subtitle:"Нормальная физиология с элементами функциональной анатомии и клинической физиологии",modules:"Модули",search:"Поиск по оглавлению",section:"Раздел",note:"Это первый навигационный каркас учебника. Научные материалы, виртуальные лаборатории, пациенты, тесты и экзаменационный центр ещё предстоит разработать.",stub:"Содержание раздела готовится"},
en:{title:"Interactive Cardiovascular Physiology",subtitle:"Normal physiology with functional anatomy and clinical applications",modules:"Modules",search:"Search contents",section:"Section",note:"This is the initial course navigation. Scientific content, virtual labs, patients, tests and the exam center are not implemented yet.",stub:"Section content is being prepared"},
kz:{title:"Жүрек-қантамыр жүйесінің интерактивті физиологиясы",subtitle:"Функционалдық анатомия және клиникалық мысалдар қамтылған қалыпты физиология",modules:"Модульдер",search:"Мазмұннан іздеу",section:"Бөлім",note:"Бұл — оқулықтың бастапқы навигациясы. Ғылыми мәтіндер, виртуалды зертханалар, пациенттер, тесттер мен емтихан орталығы әлі жасалмаған.",stub:"Бөлім мазмұны әзірленуде"}
};
const sections={
ru:["Учебные цели","Входной контроль","Теория","Итоги за 1 минуту","Клинический мост","Интерактивные схемы","Практические задания","Ситуационные задачи","Тестирование","Вопросы для самоконтроля","Виртуальный пациент","Виртуальная лаборатория","Медиа и анимации","Глоссарий","Заметки и схемы","Прогресс обучения","Научные источники"],
en:["Learning objectives","Pretest","Theory","One-minute summary","Clinical bridge","Interactive diagrams","Practical exercises","Case studies","Tests","Review questions","Virtual patient","Virtual laboratory","Media and animations","Glossary","Notes and diagrams","Learning progress","Scientific references"],
kz:["Оқу мақсаттары","Кіріс бақылау","Теория","Бір минуттық қорытынды","Клиникалық байланыс","Интерактивті сызбалар","Практикалық тапсырмалар","Жағдаяттық есептер","Тесттер","Өзіндік бақылау сұрақтары","Виртуалды пациент","Виртуалды зертхана","Медиа және анимациялар","Глоссарий","Жазбалар мен сызбалар","Оқу үлгерімі","Ғылыми дереккөздер"]};
export default function Page(){
 const [lang,setLang]=useState("ru"),[chosen,setChosen]=useState(0),[query,setQuery]=useState(""); const [section,setSection]=useState(null); const [answers,setAnswers]=useState({}); const [caseAnswers,setCaseAnswers]=useState({});
 const lesson=chosen===0?moduleOne:moduleTwo; const tests=chosen===0?moduleOneTests:moduleTwoTests;
 const t=labels[lang], filtered=useMemo(()=>modules.map((name,i)=>({name,i})).filter(m=>m.name.toLowerCase().includes(query.toLowerCase())||String(m.i+1)===query.trim()),[query]);
 return <><header><span className="tag">RU / EN / KZ · 25 × 17</span><h1>{t.title}</h1><p>{t.subtitle}</p><p>Нормальная физиология · 2 курс медицинского университета</p></header><div className="container"><p className="lead">25 тематических модулей, единая структура из 17 подразделов. Сейчас доступно оглавление и навигация — разделы постепенно будут наполняться проверенным учебным материалом.</p><div className="controls" role="group" aria-label="Language">{["ru","en","kz"].map(l=><button key={l} aria-pressed={lang===l} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>)}</div><div className="layout"><aside className="side"><h2>{t.modules} (25)</h2><input aria-label={t.search} placeholder={t.search} value={query} onChange={e=>setQuery(e.target.value)} style={{width:"100%"}}/>{filtered.map(m=><button key={m.i} className={"module "+(chosen===m.i?"active":"")} aria-pressed={chosen===m.i} onClick={()=>{setChosen(m.i);setSection(null);setAnswers({});setCaseAnswers({})}}>{m.i+1}. {m.name}</button>)}</aside><main className="main"><p className="muted">{t.modules} {chosen+1} / 25</p><h2>{modules[chosen]}</h2><p className="muted">{t.section}: 17</p><div className="sections">{sections[lang].map((label,i)=><button type="button" onClick={()=>setSection(i)} className="section" key={i} style={{textAlign:"left",cursor:"pointer",background:section===i?"#e2f6f2":undefined}}><small>{t.section} {i+1}</small><strong>{label}</strong><p className="muted">{chosen<2&&lang==="ru"&&[0,2,4,6,7,8,9,16].includes(i)?"Открыть материалы":t.stub}</p></button>)}</div>
{chosen<2&&lang==="ru"&&section!==null?<article className="material"><h3>{sections.ru[section]}</h3>
{section===0?<ul>{lesson.objectives.map((x,i)=><li key={i}>{x}</li>)}</ul>:null}
{section===2?lesson.theory.map((v,i)=><section key={i}><h4>{v.h}</h4><p>{v.p}</p></section>):null}
{section===3?<ol>{lesson.theory.map((v,i)=><li key={i}>{v.h.replace(/^\\d+\\. /,"")}</li>)}</ol>:null}
{section===4?<p>{lesson.clinical}</p>:null}
{section===6?lesson.practice.map((v,i)=><details key={i}><summary><strong>Задание {i+1}.</strong> {v.q}</summary><p>{v.answer}</p></details>):null}
{section===9?lesson.questions.map((v,i)=><details key={i}><summary>{i+1}. {v[0]}</summary><p>{v[1]}</p></details>):null}
{(section===7||section===8)?<><p>Выберите один ответ. После выбора появится объяснение физиологического механизма.</p>{(section===7?lesson.cases:tests).map((v,i)=>{const key=section===7?"case":"test";const selected=section===7?caseAnswers[i]:answers[i];const update=section===7?setCaseAnswers:setAnswers;return <div className="quiz" key={i}><h4>{i+1}. {v.s||v.q}</h4>{v.a.map((answer,j)=><button type="button" key={j} className="option" aria-pressed={selected===j} onClick={()=>update(old=>({...old,[i]:j}))}>{String.fromCharCode(65+j)}. {answer}</button>)}{selected!==undefined?<p className={selected===v.correct?"right":"wrong"}>{selected===v.correct?"✓ Верно.":"✕ Неверно."} {v.why}</p>:null}</div>})}</>:null}
{section===16?<ul>{lesson.references.map(v=><li key={v.url}><a href={v.url} target="_blank" rel="noopener noreferrer">{v.title}</a></li>)}</ul>:null}
{![0,2,3,4,6,7,8,9,16].includes(section)?<p>Этот раздел находится в разработке. Готового интерактива здесь пока нет.</p>:null}
</article>:null}
{chosen!==0||lang!=="ru"?<p className="note">{t.note}</p>:null}</main></div></div></>;
}