import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HomeButtonProps {
  onHome: () => void;
}

export function HomeButton({ onHome }: HomeButtonProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button 
        onClick={onHome}
        variant="outline" 
        size="icon"
        className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-gray-200"
      >
        <Home className="h-5 w-5" />
      </Button>
    </div>
  );
}