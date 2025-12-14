# Script pour pousser le code vers GitHub

Write-Host "🚀 Configuration Git et push vers GitHub..." -ForegroundColor Cyan

# Vérifier si Git est installé
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git n'est pas installé ou pas dans le PATH." -ForegroundColor Red
    Write-Host "Veuillez installer Git depuis https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Ou exécutez manuellement ces commandes:" -ForegroundColor Yellow
    Write-Host "  git init" -ForegroundColor Gray
    Write-Host "  git remote add origin https://github.com/SaohTG/gameplateform.git" -ForegroundColor Gray
    Write-Host "  git add ." -ForegroundColor Gray
    Write-Host "  git commit -m `"Initial commit: Jeux Ami`"" -ForegroundColor Gray
    Write-Host "  git branch -M main" -ForegroundColor Gray
    Write-Host "  git push -u origin main" -ForegroundColor Gray
    exit 1
}

# Initialiser Git si nécessaire
if (-not (Test-Path .git)) {
    Write-Host "📦 Initialisation du dépôt Git..." -ForegroundColor Yellow
    git init
}

# Vérifier si le remote existe
$remoteExists = git remote get-url origin 2>$null

if (-not $remoteExists) {
    Write-Host "🔗 Ajout du remote GitHub..." -ForegroundColor Yellow
    git remote add origin https://github.com/SaohTG/gameplateform.git
} else {
    Write-Host "✅ Remote déjà configuré: $remoteExists" -ForegroundColor Green
    $update = Read-Host "Voulez-vous le mettre à jour? (o/N)"
    if ($update -eq "o" -or $update -eq "O") {
        git remote set-url origin https://github.com/SaohTG/gameplateform.git
        Write-Host "✅ Remote mis à jour" -ForegroundColor Green
    }
}

# Ajouter tous les fichiers
Write-Host "📝 Ajout des fichiers..." -ForegroundColor Yellow
git add .

# Vérifier s'il y a des changements
$status = git status --porcelain
if (-not $status) {
    Write-Host "ℹ️  Aucun changement à commiter" -ForegroundColor Cyan
} else {
    Write-Host "💾 Création du commit..." -ForegroundColor Yellow
    git commit -m "Initial commit: Jeux Ami - Plateforme de collection de jeux avec Docker et ports dynamiques"
}

# Définir la branche principale
Write-Host "🌿 Configuration de la branche main..." -ForegroundColor Yellow
git branch -M main

# Pousser vers GitHub
Write-Host "⬆️  Push vers GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  Vous devrez peut-être vous authentifier" -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Code poussé vers GitHub avec succès!" -ForegroundColor Green
    Write-Host "🔗 Dépôt: https://github.com/SaohTG/gameplateform" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Erreur lors du push" -ForegroundColor Red
    Write-Host "Vérifiez vos credentials Git ou exécutez:" -ForegroundColor Yellow
    Write-Host "  git push -u origin main" -ForegroundColor Gray
}

