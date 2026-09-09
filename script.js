'use strict';
// All enquiry destinations are real HTML links, so they also work without JavaScript.
const placements={centre:['Front and centre.','Explore a central placement that makes your logo the focal point.'],corner:['A little corner. All yours.','Explore a corner position with a clear space of its own.'],flexible:['Let’s find your fit.','Share your logo and we’ll discuss a position that works with the available space.']};
document.querySelectorAll('[data-place]').forEach(button=>button.addEventListener('click',()=>{const place=button.dataset.place;document.querySelectorAll('[data-place]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));document.getElementById('selection-title').textContent=placements[place][0];document.getElementById('selection-description').textContent=placements[place][1];document.getElementById('placement-zone').className='zone '+place;}));
const video=document.getElementById('hero-video');
const toggle=document.getElementById('video-toggle');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function updateVideoButton(){toggle.textContent=video.paused?'Play video ▷':'Pause video Ⅱ';toggle.setAttribute('aria-label',video.paused?'Play background video':'Pause background video');}
video.muted=true;
video.addEventListener('play',updateVideoButton);video.addEventListener('pause',updateVideoButton);
video.addEventListener('error',()=>{toggle.hidden=true;});
video.querySelector('source').addEventListener('error',()=>{toggle.hidden=true;});
if(reducedMotion.matches){video.autoplay=false;video.pause();}else{video.play().catch(updateVideoButton);}
updateVideoButton();
toggle.addEventListener('click',()=>{if(video.paused){video.play().catch(()=>{toggle.textContent='Playback unavailable';});}else video.pause();});
reducedMotion.addEventListener('change',event=>{if(event.matches)video.pause();});
document.getElementById('share').addEventListener('click',async()=>{const status=document.getElementById('share-status');if(location.protocol==='file:'){status.textContent='Publish this website to share its link.';return;}try{if(navigator.share){await navigator.share({title:'Laptop Ad Space',text:'Your brand. My laptop. Explore a different kind of advertising space.',url:location.href});}else if(navigator.clipboard){await navigator.clipboard.writeText(location.href);status.textContent='Website link copied.';}else{status.textContent='Copy the website address from your browser.';}}catch(error){if(error.name!=='AbortError')status.textContent='Copy the website address from your browser.';}});
