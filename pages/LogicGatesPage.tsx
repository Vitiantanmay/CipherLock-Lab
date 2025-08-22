
import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import ToggleSwitch from '../components/ToggleSwitch';
import { GateType } from '../types';

const LogicGatesPage: React.FC = () => {
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);
  const [gate, setGate] = useState<GateType>(GateType.AND);

  const output = useMemo(() => {
    const a = inputA ? 1 : 0;
    const b = inputB ? 1 : 0;
    switch (gate) {
      case GateType.AND:
        return a & b;
      case GateType.OR:
        return a | b;
      case GateType.XOR:
        return a ^ b;
      case GateType.NOT:
        return a ? 0 : 1;
      default:
        return 0;
    }
  }, [inputA, inputB, gate]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Logic Gates Simulator</h1>
      <Card className="w-full max-w-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Inputs */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-xl font-semibold">Input A</label>
              <ToggleSwitch isOn={inputA} handleToggle={() => setInputA(!inputA)} />
            </div>
            <div className="flex items-center justify-between">
              <label className={`text-xl font-semibold transition-opacity ${gate === GateType.NOT ? 'opacity-30' : 'opacity-100'}`}>Input B</label>
              <ToggleSwitch isOn={inputB} handleToggle={() => setInputB(!inputB)} disabled={gate === GateType.NOT} />
            </div>
          </div>

          {/* Gate Selection */}
          <div className="flex flex-col items-center">
            <label htmlFor="gate-select" className="mb-2 text-lg">Select Gate</label>
            <select
              id="gate-select"
              value={gate}
              onChange={(e) => setGate(e.target.value as GateType)}
              className="bg-gray-800 border border-gray-600 text-white text-lg rounded-lg focus:ring-white focus:border-white block w-full p-2.5"
            >
              {Object.values(GateType).map((gateType) => (
                <option key={gateType} value={gateType}>{gateType}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Output */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center">
          <h2 className="text-2xl font-bold mb-4">Output</h2>
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl font-bold transition-all duration-300 ${output === 1 ? 'bg-green-500/80 shadow-[0_0_20px_rgba(34,197,94,0.8)]' : 'bg-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.8)]'}`}>
            {output}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LogicGatesPage;
