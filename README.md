# 💌 Date Invitation — Planifie notre date

Web-app mobile d'invitation interactive avec flow Story Instagram.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Framer Motion** (transitions entre écrans)
- **Déploiement Vercel** (gratuit)

## Flow

1. **`/create`** — L'organisateur configure l'invitation et génère un lien
2. **`/invite?config=...`** — L'invité(e) vit le flow en 5 écrans et répond par WhatsApp

## Lancer en local

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Déployer sur Vercel

1. Push ce repo sur GitHub
2. Va sur [vercel.com](https://vercel.com) → "Add New Project"
3. Sélectionne le repo → Deploy
4. ✅ Ton lien est vivant sur `https://ton-projet.vercel.app`

## Structure

```
app/
  create/page.js       → Page organisateur
  invite/
    page.js            → Wrapper Suspense
    InviteClient.js    → Flow invité (5 écrans)
components/
  ui/                  → ModeToggle, MenuGrid, CreneauxPicker, TransportPicker, PreviewCard
  screens/             → Screen1 à Screen5
lib/
  encode.js            → Encode/decode config en base64 URL
  constants.js         → Menus et transports par défaut
```
