# Suivi des heures de stage

Appli web installable (PWA) pour suivre les 210 heures de stage de la formation de coach sportif (8 octobre 2026 au 8 avril 2027).

- Les cours, notes et commentaires sont enregistrés uniquement dans le navigateur de l'appareil (`localStorage`) : aucun serveur, aucun compte, rien n'est envoyé en ligne.
- Fonctionne hors ligne une fois ouverte une première fois (service worker `sw.js`).
- « Créer une sauvegarde » produit un fichier `.json` à garder en lieu sûr ; « Restaurer une sauvegarde » le réimporte.
- « Exporter en tableau » produit un `.csv` (une ligne par cours) pour Excel, Numbers ou Google Sheets.

## Installer sur le téléphone

- iPhone (Safari) : bouton Partager → « Sur l'écran d'accueil ».
- Android (Chrome) : menu ⋮ → « Installer l'application ».

## Mettre à jour

L'appli est dans `docs/` (dossier publié par GitHub Pages). Après toute modification d'un fichier, incrémenter `VERSION` dans `docs/sw.js` pour que les téléphones reçoivent la nouvelle version.
