
import React, { useState } from 'react';
import { ArrowRight, PieChart, Sparkles, Settings } from 'lucide-react';

const SplitInvestment: React.FC = () => {
  const [aiAmount, setAiAmount] = useState<number>(500);
  const [selfAmount, setSelfAmount] = useState<number>(500);
  
  const handleAiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setAiAmount(value);
    setSelfAmount(1000 - value);
  };
  
  const handleSelfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSelfAmount(value);
    setAiAmount(1000 - value);
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <PieChart className="text-primary mr-2" size={24} />
        <h2>Split Investment</h2>
      </div>
      
      <div className="card-dark p-4 mb-6">
        <p className="mb-4">Allocate your funds between AI-managed investments and your own selections</p>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="flex items-center">
              <Sparkles className="text-secondary mr-2" size={18} />
              AI Suggestions
            </label>
            <span className="font-medium">₹{aiAmount}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            step="100"
            value={aiAmount} 
            onChange={handleAiChange}
            className="w-full mb-1"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹0</span>
            <span>₹1,000</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="flex items-center">
              <Settings className="text-accent mr-2" size={18} />
              Your Choices
            </label>
            <span className="font-medium">₹{selfAmount}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            step="100"
            value={selfAmount} 
            onChange={handleSelfChange}
            className="w-full mb-1"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹0</span>
            <span>₹1,000</span>
          </div>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-3 mb-6">
          <div className="flex justify-between mb-2">
            <span>Total Monthly Investment</span>
            <span className="font-medium">₹1,000</span>
          </div>
          <div className="flex w-full h-3 rounded-full overflow-hidden">
            <div 
              className="bg-secondary" 
              style={{ width: `${(aiAmount/1000)*100}%` }}
            ></div>
            <div 
              className="bg-accent" 
              style={{ width: `${(selfAmount/1000)*100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="card-dark p-4 mb-6">
        <h3 className="mb-4">AI Suggestions</h3>
        
        <div className="space-y-4">
          <div className="border border-border p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4>Bluechip Index Fund</h4>
              <span className="text-accent">₹{Math.round(aiAmount * 0.4)}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">30% returns in last 3 years</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '70%' }}></div>
            </div>
          </div>
          
          <div className="border border-border p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4>Digital India Fund</h4>
              <span className="text-accent">₹{Math.round(aiAmount * 0.3)}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">25% returns in last 3 years</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div className="border border-border p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4>Sovereign Gold ETF</h4>
              <span className="text-accent">₹{Math.round(aiAmount * 0.3)}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">18% returns in last 3 years</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <button className="btn-primary w-full flex items-center justify-center">
        Continue <ArrowRight size={18} className="ml-2" />
      </button>
    </div>
  );
};

export default SplitInvestment;
