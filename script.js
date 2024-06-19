function analyzeLyrics() {
  const lyrics = document.getElementById('lyricsInput').value;

  // 욕설 검사 및 배제
  if (detectProfanity(lyrics)) {
      alert("욕설이 포함되어 있습니다. 다시 입력해주세요.");
      return;
  }

  // 기본 점수 계산
  const wordCountScore = calculateWordCountScore(lyrics);
  const rhymeDiversityScore = calculateRhymeDiversityScore(lyrics);
  const rhythmConsistencyScore = calculateRhythmConsistencyScore(lyrics);
  const languageDiversityScore = calculateLanguageDiversityScore(lyrics);
  const sentimentScore = calculateSentimentScore(lyrics);

  // 총 점수 계산
  const totalScore = calculateTotalScore(wordCountScore, rhymeDiversityScore, rhythmConsistencyScore, languageDiversityScore, sentimentScore);

  // 결과 출력
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
      <h3>분석 결과</h3>
      <p>총 점수: ${totalScore.toFixed(2)}</p>
      <button onclick="toggleDetails()">세부 정보 보기</button>
      <div id="details" style="display: none;">
          <p>단어 수 점수: ${wordCountScore.toFixed(2)}</p>
          <p>라임의 다양성 점수: ${rhymeDiversityScore.toFixed(2)}</p>
          <p>리듬의 일관성 점수: ${rhythmConsistencyScore.toFixed(2)}</p>
          <p>언어의 다양성 점수: ${languageDiversityScore.toFixed(2)}</p>
          <p>감정 분석 점수: ${sentimentScore.toFixed(2)}</p>
      </div>
  `;
}

function detectProfanity(lyrics) {
  // 간단한 욕설 검사 로직 
  const profanities = ['시발', '씨발', 'ㅅㅂ','ㅂㅅ','ㅄ','병신','개새끼','시발놈','씨발놈','새끼','놈','ㅗ','엿']; // 실제 욕설 리스트 추가 필요  const lowerCaseLyrics = lyrics.toLowerCase();
  const lowerCaseLyrics = lyrics.toLowerCase();
  for (let profanity of profanities) {
      if (lowerCaseLyrics.includes(profanity)) {
          return true;
      }
  }
  return false;
}

function calculateWordCountScore(lyrics) {
  const wordCount = countWords(lyrics);
  // 예시로 간단하게 점수 계산
  return Math.min(wordCount / 50, 1); // 단어 수가 많을수록 높은 점수
}

function countWords(lyrics) {
  const words = lyrics.split(/\s+/);
  return words.length;
}

function calculateRhymeDiversityScore(lyrics) {
  const words = lyrics.split(/\s+/);
  const lastSyllables = new Set(words.map(word => getEndingSyllable(word)));
  return lastSyllables.size / words.length;
}

function getEndingSyllable(word) {
  return word.slice(-1); // 단어의 끝 음절을 추출하는 함수 (간단 예시)
}

function calculateRhythmConsistencyScore(lyrics) {
  const lines = lyrics.split('\n');
  const lineLengths = lines.map(line => line.length);
  const stdDev = standardDeviation(lineLengths);
  return 1 / (1 + stdDev);
}

function standardDeviation(values) {
  const avg = average(values);
  const squareDiffs = values.map(value => Math.pow(value - avg, 2));
  const avgSquareDiff = average(squareDiffs);
  return Math.sqrt(avgSquareDiff);
}

function average(values) {
  const sum = values.reduce((total, value) => total + value, 0);
  return sum / values.length;
}

function calculateLanguageDiversityScore(lyrics) {
  const words = lyrics.split(/\s+/);
  const uniqueWords = new Set(words);
  return uniqueWords.size / words.length;
}

function calculateSentimentScore(lyrics) {
  // 감정 분석 로직 추가 예정
  // 여기서는 간단하게 평균 긍정도를 계산하는 예시를 들겠습니다.
  const sentimentScore = calculateAverageSentiment(lyrics);
  return sentimentScore;
}

function calculateAverageSentiment(lyrics) {
  // 간단한 감정 분석 로직 
  // 실제로는 감정 사전이나 머신러닝 모델을 사용해야 정확합니다.
  const positiveWords = ['행복', '즐거움', '사랑','슬픔','이별','눈물','웃음']; // 긍정적인 단어 리스트 예시
  const words = lyrics.split(/\s+/);
  let totalSentiment = 0;
  let validWordsCount = 0;

  words.forEach(word => {
      if (positiveWords.includes(word)) {
          totalSentiment += 1; // 긍정적 단어 발견 시 점수 증가
      }
      validWordsCount++;
  });

  // 단어 수에 대한 평균 긍정도 계산
  return totalSentiment / validWordsCount;
}

function calculateTotalScore(wordCountScore, rhymeDiversityScore, rhythmConsistencyScore, languageDiversityScore, sentimentScore) {
  // 각 점수에 가중치를 부여하여 총 점수 계산
  const totalScore = (wordCountScore * 0.3) + (rhymeDiversityScore * 0.2) + (rhythmConsistencyScore * 0.2) + (languageDiversityScore * 0.2) + (sentimentScore * 0.1);
  return totalScore;
}

function toggleDetails() {
  const detailsDiv = document.getElementById('details');
  if (detailsDiv.style.display === 'none') {
      detailsDiv.style.display = 'block';
  } else {
      detailsDiv.style.display = 'none';
  }
}
