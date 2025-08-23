import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import ToggleSwitch from '../components/ToggleSwitch';
import { Button } from '../components/Button';
import { GateType, CircuitType } from '../types';

// --- HELPER & UI COMPONENTS ---

// A smaller toggle button for circuit inputs
const BitToggleButton: React.FC<{ bit: boolean; onToggle: () => void; label: string }> = ({ bit, onToggle, label }) => (
  <div className="flex flex-col items-center space-y-1">
    <button
      onClick={onToggle}
      className={`w-12 h-12 rounded-md flex items-center justify-center text-2xl font-bold transition-all duration-200 border-2 ${
        bit
          ? 'bg-green-500/80 border-green-400 text-white shadow-[0_0_10px_rgba(34,197,94,0.7)]'
          : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'
      }`}
    >
      {bit ? 1 : 0}
    </button>
    <span className="text-xs font-mono text-gray-400">{label}</span>
  </div>
);

// LED-style display for outputs
const Led: React.FC<{ active: boolean; label: string }> = ({ active, label }) => (
  <div className="flex flex-col items-center space-y-1">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-200 border-2 ${
      active
        ? 'bg-green-500 border-green-400 text-white shadow-[0_0_12px_rgba(34,197,94,0.9)]'
        : 'bg-black/50 border-gray-700 text-gray-600'
    }`}>
      {active ? 1 : 0}
    </div>
    <span className="text-xs font-mono text-gray-400">{label}</span>
  </div>
);

// --- SIMULATOR COMPONENTS ---

const GateSimulator: React.FC = () => {
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);
  const [gate, setGate] = useState<GateType>(GateType.AND);

  const output = useMemo(() => {
    const a = inputA ? 1 : 0;
    const b = inputB ? 1 : 0;
    switch (gate) {
      case GateType.AND: return a & b;
      case GateType.OR: return a | b;
      case GateType.XOR: return a ^ b;
      case GateType.NOT: return a ? 0 : 1;
      case GateType.NAND: return (a & b) ? 0 : 1;
      case GateType.NOR: return (a | b) ? 0 : 1;
      default: return 0;
    }
  }, [inputA, inputB, gate]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
        <div className="flex flex-col items-center">
          <label htmlFor="gate-select" className="mb-2 text-lg">Select Gate</label>
          <select id="gate-select" value={gate} onChange={(e) => setGate(e.target.value as GateType)} className="bg-gray-800 border border-gray-600 text-white text-lg rounded-lg focus:ring-white focus:border-white block w-full p-2.5">
            {Object.values(GateType).map((gateType) => (<option key={gateType} value={gateType}>{gateType}</option>))}
          </select>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-gray-700 text-center">
        <h2 className="text-2xl font-bold mb-4">Output</h2>
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl font-bold transition-all duration-300 ${output === 1 ? 'bg-green-500/80 shadow-[0_0_20px_rgba(34,197,94,0.8)]' : 'bg-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.8)]'}`}>
          {output}
        </div>
      </div>
    </>
  );
};

const CircuitSimulator: React.FC = () => {
    const [circuit, setCircuit] = useState<CircuitType>(CircuitType.ADDER);

    // State for Adder
    const [adderA, setAdderA] = useState([false, false, false, false]);
    const [adderB, setAdderB] = useState([false, false, false, false]);
    
    // State for Subtractor
    const [subA, setSubA] = useState([false, false, false, false]);
    const [subB, setSubB] = useState([false, false, false, false]);

    // State for Counter
    const [count, setCount] = useState(0);

    const adderResult = useMemo(() => {
        const valA = parseInt(adderA.map(b => b ? '1' : '0').join(''), 2);
        const valB = parseInt(adderB.map(b => b ? '1' : '0').join(''), 2);
        const result = valA + valB;
        const sum = (result & 0b1111).toString(2).padStart(4, '0').split('').map(s => s === '1');
        const carryOut = result > 15;
        return { sum, carryOut, decA: valA, decB: valB, decResult: result };
    }, [adderA, adderB]);
    
    const subtractorResult = useMemo(() => {
        const valA = parseInt(subA.map(b => b ? '1' : '0').join(''), 2);
        const valB = parseInt(subB.map(b => b ? '1' : '0').join(''), 2);
        const result = valA - valB;
        const difference = (result & 0b1111).toString(2).padStart(4, '0').split('').map(s => s === '1');
        const borrowOut = result < 0;
        return { difference, borrowOut, decA: valA, decB: valB, decResult: result };
    }, [subA, subB]);

    const counterBits = useMemo(() => count.toString(2).padStart(4, '0').split('').map(s => s === '1'), [count]);

    const handleBitToggle = (setter: React.Dispatch<React.SetStateAction<boolean[]>>, index: number) => {
        setter(prev => {
            const next = [...prev];
            next[index] = !next[index];
            return next;
        });
    };

    return (
      <div>
        <div className="flex flex-col items-center mb-6">
            <label htmlFor="circuit-select" className="mb-2 text-lg">Select Circuit</label>
            <select id="circuit-select" value={circuit} onChange={(e) => setCircuit(e.target.value as CircuitType)} className="bg-gray-800 border border-gray-600 text-white text-lg rounded-lg focus:ring-white focus:border-white block w-full max-w-xs p-2.5">
                {Object.values(CircuitType).map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
        </div>

        {circuit === CircuitType.ADDER && (
            <div className="space-y-6">
                <p className="text-center text-gray-400">Adds two 4-bit numbers (A + B).</p>
                <div className="space-y-4">
                    <div className="flex justify-center space-x-3">{adderA.map((bit, i) => <BitToggleButton key={i} bit={bit} onToggle={() => handleBitToggle(setAdderA, i)} label={`A${3-i}`} />).reverse()}</div>
                    <div className="text-center text-4xl font-mono text-green-400">+</div>
                    <div className="flex justify-center space-x-3">{adderB.map((bit, i) => <BitToggleButton key={i} bit={bit} onToggle={() => handleBitToggle(setAdderB, i)} label={`B${3-i}`} />).reverse()}</div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-700">
                    <h3 className="text-xl text-center font-bold mb-4">Result</h3>
                    <div className="flex justify-center items-center space-x-3">
                        <Led active={adderResult.carryOut} label="Cout" />
                        <div className="w-px h-10 bg-gray-600"></div>
                        {adderResult.sum.map((bit, i) => <Led key={i} active={bit} label={`S${3-i}`} />).reverse()}
                    </div>
                    <p className="text-center font-mono mt-4 text-lg">{adderResult.decA} + {adderResult.decB} = {adderResult.decResult}</p>
                </div>
            </div>
        )}

        {circuit === CircuitType.SUBTRACTOR && (
             <div className="space-y-6">
                <p className="text-center text-gray-400">Subtracts one 4-bit number from another (A - B).</p>
                <div className="space-y-4">
                    <div className="flex justify-center space-x-3">{subA.map((bit, i) => <BitToggleButton key={i} bit={bit} onToggle={() => handleBitToggle(setSubA, i)} label={`A${3-i}`} />).reverse()}</div>
                    <div className="text-center text-4xl font-mono text-red-400">-</div>
                    <div className="flex justify-center space-x-3">{subB.map((bit, i) => <BitToggleButton key={i} bit={bit} onToggle={() => handleBitToggle(setSubB, i)} label={`B${3-i}`} />).reverse()}</div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-700">
                    <h3 className="text-xl text-center font-bold mb-4">Result</h3>
                    <div className="flex justify-center items-center space-x-3">
                        <Led active={subtractorResult.borrowOut} label="Bout" />
                        <div className="w-px h-10 bg-gray-600"></div>
                        {subtractorResult.difference.map((bit, i) => <Led key={i} active={bit} label={`D${3-i}`} />).reverse()}
                    </div>
                    <p className="text-center font-mono mt-4 text-lg">{subtractorResult.decA} - {subtractorResult.decB} = {subtractorResult.decResult}</p>
                </div>
            </div>
        )}
        
        {circuit === CircuitType.COUNTER && (
             <div className="space-y-6">
                <p className="text-center text-gray-400">A simple asynchronous counter that increments on each clock pulse.</p>
                <div className="flex justify-center items-center gap-4 my-4">
                    <Button onClick={() => setCount(c => (c + 1) % 16)}>Clock</Button>
                    <Button onClick={() => setCount(0)} className="hover:bg-red-500 hover:border-red-500">Reset</Button>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-700">
                    <h3 className="text-xl text-center font-bold mb-4">Count</h3>
                    <div className="flex justify-center items-center space-x-3">
                       {counterBits.map((bit, i) => <Led key={i} active={bit} label={`Q${3-i}`} />).reverse()}
                    </div>
                    <p className="text-center font-mono mt-4 text-3xl">{count}</p>
                </div>
            </div>
        )}
      </div>
    );
};


// --- MAIN PAGE COMPONENT ---

const LogicGatesPage: React.FC = () => {
  const [mode, setMode] = useState<'gates' | 'circuits'>('gates');

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Logic Lab</h1>
      <Card className="w-full max-w-2xl">
        <div className="flex mb-6 border-b border-gray-700">
          <button onClick={() => setMode('gates')} className={`px-6 py-2 text-lg font-semibold transition-colors duration-200 ${mode === 'gates' ? 'border-b-2 border-white text-white' : 'text-gray-400 hover:text-white'}`}>
            Basic Gates
          </button>
          <button onClick={() => setMode('circuits')} className={`px-6 py-2 text-lg font-semibold transition-colors duration-200 ${mode === 'circuits' ? 'border-b-2 border-white text-white' : 'text-gray-400 hover:text-white'}`}>
            Integrated Circuits
          </button>
        </div>

        {mode === 'gates' ? <GateSimulator /> : <CircuitSimulator />}

      </Card>
    </div>
  );
};

export default LogicGatesPage;
