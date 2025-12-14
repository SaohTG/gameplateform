import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Store des données (en production, utiliser une base de données)
const dataStore = {
  users: {},
  platforms: {},
  games: {},
  friends: {}
};

// Routes pour les plateformes
app.get('/api/platforms', (req, res) => {
  const platforms = [
    { id: "steam", name: "Steam", icon: "🎮", connected: false },
    { id: "epic", name: "Epic Games", icon: "🎯", connected: false },
    { id: "gog", name: "GOG", icon: "🌟", connected: false },
    { id: "xbox", name: "Xbox", icon: "🎲", connected: false },
    { id: "ubisoft", name: "Ubisoft Connect", icon: "🏰", connected: false },
    { id: "origin", name: "EA App", icon: "⚡", connected: false },
  ];
  res.json(platforms);
});

// Connecter une plateforme
app.post('/api/platforms/:platformId/connect', async (req, res) => {
  const { platformId } = req.params;
  const { apiKey, userId } = req.body;
  const userIdHeader = req.headers['x-user-id'] || 'default-user';

  if (!dataStore.platforms[userIdHeader]) {
    dataStore.platforms[userIdHeader] = {};
  }

  dataStore.platforms[userIdHeader][platformId] = {
    connected: true,
    apiKey,
    userId,
    connectedAt: new Date().toISOString()
  };

  // Simuler la récupération des jeux
  const mockGames = await fetchGamesFromPlatform(platformId, userIdHeader);
  
  if (!dataStore.games[userIdHeader]) {
    dataStore.games[userIdHeader] = [];
  }

  // Filtrer les anciens jeux de cette plateforme et ajouter les nouveaux
  dataStore.games[userIdHeader] = [
    ...dataStore.games[userIdHeader].filter(g => g.platform !== platformId),
    ...mockGames
  ];

  res.json({
    success: true,
    platform: dataStore.platforms[userIdHeader][platformId],
    games: mockGames
  });
});

// Déconnecter une plateforme
app.post('/api/platforms/:platformId/disconnect', (req, res) => {
  const { platformId } = req.params;
  const userIdHeader = req.headers['x-user-id'] || 'default-user';

  if (dataStore.platforms[userIdHeader]) {
    delete dataStore.platforms[userIdHeader][platformId];
  }

  if (dataStore.games[userIdHeader]) {
    dataStore.games[userIdHeader] = dataStore.games[userIdHeader].filter(
      g => g.platform !== platformId
    );
  }

  res.json({ success: true });
});

// Récupérer les jeux
app.get('/api/games', (req, res) => {
  const userIdHeader = req.headers['x-user-id'] || 'default-user';
  const games = dataStore.games[userIdHeader] || [];
  res.json(games);
});

// Récupérer les jeux d'une plateforme
app.get('/api/platforms/:platformId/games', async (req, res) => {
  const { platformId } = req.params;
  const userIdHeader = req.headers['x-user-id'] || 'default-user';
  
  const games = await fetchGamesFromPlatform(platformId, userIdHeader);
  res.json(games);
});

// Routes pour les amis
app.get('/api/friends', (req, res) => {
  const userIdHeader = req.headers['x-user-id'] || 'default-user';
  const friends = dataStore.friends[userIdHeader] || [];
  res.json(friends);
});

app.post('/api/friends', (req, res) => {
  const userIdHeader = req.headers['x-user-id'] || 'default-user';
  const { name, avatar, platforms, games } = req.body;

  if (!dataStore.friends[userIdHeader]) {
    dataStore.friends[userIdHeader] = [];
  }

  const newFriend = {
    id: Date.now().toString(),
    name,
    avatar,
    platforms: platforms || [],
    games: games || []
  };

  dataStore.friends[userIdHeader].push(newFriend);
  res.json(newFriend);
});

// Récupérer les jeux en commun avec un ami
app.get('/api/friends/:friendId/common-games', (req, res) => {
  const { friendId } = req.params;
  const userIdHeader = req.headers['x-user-id'] || 'default-user';

  const userGames = dataStore.games[userIdHeader] || [];
  const friend = (dataStore.friends[userIdHeader] || []).find(f => f.id === friendId);

  if (!friend) {
    return res.status(404).json({ error: 'Ami non trouvé' });
  }

  const commonGames = userGames.filter(userGame =>
    friend.games.some(friendGame =>
      friendGame.id === userGame.id || friendGame.name === userGame.name
    )
  );

  res.json(commonGames);
});

// Fonction pour simuler la récupération des jeux depuis une plateforme
async function fetchGamesFromPlatform(platformId, userId) {
  // En production, cela appellerait les vraies API des plateformes
  // Pour l'instant, on retourne des données de démonstration
  
  const platformNames = {
    steam: "Steam",
    epic: "Epic Games",
    gog: "GOG",
    xbox: "Xbox",
    ubisoft: "Ubisoft Connect",
    origin: "EA App"
  };

  const mockGames = [
    {
      id: `${platformId}-${Date.now()}-1`,
      name: `Exemple Jeu 1 - ${platformNames[platformId] || platformId}`,
      platform: platformId,
      platformId: "1",
      installed: Math.random() > 0.5,
      executablePath: platformId === 'steam' ? null : `C:\\Games\\${platformId}\\game1.exe`,
      playTime: Math.floor(Math.random() * 1000)
    },
    {
      id: `${platformId}-${Date.now()}-2`,
      name: `Exemple Jeu 2 - ${platformNames[platformId] || platformId}`,
      platform: platformId,
      platformId: "2",
      installed: Math.random() > 0.5,
      executablePath: platformId === 'steam' ? null : `C:\\Games\\${platformId}\\game2.exe`,
      playTime: Math.floor(Math.random() * 1000)
    },
    {
      id: `${platformId}-${Date.now()}-3`,
      name: `Exemple Jeu 3 - ${platformNames[platformId] || platformId}`,
      platform: platformId,
      platformId: "3",
      installed: false,
      playTime: 0
    }
  ];

  return mockGames;
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend API démarré sur le port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});

