"use client";
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
 const [lang,setLang]=useState("ru"),[chosen,setChosen]=useState(0),[query,setQuery]=useState("");
 const t=labels[lang], filtered=useMemo(()=>modules.map((name,i)=>({name,i})).filter(m=>m.name.toLowerCase().includes(query.toLowerCase())||String(m.i+1)===query.trim()),[query]);
 return <><header><span className="tag">RU / EN / KZ · 25 × 17</span><h1>{t.title}</h1><p>{t.subtitle}</p><p>Нормальная физиология · 2 курс медицинского университета</p></header><div className="container"><p className="lead">25 тематических модулей, единая структура из 17 подразделов. Сейчас доступно оглавление и навигация — разделы постепенно будут наполняться проверенным учебным материалом.</p><div className="controls" role="group" aria-label="Language">{["ru","en","kz"].map(l=><button key={l} aria-pressed={lang===l} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>)}</div><div className="layout"><aside className="side"><h2>{t.modules} (25)</h2><input aria-label={t.search} placeholder={t.search} value={query} onChange={e=>setQuery(e.target.value)} style={{width:"100%"}}/>{filtered.map(m=><button key={m.i} className={"module "+(chosen===m.i?"active":"")} aria-pressed={chosen===m.i} onClick={()=>setChosen(m.i)}>{m.i+1}. {m.name}</button>)}</aside><main className="main"><p className="muted">{t.modules} {chosen+1} / 25</p><h2>{modules[chosen]}</h2><p className="muted">{t.section}: 17</p><div className="sections">{sections[lang].map((label,i)=><div className="section" key={i}><small>{t.section} {i+1}</small><strong>{label}</strong><p className="muted">{t.stub}</p></div>)}</div><p className="note">{t.note}</p></main></div></div></>;
}