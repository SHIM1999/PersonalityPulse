import { MBTIResult } from "@shared/schema";

export function calculateMBTI(answers: Record<string, string>): MBTIResult {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  // Question to dimension mapping
  const questionDimensions: Record<number, 'EI' | 'SN' | 'TF' | 'JP'> = {
    1: 'EI', 2: 'TF', 3: 'SN', 4: 'JP',
    5: 'EI', 6: 'TF', 7: 'SN', 8: 'JP',
    9: 'EI', 10: 'TF', 11: 'SN', 12: 'JP'
  };

  // Count scores based on answers
  Object.entries(answers).forEach(([questionNum, answer]) => {
    const qNum = parseInt(questionNum);
    const dimension = questionDimensions[qNum];
    
    if (dimension === 'EI') {
      answer === 'A' ? scores.E++ : scores.I++;
    } else if (dimension === 'SN') {
      answer === 'A' ? scores.N++ : scores.S++;
    } else if (dimension === 'TF') {
      answer === 'A' ? scores.T++ : scores.F++;
    } else if (dimension === 'JP') {
      answer === 'A' ? scores.J++ : scores.P++;
    }
  });

  // Calculate percentages
  const dimensions = {
    EI: Math.round((scores.E / (scores.E + scores.I)) * 100),
    SN: Math.round((scores.N / (scores.N + scores.S)) * 100),
    TF: Math.round((scores.T / (scores.T + scores.F)) * 100),
    JP: Math.round((scores.J / (scores.J + scores.P)) * 100)
  };

  // Determine type
  const type = 
    (scores.E > scores.I ? 'E' : 'I') +
    (scores.N > scores.S ? 'N' : 'S') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P');

  // Get type details
  const typeDetails = getMBTITypeDetails(type);

  return {
    type,
    title: typeDetails.title,
    subtitle: typeDetails.subtitle,
    dimensions,
    strengths: typeDetails.strengths,
    growthAreas: typeDetails.growthAreas
  };
}

function getMBTITypeDetails(type: string) {
  const typeMap: Record<string, {title: string, subtitle: string, strengths: string[], growthAreas: string[]}> = {
    'ENFP': {
      title: '열정적인 활동가',
      subtitle: '창의적이고 사교적인 자유로운 영혼',
      strengths: ['뛰어난 소통 능력과 리더십', '창의적 문제 해결 능력', '열정적이고 긍정적인 에너지'],
      growthAreas: ['세부사항에 대한 집중력 향상', '장기적 계획 수립 능력', '일관성 있는 실행력']
    },
    'ENFJ': {
      title: '선도하는 교육자',
      subtitle: '카리스마 있고 영감을 주는 지도자',
      strengths: ['타인을 이해하고 동기부여하는 능력', '뛰어난 커뮤니케이션 스킬', '조직과 팀을 이끄는 리더십'],
      growthAreas: ['자신의 욕구도 챙기기', '비판에 대한 내성 키우기', '완벽주의 성향 조절']
    },
    'ENTP': {
      title: '독창적인 발명가',
      subtitle: '지적 호기심이 강한 혁신가',
      strengths: ['창의적 아이디어 생성', '빠른 학습과 적응력', '논리적 분석과 토론 능력'],
      growthAreas: ['지속적인 집중력 유지', '루틴한 업무 처리 능력', '감정적 배려심 개발']
    },
    'ENTJ': {
      title: '대담한 지휘관',
      subtitle: '천부적인 리더이자 전략가',
      strengths: ['강력한 리더십과 결단력', '전략적 사고와 계획 수립', '목표 달성을 위한 추진력'],
      growthAreas: ['타인의 감정 고려하기', '인내심과 유연성 기르기', '세부사항에 대한 관심']
    },
    'INFP': {
      title: '이상을 추구하는 중재자',
      subtitle: '개성 있고 창의적인 이상주의자',
      strengths: ['깊은 공감 능력과 이해심', '창의적 표현과 상상력', '강한 가치관과 신념'],
      growthAreas: ['현실적 목표 설정', '비판에 대한 내성', '자기 주장 능력 향상']
    },
    'INFJ': {
      title: '통찰력 있는 옹호자',
      subtitle: '신비롭고 직관적인 이상주의자',
      strengths: ['깊은 통찰력과 직관', '타인에 대한 깊은 이해', '원칙과 가치를 중시하는 신념'],
      growthAreas: ['스트레스 관리 능력', '사회적 에너지 충전', '완벽주의 성향 완화']
    },
    'INTP': {
      title: '논리적인 사색가',
      subtitle: '지적 탐구를 즐기는 사고가',
      strengths: ['논리적 분석과 비판적 사고', '독창적 아이디어 개발', '복잡한 문제 해결 능력'],
      growthAreas: ['감정 표현과 대인관계', '실행력과 마감 준수', '팀워크와 협업 능력']
    },
    'INTJ': {
      title: '용의주도한 건축가',
      subtitle: '독립적이고 전략적인 사고가',
      strengths: ['장기적 비전과 전략적 사고', '독립적 문제 해결 능력', '높은 기준과 완벽 추구'],
      growthAreas: ['타인과의 소통과 협력', '감정적 측면 고려', '유연성과 적응력']
    },
    'ESFP': {
      title: '자유로운 연예인',
      subtitle: '즉흥적이고 활기찬 엔터테이너',
      strengths: ['뛰어난 사교성과 친화력', '현재를 즐기는 긍정적 에너지', '실용적 문제 해결'],
      growthAreas: ['장기적 계획 수립', '비판적 사고 개발', '책임감 있는 의사결정']
    },
    'ESFJ': {
      title: '사교적인 외교관',
      subtitle: '배려심 많고 협력적인 조력자',
      strengths: ['타인을 돕고 지원하는 능력', '조화로운 관계 유지', '책임감 있는 업무 처리'],
      growthAreas: ['자기 주장과 경계 설정', '변화에 대한 적응력', '비판적 사고 능력']
    },
    'ESTP': {
      title: '모험을 즐기는 사업가',
      subtitle: '대담하고 실용적인 현실주의자',
      strengths: ['뛰어난 적응력과 유연성', '실무적 문제 해결 능력', '에너지 넘치는 행동력'],
      growthAreas: ['장기적 계획과 인내심', '세심한 분석과 성찰', '타인의 감정 고려']
    },
    'ESTJ': {
      title: '엄격한 관리자',
      subtitle: '전통을 중시하는 조직가',
      strengths: ['체계적인 조직 관리 능력', '책임감 있는 리더십', '효율적인 업무 처리'],
      growthAreas: ['창의적 사고와 혁신', '타인의 다양성 수용', '감정적 측면 고려']
    },
    'ISFP': {
      title: '호기심 많은 예술가',
      subtitle: '유연하고 매력적인 예술가',
      strengths: ['예술적 감성과 창의력', '타인에 대한 깊은 배려', '개방적이고 수용적인 태도'],
      growthAreas: ['자기 주장과 의견 표현', '장기적 목표 설정', '갈등 상황 대처']
    },
    'ISFJ': {
      title: '용감한 수호자',
      subtitle: '따뜻하고 헌신적인 보호자',
      strengths: ['세심한 배려와 봉사정신', '안정적이고 신뢰할 수 있는 성격', '타인의 필요 파악'],
      growthAreas: ['자기 욕구 표현', '변화에 대한 개방성', '스트레스 관리']
    },
    'ISTP': {
      title: '만능 재주꾼',
      subtitle: '대담하고 실용적인 실험가',
      strengths: ['실용적 문제 해결 능력', '뛰어난 손재주와 기술력', '위기 상황 대처 능력'],
      growthAreas: ['장기적 계획과 일정 관리', '감정 표현과 소통', '팀워크와 협업']
    },
    'ISTJ': {
      title: '현실주의 논리학자',
      subtitle: '신뢰할 수 있는 실용주의자',
      strengths: ['체계적이고 꼼꼼한 업무 처리', '강한 책임감과 신뢰성', '안정적인 성과 달성'],
      growthAreas: ['창의적 사고와 혁신', '감정 표현과 공감', '변화에 대한 적응력']
    }
  };

  return typeMap[type] || typeMap['ENFP'];
}
