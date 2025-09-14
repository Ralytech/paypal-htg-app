<script>
// ------- Format -------
export const fmt0 = n => Number(n||0).toLocaleString('fr-FR',{maximumFractionDigits:0});
export const fmt2 = n => Number(n||0).toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2});

// ------- Fee tables -------
export const NATCASH_FEES = [
  {min:20,fee:0},{min:250,fee:0},{min:500,fee:6},{min:1000,fee:18},{min:2000,fee:25},
  {min:4000,fee:35},{min:8000,fee:54},{min:12000,fee:63},{min:20000,fee:68},
  {min:40000,fee:90},{min:60000,fee:108},{min:75000,fee:115},
];
export const MONCASH_FEES = [
  {min:0,fee:0},{min:250,fee:5},{min:500,fee:10},{min:1000,fee:25},{min:2000,fee:35},
  {min:4000,fee:50},{min:8000,fee:60},{min:12000,fee:70},{min:20000,fee:75},
  {min:40000,fee:100},{min:60000,fee:120},{min:75000,fee:130},
];
export const lookupP2P = (htg, prov) => {
  const tbl = (prov==='NATCASH')?NATCASH_FEES:MONCASH_FEES;
  let f=0; for(const b of tbl){ if(htg>=b.min) f=b.fee; } return f;
};
export const grossUp = (target, prov) => {
  let guess = target;
  for(let i=0;i<10;i++){
    const fee=lookupP2P(guess,prov);
    const diff=(target+fee)-guess;
    if(Math.abs(diff)<.5) break;
    guess += diff;
  }
  return Math.round(target + lookupP2P(guess,prov));
};

// ------- Local storage (namespaced) -------
const NS = 'express_lakay_v1';
export const save = (k,v)=>localStorage.setItem(`${NS}:${k}`, JSON.stringify(v));
export const load = (k,d=null)=>{ try{return JSON.parse(localStorage.getItem(`${NS}:${k}`)) ?? d;}catch{return d;} };

// ------- Companies preset -------
export const COMPANIES = [
  {
    id:'NEXAPAC',
    name:'Nexapac Haiti',
    logo:'./assets/nexapac-logo.png',
    email:'support@nexapac.ht',
    phone:'+509 3578 2372',
    addr:'8298 NW 68th St, Miami, FL 33166',
    extra:'PQ-044858 • USA→Haiti Logistics'
  },
  {
    id:'RALYTECH',
    name:'RalyTech Digital Agency',
    logo:'./assets/ralytech-logo.png',
    email:'hello@ralytech.ht',
    phone:'+509 33xx xxxx',
    addr:'Cap-Haïtien, Haïti',
    extra:'Marketing & AI Services'
  }
];

// ------- WhatsApp share -------
export function openWhatsApp(text, phone=''){
  const msg = encodeURIComponent(text);
  const url = phone ? `https://wa.me/${phone.replace(/\D/g,'')}?text=${msg}` : `https://wa.me/?text=${msg}`;
  window.open(url,'_blank');
}
</script>