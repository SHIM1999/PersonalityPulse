import { motion } from 'framer-motion';
import { Star, Lightbulb, Download, RotateCcw, Share2, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTestSession } from '@/hooks/use-test-session';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';
import { HomeButton } from '@/components/home-button';

interface ResultsProps {
  onRetake: () => void;
  onHome: () => void;
}

export default function Results({ onRetake, onHome }: ResultsProps) {
  const { session } = useTestSession();
  const { toast } = useToast();
  const { t } = useLanguage();

  if (!session?.result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">{t('loading')}</h2>
        </div>
      </div>
    );
  }

  const result = session.result;

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`나의 MBTI 결과: ${result.type} - ${result.title}! 당신도 테스트해보세요.`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "성공",
        description: "링크가 복사되었습니다!",
      });
    } catch (error) {
      toast({
        title: "오류",
        description: "링크 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const downloadReport = () => {
    toast({
      title: "준비 중",
      description: "PDF 리포트 다운로드 기능은 곧 제공될 예정입니다.",
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4 pt-16">
      <HomeButton onHome={onHome} />
      <div className="max-w-4xl mx-auto w-full">
        {/* Results Header with Photo */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
            {/* Photo Display */}
            {session.photoFile && session.photoFile instanceof File && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(session.photoFile)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}
            
            {/* MBTI Result Circle */}
            <motion.div 
              className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <span className="text-white text-2xl font-bold">{result.type}</span>
            </motion.div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {result.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {result.subtitle}
          </p>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Personality Traits */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6">성격 특성</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">외향성 (E)</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.dimensions.EI}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{result.dimensions.EI}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">직관형 (N)</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.dimensions.SN}%` }}
                          transition={{ duration: 1, delay: 0.6 }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{result.dimensions.SN}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">감정형 (F)</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${100 - result.dimensions.TF}%` }}
                          transition={{ duration: 1, delay: 0.7 }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{100 - result.dimensions.TF}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">인식형 (P)</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${100 - result.dimensions.JP}%` }}
                          transition={{ duration: 1, delay: 0.8 }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{100 - result.dimensions.JP}%</span>
                    </div>
                  </div>
                </div>

                {/* AI Photo Analysis */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6">AI 사진 분석</h3>
                  {result.aiAnalysis ? (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">AI</span>
                        </div>
                        <span className="font-semibold text-gray-800">AI 분석 결과</span>
                      </div>
                      <div className="space-y-3 text-sm text-gray-700">
                        {result.aiAnalysis.expressions.map((expression, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                            <span>{expression}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <p className="text-gray-500">사진이 업로드되지 않아 AI 분석을 수행하지 못했습니다.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Analysis */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-accent flex items-center">
                <Star className="mr-2" size={20} />
                주요 강점
              </h3>
              <ul className="space-y-2 text-gray-700">
                {result.strengths.map((strength, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2" />
                    <span>{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-warning flex items-center">
                <Lightbulb className="mr-2" size={20} />
                성장 포인트
              </h3>
              <ul className="space-y-2 text-gray-700">
                {result.growthAreas.map((area, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-warning rounded-full mr-3 mt-2" />
                    <span>{area}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Sharing */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="shadow-lg mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">결과 공유하기</h3>
              <div className="flex justify-center space-x-4 flex-wrap gap-2">
                <Button 
                  onClick={shareToFacebook}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="mr-2" size={16} />
                  Facebook
                </Button>
                <Button 
                  onClick={shareToTwitter}
                  className="bg-blue-400 hover:bg-blue-500"
                >
                  <ExternalLink className="mr-2" size={16} />
                  Twitter
                </Button>
                <Button 
                  onClick={copyLink}
                  variant="outline"
                >
                  <Copy className="mr-2" size={16} />
                  링크 복사
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button 
            onClick={onRetake}
            variant="outline"
            className="mr-4"
          >
            <RotateCcw className="mr-2" size={16} />
            다시 검사하기
          </Button>
          <Button 
            onClick={downloadReport}
            className="bg-gradient-to-r from-primary to-secondary"
          >
            <Download className="mr-2" size={16} />
            상세 리포트 다운로드
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
