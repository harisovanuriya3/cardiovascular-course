const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const gauss=(x,c,w,a)=>a*Math.exp(-(((x-c)/w)**2));
const smooth=x=>x*x*(3-2*x);
const segment=(t,a,b,start,end)=>start+(end-start)*smooth(clamp((t-a)/(b-a),0,1));

export function cardiacState(t,{preload,afterload,contractility}){
  const edv=120+(preload-50)*.32;
  const esv=50+(afterload-50)*.28-(contractility-50)*.34;
  let volume;
  if(t<.36) volume=segment(t,0,.36,esv,edv-10);
  else if(t<.44) volume=segment(t,.36,.44,edv-10,edv);
  else if(t<.54) volume=edv;
  else if(t<.78) volume=segment(t,.54,.78,edv,esv);
  else if(t<.88) volume=esv;
  else volume=segment(t,.88,1,esv,esv+(edv-esv)*.58);
  const ventricular=5+gauss(t,.62,.15,116+(contractility-50)*.55)+gauss(t,.43,.035,5);
  const aortic=78+gauss(t,.66,.19,42+(afterload-50)*.35)-gauss(t,.82,.018,5);
  const atrial=6+gauss(t,.41,.045,5)+gauss(t,.51,.045,2)+gauss(t,.82,.08,4);
  const ecg=gauss(t,.38,.025,.22)-gauss(t,.445,.009,.22)+gauss(t,.46,.012,1)-gauss(t,.48,.014,.32)+gauss(t,.73,.045,.36);
  return {volume,ventricular,aortic,atrial,ecg,stroke:edv-esv,edv,esv};
}
