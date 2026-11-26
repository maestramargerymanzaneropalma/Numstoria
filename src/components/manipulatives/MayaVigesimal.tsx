import React, { useEffect, useState } from 'react';
import type { ManipulativeStateSummary } from '../../types/game';
import { soundEngine } from '../../utils/sound';

interface MayaVigesimalProps {
  onChange: (summary: ManipulativeStateSummary) => void;
}

const MayaShellGlyph: React.FC = () => (
  <svg viewBox="0 0 56 28" className="w-14 h-7 text-[#1f5c4a]" fill="none" aria-label="Cero maya">
    <ellipse cx="28" cy="14" rx="23" ry="10.5" fill="#d9ebe3" stroke="#1f5c4a" strokeWidth="2" />
    <path d="M10 14H46" stroke="#1f5c4a" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M18 6.5V14M28 4V14M38 6.5V14" stroke="#1f5c4a" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 19.5C21 21.5 35 21.5 40 19.5" stroke="#1f5c4a" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const MayaLevelVisual: React.FC<{ value: number }> = ({ value }) => {
  if (value === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-2">
        <MayaShellGlyph />
        <span className="text-[11px] font-medium text-[#1f5c4a] mt-1">Concha (0)</span>
      </div>
    );
  }

  const bars = Math.floor(value / 5);
  const dots = value % 5;

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 py-2 min-h-[68px]">
      {dots > 0 && (
        <div className="flex items-center gap-2">
          {Array.from({ length: dots }).map((_, idx) => (
            <span
              key={idx}
              className="w-4 h-4 rounded-full bg-[#1f5c4a] border border-[#123c30] shadow-sm inline-block"
            />
          ))}
        </div>
      )}
      {bars > 0 && (
        <div className="flex flex-col gap-1.5">
          {Array.from({ length: bars }).map((_, idx) => (
            <span
              key={idx}
              className="w-24 h-3 rounded-sm bg-[#1f5c4a] border border-[#123c30] shadow-sm inline-block"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const MayaVigesimal: React.FC<MayaVigesimalProps> = ({ onChange }) => {
  const [upper, setUpper] = useState(0);
  const [base, setBase] = useState(0);

  useEffect(() => {
    const total = upper * 20 + base;
    onChange({
      numericValue: total,
      displayValue: `${total}`,
      breakdown: `(${upper} × 20) + (${base} × 1) = ${total}`,
    });
  }, [upper, base, onChange]);

  const adjustLevel = (level: 'upper' | 'base', delta: number) => {
    soundEngine.playTokenClick();
    if (level === 'upper') {
      setUpper((prev) => Math.max(0, Math.min(19, prev + delta)));
    } else {
      setBase((prev) => Math.max(0, Math.min(19, prev + delta)));
    }
  };

  const total = upper * 20 + base;

  return (
    <div className="space-y-4">
      {/* Nivel Superior ×20 */}
      <div className="rounded-xl border border-[#8ab8a8] bg-[#f4faf7] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#cbe3d8]">
          <div>
            <h4 className="text-sm font-bold text-[#154235]">Nivel Superior (×20)</h4>
            <p className="text-xs text-[#3b6355]">Cada punto aporta 20 y cada barra aporta 100</p>
          </div>
          <div className="text-right font-mono-tabular">
            <span className="text-base font-bold text-[#154235]">{upper}</span>
            <span className="text-xs text-[#3b6355] ml-1.5">× 20 = {upper * 20}</span>
          </div>
        </div>

        <MayaLevelVisual value={upper} />

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => adjustLevel('upper', 1)}
            disabled={upper >= 19}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[#1f5c4a] text-white hover:bg-[#174638] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
          >
            +1 Punto (+20)
          </button>
          <button
            type="button"
            onClick={() => adjustLevel('upper', 5)}
            disabled={upper + 5 > 19}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[#2b745e] text-white hover:bg-[#1f5c4a] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
          >
            +5 Barra (+100)
          </button>
          <button
            type="button"
            onClick={() => adjustLevel('upper', -1)}
            disabled={upper <= 0}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-[#8ab8a8] bg-white text-[#154235] hover:bg-[#e7f3ed] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
          >
            −1 Punto
          </button>
          <button
            type="button"
            onClick={() => adjustLevel('upper', -5)}
            disabled={upper < 5}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-[#8ab8a8] bg-white text-[#154235] hover:bg-[#e7f3ed] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
          >
            −5 Barra
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playTokenClick();
              setUpper(0);
            }}
            disabled={upper === 0}
            className="px-3 py-2 text-xs font-medium rounded-lg text-[#5c4f41] hover:bg-[#e7f3ed] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Nivel Base ×1 */}
      <div className="rounded-xl border border-[#8ab8a8] bg-[#f4faf7] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#cbe3d8]">
          <div>
            <h4 className="text-sm font-bold text-[#154235]">Nivel Base (×1)</h4>
            <p className="text-xs text-[#3b6355]">Cada punto vale 1 y cada barra vale 5 (máx. 19)</p>
          </div>
          <div className="text-right font-mono-tabular">
            <span className="text-base font-bold text-[#154235]">{base}</span>
            <span className="text-xs text-[#3b6355] ml-1.5">× 1 = {base}</span>
          </div>
        </div>

        <MayaLevelVisual value={base} />

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => adjustLevel('base', 1)}
            disabled={base >= 19}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[#1f5c4a] text-white hover:bg-[#174638] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
          >
            +1 Punto (+1)
          </button>
          <button
            type="button"
            onClick={() => adjustLevel('base', 5)}
            disabled={base + 5 > 19}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[#2b745e] text-white hover:bg-[#1f5c4a] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
          >
            +5 Barra (+5)
          </button>
          <button
            type="button"
            onClick={() => adjustLevel('base', -1)}
            disabled={base <= 0}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-[#8ab8a8] bg-white text-[#154235] hover:bg-[#e7f3ed] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
          >
            −1 Punto
          </button>
          <button
            type="button"
            onClick={() => adjustLevel('base', -5)}
            disabled={base < 5}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-[#8ab8a8] bg-white text-[#154235] hover:bg-[#e7f3ed] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
          >
            −5 Barra
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playTokenClick();
              setBase(0);
            }}
            disabled={base === 0}
            className="px-3 py-2 text-xs font-medium rounded-lg text-[#5c4f41] hover:bg-[#e7f3ed] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Live readout */}
      <div className="flex items-center justify-between rounded-lg bg-white border border-[#d6cfc2] px-4 py-2.5">
        <span className="text-xs font-semibold text-[#5c4f41]">
          Cálculo armado: <span className="font-mono-tabular text-[#241d16]">({upper} × 20) + ({base} × 1)</span>
        </span>
        <span className="text-lg font-bold font-mono-tabular text-[#1f5c4a]">Total: {total}</span>
      </div>
    </div>
  );
};
