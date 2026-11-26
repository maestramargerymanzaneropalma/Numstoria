import React from 'react';
import { X } from 'lucide-react';
import { CIVILIZATIONS } from '../data/boardTiles';
import { CivilizationCrest } from './CivilizationCrest';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#241d16]/45 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-modal-title"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-[#d6c5a7] bg-[#fbf7ef] text-[#241d16] shadow-2xl overflow-hidden max-h-[88vh] flex flex-col">
        <div className="px-5 py-4 bg-[#f4ede0] border-b border-[#dfd3be] flex items-center justify-between">
          <h2 id="rules-modal-title" className="font-display text-lg font-bold text-[#241d16]">
            Reglas de Numstoria
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar reglas"
            className="p-1.5 rounded-lg text-[#5c4f41] hover:bg-white/75 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto text-sm leading-relaxed">
          <div className="rounded-xl border border-[#ded3c0] bg-white p-4 space-y-2">
            <h3 className="font-bold text-[#241d16]">Dinámica por turnos (Matemáticas e Historia)</h3>
            <p className="text-[#3a3026]">
              <strong>Equipo Sol (☀️)</strong> y <strong>Equipo Luna (🌙)</strong> avanzan desde la
              Casilla 1 hasta la Casilla 32 lanzando el dado. A lo largo del recorrido se intercalan{' '}
              <strong>retos matemáticos interactivos</strong> y <strong>preguntas de historia</strong>{' '}
              con explicación guiada y ejemplos sencillos.
            </p>
          </div>

          <div className="rounded-xl border border-[#ded3c0] bg-white p-4 space-y-2">
            <h3 className="font-bold text-[#241d16]">Verificación automática del juego</h3>
            <p className="text-[#3a3026]">
              Al pulsar <strong>Comprobar respuesta</strong>, el sistema verifica automáticamente el
              armado o la opción elegida y muestra una retroalimentación explicativa. Si es correcta,
              asigna el sello correspondiente en el medallero y marca la casilla en gris piedra; si no,
              explica el procedimiento y cede el turno sin otorgar sello.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(['mesopotamia', 'egipto', 'america', 'india', 'arabia'] as const).map((civId) => {
              const civ = CIVILIZATIONS[civId];
              return (
                <div
                  key={civId}
                  className="rounded-xl border p-3.5 flex items-start gap-3"
                  style={{ borderColor: civ.borderHex, backgroundColor: civ.softBgHex }}
                >
                  <div style={{ color: civ.accentHex }} className="mt-0.5 shrink-0">
                    <CivilizationCrest civilization={civId} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs" style={{ color: civ.textHex }}>
                      {civ.name}
                    </div>
                    <div className="text-xs text-[#3a3026] mt-0.5">{civ.systemLabel}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-3 bg-[#f4ede0] border-t border-[#dfd3be] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-[#241d16] text-white hover:bg-[#3c3024] cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
