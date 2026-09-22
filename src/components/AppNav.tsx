import { appTabs, type AppTab } from "../data/itinerary";

type AppNavProps = {
  activeScreen: AppTab;
  onNavigate: (screen: AppTab) => void;
};

export function AppNav({ activeScreen, onNavigate }: AppNavProps) {
  return <nav className="app-nav" aria-label="여행 가이드 메뉴">
    <button className="brand" aria-label="홈 화면 보기" onClick={() => onNavigate("home")}>
      HOKKAIDO <i>26</i>
    </button>
    <div className="navlinks">
      {appTabs.map(([id, label]) => <button
        type="button"
        aria-current={activeScreen === id ? "page" : undefined}
        className={activeScreen === id ? "active" : ""}
        onClick={() => onNavigate(id)}
        key={id}
      >
        {label}
      </button>)}
    </div>
    <span className="navdate">18—24 NOV</span>
  </nav>;
}
