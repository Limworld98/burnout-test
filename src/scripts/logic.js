import { RESULT_TYPES } from "./data.js";

export function calculateBurnoutPercent(totalScore) {
  const percent = ((totalScore - 10) / 40) * 100;
  return Math.round(Math.min(100, Math.max(0, percent)));
}

export function getResultType(totalScore) {
  const percent = calculateBurnoutPercent(totalScore);
  const found = RESULT_TYPES.find(
    (item) => percent >= item.minPercent && percent <= item.maxPercent
  );

  if (found) {
    return found;
  }

  return {
    minPercent: 0,
    maxPercent: 15,
    type: "새싹 직장인",
    memeLine: "결과를 불러오는 중 숨 고르기 😮‍💨",
    description: "결과를 찾지 못했습니다. 다시 테스트해 주세요.",
    shareImage: ""
  };
}

export function getTotalScore(scores) {
  return scores.reduce((sum, value) => sum + value, 0);
}
