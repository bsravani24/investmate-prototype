
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [riskLevel, setRiskLevel] = useState<string>('moderate');
  const [investmentKnowledge, setInvestmentKnowledge] = useState<string>('beginner');
  
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP send
    setStep(2);
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate OTP verification
    setStep(3);
  };
  
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };
  
  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/learn');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handlePhoneSubmit} className="animate-fade-in">
            <h2 className="mb-6 text-center">Enter your phone number</h2>
            <div className="mb-6">
              <input
                type="tel"
                className="input-field w-full"
                placeholder="9876543210"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                required
              />
              <p className="text-sm text-muted-foreground mt-2">We'll send you a verification code</p>
            </div>
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center"
              disabled={phoneNumber.length !== 10}
            >
              Continue <ArrowRight size={18} className="ml-2" />
            </button>
          </form>
        );
      
      case 2:
        return (
          <form onSubmit={handleOtpSubmit} className="animate-fade-in">
            <h2 className="mb-6 text-center">Enter OTP</h2>
            <div className="mb-2">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                We've sent a verification code to {phoneNumber}
              </p>
              <div className="flex justify-between mb-6">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-lg rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                    value={otp[i] || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        const newOtp = otp.split('');
                        newOtp[i] = value;
                        setOtp(newOtp.join(''));
                        // Move to next input if a digit was entered
                        if (value && i < 5) {
                          const nextInput = e.target.nextElementSibling as HTMLInputElement;
                          if (nextInput) nextInput.focus();
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      // Move to previous input on backspace if current input is empty
                      if (e.key === 'Backspace' && !otp[i] && i > 0) {
                        const prevInput = e.currentTarget.previousElementSibling as HTMLInputElement;
                        if (prevInput) prevInput.focus();
                      }
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-center">
                <button type="button" className="text-secondary">Resend OTP</button>
              </p>
            </div>
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center mt-6"
              disabled={otp.length !== 6}
            >
              Verify <ArrowRight size={18} className="ml-2" />
            </button>
          </form>
        );
      
      case 3:
        return (
          <form onSubmit={handleNameSubmit} className="animate-fade-in">
            <h2 className="mb-6 text-center">What should we call you?</h2>
            <div className="mb-6">
              <input
                type="text"
                className="input-field w-full"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground mt-2">This will be used to personalize your experience</p>
            </div>
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center"
              disabled={!name.trim()}
            >
              Continue <ArrowRight size={18} className="ml-2" />
            </button>
          </form>
        );
        
      case 4:
        return (
          <form onSubmit={handleOnboardingSubmit} className="animate-fade-in">
            <h2 className="mb-6 text-center">Quick Onboarding</h2>
            
            <div className="mb-6">
              <h3 className="mb-3">Risk Level</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`p-3 rounded-lg border ${
                    riskLevel === 'conservative' ? 'bg-primary/20 border-primary' : 'border-border'
                  }`}
                  onClick={() => setRiskLevel('conservative')}
                >
                  <p className="font-medium mb-1">Conservative</p>
                  <p className="text-xs text-muted-foreground">Low risk, stable returns</p>
                </button>
                
                <button
                  type="button"
                  className={`p-3 rounded-lg border ${
                    riskLevel === 'moderate' ? 'bg-primary/20 border-primary' : 'border-border'
                  }`}
                  onClick={() => setRiskLevel('moderate')}
                >
                  <p className="font-medium mb-1">Moderate</p>
                  <p className="text-xs text-muted-foreground">Balanced approach</p>
                </button>
                
                <button
                  type="button"
                  className={`p-3 rounded-lg border ${
                    riskLevel === 'aggressive' ? 'bg-primary/20 border-primary' : 'border-border'
                  }`}
                  onClick={() => setRiskLevel('aggressive')}
                >
                  <p className="font-medium mb-1">Aggressive</p>
                  <p className="text-xs text-muted-foreground">High risk, high return</p>
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="mb-3">Investment Knowledge</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`p-3 rounded-lg border ${
                    investmentKnowledge === 'beginner' ? 'bg-primary/20 border-primary' : 'border-border'
                  }`}
                  onClick={() => setInvestmentKnowledge('beginner')}
                >
                  <p className="font-medium mb-1">Beginner</p>
                  <p className="text-xs text-muted-foreground">New to investing</p>
                </button>
                
                <button
                  type="button"
                  className={`p-3 rounded-lg border ${
                    investmentKnowledge === 'intermediate' ? 'bg-primary/20 border-primary' : 'border-border'
                  }`}
                  onClick={() => setInvestmentKnowledge('intermediate')}
                >
                  <p className="font-medium mb-1">Intermediate</p>
                  <p className="text-xs text-muted-foreground">Some experience</p>
                </button>
                
                <button
                  type="button"
                  className={`p-3 rounded-lg border ${
                    investmentKnowledge === 'expert' ? 'bg-primary/20 border-primary' : 'border-border'
                  }`}
                  onClick={() => setInvestmentKnowledge('expert')}
                >
                  <p className="font-medium mb-1">Expert</p>
                  <p className="text-xs text-muted-foreground">Experienced investor</p>
                </button>
              </div>
            </div>
            
            <button type="submit" className="btn-primary w-full">
              Get Started
            </button>
          </form>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-background">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {renderStep()}
      </div>
      
      {step > 1 && (
        <button 
          onClick={() => setStep(step - 1)} 
          className="mt-4 text-center w-full text-muted-foreground"
        >
          Back
        </button>
      )}
    </div>
  );
};

export default Signup;
