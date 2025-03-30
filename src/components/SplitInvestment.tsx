
import React, { useState, useEffect } from 'react';
import { ArrowRight, PieChart, Sparkles, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const SplitInvestment: React.FC = () => {
  const navigate = useNavigate();
  const [aiAmount, setAiAmount] = useState<number>(500);
  const [selfAmount, setSelfAmount] = useState<number>(500);
  const [totalAmount, setTotalAmount] = useState<number>(1000);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [aiThinking, setAiThinking] = useState<boolean>(false);
  const [expandedSuggestion, setExpandedSuggestion] = useState<number | null>(null);
  
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

  const handleConfirm = () => {
    setIsSubmitting(true);
    
    // Simulate AI thinking process
    setTimeout(() => {
      setIsSubmitting(false);
      setAiThinking(true);
      
      setTimeout(() => {
        setAiThinking(false);
      }, 3000);
    }, 500);
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };
  
  const toggleSuggestionDetails = (id: number) => {
    if (expandedSuggestion === id) {
      setExpandedSuggestion(null);
    } else {
      setExpandedSuggestion(id);
    }
  };

  const handleInvestYourChoices = () => {
    navigate('/invest?mode=self&amount=' + selfAmount);
  };

  return (
    <div className="p-4">
      {aiThinking ? (
        <div className="flex flex-col items-center justify-center h-[80vh] animate-fade-in">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={32} className="text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
          </div>
          <h3 className="text-center mb-4">AI is analyzing your investment split</h3>
          <div className="text-center text-muted-foreground max-w-xs">
            <p className="mb-2">Analyzing:</p>
            <p className="text-sm">
              Risk tolerance, investment allocation split, total investment amount, optimal diversification, time horizons (short & long-term), market conditions
            </p>
          </div>
        </div>
      ) : (
        <>
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
            
            {!isSubmitting ? (
              <Button 
                onClick={handleConfirm} 
                className="w-full"
                variant="secondary"
              >
                Confirm Split <ArrowRight size={18} className="ml-2" />
              </Button>
            ) : (
              <Button 
                disabled
                className="w-full" 
                variant="secondary"
              >
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                Processing...
              </Button>
            )}
          </div>
          
          <div className="card-dark p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="mb-0">AI Suggestions</h3>
              <button className="text-sm text-muted-foreground flex items-center">
                <Filter size={14} className="mr-1" />
                Filter
              </button>
            </div>
            
            <div className="space-y-4 max-h-72 overflow-y-auto scrollbar-thin pr-1">
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
                <div className="flex justify-between items-center mt-2">
                  <button 
                    className="text-secondary text-sm"
                    onClick={() => toggleSuggestionDetails(1)}
                  >
                    {expandedSuggestion === 1 ? 'Hide details' : 'Show details'} {expandedSuggestion === 1 ? <ChevronUp size={14} className="inline ml-1" /> : <ChevronDown size={14} className="inline ml-1" />}
                  </button>
                </div>
                
                {expandedSuggestion === 1 && (
                  <div className="mt-3 pt-3 border-t border-border animate-fade-in">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-muted/20 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">1Y Return</p>
                        <p className="text-sm font-medium">18.5%</p>
                      </div>
                      <div className="bg-muted/20 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">3Y Return</p>
                        <p className="text-sm font-medium">30.0%</p>
                      </div>
                      <div className="bg-muted/20 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">Risk Level</p>
                        <p className="text-sm font-medium">Moderate</p>
                      </div>
                      <div className="bg-muted/20 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">Min Investment</p>
                        <p className="text-sm font-medium">₹500</p>
                      </div>
                    </div>
                  </div>
                )}
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
                <div className="flex justify-between items-center mt-2">
                  <button 
                    className="text-secondary text-sm"
                    onClick={() => toggleSuggestionDetails(2)}
                  >
                    {expandedSuggestion === 2 ? 'Hide details' : 'Show details'} {expandedSuggestion === 2 ? <ChevronUp size={14} className="inline ml-1" /> : <ChevronDown size={14} className="inline ml-1" />}
                  </button>
                </div>
                
                {expandedSuggestion === 2 && (
                  <div className="mt-3 pt-3 border-t border-border animate-fade-in">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-muted/20 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">1Y Return</p>
                        <p className="text-sm font-medium">16.2%</p>
                      </div>
                      <div className="bg-muted/20 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">3Y Return</p>
                        <p className="text-sm font-medium">25.0%</p>
                      </div>
                      <div className="bg-muted/20 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">Risk Level</p>
                        <p className="text-sm font-medium">Moderate-High</p>
                      </div>
                      <div className="bg-muted/20 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">Min Investment</p>
                        <p className="text-sm font-medium">₹500</p>
                      </div>
                    </div>
                  </div>
                )}
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
                <div className="flex justify-between items-center mt-2">
                  <button 
                    className="text-secondary text-sm"
                    onClick={() => toggleSuggestionDetails(3)}
                  >
                    {expandedSuggestion === 3 ? 'Hide details' : 'Show details'} {expandedSuggestion === 3 ? <ChevronUp size={14} className="inline ml-1" /> : <ChevronDown size={14} className="inline ml-1" />}
                  </button>
                </div>
                
                {expandedSuggestion === 3 && (
                  <div className="mt-3 pt-3 border-t border-border animate-fade-in">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-muted/20 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">1Y Return</p>
                        <p className="text-sm font-medium">12.4%</p>
                      </div>
                      <div className="bg-muted/20 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">3Y Return</p>
                        <p className="text-sm font-medium">18.0%</p>
                      </div>
                      <div className="bg-muted/20 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">Risk Level</p>
                        <p className="text-sm font-medium">Low</p>
                      </div>
                      <div className="bg-muted/20 p-2 rounded-lg">
                        <p className="text-xs text-muted-foreground">Storage Fee</p>
                        <p className="text-sm font-medium">0.5%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4 mb-6">
            <button onClick={handleContinue} className="btn-primary w-full flex items-center justify-center">
              Continue <ArrowRight size={18} className="ml-2" />
            </button>
            
            <button onClick={handleInvestYourChoices} className="btn-secondary w-full flex items-center justify-center">
              Go to Invest on Your Choices (₹{selfAmount}) <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SplitInvestment;
