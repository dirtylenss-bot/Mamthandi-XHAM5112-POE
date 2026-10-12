const items = [
  ['Kota Classic','kotas','R 48','../assets/kota-classic.jpeg','Slap chips, egg, polony, cheese & atchar'],
  ['Chicken Kota','kotas','R 65','../assets/kota-chicken.jpeg','Spiced chicken, chips and signature sauce'],
  ['Steak & Chips Kota','kotas','R 72','../assets/kota-steak.jpeg','Grilled steak, chips, cheese and relish'],
  ['Fish Kota','kotas','R 68','../assets/kota-fish.jpeg','Crispy fish, chips and tartar sauce'],
  ['Boerewors Roll','grill','R 55','../assets/kota-sausage.jpeg','Flame-grilled boerewors, chakalaka & relish'],
  ['Braai Chicken & Pap','grill','R 82','../assets/kota-chicken.jpeg','Grilled chicken, pap and chakalaka'],
  ['Braai Steak Plate','grill','R 115','../assets/kota-steak.jpeg','Juicy steak, slap chips and spicy sauce'],
  ['Castle Lager','drinks','R 32','../assets/kota-fish.jpeg','A cold local lager • 18+ only'],
  ['Stoney Ginger Beer','drinks','R 22','../assets/kota-loaded.jpeg','The spicy local soft-drink favourite'],
  ['Sparletta Creme Soda','drinks','R 22','../assets/kota-loaded.jpeg','Sweet, green and ice cold'],
  ['Koeksisters','dessert','R 32','../assets/kota-classic.jpeg','Three syrup-soaked South African classics'],
  ['Chocolate Chip Muffin','dessert','R 28','../assets/kota-cheese.jpeg','Freshly home-baked and warmed to order'],
  ['Vanilla Ice Cream','dessert','R 30','../assets/kota-cheese.jpeg','Creamy vanilla ice cream with chocolate drizzle'],
];
const cards=document.querySelector('#cards'), filters=document.querySelectorAll('.filter'), count=document.querySelector('#basket-count'), toast=document.querySelector('#toast');let basket=0;
function render(filter='all'){cards.innerHTML=items.filter(i=>filter==='all'||i[1]===filter).map(([name,cat,price,img,desc])=>`<article class="card"><img src="${img}" alt="${name}"><div class="card-copy"><div class="card-category">${cat}</div><h3>${name}</h3><p>${desc}</p><div class="card-footer"><span>${price}</span><button class="add" data-name="${name}">+ Add</button></div></div></article>`).join('');document.querySelectorAll('.add').forEach(b=>b.addEventListener('click',()=>{basket++;count.textContent=basket;toast.textContent=`${b.dataset.name} added to your order`;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}))}filters.forEach(f=>f.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));f.classList.add('active');render(f.dataset.filter)}));render();
