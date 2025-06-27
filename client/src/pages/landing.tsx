import { useState, useEffect } from "react";
import {
  Brain,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  Star,
  Circle,
  Triangle,
} from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/lib/i18n";

interface LandingPageProps {
  onStartTest: (username: string) => void;
}

export default function LandingPage({ onStartTest }: LandingPageProps) {
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleStartTest = () => {
    if (!username.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }
    setError("");
    onStartTest(username.trim());
  };

  const features = [
    {
      icon: Zap,
      title: t("features.accurate"),
      description: t("features.accurateDesc"),
      color: "from-blue-500 to-cyan-400",
      glowColor: "shadow-blue-500/30",
    },
    {
      icon: Sparkles,
      title: t("features.detailed"),
      description: t("features.detailedDesc"),
      color: "from-emerald-500 to-teal-400",
      glowColor: "shadow-emerald-500/30",
    },
    {
      icon: Target,
      title: t("features.accurate"),
      description: t("features.accurateDesc"),
      color: "from-purple-500 to-pink-600",
      glowColor: "shadow-purple-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${particle.speed + 3}s infinite ease-in-out`,
              animationDelay: `${particle.id * 0.2}s`,
            }}
          />
        ))}
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 text-purple-400/20 animate-spin-slow">
          <Circle size={60} />
        </div>
        <div className="absolute bottom-32 right-20 text-pink-400/20 animate-bounce">
          <Triangle size={40} />
        </div>
        <div className="absolute top-1/2 right-10 text-blue-400/20 animate-pulse">
          <Star size={50} />
        </div>
        {/* Interactive Mouse Trail */}
        <div
          className="absolute pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
        </div>
      </div>
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageSelector />
      </div>
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            {/* Animated Brain Icon */}
            <div
              className="relative mx-auto mb-8 group cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="w-40 h-40 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Pulsing Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                <div className="absolute inset-4 rounded-full border border-white/20 animate-pulse" />
                <Brain
                  className={`text-white relative z-10 transition-all duration-500 ${isHovering ? "scale-110 rotate-12" : ""}`}
                  size={64}
                />
              </div>
              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 text-yellow-400 animate-bounce">
                <Sparkles size={24} />
              </div>
              <div className="absolute -bottom-2 -left-6 text-cyan-400 animate-pulse">
                <Zap size={20} />
              </div>
            </div>
            {/* Title with Gradient Text */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
                {t("landingTitle")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t("landingSubtitle")}
            </p>
          </div>
          {/* Username Input Section */}
          <div className="mb-16">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="이름을 입력하세요"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-lg -z-10 opacity-0 focus-within:opacity-100 transition-opacity duration-300" />
            </div>
            {error && (
              <div className="text-red-400 mt-3 text-sm animate-shake">
                {error}
              </div>
            )}
          </div>
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                />
                {/* Icon */}
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 ${feature.glowColor} group-hover:shadow-2xl`}
                >
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          {/* CTA Button */}
          <div className="relative">
            <button
              onClick={handleStartTest}
              className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-3">
                {t("startTest")}
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  size={24}
                />
              </span>
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
            </button>
            {/* Button Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-xl opacity-30 -z-10 group-hover:opacity-50 transition-opacity duration-300" />
          </div>
        </div>
      </div>
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
