(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const g="https://api.opentripmap.com/0.1/en",v="5ae2e3f221c38a28845f05b69202935rb5d277c31dda3dae3797b507";function f(){return{headers:{"Content-Type":"application/json"}}}async function y(o){const e=await o.json();if(o.ok)return e;throw{name:"apiError",message:e}}async function S(o,e=15){var r;const t=`${g}/places/autosuggest?apikey=${v}&name=${encodeURIComponent(o)}&limit=${e}`;try{const n=await fetch(t,f());return((r=(await y(n)).features)==null?void 0:r.map(a=>{var s;return{id:a.properties.xid||Math.random().toString(36),name:a.properties.name,kind:((s=a.properties.kinds)==null?void 0:s.split(",")[0])||"place",kinds:a.properties.kinds,lat:a.geometry.coordinates[1],lon:a.geometry.coordinates[0]}}))||[]}catch(n){return console.error("API Error:",n),E(o)}}function E(o){return[{id:"mock1",name:`${o} Museum`,kind:"museum",kinds:"museum,cultural,tourist_attraction",lat:40.7128+Math.random()*.1,lon:-74.006+Math.random()*.1},{id:"mock2",name:`${o} Park`,kind:"park",kinds:"park,natural,recreation",lat:40.7128+Math.random()*.1,lon:-74.006+Math.random()*.1},{id:"mock3",name:`${o} Restaurant`,kind:"restaurant",kinds:"restaurant,food,dining",lat:40.7128+Math.random()*.1,lon:-74.006+Math.random()*.1},{id:"mock4",name:`${o} Hotel`,kind:"hotel",kinds:"hotel,accommodation,lodging",lat:40.7128+Math.random()*.1,lon:-74.006+Math.random()*.1}].slice(0,Math.floor(Math.random()*4)+1)}const h="tgc-itinerary",c=()=>JSON.parse(localStorage.getItem(h)||"[]"),u=o=>localStorage.setItem(h,JSON.stringify(o));function U(o){const e=c();if(!e.some(t=>t.id===o.id)){const t={...o,day:1,order:e.length,addedAt:new Date().toISOString(),notes:""};return e.push(t),u(e),!0}return!1}const C=o=>{const e=c().filter(t=>t.id!==o);u(e)},P=(o,e)=>{const t=c(),r=t.find(n=>n.id===o);r&&(r.day=e,u(t))},D=()=>c(),$=()=>{const o=c();return[...new Set(o.map(e=>e.day||1))].sort((e,t)=>e-t)};function l(o,e=2e3){const t=Object.assign(document.createElement("div"),{className:"toast",textContent:o});document.body.append(t),setTimeout(()=>t.remove(),e)}class b{constructor(e){if(console.log("📦 CardList: Initializing with selector:",e),this.parent=document.querySelector(e),console.log("📦 CardList: Parent element found:",!!this.parent),!this.parent){console.error("❌ CardList: Parent element not found!");return}this.parent.addEventListener("click",t=>{t.target.dataset.add&&(console.log("➕ Adding place:",t.target.dataset.add),U(JSON.parse(t.target.dataset.add)),l("✓ Added to your trip!"))})}render(e){if(console.log("🎨 CardList: Rendering",e.length,"items"),!this.parent){console.error("❌ CardList: Cannot render, parent element missing");return}if(!e.length){this.parent.innerHTML='<p class="no-results">No places found. Try a different search term.</p>';return}this.parent.innerHTML=e.map(t=>{var r,n;return`
      <article class="card" data-place-id="${t.id}">
        <div class="card-header">
          <h3>${t.name||"Unknown Place"}</h3>
          <span class="card-type">${this.formatKind(t.kind)}</span>
        </div>
        <div class="card-content">
          <p class="coordinates">📍 ${(r=t.lat)==null?void 0:r.toFixed(4)}, ${(n=t.lon)==null?void 0:n.toFixed(4)}</p>
          ${t.kinds?`<p class="tags">${this.formatTags(t.kinds)}</p>`:""}
        </div>
        <div class="card-actions">
          <button class="btn-add" data-add='${JSON.stringify(t)}'>
            <span>+</span> Add to Trip
          </button>
        </div>
      </article>`}).join(""),console.log("✅ CardList: Render complete")}formatKind(e){return(e==null?void 0:e.replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase()))||"Place"}formatTags(e){return e.split(",").slice(0,3).map(t=>`<span class="tag">${t.replace(/_/g," ")}</span>`).join("")}}const k="https://api.exchangerate-api.com/v4/latest";async function T(o,e){try{const t=await fetch(`${k}/${o}`);if(!t.ok)throw new Error("Network response was not ok");return(await t.json()).rates[e]||p(o,e)}catch(t){return console.error("Currency API Error:",t),p(o,e)}}function p(o,e){console.log(`🏦 Using mock rate for ${o} → ${e}`);const t={"USD-EUR":.85,"USD-GBP":.73,"USD-JPY":110,"USD-CAD":1.25,"USD-UGX":3700,"USD-KES":130,"USD-TZS":2300,"EUR-USD":1.18,"EUR-GBP":.86,"EUR-JPY":129,"EUR-CAD":1.47,"EUR-UGX":4370,"EUR-KES":153,"EUR-TZS":2714,"GBP-USD":1.37,"GBP-EUR":1.16,"GBP-JPY":151,"GBP-CAD":1.71,"GBP-UGX":5069,"GBP-KES":178,"GBP-TZS":3151,"UGX-USD":27e-5,"UGX-EUR":23e-5,"UGX-GBP":197e-6,"UGX-JPY":.0297,"UGX-CAD":338e-6,"UGX-KES":.0351,"UGX-TZS":.622,"KES-USD":.0077,"KES-EUR":.0065,"KES-GBP":.0056,"KES-UGX":28.46,"KES-TZS":17.69,"KES-JPY":.846,"KES-CAD":.0096,"TZS-USD":435e-6,"TZS-EUR":368e-6,"TZS-GBP":317e-6,"TZS-UGX":1.608,"TZS-KES":.0565,"TZS-JPY":.0478,"TZS-CAD":544e-6},r=`${o}-${e}`;return t[r]||1}class G{constructor(e){this.parent=document.querySelector(e),this.currentRate=null,this.render(),this.bindEvents()}render(){this.parent.innerHTML=`
      <div class="currency-converter">
        <h3>💱 Currency Converter</h3>
        <div class="converter-controls">
          <div class="currency-input">
            <input type="number" id="amount" placeholder="100" value="100">
            <select id="fromCurrency">
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="UGX">UGX - Ugandan Shilling</option>
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="TZS">TZS - Tanzanian Shilling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>
          <div class="converter-arrow">→</div>
          <div class="currency-input">
            <input type="text" id="result" readonly placeholder="0.00">
            <select id="toCurrency">
              <option value="UGX">UGX - Ugandan Shilling</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="TZS">TZS - Tanzanian Shilling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>
        </div>
        <button id="convertBtn" class="btn-convert">Convert</button>
        <div id="rateInfo" class="rate-info"></div>
      </div>
    `}bindEvents(){const e=this.parent.querySelector("#convertBtn"),t=this.parent.querySelector("#amount");e.addEventListener("click",()=>this.convert()),t.addEventListener("keyup",r=>r.key==="Enter"&&this.convert())}async convert(){const e=parseFloat(this.parent.querySelector("#amount").value),t=this.parent.querySelector("#fromCurrency").value,r=this.parent.querySelector("#toCurrency").value,n=this.parent.querySelector("#result"),i=this.parent.querySelector("#rateInfo");if(!e||e<=0){n.value="",i.textContent="Please enter a valid amount";return}try{i.textContent="Converting...";const a=await T(t,r),s=(e*a).toFixed(2);n.value=this.formatCurrency(s,r),i.textContent=`1 ${t} = ${this.formatCurrency(a,r)}`,this.currentRate=a}catch(a){console.error("Currency conversion error:",a),n.value="",i.textContent="Conversion failed. Please try again."}}formatCurrency(e,t){const r=parseFloat(e);return t==="UGX"||t==="TZS"||t==="KES"?new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(r):new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:4}).format(r)}}class w{constructor(e){this.parent=document.querySelector(e),this.render(),this.bindEvents()}render(){const e=D(),t=$();if(!e.length){this.parent.innerHTML=`
        <div class="itinerary-empty">
          <h3>�� Your Trip Itinerary</h3>
          <p>No places added yet. Search and add some places to get started!</p>
        </div>
      `;return}this.parent.innerHTML=`
      <div class="itinerary-planner">
        <div class="itinerary-header">
          <h3>📋 Your Trip Itinerary (${e.length} places)</h3>
          <button id="clearTrip" class="btn-clear">Clear All</button>
        </div>
        ${t.map(r=>this.renderDay(r,e.filter(n=>n.day===r))).join("")}
        <button id="addDay" class="btn-add-day">+ Add Day</button>
      </div>
    `}renderDay(e,t){return`
      <div class="trip-day" data-day="${e}">
        <h4>Day ${e} (${t.length} places)</h4>
        <div class="day-places">
          ${t.map(r=>`
            <div class="itinerary-item" data-place-id="${r.id}">
              <div class="place-info">
                <span class="place-name">${r.name}</span>
                <span class="place-kind">${r.kind}</span>
              </div>
              <div class="place-actions">
                <select class="day-selector" data-place-id="${r.id}">
                  ${[1,2,3,4,5,6,7].map(n=>`<option value="${n}" ${n===e?"selected":""}>Day ${n}</option>`).join("")}
                </select>
                <button class="btn-remove" data-place-id="${r.id}">×</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `}bindEvents(){this.parent.addEventListener("click",e=>{if(e.target.matches(".btn-remove")){const t=e.target.dataset.placeId;C(t),l("Place removed from trip"),this.render()}e.target.matches("#clearTrip")&&confirm("Clear your entire trip?")&&(localStorage.removeItem("tgc-itinerary"),l("Trip cleared"),this.render())}),this.parent.addEventListener("change",e=>{if(e.target.matches(".day-selector")){const t=e.target.dataset.placeId,r=parseInt(e.target.value);P(t,r),l(`Moved to Day ${r}`),this.render()}})}}console.log("🏠 Home page script loading...");document.readyState==="loading"?(console.log("📄 DOM still loading, waiting..."),document.addEventListener("DOMContentLoaded",m)):(console.log("📄 DOM already loaded, initializing..."),m());function m(){console.log("🚀 Initializing app..."),console.log("🔧 Creating components...");const o=new b(".card-grid");new G(".currency-section");const e=new w(".itinerary-section");console.log("🔍 Setting up search...");const t=document.querySelector("#searchInput"),r=document.querySelector("#searchBtn"),n=document.querySelector(".content-header h2");if(console.log("📋 Elements found:",{searchInput:!!t,searchBtn:!!r,contentHeader:!!n}),r&&t){console.log("✅ Binding search events..."),r.addEventListener("click",s=>{console.log("🖱️ Search button clicked!"),s.preventDefault(),i()}),t.addEventListener("keyup",s=>{s.key==="Enter"&&(console.log("⌨️ Enter key pressed!"),s.preventDefault(),i())});let a;t.addEventListener("input",s=>{clearTimeout(a);const d=s.target.value.trim();if(d.length===0){o.render([]),n&&(n.textContent="Search Results");return}d.length>=3&&(console.log("📝 Auto-searching for:",d),a=setTimeout(()=>i(),500))})}else console.error("❌ Search elements not found!");async function i(){console.log("🔍 Search function called!");const a=t.value.trim();if(console.log("📝 Search query:",a),!a||a.length<2){console.log("⚠️ Query too short, clearing results"),o.render([]),n&&(n.textContent="Search Results");return}try{console.log("🔄 Starting search..."),r.disabled=!0,r.textContent="⏳ Searching...",n&&(n.textContent=`Searching for "${a}"...`);const s=await S(a,20);console.log("📋 Search results:",s),o.render(s),n&&(n.textContent=s.length>0?`Found ${s.length} places for "${a}"`:`No results for "${a}"`)}catch(s){console.error("❌ Search error:",s),o.render([]),n&&(n.textContent="Search failed - please try again")}finally{r.disabled=!1,r.textContent="🔍 Search",console.log("✅ Search completed")}}window.addEventListener("storage",()=>{e.render()}),setInterval(()=>{e.render()},3e3),n&&(n.textContent="Start by searching for places above"),console.log("✅ App initialization complete!")}
