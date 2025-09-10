// seed.mjs
import fs from "fs";

const DB = "db.json";
const API = "https://fakestoreapi.com/products";

const readJSON = (path) => (fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, "utf-8")) : {});
const writeJSON = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

const main = async () => {
  const res = await fetch(API);
  const products = await res.json();

  const db = readJSON(DB);
  db.products = products.map(p => ({
    id: p.id,
    title: p.title,
    price: Number(p.price),
    description: p.description,
    category: p.category,
    image: p.image
  }));
  db.orders = db.orders || [];
  db.users = db.users || [{ id: 1, email: "demo@demo.com", password: "pass123", name: "Demo User" }];

  writeJSON(DB, db);
  console.log(`Seed OK → ${db.products.length} ürün yazıldı.`);
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
