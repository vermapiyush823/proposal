"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Utensils, Film, TreePine, Star, CalendarHeart } from "lucide-react";

export default function Home() {
  const [step, setStep] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const noTexts = [
    "No", 
    "Are you sure?", 
    "Think again!", 
    "Last chance!", 
    "You're breaking my heart 💔", 
    "Oops, you missed!", 
    "Nice try! 😂",
    "I'm unclickable!",
    "Still no?",
    "Okay, I'm giving up... SIKE!"
  ];
  
  const moveNoButton = () => {
    setNoCount(c => c + 1);
    // Generate random coordinates within a range to make it jump away
    const x = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 100 + 50);
    const y = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 100 + 50);
    setNoPosition({ x, y });
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  useEffect(() => {
    if (step === 4) {
      triggerConfetti();
    }
  }, [step]);

  return (
    <main className="container">
      {/* Floating Hearts Background */}
      <div className="floating-hearts">
        {[...Array(25)].map((_, i) => (
          <Heart 
            key={i} 
            className="heart"
            size={Math.random() * 20 + 10}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 5}s`
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="step0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="glass-card"
          >
            <h1>Do you love me? 🥺</h1>
            <div className="action-buttons">
              <button className="btn" onClick={() => setStep(1)}>
                Yes! Of course! ❤️
              </button>
              <motion.button 
                className="btn btn-secondary"
                animate={noPosition}
                onHoverStart={moveNoButton}
                onClick={moveNoButton}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {noTexts[Math.min(noCount, noTexts.length - 1)]}
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="glass-card"
          >
            <h2>Do you want to go on a date with me? 🌹</h2>
            <div className="action-buttons">
              <button className="btn" onClick={() => setStep(2)}>
                I'd love to! ✨
              </button>
              <motion.button 
                className="btn btn-secondary"
                animate={noPosition}
                onHoverStart={moveNoButton}
                onClick={moveNoButton}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {noTexts[Math.min(noCount, noTexts.length - 1)]}
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="glass-card"
          >
            <h2>What should we do? 💭</h2>
            <div className="options-grid">
              <div 
                className={`option-card ${selectedActivity === 'dinner' ? 'selected' : ''}`}
                onClick={() => setSelectedActivity('dinner')}
              >
                <Utensils size={32} />
                <span>Dinner</span>
              </div>
              <div 
                className={`option-card ${selectedActivity === 'movie' ? 'selected' : ''}`}
                onClick={() => setSelectedActivity('movie')}
              >
                <Film size={32} />
                <span>Movie</span>
              </div>
              <div 
                className={`option-card ${selectedActivity === 'picnic' ? 'selected' : ''}`}
                onClick={() => setSelectedActivity('picnic')}
              >
                <TreePine size={32} />
                <span>Picnic</span>
              </div>
              <div 
                className={`option-card ${selectedActivity === 'stargazing' ? 'selected' : ''}`}
                onClick={() => setSelectedActivity('stargazing')}
              >
                <Star size={32} />
                <span>Stargazing</span>
              </div>
            </div>
            {selectedActivity && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '2rem' }}
              >
                <button className="btn" onClick={() => setStep(3)}>
                  Perfect choice! 💖
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="glass-card"
          >
            <h2>When are you free? 📅</h2>
            <div className="action-buttons" style={{ flexDirection: 'column', gap: '1rem', margin: '2rem 0' }}>
              <button className="btn" style={{ width: '100%' }} onClick={() => setStep(4)}>
                Right now 👀
              </button>
              <button className="btn" style={{ width: '100%' }} onClick={() => setStep(4)}>
                Tomorrow 📅
              </button>
              <button className="btn" style={{ width: '100%' }} onClick={() => setStep(4)}>
                I'm already outside your house 🏠
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card"
          >
            <h1 style={{ fontSize: '3rem' }}>YAYYY! 🎉</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
              Can't wait for our {selectedActivity} date! ❤️
            </p>
            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <Heart size={80} color="var(--primary-color)" fill="var(--primary-color)" />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '2rem' }}
            >
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Now pay the dating tax! 💸</h2>
              <p style={{ opacity: 0.8, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                (Dates aren't free! Scan to deposit your "Yes" fee to confirm.)
              </p>
              <div style={{ padding: '0.5rem', borderRadius: '16px', display: 'inline-block', border: '2px solid rgba(255,255,255,0.1)' }}>
                {/* User will replace this with their actual QR code */}
                <img src="/qr.jpeg" alt="Pay me QR Code" style={{ width: '220px', height: 'auto', borderRadius: '12px', objectFit: 'contain' }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
