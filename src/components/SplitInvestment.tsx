
import React, { useState, useEffect } from 'react';
import { ArrowRight, PieChart, Sparkles, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SplitInvestment: React.FC = () => {
  const navigate = useNavigate();
  const [aiAmount, setAiAmount] = useState<number>(500);
  const [selfAmount, setSelfAmount] = useState<number>(500);
  const [totalAmount, setTotalAmount] = useState<number>(1000);
  
  const handleAiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setAiAmount(value);
    setSelfAmount(totalAmount - value);
  };
  
  const handleSelfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setSelfAmount(value);
    setAiAmount(totalAmount - value);
  };

  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setTotalAmount(value);
    
    // Maintain the same proportion
    const aiProportion = aiAmount / (aiAmount + selfAmount);
    setAiAmount(Math.round(value * aiProportion));
    setSelfAmount(Math.round(value * (1 - aiProportion)));
  };

  useEffect(() => {
    // Make sure we correct for rounding errors
    if (aiAmount + selfAmount !== totalAmount) {
      const diff = totalAmount - (aiAmount + selfAmount);
      setAiAmount(aiAmount + diff);
    }
  }, [aiAmount, selfAmount, totalAmount]);

  const handleContinue = () => {
    navigate('/dashboard');
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
          <label className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Sparkles className="text-secondary mr-2" size={18} />
              AI Suggestions
            </div>
          </label>
          <div className="flex items-center">
            <span className="mr-2">₹</span>
            <input 
              type="number" 
              min="0" 
              max={totalAmount}
              value={aiAmount} 
              onChange={handleAiChange}
              className="input-field w-full"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Settings className="text-accent mr-2" size={18} />
              Your Choices
            </div>
          </label>
          <div className="flex items-center">
            <span className="mr-2">₹</span>
            <input 
              type="number" 
              min="0" 
              max={totalAmount}
              value={selfAmount} 
              onChange={handleSelfChange}
              className="input-field w-full"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <PieChart className="text-primary mr-2" size={18} />
              Total Investment
            </div>
          </label>
          <div className="flex items-center">
            <span className="mr-2">₹</span>
            <input 
              type="number" 
              min="100" 
              value={totalAmount} 
              onChange={handleTotalChange}
              className="input-field w-full"
            />
          </div>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-3 mb-6">
          <div className="flex w-full h-3 rounded-full overflow-hidden">
            <div 
              className="bg-secondary" 
              style={{ width: `${(aiAmount/totalAmount)*100}%` }}
            ></div>
            <div 
              className="bg-accent" 
              style={{ width: `${(selfAmount/totalAmount)*100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-secondary rounded-full mr-1"></div>
              <span>AI: ₹{aiAmount} ({Math.round((aiAmount/totalAmount)*100)}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-accent rounded-full mr-1"></div>
              <span>You: ₹{selfAmount} ({Math.round((selfAmount/totalAmount)*100)}%)</span>
            </div>
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
            <p className="text-sm mb-2">Recommended for beginners seeking stable growth with lower volatility.</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '70%' }}></div>
            </div>
            <div className="flex justify-end mt-2">
              <button className="text-secondary text-sm">Learn more about this fund</button>
            </div>
          </div>
          
          <div className="border border-border p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4>Digital India Fund</h4>
              <span className="text-accent">₹{Math.round(aiAmount * 0.3)}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">25% returns in last 3 years</p>
            <p className="text-sm mb-2">Focuses on technology sector with high growth potential in the Indian market.</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
            <div className="flex justify-end mt-2">
              <button className="text-secondary text-sm">Learn more about this fund</button>
            </div>
          </div>
          
          <div className="border border-border p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4>Sovereign Gold ETF</h4>
              <span className="text-accent">₹{Math.round(aiAmount * 0.3)}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">18% returns in last 3 years</p>
            <p className="text-sm mb-2">A safe hedge against market volatility backed by physical gold.</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '60%' }}></div>
            </div>
            <div className="flex justify-end mt-2">
              <button className="text-secondary text-sm">Learn more about this ETF</button>
            </div>
          </div>
        </div>
      </div>
      
      <button onClick={handleContinue} className="btn-primary w-full flex items-center justify-center">
        Continue <ArrowRight size={18} className="ml-2" />
      </button>
    </div>
  );
};

export default SplitInvestment;
