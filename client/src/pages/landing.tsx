import { motion } from 'framer-motion';
import { Brain, Camera, Gamepad2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageSelector } from '@/components/language-selector';
import { useLanguage } from '@/lib/i18n';

interface LandingPageProps {
  onStartTest: () => void;
}

export default function LandingPage({ onStartTest }: LandingPageProps) {
  const { t } = useLanguage();
  const features = [
    {
      icon: Camera,
      title: 'AI 사진 분석',
      description: '얼굴 표정과 분위기를 분석하여 더 정확한 성격 유형을 찾아드립니다',
      gradient: 'from-primary to-secondary'
    },
    {
      icon: Gamepad2,
      title: '게임형 검사',
      description: '지루한 설문이 아닌, 재미있는 인터랙션으로 진행되는 성격 검사',
      gradient: 'from-accent to-primary'
    },
    {
      icon: TrendingUp,
      title: '심층 리포트',
      description: '개인 맞춤형 분석과 성장 방향을 제시하는 상세한 보고서',
      gradient: 'from-warning to-danger'
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      {/* Language Selector */}
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-32 h-32 mx-auto mb-6 rounded-full gradient-bg flex items-center justify-center"
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Brain className="text-white text-4xl" size={48} />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Personality
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ml-2">
              Quest
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            AI와 함께하는 혁신적인 MBTI 여정
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            당신의 사진과 답변을 통해 더 깊이 있는 성격 분석을 경험해보세요. 
            게임처럼 재미있고, 결과는 더욱 정확하게.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full shadow-lg card-hover">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="text-white text-xl" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            onClick={onStartTest}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary text-white px-12 py-4 text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            검사 시작하기
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
