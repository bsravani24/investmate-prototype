
import React, { useState } from 'react';
import { Play, CheckCircle, Award, TrendingUp, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Video {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

interface Quiz {
  id: number;
  question: string;
  options: string[];
}

interface Props {
  onClose: () => void;
}

const LearningModule: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([
    { id: 1, title: "Investment Basics for Beginners", duration: "2:30", completed: false },
    { id: 2, title: "Understanding Risk & Return", duration: "3:45", completed: false },
    { id: 3, title: "How Mutual Funds Work", duration: "4:15", completed: false },
    { id: 4, title: "Tax Benefits of Investments", duration: "2:50", completed: false },
  ]);
  
  const [quizzes] = useState<Quiz[]>([
    {
      id: 1,
      question: "What is the primary benefit of diversification?",
      options: [
        "Guaranteed returns", 
        "Risk reduction", 
        "Tax savings", 
        "Higher dividends"
      ],
    }
  ]);
  
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [rewardsUnlocked, setRewardsUnlocked] = useState(false);
  const [showTrendReward, setShowTrendReward] = useState(false);
  const [showSimulatorReward, setShowSimulatorReward] = useState(false);
  const [showAssetSelection, setShowAssetSelection] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [simulationAmount, setSimulationAmount] = useState<number>(1000);
  const [showSimulationResult, setShowSimulationResult] = useState(false);
  
  const handleVideoSelect = (video: Video) => {
    setCurrentVideo(video);
    setTimeout(() => {
      // Mark video as completed
      setVideos(videos.map(v => 
        v.id === video.id ? { ...v, completed: true } : v
      ));
      setShowQuiz(true);
    }, 2000); // Simulating video watching
  };
  
  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowQuizResult(true);
    
    // Always mark the answer as correct and unlock rewards
    setTimeout(() => {
      setRewardsUnlocked(true);
      setShowQuiz(false);
      setCurrentVideo(null);
    }, 1500);
  };
  
  const handleTrendReward = () => {
    setShowTrendReward(true);
  };
  
  const handleSimulatorReward = () => {
    setShowSimulatorReward(true);
  };
  
  const handleAssetSelect = (asset: string) => {
    setSelectedAsset(asset);
    setShowAssetSelection(false);
    setShowSimulationResult(true);
  };
  
  const startSimulation = () => {
    setShowAssetSelection(true);
  };
  
  const goToInvest = () => {
    onClose();
    navigate('/invest');
  };

  return (
    <div className="fixed inset-0 bg-background bg-opacity-95 z-50 p-6 overflow-y-auto">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl"
      >
        ✕
      </button>
      
      <div className="max-w-md mx-auto pt-10">
        <h2 className="text-center mb-6">Learning Hub</h2>
        
        {!currentVideo && !showTrendReward && !showSimulatorReward && !showAssetSelection && !showSimulationResult && (
          <>
            <div className="mb-6">
              <h3 className="mb-4">Bite-sized Videos</h3>
              <div className="space-y-3">
                {videos.map(video => (
                  <div 
                    key={video.id}
                    onClick={() => !video.completed && handleVideoSelect(video)}
                    className={`card-dark flex items-center justify-between p-4 ${!video.completed ? 'cursor-pointer hover:opacity-90' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      {video.completed ? (
                        <CheckCircle className="text-accent" size={24} />
                      ) : (
                        <Play className="text-primary" size={24} />
                      )}
                      <span>{video.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{video.duration}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="mb-4">Rewards</h3>
              <div className="space-y-3">
                <div 
                  className={`card-dark p-4 ${rewardsUnlocked ? 'cursor-pointer hover:opacity-90' : 'opacity-50'}`}
                  onClick={rewardsUnlocked ? handleTrendReward : undefined}
                >
                  <div className="flex items-center space-x-3">
                    <TrendingUp className={rewardsUnlocked ? "text-primary" : "text-muted-foreground"} size={24} />
                    <div>
                      <h4>Real-Time Investment Trends</h4>
                      <p className="text-sm text-muted-foreground">See what others are investing in</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`card-dark p-4 ${rewardsUnlocked ? 'cursor-pointer hover:opacity-90' : 'opacity-50'}`}
                  onClick={rewardsUnlocked ? handleSimulatorReward : undefined}
                >
                  <div className="flex items-center space-x-3">
                    <DollarSign className={rewardsUnlocked ? "text-accent" : "text-muted-foreground"} size={24} />
                    <div>
                      <h4>7-Day Investment Simulator</h4>
                      <p className="text-sm text-muted-foreground">Try simulator to check your preferred assets value over past 7 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {currentVideo && (
          <div className="mb-6 animate-fade-in">
            <div className="card-dark p-4 mb-4">
              <h3 className="mb-2">{currentVideo.title}</h3>
              <div className="aspect-video bg-black/30 rounded-lg flex items-center justify-center mb-3">
                <Play size={48} className="text-muted-foreground" />
              </div>
              <div className="flex justify-between items-center">
                <span>Duration: {currentVideo.duration}</span>
                <CheckCircle className="text-accent" size={20} />
              </div>
            </div>
          </div>
        )}
        
        {showQuiz && (
          <div className="animate-fade-in">
            <div className="card-dark p-4 mb-4">
              <h3 className="mb-4">Quick Quiz</h3>
              <p className="mb-6">{quizzes[0].question}</p>
              
              <div className="space-y-3 mb-4">
                {quizzes[0].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showQuizResult}
                    className={`w-full text-left p-3 rounded-lg border ${
                      selectedAnswer === index 
                        ? 'bg-accent/20 border-accent'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {showQuizResult && (
                <div className="p-3 rounded-lg bg-accent/20 text-accent">
                  Correct! You earned a reward.
                </div>
              )}
            </div>
          </div>
        )}
        
        {showTrendReward && (
          <div className="animate-fade-in">
            <div className="card-dark p-4 mb-4">
              <h3 className="mb-4 flex items-center"><TrendingUp className="mr-2 text-primary" size={24} /> Investment Trend</h3>
              <div className="p-4 bg-muted/20 rounded-lg mb-6">
                <p className="font-medium mb-2">Did you know?</p>
                <p>60% of new investors chose Gold ETFs this week.</p>
              </div>
              
              <button onClick={goToInvest} className="btn-primary w-full">
                Would you like to invest?
              </button>
            </div>
            <button onClick={() => setShowTrendReward(false)} className="w-full text-center p-2">
              Back to Learning
            </button>
          </div>
        )}
        
        {showSimulatorReward && !showAssetSelection && !showSimulationResult && (
          <div className="animate-fade-in">
            <div className="card-dark p-4 mb-4">
              <h3 className="mb-4 flex items-center"><DollarSign className="mr-2 text-accent" size={24} /> Investment Simulator</h3>
              <p className="mb-4">Try the simulator to understand how your money may have performed over the past 7 days in different assets.</p>
              <button onClick={startSimulation} className="btn-primary w-full">
                Try Simulator
              </button>
            </div>
            <button onClick={() => setShowSimulatorReward(false)} className="w-full text-center p-2">
              Back to Learning
            </button>
          </div>
        )}
        
        {showAssetSelection && (
          <div className="animate-fade-in">
            <div className="card-dark p-4 mb-4">
              <h3 className="mb-4">Select an Asset</h3>
              <div className="space-y-3 mb-4">
                <button
                  onClick={() => handleAssetSelect("Mutual Funds")}
                  className="w-full text-left p-3 rounded-lg border border-border hover:border-primary"
                >
                  <h4>Mutual Funds</h4>
                  <p className="text-sm text-muted-foreground">Diversified basket of stocks managed by professionals</p>
                </button>
                
                <button
                  onClick={() => handleAssetSelect("Gold ETF")}
                  className="w-full text-left p-3 rounded-lg border border-border hover:border-primary"
                >
                  <h4>Gold ETF</h4>
                  <p className="text-sm text-muted-foreground">Exchange-traded fund that tracks gold prices</p>
                </button>
                
                <button
                  onClick={() => handleAssetSelect("Nifty 50")}
                  className="w-full text-left p-3 rounded-lg border border-border hover:border-primary"
                >
                  <h4>Nifty 50</h4>
                  <p className="text-sm text-muted-foreground">Index of India's 50 largest companies</p>
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Simulation Amount (₹)</label>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={simulationAmount}
                  onChange={(e) => setSimulationAmount(parseInt(e.target.value))}
                  className="w-full mb-1"
                />
                <div className="flex justify-between">
                  <span>₹100</span>
                  <span className="font-bold">₹{simulationAmount}</span>
                  <span>₹5,000</span>
                </div>
              </div>
            </div>
            <button onClick={() => setShowAssetSelection(false)} className="w-full text-center p-2">
              Back
            </button>
          </div>
        )}
        
        {showSimulationResult && (
          <div className="animate-fade-in">
            <div className="card-dark p-4 mb-4">
              <h3 className="mb-4 flex items-center"><DollarSign className="mr-2 text-accent" size={24} /> Simulation Result</h3>
              <div className="p-4 border border-border rounded-lg mb-6">
                <h4 className="mb-3">{selectedAsset} Simulation (Last 7 days)</h4>
                <div className="flex items-center justify-between mb-4">
                  <span>Initial: ₹{simulationAmount}</span>
                  <span className="text-accent">Final: ₹{Math.round(selectedAsset === "Gold ETF" ? simulationAmount * 1.004 : selectedAsset === "Mutual Funds" ? simulationAmount * 1.008 : simulationAmount * 1.002)}</span>
                </div>
                <div className="progress-bar mb-4">
                  <div className="progress-fill" style={{ width: `${selectedAsset === "Gold ETF" ? 62 : selectedAsset === "Mutual Funds" ? 70 : 55}%` }}></div>
                </div>
                <p className="text-sm">
                  {selectedAsset === "Gold ETF" 
                    ? "Gold prices increased due to global economic uncertainty." 
                    : selectedAsset === "Mutual Funds" 
                      ? "Mutual funds performed well due to strong corporate earnings." 
                      : "Market showed moderate growth with some volatility."}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setShowSimulationResult(false);
                    setShowAssetSelection(true);
                  }} 
                  className="flex-1 btn-secondary"
                >
                  Try Another
                </button>
                <button onClick={goToInvest} className="flex-1 btn-primary">
                  Start Investing
                </button>
              </div>
            </div>
            <button onClick={() => {
              setShowSimulationResult(false);
              setShowSimulatorReward(true);
            }} className="w-full text-center p-2">
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningModule;
