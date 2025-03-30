
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Add animation class after a slight delay
    const animationTimer = setTimeout(() => {
      setAnimate(true);
    }, 500);
    
    // Navigate to signup page after splash screen
    const navigationTimer = setTimeout(() => {
      navigate('/signup');
    }, 2500);
    
    return () => {
      clearTimeout(animationTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className={`transition-all duration-1000 ${animate ? 'scale-110 opacity-100' : 'opacity-0'}`}>
        <img 
          src="/lovable-uploads/f72e905c-580f-4fb8-bacc-c73d36692440.png" 
          alt="InvestMate Logo" 
          className="w-64 mx-auto mb-8"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' }}
        />
      </div>
      
      <div className={`text-center transition-all duration-1000 delay-500 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <p className="text-xl text-muted-foreground">
          Micro investing for India's macro dreams
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
