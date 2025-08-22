
import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import { CipherType } from '../types';
import { caesarCipher, xorCipher } from '../services/cipherService';

const CipherLabPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Hello World');
  const [cipher, setCipher] = useState<CipherType>(CipherType.CAESAR);
  const [caesarShift, setCaesarShift] = useState<number>(3);
  const [xorKey, setXorKey] = useState<string>('KEY');

  const encryptedText = useMemo(() => {
    if (!inputText) return '';
    switch (cipher) {
      case CipherType.CAESAR:
        return caesarCipher(inputText, caesarShift, true);
      case CipherType.XOR:
        return xorCipher(inputText, xorKey);
      default:
        return '';
    }
  }, [inputText, cipher, caesarShift, xorKey]);

  const decryptedText = useMemo(() => {
    if (!encryptedText) return '';
    switch (cipher) {
      case CipherType.CAESAR:
        return caesarCipher(encryptedText, caesarShift, false);
      case CipherType.XOR:
        // XOR is its own inverse
        return xorCipher(encryptedText, xorKey);
      default:
        return '';
    }
  }, [encryptedText, cipher, caesarShift, xorKey]);

  const commonInputClasses = "bg-gray-800 border border-gray-600 text-white text-md rounded-lg focus:ring-white focus:border-white block w-full p-2.5";
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Cipher Lab</h1>
      <Card className="w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="cipher-select" className="mb-2 block text-sm font-medium text-gray-300">Choose Cipher</label>
            <select
              id="cipher-select"
              value={cipher}
              onChange={(e) => setCipher(e.target.value as CipherType)}
              className={commonInputClasses}
            >
              {Object.values(CipherType).map((c) => (<option key={c} value={c}>{c} Cipher</option>))}
            </select>
          </div>
          <div>
            {cipher === CipherType.CAESAR && (
              <div>
                <label htmlFor="caesar-shift" className="mb-2 block text-sm font-medium text-gray-300">Shift Value</label>
                <input
                  type="number"
                  id="caesar-shift"
                  value={caesarShift}
                  onChange={(e) => setCaesarShift(parseInt(e.target.value, 10) || 0)}
                  className={commonInputClasses}
                />
              </div>
            )}
            {cipher === CipherType.XOR && (
              <div>
                <label htmlFor="xor-key" className="mb-2 block text-sm font-medium text-gray-300">XOR Key</label>
                <input
                  type="text"
                  id="xor-key"
                  value={xorKey}
                  onChange={(e) => setXorKey(e.target.value)}
                  className={commonInputClasses}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
            <div>
                <label htmlFor="input-text" className="mb-2 block text-sm font-medium text-gray-300">Your Text</label>
                <textarea
                    id="input-text"
                    rows={4}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className={`${commonInputClasses} font-mono`}
                    placeholder="Enter text to encrypt..."
                />
            </div>
            <div>
                <label htmlFor="encrypted-text" className="mb-2 block text-sm font-medium text-gray-300">Encrypted Result</label>
                <textarea
                    id="encrypted-text"
                    rows={4}
                    readOnly
                    value={encryptedText}
                    className={`${commonInputClasses} font-mono bg-gray-900 cursor-not-allowed`}
                />
            </div>
            <div>
                <label htmlFor="decrypted-text" className="mb-2 block text-sm font-medium text-gray-300">Decrypted Result</label>
                <textarea
                    id="decrypted-text"
                    rows={4}
                    readOnly
                    value={decryptedText}
                    className={`${commonInputClasses} font-mono bg-gray-900 cursor-not-allowed`}
                />
            </div>
        </div>
      </Card>
    </div>
  );
};

export default CipherLabPage;
