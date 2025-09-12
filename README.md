This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Özellikler

- 🔐 Kullanıcı giriş/çıkış (demo kullanıcı: `demo@demo.com / 1234`)
- 📦 Sepete ürün ekleme, adet güncelleme, silme
- ❤️ Favorilere ekleme / kaldırma (Wishlist)
- 🛍 Sipariş oluşturma & geçmişi görüntüleme
- 💳 Siparişi ödeme (demo)
- 🔍 Arama, kategori filtreleme, fiyat filtreleme, sıralama
- 📱 Responsive modern UI (TailwindCSS)

Sonra backend (JSON Server):
cd mobiversite-api
npm install
npm start
---
-Proje Yapısı
mobiversite-shop/
├── src/
│   ├── app/         # Next.js app router pages
│   ├── components/  # Reusable UI bileşenleri
│   ├── store/       # Redux Toolkit store + slices
│   └── lib/         # axios, auth, utils
├── mobiversite-api/ # JSON Server backend
├── public/          # static assets
├── package.json
└── README.md

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
