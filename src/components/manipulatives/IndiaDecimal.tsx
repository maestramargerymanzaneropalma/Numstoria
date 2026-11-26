import React, { useEffect, useState } from 'react';
import type { ManipulativeStateSummary } from '../../types/game';
import { soundEngine } from '../../utils/sound';

interface IndiaDecimalProps {
  onChange: (summary: ManipulativeStateSummary) => void;
}

export const IndiaDecimal: React.FC<IndiaDecimalProps> = ({ onChange }) => {
  const [hundreds, setHundreds] = useState(0);
  const [tens, setTens] = useState(0);
  const [units, setUnits] = useState(0);

  const total = hundreds * 100 + tens * 10 + units;

  useEffect(() => {
    onChange({
      numericValue: total,
      displayValue: `${total}`,
      breakdown: `${hundreds}×100 + ${tens}×10 + ${units}×1 = ${total}`,
    });
  }, [hundreds, tens, units, total, onChange]);

  const stepDigit = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    delta: number
  ) => {
    soundEngine.playTokenClick();
    setter((prev) => (prev + delta + 10) % 10);
  };

  const cols = [
    { label: 'Centenas', mult: '×100', val: hundreds, setter: setHundreds },
    { label: 'Decenas', mult: '×10', val: tens, setter: setTens },
    { label: 'Unidades', mult: '×1', val: units, setter: setUnits },
  ];

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-[#8ea8c9] bg-[#f2f6fb] p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-[#162c49]">
              Tablero Posicional Indoarábigo (0 al 9)
            </h4>
            <p className="text-xs text-[#3b577a]">
              Ajusta cada dígito en su posición; observa cómo el 0 conserva el lugar vacío
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playTokenClick();
              setHundreds(0);
              setTens(0);
              setUnits(0);
            }}
            disabled={total === 0}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#8ea8c9] bg-white text-[#162c49] hover:bg-[#e5edf7] disabled:opacity-40 cursor-pointer"
          >
            Reiniciar a 000
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {cols.map((col) => (
            <div
              key={col.label}
              className="rounded-xl border border-[#8ea8c9] bg-white p-3 flex flex-col items-center gap-2"
            >
              <div className="text-center">
                <div className="text-xs font-bold text-[#162c49]">{col.label}</div>
                <div className="font-mono-tabular text-[11px] text-[#4b678a]">{col.mult}</div>
              </div>

              <button
                type="button"
                onClick={() => stepDigit(col.setter, 1)}
                className="w-full py-1.5 text-xs font-bold rounded-lg bg-[#1e3a5f] text-white hover:bg-[#162c49] cursor-pointer"
              >
                +1
              </button>

              <div
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center font-mono-tabular text-2xl font-bold ${
                  col.val === 0
                    ? 'border-dashed border-[#8ea8c9] bg-[#f8fafc] text-[#64748b]'
                    : 'border-[#1e3a5f] bg-[#eef3f9] text-[#1e3a5f]'
                }`}
              >
                {col.val}
              </div>

              <button
                type="button"
                onClick={() => stepDigit(col.setter, -1)}
                className="w-full py-1.5 text-xs font-medium rounded-lg border border-[#d6cfc2] bg-[#fbf7ef] text-[#5c4f41] hover:bg-[#efe6d5] cursor-pointer"
              >
                −1
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white border border-[#d6cfc2] px-4 py-2.5">
        <span className="text-xs font-semibold text-[#5c4f41]">
          Notación desarrollada:{' '}
          <span className="font-mono-tabular text-[#241d16]">
            {hundreds * 100} + {tens * 10} + {units}
          </span>
        </span>
        <span className="text-lg font-bold font-mono-tabular text-[#1e3a5f]">Número: {total}</span>
      </div>
    </div>
  );
};
