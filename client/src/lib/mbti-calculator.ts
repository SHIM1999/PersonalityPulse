import { MBTIResult } from "@shared/schema";
// No longer needs to import 'translations' for the results logic

export function calculateMBTI(
  answers: Record<string, string>,
  // We need to know the language to pass it to our local getMBTITypeDetails function
  lang: string = "en",
): MBTIResult {
  const scores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  // Note: The questions themselves still come from the i18n file in the UI,
  // this calculation function doesn't need to know about them, only the answers.
  // The logic below assumes that the answer mapping (A/B) to dimensions is consistent.
  // This is a robust way to handle it without this file needing to know about the questions.
  const answerMap: Record<
    string,
    { dimension: string; optionA: string; optionB: string }
  > = {
    "1": { dimension: "EI", optionA: "E", optionB: "I" },
    "2": { dimension: "SN", optionA: "N", optionB: "S" },
    "3": { dimension: "TF", optionA: "T", optionB: "F" },
    "4": { dimension: "JP", optionA: "J", optionB: "P" },
    "5": { dimension: "EI", optionA: "E", optionB: "I" },
    "6": { dimension: "SN", optionA: "N", optionB: "S" },
    "7": { dimension: "TF", optionA: "T", optionB: "F" },
    "8": { dimension: "JP", optionA: "J", optionB: "P" },
    "9": { dimension: "EI", optionA: "E", optionB: "I" },
    "10": { dimension: "SN", optionA: "N", optionB: "S" },
    "11": { dimension: "TF", optionA: "T", optionB: "F" },
    "12": { dimension: "JP", optionA: "J", optionB: "P" },
    "13": { dimension: "EI", optionA: "E", optionB: "I" },
    "14": { dimension: "SN", optionA: "N", optionB: "S" },
    "15": { dimension: "TF", optionA: "T", optionB: "F" },
    "16": { dimension: "JP", optionA: "J", optionB: "P" },
    "17": { dimension: "EI", optionA: "E", optionB: "I" },
    "18": { dimension: "SN", optionA: "N", optionB: "S" },
    "19": { dimension: "TF", optionA: "T", optionB: "F" },
    "20": { dimension: "JP", optionA: "J", optionB: "P" },
    "21": { dimension: "EI", optionA: "E", optionB: "I" },
    "22": { dimension: "SN", optionA: "N", optionB: "S" },
    "23": { dimension: "TF", optionA: "T", optionB: "F" },
    "24": { dimension: "JP", optionA: "J", optionB: "P" },
    "25": { dimension: "EI", optionA: "E", optionB: "I" },
    "26": { dimension: "SN", optionA: "N", optionB: "S" },
    "27": { dimension: "TF", optionA: "T", optionB: "F" },
    "28": { dimension: "JP", optionA: "J", optionB: "P" },
    "29": { dimension: "EI", optionA: "E", optionB: "I" },
    "30": { dimension: "SN", optionA: "N", optionB: "S" },
    "31": { dimension: "TF", optionA: "T", optionB: "F" },
    "32": { dimension: "JP", optionA: "J", optionB: "P" },
    "33": { dimension: "EI", optionA: "E", optionB: "I" },
    "34": { dimension: "SN", optionA: "N", optionB: "S" },
    "35": { dimension: "TF", optionA: "T", optionB: "F" },
    "36": { dimension: "JP", optionA: "J", optionB: "P" },
    "37": { dimension: "EI", optionA: "E", optionB: "I" },
    "38": { dimension: "SN", optionA: "S", optionB: "N" }, // Note: Swapped for variety
    "39": { dimension: "TF", optionA: "T", optionB: "F" },
    "40": { dimension: "JP", optionA: "J", optionB: "P" },
  };

  Object.entries(answers).forEach(([questionId, answer]) => {
    const mapping = answerMap[questionId];
    if (!mapping) return;

    const [option, intensity] = answer.split("_");
    let score = 1;
    if (intensity === "strong") score = 3;
    else if (intensity === "medium") score = 2;

    const trait = option === "A" ? mapping.optionA : mapping.optionB;
    (scores as any)[trait] += score;
  });

  const totalEI = scores.E + scores.I;
  const totalSN = scores.N + scores.S;
  const totalTF = scores.T + scores.F;
  const totalJP = scores.J + scores.P;

  const dimensions = {
    EI: totalEI > 0 ? Math.round((scores.E / totalEI) * 100) : 50,
    SN: totalSN > 0 ? Math.round((scores.N / totalSN) * 100) : 50,
    TF: totalTF > 0 ? Math.round((scores.T / totalTF) * 100) : 50,
    JP: totalJP > 0 ? Math.round((scores.J / totalJP) * 100) : 50,
  };

  const type =
    (scores.E >= scores.I ? "E" : "I") +
    (scores.N >= scores.S ? "N" : "S") +
    (scores.T >= scores.F ? "T" : "F") +
    (scores.J >= scores.P ? "J" : "P");

  // Call our local, multi-language function
  const typeDetails = getMBTITypeDetails(type, lang);

  return {
    type,
    title: typeDetails.title,
    subtitle: typeDetails.subtitle,
    dimensions,
    strengths: typeDetails.strengths,
    growthAreas: typeDetails.growthAreas,
  };
}

/**
 * Contains all translated result descriptions and returns the correct one.
 * @param type The 4-letter MBTI type (e.g., "INFP")
 * @param lang The language code (e.g., "en", "ko")
 * @returns The translated details for the given type and language.
 */
function getMBTITypeDetails(type: string, lang: string) {
  switch (lang) {
    case "ru":
      return getRussianTypeDetails(type);
    // Add more languages as needed
    default:
      return getTypeDetails(type, "en");
  }
}

interface TypeDetails {
  title: string;
  subtitle: string;
  strengths: string[];
  growthAreas: string[];
}

function getRussianTypeDetails(type: string): TypeDetails {
  const russianTypes: Record<string, TypeDetails> = {
    INTJ: {
      title: "Архитектор",
      subtitle: "Творческий и решительный мыслитель",
      strengths: [
        "Стратегическое мышление",
        "Независимость в работе",
        "Высокие стандарты качества"
      ],
      growthAreas: [
        "Навыки межличностного общения",
        "Гибкость в планах",
        "Принятие критики"
      ]
    },
    INTP: {
      title: "Мыслитель",
      subtitle: "Инновационный изобретатель",
      strengths: [
        "Логический анализ",
        "Творческое решение проблем",
        "Объективность"
      ],
      growthAreas: [
        "Практическая реализация идей",
        "Управление временем",
        "Эмоциональное выражение"
      ]
    },
    ENTJ: {
      title: "Командир",
      subtitle: "Смелый и волевой лидер",
      strengths: [
        "Естественные лидерские качества",
        "Стратегическое планирование",
        "Эффективность в достижении целей"
      ],
      growthAreas: [
        "Терпение с другими",
        "Внимание к деталям",
        "Баланс работы и жизни"
      ]
    },
    ENTP: {
      title: "Полемист",
      subtitle: "Умный и любознательный мыслитель",
      strengths: [
        "Творческое мышление",
        "Адаптивность",
        "Энтузиазм к новым идеям"
      ],
      growthAreas: [
        "Последовательность в проектах",
        "Внимание к деталям",
        "Управление рутинными задачами"
      ]
    },
    INFJ: {
      title: "Адвокат",
      subtitle: "Творческий и проницательный идеалист",
      strengths: [
        "Глубокое понимание людей",
        "Творческое мышление",
        "Сильные ценности"
      ],
      growthAreas: [
        "Принятие несовершенства",
        "Забота о себе",
        "Открытость к критике"
      ]
    },
    INFP: {
      title: "Посредник",
      subtitle: "Поэтичный и добрый альтруист",
      strengths: [
        "Сильные ценности",
        "Творческое выражение",
        "Эмпатия"
      ],
      growthAreas: [
        "Принятие решений",
        "Управление временем",
        "Самоутверждение"
      ]
    },
    ENFJ: {
      title: "Вдохновляющий протагонист",
      subtitle: "Харизматичный и вдохновляющий лидер",
      strengths: [
        "Способность понимать и мотивировать других",
        "Выдающиеся коммуникативные навыки",
        "Лидерство в организации команд"
      ],
      growthAreas: [
        "Забота о собственных потребностях",
        "Устойчивость к критике",
        "Управление перфекционистскими тенденциями"
      ]
    },
    ENFP: {
      title: "Активист",
      subtitle: "Энтузиаст и творческий коммуникатор",
      strengths: [
        "Энтузиазм и позитивная энергия",
        "Творческое мышление",
        "Сильные навыки межличностного общения"
      ],
      growthAreas: [
        "Фокус и последовательность",
        "Управление временем",
        "Принятие сложных решений"
      ]
    },
    ISTJ: {
      title: "Логистик",
      subtitle: "Практичный и основательный",
      strengths: [
        "Надежность и ответственность",
        "Внимание к деталям",
        "Логическое мышление"
      ],
      growthAreas: [
        "Адаптивность к изменениям",
        "Творческое мышление",
        "Эмоциональное выражение"
      ]
    },
    ISFJ: {
      title: "Защитник",
      subtitle: "Теплый и преданный защитник",
      strengths: [
        "Заботливость и служение",
        "Стабильность и надежность",
        "Понимание потребностей других"
      ],
      growthAreas: [
        "Выражение собственных потребностей",
        "Открытость к изменениям",
        "Управление стрессом"
      ]
    },
    ESTJ: {
      title: "Управляющий",
      subtitle: "Отличный администратор",
      strengths: [
        "Лидерские качества",
        "Организационные способности",
        "Практичность"
      ],
      growthAreas: [
        "Гибкость",
        "Эмоциональная осведомленность",
        "Терпение"
      ]
    },
    ESFJ: {
      title: "Консул",
      subtitle: "Заботливый и популярный",
      strengths: [
        "Социальные навыки",
        "Гармония в отношениях",
        "Практическая помощь"
      ],
      growthAreas: [
        "Принятие конфликтов",
        "Независимое принятие решений",
        "Самоутверждение"
      ]
    },
    ISTP: {
      title: "Мастер",
      subtitle: "Смелый и практичный экспериментатор",
      strengths: [
        "Практические навыки решения проблем",
        "Отличные технические способности",
        "Способность справляться с кризисными ситуациями"
      ],
      growthAreas: [
        "Долгосрочное планирование",
        "Эмоциональное выражение и общение",
        "Командная работа и сотрудничество"
      ]
    },
    ISFP: {
      title: "Артист",
      subtitle: "Гибкий и очаровательный художник",
      strengths: [
        "Художественная чувствительность и творчество",
        "Глубокая забота о других",
        "Открытость и принятие"
      ],
      growthAreas: [
        "Самоутверждение и выражение мнений",
        "Постановка долгосрочных целей",
        "Работа с конфликтными ситуациями"
      ]
    },
    ESTP: {
      title: "Предприниматель",
      subtitle: "Умный и энергичный воспринимающий",
      strengths: [
        "Адаптивность",
        "Практические навыки",
        "Социальная уверенность"
      ],
      growthAreas: [
        "Долгосрочное планирование",
        "Терпение",
        "Размышления перед действием"
      ]
    },
    ESFP: {
      title: "Развлекатель",
      subtitle: "Спонтанный и энергичный артист",
      strengths: [
        "Социальные навыки",
        "Позитивность",
        "Практическая помощь"
      ],
      growthAreas: [
        "Долгосрочное планирование",
        "Принятие критики",
        "Фокус на задачах"
      ]
    }
  };

  return russianTypes[type] || russianTypes["INFP"];
}

  function getTypeDetails(type: string, lang: string): TypeDetails {
  const allTypeDetails = {
    ko: {
      ENFP: {
        title: "열정적인 활동가",
        subtitle: "창의적이고 사교적인 자유로운 영혼",
        strengths: [
          "뛰어난 소통 능력과 리더십",
          "창의적 문제 해결 능력",
          "열정적이고 긍정적인 에너지",
        ],
        growthAreas: [
          "세부사항에 대한 집중력 향상",
          "장기적 계획 수립 능력",
          "일관성 있는 실행력",
        ],
      },
      ENFJ: {
        title: "선도하는 교육자",
        subtitle: "카리스마 있고 영감을 주는 지도자",
        strengths: [
          "타인을 이해하고 동기부여하는 능력",
          "뛰어난 커뮤니케이션 스킬",
          "조직과 팀을 이끄는 리더십",
        ],
        growthAreas: [
          "자신의 욕구도 챙기기",
          "비판에 대한 내성 키우기",
          "완벽주의 성향 조절",
        ],
      },
      ENTP: {
        title: "독창적인 발명가",
        subtitle: "지적 호기심이 강한 혁신가",
        strengths: [
          "창의적 아이디어 생성",
          "빠른 학습과 적응력",
          "논리적 분석과 토론 능력",
        ],
        growthAreas: [
          "지속적인 집중력 유지",
          "루틴한 업무 처리 능력",
          "감정적 배려심 개발",
        ],
      },
      ENTJ: {
        title: "대담한 지휘관",
        subtitle: "천부적인 리더이자 전략가",
        strengths: [
          "강력한 리더십과 결단력",
          "전략적 사고와 계획 수립",
          "목표 달성을 위한 추진력",
        ],
        growthAreas: [
          "타인의 감정 고려하기",
          "인내심과 유연성 기르기",
          "세부사항에 대한 관심",
        ],
      },
      INFP: {
        title: "이상을 추구하는 중재자",
        subtitle: "개성 있고 창의적인 이상주의자",
        strengths: [
          "깊은 공감 능력과 이해심",
          "창의적 표현과 상상력",
          "강한 가치관과 신념",
        ],
        growthAreas: [
          "현실적 목표 설정",
          "비판에 대한 내성",
          "자기 주장 능력 향상",
        ],
      },
      INFJ: {
        title: "통찰력 있는 옹호자",
        subtitle: "신비롭고 직관적인 이상주의자",
        strengths: [
          "깊은 통찰력과 직관",
          "타인에 대한 깊은 이해",
          "원칙과 가치를 중시하는 신념",
        ],
        growthAreas: [
          "스트레스 관리 능력",
          "사회적 에너지 충전",
          "완벽주의 성향 완화",
        ],
      },
      INTP: {
        title: "논리적인 사색가",
        subtitle: "지적 탐구를 즐기는 사고가",
        strengths: [
          "논리적 분석과 비판적 사고",
          "독창적 아이디어 개발",
          "복잡한 문제 해결 능력",
        ],
        growthAreas: [
          "감정 표현과 대인관계",
          "실행력과 마감 준수",
          "팀워크와 협업 능력",
        ],
      },
      INTJ: {
        title: "용sle도한 건축가",
        subtitle: "독립적이고 전략적인 사고가",
        strengths: [
          "장기적 비전과 전략적 사고",
          "독립적 문제 해결 능력",
          "높은 기준과 완벽 추구",
        ],
        growthAreas: [
          "타인과의 소통과 협력",
          "감정적 측면 고려",
          "유연성과 적응력",
        ],
      },
      ESFP: {
        title: "자유로운 연예인",
        subtitle: "즉흥적이고 활기찬 엔터테이너",
        strengths: [
          "뛰어난 사교성과 친화력",
          "현재를 즐기는 긍정적 에너지",
          "실용적 문제 해결",
        ],
        growthAreas: [
          "장기적 계획 수립",
          "비판적 사고 개발",
          "책임감 있는 의사결정",
        ],
      },
      ESFJ: {
        title: "사교적인 외교관",
        subtitle: "배려심 많고 협력적인 조력자",
        strengths: [
          "타인을 돕고 지원하는 능력",
          "조화로운 관계 유지",
          "책임감 있는 업무 처리",
        ],
        growthAreas: [
          "자기 주장과 경계 설정",
          "변화에 대한 적응력",
          "비판적 사고 능력",
        ],
      },
      ESTP: {
        title: "모험을 즐기는 사업가",
        subtitle: "대담하고 실용적인 현실주의자",
        strengths: [
          "뛰어난 적응력과 유연성",
          "실무적 문제 해결 능력",
          "에너지 넘치는 행동력",
        ],
        growthAreas: [
          "장기적 계획과 인내심",
          "세심한 분석과 성찰",
          "타인의 감정 고려",
        ],
      },
      ESTJ: {
        title: "엄격한 관리자",
        subtitle: "전통을 중시하는 조직가",
        strengths: [
          "체계적인 조직 관리 능력",
          "책임감 있는 리더십",
          "효율적인 업무 처리",
        ],
        growthAreas: [
          "창의적 사고와 혁신",
          "타인의 다양성 수용",
          "감정적 측면 고려",
        ],
      },
      ISFP: {
        title: "호기심 많은 예술가",
        subtitle: "유연하고 매력적인 예술가",
        strengths: [
          "예술적 감성과 창의력",
          "타인에 대한 깊은 배려",
          "개방적이고 수용적인 태도",
        ],
        growthAreas: [
          "자기 주장과 의견 표현",
          "장기적 목표 설정",
          "갈등 상황 대처",
        ],
      },
      ISFJ: {
        title: "용감한 수호자",
        subtitle: "따뜻하고 헌신적인 보호자",
        strengths: [
          "세심한 배려와 봉사정신",
          "안정적이고 신뢰할 수 있는 성격",
          "타인의 필요 파악",
        ],
        growthAreas: ["자기 욕구 표현", "변화에 대한 개방성", "스트레스 관리"],
      },
      ISTP: {
        title: "만능 재주꾼",
        subtitle: "대담하고 실용적인 실험가",
        strengths: [
          "실용적 문제 해결 능력",
          "뛰어난 손재주와 기술력",
          "위기 상황 대처 능력",
        ],
        growthAreas: [
          "장기적 계획과 일정 관리",
          "감정 표현과 소통",
          "팀워크와 협업",
        ],
      },
      ISTJ: {
        title: "현실주의 논리학자",
        subtitle: "신뢰할 수 있는 실용주의자",
        strengths: [
          "체계적이고 꼼꼼한 업무 처리",
          "강한 책임감과 신뢰성",
          "안정적인 성과 달성",
        ],
        growthAreas: [
          "창의적 사고와 혁신",
          "감정 표현과 공감",
          "변화에 대한 적응력",
        ],
      },
    },
    en: {
      ENFP: {
        title: "Passionate Campaigner",
        subtitle: "A creative and sociable free spirit",
        strengths: [
          "Excellent communication and leadership",
          "Creative problem-solving",
          "Passionate and positive energy",
        ],
        growthAreas: [
          "Improving focus on details",
          "Long-term planning skills",
          "Consistent execution",
        ],
      },
      ENFJ: {
        title: "Inspiring Protagonist",
        subtitle: "A charismatic and inspiring leader",
        strengths: [
          "Ability to understand and motivate others",
          "Outstanding communication skills",
          "Leadership in organizing teams",
        ],
        growthAreas: [
          "Taking care of one's own needs",
          "Building resilience to criticism",
          "Managing perfectionist tendencies",
        ],
      },
      ENTP: {
        title: "Innovative Debater",
        subtitle: "An innovator with strong intellectual curiosity",
        strengths: [
          "Creative idea generation",
          "Quick learning and adaptability",
          "Logical analysis and debate skills",
        ],
        growthAreas: [
          "Maintaining sustained focus",
          "Ability to handle routine tasks",
          "Developing emotional consideration",
        ],
      },
      ENTJ: {
        title: "Bold Commander",
        subtitle: "A natural leader and strategist",
        strengths: [
          "Strong leadership and decisiveness",
          "Strategic thinking and planning",
          "Drive to achieve goals",
        ],
        growthAreas: [
          "Considering others' emotions",
          "Cultivating patience and flexibility",
          "Attention to detail",
        ],
      },
      INFP: {
        title: "Idealistic Mediator",
        subtitle: "An individualistic and creative idealist",
        strengths: [
          "Deep empathy and understanding",
          "Creative expression and imagination",
          "Strong values and beliefs",
        ],
        growthAreas: [
          "Setting realistic goals",
          "Resilience to criticism",
          "Improving assertiveness",
        ],
      },
      INFJ: {
        title: "Insightful Advocate",
        subtitle: "A mystical and intuitive idealist",
        strengths: [
          "Deep insight and intuition",
          "Profound understanding of others",
          "Belief in principles and values",
        ],
        growthAreas: [
          "Stress management skills",
          "Recharging social energy",
          "Easing perfectionist tendencies",
        ],
      },
      INTP: {
        title: "Logical Thinker",
        subtitle: "A thinker who enjoys intellectual exploration",
        strengths: [
          "Logical analysis and critical thinking",
          "Original idea development",
          "Complex problem-solving skills",
        ],
        growthAreas: [
          "Emotional expression and interpersonal skills",
          "Execution and meeting deadlines",
          "Teamwork and collaboration skills",
        ],
      },
      INTJ: {
        title: "Strategic Architect",
        subtitle: "An independent and strategic thinker",
        strengths: [
          "Long-term vision and strategic thinking",
          "Independent problem-solving",
          "High standards and pursuit of perfection",
        ],
        growthAreas: [
          "Communication and collaboration with others",
          "Considering emotional aspects",
          "Flexibility and adaptability",
        ],
      },
      ESFP: {
        title: "Spontaneous Entertainer",
        subtitle: "An impromptu and vibrant performer",
        strengths: [
          "Excellent sociability and friendliness",
          "Positive energy enjoying the present",
          "Practical problem-solving",
        ],
        growthAreas: [
          "Long-term planning",
          "Developing critical thinking",
          "Responsible decision-making",
        ],
      },
      ESFJ: {
        title: "Sociable Consul",
        subtitle: "A caring and cooperative helper",
        strengths: [
          "Ability to help and support others",
          "Maintaining harmonious relationships",
          "Responsible task processing",
        ],
        growthAreas: [
          "Assertiveness and setting boundaries",
          "Adaptability to change",
          "Critical thinking skills",
        ],
      },
      ESTP: {
        title: "Adventurous Entrepreneur",
        subtitle: "A bold and practical realist",
        strengths: [
          "Excellent adaptability and flexibility",
          "Practical problem-solving skills",
          "Energetic action",
        ],
        growthAreas: [
          "Long-term planning and patience",
          "Detailed analysis and reflection",
          "Considering others' emotions",
        ],
      },
      ESTJ: {
        title: "Strict Executive",
        subtitle: "An organizer who values tradition",
        strengths: [
          "Systematic organization management",
          "Responsible leadership",
          "Efficient task processing",
        ],
        growthAreas: [
          "Creative thinking and innovation",
          "Accepting others' diversity",
          "Considering emotional aspects",
        ],
      },
      ISFP: {
        title: "Curious Artist",
        subtitle: "A flexible and charming artist",
        strengths: [
          "Artistic sensibility and creativity",
          "Deep consideration for others",
          "Open and receptive attitude",
        ],
        growthAreas: [
          "Assertiveness and expressing opinions",
          "Setting long-term goals",
          "Coping with conflict situations",
        ],
      },
      ISFJ: {
        title: "Brave Defender",
        subtitle: "A warm and dedicated protector",
        strengths: [
          "Meticulous care and spirit of service",
          "Stable and reliable personality",
          "Identifying others' needs",
        ],
        growthAreas: [
          "Expressing one's own needs",
          "Openness to change",
          "Stress management",
        ],
      },
      ISTP: {
        title: "Versatile Virtuoso",
        subtitle: "A bold and practical experimenter",
        strengths: [
          "Practical problem-solving skills",
          "Excellent manual dexterity and technical skills",
          "Crisis management ability",
        ],
        growthAreas: [
          "Long-term planning and schedule management",
          "Emotional expression and communication",
          "Teamwork and collaboration",
        ],
      },
      ISTJ: {
        title: "Realistic Logistician",
        subtitle: "A reliable pragmatist",
        strengths: [
          "Systematic and meticulous task processing",
          "Strong sense of responsibility and reliability",
          "Stable performance achievement",
        ],
        growthAreas: [
          "Creative thinking and innovation",
          "Emotional expression and empathy",
          "Adaptability to change",
        ],
      },
    },
    ja: {
      ENFP: {
        title: "情熱的な運動家",
        subtitle: "創造的で社交的な自由な魂",
        strengths: [
          "優れたコミュニケーション能力とリーダーシップ",
          "創造的な問題解決能力",
          "情熱的でポジティブなエネルギー",
        ],
        growthAreas: [
          "細部への集中力向上",
          "長期的な計画立案能力",
          "一貫した実行力",
        ],
      },
      ENFJ: {
        title: "導く教育者",
        subtitle: "カリスマ性があり、インスピレーションを与える指導者",
        strengths: [
          "他者を理解し、動機付ける能力",
          "優れたコミュニケーションスキル",
          "組織やチームを導くリーダーシップ",
        ],
        growthAreas: [
          "自分の欲求も大切にする",
          "批判への耐性を育てる",
          "完璧主義の傾向を調整する",
        ],
      },
      ENTP: {
        title: "独創的な発明家",
        subtitle: "知的好奇心が強い革新者",
        strengths: [
          "創造的なアイデアの生成",
          "迅速な学習と適応力",
          "論理的な分析と討論能力",
        ],
        growthAreas: [
          "持続的な集中力の維持",
          "ルーチンワークの処理能力",
          "感情的な配慮の育成",
        ],
      },
      ENTJ: {
        title: "大胆な指揮官",
        subtitle: "天性のリーダーであり戦略家",
        strengths: [
          "強力なリーダーシップと決断力",
          "戦略的思考と計画立案",
          "目標達成のための推進力",
        ],
        growthAreas: [
          "他人の感情を考慮する",
          "忍耐力と柔軟性を養う",
          "細部への関心",
        ],
      },
      INFP: {
        title: "理想を追求する仲介者",
        subtitle: "個性的で創造的な理想主義者",
        strengths: [
          "深い共感能力と理解力",
          "創造的な表現と想像力",
          "強い価値観と信念",
        ],
        growthAreas: ["現実的な目標設定", "批判への耐性", "自己主張能力の向上"],
      },
      INFJ: {
        title: "洞察力のある擁護者",
        subtitle: "神秘的で直感的な理想主義者",
        strengths: [
          "深い洞察力と直感",
          "他者への深い理解",
          "原則と価値を重んじる信念",
        ],
        growthAreas: [
          "ストレス管理能力",
          "社会的エネルギーの充電",
          "完璧主義の傾向の緩和",
        ],
      },
      INTP: {
        title: "論理的な思索家",
        subtitle: "知的探求を楽しむ思考家",
        strengths: [
          "論理的分析と批判的思考",
          "独創的なアイデア開発",
          "複雑な問題解決能力",
        ],
        growthAreas: [
          "感情表現と対人関係",
          "実行力と締め切り遵守",
          "チームワークと協業能力",
        ],
      },
      INTJ: {
        title: "用意周到な建築家",
        subtitle: "独立的で戦略的な思考家",
        strengths: [
          "長期的ビジョンと戦略的思考",
          "独立した問題解決能力",
          "高い基準と完璧の追求",
        ],
        growthAreas: [
          "他者とのコミュニケーションと協力",
          "感情的な側面の考慮",
          "柔軟性と適応力",
        ],
      },
      ESFP: {
        title: "自由なエンターテイナー",
        subtitle: "即興的で活気のあるパフォーマー",
        strengths: [
          "優れた社交性と親しみやすさ",
          "現在を楽しむポジティブなエネルギー",
          "実用的な問題解決",
        ],
        growthAreas: [
          "長期的な計画立案",
          "批判的思考の育成",
          "責任ある意思決定",
        ],
      },
      ESFJ: {
        title: "社交的な外交官",
        subtitle: "思いやりがあり協力的な助力者",
        strengths: [
          "他者を助け支援する能力",
          "調和のとれた関係の維持",
          "責任ある業務処理",
        ],
        growthAreas: [
          "自己主張と境界線の設定",
          "変化への適応力",
          "批判的思考能力",
        ],
      },
      ESTP: {
        title: "冒険好きな実業家",
        subtitle: "大胆で実用的な現実主義者",
        strengths: [
          "優れた適応力と柔軟性",
          "実務的な問題解決能力",
          "エネルギッシュな行動力",
        ],
        growthAreas: [
          "長期的な計画と忍耐力",
          "綿密な分析と省察",
          "他人の感情の考慮",
        ],
      },
      ESTJ: {
        title: "厳格な管理者",
        subtitle: "伝統を重んじる組織者",
        strengths: [
          "体系的な組織管理能力",
          "責任感のあるリーダーシップ",
          "効率的な業務Ц",
        ],
        growthAreas: [
          "創造的思考と革新",
          "他者の多様性の受容",
          "感情的な側面の考慮",
        ],
      },
      ISFP: {
        title: "好奇心旺盛な芸術家",
        subtitle: "柔軟で魅力的な芸術家",
        strengths: [
          "芸術的感性と創造力",
          "他者への深い配慮",
          "開放的で受容的な態度",
        ],
        growthAreas: [
          "自己主張と意見表現",
          "長期的な目標設定",
          "対立状況への対処",
        ],
      },
      ISFJ: {
        title: "勇敢な守護者",
        subtitle: "温かく献身的な保護者",
        strengths: [
          "細やかな配慮と奉仕の精神",
          "安定的で信頼できる性格",
          "他者の必要性の把握",
        ],
        growthAreas: ["自己の欲求表現", "変化への開放性", "ストレス管理"],
      },
      ISTP: {
        title: "万能な職人",
        subtitle: "大胆で実用的な実験家",
        strengths: [
          "実用的な問題解決能力",
          "優れた手先の器用さと技術力",
          "危機的状況への対処能力",
        ],
        growthAreas: [
          "長期的な計画とスケジュール管理",
          "感情表現とコミュニケーション",
          "チームワークと協業",
        ],
      },
      ISTJ: {
        title: "現実主義の論理学者",
        subtitle: "信頼できる実用主義者",
        strengths: [
          "体系的で丁寧な業務処理",
          "強い責任感と信頼性",
          "安定した成果の達成",
        ],
        growthAreas: ["創造的思考と革新", "感情表現と共感", "変化への適応力"],
      },
    },
    zh: {
      ENFP: {
        title: "充满激情的活动家",
        subtitle: "富有创造力和社交精神的自由灵魂",
        strengths: [
          "出色的沟通能力和领导力",
          "创造性的问题解决能力",
          "热情积极的能量",
        ],
        growthAreas: ["提高对细节的关注", "长期规划能力", "持续的执行力"],
      },
      ENFJ: {
        title: "循循善诱的教育家",
        subtitle: "富有魅力和启发性的领导者",
        strengths: [
          "理解和激励他人的能力",
          "卓越的沟通技巧",
          "组织和领导团队的领导力",
        ],
        growthAreas: [
          "照顾自身需求",
          "建立对批评的承受能力",
          "调节完美主义倾向",
        ],
      },
      ENTP: {
        title: "富有创造力的发明家",
        subtitle: "充满知识好奇心的革新者",
        strengths: ["创造性思维", "快速学习和适应能力", "逻辑分析和辩论能力"],
        growthAreas: ["保持持续的注意力", "处理常规任务的能力", "培养情感关怀"],
      },
      ENTJ: {
        title: "大胆的指挥官",
        subtitle: "天生的领导者和战略家",
        strengths: [
          "强大的领导力和决策力",
          "战略性思维和规划",
          "实现目标的驱动力",
        ],
        growthAreas: ["考虑他人情感", "培养耐心和灵活性", "关注细节"],
      },
      INFP: {
        title: "追求理想的调解人",
        subtitle: "个性化和富有创造力的理想主义者",
        strengths: [
          "深刻的同理心和理解力",
          "创造性表达和想象力",
          "坚定的价值观和信念",
        ],
        growthAreas: ["设定现实目标", "对批评的承受能力", "提高自信"],
      },
      INFJ: {
        title: "富有洞察力的倡导者",
        subtitle: "神秘而直观的理想主义者",
        strengths: [
          "深刻的洞察力和直觉",
          "对他人的深刻理解",
          "坚信原则和价值观",
        ],
        growthAreas: ["压力管理能力", "补充社交能量", "缓解完美主义倾向"],
      },
      INTP: {
        title: "逻辑思辨的思想家",
        subtitle: "享受智力探索的思考者",
        strengths: [
          "逻辑分析和批判性思维",
          "原创思想发展",
          "解决复杂问题的能力",
        ],
        growthAreas: [
          "情感表达和人际交往能力",
          "执行力和遵守截止日期",
          "团队合作和协作能力",
        ],
      },
      INTJ: {
        title: "深谋远虑的建筑师",
        subtitle: "独立和战略性的思考者",
        strengths: [
          "长远眼光和战略思维",
          "独立解决问题的能力",
          "高标准和追求完美",
        ],
        growthAreas: ["与他人沟通和协作", "考虑情感方面", "灵活性和适应性"],
      },
      ESFP: {
        title: "自由奔放的表演者",
        subtitle: "即兴而充满活力的艺人",
        strengths: [
          "出色的社交能力和亲和力",
          "享受当下的积极能量",
          "实际问题解决能力",
        ],
        growthAreas: ["长期规划", "发展批判性思维", "负责任的决策"],
      },
      ESFJ: {
        title: "热心肠的执政官",
        subtitle: "有爱心和合作精神的协助者",
        strengths: ["帮助和支持他人的能力", "维持和谐关系", "负责任地处理任务"],
        growthAreas: [
          "坚持自我主张和设定界限",
          "适应变化的能力",
          "批判性思维能力",
        ],
      },
      ESTP: {
        title: "热衷冒险的企业家",
        subtitle: "大胆而务实的现实主义者",
        strengths: [
          "出色的适应性和灵活性",
          "实际问题解决能力",
          "充满活力的行动力",
        ],
        growthAreas: ["长期规划和耐心", "详细分析和反思", "考虑他人情感"],
      },
      ESTJ: {
        title: "一丝不苟的管理者",
        subtitle: "重视传统的组织者",
        strengths: [
          "系统化的组织管理能力",
          "负责任的领导力",
          "高效的任务处理能力",
        ],
        growthAreas: ["创造性思维和创新", "接受他人的多样性", "考虑情感方面"],
      },
      ISFP: {
        title: "充满好奇心的艺术家",
        subtitle: "灵活而有魅力的艺术家",
        strengths: ["艺术感性和创造力", "对他人的深切关怀", "开放和接纳的态度"],
        growthAreas: ["坚持自我主张和表达意见", "设定长期目标", "应对冲突情况"],
      },
      ISFJ: {
        title: "勇敢的守护者",
        subtitle: "温暖而专注的保护者",
        strengths: ["细心的关怀和服务精神", "稳定可靠的个性", "识别他人需求"],
        growthAreas: ["表达自身需求", "对变化的开放性", "压力管理"],
      },
      ISTP: {
        title: "多才多艺的巧手家",
        subtitle: "大胆而务实的实验家",
        strengths: ["实际问题解决能力", "出色的动手能力和技术", "危机处理能力"],
        growthAreas: ["长期规划和日程管理", "情感表达和沟通", "团队合作和协作"],
      },
      ISTJ: {
        title: "注重现实的逻辑学家",
        subtitle: "可靠的实用主义者",
        strengths: [
          "系统和细致的任务处理",
          "强烈的责任感和可靠性",
          "稳定的绩效达成",
        ],
        growthAreas: ["创造性思维和创新", "情感表达和同理心", "适应变化的能力"],
      },
    },
    ru: {
      ENFP: {
        title: "Страстный Борец",
        subtitle: "Творческий и общительный свободолюбивый дух",
        strengths: [
          "Отличные коммуникативные и лидерские качества",
          "Творческое решение проблем",
          "Страстная и позитивная энергия",
        ],
        growthAreas: [
          "Уsasучшение концентрации на деталях",
          "Навыки долгосрочного планирования",
          "Последовательное исполнение",
        ],
      },
      ENFJ: {
        title: "Вдохновляющий Тренер",
        subtitle: "Харизматичный и вдохновляющий лидер",
        strengths: [
          "Способность понимать и мотивировать других",
          "Выдающиеся коммуникативные навыки",
          "Лидерство в организации команд",
        ],
        growthAreas: [
          "Забота о собственных нуждах",
          "Укрепление устойчивости к критике",
          "Управление перфекционистскими наклонностями",
        ],
      },
      ENTP: {
        title: "Новатор-Полемист",
        subtitle: "Новатор с сильным интеллектуальным любопытством",
        strengths: [
          "Генерация творческих идей",
          "Быстрое обучение и адаптивность",
          "Логический анализ и навыки ведения дебатов",
        ],
        growthAreas: [
          "Поддержание устойчивого внимания",
          "Способность выполнять рутинные задачи",
          "Развитие эмоциональной чуткости",
        ],
      },
      ENTJ: {
        title: "Смелый Командир",
        subtitle: "Прирожденный лидер и стратег",
        strengths: [
          "Сильное лидерство и решительность",
          "Стратегическое мышление и планирование",
          "Стремление к достижению целей",
        ],
        growthAreas: [
          "Учет эмоций других",
          "Развитие терпения и гибкости",
          "Внимание к деталям",
        ],
      },
      INFP: {
        title: "Идеалистичный Посредник",
        subtitle: "Индивидуалистичный и творческий идеалист",
        strengths: [
          "Глубокая эмпатия и понимание",
          "Творческое самовыражение и воображение",
          "Сильные ценности и убеждения",
        ],
        growthAreas: [
          "Постановка реалистичных целей",
          "Устойчивость к критике",
          "Улучшение напористости",
        ],
      },
      INFJ: {
        title: "Проницательный Активист",
        subtitle: "Мистический и интуитивный идеалист",
        strengths: [
          "Глубокое прозрение и интуиция",
          "Глубокое понимание других",
          "Вера в принципы и ценности",
        ],
        growthAreas: [
          "Навыки управления стрессом",
          "Восстановление социальной энергии",
          "Смягчение перфекционистских наклонностей",
        ],
      },
      INTP: {
        title: "Логичный Мыслитель",
        subtitle: "Мыслитель, наслаждающийся интеллектуальными изысканиями",
        strengths: [
          "Логический анализ и критическое мышление",
          "Разработка оригинальных идей",
          "Навыки решения сложных проблем",
        ],
        growthAreas: [
          "Эмоциональное самовыражение и межличностные навыки",
          "Исполнение и соблюдение сроков",
          "Навыки командной работы и сотрудничества",
        ],
      },
      INTJ: {
        title: "Стратегический Архитектор",
        subtitle: "Независимый и стратегический мыслитель",
        strengths: [
          "Долгосрочное видение и стратегическое мышление",
          "Независимое решение проблем",
          "Высокие стандарты и стремление к совершенству",
        ],
        growthAreas: [
          "Общение и сотрудничество с другими",
          "Учет эмоциональных аспектов",
          "Гибкость и адаптивность",
        ],
      },
      ESFP: {
        title: "Спонтанный Артист",
        subtitle: "Непосредственный и яркий исполнитель",
        strengths: [
          "Отличная общительность и дружелюбие",
          "Позитивная энергия, наслаждение настоящим",
          "Практическое решение проблем",
        ],
        growthAreas: [
          "Долгосрочное планирование",
          "Развитие критического мышления",
          "Ответственное принятие решений",
        ],
      },
      ESFJ: {
        title: "Общительный Консул",
        subtitle: "Заботливый и готовый к сотрудничеству помощник",
        strengths: [
          "Способность помогать и поддерживать других",
          "Поддержание гармоничных отношений",
          "Ответственное выполнение задач",
        ],
        growthAreas: [
          "Напористость и установление границ",
          "Адаптивность к изменениям",
          "Навыки критического мышления",
        ],
      },
      ESTP: {
        title: " предприимчивый Делец",
        subtitle: "Смелый и практичный реалист",
        strengths: [
          "Отличная адаптивность и гибкость",
          "Навыки практического решения проблем",
          "Энергичные действия",
        ],
        growthAreas: [
          "Долгосрочное планирование и терпение",
          "Детальный анализ и рефлексия",
          "Учет эмоций других",
        ],
      },
      ESTJ: {
        title: "Строгий Администратор",
        subtitle: "Организатор, ценящий традиции",
        strengths: [
          "Систематическое управление организацией",
          "Ответственное лидерство",
          "Эффективное выполнение задач",
        ],
        growthAreas: [
          "Творческое мышление и инновации",
          "Принятие разнообразия других",
          "Учет эмоциональных аспектов",
        ],
      },
      ISFP: {
        title: "Любопытный Художник",
        subtitle: "Гибкий и очаровательный творец",
        strengths: [
          "Художественная чувствительность и креативность",
          "Глубокое внимание к другим",
          "Открытое и восприимчивое отношение",
        ],
        growthAreas: [
          "Напористость и выражение мнений",
          "Постановка долгосрочных целей",
          "Преодоление конфликтных ситуаций",
        ],
      },
      ISFJ: {
        title: "Храбрый Защитник",
        subtitle: "Теплый и преданный покровитель",
        strengths: [
          "Тщательная забота и дух служения",
          "Стабильная и надежная личность",
          "Определение потребностей других",
        ],
        growthAreas: [
          "Выражение собственных потребностей",
          "Открытость к изменениям",
          "Управление стрессом",
        ],
      },
      ISTP: {
        title: "Универсальный Виртуоз",
        subtitle: "Смелый и практичный экспериментатор",
        strengths: [
          "Навыки практического решения проблем",
          "Отличное владение руками и технические навыки",
          "Способность справляться с кризисными ситуациями",
        ],
        growthAreas: [
          "Долгосрочное планирование и управление графиком",
          "Эмоциональное самовыражение и общение",
          "Командная работа и сотрудничество",
        ],
      },
      ISTJ: {
        title: "Реалистичный Логист",
        subtitle: "Надежный прагматик",
        strengths: [
          "Систематическое и тщательное выполнение задач",
          "Сильное чувство ответственности и надежность",
          "Стабильное достижение результатов",
        ],
        growthAreas: [
          "Творческое мышление и инновации",
          "Эмоциональное самовыражение и эмпатия",
          "Адаптивность к изменениям",
        ],
      },
    },
  };

  // Select the map for the correct language, defaulting to English if the language is not found.
  const langMap = (allTypeDetails as any)[lang] || allTypeDetails.en;
  // Select the details for the correct type, defaulting to INFP if the type is not found.
  const details = langMap[type] || langMap.INFP;

  return details;
}