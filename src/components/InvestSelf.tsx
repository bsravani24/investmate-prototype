
import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Fund {
  id: number;
  name: string;
  returns: {
    oneYear: string;
    threeYear: string;
    fiveYear: string;
  };
  risk: string;
  category: string;
}

const InvestSelf: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("why");
  const [showNextSteps, setShowNextSteps] = useState(false);
  
  const funds: Fund[] = [
    {
      id: 1,
      name: "Navi Large and Midcap Fund",
      returns: {
        oneYear: "18.5%",
        threeYear: "25.2%",
        fiveYear: "17.8%"
      },
      risk: "Moderate",
      category: "Equity"
    },
    {
      id: 2,
      name: "Parag Parikh Flexi Cap Fund",
      returns: {
        oneYear: "16.2%",
        threeYear: "22.7%",
        fiveYear: "19.2%"
      },
      risk: "Moderate-High",
      category: "Equity"
    },
    {
      id: 3,
      name: "ICICI Prudential Technology Fund",
      returns: {
        oneYear: "21.6%",
        threeYear: "23.9%",
        fiveYear: "16.5%"
      },
      risk: "High",
      category: "Sector"
    }
  ];
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const handleContinue = () => {
    setShowNextSteps(true);
  };
  
  const handleStartInvesting = () => {
    navigate('/account-setup');
  };

  return (
    <div className="p-4">
      {!selectedFund && !showNextSteps && (
        <>
          <h2 className="mb-6">Mutual Funds</h2>
          <div className="flex items-center justify-between bg-card/10 p-3 rounded-lg mb-4">
            <span>Filtered by: 3Y Returns</span>
            <button className="text-sm text-secondary">Change</button>
          </div>
          
          <div className="space-y-4 mb-6">
            {funds.map((fund) => (
              <div 
                key={fund.id}
                className="card-dark p-4 cursor-pointer hover:opacity-90"
                onClick={() => setSelectedFund(fund)}
              >
                <h4 className="mb-2">{fund.name}</h4>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">3Y Returns</span>
                  <span className="text-accent">{fund.returns.threeYear}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Risk: {fund.risk}</span>
                  <span>{fund.category}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      {selectedFund && !showNextSteps && (
        <div className="animate-fade-in">
          <button 
            onClick={() => setSelectedFund(null)} 
            className="mb-4 flex items-center text-muted-foreground"
          >
            ← Back to funds
          </button>
          
          <div className="card-dark p-4 mb-4">
            <h3 className="mb-4">{selectedFund.name}</h3>
            
            <div className="flex justify-between mb-6">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">1Y</div>
                <div className="text-accent">{selectedFund.returns.oneYear}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">3Y</div>
                <div className="text-accent">{selectedFund.returns.threeYear}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">5Y</div>
                <div className="text-accent">{selectedFund.returns.fiveYear}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div 
                className="border border-border rounded-lg overflow-hidden"
                onClick={() => toggleSection("why")}
              >
                <div className="flex justify-between items-center p-3 cursor-pointer">
                  <h4>Why this fund?</h4>
                  {expandedSection === "why" ? <ChevronUp /> : <ChevronDown />}
                </div>
                
                {expandedSection === "why" && (
                  <div className="p-3 border-t border-border">
                    <p className="mb-2">This fund provides exposure to large and mid-cap stocks with consistent returns over 3 years.</p>
                    <p className="text-sm text-muted-foreground">The fund manager has over 15 years of experience and focuses on quality companies with strong growth potential.</p>
                  </div>
                )}
              </div>
              
              <div 
                className="border border-border rounded-lg overflow-hidden"
                onClick={() => toggleSection("calculator")}
              >
                <div className="flex justify-between items-center p-3 cursor-pointer">
                  <h4>Return Calculator</h4>
                  {expandedSection === "calculator" ? <ChevronUp /> : <ChevronDown />}
                </div>
                
                {expandedSection === "calculator" && (
                  <div className="p-3 border-t border-border">
                    <div className="mb-4">
                      <label className="block text-sm mb-2">Monthly Investment</label>
                      <input type="range" min="100" max="10000" step="100" defaultValue="1000" className="w-full" />
                      <div className="flex justify-between">
                        <span>₹100</span>
                        <span className="font-medium">₹1,000</span>
                        <span>₹10,000</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm mb-2">Time Period (Years)</label>
                      <input type="range" min="1" max="20" defaultValue="5" className="w-full" />
                      <div className="flex justify-between">
                        <span>1</span>
                        <span className="font-medium">5</span>
                        <span>20</span>
                      </div>
                    </div>
                    
                    <div className="bg-muted/20 p-3 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Invested Amount:</span>
                        <span>₹60,000</span>
                      </div>
                      <div className="flex justify-between text-accent font-medium">
                        <span>Expected Returns:</span>
                        <span>₹82,650</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className="border border-border rounded-lg overflow-hidden"
                onClick={() => toggleSection("holdings")}
              >
                <div className="flex justify-between items-center p-3 cursor-pointer">
                  <h4>Top Holdings</h4>
                  {expandedSection === "holdings" ? <ChevronUp /> : <ChevronDown />}
                </div>
                
                {expandedSection === "holdings" && (
                  <div className="p-3 border-t border-border">
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>HDFC Bank</span>
                        <span>8.2%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Reliance Industries</span>
                        <span>7.5%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Infosys</span>
                        <span>6.3%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>TCS</span>
                        <span>5.8%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>ICICI Bank</span>
                        <span>4.9%</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <button onClick={handleContinue} className="btn-primary w-full flex items-center justify-center">
                Continue <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showNextSteps && (
        <div className="animate-fade-in">
          <button 
            onClick={() => setShowNextSteps(false)} 
            className="mb-4 flex items-center text-muted-foreground"
          >
            ← Back to fund details
          </button>
          
          <div className="card-dark p-4 mb-6">
            <h3 className="mb-4">What's Next?</h3>
            
            <div className="mb-6">
              <div className="flex mb-4">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-4">1</div>
                <div>
                  <h4 className="mb-1">SEBI Verification</h4>
                  <p className="text-sm text-muted-foreground">Complete your PAN & Aadhar verification as per SEBI guidelines</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-4">2</div>
                <div>
                  <h4 className="mb-1">Set Up Auto-Invest</h4>
                  <p className="text-sm text-muted-foreground">Automate your investing journey with UPI Autopay</p>
                </div>
              </div>
            </div>
            
            <button onClick={handleStartInvesting} className="btn-primary w-full flex items-center justify-center">
              Start Investing <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestSelf;
