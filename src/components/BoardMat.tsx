import React from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Dices, Flag, Sparkles } from 'lucide-react';
import { BOARD_TILES, CIVILIZATIONS } from '../data/boardTiles';
import type { CivilizationId, TeamId, TeamState, TileData } from '../types/game';
import { CivilizationCrest, SpecialCrest } from './CivilizationCrest';

interface BoardMatProps {
  teams: Record<TeamId, TeamState>;
  activeTeamId: TeamId;
  completedTiles: number[];
  diceValue: number | null;
  isRolling: boolean;
  isMoving: boolean;
  onRollDice: () => void;
  onSelectTile: (tile: TileData) => void;
  onSwitchTurn: () => void;
}

const BOARD_PANORAMA_SRC = '/src/assets/images/numstoria_five_cultures_panorama_1795661684707.jpg';

const CIVILIZATION_ORDER: CivilizationId[] = [
  'mesopotamia',
  'egipto',
  'america',
  'india',
  'arabia',
];

const DieFace: React.FC<{ value: number; rolling: boolean; compact?: boolean }> = ({
  value,
  rolling,
  compact = false,
}) => {
  const pipsMap: Record<number, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  };
  const activePips = pipsMap[value] || [4];

  return (
    <div
      className={`${
        compact ? 'w-7 h-7 sm:w-8 sm:h-8 p-1 rounded-lg' : 'w-8 h-8 lg:w-10 lg:h-10 p-1 lg:p-1.5 rounded-xl'
      } bg-[#fffdf8] border-2 border-[#b68416] shadow-md grid grid-cols-3 grid-rows-3 gap-0.5 shrink-0 transition-transform duration-150 ${
        rolling ? 'rotate-12 scale-105' : ''
      }`}
      aria-hidden="true"
    >
      {Array.from({ length: 9 }).map((_, idx) => (
        <span
          key={idx}
          className={`rounded-full m-auto ${compact ? 'w-1 h-1 sm:w-1.5 sm:h-1.5' : 'w-1.5 h-1.5 lg:w-2 lg:h-2'} ${
            activePips.includes(idx) ? 'bg-[#241d16]' : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );
};

const getTileTheme = (tile: TileData, isCompleted: boolean) => {
  if (isCompleted) {
    return {
      surface: 'tile-bevel-completed text-[#3a352e]',
      band: 'bg-[#9e988e]',
      accentText: 'text-[#3a352e]',
    };
  }
  if (tile.category === 'start') {
    return {
      surface: 'bg-[#fff9eb]/95 border-[#c6931b] text-[#241d16]',
      band: 'bg-[#b68416]',
      accentText: 'text-[#8a5d08]',
    };
  }
  if (tile.category === 'special') {
    return {
      surface: 'bg-[#fcf5e8]/95 border-[#c59b47] text-[#241d16]',
      band: 'bg-[#9c7222]',
      accentText: 'text-[#7a5410]',
    };
  }
  const colorMap: Record<
    CivilizationId,
    { surface: string; band: string; accentText: string }
  > = {
    mesopotamia: {
      surface: 'bg-[#fef9f5]/95 border-[#d8a182] text-[#241d16]',
      band: 'bg-[#9a3412]',
      accentText: 'text-[#9a3412]',
    },
    egipto: {
      surface: 'bg-[#fefbf2]/95 border-[#dfb878] text-[#241d16]',
      band: 'bg-[#b45309]',
      accentText: 'text-[#b45309]',
    },
    america: {
      surface: 'bg-[#f8fcfa]/95 border-[#8ab8a8] text-[#241d16]',
      band: 'bg-[#1f5c4a]',
      accentText: 'text-[#1f5c4a]',
    },
    india: {
      surface: 'bg-[#f6f9fd]/95 border-[#8ea8c9] text-[#241d16]',
      band: 'bg-[#1e3a5f]',
      accentText: 'text-[#1e3a5f]',
    },
    arabia: {
      surface: 'bg-[#fdf6f5]/95 border-[#d49494] text-[#241d16]',
      band: 'bg-[#991b1b]',
      accentText: 'text-[#991b1b]',
    },
  };
  return colorMap[tile.category];
};

const getDesktopDirectionArrow = (tileId: number): 'right' | 'down' | 'left' | 'up' | null => {
  if (tileId >= 1 && tileId <= 11) return 'right';
  if (tileId >= 12 && tileId <= 16) return 'down';
  if (tileId >= 17 && tileId <= 27) return 'left';
  if (tileId >= 28 && tileId <= 31) return 'up';
  return null;
};

const getMobileGridLayout = (
  tileId: number
): { row: number; col: number; dir: 'right' | 'down' | 'left' | 'up' | null } => {
  if (tileId >= 1 && tileId <= 6) {
    return { row: 1, col: tileId, dir: tileId === 6 ? 'down' : 'right' };
  }
  if (tileId >= 7 && tileId <= 16) {
    return { row: tileId - 5, col: 6, dir: 'down' };
  }
  if (tileId >= 17 && tileId <= 22) {
    return { row: 12, col: 23 - tileId, dir: tileId === 22 ? 'up' : 'left' };
  }
  return { row: 34 - tileId, col: 1, dir: tileId === 32 ? null : 'up' };
};

export const BoardMat: React.FC<BoardMatProps> = ({
  teams,
  activeTeamId,
  completedTiles,
  diceValue,
  isRolling,
  isMoving,
  onRollDice,
  onSelectTile,
  onSwitchTurn,
}) => {
  const activeTeam = teams[activeTeamId];
  const [imgError, setImgError] = React.useState(false);

  const renderTileButton = (tile: TileData, variant: 'desktop' | 'mobile') => {
    const isCompleted = completedTiles.includes(tile.id);
    const theme = getTileTheme(tile, isCompleted);
    const hasSol = teams.sol.position === tile.id;
    const hasLuna = teams.luna.position === tile.id;
    const isCurrentActiveTile = activeTeam.position === tile.id;

    const mobileLayout = variant === 'mobile' ? getMobileGridLayout(tile.id) : null;
    const gridPos = mobileLayout
      ? { row: mobileLayout.row, col: mobileLayout.col }
      : tile.gridPos;
    const dir = mobileLayout ? mobileLayout.dir : getDesktopDirectionArrow(tile.id);

    const isMobile = variant === 'mobile';

    return (
      <button
        key={`${variant}-${tile.id}`}
        type="button"
        onClick={() => onSelectTile(tile)}
        style={{ gridRow: gridPos.row, gridColumn: gridPos.col }}
        aria-label={`Casilla ${tile.id}: ${tile.title}. ${tile.missionSummary}${
          isCompleted ? ' (Completada)' : ''
        }`}
        className={`group relative flex flex-col justify-between border text-left transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b68416] cursor-pointer h-full min-h-0 overflow-visible tile-bevel ${
          isMobile ? 'rounded-lg p-1' : 'rounded-lg lg:rounded-xl p-1 lg:p-1.5'
        } ${theme.surface} ${
          isCurrentActiveTile ? 'ring-2 ring-[#c6931b] ring-offset-1 ring-offset-[#fbf7ef]' : ''
        }`}
      >
        {/* Top bevel accent bar */}
        <div className={`w-full shrink-0 rounded-full ${isMobile ? 'h-1' : 'h-1 lg:h-1.5'} ${theme.band}`} />

        {/* Number + Symbol Row */}
        <div className="flex-1 min-h-0 flex items-center justify-between gap-0.5 w-full px-0.5">
          <span
            className={`font-mono-tabular font-bold leading-none ${theme.accentText} ${
              isMobile
                ? 'text-xs sm:text-sm'
                : 'text-[clamp(0.85rem,1.45vw,1.35rem)] [@media(max-height:540px)]:text-xs'
            }`}
          >
            {tile.id}
          </span>

          <span className="shrink-0 flex items-center justify-center pointer-events-none">
            {isCompleted ? (
              <span
                className={`inline-flex items-center justify-center rounded-full bg-[#4b453d] text-white ${
                  isMobile ? 'w-3.5 h-3.5' : 'w-3.5 h-3.5 lg:w-4 lg:h-4'
                }`}
                title="Casilla completada"
              >
                <Check className="w-2 h-2 lg:w-2.5 lg:h-2.5" strokeWidth={3} />
              </span>
            ) : tile.category === 'start' ? (
              <Flag className={`${isMobile ? 'w-3 h-3' : 'w-3 h-3 lg:w-4 lg:h-4'} ${theme.accentText}`} />
            ) : tile.category === 'special' && tile.specialKind ? (
              <SpecialCrest
                kind={tile.specialKind}
                className={`${isMobile ? 'w-3 h-3' : 'w-3 h-3 lg:w-4 lg:h-4'} ${theme.accentText}`}
              />
            ) : tile.category !== 'special' ? (
              <CivilizationCrest
                civilization={tile.category}
                className={`${isMobile ? 'w-3 h-3' : 'w-3 h-3 lg:w-4 lg:h-4'} ${theme.accentText}`}
              />
            ) : null}
          </span>
        </div>

        {/* Team Tokens on tile */}
        {(hasSol || hasLuna) && (
          <div className="flex items-center gap-0.5 shrink-0">
            {hasSol && (
              <span
                title="Equipo Sol"
                className={`token-relief-sol rounded-full flex items-center justify-center border border-[#92400e] text-[#451a03] font-bold leading-none ${
                  isMobile
                    ? 'w-3.5 h-3.5 text-[8px]'
                    : 'w-4 h-4 lg:w-5 lg:h-5 text-[9px] lg:text-[11px]'
                }`}
              >
                ☀️
              </span>
            )}
            {hasLuna && (
              <span
                title="Equipo Luna"
                className={`token-relief-luna rounded-full flex items-center justify-center border border-[#172554] text-white font-bold leading-none ${
                  isMobile
                    ? 'w-3.5 h-3.5 text-[8px]'
                    : 'w-4 h-4 lg:w-5 lg:h-5 text-[9px] lg:text-[11px]'
                }`}
              >
                🌙
              </span>
            )}
          </div>
        )}

        {/* Subtle sequential connector arrow */}
        {dir === 'right' && (
          <ArrowRight
            className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-[#7a6955]/75 absolute -right-2 lg:-right-2.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
            aria-hidden="true"
          />
        )}
        {dir === 'down' && (
          <ArrowDown
            className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-[#7a6955]/75 absolute left-1/2 -translate-x-1/2 -bottom-2 lg:-bottom-2.5 z-10 pointer-events-none"
            aria-hidden="true"
          />
        )}
        {dir === 'left' && (
          <ArrowLeft
            className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-[#7a6955]/75 absolute -left-2 lg:-left-2.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
            aria-hidden="true"
          />
        )}
        {dir === 'up' && (
          <ArrowUp
            className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-[#7a6955]/75 absolute left-1/2 -translate-x-1/2 -top-2 lg:-top-2.5 z-10 pointer-events-none"
            aria-hidden="true"
          />
        )}
      </button>
    );
  };

  return (
    <section
      aria-label="Tablero rectangular Numstoria"
      className="relative w-full h-full flex-1 min-h-0 flex flex-col rounded-xl sm:rounded-2xl border-2 border-[#d4c4a8] bg-[#fbf7ef] shadow-[0_14px_38px_-12px_rgba(36,29,22,0.16)] overflow-hidden"
    >
      {/* Full-mat Panoramic Illustrated Background */}
      {!imgError && (
        <img
          src={BOARD_PANORAMA_SRC}
          alt="Ilustración panorámica editorial de Numstoria"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-90 saturate-[1.25] contrast-[1.03] pointer-events-none select-none"
        />
      )}
      {/* Luminous 5-culture watercolor atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(circle at 14% 18%, rgba(154, 52, 18, 0.16) 0%, transparent 40%)',
            'radial-gradient(circle at 86% 18%, rgba(180, 83, 9, 0.16) 0%, transparent 40%)',
            'radial-gradient(circle at 88% 82%, rgba(31, 92, 74, 0.18) 0%, transparent 40%)',
            'radial-gradient(circle at 50% 88%, rgba(30, 58, 95, 0.16) 0%, transparent 36%)',
            'radial-gradient(circle at 12% 82%, rgba(153, 27, 27, 0.16) 0%, transparent 40%)',
            'radial-gradient(ellipse at center, rgba(251,247,239,0.50) 15%, rgba(251,247,239,0.14) 70%, rgba(244,237,224,0.06) 100%)',
          ].join(', '),
        }}
      />

      {/* Inner Editorial Mat Frame (fills remaining height cleanly) */}
      <div className="relative z-10 flex-1 min-h-0 p-1.5 sm:p-2.5 lg:p-3 flex flex-col">
        {/* DESKTOP / TABLET / LANDSCAPE RECTANGULAR BOARD (12x6 clockwise loop) */}
        <div className="hidden md:grid landscape:grid grid-cols-12 grid-rows-6 gap-1.5 lg:gap-2 flex-1 min-h-0 h-full w-full">
          {BOARD_TILES.map((tile) => renderTileButton(tile, 'desktop'))}

          {/* CENTRAL COURTYARD (Cols 2..11, Rows 2..5) */}
          <div className="col-start-2 col-end-12 row-start-2 row-end-6 h-full min-h-0 flex flex-col justify-between items-center px-3 py-1.5 lg:px-6 lg:py-2.5 rounded-xl lg:rounded-2xl border border-[#d6c5a7]/85 bg-[#fbf7ef]/68 backdrop-blur-[2px] shadow-inner overflow-hidden">
            {/* Top: Ornate Metallic Gold Title & Subtitle */}
            <header className="shrink-0 text-center space-y-0.5">
              <div className="hidden sm:flex [@media(max-height:540px)]:hidden items-center justify-center gap-2.5">
                <span className="h-px w-8 lg:w-14 bg-gradient-to-r from-transparent to-[#b68416]" />
                <span className="text-[9.5px] lg:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7a5b20]">
                  Pensamiento Matemático 1
                </span>
                <span className="h-px w-8 lg:w-14 bg-gradient-to-l from-transparent to-[#b68416]" />
              </div>
              <h1 className="font-display text-[clamp(1.25rem,2.6vw,2.65rem)] [@media(max-height:540px)]:text-lg font-extrabold tracking-[0.08em] text-gold-metallic leading-none">
                NUMSTORIA
              </h1>
              <p className="font-display text-[11px] lg:text-xs [@media(max-height:580px)]:hidden italic font-semibold tracking-wide text-[#4f3f2f]">
                Historia y matemáticas en juego
              </p>
            </header>

            {/* Middle: Medallero de Sellos (5 Cultures per Team) */}
            <div
              aria-label="Medallero de sellos por cultura"
              className="w-full max-w-4xl grid grid-cols-2 gap-2 lg:gap-3 my-1 min-h-0 shrink"
            >
              {(['sol', 'luna'] as TeamId[]).map((teamId) => {
                const team = teams[teamId];
                const isTurn = activeTeamId === teamId;
                const totalSeals = Object.values(team.seals).reduce((a, b) => a + b, 0);

                return (
                  <div
                    key={teamId}
                    className={`rounded-xl border px-2.5 py-1.5 lg:px-3 lg:py-2 transition-colors flex flex-col justify-center ${
                      isTurn
                        ? 'bg-white/95 border-[#c6931b] shadow-sm'
                        : 'bg-[#f4ede0]/88 border-[#d6c5a7]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 pb-1 mb-1 lg:pb-1.5 lg:mb-1.5 border-b border-[#e5dac6]">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-[10px] lg:text-xs shrink-0 ${
                            teamId === 'sol'
                              ? 'token-relief-sol border border-[#92400e]'
                              : 'token-relief-luna border border-[#172554]'
                          }`}
                        >
                          {teamId === 'sol' ? '☀️' : '🌙'}
                        </span>
                        <span className="text-[11px] lg:text-sm font-bold text-[#241d16] truncate">
                          {team.name}
                        </span>
                        {isTurn && (
                          <span className="hidden sm:inline text-[10px] lg:text-[11px] font-semibold text-[#9a6b0c] whitespace-nowrap">
                            · En turno
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] lg:text-[11px] font-mono-tabular font-semibold text-[#5c4f41] shrink-0">
                        <span>C.{team.position}</span>
                        <span>·</span>
                        <span className="text-[#241d16]">{totalSeals}</span>
                      </div>
                    </div>

                    {/* 5 Civilization Seal Medallions */}
                    <div className="grid grid-cols-5 gap-1">
                      {CIVILIZATION_ORDER.map((civId) => {
                        const civ = CIVILIZATIONS[civId];
                        const count = team.seals[civId];
                        const earned = count > 0;

                        return (
                          <div
                            key={civId}
                            title={`${civ.name}: ${count} sello${count === 1 ? '' : 's'}`}
                            className={`rounded-md lg:rounded-lg border px-0.5 py-1 lg:py-1.5 flex flex-col items-center justify-center text-center transition-colors ${
                              earned
                                ? 'bg-white shadow-xs'
                                : 'bg-[#ede5d5]/70 border-[#d6c9b4] text-[#8c7e6d]'
                            }`}
                            style={
                              earned
                                ? {
                                    borderColor: civ.borderHex,
                                    backgroundColor: civ.softBgHex,
                                    color: civ.textHex,
                                  }
                                : undefined
                            }
                          >
                            <CivilizationCrest civilization={civId} className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                            <span className="hidden lg:block text-[9px] font-semibold leading-tight mt-0.5 truncate max-w-full">
                              {civId === 'mesopotamia' ? 'Mesopot.' : civ.shortName}
                            </span>
                            <span className="font-mono-tabular text-[9.5px] lg:text-[10px] font-bold leading-none mt-0.5">
                              {earned ? `×${count}` : '—'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Courtyard: Turn & Interactive Dice Bar */}
            <div className="w-full max-w-3xl shrink-0 flex items-center justify-between gap-2 lg:gap-3 rounded-xl border border-[#d6c5a7] bg-white/95 px-2.5 py-1.5 lg:px-4 lg:py-2 shadow-sm">
              <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                <DieFace value={diceValue ?? 6} rolling={isRolling} />
                <div className="min-w-0">
                  <div className="text-[11px] lg:text-xs font-semibold text-[#5c4f41] truncate">
                    Turno:{' '}
                    <span className="text-[#241d16] font-bold">
                      {activeTeam.name} {activeTeamId === 'sol' ? '☀️' : '🌙'}
                    </span>
                  </div>
                  <div className="text-[10px] lg:text-xs text-[#6d5f4f] truncate">
                    {isRolling
                      ? 'Lanzando el dado...'
                      : isMoving
                        ? 'Avanzando ficha...'
                        : diceValue
                          ? `Último dado: ${diceValue} · Lanza o elige casilla`
                          : 'Lanza el dado o elige una casilla'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onSwitchTurn}
                  disabled={isRolling || isMoving}
                  className="px-2.5 py-1.5 lg:px-3 lg:py-2 text-[11px] lg:text-xs font-medium rounded-lg border border-[#d6c5a7] bg-[#fbf7ef] text-[#4c4034] hover:bg-[#efe6d5] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cambiar turno
                </button>
                <button
                  type="button"
                  onClick={onRollDice}
                  disabled={isRolling || isMoving}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 lg:px-4 lg:py-2 text-[11px] lg:text-sm font-bold rounded-lg bg-[#9a6b0c] text-white hover:bg-[#7d5307] disabled:opacity-50 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <Dices className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <span>Lanzar dado</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE PORTRAIT PERIMETER BOARD (6x12 clockwise loop, fits 100vh x 100vw without scroll) */}
        <div className="grid md:hidden landscape:hidden grid-cols-6 grid-rows-12 gap-1 flex-1 min-h-0 h-full w-full">
          {BOARD_TILES.map((tile) => renderTileButton(tile, 'mobile'))}

          {/* MOBILE CENTRAL COURTYARD (Cols 2..5, Rows 2..11) */}
          <div className="col-start-2 col-end-6 row-start-2 row-end-12 h-full min-h-0 flex flex-col justify-between items-center p-2 rounded-xl border border-[#d6c5a7]/85 bg-[#fbf7ef]/76 backdrop-blur-[2px] shadow-inner overflow-hidden">
            {/* Title */}
            <header className="shrink-0 text-center">
              <h1 className="font-display text-lg sm:text-2xl font-extrabold tracking-[0.08em] text-gold-metallic leading-none">
                NUMSTORIA
              </h1>
              <p className="font-display text-[10px] sm:text-xs italic font-semibold text-[#4f3f2f] mt-0.5">
                Historia y matemáticas
              </p>
            </header>

            {/* Stacked Team Cards */}
            <div className="w-full space-y-1.5 min-h-0 shrink">
              {(['sol', 'luna'] as TeamId[]).map((teamId) => {
                const team = teams[teamId];
                const isTurn = activeTeamId === teamId;
                const totalSeals = Object.values(team.seals).reduce((a, b) => a + b, 0);

                return (
                  <div
                    key={`m-${teamId}`}
                    className={`rounded-lg border px-2 py-1.5 transition-colors ${
                      isTurn
                        ? 'bg-white/95 border-[#c6931b] shadow-xs'
                        : 'bg-[#f4ede0]/90 border-[#d6c5a7]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 text-[11px] font-bold">
                      <span className="truncate text-[#241d16]">
                        {teamId === 'sol' ? '☀️' : '🌙'} {team.name}
                      </span>
                      <span className="font-mono-tabular text-[10px] text-[#5c4f41] shrink-0">
                        C.{team.position} · {totalSeals}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-1 mt-1">
                      {CIVILIZATION_ORDER.map((civId) => {
                        const civ = CIVILIZATIONS[civId];
                        const count = team.seals[civId];
                        const earned = count > 0;
                        return (
                          <div
                            key={`m-${teamId}-${civId}`}
                            title={`${civ.name}: ${count}`}
                            className={`rounded border py-0.5 flex flex-col items-center justify-center ${
                              earned
                                ? 'bg-white'
                                : 'bg-[#ede5d5]/70 border-[#d6c9b4] text-[#8c7e6d]'
                            }`}
                            style={
                              earned
                                ? {
                                    borderColor: civ.borderHex,
                                    backgroundColor: civ.softBgHex,
                                    color: civ.textHex,
                                  }
                                : undefined
                            }
                          >
                            <CivilizationCrest civilization={civId} className="w-3 h-3" />
                            <span className="font-mono-tabular text-[9px] font-bold leading-none mt-0.5">
                              {earned ? `×${count}` : '—'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Dice & Turn Control Box */}
            <div className="w-full shrink-0 rounded-lg border border-[#d6c5a7] bg-white/95 p-1.5 sm:p-2 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 min-w-0">
                <DieFace value={diceValue ?? 6} rolling={isRolling} compact />
                <div className="min-w-0 text-[10px] sm:text-xs leading-tight">
                  <div className="font-bold text-[#241d16] truncate">
                    {activeTeam.name} {activeTeamId === 'sol' ? '☀️' : '🌙'}
                  </div>
                  <div className="text-[#5c4f41] truncate">
                    {isRolling
                      ? 'Lanzando...'
                      : isMoving
                        ? 'Avanzando...'
                        : diceValue
                          ? `Dado: ${diceValue} · Casilla ${activeTeam.position}`
                          : `Casilla ${activeTeam.position}`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onSwitchTurn}
                  disabled={isRolling || isMoving}
                  className="px-2 py-1.5 text-[10px] font-medium rounded-md border border-[#d6c5a7] bg-[#fbf7ef] text-[#4c4034] hover:bg-[#efe6d5] disabled:opacity-40 cursor-pointer whitespace-nowrap"
                >
                  Turno
                </button>
                <button
                  type="button"
                  onClick={onRollDice}
                  disabled={isRolling || isMoving}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-[11px] font-bold rounded-md bg-[#9a6b0c] text-white hover:bg-[#7d5307] disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  <Dices className="w-3.5 h-3.5 shrink-0" />
                  <span>Lanzar dado</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Expedition Legend for the 5 Cultures */}
      <div className="relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 px-2.5 sm:px-4 py-1 sm:py-1.5 border-t border-[#ded2be] bg-[#f4ede0]/92 text-[9.5px] sm:text-[11px] text-[#5c4f41]">
        <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-4 gap-y-0.5">
          {CIVILIZATION_ORDER.map((civId) => {
            const civ = CIVILIZATIONS[civId];
            return (
              <span key={civId} className="inline-flex items-center gap-1 font-medium">
                <span
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-xs inline-block"
                  style={{ backgroundColor: civ.accentHex }}
                />
                <span>{civ.name}</span>
              </span>
            );
          })}
          <span className="inline-flex items-center gap-1 font-medium">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-xs inline-block bg-[#c8c4bc] border border-[#9e988e]" />
            <span>Completada</span>
          </span>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1 text-[#6e5d4a] font-medium">
          <Sparkles className="w-3 h-3 text-[#9a6b0c]" />
          <span>Recorrido secuencial 1 → 32</span>
        </div>
      </div>
    </section>
  );
};
