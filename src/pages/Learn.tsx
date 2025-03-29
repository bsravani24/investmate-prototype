
import React, { useState } from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import LearningModule from '../components/LearningModule';
import Navigation from '../components/Navigation';

const Learn: React.FC = () => {
  const [showLearningModule, setShowLearningModule] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(true);
  const [skipLearning, setSkipLearning] = useState(false);

  const handleLearnClick = () => {
    setShowInitialPopup(false);
    setShowLearningModule(true);
  };

  const handleSkipClick = () => {
    setShowInitialPopup(false);
    setSkipLearning(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {showInitialPopup && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-50">
          <div className="card-dark w-full max-w-md p-6 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="text-primary mr-2" size={24} />
              <h2>Learning Hub</h2>
            </div>
            
            <p className="text-center mb-8">
              Want to learn and level up to unlock badges and insights as your rewards?
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleSkipClick}
                className="btn-secondary"
              >
                No, Skip
              </button>
              <button 
                onClick={handleLearnClick}
                className="btn-primary"
              >
                Let's Learn
              </button>
            </div>
          </div>
        </div>
      )}
      
      {skipLearning && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-50">
          <div className="card-dark w-full max-w-md p-6 animate-fade-in">
            <p className="text-center mb-6">Check the Investing tab</p>
            <button 
              onClick={() => setSkipLearning(false)}
              className="btn-primary w-full"
            >
              Got it
            </button>
          </div>
        </div>
      )}
      
      {showLearningModule && (
        <LearningModule onClose={() => setShowLearningModule(false)} />
      )}
      
      <div className="p-4 min-h-screen flex flex-col pb-20">
        <div className="flex items-center mb-6">
          <BookOpen className="text-primary mr-2" size={24} />
          <h2>Learning Hub</h2>
        </div>
        
        {!showLearningModule && !showInitialPopup && (
          <button 
            onClick={() => setShowLearningModule(true)}
            className="card-dark p-4 mb-6 text-left w-full"
          >
            <div className="flex items-center mb-2">
              <Sparkles className="text-primary mr-2" size={20} />
              <h3>Continue Learning</h3>
            </div>
            <p className="text-sm text-muted-foreground">Complete modules to unlock investment insights</p>
            <div className="mt-3 progress-bar">
              <div className="progress-fill" style={{ width: '35%' }}></div>
            </div>
          </button>
        )}
        
        <div className="card-dark p-4 mb-6">
          <h3 className="mb-4">Trending Articles</h3>
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-3">
              <h4 className="mb-2">Understanding SIP vs Lump Sum Investing</h4>
              <p className="text-sm text-muted-foreground mb-2">Learn which approach suits your financial goals</p>
              <button className="text-sm text-secondary">Read More</button>
            </div>
            
            <div className="border border-border rounded-lg p-3">
              <h4 className="mb-2">Tax-Efficient Investment Strategies</h4>
              <p className="text-sm text-muted-foreground mb-2">Maximize returns by minimizing tax impact</p>
              <button className="text-sm text-secondary">Read More</button>
            </div>
          </div>
        </div>
        
        <div className="card-dark p-4">
          <h3 className="mb-4">Investment Dictionary</h3>
          <div className="space-y-2">
            <div className="p-3 border border-border rounded-lg">
              <h4 className="font-medium">SIP (Systematic Investment Plan)</h4>
              <p className="text-sm text-muted-foreground">A method of investing a fixed amount regularly in mutual funds</p>
            </div>
            
            <div className="p-3 border border-border rounded-lg">
              <h4 className="font-medium">ETF (Exchange Traded Fund)</h4>
              <p className="text-sm text-muted-foreground">Investment fund traded on stock exchanges like individual stocks</p>
            </div>
            
            <div className="p-3 border border-border rounded-lg">
              <h4 className="font-medium">NAV (Net Asset Value)</h4>
              <p className="text-sm text-muted-foreground">The per-unit price of a mutual fund calculated daily</p>
            </div>
          </div>
          
          <button className="w-full text-center mt-4 text-secondary">
            View Full Dictionary
          </button>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Learn;
