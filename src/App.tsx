import React from 'react';
import { Toaster as ShadToaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from 'react-hot-toast';
import { useTheme } from '@/contexts/ThemeContext';
import AcademyApp from '@/AcademyApp';


function App() {
  const { theme } = useTheme();

  return (
      <div className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${theme}`}>
        <AcademyApp />
        <ShadToaster />
        <HotToaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
        />
      </div>
  );
}

export default App
