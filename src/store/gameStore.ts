import { create } from "zustand";
import { api } from "../services/api";

export interface Game {
  id: string;
  name: string;
  platform: string;
  platformId: string;
  imageUrl?: string;
  executablePath?: string;
  launchCommand?: string;
  installed: boolean;
  playTime?: number;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  apiKey?: string;
  userId?: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar?: string;
  platforms: string[];
  games: Game[];
}

interface GameStore {
  games: Game[];
  platforms: Platform[];
  friends: Friend[];
  loading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  addGame: (game: Game) => void;
  removeGame: (gameId: string) => void;
  connectPlatform: (platformId: string, credentials: any) => Promise<void>;
  disconnectPlatform: (platformId: string) => Promise<void>;
  addFriend: (friend: Omit<Friend, 'id'>) => Promise<void>;
  launchGame: (gameId: string) => Promise<void>;
  fetchGamesFromPlatform: (platformId: string) => Promise<void>;
  refreshGames: () => Promise<void>;
  refreshFriends: () => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => ({
  games: [],
  platforms: [
    { id: "steam", name: "Steam", icon: "🎮", connected: false },
    { id: "epic", name: "Epic Games", icon: "🎯", connected: false },
    { id: "gog", name: "GOG", icon: "🌟", connected: false },
    { id: "xbox", name: "Xbox", icon: "🎲", connected: false },
    { id: "ubisoft", name: "Ubisoft Connect", icon: "🏰", connected: false },
    { id: "origin", name: "EA App", icon: "⚡", connected: false },
  ],
  friends: [],
  loading: false,
  error: null,
  
  initialize: async () => {
    set({ loading: true, error: null });
    try {
      const [platforms, games, friends] = await Promise.all([
        api.getPlatforms(),
        api.getGames().catch(() => []),
        api.getFriends().catch(() => []),
      ]);
      
      // Mettre à jour les plateformes avec leur statut de connexion depuis le backend
      set((state) => ({
        platforms: state.platforms.map((p) => {
          const backendPlatform = platforms.find((bp: any) => bp.id === p.id);
          return backendPlatform ? { ...p, ...backendPlatform } : p;
        }),
        games,
        friends,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  addGame: (game) => set((state) => ({ games: [...state.games, game] })),
  
  removeGame: (gameId) => set((state) => ({
    games: state.games.filter((g) => g.id !== gameId),
  })),
  
  connectPlatform: async (platformId, credentials) => {
    set({ loading: true, error: null });
    try {
      const result = await api.connectPlatform(platformId, credentials);
      set((state) => ({
        platforms: state.platforms.map((p) =>
          p.id === platformId
            ? { ...p, connected: true, ...credentials }
            : p
        ),
        games: [
          ...state.games.filter((g) => g.platform !== platformId),
          ...result.games,
        ],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  disconnectPlatform: async (platformId) => {
    set({ loading: true, error: null });
    try {
      await api.disconnectPlatform(platformId);
      set((state) => ({
        platforms: state.platforms.map((p) =>
          p.id === platformId ? { ...p, connected: false, apiKey: undefined, userId: undefined } : p
        ),
        games: state.games.filter((g) => g.platform !== platformId),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  addFriend: async (friend) => {
    set({ loading: true, error: null });
    try {
      const newFriend = await api.addFriend(friend);
      set((state) => ({
        friends: [...state.friends, newFriend],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  launchGame: async (gameId) => {
    const game = get().games.find((g) => g.id === gameId);
    if (!game) return;
    
    // Pour la version web, on ne peut pas lancer directement les jeux
    // On affiche juste une notification
    if (typeof window !== 'undefined' && 'Notification' in window) {
      new Notification(`Lancement de ${game.name}`, {
        body: 'Le lancement des jeux nécessite la version desktop de l\'application.',
      });
    }
    
    // Si on est dans Tauri, utiliser l'API Tauri
    // Note: @tauri-apps/api n'est disponible que dans l'environnement Tauri
    if (typeof window !== 'undefined' && '__TAURI__' in window) {
      try {
        const { invoke } = await import("@tauri-apps/api/tauri");
        if (game.executablePath) {
          await invoke("launch_game", { path: game.executablePath });
        } else if (game.launchCommand) {
          await invoke("launch_game_command", { command: game.launchCommand });
        }
      } catch (error) {
        console.log("Erreur lors du lancement du jeu:", error);
      }
    } else {
      console.log("Lancement de jeu non disponible en version web");
    }
  },
  
  fetchGamesFromPlatform: async (platformId) => {
    const platform = get().platforms.find((p) => p.id === platformId);
    if (!platform?.connected) return;
    
    set({ loading: true, error: null });
    try {
      const games = await api.getPlatformGames(platformId);
      set((state) => ({
        games: [
          ...state.games.filter((g) => g.platform !== platformId),
          ...games,
        ],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  refreshGames: async () => {
    set({ loading: true, error: null });
    try {
      const games = await api.getGames();
      set({ games, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  refreshFriends: async () => {
    set({ loading: true, error: null });
    try {
      const friends = await api.getFriends();
      set({ friends, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

