import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import ToggleSwitch from '../components/ToggleSwitch';
import { Button } from '../components/Button';

const INITIAL_COMBO = [1, 0, 1, 1];
const PIN_LENGTH = 4;
const TOTAL_COMBINATIONS = Math.pow(2, PIN_LENGTH);
const BRUTE_FORCE_DELAY_MS = 100;

const DigitalLockPage: React.FC = () => {
  const [switches, setSwitches] = useState<number[]>(Array(PIN_LENGTH).fill(0));
  const [comboToUnlock, setComboToUnlock] = useState<number[]>(INITIAL_COMBO);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isBruteForcing, setIsBruteForcing] = useState<boolean>(false);
  const [bruteForceAttempt, setBruteForceAttempt] = useState<number>(0);
  const [isSettingPin, setIsSettingPin] = useState<boolean>(false);

  const checkCombination = useCallback(() => {
    if (isSettingPin) return;
    const isMatch = switches.every((s, i) => s === comboToUnlock[i]);
    setIsUnlocked(isMatch);
    if (isMatch) {
      setIsBruteForcing(false);
    }
  }, [switches, comboToUnlock, isSettingPin]);

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
    setSwitches(Array(PIN_LENGTH).fill(0));
  };

  const handleSetPinToggle = () => {
    setIsSettingPin(!isSettingPin);
    setIsUnlocked(false);
    setSwitches(isSettingPin ? Array(PIN_LENGTH).fill(0) : [...comboToUnlock]);
  };

  const saveNewPin = () => {
      setComboToUnlock([...switches]);
      setIsSettingPin(false);
      setSwitches(Array(PIN_LENGTH).fill(0));
  };

  useEffect(() => {
    if (!isBruteForcing || isUnlocked) return;
    
    if (bruteForceAttempt >= TOTAL_COMBINATIONS) {
      setIsBruteForcing(false);
      return;
    }

    const interval = setInterval(() => {
      setBruteForceAttempt(prevAttempt => {
        const comboString = prevAttempt.toString(2).padStart(PIN_LENGTH, '0');
        const currentAttemptSwitches = comboString.split('').map(Number);
        
        const isMatch = currentAttemptSwitches.every((s, i) => s === comboToUnlock[i]);

        if(isMatch) {
            setSwitches(currentAttemptSwitches);
            setIsUnlocked(true);
            setIsBruteForcing(false);
            return prevAttempt;
        }

        const nextAttempt = prevAttempt + 1;
        const nextBinaryString = nextAttempt.toString(2).padStart(PIN_LENGTH, '0');
        setSwitches(nextBinaryString.split('').map(Number));
        return nextAttempt;
      });
    }, BRUTE_FORCE_DELAY_MS);

    return () => clearInterval(interval);
    
  }, [isBruteForcing, bruteForceAttempt, isUnlocked, comboToUnlock]);
  
  const timeToBruteForce = (TOTAL_COMBINATIONS * BRUTE_FORCE_DELAY_MS) / 1000;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2">Digital Lock Simulator</h1>
      <p className="text-gray-400 mb-6">{isSettingPin ? 'Set your new 4-digit PIN' : 'Enter the PIN to unlock'}</p>
      <Card className={`w-full max-w-md transition-all duration-300 ${isSettingPin ? 'border-cyan-400' : ''}`}>
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
        <div className="text-center text-2xl font-bold mb-4 h-8">
          {!isSettingPin && (isUnlocked ? (
            <span className="text-green-400">Unlocked ✅</span>
          ) : (
            <span className="text-red-400">Locked 🔒</span>
          ))}
        </div>
        
        {!isSettingPin && (
          <div className="text-center text-sm text-gray-500 mb-6">
            <p>Current PIN: {isBruteForcing ? '????' : comboToUnlock.join('')}</p>
            <p>Est. Brute-Force Time: ~{timeToBruteForce.toFixed(1)} seconds</p>
          </div>
        )}

        {isBruteForcing && (
            <div className="text-center text-lg text-gray-400 mb-4 font-mono">
                Trying: {switches.join('')} ({bruteForceAttempt}/{TOTAL_COMBINATIONS - 1})
            </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isSettingPin ? (
              <Button onClick={saveNewPin} className="sm:col-span-2">Save PIN</Button>
          ) : (
              <Button onClick={startBruteForce} disabled={isBruteForcing} className="w-full">
                {isBruteForcing ? 'Attacking...' : 'Brute Force'}
              </Button>
          )}
          <Button onClick={handleSetPinToggle} disabled={isBruteForcing} className={`w-full ${isSettingPin ? 'hover:bg-red-500' : ''}`}>
            {isSettingPin ? 'Cancel' : 'Set Custom PIN'}
          </Button>
        </div>

      </Card>
    </div>
  );
};

export default DigitalLockPage;