type ChecklistScreenProps = {
  showMaybe: boolean;
};

export function ChecklistScreen({ showMaybe }: ChecklistScreenProps) {
  return <section className="checklist">
    <p className="section-label">NEXT TO DO</p>
    <h2>출발 전, 남은 네 가지.</h2>
    <ol>
      <li>OneStay 에어비앤비 사전체크인</li>
      {showMaybe && <li className="pending">11월 22일 비에이 버스투어 예약</li>}
      <li>조잔케이 복귀버스 정확한 승차장 확인</li>
      <li>여행자보험·eSIM 및 직전 날씨 확인</li>
    </ol>
    <p className="checklist-note">운항·행사·날씨처럼 바뀔 수 있는 정보는 출발 직전에 공식 안내로 다시 확인합니다.</p>
  </section>;
}
