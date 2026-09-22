import { useRef, type KeyboardEvent } from "react";
import places from "../data/places.json";
import {
  categoryLabel,
  ratingDetails,
  savedPlaceTabs,
  type Place
} from "../lib/placeHelpers";

type SavedPlacesScreenProps = {
  activePlaceTab: number;
  onChangePlaceTab: (index: number) => void;
  onOpenPlace: (place: Place) => void;
};

export function SavedPlacesScreen({ activePlaceTab, onChangePlaceTab, onOpenPlace }: SavedPlacesScreenProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeGroup = savedPlaceTabs[activePlaceTab];

  const selectTabByKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = savedPlaceTabs.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight") nextIndex = index === lastIndex ? 0 : index + 1;
    else if (event.key === "ArrowLeft") nextIndex = index === 0 ? lastIndex : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;
    else return;

    event.preventDefault();
    onChangePlaceTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return <section className="saved-places">
    <div className="saved-title">
      <p className="section-label">SAVED ON MAPS</p>
      <h2>저장해 둔<br /><em>{places.length}개의 장소.</em></h2>
      <p>정확한 Google 지도 링크와 여행 전 체크할 내용을 한곳에 모았습니다. 사진과 후기는 직접 기록해 채워 갈 수 있어요.</p>
      <p className="place-verification">2026.09.06 · Google 지도 공유 목록 대조<br />폐업 반영 · {places.length}곳 표시</p>
    </div>
    <div className="saved-content">
      <div className="place-tabs">
        <div className="place-tabs-scroll" role="tablist" aria-label="저장 장소 권역">
          {savedPlaceTabs.map((tab, index) => <button
            ref={element => { tabRefs.current[index] = element; }}
            id={`place-tab-${index}`}
            type="button"
            role="tab"
            tabIndex={index === activePlaceTab ? 0 : -1}
            aria-selected={index === activePlaceTab}
            aria-controls="saved-place-panel"
            className={index === activePlaceTab ? "active" : ""}
            onClick={() => onChangePlaceTab(index)}
            onKeyDown={event => selectTabByKeyboard(event, index)}
            key={tab.label}
          >
            {tab.label}<span>{tab.places.length}</span>
          </button>)}
        </div>
      </div>
      <article
        id="saved-place-panel"
        className="saved-group"
        role="tabpanel"
        aria-labelledby={`place-tab-${activePlaceTab}`}
      >
        <div className="saved-area">
          <div><p className="section-label">AREA GUIDE</p><h3>{activeGroup.label}</h3></div>
          <span>{activeGroup.places.length} PLACES</span>
        </div>
        <ul>
          {activeGroup.places.map(place => {
            const rating = ratingDetails(place);
            return <li className="saved-place-card" key={place.id}>
              <div className="saved-place-card-head">
                <div>
                  <span>{place.name}</span>
                  <small>{place.isSelected ? `일정 추가 · ${categoryLabel[place.category]}` : categoryLabel[place.category]}</small>
                </div>
              </div>
              <div className="saved-place-card-footer">
                <span className="place-rating" aria-label={rating.ariaLabel}>
                  <b>{rating.value === null ? "☆" : "★"}</b>
                  {rating.label}{rating.value === null ? "" : <em> / 5.0</em>}
                </span>
                <div className="saved-place-card-actions">
                  <button type="button" className="place-detail-button" aria-label={`${place.name} 상세 보기`} onClick={() => onOpenPlace(place)}>상세 보기</button>
                  <a className="place-map-link" href={place.googleMapsUrl} target="_blank" rel="noreferrer" aria-label={`${place.name} Google 지도에서 보기`}>Google 지도 ↗</a>
                </div>
              </div>
            </li>;
          })}
        </ul>
      </article>
    </div>
  </section>;
}
