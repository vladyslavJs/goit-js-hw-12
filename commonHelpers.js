import{S as v,i as l,a as C}from"./assets/vendor-bad0427b.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function c(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=c(e);fetch(e.href,s)}})();const m=document.querySelector(".form"),u=document.querySelector(".gallery"),g=document.querySelector(".loader"),o=document.querySelector(".btn-load-more"),S=new v(".gallery a",{captionsData:"alt",captionDelay:250}),d=12;let n=1,f="";m.addEventListener("submit",k);o.addEventListener("click",w);async function k(t){t.preventDefault(),n=1,u.innerHTML="",f=m.search.value.trim(),o.classList.add("hide");const r=await p();r.hits.length===0?l.error({position:"bottomLeft",message:"Sorry, there are no images matching your search query.Please try again!",color:"#37a1f2",messageColor:"#FFF",theme:"dark",progressBarColor:"#0047AB"}):r.hits.length<d?l.error({position:"bottomLeft",message:"Sorry, there are no images matching your search query.Please try again!",color:"#37a1f2",messageColor:"#FFF",theme:"dark",progressBarColor:"#0047AB"}):o.classList.remove("hide"),m.reset(),h(r)}async function w(){n+=1,o.classList.add("hide");const t=await p();n>=Math.ceil(t.totalHits/d)?l.error({position:"bottomLeft",message:"This is all we found...",color:"#37a1f2",messageColor:"#FFF",theme:"dark",progressBarColor:"#0047AB"}):o.classList.remove("hide"),h(t),moveCard()}async function p(){g.classList.remove("hide");try{return(await C.get("https://pixabay.com/api/",{params:{key:"41672055-9590fca4951a86a4742f5f771",q:f,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:d,page:n}})).data}catch(t){console.log(t.message),l.error({position:"bottomLeft",message:"Sorry, service unavailable",color:"#37a1f2",messageColor:"#FFF",theme:"dark",progressBarColor:"#0047AB"})}finally{g.classList.add("hide")}}function h(t){const r=t.hits.reduce((c,{webformatURL:i,largeImageURL:e,tags:s,likes:a,views:y,comments:L,downloads:b,pageURL:F})=>c+`<li class='gallery-item'>
                        <a class='gallery-link' href='${e}'>
                            <img
                                class='gallery-image'
                                src='${i}'
                                alt='${s}'
                                width='360'
                                height='200'
                                />
                        </a>
                        <p class='gallery-tags'>Get link: ${F}</p>
                        <ul class='gallery-statistic'>
                            <li><p class='statistic'>🩵Likes: <span>${a}</span></p></li>
                            <li><p class='statistic'>👁Views: <span>${y}</span></p></li>
                            <li><p class='statistic'>💬Comments: <span>${L}</span></p></li>
                            <li><p class='statistic'>⌛Downloads: <span>${b}</span></p></li>
                        </ul>
                        </li>`,"");u.insertAdjacentHTML("beforeend",r),S.refresh()}
//# sourceMappingURL=commonHelpers.js.map
