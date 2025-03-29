
import React from 'react';
import { User, Settings, CreditCard, Lock, HelpCircle, LogOut } from 'lucide-react';
import Navigation from '../components/Navigation';

const Account: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <h2 className="mb-6">Account</h2>
        
        <div className="card-dark p-4 mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mr-4">
              <User size={32} className="text-muted-foreground" />
            </div>
            <div>
              <h3>Rahul Sharma</h3>
              <p className="text-sm text-muted-foreground">+91 9876543210</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <button className="card-dark p-4 flex items-center justify-between w-full text-left">
            <div className="flex items-center">
              <Settings className="text-primary mr-3" size={20} />
              <span>Profile Settings</span>
            </div>
            <span>→</span>
          </button>
          
          <button className="card-dark p-4 flex items-center justify-between w-full text-left">
            <div className="flex items-center">
              <CreditCard className="text-primary mr-3" size={20} />
              <span>Payment Methods</span>
            </div>
            <span>→</span>
          </button>
          
          <button className="card-dark p-4 flex items-center justify-between w-full text-left">
            <div className="flex items-center">
              <Lock className="text-primary mr-3" size={20} />
              <span>Security</span>
            </div>
            <span>→</span>
          </button>
        </div>
        
        <div className="card-dark p-4 mb-6">
          <h3 className="mb-4">About InvestMate</h3>
          
          <div className="space-y-3">
            <button className="flex items-center justify-between w-full text-left">
              <div className="flex items-center">
                <HelpCircle className="text-muted-foreground mr-3" size={20} />
                <span>Help & Support</span>
              </div>
              <span>→</span>
            </button>
            
            <button className="flex items-center justify-between w-full text-left">
              <div className="flex items-center">
                <Lock className="text-muted-foreground mr-3" size={20} />
                <span>Privacy Policy</span>
              </div>
              <span>→</span>
            </button>
            
            <button className="flex items-center justify-between w-full text-left">
              <div className="flex items-center">
                <Settings className="text-muted-foreground mr-3" size={20} />
                <span>Terms of Service</span>
              </div>
              <span>→</span>
            </button>
          </div>
        </div>
        
        <button className="flex items-center justify-center text-destructive w-full p-4">
          <LogOut size={20} className="mr-2" />
          <span>Sign Out</span>
        </button>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Account;
