import { Home, Users, Settings } from "lucide-react";

interface SidebarProps {
  activeTab: "collection" | "friends" | "settings";
  setActiveTab: (tab: "collection" | "friends" | "settings") => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "collection" as const, label: "Collection", icon: Home },
    { id: "friends" as const, label: "Amis", icon: Users },
    { id: "settings" as const, label: "Paramètres", icon: Settings },
  ];

  return (
    <aside className="w-64 glass border-r border-white/10 p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Jeux Ami
        </h1>
        <p className="text-sm text-slate-400 mt-1">Votre collection de jeux</p>
      </div>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary-600/20 text-primary-400 border border-primary-500/30"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-6 border-t border-white/10">
        <p className="text-xs text-slate-500 text-center">
          Version 1.0.0
        </p>
      </div>
    </aside>
  );
}

