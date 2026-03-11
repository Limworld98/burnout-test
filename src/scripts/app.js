import { QUESTIONS } from "./data.js";
import { calculateBurnoutPercent, getResultType, getTotalScore } from "./logic.js";

const views = {
  start: document.getElementById("start-view"),
  quiz: document.getElementById("quiz-view"),
  loading: document.getElementById("loading-view"),
  result: document.getElementById("result-view")
};

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const optionButtons = Array.from(document.querySelectorAll(".btn-option"));

const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const quizMidAd = document.getElementById("quiz-mid-ad");
const landingImage = document.getElementById("landing-image");
const loadingBarFill = document.getElementById("loading-bar-fill");

const resultIndex = document.getElementById("result-index");
const resultType = document.getElementById("result-type");
const resultMeme = document.getElementById("result-meme");
const resultDesc = document.getElementById("result-desc");
const resultImage = document.getElementById("result-image");

const shareBtn = document.getElementById("share-btn");
const feedback = document.getElementById("feedback");

const metaOgTitle = document.getElementById("meta-og-title");
const metaOgDescription = document.getElementById("meta-og-description");
const metaOgImage = document.getElementById("meta-og-image");
const metaTwitterTitle = document.getElementById("meta-twitter-title");
const metaTwitterDescription = document.getElementById("meta-twitter-description");
const metaTwitterImage = document.getElementById("meta-twitter-image");

let currentQuestionIndex = 0;
let answers = [];
let lastShareText = "";
let lastShareUrl = window.location.href;
let lastShareImageUrl = LANDING_META.image;
let lastResultScore = null;
let isAdvancing = false;

const LANDING_META = {
  title: "지금 내 번아웃 지수는?",
  description: "10문항 30초. 넌 몇 % 나옴?",
  image: "/images/landing.png"
};

function showView(name) {
  Object.values(views).forEach((view) => view.classList.remove("is-visible"));
  views[name].classList.add("is-visible");
}

function setMetaTags({ title, description, image }) {
  document.title = title;

  if (metaOgTitle) {
    metaOgTitle.setAttribute("content", title);
  }

  if (metaOgDescription) {
    metaOgDescription.setAttribute("content", description);
  }

  if (metaOgImage) {
    metaOgImage.setAttribute("content", image);
  }

  if (metaTwitterTitle) {
    metaTwitterTitle.setAttribute("content", title);
  }

  if (metaTwitterDescription) {
    metaTwitterDescription.setAttribute("content", description);
  }

  if (metaTwitterImage) {
    metaTwitterImage.setAttribute("content", image);
  }
}

function getResultShareUrl(totalScore) {
  const url = new URL(window.location.href);
  url.searchParams.set("s", String(totalScore));
  return url.toString();
}

function updateQuizMidAd() {
  const showAd = currentQuestionIndex >= 3 && currentQuestionIndex <= 4;
  quizMidAd.classList.toggle("is-visible", showAd);
}

function renderQuestion() {
  const current = currentQuestionIndex + 1;
  const total = QUESTIONS.length;
  const progress = (currentQuestionIndex / total) * 100;

  progressText.textContent = `${current} / ${total}`;
  progressBar.style.width = `${Math.max(10, progress)}%`;
  questionText.textContent = QUESTIONS[currentQuestionIndex];
  updateQuizMidAd();
}

function getShareText(indexPercent, typeName) {
  return `내 번아웃 지수 ${indexPercent}% (${typeName}) ㅋㅋ 너는 몇 %?`;
}

function getShareLandingUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  return url.toString();
}

function getImageExtension(imageUrl, mimeType) {
  if (mimeType === "image/jpeg") {
    return "jpg";
  }

  if (mimeType === "image/webp") {
    return "webp";
  }

  if (mimeType === "image/gif") {
    return "gif";
  }

  const pathname = new URL(imageUrl, window.location.origin).pathname;
  const matchedExtension = pathname.match(/\.([a-zA-Z0-9]+)$/);
  return matchedExtension?.[1] || "png";
}

async function createShareImageFile() {
  if (!lastShareImageUrl || !lastResultScore) {
    return null;
  }

  const response = await fetch(lastShareImageUrl, { cache: "no-cache" });

  if (!response.ok) {
    throw new Error("share-image-fetch-failed");
  }

  const blob = await response.blob();
  const extension = getImageExtension(lastShareImageUrl, blob.type);

  return new File([blob], `burnout-${lastResultScore}.${extension}`, {
    type: blob.type || `image/${extension}`,
    lastModified: Date.now()
  });
}

function showFeedback(message, isError = false) {
  feedback.textContent = message;
  feedback.classList.toggle("error", isError);

  window.clearTimeout(showFeedback.timer);
  showFeedback.timer = window.setTimeout(() => {
    feedback.textContent = "";
    feedback.classList.remove("error");
  }, 2000);
}
showFeedback.timer = 0;

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function clearOptionSelectionState() {
  optionButtons.forEach((button) => {
    button.classList.remove("is-selected");
    button.disabled = false;
  });
}

function startLoadingAnimation() {
  if (!loadingBarFill) {
    return;
  }

  loadingBarFill.classList.remove("is-running");
  void loadingBarFill.offsetWidth;
  loadingBarFill.classList.add("is-running");
}

async function copyToClipboard(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showFeedback(successMessage);
  } catch (error) {
    showFeedback("복사에 실패했습니다. 다시 시도해 주세요.", true);
  }
}

async function finishQuiz() {
  const totalScore = getTotalScore(answers);
  showView("loading");
  startLoadingAnimation();
  await wait(1500);
  renderResult(totalScore, true);
}

function renderResult(totalScore, updateUrl = false) {
  const percent = calculateBurnoutPercent(totalScore);
  const matched = getResultType(totalScore);
  const shareUrl = getResultShareUrl(totalScore);
  const resultOgImage = matched.shareImage || LANDING_META.image;
  const resultOgTitle = `내 번아웃 지수는 ${percent}%`;
  const resultOgDescription = `${matched.type} 단계 ㅋㅋ 너는 몇 %?`;

  if (resultImage) {
    resultImage.src = matched.shareImage || LANDING_META.image;
    resultImage.alt = `${matched.type} 결과 이미지`;
  }

  resultIndex.textContent = `${percent}%`;
  resultType.textContent = matched.type;
  resultMeme.textContent = matched.memeLine;
  resultDesc.textContent = matched.description;
  lastShareUrl = shareUrl;
  lastShareText = getShareText(percent, matched.type);
  lastShareImageUrl = resultOgImage;
  lastResultScore = totalScore;

  setMetaTags({
    title: resultOgTitle,
    description: resultOgDescription,
    image: resultOgImage
  });

  if (updateUrl) {
    window.history.replaceState({}, "", shareUrl);
  }

  showView("result");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function handleSelectScore(score, selectedButton) {
  if (isAdvancing) {
    return;
  }

  isAdvancing = true;
  answers.push(score);

  clearOptionSelectionState();
  selectedButton.classList.add("is-selected");
  optionButtons.forEach((button) => {
    button.disabled = true;
  });

  questionText.classList.remove("is-entering");
  questionText.classList.add("is-leaving");
  await wait(150);

  if (currentQuestionIndex >= QUESTIONS.length - 1) {
    clearOptionSelectionState();
    questionText.classList.remove("is-leaving");
    await finishQuiz();
    isAdvancing = false;
    return;
  }

  currentQuestionIndex += 1;
  renderQuestion();

  questionText.classList.remove("is-leaving");
  questionText.classList.add("is-entering");
  await wait(190);
  questionText.classList.remove("is-entering");
  clearOptionSelectionState();
  isAdvancing = false;
}

function startQuiz() {
  currentQuestionIndex = 0;
  answers = [];
  lastShareText = "";
  lastShareUrl = getShareLandingUrl();
  lastShareImageUrl = LANDING_META.image;
  lastResultScore = null;
  window.history.replaceState({}, "", window.location.pathname);
  setMetaTags(LANDING_META);
  renderQuestion();
  showView("quiz");
}

function restartQuiz() {
  startQuiz();
}

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

optionButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const score = Number(button.dataset.score);
    await handleSelectScore(score, button);
  });
});

shareBtn.addEventListener("click", async () => {
  const shareUrl = lastShareUrl || getShareLandingUrl();
  const sharePayload = {
    title: "지금 내 번아웃 지수는?",
    text: lastShareText || "내 번아웃 지수 테스트 해봤어 ㅋㅋ 너는 몇 %야?",
    url: shareUrl
  };

  if (navigator.share) {
    try {
      const shareImageFile = await createShareImageFile().catch(() => null);

      if (shareImageFile && navigator.canShare?.({ files: [shareImageFile] })) {
        await navigator.share({
          ...sharePayload,
          files: [shareImageFile]
        });
        return;
      }

      await navigator.share(sharePayload);
      return;
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }
    }
  }

  await copyToClipboard(`${sharePayload.text}\n${sharePayload.url}`, "공유 기능을 열 수 없어 문구+링크를 복사했어요.");
});

function initFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const scoreParam = Number(params.get("s"));

  if (Number.isInteger(scoreParam) && scoreParam >= 10 && scoreParam <= 50) {
    renderResult(scoreParam, false);
    return;
  }

  setMetaTags(LANDING_META);

  if (landingImage) {
    landingImage.src = LANDING_META.image;
  }
}

initFromQuery();
