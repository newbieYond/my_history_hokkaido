import places from "../data/places.json";
import { days } from "../data/itinerary";

export type Place = (typeof places)[number];

export const categoryLabel: Record<string, string> = {
  cafe: "카페",
  food: "식당",
  shop: "쇼핑",
  spot: "명소",
  stay: "숙소"
};

export const savedPlaceTabs = [
  { label: "오타루", areas: ["오타루"] },
  { label: "비에이 및 후라노", areas: ["비에이·후라노"] },
  { label: "조잔케이", areas: ["조잔케이"] },
  { label: "삿포로 시내", areas: ["삿포로"] },
  { label: "그밖에 (공항 포함)", areas: ["신치토세"] }
].map(tab => ({
  ...tab,
  places: places.filter(place => tab.areas.includes(place.area))
}));

export const placeImageUrl = (place: Place) => place.imagePath
  ? `${import.meta.env.BASE_URL}${place.imagePath}`
  : null;

export const ratingDetails = (place: Place) => {
  const entries = [
    { name: "성호", value: place.seonghoRating },
    { name: "세인", value: place.seinRating }
  ];
  const ratedEntries = entries.filter(entry => entry.value > 0);

  if (!ratedEntries.length) {
    return {
      value: null,
      label: "아직 평가 없음",
      ariaLabel: "성호 미평가, 세인 미평가"
    };
  }

  if (ratedEntries.length === 1) {
    const [entry] = ratedEntries;
    return {
      value: entry.value,
      label: `${entry.name} 평가 ${entry.value.toFixed(1)}`,
      ariaLabel: `${entry.name} ${entry.value.toFixed(1)}점, 다른 여행자는 미평가, 5점 만점`
    };
  }

  const average = ratedEntries.reduce((total, entry) => total + entry.value, 0) / ratedEntries.length;
  return {
    value: average,
    label: `평균 ${average.toFixed(1)}`,
    ariaLabel: `성호 ${place.seonghoRating.toFixed(1)}점, 세인 ${place.seinRating.toFixed(1)}점, 평균 ${average.toFixed(1)}점, 5점 만점`
  };
};

export const opinionRating = (rating: number) => rating > 0
  ? `${rating.toFixed(1)} / 5.0`
  : "미평가";

export const itineraryFit = (place: Place) => {
  const day = days[place.day - 1];
  const purpose: Record<string, string> = {
    food: "식사",
    cafe: "휴식",
    shop: "쇼핑",
    spot: "산책·관람",
    stay: "숙소 체류"
  };
  const status = place.isSelected
    ? "현재 일정에 실제로 넣어 둔 선택지"
    : place.isReserve
      ? "시간과 컨디션이 맞을 때 꺼내 볼 예비 후보"
      : "하루 동선의 기준점으로 저장한 장소";

  return `DAY ${place.day} ${day.title}는 ${day.flow} 순서로 움직이는 날입니다. ${place.name}은(는) ${status}예요. ${purpose[place.category]}에 시간을 쓸지, 같은 동선의 다른 후보로 바꿀지는 당일 이동 속도와 대기 상황을 보고 정하면 됩니다.`;
};
