export interface MBTIQuestionImproved {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
}

// 60개의 질문 풀 (각 차원별 15개씩)
export const mbtiQuestionPool: MBTIQuestionImproved[] = [
  // EI 차원 질문들 (15개)
  {
    id: 101,
    text: "새로운 사람들과 만나는 파티에 참석하게 되었을 때, 당신은 어떻게 행동하나요?",
    optionA: "적극적으로 새로운 사람들에게 다가가서 대화를 시작한다",
    optionB: "조용히 관찰하다가 누군가 먼저 말을 걸어주기를 기다린다",
    dimension: "EI"
  },
  {
    id: 102,
    text: "스트레스를 받을 때, 당신은 어떻게 에너지를 회복하나요?",
    optionA: "친구들과 만나서 이야기하고 활동적으로 시간을 보낸다",
    optionB: "혼자만의 시간을 가지며 조용히 휴식을 취한다",
    dimension: "EI"
  },
  {
    id: 103,
    text: "회의에서 당신의 모습은?",
    optionA: "적극적으로 의견을 제시하고 토론에 참여한다",
    optionB: "신중하게 듣고 필요할 때만 발언한다",
    dimension: "EI"
  },
  {
    id: 104,
    text: "새로운 환경에서 당신은?",
    optionA: "빠르게 사람들과 어울리며 활동적으로 참여한다",
    optionB: "천천히 환경을 파악하고 점진적으로 적응한다",
    dimension: "EI"
  },
  {
    id: 105,
    text: "주말에 선호하는 활동은?",
    optionA: "친구들과 만나서 외부 활동을 한다",
    optionB: "집에서 혼자만의 시간을 보낸다",
    dimension: "EI"
  },
  {
    id: 106,
    text: "그룹 프로젝트에서 당신의 역할은?",
    optionA: "적극적으로 아이디어를 제안하고 팀을 이끈다",
    optionB: "신중하게 계획을 세우고 뒤에서 지원한다",
    dimension: "EI"
  },
  {
    id: 107,
    text: "전화 통화에 대한 당신의 성향은?",
    optionA: "전화로 이야기하는 것을 즐긴다",
    optionB: "문자나 메신저를 더 선호한다",
    dimension: "EI"
  },
  {
    id: 108,
    text: "새로운 취미를 시작할 때?",
    optionA: "동호회나 클럽에 참여해서 함께 활동한다",
    optionB: "혼자서 차근차근 익혀나간다",
    dimension: "EI"
  },
  {
    id: 109,
    text: "어려운 문제에 직면했을 때?",
    optionA: "다른 사람들과 상의하며 해결책을 찾는다",
    optionB: "혼자 충분히 생각한 후 결정한다",
    dimension: "EI"
  },
  {
    id: 110,
    text: "학습할 때 당신이 선호하는 방식은?",
    optionA: "스터디 그룹이나 토론을 통해 학습한다",
    optionB: "혼자 집중해서 깊이 있게 학습한다",
    dimension: "EI"
  },
  {
    id: 111,
    text: "파티가 끝난 후 당신의 기분은?",
    optionA: "에너지가 충전되고 기분이 좋아진다",
    optionB: "피곤하지만 만족스럽다",
    dimension: "EI"
  },
  {
    id: 112,
    text: "새로운 직장에서의 첫날, 당신은?",
    optionA: "동료들에게 먼저 인사하고 자기소개를 한다",
    optionB: "업무에 집중하며 천천히 사람들과 알아간다",
    dimension: "EI"
  },
  {
    id: 113,
    text: "여행을 계획할 때?",
    optionA: "친구들과 함께 여행하는 것을 선호한다",
    optionB: "혼자만의 여행을 선호한다",
    dimension: "EI"
  },
  {
    id: 114,
    text: "생각을 정리할 때?",
    optionA: "누군가와 대화하며 생각을 정리한다",
    optionB: "혼자 조용히 생각하며 정리한다",
    dimension: "EI"
  },
  {
    id: 115,
    text: "새로운 아이디어가 떠올랐을 때?",
    optionA: "즉시 다른 사람들과 공유하고 피드백을 받는다",
    optionB: "충분히 구체화한 후에 공유한다",
    dimension: "EI"
  },

  // SN 차원 질문들 (15개)
  {
    id: 201,
    text: "새로운 프로젝트를 시작할 때, 당신의 접근 방식은?",
    optionA: "전체적인 큰 그림과 가능성을 먼저 고려한다",
    optionB: "구체적인 세부사항과 현실적 요소를 먼저 파악한다",
    dimension: "SN"
  },
  {
    id: 202,
    text: "새로운 아이디어나 개념을 받아들일 때, 당신은?",
    optionA: "그것이 가져올 미래의 가능성에 흥미를 느낀다",
    optionB: "현재 상황에서의 실용성을 먼저 고려한다",
    dimension: "SN"
  },
  {
    id: 203,
    text: "정보를 습득할 때, 당신이 선호하는 방식은?",
    optionA: "개념과 이론, 전체적인 맥락을 통해 이해한다",
    optionB: "구체적인 사실과 예시를 통해 이해한다",
    dimension: "SN"
  },
  {
    id: 204,
    text: "책을 읽을 때 당신은?",
    optionA: "숨겨진 의미나 상징을 찾으려고 한다",
    optionB: "명확하고 구체적인 정보에 집중한다",
    dimension: "SN"
  },
  {
    id: 205,
    text: "새로운 기술을 배울 때?",
    optionA: "전체적인 작동 원리를 먼저 이해하려고 한다",
    optionB: "단계별로 실습하며 익힌다",
    dimension: "SN"
  },
  {
    id: 206,
    text: "창작 활동을 할 때?",
    optionA: "독창적이고 혁신적인 아이디어를 추구한다",
    optionB: "전통적이고 검증된 방법을 선호한다",
    dimension: "SN"
  },
  {
    id: 207,
    text: "문제를 해결할 때?",
    optionA: "새로운 방법과 창의적 접근을 시도한다",
    optionB: "기존에 효과적이었던 방법을 활용한다",
    dimension: "SN"
  },
  {
    id: 208,
    text: "미래에 대해 생각할 때?",
    optionA: "무한한 가능성과 잠재력에 집중한다",
    optionB: "현실적이고 달성 가능한 목표에 집중한다",
    dimension: "SN"
  },
  {
    id: 209,
    text: "예술 작품을 감상할 때?",
    optionA: "작품이 담고 있는 깊은 의미를 탐구한다",
    optionB: "작품의 기법과 현실적 묘사에 주목한다",
    dimension: "SN"
  },
  {
    id: 210,
    text: "새로운 환경에 적응할 때?",
    optionA: "변화의 가능성과 새로운 기회에 흥미를 느낀다",
    optionB: "기존의 경험과 방법을 활용해 안정적으로 적응한다",
    dimension: "SN"
  },
  {
    id: 211,
    text: "일상에서 선호하는 것은?",
    optionA: "새로운 경험과 변화가 있는 일상",
    optionB: "예측 가능하고 안정적인 일상",
    dimension: "SN"
  },
  {
    id: 212,
    text: "설명할 때 당신의 방식은?",
    optionA: "비유와 은유를 사용해 개념적으로 설명한다",
    optionB: "구체적인 예시와 단계를 들어 설명한다",
    dimension: "SN"
  },
  {
    id: 213,
    text: "기억하는 방식은?",
    optionA: "전체적인 인상과 느낌으로 기억한다",
    optionB: "구체적인 세부사항과 순서로 기억한다",
    dimension: "SN"
  },
  {
    id: 214,
    text: "새로운 도시를 탐험할 때?",
    optionA: "특별하고 숨겨진 장소를 찾아다닌다",
    optionB: "유명하고 검증된 관광지를 방문한다",
    dimension: "SN"
  },
  {
    id: 215,
    text: "대화할 때 관심을 끄는 주제는?",
    optionA: "철학적이고 추상적인 주제",
    optionB: "현실적이고 구체적인 주제",
    dimension: "SN"
  },

  // TF 차원 질문들 (15개)
  {
    id: 301,
    text: "중요한 결정을 내릴 때, 당신은 주로 무엇을 더 고려하나요?",
    optionA: "논리적 분석과 객관적 사실",
    optionB: "감정과 타인에게 미치는 영향",
    dimension: "TF"
  },
  {
    id: 302,
    text: "문제 해결 시, 당신이 더 중요하게 생각하는 것은?",
    optionA: "효율성과 합리성",
    optionB: "조화와 사람들의 감정",
    dimension: "TF"
  },
  {
    id: 303,
    text: "갈등 상황에서 당신의 접근 방식은?",
    optionA: "객관적 사실과 논리로 해결하려 한다",
    optionB: "모든 사람의 감정을 고려해 조화롭게 해결하려 한다",
    dimension: "TF"
  },
  {
    id: 304,
    text: "비판을 받을 때 당신의 반응은?",
    optionA: "비판의 논리적 근거를 분석한다",
    optionB: "비판하는 사람의 의도와 감정을 파악한다",
    dimension: "TF"
  },
  {
    id: 305,
    text: "팀 프로젝트에서 중요하게 생각하는 것은?",
    optionA: "목표 달성과 성과",
    optionB: "팀원들 간의 화합과 만족도",
    dimension: "TF"
  },
  {
    id: 306,
    text: "친구가 고민을 털어놓을 때?",
    optionA: "구체적인 해결책을 제시한다",
    optionB: "공감하며 감정적 지지를 제공한다",
    dimension: "TF"
  },
  {
    id: 307,
    text: "영화를 선택할 때 기준은?",
    optionA: "스토리 구조와 연출 기법",
    optionB: "감동적인 스토리와 캐릭터의 감정",
    dimension: "TF"
  },
  {
    id: 308,
    text: "구매 결정을 할 때?",
    optionA: "가격, 성능, 효율성을 비교 분석한다",
    optionB: "브랜드 이미지와 개인적 만족도를 고려한다",
    dimension: "TF"
  },
  {
    id: 309,
    text: "타인을 평가할 때?",
    optionA: "능력과 성과를 객관적으로 평가한다",
    optionB: "노력과 의도를 이해하려고 노력한다",
    dimension: "TF"
  },
  {
    id: 310,
    text: "규칙에 대한 당신의 관점은?",
    optionA: "공정성과 일관성을 위해 규칙을 지켜야 한다",
    optionB: "상황과 사람에 따라 유연하게 적용해야 한다",
    dimension: "TF"
  },
  {
    id: 311,
    text: "직장에서 상사가 되었을 때?",
    optionA: "명확한 기준과 체계로 팀을 관리한다",
    optionB: "개인의 특성을 고려해 맞춤형으로 관리한다",
    dimension: "TF"
  },
  {
    id: 312,
    text: "실수를 했을 때 당신의 반응은?",
    optionA: "원인을 분석하고 개선 방안을 찾는다",
    optionB: "미안한 마음을 먼저 표현한다",
    dimension: "TF"
  },
  {
    id: 313,
    text: "토론할 때 당신의 스타일은?",
    optionA: "논리적 근거와 데이터로 주장한다",
    optionB: "상대방의 입장을 이해하려고 노력한다",
    dimension: "TF"
  },
  {
    id: 314,
    text: "성공을 측정하는 기준은?",
    optionA: "목표 달성도와 결과",
    optionB: "과정에서의 만족도와 성장",
    dimension: "TF"
  },
  {
    id: 315,
    text: "조직 개선을 위한 제안을 할 때?",
    optionA: "효율성과 생산성 향상에 초점을 둔다",
    optionB: "구성원들의 만족도와 복지를 우선시한다",
    dimension: "TF"
  },

  // JP 차원 질문들 (15개)
  {
    id: 401,
    text: "일정 관리에 대한 당신의 스타일은?",
    optionA: "미리 계획을 세우고 일정에 맞춰 진행한다",
    optionB: "상황에 따라 유연하게 조정하며 진행한다",
    dimension: "JP"
  },
  {
    id: 402,
    text: "여행을 계획할 때?",
    optionA: "세부 일정을 미리 정하고 예약한다",
    optionB: "대략적인 계획만 세우고 현지에서 결정한다",
    dimension: "JP"
  },
  {
    id: 403,
    text: "마감 기한이 있는 일을 할 때?",
    optionA: "미리미리 준비해서 여유있게 완료한다",
    optionB: "적당한 압박감을 느낄 때 집중해서 완료한다",
    dimension: "JP"
  },
  {
    id: 404,
    text: "방 정리에 대한 당신의 성향은?",
    optionA: "항상 깔끔하게 정리된 상태를 유지한다",
    optionB: "필요할 때만 정리하고 평소에는 어수선해도 괜찮다",
    dimension: "JP"
  },
  {
    id: 405,
    text: "쇼핑할 때 당신의 방식은?",
    optionA: "미리 목록을 만들고 계획적으로 구매한다",
    optionB: "둘러보다가 마음에 드는 것을 즉석에서 구매한다",
    dimension: "JP"
  },
  {
    id: 406,
    text: "새로운 취미를 시작할 때?",
    optionA: "체계적으로 계획을 세우고 단계별로 접근한다",
    optionB: "일단 시작해보고 하면서 배워나간다",
    dimension: "JP"
  },
  {
    id: 407,
    text: "하루 일과에 대한 선호는?",
    optionA: "규칙적이고 예측 가능한 루틴",
    optionB: "변화가 있고 유연한 일과",
    dimension: "JP"
  },
  {
    id: 408,
    text: "결정을 내릴 때?",
    optionA: "충분히 고민한 후 확실한 결정을 내린다",
    optionB: "가능한 한 오래 선택의 여지를 남겨둔다",
    dimension: "JP"
  },
  {
    id: 409,
    text: "업무 환경에서 선호하는 것은?",
    optionA: "명확한 지침과 구조화된 환경",
    optionB: "자율성과 유연성이 있는 환경",
    dimension: "JP"
  },
  {
    id: 410,
    text: "프로젝트를 진행할 때?",
    optionA: "전체 계획을 세우고 순서대로 진행한다",
    optionB: "상황에 맞춰 우선순위를 조정하며 진행한다",
    dimension: "JP"
  },
  {
    id: 411,
    text: "변화에 대한 당신의 반응은?",
    optionA: "변화를 미리 예상하고 준비한다",
    optionB: "변화를 받아들이고 적응해나간다",
    dimension: "JP"
  },
  {
    id: 412,
    text: "약속 시간에 대한 당신의 성향은?",
    optionA: "항상 정시에 도착하려고 노력한다",
    optionB: "대략적인 시간에 맞춰 도착한다",
    dimension: "JP"
  },
  {
    id: 413,
    text: "책상이나 작업 공간은?",
    optionA: "필요한 것들이 정해진 위치에 정리되어 있다",
    optionB: "자주 사용하는 것들이 손에 닿는 곳에 있다",
    dimension: "JP"
  },
  {
    id: 414,
    text: "새로운 정보를 받았을 때?",
    optionA: "즉시 체계적으로 정리하고 분류한다",
    optionB: "일단 받아들이고 필요할 때 활용한다",
    dimension: "JP"
  },
  {
    id: 415,
    text: "장기 목표에 대한 접근 방식은?",
    optionA: "구체적인 단계별 계획을 세워 체계적으로 달성한다",
    optionB: "큰 방향만 정하고 상황에 맞춰 유연하게 접근한다",
    dimension: "JP"
  }
];

// 40개 질문을 랜덤하게 선택하되 각 차원별로 균등하게 선택하는 함수
export function getRandomQuestions(): MBTIQuestionImproved[] {
  const dimensionGroups = {
    EI: mbtiQuestionPool.filter(q => q.dimension === 'EI'),
    SN: mbtiQuestionPool.filter(q => q.dimension === 'SN'),
    TF: mbtiQuestionPool.filter(q => q.dimension === 'TF'),
    JP: mbtiQuestionPool.filter(q => q.dimension === 'JP')
  };

  // 각 차원에서 10개씩 랜덤하게 선택
  const selectedQuestions: MBTIQuestionImproved[] = [];
  
  Object.values(dimensionGroups).forEach(questions => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    selectedQuestions.push(...shuffled.slice(0, 10));
  });

  // 전체 질문을 다시 섞어서 랜덤한 순서로 반환
  return selectedQuestions.sort(() => Math.random() - 0.5);
}