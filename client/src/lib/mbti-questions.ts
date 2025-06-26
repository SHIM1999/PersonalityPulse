export interface MBTIQuestion {
  id: number;
  text: string;
  options: {
    A: string;
    B: string;
  };
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
}

export const mbtiQuestions: MBTIQuestion[] = [
  {
    id: 1,
    text: "새로운 사람들과 만나는 파티에 참석하게 되었을 때, 당신은 어떻게 행동하나요?",
    options: {
      A: "적극적으로 새로운 사람들에게 다가가서 대화를 시작한다",
      B: "조용히 관찰하다가 누군가 먼저 말을 걸어주기를 기다린다"
    },
    dimension: "EI"
  },
  {
    id: 2,
    text: "중요한 결정을 내릴 때, 당신은 주로 무엇을 더 고려하나요?",
    options: {
      A: "논리적 분석과 객관적 사실",
      B: "감정과 타인에게 미치는 영향"
    },
    dimension: "TF"
  },
  {
    id: 3,
    text: "새로운 프로젝트를 시작할 때, 당신의 접근 방식은?",
    options: {
      A: "전체적인 큰 그림과 가능성을 먼저 고려한다",
      B: "구체적인 세부사항과 현실적 요소를 먼저 파악한다"
    },
    dimension: "SN"
  },
  {
    id: 4,
    text: "일정 관리에 대한 당신의 스타일은?",
    options: {
      A: "미리 계획을 세우고 일정에 맞춰 진행한다",
      B: "상황에 따라 유연하게 조정하며 진행한다"
    },
    dimension: "JP"
  },
  {
    id: 5,
    text: "스트레스를 받을 때, 당신은 어떻게 에너지를 회복하나요?",
    options: {
      A: "친구들과 만나서 이야기하고 활동적으로 시간을 보낸다",
      B: "혼자만의 시간을 가지며 조용히 휴식을 취한다"
    },
    dimension: "EI"
  },
  {
    id: 6,
    text: "문제 해결 시, 당신이 더 중요하게 생각하는 것은?",
    options: {
      A: "효율성과 합리성",
      B: "조화와 사람들의 감정"
    },
    dimension: "TF"
  },
  {
    id: 7,
    text: "새로운 아이디어나 개념을 받아들일 때, 당신은?",
    options: {
      A: "그것이 가져올 미래의 가능성에 흥미를 느낀다",
      B: "현재 상황에서의 실용성을 먼저 고려한다"
    },
    dimension: "SN"
  },
  {
    id: 8,
    text: "업무나 과제를 진행할 때, 당신의 방식은?",
    options: {
      A: "마감일을 정하고 체계적으로 완료한다",
      B: "영감이 올 때 집중적으로 진행한다"
    },
    dimension: "JP"
  },
  {
    id: 9,
    text: "그룹 토론에서 당신의 역할은?",
    options: {
      A: "적극적으로 의견을 제시하고 토론을 이끈다",
      B: "신중하게 듣고 필요할 때 의견을 말한다"
    },
    dimension: "EI"
  },
  {
    id: 10,
    text: "갈등 상황에서 당신의 우선순위는?",
    options: {
      A: "공정하고 논리적인 해결책 찾기",
      B: "관련된 모든 사람의 감정 고려하기"
    },
    dimension: "TF"
  },
  {
    id: 11,
    text: "정보를 습득할 때, 당신이 선호하는 방식은?",
    options: {
      A: "개념과 이론, 전체적인 맥락을 통해 이해한다",
      B: "구체적인 사실과 예시를 통해 이해한다"
    },
    dimension: "SN"
  },
  {
    id: 12,
    text: "여행 계획을 세울 때, 당신의 스타일은?",
    options: {
      A: "상세한 일정과 예약을 미리 완료한다",
      B: "대략적인 방향만 정하고 현지에서 즉흥적으로 결정한다"
    },
    dimension: "JP"
  }
];
