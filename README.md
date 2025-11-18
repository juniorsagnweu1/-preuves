# Sujetax-like — site statique (prototype)

## Structure
Copie le dossier `sujetax-like/` tel quel sur ton disque. Contient:
- `index.html`, `styles.css`, `script.js`
- `site-index.json` (index de recherche)
- dossiers: `section-a/`, `section-b/`, `images/` (mets tes images ici)

## Hébergement recommandé

### Option A — GitHub Pages (gratuit pour site statique)
1. Crée un repo GitHub (ex: `sujetax-like`) et pousse tous les fichiers.
2. Dans Settings → Pages: choisis `main` branch, root.
3. Le site sera disponible sur `https://<username>.github.io/<repo>/`.

Commandes Git:
```bash
cd sujetax-like
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:TON-USER/TON-REPO.git
git push -u origin main
```

Pour domaine personnalisé: ajoute un fichier `CNAME` contenant ton domaine et configure les DNS.

### Option B — Netlify (déploiement + CI facile)
1. Crée un repo et pousse.
2. Sur Netlify, *New site from Git* → connecte ton repo → Deploy.
3. Netlify gère HTTPS automatiquement.

## Fichiers volumineux
- Si tu as des images/vidéos lourdes: **ne pas** les stocker directement dans Git. Utilise:
  - S3 + CloudFront (CDN)
  - Cloudinary / Cloudflare Images
  - Git LFS (1 GiB gratuit) — utile pour quelques gros fichiers

## Notes
- Remplace les images de `/images/` par tes propres assets (optimise en WebP/AVIF).
- Le site est 100% statique; pour formulaires réels, utilise Formspree / Netlify Forms ou ton backend.
