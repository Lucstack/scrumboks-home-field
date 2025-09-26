# Cloudinary Setup

## 🚀 Stap 1: Cloudinary Account Aanmaken

1. Ga naar [Cloudinary.com](https://cloudinary.com/)
2. Klik **"Sign Up For Free"**
3. Vul je gegevens in
4. Bevestig je email
5. **Gratis tier**: 25GB storage + 25GB bandwidth per maand! 🎉

## 🔑 Stap 2: API Credentials Ophalen

1. Ga naar je [Cloudinary Dashboard](https://cloudinary.com/console)
2. Kopieer de volgende waarden:
   - **Cloud Name** (bijv. `d123456789`)
   - **API Key** (bijv. `123456789012345`)
   - **API Secret** (bijv. `abcdefghijklmnopqrstuvwxyz123456`)

## ⚙️ Stap 3: Environment Variables

1. Kopieer `env.example` naar `.env`:
```bash
cp env.example .env
```

2. Vul je Cloudinary credentials in:
```env
CLOUDINARY_CLOUD_NAME=d123456789
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

## 🧪 Stap 4: Testen

```bash
npm run dev:full
```

Upload een foto via het Word Lid formulier - deze wordt nu geoptimaliseerd en opgeslagen in Cloudinary!

## ✨ Voordelen van Cloudinary

- **🆓 25GB gratis** storage + bandwidth
- **🖼️ Automatische optimalisatie** - foto's worden gecomprimeerd
- **📱 Responsive images** - verschillende formaten voor verschillende schermen
- **🌐 CDN** - snelle delivery wereldwijd
- **🔄 Auto-format** - WebP wanneer ondersteund
- **👤 Face detection** - slimme thumbnails
- **⏰ Auto-cleanup** - oude bestanden worden automatisch verwijderd

## 💰 Kosten

- **Gratis tier**: 25GB storage + 25GB bandwidth
- **Daarna**: ~€0.10 per GB storage, ~€0.10 per GB bandwidth
- Voor een kleine website: **Gratis!** 🎉

## 🔒 Beveiliging

- Files zijn alleen toegankelijk via unieke URLs
- Automatische cleanup na 24 uur
- Geen publieke toegang tot je account
- HTTPS voor alle transfers

## 🚀 Productie Deployment

Voor productie, gebruik environment variables in je hosting platform:

```bash
CLOUDINARY_CLOUD_NAME=your-production-cloud-name
CLOUDINARY_API_KEY=your-production-api-key
CLOUDINARY_API_SECRET=your-production-api-secret
```

## 🎯 Image Optimizations

Cloudinary doet automatisch:
- **Compressie** - tot 80% kleiner bestand
- **Format conversie** - WebP voor moderne browsers
- **Resizing** - max 800x600px voor uploads
- **Thumbnails** - 200x200px met face detection
- **Quality optimization** - beste kwaliteit/maat verhouding
