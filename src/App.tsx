import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import CollectionView from "./components/CollectionView";
import FriendsView from "./components/FriendsView";
import SettingsView from "./components/SettingsView";
import { useGameStore } from "./store/gameStore";

function App() {
  const [activeTab, setActiveTab] = useState<"collection" | "friends" | "settings">("collection");
  const { initialize, loading, error } = useGameStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading && !error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        {error && (
          <div className="bg-red-600/20 border border-red-500/30 text-red-400 px-4 py-3 m-4 rounded-lg">
            Erreur: {error}
          </div>
        )}
        {activeTab === "collection" && <CollectionView />}
        {activeTab === "friends" && <FriendsView />}
        {activeTab === "settings" && <SettingsView />}
      </main>
    </div>
  );
}

export default App;

