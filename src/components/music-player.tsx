"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  loadVideoById(videoId: string): void;
  cueVideoById(videoId: string): void;
  destroy(): void;
}

interface YTPlayerOptions {
  width: number;
  height: number;
  videoId: string;
  playerVars: Record<string, number | string>;
  events: {
    onReady?: () => void;
    onStateChange?: (event: { data: number }) => void;
    onError?: () => void;
  };
}

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: YTPlayerOptions) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface Track {
  title: string;
  artist: string;
  videoId: string;
}

const TRACKS: Track[] = [
  {
    title: "La Campanella ( 1826 )",
    artist: "Niccolò Paganini",
    videoId: "6ruHDWSNvB8",
  },
  {
    title: "Alla Turca (Sonata No. 11)",
    artist: "Mozart · Tzvi Erez",
    videoId: "SQh1zztmpEk",
  },
  {
    title: "Passacaglia",
    artist: "Handel / Halvorsen",
    videoId: "ApCL2GomTD4",
  },
];

function loadYouTubeApi(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }
    if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      window.clearInterval(poll);
      window.clearTimeout(timeout);
      resolve();
    };
    const poll = window.setInterval(() => {
      if (window.YT?.Player) {
        window.clearInterval(poll);
        window.clearTimeout(timeout);
        resolve();
      }
    }, 200);
    const timeout = window.setTimeout(() => {
      window.clearInterval(poll);
      reject(new Error("Music is unavailable"));
    }, 15000);
  });
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function MusicPlayer({ active = true }: { active?: boolean }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const track = TRACKS[trackIndex]!;
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    let cancelled = false;
    loadYouTubeApi()
      .then(() => {
        if (cancelled || !hostRef.current || !window.YT) return;
        const mount = document.createElement("div");
        hostRef.current.replaceChildren(mount);
        playerRef.current = new window.YT.Player(mount, {
          width: 200,
          height: 200,
          videoId: TRACKS[0]!.videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              if (!cancelled) setReady(true);
            },
            onError: () => {
              if (!cancelled) {
                setUnavailable(true);
                setIsPlaying(false);
              }
            },
            onStateChange: (e) => {
              if (cancelled) return;
              setIsPlaying(e.data === 1);
              if (e.data === 0) {
                try {
                  playerRef.current?.seekTo(0, true);
                  playerRef.current?.playVideo();
                } catch {
                  /* player not ready */
                }
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setUnavailable(true);
      });
    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
        playerRef.current = null;
      } catch {
        /* player already gone */
      }
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      try {
        setCurrentTime(player.getCurrentTime());
        const d = player.getDuration();
        if (d > 0) setDuration(d);
      } catch {
        /* player not ready */
      }
    }, 500);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  useEffect(() => {
    if (!active && ready) playerRef.current?.pauseVideo();
  }, [active, ready]);

  const goToTrack = (index: number) => {
    const next = (index + TRACKS.length) % TRACKS.length;
    const wasPlaying = isPlaying;
    setTrackIndex(next);
    setCurrentTime(0);
    setDuration(0);
    const player = playerRef.current;
    if (!player) return;
    try {
      if (wasPlaying) {
        player.loadVideoById(TRACKS[next]!.videoId);
      } else {
        player.cueVideoById(TRACKS[next]!.videoId);
      }
    } catch {
      /* player not ready */
    }
  };

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player || !ready) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const seek = (clientX: number, bar: HTMLDivElement) => {
    const player = playerRef.current;
    if (!player || duration <= 0) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    player.seekTo(ratio * duration, true);
    setCurrentTime(ratio * duration);
  };

  return (
    <div className="relative h-20 w-full min-w-0 rounded-xl bg-muted/30 p-2" data-music-player>
      <div className="flex h-full items-center gap-3">
        <div className="relative h-14 w-14 flex-none" aria-hidden="true">
          <div className="absolute -bottom-2 left-1/2 h-3 w-[85%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-md" />
          <div
            className="relative h-full w-full rounded-full"
            style={{
              background: [
                "repeating-radial-gradient(circle at center, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
                "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.16) 14deg, transparent 38deg, transparent 140deg, rgba(255,255,255,0.09) 158deg, transparent 176deg, transparent 280deg, rgba(255,255,255,0.13) 296deg, transparent 318deg)",
                "radial-gradient(circle, #121212 0%, #0b0b0b 62%, #050505 100%)",
              ].join(", "),
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 12px 28px rgba(0,0,0,0.75)",
              animation: "vinyl-spin 2s linear infinite",
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          >
            <div
              className="absolute inset-[29%] rounded-full"
              style={{
                background: "radial-gradient(circle at 40% 35%, #2c2c2c, #141414 72%)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
              }}
            >
              <div className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-neutral-200" />
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.10), transparent 45%)",
            }}
          />

          {/* ── Tonearm ── pivot anchored top-right, swings onto record when playing */}
          <div
            className="pointer-events-none absolute z-10"
            style={{
              top: "-6px",
              right: "-6px",
              // Transform origin matches the SVG pivot circle (cx=40, cy=5 within the 44×56 svg)
              transformOrigin: "40px 5px",
              transform: isPlaying ? "rotate(28deg)" : "rotate(-5deg)",
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <svg width="44" height="56" viewBox="0 0 44 56" fill="none">
              {/* Pivot bearing */}
              <circle cx="40" cy="5" r="4" fill="#6b6b6b" />
              <circle cx="40" cy="5" r="2" fill="#c0c0c0" />
              {/* Arm rod — tapered, metallic gradient */}
              <line
                x1="40"
                y1="5"
                x2="8"
                y2="50"
                stroke="url(#toneGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Headshell */}
              <rect
                x="3"
                y="46"
                width="8"
                height="3.5"
                rx="1"
                fill="#999"
                transform="rotate(-52 7 47.5)"
              />
              {/* Stylus tip */}
              <circle cx="5" cy="52" r="1.4" fill="#e0e0e0" />
              <defs>
                <linearGradient
                  id="toneGrad"
                  x1="40"
                  y1="5"
                  x2="8"
                  y2="50"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#888" />
                  <stop offset="45%" stopColor="#d4d4d4" />
                  <stop offset="100%" stopColor="#777" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1">
            <p className="min-w-0 flex-1 truncate text-xs font-medium text-foreground">
              {track.title}
            </p>
            <div className="flex flex-none items-center gap-1">
              <button
                disabled={!ready || unavailable}
                type="button"
                onClick={() => goToTrack(trackIndex - 1)}
                aria-label="Previous track"
                className="flex size-6 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:cursor-wait disabled:opacity-40"
              >
                <SkipBack size={13} fill="currentColor" />
              </button>
              <button
                disabled={!ready || unavailable}
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-neutral-600 text-foreground transition-all hover:scale-105 hover:border-neutral-200 active:scale-95 disabled:cursor-wait disabled:opacity-40"
              >
                {isPlaying ? (
                  <Pause size={13} fill="currentColor" />
                ) : (
                  <Play size={13} fill="currentColor" className="ml-0.5" />
                )}
              </button>
              <button
                disabled={!ready || unavailable}
                type="button"
                onClick={() => goToTrack(trackIndex + 1)}
                aria-label="Next track"
                className="flex size-6 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:cursor-wait disabled:opacity-40"
              >
                <SkipForward size={13} fill="currentColor" />
              </button>
            </div>
          </div>
          {unavailable ? (
            <a
              className="block truncate text-[10px] leading-3 text-muted-foreground underline"
              href={`https://www.youtube.com/watch?v=${track.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen on YouTube
            </a>
          ) : (
            <p className="truncate text-[10px] leading-3 text-muted-foreground">{track.artist}</p>
          )}

          <div
            tabIndex={ready && duration > 0 ? 0 : -1}
            aria-disabled={!ready || duration <= 0}
            onKeyDown={(e) => {
              if (!duration || !playerRef.current) return;
              const target =
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? duration
                    : e.key === "ArrowRight"
                      ? Math.min(duration, currentTime + 5)
                      : e.key === "ArrowLeft"
                        ? Math.max(0, currentTime - 5)
                        : null;
              if (target === null) return;
              e.preventDefault();
              playerRef.current.seekTo(target, true);
              setCurrentTime(target);
            }}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(currentTime)}
            className="group flex h-3 cursor-pointer items-center"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              seek(e.clientX, e.currentTarget);
            }}
            onPointerMove={(e) => {
              if (e.buttons === 1) seek(e.clientX, e.currentTarget);
            }}
          >
            <div className="relative h-[3px] w-full rounded-full bg-muted transition-colors group-hover:bg-muted-foreground/30">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-foreground"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] leading-[10px] text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute left-0 top-0 h-[200px] w-[200px] overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <div ref={hostRef} />
      </div>
    </div>
  );
}

export default MusicPlayer;
