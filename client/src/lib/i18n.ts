export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
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
      detailedDesc: "강점과 성장 영역까지 포함된 완전한 분석"
    },
    
    // Photo Upload
    photoTitle: "사진 업로드",
    photoSubtitle: "AI 분석을 위한 사진을 업로드해주세요",
    uploadText: "사진을 드래그하거나 클릭하여 업로드",
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
    selectLanguage: "언어 선택"
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
      detailedDesc: "Complete analysis including strengths and growth areas"
    },
    
    // Photo Upload
    photoTitle: "Upload Photo",
    photoSubtitle: "Please upload a photo for AI analysis",
    uploadText: "Drag or click to upload photo",
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
    selectLanguage: "Select Language"
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
      aiDesc: "写真を通じた追加的な性格インサイト",
      detailed: "詳細レポート",
      detailedDesc: "強みと成長領域を含む完全な分析"
    },
    
    // Photo Upload
    photoTitle: "写真アップロード",
    photoSubtitle: "AI分析のための写真をアップロードしてください",
    uploadText: "写真をドラッグまたはクリックしてアップロード",
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
    selectLanguage: "言語選択"
  },
  
  zh: {
    // Landing Page
    landingTitle: "您的专属MBTI性格测试",
    landingSubtitle: "结合AI分析的精准性格测评",
    startTest: "开始测试",
    features: {
      accurate: "精准分析",
      accurateDesc: "40个精心设计的问题，更准确的结果",
      ai: "AI照片分析",
      aiDesc: "通过照片获得额外的性格洞察",
      detailed: "详细报告",
      detailedDesc: "包含优势和成长领域的完整分析"
    },
    
    // Photo Upload
    photoTitle: "上传照片",
    photoSubtitle: "请上传照片以进行AI分析",
    uploadText: "拖拽或点击上传照片",
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
    selectLanguage: "选择语言"
  }
};

export type TranslationKey = keyof typeof translations.ko;

export function useLanguage() {
  const getCurrentLanguage = (): string => {
    const saved = localStorage.getItem('mbti-language');
    if (saved && languages.some(lang => lang.code === saved)) {
      return saved;
    }
    // Auto-detect browser language
    const browserLang = navigator.language.split('-')[0];
    return languages.some(lang => lang.code === browserLang) ? browserLang : 'ko';
  };

  const setLanguage = (langCode: string) => {
    localStorage.setItem('mbti-language', langCode);
    window.location.reload(); // Simple reload for now
  };

  const t = (key: string): string => {
    const currentLang = getCurrentLanguage();
    const translation = translations[currentLang as keyof typeof translations];
    
    // Handle nested keys like "features.accurate"
    const keys = key.split('.');
    let value: any = translation;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return {
    currentLanguage: getCurrentLanguage(),
    setLanguage,
    t,
    languages
  };
}