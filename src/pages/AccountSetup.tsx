
import React from 'react';
import AccountSetup from '../components/AccountSetup';
import Navigation from '../components/Navigation';

const AccountSetupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <AccountSetup />
      <Navigation />
    </div>
  );
};

export default AccountSetupPage;
