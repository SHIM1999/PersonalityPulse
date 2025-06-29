import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

export const translations = {
  ko: {
    // Landing Page
    landingTitle: "나만의 MBTI 성격 테스트",
    landingSubtitle: "AI 분석과 함께하는 정확한 성격 진단",
    startTest: "테스트 시작하기",
    features: {
      accurate: "정확한 분석",
      accurateDesc: "40개의 정교한 질문으로 더욱 정확한 결과",
      ai: "AI 사진 분석",
      aiDesc: "사진을 통한 추가적인 성격 인사이트",
      detailed: "상세한 리포트",
      detailedDesc: "강점과 성장 영역까지 포함된 완전한 분석",
    },

    skip: "건너뛰기",
    next: "다음",
    back: "이전",

    // Questionnaire
    questionProgress: "질문 진행률",
    howMuch: "얼마나 그렇게 생각하시나요?",
    veryTrue: "매우 그렇다",
    true: "그렇다",
    neutral: "보통",
    false: "아니다",
    veryFalse: "매우 아니다",
    answerComplete: "답변 완료!",
    analyzing: "결과 분석 중...",
    showResults: "결과 보기",

    // Results
    resultsTitle: "당신의 성격 유형",
    dimensions: "성격 차원",
    strengths: "강점",
    growthAreas: "성장 영역",
    shareTitle: "결과 공유하기",
    copyLink: "링크 복사",
    retake: "다시 테스트하기",

    // Language Selector
    selectLanguage: "언어 선택",
    loading: "결과를 불러오는 중...",

    // For Results Page
    resultsForUser: "결과를 확인하세요, {username}님!",
    shareOnTwitterText:
      "저의 MBTI 결과는 {type} - {title}입니다! 당신의 유형도 알아보세요.",

    // Toast Messages
    toastSuccessTitle: "성공",
    toastSuccessDesc: "링크가 클립보드에 복사되었습니다.",
    toastErrorTitle: "오류",
    toastErrorDesc: "링크 복사에 실패했습니다.",
    toastWipTitle: "준비 중",
    toastWipDesc: "PDF 리포트 다운로드 기능은 곧 제공될 예정입니다.",

    // Personality Dimensions (These are used on the Results Page)
    introversion: "내향 (I)",
    extroversion: "외향 (E)",
    sensing: "감각 (S)",
    intuition: "직관 (N)",
    thinking: "사고 (T)",
    feeling: "감정 (F)",
    judging: "판단 (J)",
    perceiving: "인식 (P)",

    // Buttons
    downloadReport: "상세 리포트 다운로드",
    actions: "액션",
    enterName: "이름을 입력하세요",
    nameRequired: "이름을 입력하세요",

    questions: [
      {
        id: 1,
        dimension: "EI",
        text: "새로운 사람들과 만나는 파티에 참석하게 되었을 때, 당신은 어떻게 행동하나요?",
        optionA: "즉시 다양한 사람들에게 다가가 적극적으로 대화를 시작한다",
        optionB: "주로 아는 몇 명의 사람들과 깊은 대화를 나눈다",
      },
      {
        id: 2,
        dimension: "SN",
        text: "새로운 프로젝트를 시작할 때, 당신의 접근 방식은?",
        optionA: "전체적인 큰 그림과 가능성을 먼저 고려한다",
        optionB: "구체적인 세부사항과 현실적 요소를 먼저 파악한다",
      },
      {
        id: 3,
        dimension: "TF",
        text: "중요한 결정을 내릴 때, 당신은 주로 무엇을 더 고려하나요?",
        optionA: "논리와 객관적인 데이터를 기반으로 결정한다",
        optionB: "타인의 감정과 관계에 미치는 영향을 우선으로 한다",
      },
      {
        id: 4,
        dimension: "JP",
        text: "일정 관리에 대한 당신의 스타일은?",
        optionA: "미리 계획을 세우고 일정에 맞춰 진행한다",
        optionB: "상황에 따라 유연하게 조정하며 진행한다",
      },
      {
        id: 5,
        dimension: "EI",
        text: "스트레스를 받을 때, 당신은 어떻게 에너지를 회복하나요?",
        optionA: "친구들과 만나서 이야기하고 활동적으로 시간을 보낸다",
        optionB: "혼자만의 시간을 가지며 조용히 휴식을 취한다",
      },
      {
        id: 6,
        dimension: "SN",
        text: "새로운 아이디어나 개념을 받아들일 때, 당신은?",
        optionA: "그것이 가져올 미래의 가능성에 흥미를 느낀다",
        optionB: "현재 상황에서의 실용성을 먼저 고려한다",
      },
      {
        id: 7,
        dimension: "TF",
        text: "문제 해결 시, 당신이 더 중요하게 생각하는 것은?",
        optionA: "효율성과 합리성",
        optionB: "조화와 사람들의 감정",
      },
      {
        id: 8,
        dimension: "JP",
        text: "업무나 과제를 진행할 때, 당신의 방식은?",
        optionA: "마감일을 정하고 체계적으로 완료한다",
        optionB: "영감이 올 때 집중적으로 진행한다",
      },
      {
        id: 9,
        dimension: "EI",
        text: "그룹 토론에서 당신의 역할은?",
        optionA: "적극적으로 의견을 제시하고 토론을 이끈다",
        optionB: "신중하게 듣고 필요할 때 의견을 말한다",
      },
      {
        id: 10,
        dimension: "SN",
        text: "정보를 습득할 때, 당신이 선호하는 방식은?",
        optionA: "개념과 이론, 전체적인 맥락을 통해 이해한다",
        optionB: "구체적인 사실과 예시를 통해 이해한다",
      },
      {
        id: 11,
        dimension: "TF",
        text: "갈등 상황에서 당신의 우선순위는?",
        optionA: "공정하고 논리적인 해결책 찾기",
        optionB: "관련된 모든 사람의 감정 고려하기",
      },
      {
        id: 12,
        dimension: "JP",
        text: "여행 계획을 세울 때, 당신의 스타일은?",
        optionA: "상세한 일정과 예약을 미리 완료한다",
        optionB: "대략적인 방향만 정하고 현지에서 즉흥적으로 결정한다",
      },
      {
        id: 13,
        dimension: "EI",
        text: "팀 프로젝트에서 당신의 선호하는 역할은?",
        optionA: "팀원들과 아이디어를 공유하며 함께 협력한다",
        optionB: "개별적으로 맡은 부분을 깊이 있게 연구한다",
      },
      {
        id: 14,
        dimension: "SN",
        text: "새로운 환경에 적응할 때, 당신은?",
        optionA: "변화의 가능성과 새로운 기회에 흥미를 느낀다",
        optionB: "기존의 경험과 방법을 활용해 안정적으로 적응한다",
      },
      {
        id: 15,
        dimension: "TF",
        text: "문제를 해결할 때, 당신이 먼저 고려하는 것은?",
        optionA: "가장 논리적이고 효율적인 해결책은 무엇인지",
        optionB: "이 결정이 다른 사람들에게 어떤 영향을 미칠지",
      },
      {
        id: 16,
        dimension: "JP",
        text: "약속이나 계획에 대한 당신의 태도는?",
        optionA: "정해진 시간과 약속을 철저히 지킨다",
        optionB: "상황에 따라 유연하게 조정할 수 있다고 생각한다",
      },
      {
        id: 17,
        dimension: "EI",
        text: "친구들과 시간을 보낼 때, 당신은?",
        optionA: "다양한 사람들과 활발하게 어울리는 것을 좋아한다",
        optionB: "소수의 가까운 친구들과 깊은 대화를 나누는 것을 선호한다",
      },
      {
        id: 18,
        dimension: "SN",
        text: "학습할 때, 당신이 선호하는 방식은?",
        optionA: "전체적인 개념을 이해한 후 세부사항을 파악한다",
        optionB: "구체적인 예시와 사실부터 차근차근 학습한다",
      },
      {
        id: 19,
        dimension: "TF",
        text: "갈등이 생겼을 때, 당신의 우선순위는?",
        optionA: "객관적 사실에 기반해 공정하게 판단하기",
        optionB: "모든 사람이 상처받지 않도록 배려하며 해결하기",
      },
      {
        id: 20,
        dimension: "JP",
        text: "주말 계획을 세울 때, 당신은?",
        optionA: "미리 계획을 세우고 예약까지 완료한다",
        optionB: "그때그때 기분에 따라 결정하는 편이다",
      },
      {
        id: 21,
        dimension: "EI",
        text: "회의나 토론에서 당신의 스타일은?",
        optionA: "즉석에서 아이디어를 공유하며 활발히 참여한다",
        optionB: "충분히 생각한 후 신중하게 발언한다",
      },
      {
        id: 22,
        dimension: "SN",
        text: "책을 읽거나 영화를 볼 때, 당신이 끌리는 것은?",
        optionA: "상상력이 풍부하고 창의적인 판타지나 SF",
        optionB: "현실적이고 실용적인 정보나 다큐멘터리",
      },
      {
        id: 23,
        dimension: "TF",
        text: "친구가 고민을 털어놓을 때, 당신은?",
        optionA: "문제의 원인을 분석하고 해결책을 제시한다",
        optionB: "그 사람의 마음을 공감하고 위로해준다",
      },
      {
        id: 24,
        dimension: "JP",
        text: "새로운 취미를 시작할 때, 당신은?",
        optionA: "체계적으로 계획을 세우고 단계별로 진행한다",
        optionB: "일단 시작해보고 진행하면서 방향을 정한다",
      },
      {
        id: 25,
        dimension: "EI",
        text: "업무 환경에 대해, 당신은 어떤 환경에서 더 집중이 잘 되나요?",
        optionA: "동료들과 소통할 수 있는 개방적인 환경",
        optionB: "방해받지 않고 혼자 집중할 수 있는 조용한 환경",
      },
      {
        id: 26,
        dimension: "SN",
        text: "추상적인 이론에 대한 당신의 생각은?",
        optionA: "미래를 예측하고 이해하는 데 도움이 되어 흥미롭다",
        optionB: "실생활에 바로 적용하기 어려워 별로 흥미가 없다",
      },
      {
        id: 27,
        dimension: "TF",
        text: "피드백을 줄 때, 당신의 방식은?",
        optionA: "솔직하고 직설적으로 개선점을 이야기한다",
        optionB: "상대방의 기분을 고려하여 부드럽고 긍정적으로 전달한다",
      },
      {
        id: 28,
        dimension: "JP",
        text: "일상 생활에서 당신은 어떤가요?",
        optionA: "일정한 루틴을 가지고 예측 가능하게 생활한다",
        optionB: "정해진 틀 없이 즉흥적이고 자유롭게 생활한다",
      },
      {
        id: 29,
        dimension: "EI",
        text: "긴 하루 일과를 마친 후, 당신은 어떻게 시간을 보내고 싶나요?",
        optionA: "에너지가 넘치므로 친구들을 만나거나 모임에 참여한다",
        optionB: "에너지가 소진되어 혼자 조용히 재충전하는 시간이 필요하다",
      },
      {
        id: 30,
        dimension: "SN",
        text: "무언가를 배울 때, 어떤 방식이 더 효과적인가요?",
        optionA: "왜 그런지 원리와 개념을 먼저 이해하는 것",
        optionB: "어떻게 하는지 구체적인 방법을 단계별로 배우는 것",
      },
      {
        id: 31,
        dimension: "TF",
        text: "그룹을 위해 결정을 내려야 할 때, 무엇을 더 중요하게 생각하나요?",
        optionA: "가장 합리적이고 공정한 결과",
        optionB: "그룹의 화합과 모든 구성원의 만족",
      },
      {
        id: 32,
        dimension: "JP",
        text: "갑작스러운 변화가 생겼을 때, 당신의 반응은?",
        optionA: "계획이 틀어지는 것에 스트레스를 받는다",
        optionB: "새로운 가능성으로 보고 흥미를 느낀다",
      },
      {
        id: 33,
        dimension: "EI",
        text: "당신이 대화를 주도하는 방식은?",
        optionA: "다양한 주제에 대해 넓게 이야기하는 것을 즐긴다",
        optionB: "관심 있는 특정 주제에 대해 깊게 파고드는 것을 선호한다",
      },
      {
        id: 34,
        dimension: "SN",
        text: "지시를 따를 때, 당신은 어떤 방식을 선호하나요?",
        optionA: "명확하고 구체적인 단계별 지침을 받는 것",
        optionB: "최종 목표만 듣고 자신만의 방식으로 해결하는 것",
      },
      {
        id: 35,
        dimension: "TF",
        text: "다른 사람의 강한 감정 표현을 마주했을 때, 당신은?",
        optionA: "객관성을 유지하며 논리적으로 상황을 파악하려 한다",
        optionB: "그 사람의 감정에 깊이 공감하며 감정적으로 지원한다",
      },
      {
        id: 36,
        dimension: "JP",
        text: "당신의 작업 공간(책상 등)은 어떤 상태인가요?",
        optionA: "항상 깔끔하고 체계적으로 정돈되어 있다",
        optionB: "필요한 물건들이 손에 닿는 곳에 있지만 다소 어수선하다",
      },
      {
        id: 37,
        dimension: "EI",
        text: "처음 만나는 사람에게 당신은 어떤 사람으로 보이나요?",
        optionA: "개방적이고 다가가기 쉬운 사람",
        optionB: "차분하고 신중하며 다소 내성적인 사람",
      },
      {
        id: 38,
        dimension: "SN",
        text: "브레인스토밍을 할 때, 당신의 역할은?",
        optionA: "기존 아이디어를 현실적으로 다듬고 발전시킨다",
        optionB: "독창적이고 기발한, 새로운 아이디어를 제시한다",
      },
      {
        id: 39,
        dimension: "TF",
        text: "성공을 평가할 때, 당신에게 더 중요한 기준은 무엇인가요?",
        optionA: "설정한 목표를 달성했는지 여부와 객관적인 성과",
        optionB: "과정을 통해 얼마나 성장하고 만족했는지 여부",
      },
      {
        id: 40,
        dimension: "JP",
        text: "결정을 내리는 속도는 어떤 편인가요?",
        optionA: "가능한 한 빨리 결론을 내리고 다음 단계로 넘어간다",
        optionB: "모든 가능성을 열어두고 마지막 순간까지 고민한다",
      },
    ],
  },

  en: {
    // Landing Page
    landingTitle: "Your Personal MBTI Test",
    landingSubtitle: "Accurate personality assessment with AI analysis",
    startTest: "Start Test",
    features: {
      accurate: "Accurate Analysis",
      accurateDesc: "More precise results with 40 refined questions",
      ai: "AI Photo Analysis",
      aiDesc: "Additional personality insights through photos",
      detailed: "Detailed Report",
      detailedDesc: "Complete analysis including strengths and growth areas",
    },

    skip: "Skip",
    next: "Next",
    back: "Back",

    // Questionnaire
    questionProgress: "Question Progress",
    howMuch: "How much do you agree?",
    veryTrue: "Strongly Agree",
    true: "Agree",
    neutral: "Neutral",
    false: "Disagree",
    veryFalse: "Strongly Disagree",
    answerComplete: "Answer Complete!",
    analyzing: "Analyzing results...",
    showResults: "Show Results",

    // Results
    resultsTitle: "Your Personality Type",
    dimensions: "Personality Dimensions",
    strengths: "Strengths",
    growthAreas: "Growth Areas",
    shareTitle: "Share Results",
    copyLink: "Copy Link",
    retake: "Retake Test",

    // Language Selector
    selectLanguage: "Select Language",
    loading: "Loading results...",

    // For Results Page
    resultsForUser: "Here are your results, {username}!",
    shareOnTwitterText: "My MBTI result is {type} - {title}! Find out yours.",

    // Toast Messages
    toastSuccessTitle: "Success",
    toastSuccessDesc: "The link has been copied to your clipboard.",
    toastErrorTitle: "Error",
    toastErrorDesc: "Failed to copy the link.",
    toastWipTitle: "Coming Soon",
    toastWipDesc: "The PDF report download feature will be available soon.",

    // Personality Dimensions (These are used on the Results Page)
    introversion: "Introversion (I)",
    extroversion: "Extroversion (E)",
    sensing: "Sensing (S)",
    intuition: "Intuition (N)",
    thinking: "Thinking (T)",
    feeling: "Feeling (F)",
    judging: "Judging (J)",
    perceiving: "Perceiving (P)",

    // Buttons
    downloadReport: "Download Detailed Report",
    actions: "Actions",
    enterName: "Enter your name",
    nameRequired: "Please enter your name",

    questions: [
      {
        id: 1,
        dimension: "EI",
        text: "When you go to a party, you:",
        optionA: "Interact with many, including strangers.",
        optionB: "Interact with a few, known people.",
      },
      {
        id: 2,
        dimension: "SN",
        text: "When starting a new project, you first:",
        optionA: "Think about the big picture and possibilities.",
        optionB: "Focus on the concrete details and practicalities.",
      },
      {
        id: 3,
        dimension: "TF",
        text: "When making a decision, you rely more on:",
        optionA: "Logic and objective facts.",
        optionB: "Personal feelings and how others will be affected.",
      },
      {
        id: 4,
        dimension: "JP",
        text: "Your approach to plans is:",
        optionA: "You prefer to have a clear plan and stick to it.",
        optionB: "You prefer to stay flexible and adapt as you go.",
      },
      {
        id: 5,
        dimension: "EI",
        text: "To recharge, you prefer:",
        optionA: "Socializing with a group of friends.",
        optionB: "Spending quiet time alone.",
      },
      {
        id: 6,
        dimension: "SN",
        text: "You are more interested in:",
        optionA: "The potential and future implications of an idea.",
        optionB: "The practical application of an idea.",
      },
      {
        id: 7,
        dimension: "TF",
        text: "In problem-solving, you prioritize:",
        optionA: "Efficiency and what is most logical.",
        optionB: "Harmony and the feelings of the people involved.",
      },
      {
        id: 8,
        dimension: "JP",
        text: "You prefer to work:",
        optionA: "In a structured way, completing tasks by a deadline.",
        optionB: "In bursts of energy as inspiration strikes.",
      },
      {
        id: 9,
        dimension: "EI",
        text: "In a group discussion, you are more likely to:",
        optionA: "Lead the conversation and share your ideas freely.",
        optionB:
          "Listen carefully and speak only when you have something thoughtful to add.",
      },
      {
        id: 10,
        dimension: "SN",
        text: "When learning something new, you prefer to:",
        optionA: "Understand the underlying concepts and theories first.",
        optionB: "Learn through hands-on experience and concrete examples.",
      },
      {
        id: 11,
        dimension: "TF",
        text: "In a conflict, your first instinct is to:",
        optionA: "Find a fair and logical solution.",
        optionB: "Consider everyone's feelings and find a compromise.",
      },
      {
        id: 12,
        dimension: "JP",
        text: "When planning a trip, you are more likely to:",
        optionA: "Have a detailed itinerary and book everything in advance.",
        optionB: "Have a general idea and decide many things spontaneously.",
      },
      {
        id: 13,
        dimension: "EI",
        text: "In a team, you thrive when you can:",
        optionA: "Collaborate and brainstorm with others.",
        optionB: "Focus deeply on your own part of the work.",
      },
      {
        id: 14,
        dimension: "SN",
        text: "When adapting to a new situation, you:",
        optionA: "Get excited by the new possibilities and opportunities.",
        optionB: "Rely on your past experiences and established methods.",
      },
      {
        id: 15,
        dimension: "TF",
        text: "Your first consideration when solving a problem is:",
        optionA: "What is the most efficient and logical solution?",
        optionB: "How will this decision impact the people involved?",
      },
      {
        id: 16,
        dimension: "JP",
        text: "Your attitude towards deadlines is:",
        optionA: "You take them seriously and work steadily towards them.",
        optionB:
          "You see them as a guideline and do your best work under pressure.",
      },
      {
        id: 17,
        dimension: "EI",
        text: "A fun weekend for you involves:",
        optionA: "Lots of activities and social gatherings.",
        optionB: "Relaxing with a few close friends or by yourself.",
      },
      {
        id: 18,
        dimension: "SN",
        text: "You prefer instructors who:",
        optionA: "Present information in a conceptual, big-picture way.",
        optionB:
          "Present information with clear, step-by-step, factual details.",
      },
      {
        id: 19,
        dimension: "TF",
        text: "When a friend is upset, you are more likely to:",
        optionA: "Offer logical solutions to their problem.",
        optionB: "Offer emotional support and empathy.",
      },
      {
        id: 20,
        dimension: "JP",
        text: "When it comes to your weekend:",
        optionA: "You usually have it planned out in advance.",
        optionB: "You often decide what to do as you go.",
      },
      {
        id: 21,
        dimension: "EI",
        text: "In meetings, you tend to be:",
        optionA: "Spontaneous and vocal with your ideas.",
        optionB: "Reserved and thoughtful before you speak.",
      },
      {
        id: 22,
        dimension: "SN",
        text: "You are more drawn to:",
        optionA:
          "Imaginative and theoretical books/movies (e.g., sci-fi, fantasy).",
        optionB:
          "Realistic and practical books/movies (e.g., biographies, documentaries).",
      },
      {
        id: 23,
        dimension: "TF",
        text: "When a friend shares a problem, you first:",
        optionA: "Analyze the problem and suggest solutions.",
        optionB: "Empathize with their feelings and offer comfort.",
      },
      {
        id: 24,
        dimension: "JP",
        text: "When starting a new hobby, you:",
        optionA: "Prefer to follow a structured plan or tutorial.",
        optionB: "Prefer to just dive in and figure it out as you go.",
      },
      {
        id: 25,
        dimension: "EI",
        text: "Regarding your work environment, you focus better in:",
        optionA: "An open, collaborative space with some buzz.",
        optionB: "A quiet, private space with no interruptions.",
      },
      {
        id: 26,
        dimension: "SN",
        text: "Your opinion on abstract theories is that they are:",
        optionA: "Interesting for understanding future possibilities.",
        optionB: "Less interesting if they don't have a direct practical use.",
      },
      {
        id: 27,
        dimension: "TF",
        text: "When giving feedback, you tend to be:",
        optionA: "Direct and honest, focusing on what can be improved.",
        optionB: "Gentle and encouraging, considering the person's feelings.",
      },
      {
        id: 28,
        dimension: "JP",
        text: "In your daily life, you are someone who:",
        optionA: "Follows a predictable routine.",
        optionB: "Prefers spontaneity and freedom from schedules.",
      },
      {
        id: 29,
        dimension: "EI",
        text: "After a long day of work, you prefer to:",
        optionA: "Go out and socialize, as it energizes you.",
        optionB: "Stay in and recharge alone, as you feel drained.",
      },
      {
        id: 30,
        dimension: "SN",
        text: "When learning a new skill, it's more effective for you to:",
        optionA: "First understand the 'why' and the principles behind it.",
        optionB: "First learn the 'how' through step-by-step instructions.",
      },
      {
        id: 31,
        dimension: "TF",
        text: "When making a decision for a group, you prioritize:",
        optionA: "The most logical and fair outcome.",
        optionB: "Group harmony and the satisfaction of its members.",
      },
      {
        id: 32,
        dimension: "JP",
        text: "Your reaction to a sudden, unexpected change is typically:",
        optionA: "Stress, because it disrupts your plan.",
        optionB: "Excitement, because it presents a new possibility.",
      },
      {
        id: 33,
        dimension: "EI",
        text: "In conversations, you prefer to:",
        optionA: "Talk about a wide range of topics.",
        optionB: "Go deep into a few topics that interest you.",
      },
      {
        id: 34,
        dimension: "SN",
        text: "When following instructions, you prefer:",
        optionA: "Clear, detailed, step-by-step guidance.",
        optionB: "Just the end goal, leaving you to figure out the method.",
      },
      {
        id: 35,
        dimension: "TF",
        text: "When faced with someone else's strong emotions, you:",
        optionA:
          "Try to remain objective and understand the situation logically.",
        optionB: "Feel their emotion and offer emotional support.",
      },
      {
        id: 36,
        dimension: "JP",
        text: "Your workspace (desk, office) is usually:",
        optionA: "Neat, organized, and systematically arranged.",
        optionB: "Functionally cluttered, with items within easy reach.",
      },
      {
        id: 37,
        dimension: "EI",
        text: "To a stranger, you might appear as:",
        optionA: "Open and easy to approach.",
        optionB: "Calm, reserved, and thoughtful.",
      },
      {
        id: 38,
        dimension: "SN",
        text: "In a brainstorming session, you are better at:",
        optionA: "Refining existing ideas to make them more realistic.",
        optionB: "Generating wild, out-of-the-box, new ideas.",
      },
      {
        id: 39,
        dimension: "TF",
        text: "When you evaluate your success, what matters more to you?",
        optionA: "Objective achievements and meeting the set goals.",
        optionB: "Personal growth and satisfaction from the process.",
      },
      {
        id: 40,
        dimension: "JP",
        text: "How quickly do you make decisions?",
        optionA: "I try to decide as quickly as possible to move forward.",
        optionB: "I prefer to keep my options open until the last minute.",
      },
    ],
  },

  ja: {
    // Landing Page
    landingTitle: "あなた専用のMBTI性格テスト",
    landingSubtitle: "AI分析による正確な性格診断",
    startTest: "テスト開始",
    features: {
      accurate: "正確な分析",
      accurateDesc: "40の精密な質問でより正確な結果",
      ai: "AI写真分析",
      aiDesc: "写真を通じたes 加的な性格インサイト",
      detailed: "詳細レポート",
      detailedDesc: "強みと成長領域を含む完全な分析",
    },

    skip: "スキップ",
    next: "次へ",
    back: "戻る",

    // Questionnaire
    questionProgress: "質問進捗",
    howMuch: "どの程度そう思いますか？",
    veryTrue: "強くそう思う",
    true: "そう思う",
    neutral: "普通",
    false: "そう思わない",
    veryFalse: "全くそう思わない",
    answerComplete: "回答完了！",
    analyzing: "結果分析中...",
    showResults: "結果を見る",

    // Results
    resultsTitle: "あなたの性格タイプ",
    dimensions: "性格次元",
    strengths: "強み",
    growthAreas: "成長領域",
    shareTitle: "結果をシェア",
    copyLink: "リンクをコピー",
    retake: "再テスト",

    // Language Selector
    selectLanguage: "言語選択",
    loading: "結果を読み込み中...",

    // For Results Page
    resultsForUser: "{username}さんの結果はこちらです！",
    shareOnTwitterText:
      "私のMBTIの結果は{type} - {title}でした！あなたのタイプも調べてみましょう。",

    // Toast Messages
    toastSuccessTitle: "成功",
    toastSuccessDesc: "リンクをクリップボードにコピーしました。",
    toastErrorTitle: "エラー",
    toastErrorDesc: "リンクのコピーに失敗しました。",
    toastWipTitle: "準備中",
    toastWipDesc: "PDFレポートのダウンロード機能は近日公開予定です。",

    // Personality Dimensions (These are used on the Results Page)
    introversion: "内向 (I)",
    extroversion: "外向 (E)",
    sensing: "感覚 (S)",
    intuition: "直観 (N)",
    thinking: "思考 (T)",
    feeling: "感情 (F)",
    judging: "判断 (J)",
    perceiving: "知覚 (P)",

    // Buttons
    downloadReport: "詳細レポートをダウンロード",
    actions: "アクション",
    enterName: "お名前を入力してください",
    nameRequired: "お名前を入力してください",

    questions: [
      {
        id: 1,
        dimension: "EI",
        text: "パーティーに行くとき、あなたは：",
        optionA: "知らない人を含め、多くの人と交流する。",
        optionB: "知っている少数の人々と交流する。",
      },
      {
        id: 2,
        dimension: "SN",
        text: "新しいプロジェクトを始めるとき、まず：",
        optionA: "全体像と可能性について考える。",
        optionB: "具体的な詳細と実用性に焦点を当てる。",
      },
      {
        id: 3,
        dimension: "TF",
        text: "意思決定をするとき、より頼りにするのは：",
        optionA: "論理と客観的な事実。",
        optionB: "個人的な感情と他者への影響。",
      },
      {
        id: 4,
        dimension: "JP",
        text: "計画に対するあなたのアプローチは：",
        optionA: "明確な計画を立て、それに従うことを好む。",
        optionB: "柔軟性を保ち、状況に応じて適応することを好む。",
      },
      {
        id: 5,
        dimension: "EI",
        text: "エネルギーを充電するために、あなたは：",
        optionA: "友人のグループと社交的に過ごす。",
        optionB: "一人で静かな時間を過ごす。",
      },
      {
        id: 6,
        dimension: "SN",
        text: "あなたがより興味を持つのは：",
        optionA: "アイデアの可能性と将来的な意味合い。",
        optionB: "アイデアの実用的な応用。",
      },
      {
        id: 7,
        dimension: "TF",
        text: "問題解決において、あなたが優先するのは：",
        optionA: "効率性と最も論理的なこと。",
        optionB: "調和と関係者の感情。",
      },
      {
        id: 8,
        dimension: "JP",
        text: "あなたはどのような働き方を好みますか：",
        optionA: "構造化された方法で、締め切りまでにタスクを完了する。",
        optionB: "インスピレーションが湧いたときにエネルギーを爆発させる。",
      },
      {
        id: 9,
        dimension: "EI",
        text: "グループディスカッションで、あなたは：",
        optionA: "会話をリードし、自由に意見を共有する。",
        optionB: "注意深く聞き、思慮深いことを言うときだけ話す。",
      },
      {
        id: 10,
        dimension: "SN",
        text: "新しいことを学ぶとき、あなたが好むのは：",
        optionA: "まず根底にある概念と理論を理解する。",
        optionB: "実践的な経験と具体的な例を通して学ぶ。",
      },
      {
        id: 11,
        dimension: "TF",
        text: "対立に直面したとき、あなたの最初の本能は：",
        optionA: "公正で論理的な解決策を見つける。",
        optionB: "全員の感情を考慮し、妥協点を見つける。",
      },
      {
        id: 12,
        dimension: "JP",
        text: "旅行の計画を立てるとき、あなたは：",
        optionA: "詳細な旅程を立て、すべてを事前に予約する。",
        optionB: "大まかなアイデアを持ち、多くのことをそг場で決める。",
      },
      {
        id: 13,
        dimension: "EI",
        text: "チームで働く```とき、あなたが活躍すтのは：",
        optionA: "他の人と協力し、ブレインストーミングする。",
        optionB: "自分の仕事のパートに深く集中する。",
      },
      {
        id: 14,
        dimension: "SN",
        text: "新しい状況に適応するとき、あなたは：",
        optionA: "新しい可能性と機会に興奮する。",
        optionB: "過去の経験と確立された方法に頼る。",
      },
      {
        id: 15,
        dimension: "TF",
        text: "問題を解決するときの最初の考慮事項は：",
        optionA: "最も効率的で論理的な解決策は何か？",
        optionB: "この決定が関係者にどのような影響を与えるか？",
      },
      {
        id: 16,
        dimension: "JP",
        text: "締め切りに対するあなたの態度は：",
        optionA: "真剣に受け止め、着実にそれに向かって働く。",
        optionB: "ガイドラインとみなし、プレッシャーの下で最高の仕事をする。",
      },
      {
        id: 17,
        dimension: "EI",
        text: "あなたにとって楽しい週末とは：",
        optionA: "たくさんの活動と社会的な集まり。",
        optionB: "少数の親しい友人や一人でリラックスすること。",
      },
      {
        id: 18,
        dimension: "SN",
        text: "あなたが好む指導者は：",
        optionA: "概念的で大局的な方法で情報を提示する。",
        optionB: "明確で段階的な事実に基づいた詳細で情報を提示する。",
      },
      {
        id: 19,
        dimension: "TF",
        text: "友人が動揺しているとき、あなたは：",
        optionA: "彼らの問題に対する論理的な解決策を提案する。",
        optionB: "感情的なサポートと共感を提供する。",
      },
      {
        id: 20,
        dimension: "JP",
        text: "週末に関しては：",
        optionA: "通常、事前に計画を立てている。",
        optionB: "しばしば、その場で何をするか決める。",
      },
      {
        id: 21,
        dimension: "EI",
        text: "会議でのあなたの傾向は：",
        optionA: "自発的で、自分のアイデアを声に出す。",
        optionB: "話す前に控えめで思慮深い。",
      },
      {
        id: 22,
        dimension: "SN",
        text: "あなたがより惹かれるのは：",
        optionA: "想像力豊かで理論的な本/映画（SF、ファンタジーなど）。",
        optionB: "現実的で実用的な本/映画（伝記、ドキュメンタリーなど）。",
      },
      {
        id: 23,
        dimension: "TF",
        text: "友人が問題を打ち明けたとき、あなたはまず：",
        optionA: "問題を分析し、解決策を提案する。",
        optionB: "彼らの感情に共感し、慰めを提供する。",
      },
      {
        id: 24,
        dimension: "JP",
        text: "新しい趣味を始めるとき、あなたは：",
        optionA: "構造化された計画やチュートリアルに従うことを好む。",
        optionB: "ただ飛び込んで、やりながら理解していくことを好む。",
      },
      {
        id: 25,
        dimension: "EI",
        text: "職場環境に関して、あなたがより集中できるのは：",
        optionA: "活気のあるオープンで協力的なスペース。",
        optionB: "邪魔の入らない静かでプライベートなスペース。",
      },
      {
        id: 26,
        dimension: "SN",
        text: "抽象的な理論に対するあなたの意見は：",
        optionA: "将来の可能性を理解するのに興味深い。",
        optionB: "直接的な実用性がない場合はあまり興味がない。",
      },
      {
        id: 27,
        dimension: "TF",
        text: "フィードバックをするとき、あなたは：",
        optionA: "改善できる点に焦点を当て、直接的で正直である。",
        optionB: "相手の感情を考慮し、優しく励ます。",
      },
      {
        id: 28,
        dimension: "JP",
        text: "日常生活で、あなたは：",
        optionA: "予測可能なルーチンに従う。",
        optionB: "スケジュールに縛られず、自発性と自由を好む。",
      },
      {
        id: 29,
        dimension: "EI",
        text: "長い一日の仕事の後、あなたは：",
        optionA: "元気づけられるので、外に出て社交的に過ごす。",
        optionB: "消耗しているので、一人で静かに充電する。",
      },
      {
        id: 30,
        dimension: "SN",
        text: "新しいスキルを学ぶとき、あなたにとってより効果的なのは：",
        optionA: "まず「なぜ」とその背後にある原則を理解すること。",
        optionB: "まず段階的な指示で「どのように」を学ぶこと。",
      },
      {
        id: 31,
        dimension: "TF",
        text: "グループのために決定を下すとき、あなたが優先するのは：",
        optionA: "最も論理的で公正な結果。",
        optionB: "グループの調和とそのメンバーの満足。",
      },
      {
        id: 32,
        dimension: "JP",
        text: "突然の予期せぬ変化に対するあなたの典型的な反応は：",
        optionA: "計画が狂うことによるストレス。",
        optionB: "新しい可能性が提示されることによる興奮。",
      },
      {
        id: 33,
        dimension: "EI",
        text: "会話で、あなたが好むのは：",
        optionA: "幅広いトピックについて話すこと。",
        optionB: "興味のあるいくつかのトピックについて深く掘り下げること。",
      },
      {
        id: 34,
        dimension: "SN",
        text: "指示に従うとき、あなたが好むのは：",
        optionA: "明確で詳細な段階的なガイダンス。",
        optionB: "最終目標だけを伝えられ、方法は自分で考えること。",
      },
      {
        id: 35,
        dimension: "TF",
        text: "他人の強い感情に直面したとき、あなたは：",
        optionA: "客観性を保ち、状況を論理的に理解しようとする。",
        optionB: "彼らの感情を感じ取り、感情的なサポートを提供する。",
      },
      {
        id: 36,
        dimension: "JP",
        text: "あなたのワークスペース（机、オフィス）は通常：",
        optionA: "きれいで整理され、体系的に配置されている。",
        optionB: "機能的に散らかっており、物が手の届く範囲にある。",
      },
      {
        id: 37,
        dimension: "EI",
        text: "見知らぬ人には、あなたはどのように見えるかもしれませんか：",
        optionA: "オープンで近づきやすい。",
        optionB: "穏やかで、控えめで、思慮深い。",
      },
      {
        id: 38,
        dimension: "SN",
        text: "ブレインストーミングセッションで、あなたがより得意なのは：",
        optionA: "既存のアイデアをより現実的に洗練させること。",
        optionB: "突飛で斬新な新しいアイデアを生み出すこと。",
      },
      {
        id: 39,
        dimension: "TF",
        text: "成功を評価するとき、あなたにとってより重要なのは何ですか？",
        optionA: "客観的な達成と設定された目標の達成。",
        optionB: "プロセスからの個人の成長と満足。",
      },
      {
        id: 40,
        dimension: "JP",
        text: "あなたはどのくらい早く意思決定をしますか？",
        optionA: "できるだけ早く決断して次に進もうとする。",
        optionB: "最後の瞬間まで選択肢を残しておくことを好む。",
      },
    ],
  },

  zh: {
    // Landing Page
    landingTitle: "的专属MBTI性格测试",
    landingSubtitle: "结合AI分析的精准性格测评",
    startTest: "开始测试",
    features: {
      accurate: "精准分析",
      accurateDesc: "40个精心设计的问题，更准确的结果",
      ai: "AI照片分析",
      aiDesc: "通过照片获得额外的性格洞察",
      detailed: "详细报告",
      detailedDesc: "包含优势和成长领域的完整分析",
    },

    skip: "跳过",
    next: "下一步",
    back: "返回",

    // Questionnaire
    questionProgress: "问题进度",
    howMuch: "您有多认同？",
    veryTrue: "非常同意",
    true: "同意",
    neutral: "一般",
    false: "不同意",
    veryFalse: "非常不同意",
    answerComplete: "回答完成！",
    analyzing: "正在分析结果...",
    showResults: "查看结果",

    // Results
    resultsTitle: "您的性格类型",
    dimensions: "性格维度",
    strengths: "优势",
    growthAreas: "成长领域",
    shareTitle: "分享结果",
    copyLink: "复制链接",
    retake: "重新测试",

    // Language Selector
    selectLanguage: "选择语言",
    loading: "加载结果中...",

    // For Results Page
    resultsForUser: "{username}，这是您的结果！",
    shareOnTwitterText: "我的MBTI结果是 {type} - {title}！快来测测你的类型吧。",

    // Toast Messages
    toastSuccessTitle: "成功",
    toastSuccessDesc: "链接已复制到剪贴板。",
    toastErrorTitle: "错误",
    toastErrorDesc: "复制链接失败。",
    toastWipTitle: "即将推出",
    toastWipDesc: "PDF报告下载功能即将推出。",

    // Personality Dimensions (These are used on the Results Page)
    introversion: "内向 (I)",
    extroversion: "外向 (E)",
    sensing: "感觉 (S)",
    intuition: "直觉 (N)",
    thinking: "思考 (T)",
    feeling: "情感 (F)",
    judging: "判断 (J)",
    perceiving: "感知 (P)",

    // Buttons
    downloadReport: "下载详细报告",
    actions: "操作",
    enterName: "请输入您的姓名",
    nameRequired: "请输入您的姓名",

    questions: [
      {
        id: 1,
        dimension: "EI",
        text: "当您去参加派对时，您会：",
        optionA: "与包括陌生人在内的许多人互动。",
        optionB: "与少数认识的人互动。",
      },
      {
        id: 2,
        dimension: "SN",
        text: "开始一个新项目时，您首先会：",
        optionA: "思考大局和可能性。",
        optionB: "关注具体的细节和实际情况。",
      },
      {
        id: 3,
        dimension: "TF",
        text: "做决定时，您更依赖于：",
        optionA: "逻辑和客观事实。",
        optionB: "个人感受以及他人会受到怎样的影响。",
      },
      {
        id: 4,
        dimension: "JP",
        text: "您对待计划的态度是：",
        optionA: "您喜欢有一个明确的计划并坚持执行。",
        optionB: "您喜欢保持灵活性并随时调整。",
      },
      {
        id: 5,
        dimension: "EI",
        text: "为了充电，您更喜欢：",
        optionA: "和一群朋友社交。",
        optionB: "独自享受安静的时光。",
      },
      {
        id: 6,
        dimension: "SN",
        text: "您更感兴趣的是：",
        optionA: "一个想法的潜力和未来影响。",
        optionB: "一个想法的实际应用。",
      },
      {
        id: 7,
        dimension: "TF",
        text: "在解决问题时，您优先考虑：",
        optionA: "效率和最合乎逻辑的方法。",
        optionB: "和谐以及相关人员的感受。",
      },
      {
        id: 8,
        dimension: "JP",
        text: "您更喜欢的工作方式是：",
        optionA: "以有条理的方式，按时完成任务。",
        optionB: "在灵感来临时，以爆发式的精力工作。",
      },
      {
        id: 9,
        dimension: "EI",
        text: "在小组讨论中，您更可能：",
        optionA: "主导对话并自由分享您的想法。",
        optionB: "仔细聆听，只在有深思熟虑的见解时发言。",
      },
      {
        id: 10,
        dimension: "SN",
        text: "学习新事物时，您更喜欢：",
        optionA: "首先理解其背后的概念和理论。",
        optionB: "通过动手实践和具体例子来学习。",
      },
      {
        id: 11,
        dimension: "TF",
        text: "在冲突中，您的第一反应是：",
        optionA: "找到一个公平且合乎逻辑的解决方案。",
        optionB: "考虑每个人的感受并寻求妥协。",
      },
      {
        id: 12,
        dimension: "JP",
        text: "计划旅行时，您更可能：",
        optionA: "制定详细的行程并提前预订所有东西。",
        optionB: "有一个大概的想法，并临时决定许多事情。",
      },
      {
        id: 13,
        dimension: "EI",
        text: "在团队中，当您可以……时，您会表现得最好：",
        optionA: "与他人合作并进行头脑风暴。",
        optionB: "深入专注于自己负责的工作部分。",
      },
      {
        id: 14,
        dimension: "SN",
        text: "适应新环境时，您会：",
        optionA: "对新的可能性和机会感到兴奋。",
        optionB: "依赖您过去的经验和既定方法。",
      },
      {
        id: 15,
        dimension: "TF",
        text: "解决问题时，您的首要考虑是：",
        optionA: "什么是最有效率和最合乎逻辑的解决方案？",
        optionB: "这个决定将如何影响相关人员？",
      },
      {
        id: 16,
        dimension: "JP",
        text: "您对截止日期的态度是：",
        optionA: "您会认真对待并为之稳步工作。",
        optionB: "您将其视为一个指导方针，并在压力下完成最好的工作。",
      },
      {
        id: 17,
        dimension: "EI",
        text: "对您来说，一个有趣的周末包括：",
        optionA: "许多活动和社交聚会。",
        optionB: "与几个亲密的朋友或独自一人放松。",
      },
      {
        id: 18,
        dimension: "SN",
        text: "您更喜欢那些……的讲师：",
        optionA: "以概念性、大局观的方式呈现信息。",
        optionB: "以清晰、分步、基于事实的细节呈现信息。",
      },
      {
        id: 19,
        dimension: "TF",
        text: "当朋友不开心时，您更可能：",
        optionA: "为他们的问题提供合乎逻辑的解决方案。",
        optionB: "提供情感支持和同理心。",
      },
      {
        id: 20,
        dimension: "JP",
        text: "关于您的周末：",
        optionA: "您通常会提前计划好。",
        optionB: "您经常临时决定做什么。",
      },
      {
        id: 21,
        dimension: "EI",
        text: "在会议中，您倾向于：",
        optionA: "自发地、大声地表达您的想法。",
        optionB: "在发言前保持矜持和深思熟虑。",
      },
      {
        id: 22,
        dimension: "SN",
        text: "您更容易被……所吸引：",
        optionA: "富有想象力和理论性的书籍/电影（如科幻、奇幻）。",
        optionB: "现实和实用的书籍/电影（如传记、纪录片）。",
      },
      {
        id: 23,
        dimension: "TF",
        text: "当朋友向您倾诉问题时，您首先会：",
        optionA: "分析问题并提出解决方案。",
        optionB: "共情他们的感受并给予安慰。",
      },
      {
        id: 24,
        dimension: "JP",
        text: "开始一项新爱好时，您会：",
        optionA: "喜欢遵循一个有条理的计划或教程。",
        optionB: "喜欢直接投入其中，边做边学。",
      },
      {
        id: 25,
        dimension: "EI",
        text: "关于您的工作环境，您在哪种环境下更专注：",
        optionA: "一个开放、协作、有些热闹的空间。",
        optionB: "一个安静、私密、没有干扰的空间。",
      },
      {
        id: 26,
        dimension: "SN",
        text: "您对抽象理论的看法是：",
        optionA: "对于理解未来的可能性很有趣。",
        optionB: "如果没有直接的实际用途，则不那么有趣。",
      },
      {
        id: 27,
        dimension: "TF",
        text: "提供反馈时，您倾向于：",
        optionA: "直接和诚实，专注于可以改进的地方。",
        optionB: "温柔和鼓励，考虑到对方的感受。",
      },
      {
        id: 28,
        dimension: "JP",
        text: "在您的日常生活中，您是……的人：",
        optionA: "遵循一个可预测的惯例。",
        optionB: "喜欢自发性和不受日程安排的自由。",
      },
      {
        id: 29,
        dimension: "EI",
        text: "在漫长的一天工作后，您更喜欢：",
        optionA: "出去社交，因为它能给您带来活力。",
        optionB: "待在家里独自充电，因为您感到筋疲力尽。",
      },
      {
        id: 30,
        dimension: "SN",
        text: "学习一项新技能时，对您来说更有效的是：",
        optionA: "首先理解“为什么”以及其背后的原理。",
        optionB: "首先通过分步说明学习“如何做”。",
      },
      {
        id: 31,
        dimension: "TF",
        text: "为团队做决定时，您优先考虑：",
        optionA: "最合乎逻辑和最公平的结果。",
        optionB: "团队的和谐及其成员的满意度。",
      },
      {
        id: 32,
        dimension: "JP",
        text: "您对突如其来的意外变化的典型反应是：",
        optionA: "压力，因为它打乱了您的计划。",
        optionB: "兴奋，因为它带来了新的可能性。",
      },
      {
        id: 33,
        dimension: "EI",
        text: "在交谈中，您更喜欢：",
        optionA: "谈论广泛的话题。",
        optionB: "深入探讨您感兴趣的几个话题。",
      },
      {
        id: 34,
        dimension: "SN",
        text: "遵循指示时，您更喜欢：",
        optionA: "清晰、详细、分步的指导。",
        optionB: "只给最终目标，让您自己想办法。",
      },
      {
        id: 35,
        dimension: "TF",
        text: "面对他人强烈的情绪时，您会：",
        optionA: "试图保持客观并从逻辑上理解情况。",
        optionB: "感受他们的情绪并提供情感支持。",
      },
      {
        id: 36,
        dimension: "JP",
        text: "您的工作空间（书桌、办公室）通常是：",
        optionA: "整洁、有条理、系统地布置。",
        optionB: "功能性地杂乱，物品触手可及。",
      },
      {
        id: 37,
        dimension: "EI",
        text: "对于陌生人来说，您可能看起来是：",
        optionA: "开放且容易接近。",
        optionB: "冷静、矜持且深思熟虑。",
      },
      {
        id: 38,
        dimension: "SN",
        text: "在头脑风暴会议中，您更擅长：",
        optionA: "完善现有想法，使其更具现实性。",
        optionB: "产生狂野、跳出框框的新想法。",
      },
      {
        id: 39,
        dimension: "TF",
        text: "当您评估自己的成功时，什么对您更重要？",
        optionA: "客观的成就和达到设定的目标。",
        optionB: "过程中的个人成长和满足感。",
      },
      {
        id: 40,
        dimension: "JP",
        text: "您做决定的速度有多快？",
        optionA: "我试图尽快做出决定以便继续前进。",
        optionB: "我喜欢保留我的选择，直到最后一刻。",
      },
    ],
  },

  ru: {
    // Landing Page
    landingTitle: "Ваш личный MBTI тест",
    landingSubtitle: "Точный анализ личности с помощью ИИ",
    startTest: "Начать тест",
    features: {
      accurate: "Точный анализ",
      accurateDesc: "Более точные результаты с 40 продуманными вопросами",
      ai: "AI анализ фото",
      aiDesc: "Дополнительные инсайты личности через фотографии",
      detailed: "Подробный отчет",
      detailedDesc: "Полный анализ, включая сильные стороны и зоны роста",
    },

    skip: "Пропустить",
    next: "Далее",
    back: "Назад",

    // Questionnaire
    questionProgress: "Прогресс вопросов",
    howMuch: "Насколько вы согласны?",
    veryTrue: "Полностью согласен",
    true: "Согласен",
    neutral: "Нейтрально",
    false: "Не согласен",
    veryFalse: "Совершенно не согласен",
    answerComplete: "Ответ завершён!",
    analyzing: "Анализ результатов...",
    showResults: "Показать результаты",

    // Results
    resultsTitle: "Ваш тип личности",
    dimensions: "Измерения личности",
    strengths: "Сильные стороны",
    growthAreas: "Зоны роста",
    shareTitle: "Поделиться результатом",
    copyLink: "Скопировать ссылку",
    retake: "Пройти тест заново",

    // Language Selector
    selectLanguage: "Выбрать язык",
    loading: "Загрузка результатов...",

    // For Results Page
    resultsForUser: "Вот ваши результаты, {username}!",
    shareOnTwitterText:
      "Мой результат MBTI: {type} - {title}! Узнайте и свой тип.",

    // Toast Messages
    toastSuccessTitle: "Успех",
    toastSuccessDesc: "Ссылка скопирована в буфер обмена.",
    toastErrorTitle: "Ошибка",
    toastErrorDesc: "Не удалось скопировать ссылку.",
    toastWipTitle: "Скоро",
    toastWipDesc: "Функция загрузки PDF-отчета скоро будет доступна.",

    // Personality Dimensions (These are used on the Results Page)
    introversion: "Интроверсия (I)",
    extroversion: "Экстраверсия (E)",
    sensing: "Сенсорика (S)",
    intuition: "Интуиция (N)",
    thinking: "Мышление (T)",
    feeling: "Чувство (F)",
    judging: "Суждение (J)",
    perceiving: "Восприятие (P)",

    // Buttons
    downloadReport: "Скачать подробный отчет",
    actions: "Действия",
    enterName: "Введите ваше имя",
    nameRequired: "Пожалуйста, введите ваше имя",

    questions: [
      {
        id: 1,
        dimension: "EI",
        text: "Когда вы идете на вечеринку, вы:",
        optionA: "Общаетесь со многими, включая незнакомцев.",
        optionB: "Общаетесь с несколькими знакомыми людьми.",
      },
      {
        id: 2,
        dimension: "SN",
        text: "Начиная новый проект, вы сначала:",
        optionA: "Думаете о общей картине и возможностях。",
        optionB: "Сосредотачиваетесь на конкретных деталях и практичности.",
      },
      {
        id: 3,
        dimension: "TF",
        text: "Принимая решение, вы больше полагаетесь на:",
        optionA: "Логику и объективные факты.",
        optionB: "Личные чувства и то, как это повлияет на других.",
      },
      {
        id: 4,
        dimension: "JP",
        text: "Ваш подход к планам:",
        optionA: "Вы предпочитаете иметь четкий план и придерживаться его.",
        optionB:
          "Вы предпочитаете оставаться гибким и адаптироваться по ходу дела.",
      },
      {
        id: 5,
        dimension: "EI",
        text: "Для подзарядки вы предпочитаете:",
        optionA: "Общаться с группой друзей.",
        optionB: "Проводить время в тишине в одиночестве.",
      },
      {
        id: 6,
        dimension: "SN",
        text: "Вас больше интересует:",
        optionA: "Потенциал и будущие последствия идеи.",
        optionB: "Практическое применение идеи.",
      },
      {
        id: 7,
        dimension: "TF",
        text: "При решении проблем вы отдаете приоритет:",
        optionA: "Эффективности и тому, что наиболее логично.",
        optionB: "Гармонии и чувствам вовлеченных людей.",
      },
      {
        id: 8,
        dimension: "JP",
        text: "Вы предпочитаете работать:",
        optionA: "Структурированно, выполняя задачи к сроку.",
        optionB: "Всплесками энергии, когда приходит вдохновение.",
      },
      {
        id: 9,
        dimension: "EI",
        text: "В групповом обсуждении вы, скорее всего:",
        optionA: "Будете вести беседу и свободно делиться своими идеями.",
        optionB:
          "Будете внимательно слушать и говорить только тогда, когда у вас есть что сказать по существу.",
      },
      {
        id: 10,
        dimension: "SN",
        text: "Изучая что-то новое, вы предпочитаете:",
        optionA: "Сначала понять основные концепции и теории.",
        optionB: "Учиться на практическом опыте и конкретных примерах.",
      },
      {
        id: 11,
        dimension: "TF",
        text: "В конфликте ваш первый инстинкт — это:",
        optionA: "Найти справедливое и логичное решение.",
        optionB: "Учесть чувства каждого и найти компромисс.",
      },
      {
        id: 12,
        dimension: "JP",
        text: "Планируя поездку, вы, скорее всего:",
        optionA: "Составите подробный маршрут и забронируете все заранее.",
        optionB:
          "Будете иметь общее представление и принимать многие решения спонтанно.",
      },
      {
        id: 13,
        dimension: "EI",
        text: "В команде вы преуспеваете, когда можете:",
        optionA: "Сотрудничать и проводить мозговые штурмы с другими.",
        optionB: "Глубоко сосредоточиться на своей части работы.",
      },
      {
        id: 14,
        dimension: "SN",
        text: "Адаптируясь к новой ситуации, вы:",
        optionA: "Воодушевляетесь новыми возможностями.",
        optionB: "Полагаетесь на свой прошлый опыт и устоявшиеся методы.",
      },
      {
        id: 15,
        dimension: "TF",
        text: "Ваше первое соображение при решении проблемы — это:",
        optionA: "Какое решение является наиболее эффективным и логичным?",
        optionB: "Как это решение повлияет на вовлеченных людей?",
      },
      {
        id: 16,
        dimension: "JP",
        text: "Ваше отношение к срокам:",
        optionA:
          "Вы относитесь к ним серьезно и планомерно работаете над их соблюдением.",
        optionB:
          "Вы рассматриваете их как ориентир и лучше всего работаете под давлением.",
      },
      {
        id: 17,
        dimension: "EI",
        text: "Для вас веселые выходные включают в себя:",
        optionA: "Множество мероприятий и социальных встреч.",
        optionB: "Отдых с несколькими близкими друзьями или в одиночестве.",
      },
      {
        id: 18,
        dimension: "SN",
        text: "Вы предпочитаете преподавателей, которые:",
        optionA: "Представляют информацию концептуально, в общих чертах.",
        optionB:
          "Представляют информацию с четкими, пошаговыми, фактическими деталями.",
      },
      {
        id: 19,
        dimension: "TF",
        text: "Когда друг расстроен, вы, скорее всего:",
        optionA: "Предложите логические решения его проблемы.",
        optionB: "Окажете эмоциональную поддержку и сочувствие.",
      },
      {
        id: 20,
        dimension: "JP",
        text: "Что касается ваших выходных:",
        optionA: "Вы обычно планируете их заранее.",
        optionB: "Вы часто решаете, что делать, по ходу дела.",
      },
      {
        id: 21,
        dimension: "EI",
        text: "На совещаниях вы склонны быть:",
        optionA: "Спонтанным и озвучивать свои идеи。",
        optionB: "Сдержанным и вдумчивым перед тем, как высказаться.",
      },
      {
        id: 22,
        dimension: "SN",
        text: "Вас больше привлекают:",
        optionA:
          "Творческие и теоретические книги/фильмы (например, научная фантастика, фэнтези).",
        optionB:
          "Реалистичные и практичные книги/фильмы (например, биографии, документальные фильмы).",
      },
      {
        id: 23,
        dimension: "TF",
        text: "Когда друг делится с вами проблемой, вы сначала:",
        optionA: "Анализируете проблему и предлагаете решения.",
        optionB: "Сопереживаете его чувствам и предлагаете утешение.",
      },
      {
        ```text
id: 24,
        dimension: "JP",
        text: "Начиная новое хобби, вы:",
        optionA:
          "Предпочитаете следовать структурированному плану или руководству.",
        optionB: "Предпочитаете просто погрузиться и разбираться по ходу дела.",
      },
      {
        id: 25,
        dimension: "EI",
        text: "Что касается вашей рабочей среды, вы лучше концентрируетесь в:",
        optionA: "Открытом, совместном пространстве с некоторой активностью.",
        optionB: "Тихом, уединенном пространстве без отвлекающих факторов.",
      },
      {
        id: 26,
        dimension: "SN",
        text: "Ваше мнение об абстрактных теориях таково:",
        optionA: "Они интересны для понимания будущих возможностей.",
        optionB:
          "Они менее интересны, если у них нет прямого практического применения.",
      },
      {
        id: 27,
        dimension: "TF",
        text: "Давая обратную связь, вы склонны быть:",
        optionA:
          "Прямым и честным, сосредотачиваясь на том, что можно улучшить.",
        optionB: "Мягким и ободряющим, учитывая чувства человека.",
      },
      {
        id: 28,
        dimension: "JP",
        text: "В повседневной жизни вы человек, который:",
        optionA: "Следует предсказуемому распорядку.",
        optionB: "Предпочитает спонтанность и свободу от графиков.",
      },
      {
        id: 29,
        dimension: "EI",
        text: "После долгого рабочего дня вы предпочитаете:",
        optionA:
          "Выйти в свет и пообщаться, так как это вас заряжает энергией.",
        optionB:
          "Остаться дома и подзарядиться в одиночестве, так как вы чувствуете себя истощенным.",
      },
      {
        id: 30,
        dimension: "SN",
        text: "При изучении нового навыка для вас эффективнее:",
        optionA: "Сначала понять «почему» и принципы, лежащие в его основе.",
        optionB: "Сначала изучить «как» с помощью пошаговых инструкций.",
      },
      {
        id: 31,
        dimension: "TF",
        text: "Принимая решение для группы, вы отдаете приоритет:",
        optionA: "Наиболее логичному и справедливому результату.",
        optionB: "Гармонии в группе и удовлетворенности ее членов.",
      },
      {
        id: 32,
        dimension: "JP",
        text: "Ваша типичная реакция на внезапное, неожиданное изменение:",
        optionA: "Стресс, потому что это нарушает ваш план.",
        optionB: "Волнение, потому что это открывает новые возможности.",
      },
      {
        id: 33,
        dimension: "EI",
        text: "В разговорах вы предпочитаете:",
        optionA: "Говорить на широкий круг тем.",
        optionB: "Углубляться в несколько интересующих вас тем.",
      },
      {
        id: 34,
        dimension: "SN",
        text: "Следуя инструкциям, вы предпочитаете:",
        optionA: "Четкое, подробное, пошаговое руководство.",
        optionB:
          "Только конечную цель, оставляя вам возможность придумать метод.",
      },
      {
        id: 35,
        dimension: "TF",
        text: "Столкнувшись с сильными эмоциями другого человека, вы:",
        optionA:
          "Пытаетесь оставаться объективным и логически понять ситуацию.",
        optionB: "Чувствуете их эмоции и предлагаете эмоциональную поддержку.",
      },
      {
        id: 36,
        dimension: "JP",
        text: "Ваше рабочее пространство (стол, офис) обычно:",
        optionA: "Аккуратное, организованное и систематически устроенное.",
        optionB:
          "Функционально захламленное, с предметами в пределах легкой досягаемости.",
      },
      {
        id: 37,
        dimension: "EI",
        text: "Для незнакомца вы можете выглядеть как:",
        optionA: "Открытый и легко доступный для общения.",
        optionB: "Спокойный, сдержанный и вдумчивый.",
      },
      {
        id: 38,
        dimension: "SN",
        text: "На сессии мозгового штурма вы лучше справляетесь с:",
        optionA:
          "Усовершенствованием существующих идей, чтобы сделать их более реалистичными.",
        optionB: "Генерированием диких, нестандартных, новых идей.",
      },
      {
        id: 39,
        dimension: "TF",
        text: "Когда вы оцениваете свой успех, что важнее для вас?",
        optionA: "Объективные достижения и достижение поставленных целей.",
        optionB: "Личностный рост и удовлетворение от процесса.",
      },
      {
        id: 40,
        dimension: "JP",
        text: "Как быстро вы принимаете решения?",
        optionA: "Я стараюсь решить как можно быстрее, чтобы двигаться дальше.",
        optionB:
          "Я предпочитаю держать свои варианты открытыми до последнего момента.",
      },
    ],
  },
};

// Define the "blueprint" for our context's value
interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (langCode: string) => void;
  t: (key: string) => string;
  languages: Language[];
  translations: typeof translations; // <<< STEP 1: ADD THIS LINE HERE
}

// Create the context with the blueprint
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// The Provider function that gives the context its value
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mbti-language");
      if (saved && languages.some((lang) => lang.code === saved)) {
        return saved;
      }
      const browserLang = navigator.language.split("-")[0];
      return languages.some((lang) => lang.code === browserLang)
        ? browserLang
        : "ko";
    }
    return "ko";
  });

  const setLanguage = (langCode: string) => {
    localStorage.setItem("mbti-language", langCode);
    setCurrentLanguage(langCode);
  };

  const t = (key: string): string => {
    const translation =
      translations[currentLanguage as keyof typeof translations];
    const keys = key.split(".");
    let value: any = translation;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  };

  return React.createElement(
    LanguageContext.Provider,
    {
      value: {
        currentLanguage,
        setLanguage,
        t,
        languages,
        translations, // <<< STEP 2: AND ADD THIS LINE HERE
      },
    },
    children,
  );
}

// The hook to use the context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}