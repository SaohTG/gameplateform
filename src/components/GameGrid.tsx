import GameCard from "./GameCard";
import { Game } from "../store/gameStore";

interface GameGridProps {
  games: Game[];
  viewMode: "grid" | "list";
}

export default function GameGrid({ games, viewMode }: GameGridProps) {
  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} viewMode="grid" />
      ))}
    </div>
  );
}

