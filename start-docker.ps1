# Script PowerShell pour démarrer Jeux Ami avec Docker

Write-Host "🚀 Démarrage de Jeux Ami avec Docker..." -ForegroundColor Cyan

# Vérifier si Docker est installé
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker n'est pas installé. Veuillez l'installer d'abord." -ForegroundColor Red
    exit 1
}

# Vérifier si Docker Compose est installé
if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker Compose n'est pas installé. Veuillez l'installer d'abord." -ForegroundColor Red
    exit 1
}

# Générer des ports aléatoires si .env n'existe pas
if (-not (Test-Path .env)) {
    Write-Host "📝 Génération de ports aléatoires..." -ForegroundColor Yellow
    .\generate-random-ports.ps1
}

# Charger les variables d'environnement
if (Test-Path .env) {
    Get-Content .env | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process')
        }
    }
}

# Construire les images
Write-Host "📦 Construction des images Docker..." -ForegroundColor Yellow
docker-compose build

# Démarrer les services
Write-Host "▶️  Démarrage des services..." -ForegroundColor Yellow
docker-compose up -d

# Attendre que les services soient prêts
Write-Host "⏳ Attente du démarrage des services..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Récupérer les ports assignés
$frontendPort = docker port jeux-ami-frontend 80/tcp 2>$null
$backendPort = docker port jeux-ami-backend 3001/tcp 2>$null

if ($frontendPort) {
    $frontendPort = $frontendPort.Split(':')[1]
} else {
    $frontendPort = "80"
}

if ($backendPort) {
    $backendPort = $backendPort.Split(':')[1]
} else {
    $backendPort = "3001"
}

# Vérifier l'état des services
Write-Host "📊 État des services:" -ForegroundColor Yellow
docker-compose ps

Write-Host ""
Write-Host "✅ Application démarrée!" -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:${frontendPort}" -ForegroundColor Cyan
Write-Host "🔌 Backend API: http://localhost:${backendPort}" -ForegroundColor Cyan
Write-Host "❤️  Health check: http://localhost:${backendPort}/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pour voir les logs: docker-compose logs -f" -ForegroundColor Gray
Write-Host "Pour arrêter: docker-compose down" -ForegroundColor Gray

