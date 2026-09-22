type HomeScreenProps = {
  onOpenItinerary: () => void;
};

export function HomeScreen({ onOpenItinerary }: HomeScreenProps) {
  return <section className="hero">
    <div className="flakes" aria-hidden="true">✦　·　✧　·　✦　·　✧</div>
    <p className="eyebrow">A WINTER TRAVEL NOTE</p>
    <h1>눈이 오기 전,<br /><em>Hokkaido.</em></h1>
    <div className="hero-bottom">
      <p>2026. 11. 18 — 11. 24<br />SEONGHO & SEIN · 6 NIGHTS, 7 DAYS</p>
      <button className="hero-cta" aria-label="일정 화면 보기" onClick={onOpenItinerary}>
        여행 살펴보기 <span aria-hidden="true">↓</span>
      </button>
    </div>
  </section>;
}
