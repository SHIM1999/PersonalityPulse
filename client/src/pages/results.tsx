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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTestSession } from "@/hooks/use-test-session";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n";
import { HomeButton } from "@/components/home-button";
import { calculateMBTI } from "@/lib/mbti-calculator";

interface ResultsProps {
  onRetake: () => void;
  onHome: () => void;
  username: string;
}

// A small helper component for the dimension bars to keep the code clean
const DimensionBar = ({
  leftLabel,
  rightLabel,
  value,
}: {
  leftLabel: string;
  rightLabel: string;
  value: number;
}) => (
  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
    <span className="text-gray-700 font-medium text-right">{leftLabel}</span>
    <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-2.5 relative">
      <motion.div
        className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.5, type: "spring" }}
      />
    </div>
    <span className="text-gray-700 font-medium text-left">{rightLabel}</span>
  </div>
);

export default function Results({ onRetake, onHome, username }: ResultsProps) {
  const { session } = useTestSession();
  const { toast } = useToast();
  const { t } = useLanguage();

  if (!session?.result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">{t("loading")}...</h2>
        </div>
      </div>
    );
  }

  const { result } = session;
  const { type, title, subtitle, dimensions, strengths, growthAreas } = result;

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  };

  const shareToTwitter = () => {
    const shareText = t("shareOnTwitterText")
      .replace("{type}", type)
      .replace("{title}", title);
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText,
      )}&url=${url}`,
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: t("toastSuccessTitle"),
        description: t("toastSuccessDesc"),
      });
    } catch (error) {
      toast({
        title: t("toastErrorTitle"),
        description: t("toastErrorDesc"),
        variant: "destructive",
      });
    }
  };

  const downloadReport = () => {
    toast({
      title: t("toastWipTitle"),
      description: t("toastWipDesc"),
    });
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-16">
      <HomeButton onHome={onHome} />
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-4 text-lg font-semibold text-primary">
          {username && t("resultsForUser").replace("{username}", username)}
        </div>
        {/* Results Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <span className="text-white text-3xl font-bold">{type}</span>
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </motion.div>

        {/* Main Result Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Personality Dimensions Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">
                  {t("dimensions")}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-5 p-6">
                <DimensionBar
                  leftLabel={t("introversion")}
                  rightLabel={t("extroversion")}
                  value={dimensions.EI}
                />
                <DimensionBar
                  leftLabel={t("sensing")}
                  rightLabel={t("intuition")}
                  value={dimensions.SN}
                />
                <DimensionBar
                  leftLabel={t("thinking")}
                  rightLabel={t("feeling")}
                  value={100 - dimensions.TF}
                />
                <DimensionBar
                  leftLabel={t("judging")}
                  rightLabel={t("perceiving")}
                  value={100 - dimensions.JP}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Strengths Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center justify-center text-accent">
                  <Star className="mr-2" size={22} />
                  {t("strengths")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-gray-700">
                  {strengths.map((strength, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span>{strength}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Growth Areas Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center justify-center text-warning">
                <Lightbulb className="mr-2" size={22} />
                {t("growthAreas")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-2 text-gray-700 grid md:grid-cols-2 gap-x-6 gap-y-2">
                {growthAreas.map((area, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-warning rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span>{area}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Share & Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Social Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">
                  {t("shareTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center space-x-2 sm:space-x-4 flex-wrap gap-y-2">
                <Button
                  onClick={shareToFacebook}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Share2 className="mr-2" size={16} />
                  Facebook
                </Button>
                <Button
                  onClick={shareToTwitter}
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                >
                  <Share2 className="mr-2" size={16} />
                  Twitter
                </Button>
                <Button onClick={copyLink} variant="outline">
                  <Copy className="mr-2" size={16} />
                  {t("copyLink")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">
                  {t("actions")}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center space-x-2 sm:space-x-4">
                <Button onClick={onRetake} variant="outline" className="w-full">
                  <RotateCcw className="mr-2" size={16} />
                  {t("retake")}
                </Button>
                <Button
                  onClick={downloadReport}
                  className="bg-gradient-to-r from-primary to-secondary w-full"
                >
                  <Download className="mr-2" size={16} />
                  {t("downloadReport")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
