export const QUESTIONS = [
  "출근 전, 알람을 끄고 ‘아…’라는 소리가 먼저 나온다.",
  "상사의 말투가 머릿속에서 자동 재생된다.",
  "회사 메신저 알림 소리만 들어도 심장이 쿵한다.",
  "월급날에도 딱히 기쁘지 않다.",
  "주말이 3시간처럼 지나간다.",
  "‘나 여기 왜 다니지?’라는 생각을 한 달에 3번 이상 한다.",
  "점심시간이 하루 중 유일한 행복이다.",
  "퇴사 브이로그를 본 적이 있다.",
  "이직 공고를 저장해 둔 적이 있다.",
  "회사 사람들과 카톡을 주말에 보기 싫다."
];

export const RESULT_TYPES = [
  {
    minPercent: 0,
    maxPercent: 15,
    type: "새싹 직장인",
    memeLine: "아직 회사의 쓴맛을 모르는 반짝 모드 🌱",
    description: "신입의 패기를 보여주고 있어요. 열정적이고 회사일을 즐기며 에너지가 살아 있습니다.",
    shareImage: "/images/results/step_1.png"
  },
  {
    minPercent: 16,
    maxPercent: 30,
    type: "카페인 단계",
    memeLine: "커피 한잔이면 아직은 버틸 만한 직장인 ☕",
    description: "커피 한잔으로 적당히 기분 좋게 일할 수 있어요. 피곤하지만 아직 다닐 만하고, 월요일이 싫어도 참을 수 있는 상태입니다.",
    shareImage: "/images/results/step_2.png"
  },
  {
    minPercent: 31,
    maxPercent: 45,
    type: "의심 구간",
    memeLine: "퇴사 글은 왜 이렇게 끝까지 읽게 될까 👀",
    description: "가끔 퇴사를 상상해보지만 맡은 일은 능숙하게 해결할 수 있어요. \"나 여기 왜 다니지?\"를 생각해본 적 있고, 퇴사 글을 보면 괜히 끝까지 읽게 됩니다.",
    shareImage: "/images/results/step_3.png"
  },
  {
    minPercent: 46,
    maxPercent: 57,
    type: "퇴사 반누름",
    memeLine: "퇴사 버튼 위에 손가락이 이미 올라가 있음 🫠",
    description: "반쯤 퇴사를 고민하는 상태예요. 이직 공고를 저장해본 적이 있고 퇴근이 너무 기다려지며, 월요일이 유난히 버겁게 느껴집니다.",
    shareImage: "/images/results/step_4.png"
  },
  {
    minPercent: 58,
    maxPercent: 74,
    type: "마음은 퇴사",
    memeLine: "몸만 출근 중, 마음은 이미 퇴사 처리 완료 🫥",
    description: "몸만 출근 중인 상태예요. 남은 휴가를 계산하는 게 취미가 되고, 회사 단톡방 알림만 떠도 스트레스를 받습니다.",
    shareImage: "/images/results/step_5.png"
  },
  {
    minPercent: 75,
    maxPercent: 84,
    type: "정서적 이혼",
    memeLine: "애정은 로그아웃, 급여 알림만 로그인 상태 💸",
    description: "업무에 감정이 실리지 않고 회사에 대한 애정이 거의 없는 상태예요. 최소한의 에너지로만 버티고 있습니다.",
    shareImage: "/images/results/step_6.png"
  },
  {
    minPercent: 85,
    maxPercent: 93,
    type: "퇴사 3초 전",
    memeLine: "사직서 제출 장면을 머릿속에서 N회차 재생 중 ⏳",
    description: "퇴사 후 무엇을 할지 자주 상상하고, 사직서를 내는 모습을 구체적으로 떠올려보는 단계입니다.",
    shareImage: "/images/results/step_7.png"
  },
  {
    minPercent: 94,
    maxPercent: 100,
    type: "퇴사 엔딩 확정형",
    memeLine: "퇴사 후 계획표와 프로필 업데이트까지 끝난 상태 ✅",
    description: "퇴사 후 계획이 이미 정리되어 있고 LinkedIn 프로필 업데이트까지 마친 단계입니다. 실행만 남았어요.",
    shareImage: "/images/results/step_8.png"
  }
];
