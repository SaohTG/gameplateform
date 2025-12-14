import { useState } from "react";
import { Link2, Trash2, Check, X } from "lucide-react";
import { useGameStore } from "../store/gameStore";

export default function SettingsView() {
  const { platforms, connectPlatform, disconnectPlatform, fetchGamesFromPlatform } = useGameStore();
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [userId, setUserId] = useState("");

  const handleConnect = async (platformId: string) => {
    setConnectingPlatform(platformId);
    // In production, this would use actual API authentication
    // For now, we'll simulate with mock credentials
    await connectPlatform(platformId, {
      apiKey: apiKey || "mock-key",
      userId: userId || "mock-user",
    });
    setConnectingPlatform(null);
    setApiKey("");
    setUserId("");
  };

  const handleDisconnect = (platformId: string) => {
    disconnectPlatform(platformId);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Paramètres</h2>
        <p className="text-slate-400">Gérez vos connexions aux plateformes de jeux</p>
      </div>

      <div className="space-y-6">
        {platforms.map((platform) => (
          <div key={platform.id} className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{platform.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{platform.name}</h3>
                  <p className="text-sm text-slate-400">
                    {platform.connected ? "Connecté" : "Non connecté"}
                  </p>
                </div>
              </div>
              {platform.connected ? (
                <button
                  onClick={() => handleDisconnect(platform.id)}
                  className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Déconnecter
                </button>
              ) : (
                <button
                  onClick={() => setConnectingPlatform(platform.id)}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Link2 size={18} />
                  Connecter
                </button>
              )}
            </div>

            {connectingPlatform === platform.id && !platform.connected && (
              <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">
                    Clé API (optionnel)
                  </label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Entrez votre clé API"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">
                    ID Utilisateur (optionnel)
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Entrez votre ID utilisateur"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-slate-400"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleConnect(platform.id)}
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center gap-2 font-medium"
                  >
                    <Check size={18} />
                    Confirmer
                  </button>
                  <button
                    onClick={() => {
                      setConnectingPlatform(null);
                      setApiKey("");
                      setUserId("");
                    }}
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <X size={18} />
                    Annuler
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Note: Pour une intégration complète, vous devrez configurer les API de chaque plateforme.
                  Cette version utilise des données de démonstration.
                </p>
              </div>
            )}

            {platform.connected && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => fetchGamesFromPlatform(platform.id)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  Actualiser les jeux
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 glass rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">À propos</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Jeux Ami est une plateforme de collection de jeux qui vous permet de centraliser
          tous vos jeux de différentes plateformes en un seul endroit. Connectez-vous à vos
          plateformes préférées, lancez vos jeux directement depuis l'application, et découvrez
          quels jeux vous partagez avec vos amis.
        </p>
      </div>
    </div>
  );
}

