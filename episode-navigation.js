/* Shared instant navigation and Back to Top for F.A.L.L.O.U.T. episode pages. */
(function(){
function install(){
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    if(a.dataset.fallJumpBound)return;
    var id=a.getAttribute('href').slice(1);
    if(!id||!(/^(results|essay|transcript|ep\d+-(essay|transcript))$/.test(id)))return;
    a.dataset.fallJumpBound='1';
    a.addEventListener('click',function(event){
      var target=document.getElementById(id);
      if(!target)return;
      event.preventDefault();
      var top=target.getBoundingClientRect().top+window.scrollY-90;
      window.scrollTo({top:Math.max(0,top),behavior:'instant'});
      history.replaceState(null,'','#'+id);
    });
  });
  document.querySelectorAll('.episode-back-to-top button').forEach(function(button){if(button.dataset.fallTopBound)return;button.dataset.fallTopBound='1';button.addEventListener('click',function(){window.scrollTo({top:0,behavior:'instant'});history.replaceState(null,'',location.pathname+location.search);});});
  var results=document.getElementById('results');
  if(results&&!document.querySelector('.episode-back-to-top')){
    var wrap=document.createElement('div');
    wrap.className='episode-back-to-top';
    var button=document.createElement('button');
    button.type='button';
    button.textContent='↑ Back to top';
    button.setAttribute('aria-label','Back to top of episode');
    button.addEventListener('click',function(){
      window.scrollTo({top:0,behavior:'instant'});
      history.replaceState(null,'',location.pathname+location.search);
    });
    wrap.appendChild(button);
    results.insertAdjacentElement('afterend',wrap);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})();