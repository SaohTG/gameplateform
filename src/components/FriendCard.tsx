import { useState, useEffect } from "react";
import { User, Gamepad2 } from "lucide-react";
import { Friend } from "../store/gameStore";
import { useGameStore } from "../store/gameStore";
import { api } from "../services/api";

interface FriendCardProps {
  friend: Friend;
  onViewCommonGames: () => void;
}

export default function FriendCard({ friend, onViewCommonGames }: FriendCardProps) {
  const { games } = useGameStore();
  const [commonGamesCount, setCommonGamesCount] = useState(0);
  
  useEffect(() => {
    api.getCommonGames(friend.id)
      .then((commonGames) => setCommonGamesCount(commonGames.length))
      .catch(() => setCommonGamesCount(0));
  }, [friend.id, games]);

  return (
    <div className="glass rounded-xl p-6 card-hover">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center flex-shrink-0">
          {friend.avatar ? (
            <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover rounded-full" />
          ) : (
            <User size={32} className="text-primary-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{friend.name}</h3>
          <p className="text-sm text-slate-400">
            {friend.platforms.length} plateforme{friend.platforms.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>
      
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-slate-400">
          <Gamepad2 size={18} />
          <span className="text-sm">
            {commonGamesCount} jeu{commonGamesCount > 1 ? "x" : ""} en commun
          </span>
        </div>
        {commonGamesCount > 0 && (
          <button
            onClick={onViewCommonGames}
            className="px-4 py-2 bg-primary-600/20 hover:bg-primary-600/30 text-primary-400 rounded-lg transition-colors text-sm font-medium"
          >
            Voir
          </button>
        )}
      </div>
    </div>
  );
}

