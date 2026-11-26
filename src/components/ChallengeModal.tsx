import React, { useCallback, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  HelpCircle,
  Lightbulb,
  X,
  XCircle,
} from 'lucide-react';
import { CIVILIZATIONS } from '../data/boardTiles';
import type {
  CivilizationId,
  ManipulativeStateSummary,
  TeamId,
  TeamState,
  TileData,
} from '../types/game';
import { soundEngine } from '../utils/sound';
import { CivilizationCrest } from './CivilizationCrest';
import { ArabiaAlJabr } from './manipulatives/ArabiaAlJabr';
import { EgyptHieroglyphLegend, EgyptHieroglyphs } from './manipulatives/EgyptHieroglyphs';
import { IndiaDecimal } from './manipulatives/IndiaDecimal';
import { MayaVigesimal } from './manipulatives/MayaVigesimal';
import { MesopotamiaCuneiform } from './manipulatives/MesopotamiaCuneiform';

interface ChallengeModalProps {
  tile: TileData;
  activeTeam: TeamState;
  isCompleted: boolean;
  onClose: () => void;
  onVerificationResult: (tile: TileData, isCorrect: boolean) => void;
  onFinishTurn: () => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  tile,
  activeTeam,
  isCompleted,
  onClose,
  onVerificationResult,
  onFinishTurn,
}) => {
  const [showSageHint, setShowSageHint] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [verificationState, setVerificationState] = useState<{
    checked: boolean;
    isCorrect: boolean;
    feedbackText: string;
  } | null>(null);

  const [summary, setSummary] = useState<ManipulativeStateSummary>({
    numericValue: 0,
    displayValue: '0',
    breakdown: 'Sin piezas colocadas',
  });

  const handleManipulativeChange = useCallback((next: ManipulativeStateSummary) => {
    setSummary(next);
  }, []);

  if (tile.category === 'start' || tile.category === 'special') {
    return null;
  }

  const civ = CIVILIZATIONS[tile.category as CivilizationId];
  const isHistory = tile.challengeMode === 'history';
  const teamEmoji = (id: TeamId) => (id === 'sol' ? '☀️' : '🌙');

  const handleVerify = () => {
    if (verificationState?.checked) return;

    if (isHistory && tile.historyQuestion) {
      if (selectedOption === null) return;
      const isCorrect = selectedOption === tile.historyQuestion.correctIndex;
      if (isCorrect) {
        soundEngine.playApproveChime();
      } else {
        soundEngine.playDisagreeTone();
      }
      setVerificationState({
        checked: true,
        isCorrect,
        feedbackText: tile.historyQuestion.explanation,
      });
      onVerificationResult(tile, isCorrect);
      return;
    }

    // Math verification
    const isCorrect = Math.abs(summary.numericValue - tile.targetValue) < 0.001;
    if (isCorrect) {
      soundEngine.playApproveChime();
    } else {
      soundEngine.playDisagreeTone();
    }

    const explanation =
      tile.mathExplanation || `La meta era ${tile.targetDisplay}.`;

    setVerificationState({
      checked: true,
      isCorrect,
      feedbackText: isCorrect
        ? explanation
        : `Construiste ${summary.displayValue}, pero el reto pedía ${tile.targetDisplay}. ${explanation}`,
    });
    onVerificationResult(tile, isCorrect);
  };

  const canVerify = !verificationState?.checked && (!isHistory || selectedOption !== null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#241d16]/45 backdrop-blur-[2px] p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="challenge-modal-title"
    >
      <div className="relative w-full max-w-3xl rounded-2xl border border-[#d6c5a7] bg-[#fbf7ef] text-[#241d16] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Civilization Header Band */}
        <div
          className="px-5 py-4 border-b border-[#dfd3be] flex items-center justify-between gap-4"
          style={{ backgroundColor: civ.softBgHex }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center shrink-0"
              style={{ borderColor: civ.borderHex, color: civ.accentHex }}
            >
              <CivilizationCrest civilization={civ.id} className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5c4f41]">
                <span style={{ color: civ.textHex }} className="font-bold">
                  {civ.name}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">Casilla {tile.id}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#241d16]">
                  {isHistory ? 'Pregunta de Historia' : 'Reto de Matemáticas'}
                </span>
                {tile.isFinal && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-bold text-[#991b1b]">Meta Final</span>
                  </>
                )}
                {isCompleted && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#4c463e]">Completada</span>
                  </>
                )}
              </div>
              <h2
                id="challenge-modal-title"
                className="font-display text-lg sm:text-xl font-bold text-[#241d16] truncate"
              >
                {tile.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar tarjeta de reto"
            className="p-2 rounded-lg text-[#5c4f41] hover:bg-white/75 hover:text-[#241d16] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Team Strip */}
        <div className="px-5 py-2.5 bg-[#f4ede0] border-b border-[#dfd3be] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="font-semibold text-[#241d16]">
            Responde: {activeTeam.name} {teamEmoji(activeTeam.id)}
          </div>
          <div className="text-[#5c4f41] font-medium">
            Verificación automática del juego · {civ.systemLabel}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* 1. Contexto Histórico */}
          <section className="rounded-xl border border-[#ded3c0] bg-white p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6e583b]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Contexto Histórico</span>
            </div>
            <p className="text-sm leading-relaxed text-[#241d16]">{tile.historicalContext}</p>
          </section>

          {/* 2. Explicación guiada + Ejemplo sencillo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <section className="rounded-xl border border-[#ded3c0] bg-white p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6e583b]">
                <Compass className="w-3.5 h-3.5" />
                <span>Explicación guiada</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[#3a3026]">{tile.quickRule}</p>
            </section>

            <section className="rounded-xl border border-[#ded3c0] bg-[#fcfaf5] p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8a5d08]">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Ejemplo sencillo</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[#3a3026]">{tile.exampleText}</p>
            </section>
          </div>

          {/* 3. Tu reto */}
          <section
            className="rounded-xl border p-4 space-y-1"
            style={{ backgroundColor: civ.softBgHex, borderColor: civ.borderHex }}
          >
            <div
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: civ.textHex }}
            >
              {isHistory ? 'Pregunta de historia' : 'Tu reto matemático'}
            </div>
            <p className="text-base font-bold text-[#241d16] leading-snug">
              {isHistory && tile.historyQuestion ? tile.historyQuestion.prompt : tile.missionSummary}
            </p>
          </section>

          {/* For Egypt History cards, also show the visible decimal hieroglyph legend */}
          {tile.category === 'egipto' && isHistory && <EgyptHieroglyphLegend />}

          {/* 4. Interactive Area (Manipulative OR History Multiple Choice) */}
          {!isHistory ? (
            <section className="space-y-2">
              {tile.category === 'mesopotamia' && (
                <MesopotamiaCuneiform
                  useBase60={tile.useBase60}
                  onChange={handleManipulativeChange}
                />
              )}
              {tile.category === 'egipto' && (
                <EgyptHieroglyphs onChange={handleManipulativeChange} />
              )}
              {tile.category === 'america' && (
                <MayaVigesimal onChange={handleManipulativeChange} />
              )}
              {tile.category === 'india' && (
                <IndiaDecimal onChange={handleManipulativeChange} />
              )}
              {tile.category === 'arabia' && tile.alJabrEquation && (
                <ArabiaAlJabr
                  equationDisplay={tile.alJabrEquation.equationDisplay}
                  leftKnown={tile.alJabrEquation.leftKnown}
                  rightTotal={tile.alJabrEquation.rightTotal}
                  coefficient={tile.alJabrEquation.coefficient}
                  onChange={handleManipulativeChange}
                />
              )}
            </section>
          ) : (
            tile.historyQuestion && (
              <section className="space-y-2.5" aria-label="Opciones de respuesta">
                {tile.historyQuestion.options.map((optionText, idx) => {
                  const letter = ['A', 'B', 'C'][idx] || `${idx + 1}`;
                  const isSelected = selectedOption === idx;
                  const isRightOption = idx === tile.historyQuestion?.correctIndex;

                  let cardStyle = 'border-[#d6c5a7] bg-white hover:bg-[#fcf8ef] text-[#241d16]';
                  if (verificationState?.checked) {
                    if (isRightOption) {
                      cardStyle = 'border-[#1f5c4a] bg-[#eef6f2] text-[#154235] font-semibold';
                    } else if (isSelected && !isRightOption) {
                      cardStyle = 'border-[#991b1b] bg-[#fcf0ef] text-[#781414]';
                    } else {
                      cardStyle = 'border-[#e4dac8] bg-[#faf6ee] text-[#6d5f4f]';
                    }
                  } else if (isSelected) {
                    cardStyle = 'border-[#9a6b0c] bg-[#fef9eb] text-[#241d16] ring-1 ring-[#9a6b0c]';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={Boolean(verificationState?.checked)}
                      onClick={() => {
                        soundEngine.playTokenClick();
                        setSelectedOption(idx);
                      }}
                      className={`w-full rounded-xl border p-3.5 text-left flex items-start gap-3 transition-colors cursor-pointer disabled:cursor-default ${cardStyle}`}
                    >
                      <span
                        className={`font-mono-tabular text-xs font-bold w-6 h-6 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#241d16] text-white border-[#241d16]'
                            : 'bg-[#fbf7ef] text-[#5c4f41] border-[#d6c5a7]'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-sm leading-snug">{optionText}</span>
                    </button>
                  );
                })}
              </section>
            )
          )}

          {/* Pista del Sabio */}
          {showSageHint && !verificationState?.checked && (
            <div className="rounded-xl border border-[#d6b66f] bg-[#fef9eb] p-4 space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8a5d08]">
                Pista del Sabio
              </div>
              <p className="text-sm text-[#3d2e14]">{tile.sageHint}</p>
            </div>
          )}

          {/* Automatic Verification Feedback Banner */}
          {verificationState?.checked && (
            <section
              role="status"
              className={`rounded-xl border p-4 space-y-2 ${
                verificationState.isCorrect
                  ? 'border-[#1f5c4a] bg-[#eef6f2] text-[#154235]'
                  : 'border-[#991b1b] bg-[#fcf0ef] text-[#781414]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                {verificationState.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>
                      ¡Correcto! Se otorgó el sello de {civ.name} a {activeTeam.name}{' '}
                      {teamEmoji(activeTeam.id)}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 shrink-0" />
                    <span>Respuesta incorrecta · No se asigna sello en este turno</span>
                  </>
                )}
              </div>
              <p className="text-sm leading-relaxed text-[#241d16]">
                {verificationState.feedbackText}
              </p>
            </section>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-[#dfd3be] bg-[#f4ede0] flex flex-wrap items-center justify-between gap-3">
          {!verificationState?.checked ? (
            <>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playTokenClick();
                  setShowSageHint((prev) => !prev);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-[#c6931b] bg-white text-[#7a5108] hover:bg-[#fef6e2] transition-colors cursor-pointer whitespace-nowrap"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{showSageHint ? 'Ocultar Pista' : 'Pista del Sabio'}</span>
              </button>

              <button
                type="button"
                disabled={!canVerify}
                onClick={handleVerify}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-lg bg-[#241d16] text-white hover:bg-[#3c3024] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap ml-auto"
              >
                <span>Comprobar respuesta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onFinishTurn}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-lg bg-[#9a6b0c] text-white hover:bg-[#7d5307] transition-colors cursor-pointer whitespace-nowrap ml-auto"
            >
              <span>Continuar y pasar turno</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
