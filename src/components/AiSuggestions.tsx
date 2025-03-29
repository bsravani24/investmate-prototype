
import React, { useState } from 'react';
import { Sparkles, Info, TrendingUp, Star, DollarSign } from 'lucide-react';

const AiSuggestions: React.FC = () => {
  const [riskLevel, setRiskLevel] = useState<number>(3);
  const [investmentAmount, setInvestmentAmount] = useState<number>(100);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedExplanation, setSelectedExplanation] = useState<string>("concise");
  const [virtualMoneyMode, setVirtualMoneyMode] = useState<boolean>(false);
  
  const handleRiskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRiskLevel(parseInt(e.target.value));
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentAmount(parseInt(e.target.value));
  };
  
  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleVirtualMoney = () => {
    setVirtualMoneyMode(true);
  };

  const handleRealMoney = () => {
    // Redirect to dashboard would go here
    window.location.href = '/dashboard';
  };

  return (
    <div className="p-4">
      {!showResults ? (
        <div className="animate-fade-in">
          <div className="flex items-center mb-6">
            <Sparkles className="text-primary mr-2" size={24} />
            <h2>AI Investment Suggestions</h2>
          </div>
          
          <div className="card-dark p-4 mb-4">
            <div className="mb-6">
              <label className="block mb-2">What's your risk tolerance?</label>
              <div className="mb-2">
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={riskLevel} 
                  onChange={handleRiskChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Conservative</span>
                <span className="text-right">Aggressive</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block mb-2">Your investment goal</label>
              <select className="input-field w-full bg-background text-foreground">
                <option>Save for short-term goals (1-3 years)</option>
                <option>Build long-term wealth (3+ years)</option>
                <option>Generate regular income</option>
                <option>Save for retirement</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block mb-2">Monthly investment amount (₹)</label>
              <div className="mb-2">
                <input 
                  type="range" 
                  min="1" 
                  max="200" 
                  value={investmentAmount} 
                  onChange={handleAmountChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">₹100</span>
                <span className="text-xl font-bold">₹{investmentAmount * 100}</span>
                <span className="text-sm">₹20,000</span>
              </div>
            </div>
          </div>
          
          <div className="card-dark p-4 mb-6">
            <h3 className="mb-4">Explanation Preference</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 p-2 rounded-lg border border-border cursor-pointer">
                <input 
                  type="radio" 
                  name="explanation" 
                  value="concise"
                  checked={selectedExplanation === "concise"}
                  onChange={() => setSelectedExplanation("concise")}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border ${selectedExplanation === "concise" ? 'bg-primary border-primary' : 'border-muted-foreground'}`}></div>
                <div>
                  <h4>Concise</h4>
                  <p className="text-sm text-muted-foreground">Just the basics, quick to read</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-2 p-2 rounded-lg border border-border cursor-pointer">
                <input 
                  type="radio" 
                  name="explanation" 
                  value="normal"
                  checked={selectedExplanation === "normal"}
                  onChange={() => setSelectedExplanation("normal")}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border ${selectedExplanation === "normal" ? 'bg-primary border-primary' : 'border-muted-foreground'}`}></div>
                <div>
                  <h4>Normal</h4>
                  <p className="text-sm text-muted-foreground">Balanced explanation with key details</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-2 p-2 rounded-lg border border-border cursor-pointer">
                <input 
                  type="radio" 
                  name="explanation" 
                  value="detailed"
                  checked={selectedExplanation === "detailed"}
                  onChange={() => setSelectedExplanation("detailed")}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border ${selectedExplanation === "detailed" ? 'bg-primary border-primary' : 'border-muted-foreground'}`}></div>
                <div>
                  <h4>Detailed</h4>
                  <p className="text-sm text-muted-foreground">Comprehensive explanation with background</p>
                </div>
              </label>
            </div>
          </div>
          
          <button onClick={handleSubmit} className="btn-primary w-full flex items-center justify-center">
            Get AI Suggestions <Sparkles size={18} className="ml-2" />
          </button>
        </div>
      ) : (
        <div className="animate-fade-in">
          <button 
            onClick={() => setShowResults(false)} 
            className="mb-4 flex items-center text-muted-foreground"
          >
            ← Back to preferences
          </button>
          
          <div className="mb-4">
            <h2 className="flex items-center mb-2">
              <Sparkles className="text-primary mr-2" size={24} />
              AI Suggestions
            </h2>
            <p className="text-muted-foreground">Based on your {riskLevel === 1 ? 'conservative' : riskLevel === 5 ? 'aggressive' : 'moderate'} risk profile</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="card-dark p-4">
              <div className="flex justify-between items-start mb-3">
                <h4>Bluechip Index Fund</h4>
                <div className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">Recommended</div>
              </div>
              <p className="text-sm mb-3">Tracks top 50 Indian companies with consistent performance and lower volatility.</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">3Y Returns: 15.8%</span>
                <button className="text-secondary">Know More</button>
              </div>
            </div>
            
            <div className="card-dark p-4">
              <div className="flex justify-between items-start mb-3">
                <h4>Balanced Advantage Fund</h4>
                <div className="bg-accent/20 text-accent px-2 py-1 rounded text-sm">Low Risk</div>
              </div>
              <p className="text-sm mb-3">Dynamically manages equity and debt allocation based on market conditions.</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">3Y Returns: 12.2%</span>
                <button className="text-secondary">Know More</button>
              </div>
            </div>
            
            <div className="card-dark p-4">
              <div className="flex justify-between items-start mb-3">
                <h4>Sovereign Gold Bond</h4>
                <div className="bg-secondary/20 text-secondary px-2 py-1 rounded text-sm">Trending</div>
              </div>
              <p className="text-sm mb-3">Government-backed gold investment with additional interest income.</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">3Y Returns: 9.6%</span>
                <button className="text-secondary">Know More</button>
              </div>
            </div>
          </div>
          
          {!virtualMoneyMode ? (
            <div className="card-dark p-4 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="text-accent" size={20} />
                <h3>Virtual Money Trial</h3>
              </div>
              
              <p className="mb-4">Not sure about investing real money yet? Try with ₹1,000 virtual funds to see how these suggestions would perform without any risk.</p>
              
              <div className="flex space-x-3">
                <button onClick={handleVirtualMoney} className="flex-1 btn-secondary">Try Virtual Money</button>
                <button onClick={handleRealMoney} className="flex-1 btn-primary">Use Real Money</button>
              </div>
            </div>
          ) : (
            <div className="card-dark p-4 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="text-accent" size={20} />
                <h3>Virtual Money Trial</h3>
              </div>
              
              <div className="bg-muted/20 p-3 rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">7-Day Performance</span>
                  <span className="text-accent">+₹28 (2.8%)</span>
                </div>
                <div className="progress-bar mb-2">
                  <div className="progress-fill" style={{ width: '74%' }}></div>
                </div>
                <p className="text-sm text-muted-foreground">Mainly driven by recovery in tech stocks and positive market sentiment.</p>
              </div>
              
              <p className="mb-4">Your virtual investment is performing well! Ready to invest with real money?</p>
              
              <button onClick={handleRealMoney} className="btn-primary w-full">Switch to Real Money</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AiSuggestions;
