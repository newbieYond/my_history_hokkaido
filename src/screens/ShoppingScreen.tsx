import { shops } from "../data/itinerary";

export function ShoppingScreen() {
  return <section className="shopping">
    <div className="shop-title">
      <p className="section-label">SOUVENIR EDIT</p>
      <h2>좋아하는 사람에게<br /><em>홋카이도를 담아.</em></h2>
      <p>시내에서 특별한 선물을 먼저 고르고, 공항에서 회사용 대량 과자를 마무리하는 순서가 가장 편하다.</p>
    </div>
    <div className="shop-list">
      {shops.map(([name, description, picks], index) => <article key={name}>
        <span>0{index + 1}</span>
        <div><h3>{name}</h3><p>{description}</p></div>
        <strong>{picks}</strong>
      </article>)}
    </div>
  </section>;
}
