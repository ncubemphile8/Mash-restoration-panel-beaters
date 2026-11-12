// Accessible reveal-on-scroll and polished in-page navigation.
document.documentElement.classList.add('reveal-ready');
const revealTargets=document.querySelectorAll('.section-wrap,.service-card,.case-card,.step,.quote-panel,.contact-grid,.detail-photo');
revealTargets.forEach((el,i)=>{if(!el.hasAttribute('data-reveal'))el.setAttribute('data-reveal','');if(el.classList.contains('service-card')||el.classList.contains('case-card'))el.setAttribute('data-reveal-delay',String((i%3)+1));});
if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el))}else{document.querySelectorAll('[data-reveal]').forEach(el=>el.classList.add('is-visible'))}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const nav=document.querySelector('.nav');nav?.classList.remove('open');document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false')}));
