import { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AppNav } from "./components/AppNav";
import { PlaceDetailModal } from "./components/PlaceDetailModal";
import { appTabs, type AppTab } from "./data/itinerary";
import type { Place } from "./lib/placeHelpers";
import { ChecklistScreen } from "./screens/ChecklistScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ItineraryScreen } from "./screens/ItineraryScreen";
import { NotesScreen } from "./screens/NotesScreen";
import { SavedPlacesScreen } from "./screens/SavedPlacesScreen";
import { ShoppingScreen } from "./screens/ShoppingScreen";
import "./style.css";

const validScreens = new Set<AppTab>(appTabs.map(([id]) => id));

const screenFromHash = (): AppTab => {
  const candidate = window.location.hash.replace("#", "") as AppTab;
  return validScreens.has(candidate) ? candidate : "home";
};

function App() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [showMaybe, setShowMaybe] = useState(true);
  const [activePlaceTab, setActivePlaceTab] = useState(0);
  const [activeScreen, setActiveScreen] = useState<AppTab>(screenFromHash);
  const [detailPlace, setDetailPlace] = useState<Place | null>(null);
  const closePlaceDetail = useCallback(() => setDetailPlace(null), []);

  const navigate = useCallback((screen: AppTab) => {
    setActiveScreen(screen);
    const nextHash = `#${screen}`;
    if (window.location.hash !== nextHash) window.history.pushState(null, "", nextHash);
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
    document.body.scrollTop = 0;
    document.body.scrollLeft = 0;
  }, [activeScreen]);

  useEffect(() => {
    const handleHistoryChange = () => setActiveScreen(screenFromHash());
    window.addEventListener("popstate", handleHistoryChange);
    return () => window.removeEventListener("popstate", handleHistoryChange);
  }, []);

  return <div className="app-shell">
    <AppNav activeScreen={activeScreen} onNavigate={navigate} />
    <main className="screen-content" key={activeScreen}>
      {activeScreen === "home" && <HomeScreen onOpenItinerary={() => navigate("itinerary")} />}
      {activeScreen === "itinerary" && <ItineraryScreen
        selected={selectedDay}
        showMaybe={showMaybe}
        onSelectDay={setSelectedDay}
        onToggleMaybe={() => setShowMaybe(current => !current)}
      />}
      {activeScreen === "notes" && <NotesScreen />}
      {activeScreen === "shopping" && <ShoppingScreen />}
      {activeScreen === "saved" && <SavedPlacesScreen
        activePlaceTab={activePlaceTab}
        onChangePlaceTab={setActivePlaceTab}
        onOpenPlace={setDetailPlace}
      />}
      {activeScreen === "checklist" && <ChecklistScreen showMaybe={showMaybe} />}
    </main>
    {detailPlace && <PlaceDetailModal place={detailPlace} onClose={closePlaceDetail} />}
    <footer>
      <span>SEONGHO & SEIN'S TRAVEL NOTE</span>
      <span>HOKKAIDO · NOVEMBER 2026</span>
    </footer>
  </div>;
}

createRoot(document.getElementById("root")!).render(<App />);
