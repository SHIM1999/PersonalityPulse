import { motion } from "framer-motion";
import {
  Star,
  Lightbulb,
  Download,
  RotateCcw,
  Share2,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTestSession } from "@/hooks/use-test-session";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n";
import { HomeButton } from "@/components/home-button";

interface ResultsProps {
  onRetake: () => void;
  onHome: () => void;
  username: string;
}

export default function Results({ onRetake, onHome, username }: ResultsProps) {
  const { session } = useTestSession();
  const { toast } = useToast();
  const { t } = useLanguage();

  if (!session?.result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">{t("loading")}</h2>
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
    const text = encodeURIComponent(
      `나의 MBTI 결과: ${result.type} - ${result.title}! 당신도 테스트해보세요.`,
    );
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
        <div className="text-center mb-4 text-lg font-semibold text-primary">
          {username && `결과를 확인하세요, ${username}님!`}
        </div>
        {/* Results Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <span className="text-white text-2xl font-bold">{result.type}</span>
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {result.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8">{result.subtitle}</p>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg mb-8">
            <CardContent className="p-8">
              <div>
                {/* Personality Traits */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6">{t("dimensions")}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{t("extroversion")}</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.dimensions.EI}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">
                        {result.dimensions.EI}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{t("intuition")}</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.dimensions.SN}%` }}
                          transition={{ duration: 1, delay: 0.6 }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">
                        {result.dimensions.SN}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{t("feeling")}</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${100 - result.dimensions.TF}%` }}
                          transition={{ duration: 1, delay: 0.7 }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">
                        {100 - result.dimensions.TF}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{t("perceiving")}</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${100 - result.dimensions.JP}%` }}
                          transition={{ duration: 1, delay: 0.8 }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">
                        {100 - result.dimensions.JP}%
                      </span>
                    </div>
                  </div>
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
                {t("strengths")}
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
                {t("growthAreas")}
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
              <h3 className="text-xl font-semibold mb-4 text-center">
                {t("shareTitle")}
              </h3>
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
                <Button onClick={copyLink} variant="outline">
                  <Copy className="mr-2" size={16} />
                  {t("copyLink")}
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
          <Button onClick={onRetake} variant="outline" className="mr-4">
            <RotateCcw className="mr-2" size={16} />
            {t("retake")}
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
