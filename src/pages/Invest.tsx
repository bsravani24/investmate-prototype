
import React, { useState } from 'react';
import { PieChart, Sparkles, Settings } from 'lucide-react';
import Navigation from '../components/Navigation';
import InvestSelf from '../components/InvestSelf';
import AiSuggestions from '../components/AiSuggestions';
import SplitInvestment from '../components/SplitInvestment';
import { Button } from "@/components/ui/button";

type InvestmentTab = 'self' | 'ai' | 'split';

const Invest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<InvestmentTab>('self');

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <h2 className="mb-6">Invest</h2>
        
        <div className="bg-card rounded-lg mb-6 p-1 flex">
          <button
            className={`flex items-center justify-center space-x-2 flex-1 py-2 rounded-md text-sm ${
              activeTab === 'self' ? 'bg-primary text-white' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('self')}
          >
            <Settings size={16} />
            <span>By Yourself</span>
          </button>
          
          <button
            className={`flex items-center justify-center space-x-2 flex-1 py-2 rounded-md text-sm ${
              activeTab === 'ai' ? 'bg-primary text-white' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('ai')}
          >
            <Sparkles size={16} />
            <span>Ask AI</span>
          </button>
          
          <button
            className={`flex items-center justify-center space-x-2 flex-1 py-2 rounded-md text-sm ${
              activeTab === 'split' ? 'bg-primary text-white' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('split')}
          >
            <PieChart size={16} />
            <span>Split</span>
          </button>
        </div>
      </div>
      
      {activeTab === 'self' && <InvestSelf />}
      {activeTab === 'ai' && <AiSuggestions />}
      {activeTab === 'split' && <SplitInvestment />}
      
      <Navigation />
    </div>
  );
};

export default Invest;
