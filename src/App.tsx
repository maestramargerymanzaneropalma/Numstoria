import React, { useEffect, useRef, useState } from 'react';
import { Award, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { BoardMat } from './components/BoardMat';
import { ChallengeModal } from './components/ChallengeModal';
import { CivilizationCrest } from './components/CivilizationCrest';
import { RulesModal } from './components/RulesModal';
import { SpecialTileModal } from './components/SpecialTileModal';
import { WelcomeModal } from './components/WelcomeModal';
import { BOARD_TILES, CIVILIZATIONS } from './data/boardTiles';
import type { CivilizationId, TeamId, TeamState, TileData } from './types/game';
import { soundEngine } from './utils/sound';

const INTRO_VIDEO_URL = '/assets/aistudio/gemini_generated_video_1cc4ea48_a3ea9914.mp4';

const createInitialTeams = (): Record<TeamId, TeamState> => ({
  sol: {
    id: 'sol',
    name: 'Equipo Sol',
    position: 1,
    seals: { mesopotamia: 0, egipto: 0, america: 0, india: 0, arabia: 0 },
  },
  luna: {
    id: 'luna',
    name: 'Equipo Luna',
    position: 1,
    seals: { mesopotamia: 0, egipto: 0, america: 0, india: 0, arabia: 0 },
  },
});

const CIVILIZATION_LIST: CivilizationId[] = [
  'mesopotamia',
  'egipto',
  'america',
  'india',
  'arabia',
];

export default function App() {
  const [teams, setTeams] = useState<Record<TeamId, TeamState>>(createInitialTeams);
  const [activeTeamId, setActiveTeamId] = useState<TeamId>('sol');
  const [completedTiles, setCompletedTiles] = useState<number[]>([]);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const [activeChallengeTile, setActiveChallengeTile] = useState<TileData | null>(null);
  const [activeSpecialTile, setActiveSpecialTile] = useState<TileData | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [statusNote, setStatusNote] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);

  const timersRef = useRef<number[]>([]);

  const clearScheduledTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearScheduledTimers();
  }, []);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    soundEngine.muted = nextMuted;
  };

  const resetGame = () => {
    clearScheduledTimers();
    setTeams(createInitialTeams());
    setActiveTeamId('sol');
    setCompletedTiles([]);
    setDiceValue(null);
    setIsRolling(false);
    setIsMoving(false);
    setActiveChallengeTile(null);
    setActiveSpecialTile(null);
    setShowVictoryModal(false);
    setStatusNote(null);
  };

  const openLandedTile = (tileId: number) => {
    const tile = BOARD_TILES.find((t) => t.id === tileId);
    if (!tile) return;

    if (tile.category === 'start') {
      setStatusNote('Campamento Base: lanza el dado para iniciar la expedición.');
      return;
    }

    if (tile.category === 'special') {
      setActiveSpecialTile(tile);
      return;
    }

    setActiveChallengeTile(tile);
  };

  const handleRollDice = () => {
    if (isRolling || isMoving) return;
    setStatusNote(null);
    setIsRolling(true);
    soundEngine.playDiceRoll();

    let ticks = 0;
    const rollInterval = window.setInterval(() => {
      ticks += 1;
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      if (ticks >= 6) {
        window.clearInterval(rollInterval);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalRoll);
        setIsRolling(false);
        setIsMoving(true);

        const currentPos = teams[activeTeamId].position;
        const targetPos = Math.min(32, currentPos + finalRoll);
        const stepsCount = targetPos - currentPos;

        if (stepsCount === 0) {
          setIsMoving(false);
          openLandedTile(32);
          return;
        }

        for (let step = 1; step <= stepsCount; step++) {
          const tId = window.setTimeout(() => {
            const nextPos = currentPos + step;
            soundEngine.playStep(step);
            setTeams((prev) => ({
              ...prev,
              [activeTeamId]: {
                ...prev[activeTeamId],
                position: nextPos,
              },
            }));

            if (step === stepsCount) {
              const finishTimer = window.setTimeout(() => {
                setIsMoving(false);
                openLandedTile(targetPos);
              }, 220);
              timersRef.current.push(finishTimer);
            }
          }, step * 150);
          timersRef.current.push(tId);
        }
      }
    }, 65);
  };

  const handleSelectTile = (tile: TileData) => {
    if (isRolling || isMoving) return;
    setStatusNote(null);
    if (tile.category === 'start') {
      setStatusNote(
        `${tile.title}: punto de salida para Equipo Sol y Equipo Luna. Lanza el dado para avanzar.`
      );
      return;
    }
    if (tile.category === 'special') {
      setActiveSpecialTile(tile);
      return;
    }
    setActiveChallengeTile(tile);
  };

  const handleConfirmSpecialTile = () => {
    if (!activeSpecialTile) return;
    const tileId = activeSpecialTile.id;

    soundEngine.playStep(3);
    const jumpedPos = Math.min(32, Math.max(teams[activeTeamId].position, tileId) + 2);
    setTeams((prev) => ({
      ...prev,
      [activeTeamId]: {
        ...prev[activeTeamId],
        position: jumpedPos,
      },
    }));
    setActiveSpecialTile(null);
    const destTile = BOARD_TILES.find((t) => t.id === jumpedPos);
    if (destTile && destTile.category !== 'special' && destTile.category !== 'start') {
      setActiveChallengeTile(destTile);
    }
  };

  const handleVerificationResult = (tile: TileData, isCorrect: boolean) => {
    if (tile.category === 'start' || tile.category === 'special') return;
    const civId = tile.category as CivilizationId;
    const currentTeam = teams[activeTeamId];

    if (!isCorrect) {
      setStatusNote(
        `${currentTeam.name} no acertó la casilla ${tile.id}; no se asignó sello.`
      );
      return;
    }

    setTeams((prev) => ({
      ...prev,
      [activeTeamId]: {
        ...prev[activeTeamId],
        seals: {
          ...prev[activeTeamId].seals,
          [civId]: prev[activeTeamId].seals[civId] + 1,
        },
      },
    }));

    setCompletedTiles((prev) => (prev.includes(tile.id) ? prev : [...prev, tile.id]));
    setStatusNote(
      `${currentTeam.name} obtuvo +1 sello de ${CIVILIZATIONS[civId].shortName} en la casilla ${tile.id}.`
    );
  };

  const handleFinishTurn = () => {
    const justFinishedTile = activeChallengeTile;
    setActiveChallengeTile(null);

    if (justFinishedTile?.isFinal || completedTiles.length >= 30) {
      setShowVictoryModal(true);
    } else {
      setActiveTeamId((prev) => (prev === 'sol' ? 'luna' : 'sol'));
    }
  };

  const solTotal = Object.values(teams.sol.seals).reduce((a, b) => a + b, 0);
  const lunaTotal = Object.values(teams.luna.seals).reduce((a, b) => a + b, 0);

  return (
    <div
      className="h-dvh w-full max-w-screen overflow-hidden bg-[#fbf7ef] text-[#241d16] flex flex-col"
      style={{
        backgroundImage: [
          'radial-gradient(circle at 8% 12%, rgba(154, 52, 18, 0.11) 0%, transparent 36%)',
          'radial-gradient(circle at 92% 12%, rgba(180, 83, 9, 0.12) 0%, transparent 36%)',
          'radial-gradient(circle at 92% 88%, rgba(31, 92, 74, 0.11) 0%, transparent 36%)',
          'radial-gradient(circle at 50% 94%, rgba(30, 58, 95, 0.10) 0%, transparent 34%)',
          'radial-gradient(circle at 8% 88%, rgba(153, 27, 27, 0.10) 0%, transparent 36%)',
        ].join(', '),
      }}
    >
      {/* Clean 3-Zone Editorial Header */}
      <header className="shrink-0 border-b border-[#dfd3be] bg-[#f4ede0]/85 backdrop-blur-xs">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single-line brand wordmark */}
          <span className="font-display text-base sm:text-xl font-bold tracking-wider text-[#241d16] whitespace-nowrap shrink-0">
            Numstoria
          </span>

          {/* Zone 2: Concise single-line utility links */}
          <nav className="flex items-center gap-4 sm:gap-7 text-xs sm:text-sm font-medium text-[#5c4f41]">
            <button
              type="button"
              onClick={() => setShowRules(true)}
              className="hover:text-[#241d16] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Reglas
            </button>
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-1.5 hover:text-[#241d16] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{muted ? 'Sin sonido' : 'Sonido'}</span>
            </button>
            <span className="hidden md:inline font-mono-tabular text-xs text-[#6d5f4f] whitespace-nowrap shrink-0">
              Casillas resueltas: {completedTiles.length}/30
            </span>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={resetGame}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#241d16] text-white hover:bg-[#3a3026] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nueva partida</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Rectangular Board Stage (fits 100vh x 100vw without scroll) */}
      <main className="relative flex-1 min-h-0 max-w-[1440px] w-full mx-auto px-1.5 sm:px-4 py-1.5 sm:py-2.5 flex flex-col">
        {statusNote && (
          <div
            role="status"
            className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-1.5rem)] max-w-2xl rounded-xl border border-[#d6c5a7] bg-white/95 backdrop-blur-xs px-3.5 py-2 text-xs sm:text-sm font-medium text-[#241d16] shadow-lg flex items-center justify-between gap-3"
          >
            <span>{statusNote}</span>
            <button
              type="button"
              onClick={() => setStatusNote(null)}
              className="text-xs text-[#6d5f4f] hover:text-[#241d16] underline cursor-pointer shrink-0"
            >
              Ocultar
            </button>
          </div>
        )}

        <BoardMat
          teams={teams}
          activeTeamId={activeTeamId}
          completedTiles={completedTiles}
          diceValue={diceValue}
          isRolling={isRolling}
          isMoving={isMoving}
          onRollDice={handleRollDice}
          onSelectTile={handleSelectTile}
          onSwitchTurn={() => {
            soundEngine.playTokenClick();
            setActiveTeamId((prev) => (prev === 'sol' ? 'luna' : 'sol'));
          }}
        />
      </main>

      {/* Welcome Intro Video Screen */}
      {showWelcome && (
        <WelcomeModal
          videoUrl={INTRO_VIDEO_URL}
          onEnter={() => setShowWelcome(false)}
          onSkip={() => setShowWelcome(false)}
        />
      )}

      {/* Modals */}
      {activeChallengeTile && (
        <ChallengeModal
          key={activeChallengeTile.id}
          tile={activeChallengeTile}
          activeTeam={teams[activeTeamId]}
          isCompleted={completedTiles.includes(activeChallengeTile.id)}
          onClose={() => setActiveChallengeTile(null)}
          onVerificationResult={handleVerificationResult}
          onFinishTurn={handleFinishTurn}
        />
      )}

      {activeSpecialTile && (
        <SpecialTileModal
          tile={activeSpecialTile}
          activeTeam={teams[activeTeamId]}
          onConfirm={handleConfirmSpecialTile}
          onClose={() => setActiveSpecialTile(null)}
        />
      )}

      {showRules && <RulesModal onClose={() => setShowRules(false)} />}

      {showVictoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#241d16]/45 backdrop-blur-[2px] p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="victory-title"
        >
          <div className="w-full max-w-lg rounded-2xl border-2 border-[#c6931b] bg-[#fbf7ef] p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#fef3c7] border border-[#c6931b] text-[#9a6b0c] flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 id="victory-title" className="font-display text-2xl font-bold text-[#241d16]">
                Expedición completada
              </h2>
              <p className="text-sm text-[#5c4f41]">
                {solTotal === lunaTotal
                  ? 'Empate histórico entre Equipo Sol y Equipo Luna.'
                  : solTotal > lunaTotal
                    ? 'Equipo Sol ☀️ lidera el medallero de sellos.'
                    : 'Equipo Luna 🌙 lidera el medallero de sellos.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left">
              {(['sol', 'luna'] as TeamId[]).map((id) => {
                const team = teams[id];
                const total = Object.values(team.seals).reduce((a, b) => a + b, 0);
                return (
                  <div
                    key={id}
                    className="rounded-xl border border-[#d6c5a7] bg-white p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span>
                        {id === 'sol' ? '☀️' : '🌙'} {team.name}
                      </span>
                      <span className="font-mono-tabular text-[#9a6b0c]">{total}</span>
                    </div>
                    <div className="space-y-1 text-xs text-[#5c4f41]">
                      {CIVILIZATION_LIST.map((civId) => (
                        <div key={civId} className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5">
                            <CivilizationCrest civilization={civId} className="w-3.5 h-3.5" />
                            <span>{CIVILIZATIONS[civId].shortName}</span>
                          </span>
                          <span className="font-mono-tabular font-semibold">
                            {team.seals[civId]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowVictoryModal(false)}
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-[#d6c5a7] bg-white text-[#241d16] hover:bg-[#f4ede0] cursor-pointer"
              >
                Seguir explorando
              </button>
              <button
                type="button"
                onClick={resetGame}
                className="px-5 py-2 text-xs sm:text-sm font-bold rounded-lg bg-[#9a6b0c] text-white hover:bg-[#7d5307] cursor-pointer"
              >
                Jugar de nuevo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
