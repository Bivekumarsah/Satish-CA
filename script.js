const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');}));

document.getElementById('year').textContent=new Date().getFullYear();

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const form=document.getElementById('consultation-form');
const result=document.getElementById('form-result');
const output=document.getElementById('request-output');
form?.addEventListener('submit',(e)=>{
  e.preventDefault();
  const data=new FormData(form);
  const text=[
    'CONSULTATION REQUEST',
    '',
    'Name: '+(data.get('name')||''),
    'Business / Company: '+(data.get('company')||'Not provided'),
    'Email: '+(data.get('email')||''),
    'Phone: '+(data.get('phone')||'Not provided'),
    'Service: '+(data.get('service')||''),
    '',
    'Request:',
    String(data.get('message')||'').trim()
  ].join('\n');
  output.value=text;
  result.hidden=false;
  result.scrollIntoView({behavior:'smooth',block:'nearest'});
});
document.getElementById('copy-request')?.addEventListener('click',async(e)=>{
  try{
    await navigator.clipboard.writeText(output.value);
    e.currentTarget.textContent='Copied ✓';
    setTimeout(()=>e.currentTarget.textContent='Copy request',1800);
  }catch{
    output.select();document.execCommand('copy');
    e.currentTarget.textContent='Copied ✓';
  }
});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',()=>{nav?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');});
});
