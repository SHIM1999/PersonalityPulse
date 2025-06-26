export interface MBTIQuestionImproved {
  id: number;
  text: string;
  optionA: string;
  optionB: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
}

export const mbtiQuestionsImproved: MBTIQuestionImproved[] = [
  // EI 차원 질문들 (10개)
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
    id: 5,
    text: "스트레스를 받을 때, 당신은 어떻게 에너지를 회복하나요?",
    optionA: "친구들과 만나서 이야기하고 활동적으로 시간을 보낸다",
    optionB: "혼자만의 시간을 가지며 조용히 휴식을 취한다",
    dimension: "EI"
  },
  {
    id: 9,
    text: "그룹 토론에서 당신의 역할은?",
    optionA: "적극적으로 의견을 제시하고 토론을 이끈다",
    optionB: "신중하게 듣고 필요할 때 의견을 말한다",
    dimension: "EI"
  },
  {
    id: 13,
    text: "팀 프로젝트에서 당신의 선호하는 역할은?",
    optionA: "팀원들과 아이디어를 공유하며 함께 협력한다",
    optionB: "개별적으로 맡은 부분을 깊이 있게 연구한다",
    dimension: "EI"
  },
  {
    id: 17,
    text: "친구들과 시간을 보낼 때, 당신은?",
    optionA: "다양한 사람들과 활발하게 어울리는 것을 좋아한다",
    optionB: "소수의 가까운 친구들과 깊은 대화를 나누는 것을 선호한다",
    dimension: "EI"
  },
  {
    id: 21,
    text: "회의나 발표에서 당신은?",
    optionA: "자신 있게 의견을 표현하고 질문을 던진다",
    optionB: "조용히 듣고 필요할 때만 발언한다",
    dimension: "EI"
  },
  {
    id: 25,
    text: "새로운 환경에서 당신은?",
    optionA: "빠르게 사람들과 친해지려고 노력한다",
    optionB: "시간을 두고 천천히 적응해 나간다",
    dimension: "EI"
  },
  {
    id: 29,
    text: "업무 중 브레이크 타임에 당신은?",
    optionA: "동료들과 대화하거나 함께 활동한다",
    optionB: "혼자 조용히 휴식을 취한다",
    dimension: "EI"
  },
  {
    id: 33,
    text: "문제가 생겼을 때 당신의 첫 반응은?",
    optionA: "주변 사람들과 상의하고 의견을 구한다",
    optionB: "먼저 혼자 생각해보고 정리한 후 행동한다",
    dimension: "EI"
  },
  {
    id: 37,
    text: "학습할 때 당신이 선호하는 방식은?",
    optionA: "스터디 그룹이나 토론을 통해 학습한다",
    optionB: "혼자 집중해서 깊이 있게 학습한다",
    dimension: "EI"
  },

  // SN 차원 질문들 (10개)
  {
    id: 3,
    text: "새로운 프로젝트를 시작할 때, 당신의 접근 방식은?",
    optionA: "전체적인 큰 그림과 가능성을 먼저 고려한다",
    optionB: "구체적인 세부사항과 현실적 요소를 먼저 파악한다",
    dimension: "SN"
  },
  {
    id: 7,
    text: "새로운 아이디어나 개념을 받아들일 때, 당신은?",
    optionA: "그것이 가져올 미래의 가능성에 흥미를 느낀다",
    optionB: "현재 상황에서의 실용성을 먼저 고려한다",
    dimension: "SN"
  },
  {
    id: 11,
    text: "정보를 습득할 때, 당신이 선호하는 방식은?",
    optionA: "개념과 이론, 전체적인 맥락을 통해 이해한다",
    optionB: "구체적인 사실과 예시를 통해 이해한다",
    dimension: "SN"
  },
  {
    id: 15,
    text: "새로운 환경에 적응할 때, 당신은?",
    optionA: "변화의 가능성과 새로운 기회에 흥미를 느낀다",
    optionB: "기존의 경험과 방법을 활용해 안정적으로 적응한다",
    dimension: "SN"
  },
  {
    id: 19,
    text: "학습할 때, 당신이 선호하는 방식은?",
    optionA: "전체적인 개념을 이해한 후 세부사항을 파악한다",
    optionB: "구체적인 예시와 사실부터 차근차근 학습한다",
    dimension: "SN"
  },
  {
    id: 23,
    text: "책을 읽을 때 당신은?",
    optionA: "숨겨진 의미나 상징을 찾으려고 한다",
    optionB: "명확하고 구체적인 정보에 집중한다",
    dimension: "SN"
  },
  {
    id: 27,
    text: "일을 계획할 때 당신은?",
    optionA: "혁신적이고 창의적인 방법을 찾으려고 한다",
    optionB: "검증된 방법과 경험을 바탕으로 계획한다",
    dimension: "SN"
  },
  {
    id: 31,
    text: "문제를 해결할 때 당신은?",
    optionA: "새로운 관점과 가능성을 탐색한다",
    optionB: "실제적이고 현실적인 해결책을 찾는다",
    dimension: "SN"
  },
  {
    id: 35,
    text: "대화할 때 당신은?",
    optionA: "추상적이고 개념적인 주제를 좋아한다",
    optionB: "구체적이고 실용적인 주제를 선호한다",
    dimension: "SN"
  },
  {
    id: 39,
    text: "미래를 생각할 때 당신은?",
    optionA: "무한한 가능성과 잠재력에 흥미를 느낀다",
    optionB: "현실적이고 달성 가능한 목표에 집중한다",
    dimension: "SN"
  },

  // TF 차원 질문들 (10개)
  {
    id: 2,
    text: "중요한 결정을 내릴 때, 당신은 주로 무엇을 더 고려하나요?",
    optionA: "논리적 분석과 객관적 사실",
    optionB: "감정과 타인에게 미치는 영향",
    dimension: "TF"
  },
  {
    id: 6,
    text: "문제 해결 시, 당신이 더 중요하게 생각하는 것은?",
    optionA: "효율성과 합리성",
    optionB: "조화와 사람들의 감정",
    dimension: "TF"
  },
  {
    id: 10,
    text: "갈등 상황에서 당신의 우선순위는?",
    optionA: "공정하고 논리적인 해결책 찾기",
    optionB: "관련된 모든 사람의 감정 고려하기",
    dimension: "TF"
  },
  {
    id: 14,
    text: "문제를 해결할 때, 당신이 먼저 고려하는 것은?",
    optionA: "가장 논리적이고 효율적인 해결책은 무엇인지",
    optionB: "이 결정이 다른 사람들에게 어떤 영향을 미칠지",
    dimension: "TF"
  },
  {
    id: 18,
    text: "갈등이 생겼을 때, 당신의 우선순위는?",
    optionA: "객관적 사실에 기반해 공정하게 판단하기",
    optionB: "모든 사람이 상처받지 않도록 배려하며 해결하기",
    dimension: "TF"
  },
  {
    id: 22,
    text: "팀에서 의견이 나뉠 때 당신은?",
    optionA: "데이터와 근거를 바탕으로 결정한다",
    optionB: "팀원들의 감정과 의견을 조율하려고 한다",
    dimension: "TF"
  },
  {
    id: 26,
    text: "비판을 받을 때 당신은?",
    optionA: "객관적으로 분석하고 개선점을 찾는다",
    optionB: "상대방의 의도와 감정을 먼저 생각한다",
    dimension: "TF"
  },
  {
    id: 30,
    text: "조언을 할 때 당신은?",
    optionA: "논리적이고 실용적인 해결책을 제시한다",
    optionB: "상대방의 감정을 공감하고 위로한다",
    dimension: "TF"
  },
  {
    id: 34,
    text: "업무에서 중요하게 생각하는 것은?",
    optionA: "정확성과 효율성",
    optionB: "팀워크와 협력",
    dimension: "TF"
  },
  {
    id: 38,
    text: "영화를 볼 때 당신이 끌리는 것은?",
    optionA: "논리적인 플롯과 현실적인 설정",
    optionB: "감동적인 스토리와 인물의 감정",
    dimension: "TF"
  },

  // JP 차원 질문들 (10개)
  {
    id: 4,
    text: "일정 관리에 대한 당신의 스타일은?",
    optionA: "미리 계획을 세우고 일정에 맞춰 진행한다",
    optionB: "상황에 따라 유연하게 조정하며 진행한다",
    dimension: "JP"
  },
  {
    id: 8,
    text: "업무나 과제를 진행할 때, 당신의 방식은?",
    optionA: "마감일을 정하고 체계적으로 완료한다",
    optionB: "영감이 올 때 집중적으로 진행한다",
    dimension: "JP"
  },
  {
    id: 12,
    text: "여행 계획을 세울 때, 당신의 스타일은?",
    optionA: "상세한 일정과 예약을 미리 완료한다",
    optionB: "대략적인 방향만 정하고 현지에서 즉흥적으로 결정한다",
    dimension: "JP"
  },
  {
    id: 16,
    text: "약속이나 계획에 대한 당신의 태도는?",
    optionA: "정해진 시간과 약속을 철저히 지킨다",
    optionB: "상황에 따라 유연하게 조정할 수 있다고 생각한다",
    dimension: "JP"
  },
  {
    id: 20,
    text: "주말 계획을 세울 때, 당신은?",
    optionA: "미리 계획을 세우고 예약까지 완료한다",
    optionB: "그때그때 기분에 따라 결정하는 편이다",
    dimension: "JP"
  },
  {
    id: 24,
    text: "방 정리에 대한 당신의 스타일은?",
    optionA: "정해진 자리에 모든 것을 정리정돈한다",
    optionB: "필요할 때 찾을 수 있을 정도로만 정리한다",
    dimension: "JP"
  },
  {
    id: 28,
    text: "쇼핑할 때 당신은?",
    optionA: "미리 목록을 만들고 계획적으로 구매한다",
    optionB: "둘러보면서 필요한 것이나 마음에 드는 것을 산다",
    dimension: "JP"
  },
  {
    id: 32,
    text: "프로젝트 마감이 다가올 때 당신은?",
    optionA: "미리미리 준비해서 여유 있게 완료한다",
    optionB: "마감 압박감을 느껴야 집중력이 높아진다",
    dimension: "JP"
  },
  {
    id: 36,
    text: "일상 루틴에 대해 당신은?",
    optionA: "규칙적인 생활 패턴을 유지하려고 한다",
    optionB: "그날그날 기분과 상황에 따라 달리한다",
    dimension: "JP"
  },
  {
    id: 40,
    text: "새로운 기회가 생겼을 때 당신은?",
    optionA: "신중하게 계획을 세운 후 결정한다",
    optionB: "직감을 믿고 빠르게 행동한다",
    dimension: "JP"
  }
];