/**
 * Intégrations avec les différentes plateformes de jeux
 * 
 * Ce fichier contient les configurations et helpers pour intégrer
 * les différentes plateformes de jeux vidéo.
 */

export interface PlatformConfig {
  id: string;
  name: string;
  apiBaseUrl?: string;
  authUrl?: string;
  requiresApiKey: boolean;
  requiresOAuth: boolean;
  documentationUrl: string;
}

export const platformConfigs: Record<string, PlatformConfig> = {
  steam: {
    id: "steam",
    name: "Steam",
    apiBaseUrl: "https://api.steampowered.com",
    requiresApiKey: true,
    requiresOAuth: false,
    documentationUrl: "https://steamcommunity.com/dev",
  },
  epic: {
    id: "epic",
    name: "Epic Games",
    requiresApiKey: true,
    requiresOAuth: true,
    documentationUrl: "https://dev.epicgames.com/docs",
  },
  gog: {
    id: "gog",
    name: "GOG",
    apiBaseUrl: "https://api.gog.com",
    requiresApiKey: true,
    requiresOAuth: true,
    documentationUrl: "https://developers.gog.com/",
  },
  xbox: {
    id: "xbox",
    name: "Xbox",
    requiresApiKey: true,
    requiresOAuth: true,
    documentationUrl: "https://docs.microsoft.com/en-us/gaming/xbox-live/",
  },
  ubisoft: {
    id: "ubisoft",
    name: "Ubisoft Connect",
    requiresApiKey: true,
    requiresOAuth: true,
    documentationUrl: "https://developer.ubisoft.com/",
  },
  origin: {
    id: "origin",
    name: "EA App",
    requiresApiKey: true,
    requiresOAuth: true,
    documentationUrl: "https://developer.ea.com/",
  },
};

/**
 * Détecte les exécutables de jeux installés localement
 * En production, cela scannerait les dossiers d'installation par défaut
 */
export async function detectInstalledGames(platformId: string): Promise<string[]> {
  // Cette fonction serait implémentée pour scanner les dossiers d'installation
  // Par exemple, pour Steam : C:\Program Files (x86)\Steam\steamapps\common\
  // Pour Epic : C:\Program Files\Epic Games\
  // etc.
  
  return [];
}

/**
 * Génère une commande de lancement pour un jeu
 */
export function generateLaunchCommand(
  platformId: string,
  gameId: string,
  executablePath?: string
): string {
  switch (platformId) {
    case "steam":
      return `steam://run/${gameId}`;
    case "epic":
      return executablePath || "";
    case "gog":
      return executablePath || "";
    default:
      return executablePath || "";
  }
}

