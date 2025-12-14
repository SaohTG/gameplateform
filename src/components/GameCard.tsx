import { Play, Clock } from "lucide-react";
import { Game } from "../store/gameStore";
import { useGameStore } from "../store/gameStore";

interface GameCardProps {
  game: Game;
  viewMode?: "grid" | "list";
}

export default function GameCard({ game, viewMode = "grid" }: GameCardProps) {
  const { launchGame } = useGameStore();
  const platform = useGameStore((state) =>
    state.platforms.find((p) => p.id === game.platform)
  );

  if (viewMode === "list") {
    return (
      <div className="glass rounded-lg p-4 flex items-center gap-4 hover:bg-white/10 transition-all duration-300">
        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center flex-shrink-0">
          {game.imageUrl ? (
            <img src={game.imageUrl} alt={game.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span className="text-2xl">{platform?.icon || "🎮"}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{game.name}</h3>
          <p className="text-sm text-slate-400">{platform?.name}</p>
          {game.playTime && (
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
              <Clock size={12} />
              <span>{Math.floor(game.playTime / 60)}h</span>
            </div>
          )}
        </div>
        {game.installed && (
          <button
            onClick={() => launchGame(game.id)}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center gap-2 transition-colors font-medium"
          >
            <Play size={18} />
            Jouer
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="glass rounded-xl overflow-hidden card-hover group">
      <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center relative overflow-hidden">
        {game.imageUrl ? (
          <img
            src={game.imageUrl}
            alt={game.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <span className="text-6xl">{platform?.icon || "🎮"}</span>
        )}
        {game.installed && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => launchGame(game.id)}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center gap-2 transition-colors font-medium transform scale-90 group-hover:scale-100"
            >
              <Play size={20} />
              Jouer
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{game.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">{platform?.name}</p>
          {game.playTime && (
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={12} />
              <span>{Math.floor(game.playTime / 60)}h</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

