import React, { useEffect, useState } from 'react';
import type { ManipulativeStateSummary } from '../../types/game';
import { soundEngine } from '../../utils/sound';

interface ArabiaAlJabrProps {
  equationDisplay: string;
  leftKnown: number;
  rightTotal: number;
  coefficient?: number;
  onChange: (summary: ManipulativeStateSummary) => void;
}

export const ArabiaAlJabr: React.FC<ArabiaAlJabrProps> = ({
  equationDisplay,
  leftKnown,
  rightTotal,
  coefficient = 1,
  onChange,
}) => {
  const [xValue, setXValue] = useState(0);
  const leftTotal = coefficient * xValue + leftKnown;
  const diff = leftTotal - rightTotal;
  const isBalanced = diff === 0;

  useEffect(() => {
    const leftText =
      coefficient > 1
        ? `${coefficient}×(${xValue})${leftKnown > 0 ? ` + ${leftKnown}` : ''}`
        : `${xValue}${leftKnown > 0 ? ` + ${leftKnown}` : ''}`;
    onChange({
      numericValue: xValue,
      displayValue: `x = ${xValue}`,
      breakdown: `Lado izquierdo: ${leftText} = ${leftTotal} (Meta: ${rightTotal})`,
    });
  }, [xValue, coefficient, leftKnown, leftTotal, rightTotal, onChange]);

  const adjustX = (delta: number) => {
    soundEngine.playTokenClick();
    setXValue((prev) => Math.max(0, Math.min(30, prev + delta)));
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-[#d49494] bg-[#fcf5f2] p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-[#781414]">Balanza de Al-Jabr (Equilibrio)</h4>
            <p className="text-xs text-[#7c3d3d]">
              Ajusta el valor de la incógnita <strong className="font-mono-tabular">x</strong> hasta equilibrar ambos platos
            </p>
          </div>
          <span className="font-mono-tabular text-sm font-bold text-[#991b1b] bg-white border border-[#d49494] px-3 py-1 rounded-lg">
            {equationDisplay}
          </span>
        </div>

        {/* Visual Two-Pan Balance */}
        <div className="grid grid-cols-2 gap-4 items-end pt-1">
          <div
            className={`rounded-xl border-2 p-3 text-center transition-transform duration-150 ${
              isBalanced
                ? 'border-[#1f5c4a] bg-[#eef6f2]'
                : 'border-[#d49494] bg-white'
            } ${diff > 0 ? 'translate-y-1.5' : diff < 0 ? '-translate-y-1.5' : ''}`}
          >
            <div className="text-[11px] font-semibold text-[#5c4f41]">Plato izquierdo</div>
            <div className="font-mono-tabular text-xl font-bold text-[#241d16] mt-0.5">
              {leftTotal}
            </div>
            <div className="text-[11px] text-[#6d5f4f]">
              {coefficient > 1 ? `${coefficient}·x` : 'x'}
              {leftKnown > 0 ? ` + ${leftKnown}` : ''}
            </div>
          </div>

          <div
            className={`rounded-xl border-2 p-3 text-center transition-transform duration-150 ${
              isBalanced
                ? 'border-[#1f5c4a] bg-[#eef6f2]'
                : 'border-[#d49494] bg-white'
            } ${diff < 0 ? 'translate-y-1.5' : diff > 0 ? '-translate-y-1.5' : ''}`}
          >
            <div className="text-[11px] font-semibold text-[#5c4f41]">Plato derecho</div>
            <div className="font-mono-tabular text-xl font-bold text-[#241d16] mt-0.5">
              {rightTotal}
            </div>
            <div className="text-[11px] text-[#6d5f4f]">Valor objetivo</div>
          </div>
        </div>

        <div className="text-center text-xs font-semibold">
          {isBalanced ? (
            <span className="text-[#1f5c4a]">⚖ Balanza equilibrada ({leftTotal} = {rightTotal})</span>
          ) : diff < 0 ? (
            <span className="text-[#991b1b]">Falta peso en el plato izquierdo ({leftTotal} &lt; {rightTotal})</span>
          ) : (
            <span className="text-[#991b1b]">Sobra peso en el plato izquierdo ({leftTotal} &gt; {rightTotal})</span>
          )}
        </div>

        {/* Controls for x */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => adjustX(5)}
            disabled={xValue + 5 > 30}
            className="px-3.5 py-2 text-xs font-bold rounded-lg bg-[#991b1b] text-white hover:bg-[#781414] disabled:opacity-40 cursor-pointer"
          >
            +5 a x
          </button>
          <button
            type="button"
            onClick={() => adjustX(1)}
            disabled={xValue >= 30}
            className="px-3.5 py-2 text-xs font-bold rounded-lg bg-[#b91c1c] text-white hover:bg-[#991b1b] disabled:opacity-40 cursor-pointer"
          >
            +1 a x
          </button>
          <button
            type="button"
            onClick={() => adjustX(-1)}
            disabled={xValue <= 0}
            className="px-3.5 py-2 text-xs font-medium rounded-lg border border-[#d49494] bg-white text-[#781414] hover:bg-[#fae8e6] disabled:opacity-40 cursor-pointer"
          >
            −1 a x
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playTokenClick();
              setXValue(0);
            }}
            disabled={xValue === 0}
            className="px-3 py-2 text-xs font-medium rounded-lg text-[#5c4f41] hover:bg-[#fae8e6] disabled:opacity-40 cursor-pointer"
          >
            Reiniciar x
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-white border border-[#d6cfc2] px-4 py-2.5">
        <span className="text-xs font-semibold text-[#5c4f41]">Valor probado para la incógnita:</span>
        <span className="text-lg font-bold font-mono-tabular text-[#991b1b]">x = {xValue}</span>
      </div>
    </div>
  );
};
