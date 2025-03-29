
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Info } from 'lucide-react';

const SetAutopay: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSetAutopay = () => {
    // Show a success message before redirecting
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="p-4">
      <h2 className="mb-6">Set Up Autopay</h2>
      
      <div className="card-dark p-4 mb-6">
        <p className="mb-6">Use your UPI ID linked to your bank account to set up automatic monthly payments</p>
        
        <div className="p-4 border border-border rounded-lg mb-6">
          <h4 className="mb-2">Your UPI ID</h4>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center mr-3">
              <span className="text-sm">@</span>
            </div>
            <span className="font-medium">****1234</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="mb-3">Select UPI App</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-3 flex flex-col items-center opacity-50">
              <div className="w-12 h-12 bg-blue-500 rounded-full mb-2"></div>
              <span className="text-sm">GPay</span>
            </div>
            
            <div className="border border-border rounded-lg p-3 flex flex-col items-center opacity-50">
              <div className="w-12 h-12 bg-blue-600 rounded-full mb-2"></div>
              <span className="text-sm">Paytm</span>
            </div>
            
            <div className="border border-primary rounded-lg p-3 flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full mb-2"></div>
              <span className="text-sm">PhonePe</span>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/20 p-3 rounded-lg mb-6 flex items-start">
          <Info size={18} className="mr-2 mt-0.5 text-muted-foreground" />
          <p className="text-sm">By setting up autopay, you authorize InvestMate to debit your account every month. You can cancel anytime.</p>
        </div>
        
        <button onClick={handleSetAutopay} className="btn-primary w-full flex items-center justify-center">
          Set Autopay
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <Check size={18} className="mr-2 mt-0.5 text-accent" />
          <div>
            <h4 className="text-base">Secure</h4>
            <p className="text-sm text-muted-foreground">Industry-standard encryption for all UPI transactions</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Check size={18} className="mr-2 mt-0.5 text-accent" />
          <div>
            <h4 className="text-base">Flexible</h4>
            <p className="text-sm text-muted-foreground">Change or cancel your autopay anytime from the Dashboard</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Check size={18} className="mr-2 mt-0.5 text-accent" />
          <div>
            <h4 className="text-base">Convenient</h4>
            <p className="text-sm text-muted-foreground">Never miss an investment again with automated payments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetAutopay;
