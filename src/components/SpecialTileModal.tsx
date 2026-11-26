import React from 'react';
import { ArrowRight, X } from 'lucide-react';
import type { TeamState, TileData } from '../types/game';
import { SpecialCrest } from './CivilizationCrest';

interface SpecialTileModalProps {
  tile: TileData;
  activeTeam: TeamState;
  onConfirm: () => void;
  onClose: () => void;
}

export const SpecialTileModal: React.FC<SpecialTileModalProps> = ({
  tile,
  activeTeam,
  onConfirm,
  onClose,
}) => {
  if (tile.category !== 'special' || !tile.specialKind) return null;

  const emoji = activeTeam.id === 'sol' ? '☀️' : '🌙';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#241d16]/45 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="special-tile-title"
    >
      <div className="w-full max-w-lg rounded-2xl border border-[#c6931b] bg-[#fbf7ef] text-[#241d16] shadow-2xl overflow-hidden">
        <div className="px-5 py-4 bg-[#fcf5e8] border-b border-[#dfd3be] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#c59b47] text-[#7a5410] flex items-center justify-center">
              <SpecialCrest kind={tile.specialKind} className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono-tabular font-semibold text-[#7a5410]">
                Casilla especial · {tile.id}
              </div>
              <h2 id="special-tile-title" className="font-display text-lg font-bold text-[#241d16]">
                {tile.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="p-1.5 rounded-lg text-[#5c4f41] hover:bg-white/75 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="rounded-xl border border-[#ded3c0] bg-white p-4 space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#6e583b]">
              Contexto Histórico
            </div>
            <p className="text-sm text-[#241d16] leading-relaxed">{tile.historicalContext}</p>
          </div>

          <div className="rounded-xl border border-[#c59b47] bg-[#fef9eb] p-4 space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#7a5410]">
              Efecto para {activeTeam.name} {emoji}
            </div>
            <p className="text-sm font-medium text-[#241d16] leading-relaxed">{tile.quickRule}</p>
          </div>
        </div>

        <div className="px-5 py-3.5 bg-[#f4ede0] border-t border-[#dfd3be] flex justify-end">
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg bg-[#9a6b0c] text-white hover:bg-[#7d5307] transition-colors cursor-pointer"
          >
            <span>Avanzar 2 casillas y abrir reto</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
