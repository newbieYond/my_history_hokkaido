import { useState } from "react";
import { createRoot } from "react-dom/client";
import places from "./data/places.json";
import "./style.css";

type Day = { date: string; title: string; area: string; flow: string; food: string; tone: string; detail: string; status?: string };

const days: Day[] = [
  { date: "11.18 WED", title: "인천 → 삿포로", area: "SAPPORO", flow: "신치토세 · 삿포로역 · 다누키코지", food: "수프카레 또는 미소라멘", tone: "arrival", detail: "7C1503 12:15 인천 T1 출발 · 15:00 신치토세 도착. 17시경 게이큐 엑스 호텔에 짐을 맡기고, 다누키코지와 스스키노를 가볍게 걷는다.", status: "항공 확정" },
  { date: "11.19 THU", title: "조잔케이의 하루", area: "JŌZANKEI", flow: "오도리 · 송영버스 · 료칸", food: "가이세키 · 홋카이도 사케", tone: "onsen", detail: "10:20 호텔 체크아웃 후 11:15 오도리 니시 5초메 집결. 11:30 송영버스로 스이잔테이 클럽 조잔케이로 이동해 객실 노천탕과 휴식을 즐긴다.", status: "료칸·송영 확정" },
  { date: "11.20 FRI", title: "겨울빛의 시작", area: "SAPPORO", flow: "조잔케이 · 삿포로역 · 오도리", food: "이자카야 · 시메파르페", tone: "light", detail: "13:00 조잔케이 출발. 삿포로역 코인로커를 거쳐 16:00 Y’s Sapporo 에어비앤비 체크인. 저녁에는 화이트 일루미네이션과 뮌헨 크리스마스 마켓을 만난다.", status: "이벤트 관람" },
  { date: "11.21 SAT", title: "푸른 운하, 오타루", area: "OTARU", flow: "미나미오타루 · 사카이마치 · 운하", food: "초밥 · 르타오 · 오뎅", tone: "otaru", detail: "JR로 미나미오타루역에서 시작해 다나카주조, 사카이마치, 르타오를 지나 오타루 운하까지 내리막으로 걷는다. 일몰 뒤 푸른 운하와 하츠하나를 후보로 둔다.", status: "JR 당일치기" },
  { date: "11.22 SUN", title: "비에이의 겨울색", area: "BIEI", flow: "삿포로 출발 · 청의호수 · 흰수염폭포", food: "투어 식사 · 복귀 후 라멘", tone: "blue", detail: "청의호수와 흰수염폭포를 포함한 삿포로 출발 1일 버스투어를 예약할 예정이다. 야간 라이트업과 닝글테라스 포함 여부는 출발 전 다시 확인한다.", status: "투어 미정" },
  { date: "11.23 MON", title: "트램과 야경", area: "SAPPORO", flow: "니조시장 · 치토세츠루 · 시전 · 모이와야마", food: "카이센동 · 징기스칸", tone: "night", detail: "니조시장에서 시작해 사케 뮤지엄, 삿포로 시전 한 바퀴(약 55분)를 탄다. 로프웨이로 모이와야마 야경을 보고 저녁을 먹는다.", status: "공휴일" },
  { date: "11.24 TUE", title: "공항의 마지막 한입", area: "NEW CHITOSE", flow: "체크아웃 · 국내선 2층 · 귀국", food: "에비소바 · 소프트아이스크림", tone: "airport", detail: "10:00 체크아웃 후 공항으로 바로 이동. 국내선 2층에서 기념품과 점심을 해결한 뒤 국제선으로 이동한다. 7C1504 16:00 출발 · 19:25 인천 도착.", status: "항공 확정" }
];

const shops = [
  ["공항 국내선 2층", "회사용 대량 과자 · 마지막 냉장 선물", "흰 연인 · 삿포로농학교 · 자가포클"],
  ["다이마루 삿포로 B1", "부모님·여자친구용 고급 선물", "SNOW CHEESE · 노스맨 · ISHIYA G"],
  ["오타루 사카이마치", "동선 속 브랜드 한정품", "르타오 · 키타카로 · 롯카테이"],
  ["다누키코지", "밤 산책 중 탐색·개인 쇼핑", "다누키야 · 코부시야 · 돈키호테"]
];

const savedPlaceTabs = [
  { label: "오타루", areas: ["오타루"] },
  { label: "비에이 및 후라노", areas: ["비에이·후라노"] },
  { label: "조잔케이", areas: ["조잔케이"] },
  { label: "삿포로 시내", areas: ["삿포로"] },
  { label: "그밖에 (공항 포함)", areas: ["신치토세"] }
].map(tab => ({
  ...tab,
  places: places.filter(place => tab.areas.includes(place.area))
}));

const categoryLabel: Record<string, string> = {
  cafe: "카페",
  food: "식당",
  shop: "쇼핑",
  spot: "명소",
  stay: "숙소"
};

function App() {
  const [selected, setSelected] = useState(0);
  const [showMaybe, setShowMaybe] = useState(true);
  const [activePlaceTab, setActivePlaceTab] = useState(0);
  const day = days[selected];
  const activeSavedPlaceGroup = savedPlaceTabs[activePlaceTab];
  return <main>
    <nav><a className="brand" href="#top">HOKKAIDO <i>26</i></a><div className="navlinks"><a href="#itinerary">일정</a><a href="#notes">여행 노트</a><a href="#shopping">쇼핑</a></div><span className="navdate">18—24 NOV</span></nav>
    <section id="top" className="hero"><div className="flakes">✦　·　✧　·　✦　·　✧</div><p className="eyebrow">A WINTER TRAVEL NOTE</p><h1>눈이 오기 전,<br /><em>Hokkaido.</em></h1><div className="hero-bottom"><p>2026. 11. 18 — 11. 24<br />SEONGHO & SEIN · 6 NIGHTS, 7 DAYS</p><a href="#itinerary">여행 살펴보기 <span>↓</span></a></div></section>
    <section className="intro"><p className="section-label">THE PLAN</p><h2>따뜻한 온천과 푸른 밤,<br />천천히 걷는 북쪽의 일주일.</h2><p className="introcopy">삿포로를 베이스로 조잔케이의 객실 노천탕, 오타루의 푸른 운하, 비에이의 겨울 풍경을 만나는 두 사람의 첫 홋카이도 여행.</p><div className="stat-grid"><div><b>02</b><span>TRAVELLERS</span></div><div><b>06</b><span>NIGHTS</span></div><div><b>05</b><span>CITIES & TOWNS</span></div><div><b>¥50K</b><span>CASH TO PREPARE</span></div></div></section>
    <section id="itinerary" className="itinerary"><div className="section-head"><p className="section-label">DAY BY DAY</p><h2>7 days<br />of small stories.</h2><label className="toggle"><input checked={showMaybe} onChange={e => setShowMaybe(e.target.checked)} type="checkbox" /><span></span>미정 계획도 보기</label></div><div className="day-layout"><div className="day-list">{days.map((d, i) => <button onClick={() => setSelected(i)} className={i === selected ? "active" : ""} key={d.date}><small>{d.date}</small><strong>DAY {i + 1}</strong><span>{d.title}</span>{d.status === "투어 미정" && showMaybe && <i>검토</i>}</button>)}</div><article className={`day-card ${day.tone}`}><div className="card-number">0{selected + 1}</div><p>{day.date} · {day.area}</p><h3>{day.title}</h3><div className="route">{day.flow.split(" · ").map((x, i) => <span key={x}>{x}{i < day.flow.split(" · ").length - 1 && <b>→</b>}</span>)}</div><p className="detail">{day.detail}</p><div className="food"><span>오늘의 맛</span><strong>{day.food}</strong></div></article></div></section>
    <section id="notes" className="notes"><div><p className="section-label">KEEP IN MIND</p><h2>여행을 더 가볍게<br />만드는 작은 메모.</h2></div><div className="note-grid"><article><span>01</span><h3>숙소 & 짐</h3><p>게이큐 엑스 호텔 1박, 스이잔테이 클럽 조잔케이 1박, Y’s Sapporo 에어비앤비 4박. 조잔케이 복귀 버스의 승차장은 체크인 때 확인한다.</p></article><article><span>02</span><h3>겨울의 밤</h3><p>11/20 화이트 일루미네이션과 뮌헨 크리스마스 마켓, 11/21 오타루 푸른 운하는 여행의 고정된 야간 장면이다.</p></article><article><span>03</span><h3>고독한 미식가</h3><p>오타루 하츠하나는 운하 다음 저녁 후보. 작은 가게라 예약과 현금 준비가 필요하다. 니쿠노 아사쿠라는 징기스칸 대안으로 둔다.</p></article><article><span>04</span><h3>출발 전</h3><p>비에이 버스투어, 에어비앤비 사전체크인, 여행자보험·eSIM, 폭설·강풍과 로프웨이 운휴 여부만 출발 직전에 다시 확인한다.</p></article></div></section>
    <section id="shopping" className="shopping"><div className="shop-title"><p className="section-label">SOUVENIR EDIT</p><h2>좋아하는 사람에게<br /><em>홋카이도를 담아.</em></h2><p>시내에서 특별한 선물을 먼저 고르고, 공항에서 회사용 대량 과자를 마무리하는 순서가 가장 편하다.</p></div><div className="shop-list">{shops.map(([name, desc, picks], i) => <article key={name}><span>0{i + 1}</span><div><h3>{name}</h3><p>{desc}</p></div><strong>{picks}</strong></article>)}</div></section>
    <section className="saved-places"><div className="saved-title"><p className="section-label">SAVED ON MAPS</p><h2>저장해 둔<br /><em>{places.length}개의 장소.</em></h2><p>Google 지도 Takeout에서 가져온 원본 링크입니다. 각 장소를 눌러 바로 지도에서 열 수 있어요.</p></div><div className="saved-content"><div className="place-tabs" role="tablist" aria-label="저장 장소 권역"><div className="place-tabs-scroll">{savedPlaceTabs.map((tab, index) => <button type="button" role="tab" aria-selected={index === activePlaceTab} className={index === activePlaceTab ? "active" : ""} onClick={() => setActivePlaceTab(index)} key={tab.label}>{tab.label}<span>{tab.places.length}</span></button>)}</div></div><article className="saved-group" role="tabpanel"><div className="saved-area"><h3>{activeSavedPlaceGroup.label}</h3><span>{activeSavedPlaceGroup.places.length} PLACES</span></div><ul>{activeSavedPlaceGroup.places.map(place => <li key={place.id}><a href={place.googleMapsUrl} target="_blank" rel="noreferrer"><span>{place.name}</span><small>{categoryLabel[place.category]}</small><b>↗</b></a></li>)}</ul></article></div></section>
    <section className="checklist"><p className="section-label">NEXT TO DO</p><h2>출발 전, 남은 네 가지.</h2><ol><li>OneStay 에어비앤비 사전체크인</li><li className={showMaybe ? "pending" : "hide"}>11월 22일 비에이 버스투어 예약</li><li>조잔케이 복귀버스 정확한 승차장 확인</li><li>여행자보험·eSIM 및 직전 날씨 확인</li></ol></section>
    <footer><span>SEOHO & SEIN'S TRAVEL NOTE</span><span>HOKKAIDO · NOVEMBER 2026</span></footer>
  </main>;
}

createRoot(document.getElementById("root")!).render(<App />);
