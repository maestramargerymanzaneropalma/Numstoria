import React, { useEffect, useState } from 'react';
import type { ManipulativeStateSummary } from '../../types/game';
import { soundEngine } from '../../utils/sound';

interface MesopotamiaCuneiformProps {
  useBase60?: boolean;
  onChange: (summary: ManipulativeStateSummary) => void;
}

const WedgeTens: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
    <path d="M5 12L17 5L14 12L17 19L5 12Z" fill="#9a3412" stroke="#5c1d07" strokeWidth="1.2" />
  </svg>
);

const NailOnes: React.FC = () => (
  <svg viewBox="0 0 20 26" className="w-5 h-6" aria-hidden="true">
    <path d="M5 4H15L11.5 11V23H8.5V11L5 4Z" fill="#c2410c" stroke="#5c1d07" strokeWidth="1.2" />
  </svg>
);

const CuneiformGroup: React.FC<{ value: number }> = ({ value }) => {
  if (value === 0) {
    return (
      <div className="h-12 flex items-center justify-center text-xs italic text-[#8c7b6b]">
        Vacío (0)
      </div>
    );
  }
  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return (
    <div className="min-h-[48px] flex flex-wrap items-center justify-center gap-1 py-1">
      {Array.from({ length: tens }).map((_, idx) => (
        <WedgeTens key={`t-${idx}`} />
      ))}
      {Array.from({ length: ones }).map((_, idx) => (
        <NailOnes key={`o-${idx}`} />
      ))}
    </div>
  );
};

export const MesopotamiaCuneiform: React.FC<MesopotamiaCuneiformProps> = ({
  useBase60 = false,
  onChange,
}) => {
  const [sixties, setSixties] = useState(0);
  const [units, setUnits] = useState(0);

  const total = useBase60 ? sixties * 60 + units : units;

  useEffect(() => {
    const breakdown = useBase60
      ? `(${sixties} × 60) + (${units} × 1) = ${total}`
      : `${Math.floor(units / 10)} cuñas (×10) + ${units % 10} clavos (×1) = ${units}`;

    onChange({
      numericValue: total,
      displayValue: `${total}`,
      breakdown,
    });
  }, [sixties, units, total, useBase60, onChange]);

  const adjust = (target: 'sixties' | 'units', delta: number) => {
    soundEngine.playTokenClick();
    if (target === 'sixties') {
      setSixties((p) => Math.max(0, Math.min(5, p + delta)));
    } else {
      setUnits((p) => Math.max(0, Math.min(59, p + delta)));
    }
  };

  return (
    <div className="space-y-3">
      {/* Mini legend */}
      <div className="rounded-xl border border-[#d8a182] bg-[#fdf6f0] px-4 py-2.5 flex flex-wrap items-center gap-4 text-xs text-[#7c280c]">
        <span className="font-bold">Símbolos cuneiformes:</span>
        <span className="inline-flex items-center gap-1.5 font-medium">
          <WedgeTens />
          <span>Cuña = 10</span>
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium">
          <NailOnes />
          <span>Clavo = 1</span>
        </span>
      </div>

      {useBase60 && (
        <div className="rounded-xl border border-[#d8a182] bg-[#fdf3ec] p-4 space-y-2">
          <div className="flex items-center justify-between border-b border-[#ebd0be] pb-2">
            <div>
              <h4 className="text-sm font-bold text-[#7c280c]">Posición de Sesentenas (×60)</h4>
              <p className="text-xs text-[#8a4d34]">Cada clavo en esta columna vale 60 unidades</p>
            </div>
            <span className="font-mono-tabular text-sm font-bold text-[#9a3412]">
              {sixties} × 60 = {sixties * 60}
            </span>
          </div>
          <CuneiformGroup value={sixties} />
          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => adjust('sixties', 1)}
              disabled={sixties >= 5}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#9a3412] text-white hover:bg-[#7c280c] disabled:opacity-40 cursor-pointer"
            >
              +1 grupo de 60
            </button>
            <button
              type="button"
              onClick={() => adjust('sixties', -1)}
              disabled={sixties <= 0}
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg border border-[#d8a182] bg-white text-[#7c280c] hover:bg-[#faece2] disabled:opacity-40 cursor-pointer"
            >
              −1 grupo
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[#d8a182] bg-[#fdf3ec] p-4 space-y-2">
        <div className="flex items-center justify-between border-b border-[#ebd0be] pb-2">
          <div>
            <h4 className="text-sm font-bold text-[#7c280c]">
              {useBase60 ? 'Posición de Unidades (×1)' : 'Tablilla de Arcilla (0 a 59)'}
            </h4>
            <p className="text-xs text-[#8a4d34]">Combina cuñas de 10 y clavos de 1</p>
          </div>
          <span className="font-mono-tabular text-sm font-bold text-[#9a3412]">
            {units} {useBase60 ? '× 1' : ''}
          </span>
        </div>

        <CuneiformGroup value={units} />

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => adjust('units', 10)}
            disabled={units + 10 > 59}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#9a3412] text-white hover:bg-[#7c280c] disabled:opacity-40 cursor-pointer"
          >
            +10 Cuña
          </button>
          <button
            type="button"
            onClick={() => adjust('units', 1)}
            disabled={units >= 59}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#c2410c] text-white hover:bg-[#9a3412] disabled:opacity-40 cursor-pointer"
          >
            +1 Clavo
          </button>
          <button
            type="button"
            onClick={() => adjust('units', -10)}
            disabled={units < 10}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-[#d8a182] bg-white text-[#7c280c] hover:bg-[#faece2] disabled:opacity-40 cursor-pointer"
          >
            −10
          </button>
          <button
            type="button"
            onClick={() => adjust('units', -1)}
            disabled={units <= 0}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-[#d8a182] bg-white text-[#7c280c] hover:bg-[#faece2] disabled:opacity-40 cursor-pointer"
          >
            −1
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playTokenClick();
              setSixties(0);
              setUnits(0);
            }}
            disabled={total === 0}
            className="px-3 py-2 text-xs font-medium rounded-lg text-[#5c4f41] hover:bg-[#faece2] disabled:opacity-40 cursor-pointer"
          >
            Limpiar
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-white border border-[#d6cfc2] px-4 py-2.5">
        <span className="text-xs font-semibold text-[#5c4f41]">
          {useBase60 ? `Armado: (${sixties} × 60) + ${units}` : 'Total en la tablilla:'}
        </span>
        <span className="text-lg font-bold font-mono-tabular text-[#9a3412]">Total: {total}</span>
      </div>
    </div>
  );
};
