
import React from 'react';
import SetAutopay from '../components/SetAutopay';
import Navigation from '../components/Navigation';

const SetAutopayPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SetAutopay />
      <Navigation />
    </div>
  );
};

export default SetAutopayPage;
