import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles
} from "lucide-react";

interface AutoSlideCarouselProps<T> {
  items: T[];
  renderCard: (item: T, index: number, isDuplicate?: boolean) => React.ReactNode;
  cardWidthClass?: string;
  speedSeconds?: number;
  badgeLabel?: string;
}

export function AutoSlideCarousel<T>({
  items,
  renderCard,
  cardWidthClass = "w-[310px] sm:w-[350px] lg:w-[380px]",
  speedSeconds = 26,
  badgeLabel = "Auto-Sliding"
}: AutoSlideCarouselProps<T>) {
  // Mode: 'continuous' (infinite smooth marquee) or 'step' (card-by-card auto-carousel)
  const [mode, setMode] = useState<"continuous" | "step">("continuous");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Step mode state
  const [stepIndex, setStepIndex] = useState(0);
  const totalItems = items.length;

  // Step mode auto-advance timer
  useEffect(() => {
    if (mode !== "step" || !isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % totalItems);
    }, 3200);

    return () => clearInterval(interval);
  }, [mode, isPlaying, isHovered, totalItems]);

  const handlePrev = () => {
    if (mode === "step") {
      setStepIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else {
      // In continuous mode, shift step and switch or adjust scroll
      setStepIndex((prev) => (prev - 1 + totalItems) % totalItems);
      setMode("step");
    }
  };

  const handleNext = () => {
    if (mode === "step") {
      setStepIndex((prev) => (prev + 1) % totalItems);
    } else {
      setStepIndex((prev) => (prev + 1) % totalItems);
      setMode("step");
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Continuous animation duration inline CSS var
  const trackStyle = {
    "--slide-duration": `${speedSeconds}s`
  } as React.CSSProperties;

  return (
    <div
      className="relative w-full overflow-hidden select-none py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Controls Bar Above Carousel */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
        {/* Status Indicator Badge */}
        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              {isPlaying && !isHovered ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              )}
            </span>
            <span className="text-neutral-300">
              {isHovered ? "Paused (Hovered)" : isPlaying ? `${badgeLabel} Active` : "Slide Paused"}
            </span>
          </div>

          <span className="hidden sm:inline text-neutral-500 text-xs">
            • Hover or touch card to hold
          </span>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher Pill */}
          <div className="inline-flex p-0.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] font-semibold">
            <button
              onClick={() => setMode("continuous")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                mode === "continuous"
                  ? "bg-[#f34c38] text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
              title="Continuous Smooth Glide"
            >
              Continuous Glide
            </button>
            <button
              onClick={() => setMode("step")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                mode === "step"
                  ? "bg-[#f34c38] text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
              title="Card by Card Auto-Slide"
            >
              Step Slide
            </button>
          </div>

          {/* Play / Pause Button */}
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition cursor-pointer"
            aria-label={isPlaying ? "Pause Auto-Slide" : "Resume Auto-Slide"}
            title={isPlaying ? "Pause Slide" : "Resume Auto-Slide"}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-[#f56f36]" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#f34c38]/50 text-neutral-300 hover:text-white transition cursor-pointer"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-[#f34c38]/50 text-neutral-300 hover:text-white transition cursor-pointer"
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Edge Gradient Masks for Smooth In/Out Entrance */}
      <div className="pointer-events-none absolute left-0 top-16 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-16 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-neutral-950 via-neutral-950/60 to-transparent z-10" />

      {/* =================================================================
          MODE 1: CONTINUOUS INFINITE SMOOTH MARQUEE GLIDE
          ================================================================= */}
      {mode === "continuous" && (
        <div className="relative overflow-hidden w-full py-3">
          <div
            style={trackStyle}
            className={`animate-auto-slide-track gap-5 sm:gap-6 ${
              !isPlaying || isHovered ? "slide-paused" : ""
            }`}
          >
            {/* Primary Track Copy */}
            {items.map((item, idx) => (
              <div key={`track-a-${idx}`} className={`${cardWidthClass} shrink-0`}>
                {renderCard(item, idx, false)}
              </div>
            ))}

            {/* Duplicate Copy for Seamless 0-to-100% Loop */}
            {items.map((item, idx) => (
              <div key={`track-b-${idx}`} className={`${cardWidthClass} shrink-0`} aria-hidden="true">
                {renderCard(item, idx, true)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================
          MODE 2: STEP-BY-STEP AUTO CAROUSEL WITH RESPONSIVE OFFSET
          ================================================================= */}
      {mode === "step" && (
        <div className="relative overflow-hidden w-full py-3">
          <div
            className="flex gap-5 sm:gap-6 transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${stepIndex * 330}px)`
            }}
          >
            {items.map((item, idx) => {
              const isActive = idx === stepIndex;
              return (
                <div
                  key={`step-${idx}`}
                  className={`${cardWidthClass} shrink-0 transition-all duration-300 ${
                    isActive ? "scale-[1.02] ring-1 ring-[#f34c38]/40" : "opacity-95"
                  }`}
                >
                  {renderCard(item, idx, false)}
                </div>
              );
            })}
          </div>

          {/* Step Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {items.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => setStepIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === stepIndex
                    ? "w-7 bg-[#f34c38]"
                    : "w-2 bg-neutral-800 hover:bg-neutral-700"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
