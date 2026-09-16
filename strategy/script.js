const body=document.body;
const panel=document.querySelector('.index');
const toggle=document.querySelector('.index-toggle');
const closeButton=document.querySelector('.index-close');
function setIndex(open){
  panel.classList.toggle('is-open',open);
  panel.setAttribute('aria-hidden',String(!open));
  toggle?.setAttribute('aria-expanded',String(open));
  body.classList.toggle('index-open',open);
}
toggle?.addEventListener('click',()=>setIndex(true));
closeButton?.addEventListener('click',()=>setIndex(false));
panel?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setIndex(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape')setIndex(false)});
