(function(){
  var d=document,h=d.documentElement,bar=d.querySelector('.progress span'),topb=d.querySelector('.top-btn');
  var toc=d.getElementById('toc'),btn=d.querySelector('.toc-btn'),scrim=d.querySelector('.scrim');
  var links=[].slice.call(d.querySelectorAll('.toc a[href^="#"]')),targets=[];
  links.forEach(function(a){var el=d.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));if(el)targets.push([el,a]);});
  var cur=null,ticking=false;
  function spy(){
    var y=110,best=null;
    for(var i=0;i<targets.length;i++){if(targets[i][0].getBoundingClientRect().top-y<=0)best=targets[i][1];else break;}
    if(best!==cur){
      if(cur)cur.classList.remove('on');cur=best;
      if(cur){cur.classList.add('on');
        if(toc&&getComputedStyle(toc).position==='sticky'){var r=cur.getBoundingClientRect(),tr=toc.getBoundingClientRect();
          if(r.top<tr.top+40||r.bottom>tr.bottom-40)toc.scrollTop+=r.top-tr.top-tr.height/3;}}
    }
  }
  function onScroll(){
    if(ticking)return;ticking=true;
    requestAnimationFrame(function(){ticking=false;
      var max=h.scrollHeight-h.clientHeight,p=max>0?h.scrollTop/max:0;
      if(bar)bar.style.transform='scaleX('+p.toFixed(4)+')';
      if(topb)topb.classList.toggle('show',h.scrollTop>800);if(btn)btn.classList.toggle('show',h.scrollTop>500);
      spy();});
  }
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();
  function setOpen(o){if(!toc)return;toc.classList.toggle('open',o);if(scrim)scrim.classList.toggle('show',o);if(btn)btn.setAttribute('aria-expanded',o?'true':'false');
    if(o&&cur){setTimeout(function(){cur.scrollIntoView({block:'center'});},30);}}
  if(btn)btn.addEventListener('click',function(){setOpen(!toc.classList.contains('open'));});
  if(scrim)scrim.addEventListener('click',function(){setOpen(false);});
  if(toc){var c=toc.querySelector('.toc-close');if(c)c.addEventListener('click',function(){setOpen(false);});
    toc.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false);});}
  d.addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false);});
  d.addEventListener('click',function(e){var t=e.target.closest('.tag');d.querySelectorAll('.tag.show').forEach(function(x){if(x!==t)x.classList.remove('show');});if(t)t.classList.toggle('show');});
  function tblEdges(){d.querySelectorAll('.tblx').forEach(function(x){var t=x.firstElementChild;x.classList.toggle('more-r',t.scrollWidth-t.clientWidth-t.scrollLeft>4);});}
  d.querySelectorAll('.tbl').forEach(function(t){t.addEventListener('scroll',tblEdges,{passive:true});});
  addEventListener('resize',tblEdges);tblEdges();
})();
