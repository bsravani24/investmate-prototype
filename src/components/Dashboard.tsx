
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, BarChart, Bar, CartesianGrid, Legend } from 'recharts';
import { 
  ArrowUpRight, Award, BookOpen, TrendingUp, PieChart, 
  ChevronRight, Bell, AlertTriangle, PlayCircle, Settings, 
  Sparkles, BarChart3, ShieldCheck, HelpCircle, Calendar, BarChart2, LineChart as LineChartIcon, X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InvestmentData {
  name: string;
  amount: number;
  growth: string;
  isPositive: boolean;
}

const Dashboard: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [autoSwitch, setAutoSwitch] = useState(false);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [dateRange, setDateRange] = useState<'1W' | '1M' | '3M' | '6M' | '1Y' | 'All'>('1M');
  const [showSimulator, setShowSimulator] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [simulatorAmount, setSimulatorAmount] = useState<number>(1000);
  const [showSimulatorResults, setShowSimulatorResults] = useState<boolean>(false);

  // Generate date-based chart data based on selected range
  const generateChartData = () => {
    const getDate = (daysAgo: number) => {
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    switch(dateRange) {
      case '1W':
        return [
          { date: getDate(6), value: 10100 },
          { date: getDate(5), value: 10050 },
          { date: getDate(4), value: 10150 },
          { date: getDate(3), value: 10200 },
          { date: getDate(2), value: 10300 },
          { date: getDate(1), value: 10500 },
          { date: getDate(0), value: 10600 },
        ];
      case '1M':
        return [
          { date: getDate(30), value: 10000 },
          { date: getDate(25), value: 10150 },
          { date: getDate(20), value: 10250 },
          { date: getDate(15), value: 10400 },
          { date: getDate(10), value: 10550 },
          { date: getDate(5), value: 10750 },
          { date: getDate(0), value: 11200 },
        ];
      case '3M':
        return [
          { date: 'Jan', value: 9800 },
          { date: 'Feb', value: 10200 },
          { date: 'Mar', value: 10400 },
          { date: 'Apr', value: 11200 },
        ];
      case '6M':
        return [
          { date: 'Nov', value: 9500 },
          { date: 'Dec', value: 9800 },
          { date: 'Jan', value: 10000 },
          { date: 'Feb', value: 10200 },
          { date: 'Mar', value: 10400 },
          { date: 'Apr', value: 11200 },
        ];
      case '1Y':
        return [
          { date: 'May', value: 9200 },
          { date: 'Jul', value: 9400 },
          { date: 'Sep', value: 9600 },
          { date: 'Nov', value: 9800 },
          { date: 'Jan', value: 10200 },
          { date: 'Mar', value: 10600 },
          { date: 'Apr', value: 11200 },
        ];
      case 'All':
        return [
          { date: '2022', value: 8500 },
          { date: '2023-Q1', value: 9000 },
          { date: '2023-Q2', value: 9300 },
          { date: '2023-Q3', value: 9800 },
          { date: '2023-Q4', value: 10200 },
          { date: '2024-Q1', value: 10600 },
          { date: 'Current', value: 11200 },
        ];
      default:
        return [];
    }
  };
  
  const chartData = generateChartData();
  
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

  const pieData = [
    { name: 'Mutual Funds', value: 8800 },
    { name: 'Gold ETF', value: 2400 },
  ];
  
  const COLORS = ['#f97316', '#0ea5e9'];
  
  const trendingInsights = [
    {
      title: "Gold ETFs up 4% this week!",
      description: "Safe haven assets gaining momentum"
    },
    {
      title: "Top Performing Fund: Navi Large Cap Fund +6.2% this month",
      description: "Benefiting from IT sector rally"
    },
    {
      title: "Tech Stocks See a Dip: -3.1% Today",
      description: "Profit booking after recent rally"
    }
  ];

  const aiPerformance = {
    value: 3.5,
    isPositive: true,
    data: [2, 2.2, 2.5, 3, 3.2, 3.5]
  };

  const selfPerformance = {
    value: 2.2,
    isPositive: true,
    data: [1.5, 1.8, 2.0, 2.1, 2.2, 2.2]
  };

  const miniChartData = (data: number[]) => {
    return data.map((value, index) => ({ value, index }));
  };

  const activeRiskRules = [
    "If a fund drops by 3%, move to safer assets",
    "If portfolio losses exceed ₹5,000, shift 20% to Gold ETFs"
  ];

  const handleDateRangeChange = (range: '1W' | '1M' | '3M' | '6M' | '1Y' | 'All') => {
    setDateRange(range);
  };
  
  const handleOpenSimulator = () => {
    setShowSimulator(true);
  };

  const handleSimulatorAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAsset(e.target.value);
  };

  const handleSimulatorAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSimulatorAmount(parseInt(e.target.value));
  };

  const handleRunSimulation = () => {
    if (selectedAsset && simulatorAmount > 0) {
      setShowSimulatorResults(true);
    }
  };

  const handleCloseSimulator = () => {
    setShowSimulator(false);
    setShowSimulatorResults(false);
    setSelectedAsset("");
  };

  const getSimulatorReturnAmount = () => {
    // This would normally pull real data, using mock values for prototype
    switch (selectedAsset) {
      case "gold":
        return simulatorAmount * 1.004; // 0.4% gain
      case "mutual":
        return simulatorAmount * 1.012; // 1.2% gain
      case "nifty":
        return simulatorAmount * 1.008; // 0.8% gain
      default:
        return simulatorAmount;
    }
  };

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
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
      );
    } else {
      return (
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
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
          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    }
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

      {/* Trending Market Insights */}
      <div className="mb-6">
        <h3 className="mb-3">What's Happening in the Market?</h3>
        <div className="flex overflow-x-auto pb-2 space-x-3">
          {trendingInsights.map((insight, index) => (
            <div key={index} className="card-dark p-3 min-w-[250px]">
              <h4 className="text-md font-medium mb-1">{insight.title}</h4>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </div>
          ))}
          <div className="card-dark p-3 min-w-[200px] flex items-center justify-center">
            <button className="text-secondary flex items-center">
              Explore More Trends <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Portfolio Overview */}
        <div className="card-dark p-4">
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
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex space-x-2">
                <button 
                  onClick={() => setChartType('line')} 
                  className={`p-1.5 rounded ${chartType === 'line' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                >
                  <LineChartIcon size={16} />
                </button>
                <button 
                  onClick={() => setChartType('bar')} 
                  className={`p-1.5 rounded ${chartType === 'bar' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                >
                  <BarChart2 size={16} />
                </button>
              </div>
              
              <div className="flex bg-muted rounded-lg overflow-hidden">
                {(['1W', '1M', '3M', '6M', '1Y', 'All'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => handleDateRangeChange(range)}
                    className={`px-2 py-1 text-xs ${dateRange === range ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <HelpCircle size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Customize Chart</DropdownMenuItem>
                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                  <DropdownMenuItem>View Detailed Analytics</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
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

          <div className="mt-4 flex justify-center">
            <div className="w-24 h-24">
              <RPieChart width={100} height={100}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </RPieChart>
            </div>
          </div>

          <div className="flex justify-around text-sm text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[0] }}></div>
                <span className="ml-1">Mutual Funds</span>
              </div>
              <span className="font-medium">₹8,800</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[1] }}></div>
                <span className="ml-1">Gold ETF</span>
              </div>
              <span className="font-medium">₹2,400</span>
            </div>
          </div>

          <button className="w-full text-secondary flex items-center justify-center mt-4">
            View Portfolio Details <ChevronRight size={16} className="ml-1" />
          </button>
        </div>

        {/* AI vs Human Comparison */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="card-dark p-4">
              <div className="flex items-center mb-2">
                <Sparkles className="text-secondary mr-2" size={16} />
                <h4>AI Performance</h4>
              </div>
              <div className="flex items-center mb-3">
                <span className={`text-xl font-bold ${aiPerformance.isPositive ? 'text-accent' : 'text-destructive'}`}>
                  {aiPerformance.isPositive ? '+' : ''}{aiPerformance.value}%
                </span>
              </div>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={miniChartData(aiPerformance.data)}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {aiPerformance.value > selfPerformance.value && (
                <button className="w-full text-secondary text-sm flex items-center justify-center mt-2">
                  Try AI Investing <ChevronRight size={14} className="ml-1" />
                </button>
              )}
            </div>

            <div className="card-dark p-4">
              <div className="flex items-center mb-2">
                <Settings className="text-accent mr-2" size={16} />
                <h4>Your Investments</h4>
              </div>
              <div className="flex items-center mb-3">
                <span className={`text-xl font-bold ${selfPerformance.isPositive ? 'text-accent' : 'text-destructive'}`}>
                  {selfPerformance.isPositive ? '+' : ''}{selfPerformance.value}%
                </span>
              </div>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={miniChartData(selfPerformance.data)}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {aiPerformance.value <= selfPerformance.value && (
                <button className="w-full text-accent text-sm flex items-center justify-center mt-2">
                  Tweak AI Strategy <ChevronRight size={14} className="ml-1" />
                </button>
              )}
            </div>
          </div>

          {/* Risk Alerts */}
          <div className="card-dark p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <AlertTriangle className="text-primary mr-2" size={18} />
                <h4>Risk Management</h4>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  value="" 
                  className="sr-only peer" 
                  checked={autoSwitch}
                  onChange={() => setAutoSwitch(!autoSwitch)}
                />
                <div className="w-11 h-6 bg-muted/30 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            {autoSwitch ? (
              <div className="space-y-2">
                <p className="text-sm mb-2">Active Risk Rules:</p>
                {activeRiskRules.map((rule, index) => (
                  <div key={index} className="flex items-center text-sm p-2 bg-muted/20 rounded-lg">
                    <ShieldCheck size={16} className="text-accent mr-2" />
                    <span>{rule}</span>
                  </div>
                ))}
                <button className="w-full text-secondary text-sm flex items-center justify-center mt-2">
                  Edit Risk Settings <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-4">
                <p>No active risk management set</p>
                <p className="text-sm mt-2">Enable auto-switch to protect your investments from market volatility</p>
              </div>
            )}
          </div>

          {/* Investment Simulator & Video */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card-dark p-4">
              <div className="flex items-center mb-3">
                <PlayCircle className="text-primary mr-2" size={18} />
                <h4>Learn How It Works</h4>
              </div>
              <p className="text-sm mb-3">See how MicroInvestMate helps you build wealth step by step</p>
              <button className="w-full text-white bg-secondary py-2 rounded-lg flex items-center justify-center">
                Watch Now
              </button>
            </div>
            
            <div className="card-dark p-4">
              <div className="flex items-center mb-3">
                <BarChart3 className="text-secondary mr-2" size={18} />
                <h4>Investment Simulator</h4>
              </div>
              <p className="text-sm mb-3">Test strategies before investing real money</p>
              <button 
                onClick={handleOpenSimulator}
                className="w-full text-white bg-primary py-2 rounded-lg flex items-center justify-center"
              >
                Try Simulator
              </button>
            </div>
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
      
      {/* Investment Simulator Modal */}
      {showSimulator && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3>Investment Simulator</h3>
              <button onClick={handleCloseSimulator} className="text-muted-foreground">
                <X size={20} />
              </button>
            </div>
            
            {!showSimulatorResults ? (
              <div className="p-4">
                <p className="text-sm mb-4">
                  Try the simulator to see how your investment would have performed over the past 7 days in different assets.
                </p>
                
                <div className="mb-4">
                  <label className="block mb-2">Select Asset</label>
                  <select 
                    className="input-field w-full bg-background text-foreground"
                    value={selectedAsset}
                    onChange={handleSimulatorAssetChange}
                  >
                    <option value="">-- Select an asset --</option>
                    <option value="mutual">Mutual Funds</option>
                    <option value="gold">Gold ETF</option>
                    <option value="nifty">Nifty 50 Index Fund</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block mb-2">Investment Amount (₹)</label>
                  <input 
                    type="number" 
                    value={simulatorAmount} 
                    onChange={handleSimulatorAmountChange}
                    className="input-field w-full"
                    min="100"
                  />
                </div>
                
                <button 
                  onClick={handleRunSimulation}
                  disabled={!selectedAsset}
                  className="btn-primary w-full"
                >
                  Run Simulation
                </button>
              </div>
            ) : (
              <div className="p-4">
                <div className="bg-muted/20 p-3 rounded-lg mb-4">
                  <h4 className="mb-2">7-Day Performance Results</h4>
                  <div className="mb-2">
                    <p>Initial Investment: <span className="font-medium">₹{simulatorAmount}</span></p>
                    <p>Current Value: <span className="font-medium text-accent">₹{getSimulatorReturnAmount().toFixed(2)}</span></p>
                    <p>Return: <span className="font-medium text-accent">
                      +₹{(getSimulatorReturnAmount() - simulatorAmount).toFixed(2)} 
                      ({(((getSimulatorReturnAmount() - simulatorAmount) / simulatorAmount) * 100).toFixed(1)}%)
                    </span></p>
                  </div>
                  <div className="progress-bar mb-2">
                    <div className="progress-fill" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedAsset === 'gold' && "Gold has been stable with slight gains due to global economic uncertainty."}
                    {selectedAsset === 'mutual' && "Mutual funds performed well this week due to strong company earnings."}
                    {selectedAsset === 'nifty' && "The Nifty 50 index showed moderate growth on the back of positive market sentiment."}
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button onClick={() => setShowSimulatorResults(false)} className="flex-1 btn-secondary">Try Another</button>
                  <button onClick={() => navigate('/invest')} className="flex-1 btn-primary">Invest Now</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
