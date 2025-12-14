const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Générer un ID utilisateur unique (en production, cela viendrait de l'authentification)
const getUserId = (): string => {
  let userId = localStorage.getItem('jeux-ami-user-id');
  if (!userId) {
    userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('jeux-ami-user-id', userId);
  }
  return userId;
};

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const userId = getUserId();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

export const api = {
  // Plateformes
  getPlatforms: () => apiRequest('/platforms'),
  
  connectPlatform: (platformId: string, credentials: { apiKey?: string; userId?: string }) =>
    apiRequest(`/platforms/${platformId}/connect`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  disconnectPlatform: (platformId: string) =>
    apiRequest(`/platforms/${platformId}/disconnect`, {
      method: 'POST',
    }),
  
  // Jeux
  getGames: () => apiRequest('/games'),
  
  getPlatformGames: (platformId: string) =>
    apiRequest(`/platforms/${platformId}/games`),
  
  // Amis
  getFriends: () => apiRequest('/friends'),
  
  addFriend: (friend: { name: string; avatar?: string; platforms?: string[]; games?: any[] }) =>
    apiRequest('/friends', {
      method: 'POST',
      body: JSON.stringify(friend),
    }),
  
  getCommonGames: (friendId: string) =>
    apiRequest(`/friends/${friendId}/common-games`),
};

