"use client";

import { LIVE_STREAM_URL } from "@/lib/news-data";
import { Button } from "@/components/ui/button";
import { Loader2, Pause, Play, Radio, WifiOff } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type RadioStatus = "idle" | "loading" | "playing" | "error";

type RadioPlayerContextValue = {
  isPlaying: boolean;
  status: RadioStatus;
  hasActivated: boolean;
  streamUrl: string;
  togglePlayback: () => Promise<void>;
  suppressMini: boolean;
  setSuppressMini: (v: boolean) => void;
  showEmbed: boolean;
  setShowEmbed: (v: boolean) => void;
};

const RadioPlayerContext = createContext<RadioPlayerContextValue | null>(null);

function getReadableSource(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export function RadioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<RadioStatus>("idle");
  const [hasActivated, setHasActivated] = useState(false);
  const [suppressMini, setSuppressMini] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const togglePlayback = useCallback(async () => {
    // Instead of playing an in-document audio element, open the global embed iframe.
    setShowEmbed(true);
  }, []);

  const value = useMemo<RadioPlayerContextValue>(
    () => ({
      isPlaying,
      status,
      hasActivated,
      streamUrl: LIVE_STREAM_URL,
      togglePlayback,
      suppressMini,
      setSuppressMini,
      showEmbed,
      setShowEmbed,
    }),
    [
      hasActivated,
      isPlaying,
      status,
      togglePlayback,
      suppressMini,
      setSuppressMini,
      showEmbed,
      setShowEmbed,
    ],
  );

  return (
    <RadioPlayerContext.Provider value={value}>
      {children}
      {/* audio element removed: iframe embed handles playback per product requirement */}
    </RadioPlayerContext.Provider>
  );
}

export function useRadioPlayer() {
  const context = useContext(RadioPlayerContext);

  if (!context) {
    throw new Error("useRadioPlayer must be used inside RadioPlayerProvider");
  }

  return context;
}

export function MiniRadioPlayer() {
  const {
    hasActivated,
    isPlaying,
    status,
    streamUrl,
    togglePlayback,
    suppressMini,
  } = useRadioPlayer();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (unmountTimerRef.current) {
      clearTimeout(unmountTimerRef.current);
      unmountTimerRef.current = null;
    }

    if (!isVisible) {
      setIsEntered(false);

      unmountTimerRef.current = setTimeout(() => {
        setShouldRender(false);
      }, 300);

      return;
    }

    setShouldRender(true);

    const frame = requestAnimationFrame(() => {
      setIsEntered(true);
    });

    return () => {
      cancelAnimationFrame(frame);
      if (unmountTimerRef.current) {
        clearTimeout(unmountTimerRef.current);
        unmountTimerRef.current = null;
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    if (!hasActivated) {
      setIsVisible(false);
    } else if (isPlaying || status === "loading") {
      setIsVisible(true);
    } else if (status === "idle") {
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } else {
      setIsVisible(true);
    }

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [hasActivated, isPlaying, status]);

  if (!hasActivated || !shouldRender || suppressMini) {
    return null;
  }

  return (
    <aside
      className={`fixed bottom-4 right-4 z-50 w-[min(92vw,22rem)] rounded-2xl border bg-background/95 p-3 shadow-2xl backdrop-blur transition-all duration-300 ease-out supports-backdrop-filter:bg-background/85 ${
        isEntered
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-2 scale-[0.98] opacity-0"
      }`}
    >
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          onClick={togglePlayback}
          className="h-11 w-11 shrink-0 rounded-full bg-primary hover:bg-primary/90"
          aria-label={isPlaying ? "Pause live radio" : "Play live radio"}
        >
          {status === "loading" ? (
            <Loader2 className="h-5 w-5 animate-spin text-background" />
          ) : isPlaying ? (
            <Pause className="h-5 w-5 fill-background text-background" />
          ) : (
            <Play className="h-5 w-5 fill-background text-background" />
          )}
        </Button>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Live Radio
          </p>
          <p className="truncate text-sm font-medium">Live365 Radio Stream</p>
          <p className="truncate text-xs text-foreground/65">
            {status === "error"
              ? "Stream is unavailable right now"
              : `Source: ${getReadableSource(streamUrl)}`}
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
          {status === "error" ? (
            <WifiOff className="h-3.5 w-3.5" />
          ) : (
            <Radio className="h-3.5 w-3.5" />
          )}
          {isPlaying
            ? "On Air"
            : status === "loading"
              ? "Connecting"
              : "Paused"}
        </span>
      </div>
    </aside>
  );
}
