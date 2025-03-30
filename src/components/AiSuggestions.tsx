
import React, { useState, useEffect } from 'react';
import { Sparkles, Info, TrendingUp, Star, DollarSign, Filter, Search, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const AiSuggestions: React.FC = () => {
  const navigate = useNavigate();
  const [riskLevel, setRiskLevel] = useState<number>(3);
  const [investmentAmount, setInvestmentAmount] = useState<number>(100);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedExplanation, setSelectedExplanation] = useState<string>("concise");
  const [virtualMoneyMode, setVirtualMoneyMode] = useState<boolean>(false);
  const [aiThinking, setAiThinking] = useState<boolean>(false);
  const [expandedSuggestion, setExpandedSuggestion] = useState<number | null>(null);
  
  // New suggested investments array
  const [suggestedInvestments, setSuggestedInvestments] = useState([
    {
      id: 1,
      name: "Bluechip Index Fund",
      tag: "Recommended",
      tagClass: "bg-primary/20 text-primary",
      description: "Tracks top 50 Indian companies with consistent performance and lower volatility.",
      returns: "15.8%",
      details: {
        "1Y Return": "12.4%",
        "3Y Return": "15.8%",
        "5Y Return": "18.2%",
        "Assets Under Management": "₹12,450 Cr",
        "Expense Ratio": "0.44%",
        "Risk Level": "Moderate",
        "Min Investment": "₹500"
      }
    },
    {
      id: 2,
      name: "Balanced Advantage Fund",
      tag: "Low Risk",
      tagClass: "bg-accent/20 text-accent",
      description: "Dynamically manages equity and debt allocation based on market conditions.",
      returns: "12.2%",
      details: {
        "1Y Return": "9.6%",
        "3Y Return": "12.2%",
        "5Y Return": "14.1%",
        "Assets Under Management": "₹8,240 Cr",
        "Expense Ratio": "0.52%",
        "Risk Level": "Low to Moderate",
        "Min Investment": "₹500"
      }
    },
    {
      id: 3,
      name: "Sovereign Gold Bond",
      tag: "Trending",
      tagClass: "bg-secondary/20 text-secondary",
      description: "Government-backed gold investment with additional interest income.",
      returns: "9.6%",
      details: {
        "1Y Return": "8.2%",
        "3Y Return": "9.6%",
        "5Y Return": "11.4%",
        "Interest Rate": "2.5% p.a.",
        "Tenure": "8 years",
        "Liquidity": "Secondary market trading",
        "Min Investment": "₹1,000"
      }
    },
    {
      id: 4,
      name: "Digital India Fund",
      tag: "High Growth",
      tagClass: "bg-orange-400/20 text-orange-400",
      description: "Focuses on technology and digital economy sectors with high growth potential.",
      returns: "19.4%",
      details: {
        "1Y Return": "16.8%",
        "3Y Return": "19.4%",
        "5Y Return": "22.6%",
        "Assets Under Management": "₹5,120 Cr",
        "Expense Ratio": "0.68%",
        "Risk Level": "High",
        "Min Investment": "₹500"
      }
    }
  ]);
  
  const handleRiskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRiskLevel(parseInt(e.target.value));
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentAmount(parseInt(e.target.value));
  };
  
  const handleSubmit = () => {
    setAiThinking(true);
    
    // Simulate AI thinking process
    setTimeout(() => {
      setAiThinking(false);
      setShowResults(true);
    }, 3000);
  };

  const handleVirtualMoney = () => {
    setVirtualMoneyMode(true);
  };

  const handleRealMoney = () => {
    navigate('/dashboard');
  };
  
  const replaceSuggestion = (id: number) => {
    const newSuggestions = [...suggestedInvestments];
    const index = newSuggestions.findIndex(item => item.id === id);
    
    // Replace with a new suggestion (in a real app, this would pull from an API)
    if (index !== -1) {
      newSuggestions[index] = {
        id: Math.random(), // Generate a new ID
        name: "Small Cap Growth Fund",
        tag: "High Risk",
        tagClass: "bg-destructive/20 text-destructive",
        description: "Invests in small companies with high growth potential but higher volatility.",
        returns: "22.6%",
        details: {
          "1Y Return": "18.4%",
          "3Y Return": "22.6%",
          "5Y Return": "25.8%",
          "Assets Under Management": "₹3,450 Cr",
          "Expense Ratio": "0.78%",
          "Risk Level": "High",
          "Min Investment": "₹500"
        }
      };
      
      setSuggestedInvestments(newSuggestions);
    }
  };
  
  const toggleSuggestionDetails = (id: number) => {
    if (expandedSuggestion === id) {
      setExpandedSuggestion(null);
    } else {
      setExpandedSuggestion(id);
    }
  };
  
  const handleInvestButtonClick = () => {
    // In a real app, this would pass selected investments to the next screen
    navigate('/invest');
  };

  return (
    <div className="p-4">
      {!showResults && !aiThinking ? (
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
      ) : aiThinking ? (
        <div className="flex flex-col items-center justify-center h-[80vh] animate-fade-in">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={32} className="text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
          </div>
          <h3 className="text-center mb-4">AI is analyzing your profile</h3>
          <div className="text-center text-muted-foreground max-w-xs">
            <p className="mb-2">Analyzing:</p>
            <ul className="text-sm space-y-1">
              <li>• Risk tolerance</li>
              <li>• Investment goals</li>
              <li>• Investment amount</li>
              <li>• Similar investor profiles</li>
              <li>• Time horizons (short & long-term)</li>
              <li>• Past investment performance</li>
              <li>• Diversification strategy</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <button 
            onClick={() => setShowResults(false)} 
            className="mb-4 flex items-center text-muted-foreground"
          >
            ← Back to preferences
          </button>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="flex items-center">
              <Sparkles className="text-primary mr-2" size={24} />
              AI Suggestions
            </h2>
            <button className="flex items-center text-muted-foreground">
              <Filter size={18} className="mr-1" />
              Filter
            </button>
          </div>
          <p className="text-muted-foreground mb-4">Based on your {riskLevel === 1 ? 'conservative' : riskLevel === 5 ? 'aggressive' : 'moderate'} risk profile</p>
          
          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
            {suggestedInvestments.map((item) => (
              <div key={item.id} className="card-dark p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4>{item.name}</h4>
                  <div className={`${item.tagClass} px-2 py-1 rounded text-sm`}>{item.tag}</div>
                </div>
                <p className="text-sm mb-3">{item.description}</p>
                
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-muted-foreground">3Y Returns: {item.returns}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toggleSuggestionDetails(item.id)}
                      className="text-secondary flex items-center"
                    >
                      Details {expandedSuggestion === item.id ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
                    </button>
                    <button className="text-accent bg-accent/10 rounded-full p-1">
                      <Check size={16} />
                    </button>
                    <button 
                      className="text-destructive bg-destructive/10 rounded-full p-1"
                      onClick={() => replaceSuggestion(item.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                
                {expandedSuggestion === item.id && (
                  <div className="mt-3 pt-3 border-t border-border animate-fade-in">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(item.details).map(([key, value]) => (
                        <div key={key} className="bg-muted/20 p-2 rounded-lg">
                          <p className="text-xs text-muted-foreground">{key}</p>
                          <p className="text-sm font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <button 
            onClick={handleInvestButtonClick} 
            className="btn-primary w-full flex items-center justify-center mb-6"
          >
            Let's Invest Your Money (₹{investmentAmount * 100}) <DollarSign size={18} className="ml-2" />
          </button>
          
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
