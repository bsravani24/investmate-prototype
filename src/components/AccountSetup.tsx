
import React, { useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccountSetup: React.FC = () => {
  const navigate = useNavigate();
  const [panNumber, setPanNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/set-autopay');
  };

  return (
    <div className="p-4">
      <h2 className="mb-6">Account Setup</h2>
      
      <div className="card-dark p-4 mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <Info size={18} className="text-muted-foreground" />
          <p className="text-sm">Your information is secure and only used for SEBI verification</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">PAN Number</label>
              <input 
                type="text" 
                className="input-field w-full" 
                placeholder="ABCDE1234F"
                maxLength={10}
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Aadhar Number</label>
              <input 
                type="text" 
                className="input-field w-full" 
                placeholder="1234 5678 9012"
                maxLength={12}
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Bank Account Number</label>
              <input 
                type="text" 
                className="input-field w-full" 
                placeholder="Enter your account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Account Holder Name</label>
              <input 
                type="text" 
                className="input-field w-full" 
                placeholder="As per bank records"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center mt-6"
              disabled={!panNumber || !aadharNumber || !accountNumber || !holderName}
            >
              Next <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-muted/20 p-4 rounded-lg">
        <h4 className="mb-2">Why we need this information</h4>
        <p className="text-sm text-muted-foreground">As per SEBI regulations, all investment platforms need to verify your identity before you can start investing. Your data is encrypted and secure.</p>
      </div>
    </div>
  );
};

export default AccountSetup;
