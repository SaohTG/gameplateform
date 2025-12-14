import { useState } from "react";
import { UserPlus, Users, Gamepad2 } from "lucide-react";
import { useGameStore, Friend } from "../store/gameStore";
import FriendCard from "./FriendCard";
import CommonGamesModal from "./CommonGamesModal";

export default function FriendsView() {
  const { friends, games } = useGameStore();
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");

  const addFriend = async () => {
    if (!newFriendName.trim()) return;
    
    await useGameStore.getState().addFriend({
      name: newFriendName,
      platforms: [],
      games: [],
    });
    setNewFriendName("");
    setShowAddFriend(false);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Mes Amis</h2>
          <p className="text-slate-400">
            {friends.length} ami{friends.length > 1 ? "s" : ""} dans votre liste
          </p>
        </div>
        <button
          onClick={() => setShowAddFriend(true)}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center gap-2 transition-colors font-medium"
        >
          <UserPlus size={20} />
          Ajouter un ami
        </button>
      </div>

      {showAddFriend && (
        <div className="glass rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Ajouter un ami</h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Nom de l'ami"
              value={newFriendName}
              onChange={(e) => setNewFriendName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addFriend()}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-slate-400"
            />
            <button
              onClick={addFriend}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors font-medium"
            >
              Ajouter
            </button>
            <button
              onClick={() => {
                setShowAddFriend(false);
                setNewFriendName("");
              }}
              className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {friends.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <Users className="mx-auto mb-4 text-slate-400" size={48} />
          <p className="text-slate-400 text-lg mb-4">
            Vous n'avez pas encore d'amis. Ajoutez-en pour voir vos jeux en commun !
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              onViewCommonGames={() => setSelectedFriend(friend)}
            />
          ))}
        </div>
      )}

      {selectedFriend && (
        <CommonGamesModal
          friend={selectedFriend}
          onClose={() => setSelectedFriend(null)}
        />
      )}
    </div>
  );
}

