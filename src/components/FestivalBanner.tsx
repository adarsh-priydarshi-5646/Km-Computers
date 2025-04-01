import React, { useState, useEffect } from 'react';
import { FestivalOffer } from '../utils/types';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FestivalBannerProps {
  offer: FestivalOffer;
  onShopNow: () => void;
}

const FestivalBanner: React.FC<FestivalBannerProps> = ({ offer, onShopNow }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = offer.endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [offer.endDate]);

  return (
    <div 
      className="relative overflow-hidden py-6 px-8 rounded-xl border border-neutral-800 bg-gradient-to-r from-neutral-900/50 to-neutral-800/30 group animate-border"
      style={{ 
        backgroundColor: offer.backgroundColor || '#0D0D0D',
        color: offer.textColor || '#ffffff'
      }}
    >
      {/* Border Animation */}
      <div className="absolute inset-0 border-2 border-transparent animate-border-2 rounded-xl"></div>
      <div className="absolute inset-0 border-2 border-transparent animate-border-3 rounded-xl"></div>

      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto relative z-10">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <span className="text-4xl">{offer.icon}</span>
          <div>
            <h2 className="text-2xl font-bold">{offer.greeting}</h2>
            <p className="text-lg opacity-90">
              Use code <span className="font-mono bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded">{offer.discountCode}</span> to get {offer.discountPercentage}% Discount
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-yellow-400">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-xs uppercase text-neutral-400">Days</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-yellow-400">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-xs uppercase text-neutral-400">Hours</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-yellow-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-xs uppercase text-neutral-400">Minutes</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-yellow-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-xs uppercase text-neutral-400">Seconds</span>
            </div>
          </div>

          <button
            onClick={onShopNow}
            className="px-6 py-2.5 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FestivalBanner; 