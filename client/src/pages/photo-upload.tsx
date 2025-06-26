import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CloudUpload, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/progress-bar';
import { useTestSession } from '@/hooks/use-test-session';
import { useToast } from '@/hooks/use-toast';

interface PhotoUploadProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PhotoUpload({ onNext, onBack }: PhotoUploadProps) {
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { uploadPhoto, isUploadingPhoto } = useTestSession();
  const { toast } = useToast();

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "오류",
        description: "이미지 파일만 업로드 가능합니다.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "오류", 
        description: "파일 크기는 5MB 이하여야 합니다.",
        variant: "destructive",
      });
      return;
    }

    setUploadedPhoto(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    uploadPhoto(file);
  }, [uploadPhoto, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const removePhoto = useCallback(() => {
    setUploadedPhoto(null);
    setPreviewUrl(null);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto w-full">
        <ProgressBar current={1} total={3} />

        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">사진으로 시작해보세요</h2>
          <p className="text-lg text-gray-600">
            AI가 당신의 표정과 분위기를 분석하여<br/>
            더 정확한 성격 유형을 찾아드립니다
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg mb-8">
            <CardContent className="p-8">
              {!previewUrl ? (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <CloudUpload className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">사진을 업로드하세요</h3>
                  <p className="text-gray-500 mb-4">드래그 앤 드롭하거나 클릭하여 선택</p>
                  <Button 
                    variant="outline"
                    disabled={isUploadingPhoto}
                  >
                    {isUploadingPhoto ? '업로드 중...' : '파일 선택'}
                  </Button>
                  <input 
                    id="file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </div>
              ) : (
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative inline-block">
                    <img 
                      src={previewUrl} 
                      alt="업로드된 사진" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                      onClick={removePhoto}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    사진이 성공적으로 업로드되었습니다!
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2" size={16} />
            이전
          </Button>
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-primary to-secondary"
          >
            다음
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
