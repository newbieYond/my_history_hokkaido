import { days } from "../data/itinerary";

type ItineraryScreenProps = {
  selected: number;
  showMaybe: boolean;
  onSelectDay: (index: number) => void;
  onToggleMaybe: () => void;
};

const Route = ({ flow }: { flow: string }) => {
  const stops = flow.split(" · ");
  return <>{stops.map((stop, index) => <span key={stop}>
    {stop}{index < stops.length - 1 && <b aria-hidden="true">→</b>}
  </span>)}</>;
};

export function ItineraryScreen({ selected, showMaybe, onSelectDay, onToggleMaybe }: ItineraryScreenProps) {
  const day = days[selected];

  return <>
    <section className="intro">
      <p className="section-label">THE PLAN</p>
      <h2>따뜻한 온천과 푸른 밤,<br />천천히 걷는 북쪽의 일주일.</h2>
      <p className="introcopy">삿포로를 베이스로 조잔케이의 객실 노천탕, 오타루의 푸른 운하, 비에이의 겨울 풍경을 만나는 두 사람의 첫 홋카이도 여행.</p>
      <div className="stat-grid">
        <div><b>02</b><span>TRAVELLERS</span></div>
        <div><b>06</b><span>NIGHTS</span></div>
        <div><b>05</b><span>CITIES & TOWNS</span></div>
        <div><b>¥50K</b><span>CASH TO PREPARE</span></div>
      </div>
    </section>
    <section className="itinerary">
      <div className="section-head">
        <div>
          <p className="section-label">DAY BY DAY</p>
          <h2>7 days<br />of small stories.</h2>
        </div>
        <button
          type="button"
          className="toggle-button"
          role="switch"
          aria-checked={showMaybe}
          onClick={onToggleMaybe}
        >
          <span aria-hidden="true"><i /></span>
          미정 계획도 보기
        </button>
      </div>
      <div className="day-layout">
        <div className="day-list">
          <div className="day-selector" role="group" aria-label="일정 날짜 선택">
            {days.map((item, index) => <button
              type="button"
              onClick={() => onSelectDay(index)}
              aria-pressed={index === selected}
              className={index === selected ? "active" : ""}
              key={item.date}
            >
              <small>{item.date}</small>
              <strong>DAY {index + 1}</strong>
              <span>{item.title}</span>
              {item.status === "투어 미정" && showMaybe && <i>검토</i>}
            </button>)}
          </div>
          <article className="day-selection-summary" aria-live="polite">
            <div className="day-selection-heading">
              <div>
                <small>DAY {selected + 1} · {day.date}</small>
                <strong>{day.title}</strong>
              </div>
              <span className={day.status.includes("미정") ? "pending" : "confirmed"}>{day.status}</span>
            </div>
            <div className="summary-route"><Route flow={day.flow} /></div>
            <p>{day.detail}</p>
          </article>
        </div>
        <article className={`day-card ${day.tone}`}>
          <div className="card-number" aria-hidden="true">0{selected + 1}</div>
          <p>{day.date} · {day.area}</p>
          <h3>{day.title}</h3>
          <div className="route"><Route flow={day.flow} /></div>
          <p className="detail">{day.detail}</p>
          <div className="food"><span>오늘의 맛</span><strong>{day.food}</strong></div>
        </article>
      </div>
    </section>
  </>;
}
