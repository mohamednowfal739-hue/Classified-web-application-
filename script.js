const initialProducts = [
  {id:1,name:"Samsung Smartphone",price:6500,category:"Electronics",condition:"Good",phone:"9876543210",description:"Used smartphone in good condition.",emoji:"📱"},
  {id:2,name:"Mountain Bicycle",price:4500,category:"Vehicles",condition:"Very Good",phone:"9876543211",description:"Well-maintained bicycle.",emoji:"🚲"},
  {id:3,name:"Engineering Books",price:500,category:"Books",condition:"Good",phone:"9876543212",description:"Useful books for engineering students.",emoji:"📚"},
  {id:4,name:"Study Table",price:1800,category:"Furniture",condition:"Good",phone:"9876543213",description:"Wooden study table.",emoji:"🪑"},
  {id:5,name:"Wireless Headphones",price:900,category:"Electronics",condition:"Like New",phone:"9876543214",description:"Headphones with clear sound.",emoji:"🎧"},
  {id:6,name:"Casual Backpack",price:400,category:"Fashion",condition:"Fair",phone:"9876543215",description:"Pre-owned everyday backpack.",emoji:"🎒"}
];
let products=[...initialProducts];
const searchInput=document.getElementById("search");
const categoryInput=document.getElementById("category");
const sortInput=document.getElementById("sort");
const productList=document.getElementById("productList");
const count=document.getElementById("count");
const message=document.getElementById("message");
const icons={Electronics:"📱",Vehicles:"🚲",Books:"📚",Furniture:"🪑",Fashion:"🎒"};

function displayProducts(){
  const search=searchInput.value.trim().toLowerCase();
  const category=categoryInput.value;
  const sort=sortInput.value;
  let filtered=products.filter(p=>p.name.toLowerCase().includes(search)&&(category==="All"||p.category===category));
  if(sort==="low")filtered.sort((a,b)=>a.price-b.price);
  else if(sort==="high")filtered.sort((a,b)=>b.price-a.price);
  count.textContent=`${filtered.length} product(s) found`;
  productList.replaceChildren();
  if(!filtered.length){productList.textContent="No products found. Try another search.";return;}
  filtered.forEach(p=>{
    const card=document.createElement("article");card.className="card";
    const image=document.createElement("div");image.className="product-image";image.textContent=p.emoji||"📦";image.setAttribute("aria-hidden","true");
    const title=document.createElement("h3");title.textContent=p.name;
    const cat=document.createElement("p");cat.textContent="Category: "+p.category;
    const cond=document.createElement("p");cond.textContent="Condition: "+p.condition;
    const price=document.createElement("p");price.className="price";price.textContent="₹"+p.price.toLocaleString("en-IN");
    const desc=document.createElement("p");desc.className="description";desc.textContent=p.description;
    const contact=document.createElement("button");contact.textContent="Contact Seller";
    contact.addEventListener("click",()=>alert("Seller contact number: "+p.phone));
    card.append(image,title,cat,cond,price,desc,contact);productList.appendChild(card);
  });
}

document.getElementById("sellForm").addEventListener("submit",event=>{
  event.preventDefault();
  const name=document.getElementById("productName").value.trim();
  const price=Number(document.getElementById("productPrice").value);
  const category=document.getElementById("productCategory").value;
  const condition=document.getElementById("productCondition").value;
  const phone=document.getElementById("sellerPhone").value.trim();
  const description=document.getElementById("productDescription").value.trim();
  if(!name||!description||!category||!condition||!Number.isSafeInteger(price)||price<1||!/^[6-9][0-9]{9}$/.test(phone)){
    message.textContent="Please enter valid product details.";return;
  }
  products.unshift({id:Date.now(),name,price,category,condition,phone,description,emoji:icons[category]||"📦"});
  displayProducts();event.target.reset();
  message.textContent="Advertisement posted successfully!";
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
});
searchInput.addEventListener("input",displayProducts);
categoryInput.addEventListener("change",displayProducts);
sortInput.addEventListener("change",displayProducts);
displayProducts();
