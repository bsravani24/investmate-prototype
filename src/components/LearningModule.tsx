
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
  correctAnswer: number;
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
      correctAnswer: 1
    }
  ]);
  
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [rewardsUnlocked, setRewardsUnlocked] = useState(false);
  const [showTrendReward, setShowTrendReward] = useState(false);
  const [showSimulatorReward, setShowSimulatorReward] = useState(false);
  
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
    
    // If answer is correct, unlock rewards
    if (index === quizzes[0].correctAnswer) {
      setTimeout(() => {
        setRewardsUnlocked(true);
        setShowQuiz(false);
        setCurrentVideo(null);
      }, 1500);
    }
  };
  
  const handleTrendReward = () => {
    setShowTrendReward(true);
  };
  
  const handleSimulatorReward = () => {
    setShowSimulatorReward(true);
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
        
        {!currentVideo && !showTrendReward && !showSimulatorReward && (
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
                      <p className="text-sm text-muted-foreground">Try investing without real money</p>
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
                        ? index === quizzes[0].correctAnswer 
                          ? 'bg-accent/20 border-accent' 
                          : 'bg-destructive/20 border-destructive' 
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {showQuizResult && (
                <div className={`p-3 rounded-lg ${
                  selectedAnswer === quizzes[0].correctAnswer
                    ? 'bg-accent/20 text-accent'
                    : 'bg-destructive/20 text-destructive'
                }`}>
                  {selectedAnswer === quizzes[0].correctAnswer 
                    ? 'Correct! You earned a reward.' 
                    : 'Incorrect. Try again!'}
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
        
        {showSimulatorReward && (
          <div className="animate-fade-in">
            <div className="card-dark p-4 mb-4">
              <h3 className="mb-4 flex items-center"><DollarSign className="mr-2 text-accent" size={24} /> Investment Simulator</h3>
              
              <div className="p-4 border border-border rounded-lg mb-6">
                <h4 className="mb-3">Gold ETF Simulation (Last 7 days)</h4>
                <div className="flex items-center justify-between mb-4">
                  <span>Initial: ₹1,000</span>
                  <span className="text-accent">Final: ₹1,020</span>
                </div>
                <div className="progress-bar mb-4">
                  <div className="progress-fill" style={{ width: '62%' }}></div>
                </div>
                <p className="text-sm">Gold prices increased due to global economic uncertainty.</p>
              </div>
              
              <button onClick={goToInvest} className="btn-primary w-full">
                Start Investing
              </button>
            </div>
            <button onClick={() => setShowSimulatorReward(false)} className="w-full text-center p-2">
              Back to Learning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningModule;
