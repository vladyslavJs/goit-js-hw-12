import{S as F,i as l,a as k}from"./assets/vendor-bad0427b.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function c(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=c(e);fetch(e.href,s)}})();const d=document.querySelector(".form"),f=document.querySelector(".gallery"),u=document.querySelector(".loader"),a=document.querySelector(".btn-load-more"),C=new F(".gallery a",{captionsData:"alt",captionDelay:250}),m=40;let n=1,p="";d.addEventListener("submit",S);a.addEventListener("click",B);async function S(t){t.preventDefault(),n=1,f.innerHTML="",p=d.search.value.trim(),a.classList.add("hide");const r=await g();r.hits.length===0?l.error({position:"bottomLeft",message:"Sorry, there are no images matching your search query.Please try again!",color:"#37a1f2",messageColor:"#FFF",theme:"dark",progressBarColor:"#0047AB"}):r.hits.length<m?l.error({position:"bottomLeft",message:"We are sorry, but you have reached the end of search results.",color:"#37a1f2",messageColor:"#FFF",theme:"dark",progressBarColor:"#0047AB"}):a.classList.remove("hide"),d.reset(),h(r)}async function B(){n+=1,a.classList.add("hide");const t=await g();n>=Math.ceil(t.totalHits/m)?l.error({position:"bottomLeft",message:"We are sorry, but you have reached the end of search results.",color:"#37a1f2",messageColor:"#FFF",theme:"dark",progressBarColor:"#0047AB"}):a.classList.remove("hide"),h(t)}async function g(){u.classList.remove("hide");try{return(await k.get("https://pixabay.com/api/",{params:{key:"41672055-9590fca4951a86a4742f5f771",q:p,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:m,page:n}})).data}catch(t){console.log(t.message),l.error({position:"bottomLeft",message:"Sorry, service unavailable",color:"#37a1f2",messageColor:"#FFF",theme:"dark",progressBarColor:"#0047AB"})}finally{u.classList.add("hide")}}function h(t){const r=t.hits.reduce((c,{webformatURL:i,largeImageURL:e,tags:s,likes:o,views:y,comments:L,downloads:b,pageURL:v})=>c+`<li class='gallery-item'>
                        <a class='gallery-link' href='${e}'>
                            <img
                                class='gallery-image'
                                src='${i}'
                                alt='${s}'
                                width='360'
                                height='200'
                                />
                        </a>
                        <p class='gallery-tags'>Get link: ${v}</p>
                        <ul class='gallery-statistic'>
                            <li><p class='statistic'>🩵Likes: <span>${o}</span></p></li>
                            <li><p class='statistic'>👁Views: <span>${y}</span></p></li>
                            <li><p class='statistic'>💬Comments: <span>${L}</span></p></li>
                            <li><p class='statistic'>⌛Downloads: <span>${b}</span></p></li>
                        </ul>
                        </li>`,"");f.insertAdjacentHTML("beforeend",r),C.refresh()}
//# sourceMappingURL=commonHelpers.js.map
