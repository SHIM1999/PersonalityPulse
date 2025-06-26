export interface MBTIQuestionImproved {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
}

export const mbtiQuestionsImproved: MBTIQuestionImproved[] = [
  {
    id: 1,
    text: "새로운 사람들과 만나는 파티에 참석하게 되었을 때, 당신은 어떻게 행동하나요?",
    optionA: "적극적으로 새로운 사람들에게 다가가서 대화를 시작한다",
    optionB: "조용히 관찰하다가 누군가 먼저 말을 걸어주기를 기다린다",
    dimension: "EI"
  },
  {
    id: 2,
    text: "중요한 결정을 내릴 때, 당신은 주로 무엇을 더 고려하나요?",
    optionA: "논리적 분석과 객관적 사실",
    optionB: "감정과 타인에게 미치는 영향",
    dimension: "TF"
  },
  {
    id: 3,
    text: "새로운 프로젝트를 시작할 때, 당신의 접근 방식은?",
    optionA: "전체적인 큰 그림과 가능성을 먼저 고려한다",
    optionB: "구체적인 세부사항과 현실적 요소를 먼저 파악한다",
    dimension: "SN"
  },
  {
    id: 4,
    text: "일정 관리에 대한 당신의 스타일은?",
    optionA: "미리 계획을 세우고 일정에 맞춰 진행한다",
    optionB: "상황에 따라 유연하게 조정하며 진행한다",
    dimension: "JP"
  },
  {
    id: 5,
    text: "스트레스를 받을 때, 당신은 어떻게 에너지를 회복하나요?",
    optionA: "친구들과 만나서 이야기하고 활동적으로 시간을 보낸다",
    optionB: "혼자만의 시간을 가지며 조용히 휴식을 취한다",
    dimension: "EI"
  },
  {
    id: 6,
    text: "문제 해결 시, 당신이 더 중요하게 생각하는 것은?",
    optionA: "효율성과 합리성",
    optionB: "조화와 사람들의 감정",
    dimension: "TF"
  },
  {
    id: 7,
    text: "새로운 아이디어나 개념을 받아들일 때, 당신은?",
    optionA: "그것이 가져올 미래의 가능성에 흥미를 느낀다",
    optionB: "현재 상황에서의 실용성을 먼저 고려한다",
    dimension: "SN"
  },
  {
    id: 8,
    text: "업무나 과제를 진행할 때, 당신의 방식은?",
    optionA: "마감일을 정하고 체계적으로 완료한다",
    optionB: "영감이 올 때 집중적으로 진행한다",
    dimension: "JP"
  },
  {
    id: 9,
    text: "그룹 토론에서 당신의 역할은?",
    optionA: "적극적으로 의견을 제시하고 토론을 이끈다",
    optionB: "신중하게 듣고 필요할 때 의견을 말한다",
    dimension: "EI"
  },
  {
    id: 10,
    text: "갈등 상황에서 당신의 우선순위는?",
    optionA: "공정하고 논리적인 해결책 찾기",
    optionB: "관련된 모든 사람의 감정 고려하기",
    dimension: "TF"
  },
  {
    id: 11,
    text: "정보를 습득할 때, 당신이 선호하는 방식은?",
    optionA: "개념과 이론, 전체적인 맥락을 통해 이해한다",
    optionB: "구체적인 사실과 예시를 통해 이해한다",
    dimension: "SN"
  },
  {
    id: 12,
    text: "여행 계획을 세울 때, 당신의 스타일은?",
    optionA: "상세한 일정과 예약을 미리 완료한다",
    optionB: "대략적인 방향만 정하고 현지에서 즉흥적으로 결정한다",
    dimension: "JP"
  },
  {
    id: 13,
    text: "팀 프로젝트에서 당신의 선호하는 역할은?",
    optionA: "팀원들과 아이디어를 공유하며 함께 협력한다",
    optionB: "개별적으로 맡은 부분을 깊이 있게 연구한다",
    dimension: "EI"
  },
  {
    id: 14,
    text: "문제를 해결할 때, 당신이 먼저 고려하는 것은?",
    optionA: "가장 논리적이고 효율적인 해결책은 무엇인지",
    optionB: "이 결정이 다른 사람들에게 어떤 영향을 미칠지",
    dimension: "TF"
  },
  {
    id: 15,
    text: "새로운 환경에 적응할 때, 당신은?",
    optionA: "변화의 가능성과 새로운 기회에 흥미를 느낀다",
    optionB: "기존의 경험과 방법을 활용해 안정적으로 적응한다",
    dimension: "SN"
  },
  {
    id: 16,
    text: "약속이나 계획에 대한 당신의 태도는?",
    optionA: "정해진 시간과 약속을 철저히 지킨다",
    optionB: "상황에 따라 유연하게 조정할 수 있다고 생각한다",
    dimension: "JP"
  },
  {
    id: 17,
    text: "친구들과 시간을 보낼 때, 당신은?",
    optionA: "다양한 사람들과 활발하게 어울리는 것을 좋아한다",
    optionB: "소수의 가까운 친구들과 깊은 대화를 나누는 것을 선호한다",
    dimension: "EI"
  },
  {
    id: 18,
    text: "갈등이 생겼을 때, 당신의 우선순위는?",
    optionA: "객관적 사실에 기반해 공정하게 판단하기",
    optionB: "모든 사람이 상처받지 않도록 배려하며 해결하기",
    dimension: "TF"
  },
  {
    id: 19,
    text: "학습할 때, 당신이 선호하는 방식은?",
    optionA: "전체적인 개념을 이해한 후 세부사항을 파악한다",
    optionB: "구체적인 예시와 사실부터 차근차근 학습한다",
    dimension: "SN"
  },
  {
    id: 20,
    text: "주말 계획을 세울 때, 당신은?",
    optionA: "미리 계획을 세우고 예약까지 완료한다",
    optionB: "그때그때 기분에 따라 결정하는 편이다",
    dimension: "JP"
  }
];