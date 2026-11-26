import React, { useRef, useState } from 'react';
import { ArrowRight, Play, RotateCcw, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface WelcomeModalProps {
  videoUrl: string;
  onEnter: () => void;
  onSkip: () => void;
}

const BOARD_PANORAMA_SRC = '/src/assets/images/numstoria_five_cultures_panorama_1795661684707.jpg';

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ videoUrl, onEnter, onSkip }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const [bgImgError, setBgImgError] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted && videoRef.current.paused && !hasEnded) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    setHasEnded(false);
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  return (
    <div
      className="fixed inset-0 z-50 h-dvh max-h-screen w-full overflow-hidden bg-[#fbf7ef] text-[#241d16] flex items-center justify-center p-2.5 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      style={{
        backgroundImage: [
          'radial-gradient(circle at 8% 12%, rgba(154, 52, 18, 0.12) 0%, transparent 38%)',
          'radial-gradient(circle at 92% 12%, rgba(180, 83, 9, 0.12) 0%, transparent 38%)',
          'radial-gradient(circle at 92% 88%, rgba(31, 92, 74, 0.12) 0%, transparent 38%)',
          'radial-gradient(circle at 50% 94%, rgba(30, 58, 95, 0.11) 0%, transparent 36%)',
          'radial-gradient(circle at 8% 88%, rgba(153, 27, 27, 0.11) 0%, transparent 38%)',
        ].join(', '),
      }}
    >
      {!bgImgError && (
        <img
          src={BOARD_PANORAMA_SRC}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          onError={() => setBgImgError(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-22 pointer-events-none select-none"
        />
      )}

      <div className="relative z-10 w-full max-w-4xl max-h-full flex flex-col rounded-2xl border-2 border-[#c6931b]/75 bg-[#fbf7ef]/96 shadow-[0_20px_50px_-14px_rgba(36,29,22,0.22)] overflow-hidden">
        {/* Top Editorial Banner */}
        <header className="shrink-0 px-4 py-2.5 sm:px-6 sm:py-3.5 border-b border-[#dfd3be] bg-[#f4ede0]/90 text-center space-y-0.5">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-[#b68416]" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7a5b20]">
              Pensamiento Matemático 1 · Cinemática de bienvenida
            </span>
            <span className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-[#b68416]" />
          </div>
          <h1
            id="welcome-title"
            className="font-display text-2xl sm:text-4xl font-extrabold tracking-[0.08em] text-gold-metallic leading-none"
          >
            NUMSTORIA
          </h1>
          <p className="font-display text-xs sm:text-sm italic font-semibold text-[#4f3f2f]">
            Historia y matemáticas en juego
          </p>
        </header>

        {/* Clean Native Video Stage framed in light parchment & soft gold */}
        <div className="flex-1 min-h-0 flex items-center justify-center p-2.5 sm:p-4 bg-[#f4ede0]/55">
          <div className="relative w-full max-w-[min(100%,calc((100dvh-215px)*16/9))] aspect-video max-h-full rounded-xl overflow-hidden border-2 border-[#c6931b]/60 bg-[#fbf7ef] p-1 shadow-[0_10px_30px_-10px_rgba(122,81,8,0.25)]">
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#241d16]/5">
              <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                muted
                playsInline
                preload="auto"
                controls={false}
                disablePictureInPicture
                onEnded={() => setHasEnded(true)}
                className="w-full h-full max-h-screen object-contain block"
              />

              {/* End-of-video highlighted overlay */}
              {hasEnded && (
                <div className="absolute inset-0 bg-[#fbf7ef]/82 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 p-4 text-center">
                  <p className="font-display text-base sm:text-xl font-bold text-[#241d16]">
                    La expedición histórica está lista
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={onEnter}
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 text-sm sm:text-base font-bold rounded-xl bg-[#9a6b0c] text-white hover:bg-[#7d5307] shadow-md ring-2 ring-[#c6931b]/60 ring-offset-2 ring-offset-[#fbf7ef] transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Comenzar aventura</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleReplay}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-[#c9b798] bg-white text-[#3a3026] hover:bg-[#efe6d5] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ver de nuevo</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Clean Editorial Footer Controls */}
        <footer className="shrink-0 px-3.5 py-2.5 sm:px-6 sm:py-3.5 border-t border-[#dfd3be] bg-[#f4ede0]/92 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={handleToggleSound}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
              isMuted
                ? 'border-[#d6c5a7] bg-white/90 text-[#4f3f2f] hover:bg-[#fbf7ef]'
                : 'border-[#1f5c4a]/60 bg-[#eef6f2] text-[#154235] hover:bg-[#dfeee6]'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isMuted ? 'Activar audio' : 'Silenciar audio'}</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {!hasEnded && (
              <button
                type="button"
                onClick={onSkip}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-[#c9b798] bg-white text-[#3a3026] hover:bg-[#efe6d5] transition-colors cursor-pointer whitespace-nowrap"
              >
                <SkipForward className="w-4 h-4" />
                <span>Omitir intro</span>
              </button>
            )}
            <button
              type="button"
              onClick={onEnter}
              className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-lg bg-[#9a6b0c] text-white hover:bg-[#7d5307] transition-all cursor-pointer whitespace-nowrap ${
                hasEnded
                  ? 'shadow-md ring-2 ring-[#c6931b]/70 ring-offset-2 ring-offset-[#f4ede0]'
                  : 'shadow-sm'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{hasEnded ? 'Comenzar aventura' : 'Entrar al juego'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
