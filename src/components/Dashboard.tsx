
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Award, BookOpen, TrendingUp, PieChart, ChevronRight, Bell } from 'lucide-react';

interface InvestmentData {
  name: string;
  amount: number;
  growth: string;
  isPositive: boolean;
}

const Dashboard: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const chartData = [
    { month: 'Apr', value: 10000 },
    { month: 'May', value: 10200 },
    { month: 'Jun', value: 10150 },
    { month: 'Jul', value: 10400 },
    { month: 'Aug', value: 10600 },
    { month: 'Sep', value: 10900 },
    { month: 'Oct', value: 11200 },
  ];
  
  const investments: InvestmentData[] = [
    { 
      name: "Bluechip Index Fund", 
      amount: 5600, 
      growth: "12.4%", 
      isPositive: true 
    },
    { 
      name: "Digital India Fund", 
      amount: 3200, 
      growth: "9.6%", 
      isPositive: true 
    },
    { 
      name: "Sovereign Gold ETF", 
      amount: 2400, 
      growth: "-2.1%", 
      isPositive: false 
    },
  ];
  
  const totalInvestment = investments.reduce((total, inv) => total + inv.amount, 0);
  
  const learningProgress = 35; // Percentage completed
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2>Dashboard</h2>
        <div className="relative">
          <button 
            onClick={toggleNotifications}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 card-dark shadow-lg z-10 animate-fade-in">
              <div className="p-3 border-b border-border">
                <h4>Notifications</h4>
              </div>
              <div className="p-3 border-b border-border">
                <p className="text-sm font-medium">New lesson available!</p>
                <p className="text-xs text-muted-foreground">Learn about Tax-Saving Investments</p>
              </div>
              <div className="p-3 border-b border-border">
                <p className="text-sm font-medium">SIP payment successful</p>
                <p className="text-xs text-muted-foreground">₹1,000 invested on Oct 5</p>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium">Market update</p>
                <p className="text-xs text-muted-foreground">Nifty up by 1.2% today</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="card-dark p-4 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
            <h2 className="text-2xl font-bold">₹{totalInvestment.toLocaleString()}</h2>
          </div>
          <div className="bg-accent/20 text-accent px-2 py-1 rounded flex items-center">
            <ArrowUpRight size={16} className="mr-1" />
            <span>7.8%</span>
          </div>
        </div>
        
        <div className="h-40 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                hide={true}
                domain={['dataMin - 500', 'dataMax + 500']}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${value}`, 'Value']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--card-foreground))'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-muted/20 p-2 rounded-lg">
            <p className="text-sm text-muted-foreground">Invested</p>
            <p className="font-medium">₹10,000</p>
          </div>
          <div className="bg-muted/20 p-2 rounded-lg">
            <p className="text-sm text-muted-foreground">Returns</p>
            <p className="font-medium text-accent">+₹1,200</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3>Your Investments</h3>
          <PieChart size={20} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-3">
          {investments.map((inv, index) => (
            <div key={index} className="card-dark p-3">
              <div className="flex justify-between items-center mb-2">
                <h4>{inv.name}</h4>
                <span className={`${inv.isPositive ? 'text-accent' : 'text-destructive'}`}>
                  {inv.isPositive ? '+' : ''}{inv.growth}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current Value</span>
                <span>₹{inv.amount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card-dark p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <BookOpen size={20} className="mr-2 text-primary" />
            <h3>Learning Progress</h3>
          </div>
          <div className="text-sm text-muted-foreground">{learningProgress}% Complete</div>
        </div>
        
        <div className="progress-bar mb-4">
          <div className="progress-fill" style={{ width: `${learningProgress}%` }}></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Award size={16} className="mr-2 text-primary" />
            <span>2 Rewards Unlocked</span>
          </div>
          <button className="text-secondary flex items-center">
            Continue Learning <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="card-dark p-4 mb-6">
        <div className="flex items-center mb-3">
          <TrendingUp size={20} className="mr-2 text-primary" />
          <h3>Market Trends</h3>
        </div>
        
        <p className="text-sm mb-4">Based on your interests and investments</p>
        
        <div className="space-y-3">
          <div className="border border-border rounded-lg p-3">
            <p className="font-medium mb-1">Gold prices continue to rise</p>
            <p className="text-sm text-muted-foreground">Gold ETFs up by 3.2% this week due to global economic uncertainty</p>
          </div>
          
          <div className="border border-border rounded-lg p-3">
            <p className="font-medium mb-1">Tech sector correction</p>
            <p className="text-sm text-muted-foreground">Technology funds down by 1.5% after recent rally</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
