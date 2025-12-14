# Génère des ports aléatoires et crée un fichier .env

$random = New-Object System.Random
$FRONTEND_PORT = $random.Next(8000, 18000)
$BACKEND_PORT = $random.Next(8000, 18000)

# S'assurer que les ports sont différents
while ($FRONTEND_PORT -eq $BACKEND_PORT) {
    $BACKEND_PORT = $random.Next(8000, 18000)
}

$envContent = @"
# Ports générés aléatoirement
FRONTEND_PORT=${FRONTEND_PORT}
BACKEND_PORT=${BACKEND_PORT}

# Configuration API
VITE_API_URL=/api

# Backend
NODE_ENV=production
"@

$envContent | Out-File -FilePath .env -Encoding utf8

Write-Host "✅ Fichier .env créé avec des ports aléatoires:" -ForegroundColor Green
Write-Host "   Frontend: ${FRONTEND_PORT}" -ForegroundColor Cyan
Write-Host "   Backend: ${BACKEND_PORT}" -ForegroundColor Cyan

