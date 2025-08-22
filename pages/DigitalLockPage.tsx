
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import ToggleSwitch from '../components/ToggleSwitch';
import { Button } from '../components/Button';

const CORRECT_COMBO = [1, 0, 1, 1];
const TOTAL_COMBINATIONS = 16;

const DigitalLockPage: React.FC = () => {
  const [switches, setSwitches] = useState<number[]>([0, 0, 0, 0]);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isBruteForcing, setIsBruteForcing] = useState<boolean>(false);
  const [bruteForceAttempt, setBruteForceAttempt] = useState<number>(0);

  const checkCombination = useCallback(() => {
    const isMatch = switches.every((s, i) => s === CORRECT_COMBO[i]);
    setIsUnlocked(isMatch);
    if (isMatch) {
      setIsBruteForcing(false);
    }
  }, [switches]);

  useEffect(() => {
    checkCombination();
  }, [switches, checkCombination]);

  const handleToggle = (index: number) => {
    if (isBruteForcing) return;
    const newSwitches = [...switches];
    newSwitches[index] = newSwitches[index] === 0 ? 1 : 0;
    setSwitches(newSwitches);
  };
  
  const startBruteForce = () => {
      setIsBruteForcing(true);
      setBruteForceAttempt(0);
      setIsUnlocked(false);
  };

  useEffect(() => {
    if (!isBruteForcing || isUnlocked) return;
    
    if (bruteForceAttempt >= TOTAL_COMBINATIONS) {
      setIsBruteForcing(false);
      return;
    }

    const interval = setInterval(() => {
      setBruteForceAttempt(prevAttempt => {
          const nextAttempt = prevAttempt + 1;
          const binaryString = nextAttempt.toString(2).padStart(4, '0');
          const newSwitches = binaryString.split('').map(Number);
          setSwitches(newSwitches);
          return nextAttempt;
      });
    }, 100);

    return () => clearInterval(interval);
    
  }, [isBruteForcing, bruteForceAttempt, isUnlocked]);


  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Digital Lock Simulator</h1>
      <Card className="w-full max-w-md">
        <div className="flex justify-around items-center mb-8">
          {switches.map((val, index) => (
            <ToggleSwitch
              key={index}
              isOn={val === 1}
              handleToggle={() => handleToggle(index)}
              disabled={isBruteForcing}
            />
          ))}
        </div>
        <div className="text-center text-2xl font-bold mb-6 h-8">
          {isUnlocked ? (
            <span className="text-green-400">Unlocked ✅</span>
          ) : (
            <span className="text-red-400">Locked 🔒</span>
          )}
        </div>
        {isBruteForcing && (
            <div className="text-center text-lg text-gray-400 mb-4 font-mono">
                Trying: {switches.join('')} ({bruteForceAttempt}/{TOTAL_COMBINATIONS - 1})
            </div>
        )}
        <Button onClick={startBruteForce} disabled={isBruteForcing} className="w-full">
          {isBruteForcing ? 'Attacking...' : 'Brute Force'}
        </Button>
      </Card>
    </div>
  );
};

export default DigitalLockPage;
