
import React from 'react';
import Dashboard from '../components/Dashboard';
import Navigation from '../components/Navigation';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Dashboard />
      <Navigation />
    </div>
  );
};

export default DashboardPage;
