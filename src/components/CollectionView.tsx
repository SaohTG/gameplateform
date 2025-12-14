import { useState } from "react";
import { Play, Search, Grid3x3, List } from "lucide-react";
import { useGameStore } from "../store/gameStore";
import GameCard from "./GameCard";
import GameGrid from "./GameGrid";

export default function CollectionView() {
  const { games, platforms } = useGameStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === "all" || game.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Ma Collection</h2>
        <p className="text-slate-400">
          {games.length} jeu{games.length > 1 ? "x" : ""} dans votre collection
        </p>
      </div>

      {/* Search and Filters */}
      <div className="glass rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un jeu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-slate-400"
          />
        </div>
        
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
        >
          <option value="all">Toutes les plateformes</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "grid"
                ? "bg-primary-600 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            <Grid3x3 size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-primary-600 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Games Display */}
      {filteredGames.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-slate-400 text-lg mb-4">
            {games.length === 0
              ? "Aucun jeu dans votre collection. Connectez-vous à une plateforme dans les paramètres."
              : "Aucun jeu ne correspond à votre recherche."}
          </p>
        </div>
      ) : (
        <GameGrid games={filteredGames} viewMode={viewMode} />
      )}
    </div>
  );
}

