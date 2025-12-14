import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Friend, Game } from "../store/gameStore";
import { api } from "../services/api";
import GameCard from "./GameCard";

interface CommonGamesModalProps {
  friend: Friend;
  onClose: () => void;
}

export default function CommonGamesModal({ friend, onClose }: CommonGamesModalProps) {
  const [commonGames, setCommonGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    api.getCommonGames(friend.id)
      .then(setCommonGames)
      .catch(() => setCommonGames([]))
      .finally(() => setLoading(false));
  }, [friend.id]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Jeux en commun avec {friend.name}</h2>
            <p className="text-slate-400 mt-1">
              {commonGames.length} jeu{commonGames.length > 1 ? "x" : ""} partagé{commonGames.length > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-slate-400">Chargement...</p>
            </div>
          ) : commonGames.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">
                Aucun jeu en commun avec {friend.name}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonGames.map((game) => (
                <GameCard key={game.id} game={game} viewMode="grid" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

