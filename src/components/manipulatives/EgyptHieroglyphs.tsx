import React, { useEffect, useState } from 'react';
import type { ManipulativeStateSummary } from '../../types/game';
import { soundEngine } from '../../utils/sound';

export type EgyptSymbolValue = 1 | 10 | 100 | 1000;

export const EgyptHieroglyphSvg: React.FC<{
  value: EgyptSymbolValue | 10000;
  className?: string;
}> = ({ value, className = 'w-8 h-8' }) => {
  switch (value) {
    case 1:
      // Trazo vertical (1)
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-label="Trazo vertical (1)">
          <rect x="13.5" y="4" width="5" height="24" rx="2.5" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
        </svg>
      );
    case 10:
      // Asa o talón / herradura invertida (10)
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-label="Asa o talón (10)">
          <path
            d="M8 26V13C8 8.5 11.6 5 16 5C20.4 5 24 8.5 24 13V26"
            stroke="#b45309"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M8 26V13C8 8.5 11.6 5 16 5C20.4 5 24 8.5 24 13V26"
            stroke="#78350f"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
    case 100:
      // Cuerda enrollada (100)
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-label="Cuerda enrollada (100)">
          <path
            d="M16 17C16 15.2 17.6 14 19 14C21.5 14 23 16.2 22.5 18.8C21.8 22 18.2 23.5 15 22.8C10.5 21.8 8 17.5 9.2 12.8C10.6 7.5 16.5 5 22 7C24.5 8 26 10.5 26 14V25"
            stroke="#b45309"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case 1000:
      // Flor de loto (1,000)
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-label="Flor de loto (1,000)">
          <path d="M16 16V27M11 27H21" stroke="#78350f" strokeWidth="2.4" strokeLinecap="round" />
          <path
            d="M16 5C12.5 9 12 13.5 16 16.5C20 13.5 19.5 9 16 5Z"
            fill="#d97706"
            stroke="#78350f"
            strokeWidth="1.4"
          />
          <path
            d="M15.5 16C10.5 15 7.5 11.5 8 7.5C11.5 8.5 14 11.5 15.5 16Z"
            fill="#f59e0b"
            stroke="#78350f"
            strokeWidth="1.3"
          />
          <path
            d="M16.5 16C21.5 15 24.5 11.5 24 7.5C20.5 8.5 18 11.5 16.5 16Z"
            fill="#f59e0b"
            stroke="#78350f"
            strokeWidth="1.3"
          />
        </svg>
      );
    case 10000:
      // Dedo doblado (10,000)
      return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-label="Dedo doblado (10,000)">
          <path
            d="M14 26V11C14 7.5 16.5 5.5 19.5 6.5C21.5 7.2 22 9.5 20.5 11.5"
            stroke="#b45309"
            strokeWidth="3.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

export const EgyptHieroglyphLegend: React.FC = () => {
  const items: { value: EgyptSymbolValue | 10000; label: string; valueText: string }[] = [
    { value: 1, label: 'Trazo', valueText: '1' },
    { value: 10, label: 'Asa / Talón', valueText: '10' },
    { value: 100, label: 'Cuerda enrollada', valueText: '100' },
    { value: 1000, label: 'Flor de loto', valueText: '1,000' },
    { value: 10000, label: 'Dedo doblado', valueText: '10,000' },
  ];

  return (
    <div className="rounded-xl border border-[#dfb878] bg-[#fef9ee] p-3 space-y-2">
      <div className="text-xs font-bold uppercase tracking-wider text-[#92400e]">
        Tabla de Jeroglíficos Numéricos Egipcios (Base 10 aditiva)
      </div>
      <div className="grid grid-cols-5 gap-2">
        {items.map((item) => (
          <div
            key={item.value}
            className="rounded-lg border border-[#ead4a7] bg-white px-2 py-2 flex flex-col items-center text-center"
          >
            <EgyptHieroglyphSvg value={item.value} className="w-7 h-7" />
            <span className="font-mono-tabular text-xs font-bold text-[#92400e] mt-1">
              {item.valueText}
            </span>
            <span className="text-[10px] leading-tight text-[#5c4f41]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface EgyptHieroglyphsProps {
  onChange: (summary: ManipulativeStateSummary) => void;
}

export const EgyptHieroglyphs: React.FC<EgyptHieroglyphsProps> = ({ onChange }) => {
  const [counts, setCounts] = useState<Record<EgyptSymbolValue, number>>({
    1000: 0,
    100: 0,
    10: 0,
    1: 0,
  });

  const total =
    counts[1000] * 1000 + counts[100] * 100 + counts[10] * 10 + counts[1] * 1;

  useEffect(() => {
    const parts: string[] = [];
    if (counts[1000] > 0) parts.push(`${counts[1000]}×1,000`);
    if (counts[100] > 0) parts.push(`${counts[100]}×100`);
    if (counts[10] > 0) parts.push(`${counts[10]}×10`);
    if (counts[1] > 0) parts.push(`${counts[1]}×1`);

    onChange({
      numericValue: total,
      displayValue: total.toLocaleString('es-MX'),
      breakdown: parts.length > 0 ? `${parts.join(' + ')} = ${total.toLocaleString('es-MX')}` : 'Sin jeroglíficos colocados',
    });
  }, [counts, total, onChange]);

  const adjust = (val: EgyptSymbolValue, delta: number) => {
    soundEngine.playTokenClick();
    setCounts((prev) => ({
      ...prev,
      [val]: Math.max(0, Math.min(9, prev[val] + delta)),
    }));
  };

  const symbolOrder: { val: EgyptSymbolValue; name: string }[] = [
    { val: 1000, name: 'Flor de loto' },
    { val: 100, name: 'Cuerda enrollada' },
    { val: 10, name: 'Asa / Talón' },
    { val: 1, name: 'Trazo' },
  ];

  return (
    <div className="space-y-3">
      <EgyptHieroglyphLegend />

      <div className="rounded-xl border border-[#dfb878] bg-[#fdf7ea] p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-[#78350f]">Papiro de Jeroglíficos</h4>
            <p className="text-xs text-[#854d0e]">
              Agrega los símbolos necesarios (máximo 9 por tipo) para sumar el número buscado
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playTokenClick();
              setCounts({ 1000: 0, 100: 0, 10: 0, 1: 0 });
            }}
            disabled={total === 0}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#dfb878] bg-white text-[#78350f] hover:bg-[#faecd1] disabled:opacity-40 cursor-pointer"
          >
            Limpiar papiro
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {symbolOrder.map(({ val, name }) => (
            <div
              key={val}
              className="rounded-lg border border-[#ead4a7] bg-white p-2.5 flex flex-col items-center justify-between gap-2"
            >
              <div className="text-center">
                <EgyptHieroglyphSvg value={val} className="w-8 h-8 mx-auto" />
                <div className="text-xs font-bold text-[#78350f] mt-1">{name}</div>
                <div className="font-mono-tabular text-[11px] text-[#854d0e]">
                  Valor {val.toLocaleString('es-MX')} · Cantidad: {counts[val]}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 w-full">
                <button
                  type="button"
                  onClick={() => adjust(val, 1)}
                  disabled={counts[val] >= 9}
                  className="py-1.5 text-xs font-bold rounded-md bg-[#b45309] text-white hover:bg-[#92400e] disabled:opacity-40 cursor-pointer"
                >
                  +{val.toLocaleString('es-MX')}
                </button>
                <button
                  type="button"
                  onClick={() => adjust(val, -1)}
                  disabled={counts[val] <= 0}
                  className="py-1.5 text-xs font-medium rounded-md border border-[#d6cfc2] bg-[#fbf7ef] text-[#5c4f41] hover:bg-[#efe6d5] disabled:opacity-40 cursor-pointer"
                >
                  −1
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Papyrus Display */}
        <div className="min-h-[68px] rounded-lg border border-dashed border-[#dfb878] bg-white/95 p-3 flex flex-wrap items-center justify-center gap-2">
          {total === 0 ? (
            <span className="text-xs text-[#8c7b6b]">
              Tus jeroglíficos aparecerán dibujados aquí sobre el papiro.
            </span>
          ) : (
            symbolOrder.map(({ val }) =>
              Array.from({ length: counts[val] }).map((_, idx) => (
                <button
                  key={`${val}-${idx}`}
                  type="button"
                  onClick={() => adjust(val, -1)}
                  title={`Quitar 1 símbolo de ${val}`}
                  className="p-1 rounded-md border border-[#ead4a7] bg-[#fef9ee] hover:bg-[#fceaea] cursor-pointer"
                >
                  <EgyptHieroglyphSvg value={val} className="w-7 h-7" />
                </button>
              ))
            )
          )}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-white border border-[#d6cfc2] px-4 py-2.5">
        <span className="text-xs font-semibold text-[#5c4f41]">Suma total en el papiro:</span>
        <span className="text-lg font-bold font-mono-tabular text-[#b45309]">
          {total.toLocaleString('es-MX')}
        </span>
      </div>
    </div>
  );
};
