(()=>{var e={714:e=>{e.exports={lyrics:["You're walking in the woods","There's no one around and your phone is dead","Out of the corner of your eye you spot him","Shia LaBeouf","He's following you, about 30 feet back","He gets down on all fours and breaks into a sprint","He's gaining on you","Shia LaBeouf","You're looking for you car but you're all turned around","He's almost upon you now","And you can see there's blood on his face","My God, there's blood everywhere!","Running for you life (from Shia LaBeouf)","He's brandishing a knife (it's Shia LaBeouf)","Lurking in the shadows","Hollywood superstar Shia LaBeouf","Living in the woods (Shia LaBeouf)","Killing for sport (Shia LaBeouf)","Eating all the bodies","Actual cannibal Shia LaBeouf","Now it's dark, and you seem to have lost him","But you're hopelessly lost yourself","Stranded with a murderer","You creep silently through the underbrush","Aha! In the distance","A small cottage with a light on","Hope! You move stealthily toward it","But your leg! Ah! It's caught in a bear trap!","Gnawing off your leg (quiet, quiet)","Limping to the cottage (quiet, quiet)","Now you're on the doorstep","Sitting inside","Shia LaBeouf","Sharpening an axe (Shia LaBeouf)","But he doesn't hear you enter (Shia LaBeouf)","You're sneaking up behind him","Strangling superstar","Shia LaBeouf","Fighting for your life with Shia LaBeouf","Wrestling a knife from Shia LaBeouf","Stab him in his kidney","Safe at last from Shia LaBeouf","You limp into the dark woods","Blood oozing from your stump leg","You've beaten Shia LaBeouf","Wait! He isn't dead (Shia surprise)","There's a gun to your head and death in his eyes","But you can do jiu-jitsu","Body slam superstar Shia LaBeouf","Legendary fight with Shia LaBeouf","Normal Tuesday night for Shia LaBeouf","You try to swing an axe at Shia LaBeouf","But blood is draining fast from your stump leg","He's dodging every swipe, he parries to the left","You counter to the right, you catch him in the neck","You're chopping his head now","You have just decapitated Shia LaBeouf","His head topples to the floor, expressionless","You fall to your knees and catch your breath","You're finally safe from Shia LaBeouf"],savedImages:["1-1-1","8-1-4"]}},632:(e,t,o)=>{const{lyrics:a,savedImages:n}=o(714);e.exports={generateIndexes:()=>({lyricIdx:Math.floor(Math.random()*a.length),rowIdx:Math.floor(2*Math.random()),colIdx:Math.floor(10*Math.random())}),checkExistence:e=>n.includes(e),addNewImage:e=>{n.push(e)},getSavedImage:e=>n[e],getSavedImageLength:()=>n.length,getLyric:e=>a[e]}}},t={};function o(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,o),i.exports}(()=>{const{generateIndexes:e,checkExistence:t,addNewImage:a,getSavedImage:n,getSavedImageLength:i,getLyric:r}=o(632);let s=0;document.addEventListener("DOMContentLoaded",(()=>{document.getElementById("generate").addEventListener("click",(o=>{const{lyricIdx:n,rowIdx:r,colIdx:d}=e();let u=`${n}-${r}-${d}`;for(;t(u);){const{lyricIdx:t,rowIdx:o,colIdx:a}=e();u=`${t}-${o}-${a}`}a(u),s=i(),l(s-1)}));const o=document.getElementById("right-arrow"),n=document.getElementById("left-arrow"),r=document.getElementById("home");o.addEventListener("click",(e=>{e.preventDefault(),d(1),l()})),n.addEventListener("click",(e=>{e.preventDefault(),d(-1),l()})),r.addEventListener("click",(e=>{e.preventDefault(),s=0,l()})),document.querySelector(".link-reveal").addEventListener("click",(e=>{e.preventDefault(),document.querySelectorAll(".outside-link").forEach((e=>e.classList.toggle("revealed")))})),document.querySelector(".settings-reveal").addEventListener("click",(e=>{e.preventDefault(),document.querySelectorAll(".settings-button").forEach((e=>e.classList.toggle("revealed"))),document.getElementById("volume-slider").classList.toggle("revealed")})),document.getElementById("darkmode").addEventListener("click",(e=>{e.preventDefault(),document.querySelectorAll(".darkmode-capable").forEach((e=>{e.classList.toggle("darkmode")}))}));const u=document.getElementById("audio");document.getElementById("music").addEventListener("click",(e=>{u.paused?u.play():u.pause()})),document.getElementById("volume-slider").addEventListener("input",(e=>{const t=e.target.value;u.volume=t/100}))}));const d=e=>{const t=i();let o=s+e;o<0&&(o=t),s=o%(t+1)},l=()=>{if(s>0){const e=n(s-1),t=u(e);c(t,e,!1)}else c("Shia Art",null,!0)},u=e=>{const t=e.split("-"),[o,a,n]=t.map(Number);return`${"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[10*a+n+1]}${o}`},c=(e,t,o)=>{document.getElementById("title").innerText=e,(e=>{const t=document.querySelector(".content-image-container");if(null===e)return void(t.innerHTML="");const o=e.split("-"),[a,n,i]=o.map(Number),s=new Image;s.crossOrigin="null",s.src="https://i.imgur.com/0FWuKsa.png";const d=document.createElement("canvas");d.height=370,d.width=144;const l=d.getContext("2d"),u=r(a);s.addEventListener("load",(()=>{l.drawImage(s,72*i,128*n,72,128,0,0,144,256),l.font='italic 20px "Fira Sans", serif',l.fillStyle="#8a0303",((e,t,o,a,n,i)=>{const r=e.split(" ");let s="";for(let e=0;e<r.length;e++){let o=s+r[e]+" ";if(t.measureText(o).width>n&&e>0){const o=t.measureText(s).width;t.fillText(s,(n-o)/2,a),s=r[e]+" ",a+=i}else s=o}const d=t.measureText(s).width;t.fillText(s,(n-d)/2,a)})(u,l,0,300,140,22);const e=d.toDataURL("image/png"),o=document.createElement("img");o.src=e,t.innerHTML="",t.appendChild(o)}))})(t);const a=document.getElementById("generate"),n=document.getElementById("home");o?(a.classList.contains("hidden")&&a.classList.remove("hidden"),home.classList.contains("hidden")||home.classList.add("hidden")):(a.classList.contains("hidden")||a.classList.add("hidden"),n.classList.contains("hidden")&&n.classList.remove("hidden"))}})()})();