# Instructions et Règles pour le projet KRbeaute

## Coordonnées Officielles
- **Email officiel :** `karinarobart@krbeaute.com` (toujours utiliser cette adresse pour les liens mailto, footer, formulaire de contact, mentions légales, RGPD et profil).
- **Téléphone :** `06 65 56 67 02`
- **Domaine officiel :** `www.krbeaute.com`
- **Zone d'activité :** Rennes et communes environnantes.

## Environnement Git & Déploiement
- Git est installé sous : `$env:LOCALAPPDATA\Programs\Git\cmd`
- **Règle impérative pour le push GitHub :**
  L'environnement d'exécution étant headless (sans interface pour les fenêtres pop-up de connexion), un simple `git push origin main` bloque indéfiniment sur `git-credential-manager`.
  Toujours pousser via le token GitHub (PAT) stocké dans `.env` (`GITHUB_PAT`) :
  ```powershell
  $gitCmd = "$env:LOCALAPPDATA\Programs\Git\cmd"
  $env:PATH = "$gitCmd;$env:PATH"
  $envContent = Get-Content .env | ConvertFrom-StringData
  $token = $envContent.GITHUB_PAT.Trim('"')
  $pushUrl = "https://${token}@github.com/5hidiwen/KRBeaute.git"
  git push $pushUrl main:main
  git remote set-url origin https://github.com/5hidiwen/KRBeaute.git
  git update-ref refs/remotes/origin/main (git rev-parse HEAD)
  ```
