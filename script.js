const IMAGE = "https://images.unsplash.com/";
const seedProducts = [
 {id:101,name:"iPhone 12 · 128GB",price:22900,category:"Electronics",condition:"Very Good",location:"Adyar, Chennai",phone:"9876543210",description:"Carefully used iPhone 12 with 128GB storage. Clean display, good battery performance and no major scratches. Includes charging cable.",image:IMAGE+"photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85",date:Date.now()-1000*60*60*2},
 {id:102,name:"Minimal Oak Study Desk",price:4200,category:"Furniture",condition:"Good",location:"Velachery, Chennai",phone:"9876543211",description:"Sturdy compact desk ideal for studying or working from home. A few small signs of use, structurally excellent.",image:IMAGE+"photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=85",date:Date.now()-1000*60*60*5},
 {id:103,name:"Sony Wireless Headphones",price:3500,category:"Electronics",condition:"Like New",location:"Tambaram, Chennai",phone:"9876543212",description:"Comfortable wireless headphones with clear audio. Used only a few times and kept in a protective case.",image:IMAGE+"photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",date:Date.now()-1000*60*60*8},
 {id:104,name:"Everyday Canvas Backpack",price:650,category:"Fashion",condition:"Very Good",location:"Anna Nagar, Chennai",phone:"9876543213",description:"Lightweight canvas backpack with multiple pockets. Clean and ideal for college or daily commuting.",image:IMAGE+"photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",date:Date.now()-1000*60*60*12},
 {id:105,name:"Canon DSLR Camera",price:18500,category:"Electronics",condition:"Good",location:"Mylapore, Chennai",phone:"9876543214",description:"Entry-level DSLR camera for photography learners. Fully functional and includes a camera strap. Ask seller for sample shots.",image:IMAGE+"photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",date:Date.now()-1000*60*60*18},
 {id:106,name:"Classic Road Bicycle",price:5200,category:"Vehicles",condition:"Good",location:"Porur, Chennai",phone:"9876543215",description:"Comfortable everyday bicycle with recently checked brakes and gears. Suitable for commuting and weekend rides.",image:IMAGE+"photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=85",date:Date.now()-1000*60*60*24},
 {id:107,name:"Indoor Lounge Chair",price:2800,category:"Furniture",condition:"Very Good",location:"OMR, Chennai",phone:"9876543216",description:"Stylish accent chair with a neutral finish. Comfortable, stable and a good fit for a reading corner.",image:IMAGE+"photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85",date:Date.now()-1000*60*60*30},
 {id:108,name:"Engineering Textbook Bundle",price:800,category:"Books",condition:"Good",location:"Guindy, Chennai",phone:"9876543217",description:"A bundle of useful engineering textbooks. Pages are intact with some highlighting. Great for students.",image:IMAGE+"photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85",date:Date.now()-1000*60*60*36},
 {id:109,name:"Running Shoes · Size 9",price:1200,category:"Fashion",condition:"Good",location:"T. Nagar, Chennai",phone:"9876543218",description:"Comfortable running shoes, size 9. Cleaned and ready for use; ideal for walking and casual workouts.",image:IMAGE+"photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",date:Date.now()-1000*60*60*40},
 {id:110,name:"Yoga & Fitness Mat",price:450,category:"Sports",condition:"Like New",location:"Thiruvanmiyur, Chennai",phone:"9876543219",description:"Non-slip exercise mat for yoga, stretching and home workouts. Lightly used and easy to roll up.",image:IMAGE+"photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=900&q=85",date:Date.now()-1000*60*60*48},
 {id:111,name:"Bluetooth Portable Speaker",price:1100,category:"Electronics",condition:"Very Good",location:"Chromepet, Chennai",phone:"9876543220",description:"Portable speaker with punchy sound and rechargeable battery. Convenient for travel and small gatherings.",image:IMAGE+"photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",date:Date.now()-1000*60*60*55},
 {id:112,name:"Ceramic Home Decor Set",price:700,category:"Home",condition:"Like New",location:"Nungambakkam, Chennai",phone:"9876543221",description:"Simple decorative ceramic pieces that add a warm, minimal look to a shelf, desk or coffee table.",image:IMAGE+"photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85",date:Date.now()-1000*60*60*60}
];

let products = loadProducts();
let currentUser = null;
let favorites = new Set(JSON.parse(localStorage.getItem("remarket_favorites") || "[]"));
let favoritesOnly = false;
let activeCategory = "All";
let toastTimer;

const $ = id => document.getElementById(id);
function loadProducts(){
  try{
    const saved=JSON.parse(localStorage.getItem("remarket_products") || "null");
    return Array.isArray(saved) && saved.length ? saved : [...seedProducts];
  }catch{return [...seedProducts];}
}
function saveProducts(){ localStorage.setItem("remarket_products",JSON.stringify(products)); }
function saveFavorites(){ localStorage.setItem("remarket_favorites",JSON.stringify([...favorites])); }
function showToast(text){
  const toast=$("toast");toast.textContent=text;toast.classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2600);
}
function safeImage(url){
  return typeof url==="string" && /^https:\/\/(images\.unsplash\.com|images\.pexels\.com|picsum\.photos)\//i.test(url) ? url : "";
}
function signIn(name){
  currentUser=name.trim()||"Guest";
  $("authScreen").classList.add("hidden");$("app").classList.remove("hidden");
  $("userName").textContent=currentUser.split(/\s+/)[0];
  $("avatar").textContent=currentUser.charAt(0).toUpperCase();
  renderProducts();
}
$("loginForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("loginName").value.trim(), email=$("loginEmail").value.trim(), password=$("loginPassword").value;
  if(!name||!email.includes("@")||password.length<4){$("loginMessage").textContent="Enter your name, a valid email and a password of at least 4 characters.";return;}
  signIn(name);showToast("Welcome to reMarket, "+name.split(/\s+/)[0]+"!");
});
$("guestBtn").addEventListener("click",()=>signIn("Guest"));
$("userMenu").addEventListener("click",()=>{
  if(confirm("Sign out of this demo marketplace?")){
    currentUser=null;$("app").classList.add("hidden");$("authScreen").classList.remove("hidden");
    $("loginPassword").value="";$("loginMessage").textContent="";
  }
});

function formatPrice(price){return "₹"+Number(price).toLocaleString("en-IN");}
function cardElement(p){
  const card=document.createElement("article");card.className="product-card";
  const photo=document.createElement("div");photo.className="product-photo";
  const img=document.createElement("img");img.src=safeImage(p.image)||"https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=80";img.alt=p.name;img.loading="lazy";
  img.onerror=()=>{img.onerror=null;img.src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=80";};
  const badge=document.createElement("span");badge.className="condition-badge";badge.textContent=p.condition;
  const heart=document.createElement("button");heart.className="heart-btn"+(favorites.has(p.id)?" saved":"");heart.textContent=favorites.has(p.id)?"♥":"♡";heart.setAttribute("aria-label",favorites.has(p.id)?"Remove from saved":"Save item");
  heart.addEventListener("click",e=>{e.stopPropagation();toggleFavorite(p.id);});
  photo.append(img,badge,heart);
  const info=document.createElement("div");info.className="product-info";
  const cat=document.createElement("div");cat.className="product-category";cat.textContent=p.category;
  const title=document.createElement("h3");title.textContent=p.name;
  const price=document.createElement("div");price.className="product-price";price.textContent=formatPrice(p.price);
  const meta=document.createElement("div");meta.className="product-meta";
  const loc=document.createElement("span");loc.className="product-location";loc.textContent="⌖ "+(p.location||"Location not added");
  const date=document.createElement("span");date.textContent=relativeDate(p.date);
  meta.append(loc,date);
  const actions=document.createElement("div");actions.className="product-actions";
  const details=document.createElement("button");details.className="btn btn-outline";details.textContent="View details";details.addEventListener("click",()=>openDetails(p.id));
  const contact=document.createElement("button");contact.className="btn btn-primary";contact.textContent="Contact seller";contact.addEventListener("click",()=>contactSeller(p));
  actions.append(details,contact);info.append(cat,title,price,meta,actions);card.append(photo,info);return card;
}
function relativeDate(date){
  const hours=Math.max(0,Math.floor((Date.now()-Number(date||Date.now()))/3600000));
  return hours<1?"Just now":hours<24?hours+"h ago":Math.floor(hours/24)+"d ago";
}
function renderProducts(){
  const search=$("searchInput").value.trim().toLowerCase(), sort=$("sortSelect").value;
  let list=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&
    (!favoritesOnly||favorites.has(p.id))&&
    [p.name,p.category,p.location,p.description].some(v=>String(v||"").toLowerCase().includes(search)));
  if(sort==="low")list.sort((a,b)=>a.price-b.price);
  if(sort==="high")list.sort((a,b)=>b.price-a.price);
  if(sort==="newest")list.sort((a,b)=>Number(b.date||0)-Number(a.date||0));
  $("productGrid").replaceChildren(...list.map(cardElement));
  $("emptyState").classList.toggle("hidden",list.length!==0);
  $("productGrid").classList.toggle("hidden",list.length===0);
  $("resultSummary").textContent=`${list.length} ${list.length===1?"item":"items"} ${favoritesOnly?"in your saved list":"available to explore"}.`;
  $("listingTitle").textContent=favoritesOnly?"Your saved items":activeCategory==="All"?"Fresh finds":activeCategory+" finds";
  document.querySelectorAll(".category-pill").forEach(btn=>btn.classList.toggle("active",btn.dataset.category===activeCategory));
}
function toggleFavorite(id){
  if(favorites.has(id)){favorites.delete(id);showToast("Removed from saved items.");}
  else{favorites.add(id);showToast("Added to saved items.");}
  saveFavorites();renderProducts();
}
function contactSeller(p){
  const phone=String(p.phone||"").replace(/\D/g,"");
  if(!phone){showToast("Seller has not provided a contact number.");return;}
  const digits=phone.length===10?"91"+phone:phone;
  const message=encodeURIComponent("Hi! I'm interested in your "+p.name+" listed on reMarket.");
  if(confirm("Open WhatsApp to contact the seller? Number: "+phone)){
    window.open("https://wa.me/"+digits+"?text="+message,"_blank","noopener,noreferrer");
  }
}
function openDetails(id){
  const p=products.find(item=>item.id===id);if(!p)return;
  const wrap=document.createElement("div");wrap.className="detail-layout";
  const img=document.createElement("img");img.src=safeImage(p.image)||"https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=80";img.alt=p.name;
  const content=document.createElement("div");
  const category=document.createElement("span");category.className="product-category";category.textContent=p.category;
  const title=document.createElement("h2");title.id="detailTitle";title.textContent=p.name;
  const price=document.createElement("div");price.className="product-price";price.textContent=formatPrice(p.price);
  const desc=document.createElement("p");desc.className="detail-description";desc.textContent=p.description;
  const meta=document.createElement("p");meta.className="detail-meta";meta.textContent=`Condition: ${p.condition}\nLocation: ${p.location||"Not provided"}\nListed: ${relativeDate(p.date)}`;meta.style.whiteSpace="pre-line";
  const contact=document.createElement("button");contact.className="btn btn-primary btn-wide";contact.textContent="Contact seller on WhatsApp";contact.addEventListener("click",()=>contactSeller(p));
  const save=document.createElement("button");save.className="btn btn-outline btn-wide";save.textContent=favorites.has(p.id)?"♥ Saved item":"♡ Save item";save.addEventListener("click",()=>{toggleFavorite(p.id);save.textContent=favorites.has(p.id)?"♥ Saved item":"♡ Save item";});
  content.append(category,title,price,desc,meta,contact,save);wrap.append(img,content);
  $("detailContent").replaceChildren(wrap);$("detailModal").classList.remove("hidden");
}
function openModal(id){$(id).classList.remove("hidden");document.body.style.overflow="hidden";}
function closeModal(id){$(id).classList.add("hidden");if(document.querySelectorAll(".modal-backdrop:not(.hidden)").length===0)document.body.style.overflow="";}
["sellTopBtn","heroSellBtn","bannerSellBtn"].forEach(id=>$(id).addEventListener("click",()=>openModal("sellModal")));
document.querySelectorAll("[data-close]").forEach(btn=>btn.addEventListener("click",()=>closeModal(btn.dataset.close)));
document.querySelectorAll(".modal-backdrop").forEach(backdrop=>backdrop.addEventListener("click",e=>{if(e.target===backdrop)closeModal(backdrop.id);}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".modal-backdrop:not(.hidden)").forEach(m=>closeModal(m.id));if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("searchInput").focus();}});
$("sellForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("itemName").value.trim(),price=Number($("itemPrice").value),category=$("itemCategory").value,condition=$("itemCondition").value,location=$("itemLocation").value.trim(),image=safeImage($("itemImage").value.trim()),description=$("itemDescription").value.trim(),phone=$("itemPhone").value.trim();
  if(!name||!Number.isSafeInteger(price)||price<1||!category||!condition||!location||!description||!/^[6-9][0-9]{9}$/.test(phone)){
    showToast("Please check all required fields and the phone number.");return;
  }
  products.unshift({id:Date.now(),name,price,category,condition,location,image,description,phone,date:Date.now()});
  saveProducts();renderProducts();e.target.reset();closeModal("sellModal");showToast("Your listing has been added!");
  $("listingSection").scrollIntoView({behavior:"smooth"});
});
$("searchInput").addEventListener("input",renderProducts);
$("sortSelect").addEventListener("change",renderProducts);
$("categoryRail").addEventListener("click",e=>{
  const btn=e.target.closest("[data-category]");if(!btn)return;
  activeCategory=btn.dataset.category;favoritesOnly=false;renderProducts();
});
$("favoritesToggle").addEventListener("click",()=>{
  favoritesOnly=!favoritesOnly;activeCategory="All";renderProducts();
  $("listingSection").scrollIntoView({behavior:"smooth"});
});
$("browseBtn").addEventListener("click",()=>$("listingSection").scrollIntoView({behavior:"smooth"}));
$("allCategoriesBtn").addEventListener("click",()=>{activeCategory="All";favoritesOnly=false;renderProducts();$("listingSection").scrollIntoView({behavior:"smooth"});});
$("clearFiltersBtn").addEventListener("click",()=>{$("searchInput").value="";activeCategory="All";favoritesOnly=false;$("sortSelect").value="recommended";renderProducts();});
